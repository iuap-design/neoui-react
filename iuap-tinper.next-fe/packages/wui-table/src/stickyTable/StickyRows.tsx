/*
 * @Author: Mr.mjc
 * @Date: 2022-08-24 09:48:57
 * @LastEditors: MJC
 * @LastEditTime: 2024-11-22 14:20:19
 * @Description: rows
 * @FilePath: /next-ui/packages/wui-table/src/stickyTable/StickyRows.tsx
 */

import React, {Component} from 'react';
import {prefix, cssUtil} from "../../../wui-core/src/index";
import classnames from 'classnames';
import ExpandIcon from '../ExpandIcon';
import TableCell from './StickyCells';
import { TableRowProps, TableRowState } from '../iTableRow';
import { DefaultRecordType } from '../interface';
import { closest } from '../lib/utils';

const defaultProps = {
    onRowClick() {
    },
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
	listener: (() => void) | null;
	static defaultProps = {...defaultProps};
	_timeout: any = null;
	expandHeight: number = 0;
	event: boolean = false;
	cacheCurrentIndex: any = null;
	canBeTouch: boolean = true;
	unsubscribe: any;
	element: HTMLTableRowElement | undefined;
	firstDid: boolean;
	constructor(props: TableRowProps<DefaultRecordType>) {
	    super(props);
	    this.state = {
	        hovered: false,
	        actived: false,
	        rowHeight: 35,
	    };
	    this.listener = null;
	    this.firstDid = true;
	}

	// static getDerivedStateFromProps(nextProps: TableRowProps<DefaultRecordType>, prevState: TableRowState) {
	// 	const {store, hoverKey, rowActiveKeys, index, syncHover} = nextProps;
	// 	if (typeof rowActiveKeys === 'boolean') {
	// 		if (store.getState().activedKey !== null &&
	// 			store.getState().activedKey !== undefined &&
	// 			store.getState().activedKey === hoverKey &&
	// 			rowActiveKeys
	// 		) {
	// 			return {actived: true};
	// 		} else if (rowActiveKeys) {
	// 			if(prevState.actived && store.getState().activedKey !== hoverKey) {
	// 				return {actived: false};
	// 			}
	// 		}
	// 	}
	// 	if (store.getState().currentHoverKey !== null &&
	// 		store.getState().currentHoverKey !== undefined &&
	// 		store.getState().currentHoverKey === hoverKey &&
	// 		syncHover
	// 	) {
	// 		return {hovered: true};
	// 	} else if (store.getState().currentHoverKey == undefined &&
	// 		store.getState().hoveredKeyIndex !== null &&
	// 		store.getState().hoveredKeyIndex !== undefined &&
	// 		store.getState().hoveredKeyIndex === index && syncHover) {
	// 		return {hovered: true};
	// 	} else {
	// 		if (prevState.hovered) {
	// 			return {hovered: false};
	// 		}
	// 	}
	// }
	componentDidMount() {
		if (!this.unsubscribe) {
			const {store, hoverKey, rowActiveKeys, index, syncHover} = this.props;
			this.listener = () => {
				const state = store.getState();
				if (typeof rowActiveKeys === 'boolean') {
					if (state.activedKey !== null &&
						state.activedKey !== undefined &&
						state.activedKey === hoverKey &&
						rowActiveKeys
					) {
						this.setState({actived: true});
					} else if (rowActiveKeys) {
						if (this.state.actived === true && state.activedKey !== hoverKey) {
							this.setState({actived: false});
						}
					}
				}
				if (state.currentHoverKey !== null &&
					state.currentHoverKey !== undefined &&
					state.currentHoverKey === hoverKey &&
					syncHover
				) {
					this.setState({hovered: true})
				} else if (state.currentHoverKey == undefined &&
					state.hoveredKeyIndex !== null &&
					state.hoveredKeyIndex !== undefined &&
					state.hoveredKeyIndex === index && syncHover) {
					this.setState({hovered: true})
				} else {
					if (this.state.hovered) {
						this.setState({hovered: false})
					}
				}
			}
			this.unsubscribe = store.subscribe(this.listener);
		}
	    this.setRowHeight()
	}

	UNSAFE_componentWillReceiveProps(nextProps: Readonly<TableRowProps<DefaultRecordType>>): void {
	    if ('rowActiveKeys' in nextProps && Array.isArray(nextProps.rowActiveKeys)) {
	        const {hoverKey, rowActiveKeys} = nextProps;
	        const {actived} = this.state;
	        if ((hoverKey || hoverKey == '0') && rowActiveKeys.includes(hoverKey)) {
	            if (!actived) {
	                this.setState({actived: true});
	            }
	        } else {
	            if (actived) {
	                this.setState({actived: false});
	            }
	        }
	    }
	}

	componentDidUpdate() {
	    this.setRowHeight()
	}

	componentWillUnmount() {
	    const {record, onDestroy, index} = this.props;
	    onDestroy && onDestroy(record, index);
	    if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
		this.listener = null; // Ensure reference is cleared
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
	        onRowDoubleClick,
	        store,
	        rowActiveKeys,
	        hoverKey
	    } = this.props;
	    let stroeActivedKey = store.getState().activedKey;
	    let isActive = stroeActivedKey !== hoverKey;
	    if (rowActiveKeys && typeof rowActiveKeys === 'boolean') {
	        store.setState({
	            activedKey: stroeActivedKey === hoverKey ? null : hoverKey
	        })
	    }
	    if (expandable && expandRowByClick) {
	        onExpand && onExpand(!expanded, record, fixedIndex, event);
	    }
	    if (!onRowDoubleClick) {
	        onRowClick && onRowClick(record, fixedIndex, event, isActive);
	        return;
	    }
	    this.set(() => {
	        onRowClick && onRowClick(record, fixedIndex, event, isActive);
	    });
	}

	onRowDoubleClick = (event: React.MouseEvent<HTMLElement>) => {
	    const {record, onRowDoubleClick, fixedIndex} = this.props;
	    this.clear();
	    onRowDoubleClick && onRowDoubleClick(record, fixedIndex, event);
	}

	onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
	    const {onHover, hoverKey, fixedIndex, syncHover, record, hoverContent, sumIndex, store, index} = this.props;
	    // QDJCJS-14104 编辑表格存在组件弹出面板时（比如datapicker，showtime）鼠标离开进入弹层时导致onHover行从新render问题
	    if (cssUtil.parents(e.target as any, `td.${prefix}-table-body-cell`, true)?.length == 0 && !(e.target as any)?.classList.contains(`${prefix}-table-body-cell`)) {
	        return
	    }
	    const tr = closest(e.target, 'tr');
	    let rowHeight = tr.offsetHeight;
	    // this.setState({hovered: true});
	    store.setState({
	        currentHoverKey: hoverKey,
	        hoveredKeyIndex: index
	    })
	    if (syncHover) {
	        store.setState({
	            hoverIndex: sumIndex,
	            hoverRowSpan: (e.target as any).rowSpan || 1
	        })
	    }
	    if (tr && hoverContent && typeof hoverContent === 'function' && rowHeight !== this.state.rowHeight) {
	        this.setState({rowHeight: rowHeight})
	    }
	    onHover && onHover(true, hoverKey, e, fixedIndex, record);
	}

	onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {

	    const {onHover, hoverKey, fixedIndex, syncHover, record, store} = this.props;
	    // this.setState({hovered: false});
	    store.setState({
	        currentHoverKey: null,
	        hoveredKeyIndex: null
	    })
	    if (syncHover) {

	        store.setState({
	            hoverIndex: null,
	            hoverRowSpan: null
	        })
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
	        className,
	        showExpandColumn,
	        store,
	        syncHover,
	        sumIndex,
	        onCellMouseDown,
	        onCellMouseEnter,
	        onCellMouseUp,
	        container,
	        openSelectCells,
	        oldMode,
	        dir: direction
	    } = this.props;
	    const {notRowDrag, hovered, actived} = this.state;
	    let hasSum = false;
	    let clsObj = {
	        [`selected`]: (hoverKey || hoverKey == 0) && record && (selectedRowKeys || []).includes(hoverKey), // 单选是通过className传入，后期优化成一致的selectedRowKeys实现
	        [`${className}`]: !!className,
	        [`${clsPrefix}-hover`]: hovered,
	        [`find-selected`]: (hoverKey || hoverKey == 0) && record && (findRowKeys || []).includes(hoverKey),
	        [`find-current-selected`]: (hoverKey || hoverKey == 0) && record && findCurrentRowKey === hoverKey,
	        [`row-dragg-able`]: rowDraggAble && !useDragHandle && !notRowDrag,
	        [`${clsPrefix}-level-${indent}`]: clsPrefix && indent,
	        [`${clsPrefix}-actived`]: actived,
	    };
	    let classes = classnames(clsPrefix, clsObj);
	    // 判断是否为合计行
	    if (className && (className.indexOf('sumrow') > -1 || className.indexOf('totalrow') > -1)) {
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
	            oldMode={oldMode}
	        />
	    );

	    let expandIndexInThisTable = expandIconColumnIndex;
	    for (let i = 0; i < columns.length; i++) {
	        let column = columns[i];
	        const {onCell} = column;
	        if (i == 0 && expandIconAsCell && showExpandColumn) {
	            cells.push(
	                <TableCell
	                    isExpandCell={true}
	                    column={column}
	                    hasSum={hasSum}
	                    record={record}
	                    indent={indent as number}
	                    indentSize={indentSize as number}
	                    clsPrefix={clsPrefix}
	                    index={index as number}
	                    key={`${clsPrefix}-expand-icon-cell-${i}`}
	                    onCell={onCell}
	                    sumIndex={sumIndex}
	                    lazyStartIndex={lazyStartIndex}
	                    lazyEndIndex={lazyEndIndex}
	                    onPaste={onPaste}
	                    stopRowDrag={this.stopRowDrag}
	                    col={i}
	                    getCellClassName={getCellClassName}
	                    fieldid={fieldid}
	                    locale={locale}
	                    store={store}
	                    syncHover={syncHover}
	                    expandIconCellWidth={expandIconCellWidth}
	                    expandNode={expandIcon}
	                    onCellMouseDown={onCellMouseDown}
	                    onCellMouseEnter={onCellMouseEnter}
	                    onCellMouseUp={onCellMouseUp}
	                    currentRowKey={hoverKey}
	                    container={container}
	                    openSelectCells={openSelectCells}
	                    dir={direction}
	                ></TableCell>
	            )
	        } else {
	            let isColumnHaveExpandIcon = showExpandColumn ? (expandIconAsCell || hasSum)
	            ? false : (i === expandIndexInThisTable) : false;

	            let showExpandIcon = (expandable && isShowExpandIcon) || ((needIndentSpaced && !isShowExpandIcon) || oldMode)

	            const {onCell} = columns[i];
	            cells.push(
	                <TableCell
	                    clsPrefix={clsPrefix}
	                    record={record}
	                    indentSize={indentSize as number}
	                    indent={indent as number}
	                    index={index as number}
	                    column={columns[i]}
	                    key={hoverKey + "_" + (columns[i].key || columns[i].dataIndex || i)}
	                    hasSum={hasSum}
	                    expandIcon={(isColumnHaveExpandIcon && showExpandIcon) ? expandIcon : null}
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
	                    store={store}
	                    syncHover={syncHover}
	                    sumIndex={sumIndex}
	                    isExpandCell={false}
	                    onCellMouseDown={onCellMouseDown}
	                    onCellMouseEnter={onCellMouseEnter}
	                    onCellMouseUp={onCellMouseUp}
	                    currentRowKey={hoverKey}
	                    container={container}
	                    openSelectCells={openSelectCells}
	                    dir={direction}
	                />
	            );
	        }
	    }
	    const style = {height, ...record ? record.style : undefined};
	    if (!visible) {
	        style.display = 'none';
	    }
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
	            className={classes}
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
	            {/* {hoverContent && hovered && record.key !== 'table_sum' ?
	                <div className={`${clsPrefix}-hover-content-box`} style={{lineHeight: `${this.state.rowHeight}px`}}>
	                    <div style={{width: `${this.props.contentDomWidth}px`}} className={`${clsPrefix}-hover-content`}>
	                        <div className={`${clsPrefix}-hover-content-container`}>
	                            <div
	                                className={`${clsPrefix}-hover-content-container-target`}
	                                onClick={(e) => e.stopPropagation() }
	                            >
	                                { record && hoverContent ? hoverContent(record, index) : null}
	                            </div>
	                        </div>
	                    </div>

	                </div>
	                : null} */}
	        </tr>
	    );
	}
}

export default TableRow;
