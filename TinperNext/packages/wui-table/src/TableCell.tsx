/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: MJC
 * @LastEditTime: 2023-12-06 18:33:46
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/TableCell.tsx
 */
import objectPath from 'object-path';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {prefix} from "../../wui-core/src/index";
import Dropdown from '../../wui-dropdown/src';
// import {getComponentLocale} from '../../wui-locale/src/tool';
import Menu from '../../wui-menu/src';
import i18n from './lib/i18n';
import {formatMoney} from './lib/utils';
import {getLangInfo} from "../../wui-locale/src/tool";
import { columnType } from './constant';
import { ColumnType } from './iTable';
import { TableCellProps, TableCellState } from './iTableCell';
import { DefaultRecordType, RenderLinkTypeConfig, RenderNumberConfig, RenderDateConfig, RenderSelectConfig, ColMenuType } from './interface';
// import {Moment} from 'moment';

const {Item} = Menu;
// const propTypes = {
//     record: PropTypes.object,
//     clsPrefix: PropTypes.string,
//     index: PropTypes.number,
//     indent: PropTypes.number,
//     indentSize: PropTypes.number,
//     column: PropTypes.object,
//     expandIcon: PropTypes.node,
//     onPaste: PropTypes.func,
//     fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//     showSum: PropTypes.bool,
//     col: PropTypes.any,
//     bodyDisplayInRow: PropTypes.any,
//     stopRowDrag: PropTypes.func,
//     lazyStartIndex: PropTypes.number,
//     lazyEndIndex: PropTypes.number,
//     getCellClassName: PropTypes.string,
//     onCell: PropTypes.func,
//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     isExpandedRow: PropTypes.bool,
// };

const defaultProps = {
    column: [],
};

class TableCell extends Component<TableCellProps<DefaultRecordType>, TableCellState> {
	static defaultProps = {...defaultProps};
	constructor(props:TableCellProps<DefaultRecordType>) {
	    super(props);
	    this.state = {
	        showDropdowm: false,
	        hovered: false
	    }
	}

	shouldComponentUpdate(nextProps: Readonly<TableCellProps<DefaultRecordType>>, _nextState: Readonly<TableCellState>, _nextContext: any): boolean {
	    let shouldCellUpdateResult = nextProps.column?.shouldCellUpdate?.(nextProps.record, this.props.record)
	    if (nextProps.column?.shouldCellUpdate) {
	        return shouldCellUpdateResult === undefined ? true : shouldCellUpdateResult
	    }
	    return true
	}

    isInvalidRenderCellText = (text: any) => {
        return text && !React.isValidElement(text) &&
			Object.prototype.toString.call(text) === '[object Object]';
    }

    handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const {record, column} = this.props;
        const { onCellClick } = column;
        if (onCellClick) {
            onCellClick(record, e);
        }
    }

	//  渲染链接类型
	renderLinkType = (data: any, record: DefaultRecordType, index: number, config: RenderLinkTypeConfig<DefaultRecordType> = {}) => {
	    const {url, urlIndex, linkType, className, underline, descIndex, desc, linkColor} = config;
	    let linkUrl = '';
	    if (url) {
	        linkUrl = url(data, record, index);
	    } else if (urlIndex) {
	        linkUrl = record[urlIndex];
	    }
	    if (linkUrl) {
	        let link = () => {
	            window.open(linkUrl, linkType || '_blank');
	        }
	        let cls = `${prefix}-table-link ${prefix}-table-fieldtype `;
	        if (className) {
	            cls += `${className} `;
	        }
	        if (underline) {
	            cls += `${prefix}-table-link-underline `;
	        }
	        let title = '';

	        if (desc === true) {
	            title = linkUrl;
	        } else if (typeof desc === 'string') {
	            title = desc;
	        } else if (typeof desc === 'function') {
	            title = desc(data, record, index);
	        } else if (descIndex) {
	            title = record[descIndex];
	        }
	        return <span onClick={link} className={cls} style={{color: linkColor || ''}} title={title}>{data}</span>
	    }
	    return data;
	}

	// 渲染布尔类型
	renderBoolType = (data: any, config:{trueText?: string; falseText?: string} = {}) => {
	    // let locale = getComponentLocale(this.props, this.context, 'Table', () => i18n);
	    let locale = getLangInfo(this.props.locale, i18n, 'table')
	    let boolConfig = {...{trueText: locale.langMap.boolTrue || '是', falseText: locale.langMap.boolFalse || '否'}, ...config};
	    if (typeof data === 'string') {
	        if (data === 'false' || data === '0') {
	            return boolConfig.falseText;
	        }
	    } else if (!data) {
	        return boolConfig.falseText;
	    }
	    return boolConfig.trueText;
	}

	// 渲染整数/货币类型
	renderNumber = (data: any, config: RenderNumberConfig = {}, width: number | string = 200) => {
	    const {precision, thousand, makeUp, preSymbol, nextSymbol} = config;
	    let number = formatMoney(data, precision, thousand);
	    if (makeUp === false && number.indexOf('.') !== -1) {
	        number = number.replace(/0*$/, '').replace(/\.$/, '');
	    }
	    let numberWidth = parseInt(width + '') - 16; // 减去默认的左右padding共计16px
	    let res = <span className={`${prefix}-table-currency-number`}>{number}</span>;
	    let pre = preSymbol ? <span className={`${prefix}-table-currency-pre`}>{preSymbol}</span> : null;
	    let next = nextSymbol ? <span className={`${prefix}-table-currency-next`}>{nextSymbol}</span> : null;
	    let title = '';
	    title += typeof preSymbol === 'string' ? preSymbol : '';
	    title += number;
	    title += typeof nextSymbol === 'string' ? nextSymbol : '';
	    return <span className={`${prefix}-table-currency ${prefix}-table-fieldtype`} style={{width: numberWidth}}
					 title={title}>
	        {pre}
	        {res}
	        {next}
	    </span>;
	}

	// 渲染时间类型-l
	renderDate = (data: any, config: RenderDateConfig = {}) => {
	    const {moment, format}: RenderDateConfig = config;
	    if (!moment) return data;
	    // @ts-ignore
	    return moment(data).format(format || 'YYYY-MM-DD');
	}

	// 渲染下拉类型，主要为编辑表格铺垫
	renderSelect = (data: any, config:RenderSelectConfig = {}) => {
	    if (config.options) {
	        data = config.options[data] || config.defaultShow;
	    }
	    return data;
	}


	// 渲染行内菜单
	renderColumnMenu = (colMenu: ColMenuType, text: any, record: DefaultRecordType, index: number) => {
	    if (!colMenu) return null;
	    let {menu = [], trigger = 'hover', className = '', icon = <i className='uf uf-3dot-h'/>, iconSize = 21}: ColMenuType = colMenu;
	    let items = [];
	    // let triggers:('click' | 'hover')[] = trigger ? Array.from(trigger) : Array.from('hover')
	    items = menu.map((item) => {
	        return <Item key={item.key} onClick={() => {
	            this.onClickColMenu(item.callback, text, record, index)
	        }}>
	            {item.icon}
	            {item.text}
	        </Item>
	    })
	    if (items.length === 0) return null;
	    className += ` ${prefix}-table-inline-op-dropdowm`
	    let menus: JSX.Element = <Menu className={className}>{items}</Menu>;
	    let top = `calc(50% - ${iconSize / 2}px)`;
	    let visibility = this.state.showDropdowm ? 'visible' : '';
	    let iconClassName = `${prefix}-table-inline-op-icon ${prefix}-table-inline-op-icon-hover`;
	    return <Dropdown
	        trigger={[trigger]}
	        overlay={menus}
	        animation="slide-up"
	        onVisibleChange={this.changeShowDropdowm}
	    >
	        {<span className={iconClassName}
				   style={{fontSize: iconSize, top: top, visibility: visibility} as React.CSSProperties}>{icon}</span>}
	    </Dropdown>
	}

	// 下拉按钮状态改变，点击后保持图标常驻
	changeShowDropdowm = (val: boolean) => {
	    this.setState({
	        showDropdowm: val
	    })
	}

	// 菜单点击事件
	onClickColMenu = (callback:any, text: any, record: DefaultRecordType, index: number) => {
	    if (callback) {
	        callback(text, record, index);
	    }
	    this.setState({
	        showDropdowm: false,
	    })
	}
	onPaste = (e?: React.ClipboardEvent<HTMLTableDataCellElement>) => {
	    let {index: row, onPaste, fixed, col} = this.props
	    let position = {
	        row,
	        col,
	        fixed: !!fixed
	    }
	    onPaste && onPaste(e, position)
	}

	onCellMouseOver = () => {
	    const {column} = this.props
	    const { notRowDrag } = column as ColumnType<DefaultRecordType>;
	    this.props.stopRowDrag && this.props.stopRowDrag(notRowDrag)
	}

	render() {
	    const {
	        record,
	        indentSize,
	        clsPrefix,
	        indent,
	        index,
	        expandIcon,
	        column,
	        fixed,
	        hasSum,
	        bodyDisplayInRow,
	        lazyStartIndex,
	        lazyEndIndex,
	        getCellClassName,
	        onCell,
	        fieldid,
	        isExpandedRow = false
	    } = this.props;
	    const {dataIndex, render, fieldType, linkConfig, fontColor, bgColor, key, ...other} = column;
	    let {className = ''} = column;

	    let text = objectPath.has(record, dataIndex) ? objectPath.get(record, dataIndex) : objectPath.get(record, [dataIndex]);
	    let tdProps;
	    let colSpan;
	    let rowSpan, title;
	    let colMenu = column.cellMenu && this.renderColumnMenu(column.cellMenu, text, record, index);
	    const {fieldid: cellFieldid} = column;
	    let fieldidAttr = fieldid && !isExpandedRow ? { fieldid: (cellFieldid || dataIndex || key) + '' } : {}
	    // 如果是固定列在主表格上就渲染null
	    if (column.fixed && !fixed) {
	        text = null
	    } else {
	        if (render && !hasSum) {
	            text = render(text, record, index, {
	                dataIndex, render, fieldType, linkConfig, fontColor, bgColor, ...other
	            });
	            if (this.isInvalidRenderCellText(text)) {
	                tdProps = text.props || {};
	                rowSpan = (lazyEndIndex && tdProps.rowSpan > lazyEndIndex && lazyEndIndex > 5) ? lazyEndIndex - index : tdProps.rowSpan;
	                colSpan = tdProps.colSpan;
	                text = text.children;
	            }
	        }


	        // 根据 fieldType 来渲染数据
	        if (!render) {
	            switch (column.fieldType) {
	                case 'link': {
	                    text = this.renderLinkType(text, record, index, column.linkConfig);
	                    break;
	                }
	                case 'bool': {
	                    text = this.renderBoolType(text, column.boolConfig);
	                    break;
	                }
	                case 'currency': {
	                    let config = {
	                        precision: 2, // 精度值,需要大于0
	                        thousand: true, // 是否显示千分符号
	                        makeUp: true, // 末位是否补零
	                        preSymbol: '', // 前置符号
	                        nextSymbol: '', // 后置符号
	                    }
	                    text = this.renderNumber(text, {...config, ...column.currencyConfig}, column.width);
	                    break;
	                }
	                case 'number': {
	                    let config = {
	                        precision: 0, // 精度值,需要大于0
	                        thousand: true, // 是否显示千分符号
	                        makeUp: false, // 末位是否补零
	                        preSymbol: '', // 前置符号
	                        nextSymbol: '', // 后置符号
	                    }
	                    text = this.renderNumber(text, {...config, ...column.numberConfig}, column.width);
	                    break;
	                }
	                case 'date': {
	                    text = this.renderDate(text, column.dateConfig);
	                    break;
	                }
	                case 'select': {
	                    text = this.renderSelect(text, column.selectConfig);
	                    break;
	                }
	                default : {
	                    break;
	                }
	            }
	        }
	    }


	    if (this.isInvalidRenderCellText(text)) {
	        text = null;
	    }

	    const indentText = expandIcon ? (
	        <span
	            style={{paddingLeft: `${indentSize * indent}px`}}
	            className={`${clsPrefix}-indent indent-level-${indent}`}
	        />
	    ) : null;

	    if ((lazyStartIndex !== index) && (rowSpan === 0 || colSpan === 0)) {
	        return null;
	    }
	    if (tdProps && tdProps.mergeEndIndex && index < tdProps.mergeEndIndex && rowSpan === 0) {
	        rowSpan = tdProps.mergeEndIndex - index;
	        text = ''
	    }
	    // 注意：中间表格区域不需要渲染出固定列的单元格，以节省多余的性能消耗
	    if (!fixed && column.fixed) return null;
	    if (column.contentAlign) {
	        className = className + ` text-${column.contentAlign}`;
	    } else if (column.textAlign) {
	        className = className + ` text-${column.textAlign}`;
	    }
	    if ((typeof text == 'string' || typeof text === 'number') && bodyDisplayInRow) {
	        title = text + ''
	    }
	    if (expandIcon && expandIcon.props.expandable) {
	        className = className + ` ${clsPrefix}-has-expandIcon`
	    }
	    if (colMenu) {
	        className += ` ${prefix}-table-inline-icon`
	    }

	    if (typeof getCellClassName == 'function') {
	        const selfClassName = getCellClassName(record, index, column) || ''
	        className += ` ${selfClassName}`
	    }

	    className += `${prefix}-table-body-cell`;
	    if (colSpan == 0) return null;
	    const onCellObj = onCell && typeof onCell === 'function' ? onCell(record, index) : {};
	    let cellAttr = column.columnType && column.columnType === columnType.ROWDRAG ? { columnType: column.columnType } : {};
	    return <td
	        {...fieldidAttr}
	        draggable={column.draggable}
	        colSpan={colSpan}
	        rowSpan={rowSpan}
	        className={className}
	        onClick={this.handleClick}
	        title={title}
	        onPaste={this.onPaste}
	        onMouseOver={this.onCellMouseOver}
	        style={{maxWidth: column.width, minWidth: column.width, color: fontColor, backgroundColor: bgColor, ...column.style}}
	        {...onCellObj} {...cellAttr}>
	        {indentText}
	        {expandIcon}
	        {text}
	        {colMenu}
	    </td>
	}
}

// TableCell.propTypes = propTypes;

export default TableCell;
