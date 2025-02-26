/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: MJC
 * @LastEditTime: 2023-12-06 18:32:46
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/TableRow.tsx
 */
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ExpandIcon from './ExpandIcon';
// import {propTypes as tablePropTypes} from "./Table";
import TableCell from './TableCell';
import { TableRowProps, TableRowState } from './iTableRow';
import { DefaultRecordType } from './interface';
import {prefix, cssUtil} from "../../wui-core/src/index"

// const propTypes = {
//     ...tablePropTypes,
//     onDestroy: PropTypes.func,
//     onRowClick: PropTypes.func,
//     onRowDoubleClick: PropTypes.func,
//     record: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     expandIconColumnIndex: PropTypes.number,
//     onHover: PropTypes.func,
//     columns: PropTypes.array,
//     height: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
//     visible: PropTypes.bool,
//     index: PropTypes.number,
//     hoverKey: PropTypes.any,
//     expanded: PropTypes.bool,
//     expandable: PropTypes.any,
//     onExpand: PropTypes.func,
//     needIndentSpaced: PropTypes.bool,
//     className: PropTypes.string,
//     indent: PropTypes.number,
//     indentSize: PropTypes.number,
//     expandIconAsCell: PropTypes.bool,
//     expandRowByClick: PropTypes.bool,
//     store: PropTypes.object.isRequired,
//     rowDraggAble: PropTypes.bool,
//     // onRowDragDrop: PropTypes.func,  //拖拽行放置时触发
//     // onRowDragStart: PropTypes.func,//拖拽行开始时触发 传递参数：startRowKey,startRowIndex
//     // onRowDragEnter: PropTypes.func,  //拖拽行经过时触发
//     syncRowHeight: PropTypes.bool,
//     onRow: PropTypes.func,
//     selectedRowKeys: PropTypes.array,
//     findRowKeys: PropTypes.array,
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     isExpandedRow: PropTypes.bool,
//     oldMode: PropTypes.bool,
// };

const defaultProps = {
    onRowClick() {
    },
    // onRowDoubleClick() {},
    onDestroy() {
    },
    expandIconColumnIndex: 0,
    leftColumnsLength: 0,
    centerColumnsLength: 0,
    expandRowByClick: false,
    columns: [],
    onHover() {
    },
    className: '',
    rowDraggAble: false,
    syncRowHeight: false,
    onRow() {
    },
    selectedRowKeys: [],
    findRowKeys: [],
    isExpandedRow: false,
    expanded: false
};

class TableRow extends Component<TableRowProps<DefaultRecordType>, TableRowState> {

	static defaultProps = {...defaultProps};
	_timeout: any = null;
	expandHeight: number = 0;
	event: boolean = false;
	cacheCurrentIndex: any = null;
	canBeTouch: boolean = true;
	unsubscribe: any;
	element: HTMLTableRowElement | undefined;
	constructor(props: TableRowProps<DefaultRecordType>) {
	    super(props);
	    this.state = {
	        hovered: false,
	    };
	}


	componentDidMount() {
	    const {store, hoverKey, syncHover} = this.props;
	    this.unsubscribe = store.subscribe(() => {
	        if (store.getState().currentHoverKey !== null &&
				store.getState().currentHoverKey !== undefined &&
				store.getState().currentHoverKey === hoverKey &&
				syncHover
	        ) {
	            this.setState({hovered: true});
	        } else if (syncHover) { // 显示hover状态，加hoverclass类名
	            if (this.state.hovered === true && store.getState().currentHoverKey !== hoverKey) { // 原本是hover状态然后离开该行
	                this.setState({hovered: false});
	            }
	        }
	    });
	    this.setRowHeight()
	}

	componentDidUpdate() {
	    this.setRowHeight()
	}

	componentWillUnmount() {
	    const {record, onDestroy, index} = this.props;
	    onDestroy && onDestroy(record, index);
	    if (this.unsubscribe) {
	        this.unsubscribe();
	    }
	    // if(rowDraggAble){
	    //   this.removeDragAbleEvent();
	    // }
	}


	setRowHeight() {
	    const {setRowHeight, expandedContentHeight = 0, fixed, fixedIndex} = this.props
	    if (!setRowHeight || !this.element || fixed) return
	    setRowHeight(this.element.clientHeight + expandedContentHeight, fixedIndex, this.getRecordKey())
	}

	onRowClick = (event: React.MouseEvent<HTMLElement>) => {
	    // fix: 解决 onRowClick 回调函数中，事件对象属性均为 null 的问题
	    // 异步访问事件属性
	    // 调用 event.persist() 会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
	    event.persist();
	    const {
	        record,
	        // index,
	        onRowClick,
	        expandable,
	        expandRowByClick,
	        expanded,
	        onExpand,
	        fixedIndex,
	        onRowDoubleClick
	    } = this.props;
	    if (expandable && expandRowByClick) {
	        onExpand && onExpand(!expanded, record, fixedIndex, event);
	    }
	    if (!onRowDoubleClick) {
	        onRowClick && onRowClick(record, fixedIndex, event);
	        return;
	    }
	    this.set(() => {
	        onRowClick && onRowClick(record, fixedIndex, event);
	    });
	}

	onRowDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
	    const {record, onRowDoubleClick, fixedIndex} = this.props;
	    this.clear();
	    onRowDoubleClick && onRowDoubleClick(record, fixedIndex, event);
	}

	onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
	    const {onHover, hoverKey, fixedIndex, syncHover, record} = this.props;
	    // QDJCJS-14104 编辑表格存在组件弹出面板时（比如datapicker，showtime）鼠标离开进入弹层时导致onHover行从新render问题
	    if (cssUtil.parents(e.target as any, `td.${prefix}-table-body-cell`, true)?.length == 0 && !(e.target as any)?.classList.contains(`${prefix}-table-body-cell`)) {
	        return
	    }
	    if (syncHover) {
	        this.setState({hovered: true});
	    }
	    onHover && onHover(true, hoverKey, e, fixedIndex, record);
	}

	onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {

	    const {onHover, hoverKey, fixedIndex, syncHover, record} = this.props;
	    if (syncHover) {
	        this.setState({hovered: false});
	    }
	    onHover && onHover(false, hoverKey, e, fixedIndex, record);
	}

	// TODO column.notRowDrag供TableCell禁用行拖拽，待优化
	stopRowDrag = (isStop: boolean) => {
	    const {rowDraggAble} = this.props;
	    const {notRowDrag} = this.state;
	    if (rowDraggAble && isStop !== notRowDrag) {
	        this.setState({
	            notRowDrag: isStop
	        })
	    }
	}

	set = (fn: (e: React.MouseEvent<HTMLElement>) => void) => {
	    this.clear();
	    this._timeout = window.setTimeout(fn, 300);
	}

	clear = () => {
	    if (this._timeout) {
	        window.clearTimeout(this._timeout);
	    }
	}

	bindElement = (el:HTMLTableRowElement) => {
	    this.element = el
	}

	// 获取当前行唯一键值
	getRecordKey() {
	    let {record, hoverKey} = this.props;
	    return record && record.key ? record.key : hoverKey
	}

	render() {
	    const {
	        clsPrefix,
	        columns,
	        record,
	        height,
	        visible,
	        index,
	        onPaste,
	        hasLeftFixed,
	        expandIconColumnIndex,
	        expandIconAsCell,
	        expanded,
	        useDragHandle,
	        rowDraggAble,
	        expandable,
	        onExpand,
	        needIndentSpaced,
	        indent,
	        indentSize,
	        isShowExpandIcon,
	        fixed,
	        bodyDisplayInRow,
	        expandedIcon,
	        collapsedIcon,
	        hoverKey,
	        lazyStartIndex,
	        lazyEndIndex,
	        expandIconCellWidth,
	        getCellClassName,
	        expandIcon: _expandIcon,
	        onRow,
	        selectedRowKeys,
	        fixedIndex,
	        findRowKeys,
	        findCurrentRowKey,
	        fieldid,
	        locale,
	        isExpandedRow,
	        leftColumnsLength,
	        centerColumnsLength,
	        showExpandColumn
	    } = this.props;
	    const {notRowDrag} = this.state;
	    // const isEmptyTr = isPre || isSuf//暂时不用 滚动loading相关
	    let hasSum = false;
	    let cls = [];
	    if (clsPrefix) {
	        cls.push(clsPrefix);
	    }
	    let {className} = this.props;
	    if (this.state.hovered) {
	        className += ` ${clsPrefix}-hover`;
	    }
	    // 判断是否为合计行
	    if (className && className.indexOf('sumrow') > -1) {
	        hasSum = true;
	    }
	    const cells = [];

	    const expandIcon = (
	        <ExpandIcon
	            expandable={expandable}
	            clsPrefix={clsPrefix}
	            onExpand={onExpand}
	            needIndentSpaced={needIndentSpaced}
	            expanded={expanded}
	            record={record}
	            fixedIndex={fixedIndex as number}
	            expandedIcon={expandedIcon}
	            expandIcon={_expandIcon}
	            collapsedIcon={collapsedIcon}
	            isShowExpandIcon={isShowExpandIcon}
	            fieldid={fieldid}
	            oldMode={this.props.oldMode}
	        />
	    );
	    let expandIndexInThisTable
	    if (this.props.fixed === 'right') {
	        expandIndexInThisTable = expandIconColumnIndex - leftColumnsLength - centerColumnsLength
	    } else {
	        expandIndexInThisTable = expandIconColumnIndex
	    }
	    for (let i = 0; i < columns.length; i++) {
	        let createExpandIconCell = false;
	        if (i == 0) {
	            if (hasLeftFixed && fixed == 'left' && expandIconAsCell) { // 存在左侧固定列则在左侧固定区域下渲染展开列
	                createExpandIconCell = true;
	            } else if (!hasLeftFixed && !fixed && expandIconAsCell) {// 不存在左侧固定列则在中间区域第一列渲染展开列
	                createExpandIconCell = true;
	            }
	            if (createExpandIconCell && showExpandColumn) {
	                hasSum ? cells.push(<td width={expandIconCellWidth}
											 dangerouslySetInnerHTML={{__html: '&nbsp;'}}></td>) :
	                    cells.push(
	                        <td
	                            className={`${clsPrefix}-expand-icon-cell`}
	                            key={`${clsPrefix}-expand-icon-cell-${i}`}
	                            width={expandIconCellWidth}
	                        >
	                            {expandIcon}
	                        </td>
	                    );
	            }
	        }
	        // bugfix 设置expandRowByClick，无法显示箭头，去掉 expandRowByClick 判断
	        let isColumnHaveExpandIcon = showExpandColumn ? (expandIconAsCell || hasSum)
	            ? false : (i === expandIndexInThisTable) : false;
	        // 注意：中间表格区域不需要渲染出固定列的单元格，以节省多余的性能消耗
	        if (!fixed && columns[i].fixed) continue;

	        const {onCell} = columns[i];

	        // let indentSizeProps = indentSize ? {indentSize} : {}

	        cells.push(
	            <TableCell
	                clsPrefix={clsPrefix}
	                record={record}
	                indentSize={indentSize as number}
	                indent={indent as number}
	                index={index as number}
	                column={columns[i]}
	                key={index + "_" + (columns[i].key || columns[i].dataIndex || i)}
	                fixed={fixed}
	                hasSum={hasSum}
	                expandIcon={(isColumnHaveExpandIcon) ? expandIcon : null}
	                bodyDisplayInRow={bodyDisplayInRow}
	                lazyStartIndex={lazyStartIndex}
	                lazyEndIndex={lazyEndIndex}
	                onPaste={onPaste}
	                stopRowDrag={this.stopRowDrag}
	                col={i}
	                getCellClassName={getCellClassName}
	                onCell={onCell}
	                fieldid={fieldid}
	                locale={locale}
	                isExpandedRow={isExpandedRow}
	                isExpandCell={false}
	            />
	        );
	    }
	    const style = {height, ...record ? record.style : undefined};
	    if (!visible) {
	        style.display = 'none';
	    }
	    if ((hoverKey || hoverKey == 0) && record && (selectedRowKeys || []).includes(hoverKey)) { // 如果启用多选功能高阶组件，到了这一层，所有的已选已转换为selectedRowKeys的形式传递，无需再_checked判断
	        className += ' selected';
	    }
	    if ((hoverKey || hoverKey == 0) && record && (findRowKeys || []).includes(hoverKey)) {
	        className += ' find-selected';
	    }
	    if ((hoverKey || hoverKey == 0) && record && findCurrentRowKey === hoverKey) {
	        className += ' find-current-selected';
	    }
	    // if(record && record._findChecked){
	    //   className += ' find-selected';
	    // }

	    if (rowDraggAble && !useDragHandle && !notRowDrag) {
	        className += ' row-dragg-able'
	    }

	    if (className) {
	        cls.push(className);
	    }
	    if (clsPrefix && indent) {
	        cls.push(`${clsPrefix}-level-${indent}`);
	    }

	    // const tdStyle = !isEmptyTr ? {} : this.getLoadingStyle(isPre, isSuf)//暂时不用 滚动loading相关
	    const onRowObj = onRow && typeof onRow === 'function' ? onRow(record, index) : {}
	    const { key = null } = record || {};
	    let fieldidAttr = fieldid && key === 'table_sum' ? { fieldid: 'total-row' } : fieldid && isExpandedRow ? { fieldid: 'expanded-row' } : {}
	    return (
	        <tr
	            draggable={rowDraggAble && !useDragHandle && !notRowDrag}
	            onClick={this.onRowClick}
	            onDoubleClick={this.onRowDoubleClick}
	            onMouseEnter={this.onMouseEnter}
	            onMouseLeave={this.onMouseLeave}
	            className={cls.join(' ')}
	            style={style}
	            data-for-table={this.props.tableUid}
	            data-row-key={this.getRecordKey()}
	            data-row-index={this.props.fixedIndex}
	            // key={hoverKey}
	            ref={this.bindElement}
	            {...fieldidAttr}
	            {...onRowObj}
	        >
	            {cells.length > 0 ? cells : <td style={{width: 0, padding: 0}}></td>}
	            {/* {cells.length > 0 ? cells : isEmptyTr ? // loading暂时去掉，还原*/}
	            {/*    <td style={{width: 0,padding: 0}}>*/}
	            {/*    </td> : <td style={{width: 0,padding: 0}}>*/}
	            {/*    </td>}*/}
	        </tr>
	    );
	}
}

// TableRow.propTypes = propTypes;
// TableRow.defaultProps = defaultProps;

export default TableRow;
