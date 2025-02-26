/*
 * @Author: Mr.mjc
 * @Date: 2022-06-27 19:02:37
 * @LastEditors: MJC
 * @LastEditTime: 2024-12-06 17:36:00
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/stickyTable/StickyCells.tsx
 */
import objectPath from 'object-path';
import React, {Component} from 'react';
import classnames from 'classnames';
import {prefix} from "../../../wui-core/src/index";
import Dropdown from '../../../wui-dropdown/src';
import Menu from '../../../wui-menu/src';
import i18n from '../lib/i18n';
import {formatMoney} from '../lib/utils';
import {getLangInfo} from "../../../wui-locale/src/tool";
import { columnType } from '../constant';
import { InnerColumnType } from '../iTable';
import { TableCellProps, TableCellState } from '../iTableCell';
import { DefaultRecordType, RenderLinkTypeConfig, RenderNumberConfig, RenderDateConfig, RenderSelectConfig, ColMenuType } from '../interface';

const {Item} = Menu;

const defaultProps = {
    column: [],
};

class TableCell extends Component<TableCellProps<DefaultRecordType>, TableCellState> {
	static defaultProps = {...defaultProps};
	listener: (() => void) | null;
	unsubscribe: any;
	rowSpan: number | undefined;
	constructor(props:TableCellProps<DefaultRecordType>) {
	    super(props);
	    this.listener = null;
	    this.state = {
	        showDropdowm: false,
	        hovered: false,
	    }
	}

	shouldComponentUpdate(nextProps: Readonly<TableCellProps<DefaultRecordType>>, _nextState: Readonly<TableCellState>, _nextContext: any): boolean {
	    let shouldCellUpdateResult = nextProps.column?.shouldCellUpdate?.(nextProps.record, this.props.record)
	    if (nextProps.column?.shouldCellUpdate) {
	        return shouldCellUpdateResult === undefined ? true : shouldCellUpdateResult
	    }
	    return true
	}
	// static getDerivedStateFromProps(nextProps: TableCellProps<DefaultRecordType>, prevState: TableCellState) {
	// 	const {store, sumIndex} = nextProps;
	// 	if (store.getState().hoverIndex !== undefined &&
	// 		store.getState().hoverIndex !== null &&
	// 		store.getState().hoverRowSpan !== undefined &&
	// 		store.getState().hoverRowSpan !== null &&
	// 		store.getState().currentHoverKey !== undefined &&
	// 		store.getState().currentHoverKey !== null
	// 	) {
	// 		// let isHover = this.hoverRange(sumIndex as number, this.getRowSpan(), store.getState().hoverIndex, store.getState().hoverIndex + store.getState().hoverRowSpan - 1);

	// 		let hoverRange = (currentIndex: number, currentRowSpan: number = 1, startIndex: number, endIndex: number) => {
	// 			const currentEndIndex = currentIndex + currentRowSpan - 1;
	// 			return currentIndex <= endIndex && currentEndIndex >= startIndex;
	// 		}

	// 		let isHover = hoverRange(sumIndex as number, 1, store.getState().hoverIndex, store.getState().hoverIndex + store.getState().hoverRowSpan - 1);
	// 		// if (isHover) {
	// 		// 	this.setState({hovered: true})
	// 		// } else {
	// 		// 	if (this.state.hovered) {
	// 		// 		this.setState({hovered: false})
	// 		// 	}
	// 		// }
	// 		return {
	// 			hovered: isHover
	// 		}
	// 	} else {
	// 		// if (this.state.hovered) {
	// 		// 	this.setState({hovered: false})
	// 		// }
	// 		return {
	// 			hovered: false
	// 		}
	// 	}
	// }

	componentDidMount() {
		if (!this.unsubscribe) {
			const {store, sumIndex} = this.props;
			this.listener = () => {
				const state = store.getState();
				if (state.hoverIndex !== undefined &&
					state.hoverIndex !== null &&
					state.hoverRowSpan !== undefined &&
					state.hoverRowSpan !== null &&
					state.currentHoverKey !== undefined &&
					state.currentHoverKey !== null
				) {
					let isHover = this.hoverRange(sumIndex as number, this.getRowSpan(), state.hoverIndex, state.hoverIndex + state.hoverRowSpan - 1);
					if (isHover) {
						this.setState({hovered: true})
					} else {
						if (this.state.hovered) {
							this.setState({hovered: false})
						}
					}
				} else {
					if (this.state.hovered) {
						this.setState({hovered: false})
					}
				}
			}
			this.unsubscribe = store.subscribe(this.listener);
		}
	}

	componentDidUpdate(prevProps: TableCellProps<DefaultRecordType>) {
		const { store, sumIndex } = this.props;
		if (prevProps.sumIndex !== sumIndex) {
			if (this.unsubscribe) {
				this.unsubscribe(); // 取消之前的订阅
			}
			this.listener = () => {
				const state = store.getState();
				if (
					state.hoverIndex !== undefined &&
					state.hoverIndex !== null &&
					state.hoverRowSpan !== undefined &&
					state.hoverRowSpan !== null &&
					state.currentHoverKey !== undefined &&
					state.currentHoverKey !== null
				) {
					let isHover = this.hoverRange(
						sumIndex as number,
						this.getRowSpan(),
						state.hoverIndex,
						state.hoverIndex + state.hoverRowSpan - 1
					);
					if (isHover) {
						this.setState({ hovered: true });
					} else {
						if (this.state.hovered) {
							this.setState({ hovered: false });
						}
					}
				} else {
					if (this.state.hovered) {
						this.setState({ hovered: false });
					}
				}
			};
			this.unsubscribe = store.subscribe(this.listener);
		}
	}

	// UNSAFE_componentWillReceiveProps(nextProps: Readonly<TableCellProps<DefaultRecordType>>): void {
	//     const {store} = nextProps
	//     this.unsubscribe = store.subscribe(() => this.listener(nextProps));
	// }

	// listener = (props: Readonly<TableCellProps<DefaultRecordType>>) => {
	//     const {store, sumIndex} = props
	//     if (store.getState().hoverIndex !== undefined &&
	// 		store.getState().hoverIndex !== null &&
	// 		store.getState().hoverRowSpan !== undefined &&
	// 		store.getState().hoverRowSpan !== null &&
	// 		store.getState().currentHoverKey !== undefined &&
	// 		store.getState().currentHoverKey !== null
	//     ) {
	//         let isHover = this.hoverRange(sumIndex as number, this.getRowSpan(), store.getState().hoverIndex, store.getState().hoverIndex + store.getState().hoverRowSpan - 1);
	//         if (isHover) {
	//             this.setState({hovered: true})
	//         } else {
	//             if (this.state.hovered) {
	//                 this.setState({hovered: false})
	//             }
	//         }
	//     } else {
	//         if (this.state.hovered) {
	//             this.setState({hovered: false})
	//         }
	//     }
	// }


	componentWillUnmount() {
	    // const {store} = this.props;
		if (this.unsubscribe) {
			this.unsubscribe(); // Directly call the returned unsubscribe function
			this.unsubscribe = null;
		}
		this.listener = null;
	    // if (this.unsubscribe && this.listener) {
	    //     store.unsubscribe(this.listener)
	    //     this.listener = null
	    // }
		// this.unsubscribe = null;
	}

	hoverRange = (currentIndex: number, currentRowSpan: number = 1, startIndex: number, endIndex: number) => {
	    const currentEndIndex = currentIndex + currentRowSpan - 1;
	    return currentIndex <= endIndex && currentEndIndex >= startIndex;
	}

    isInvalidRenderCellText = (text: any) => {
        return text && !React.isValidElement(text) &&
			Object.prototype.toString.call(text) === '[object Object]';
    }

    // handleClick = (e: React.MouseEvent<HTMLElement>) => {
    //     const {record, column} = this.props;
    //     const { onCellClick } = column;
    //     if (onCellClick) {
    //         onCellClick(record, e);
    //     }
    // }

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
	    return <span className={`${prefix}-table-currency ${prefix}-table-fieldtype`} style={{maxWidth: numberWidth}}
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
	        dir={this.props.dir}
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
	    const { notRowDrag } = column as InnerColumnType;
	    this.props.stopRowDrag && this.props.stopRowDrag(notRowDrag)
	}

	onCellMouseDown = (e: React.MouseEvent<HTMLTableDataCellElement>, record: DefaultRecordType, index: number) => {
	    const { onCellMouseDown, column } = this.props;
	    const {key, dataIndex} = column;
	    let columnKey = key || dataIndex;
	    onCellMouseDown && onCellMouseDown(e, record, index, columnKey);
  	}

	onCellMouseEnter = (e: React.MouseEvent<HTMLTableDataCellElement>, record: DefaultRecordType, index: number) => {
	    const { onCellMouseEnter, column } = this.props;
	    const {key, dataIndex} = column;
	    let columnKey = key || dataIndex;
	    onCellMouseEnter && onCellMouseEnter(e, record, index, columnKey);
	}

	onCellMouseUp = (e: React.MouseEvent<HTMLTableDataCellElement>, record: DefaultRecordType, index: number) => {
	    const { onCellMouseUp, column } = this.props;
	    const {key, dataIndex} = column;
	    let columnKey = key || dataIndex;
	    onCellMouseUp && onCellMouseUp(e, record, index, columnKey);
	}

	onCellClick = (e: React.MouseEvent<HTMLTableDataCellElement>, record: DefaultRecordType, _index: number) => {
	    const {column} = this.props;
	    const { onCellClick } = column;
	    if (onCellClick) {
	        onCellClick(record, e);
	    }
	}

	getRowSpan = () => {
	    return this.rowSpan || 1
	}

	getChildrenText = (elem: HTMLElement | string | undefined, results?: (string | HTMLElement)[]) => {
	    let _results: (string | HTMLElement)[] = results ? results : [];
	    if (!React.isValidElement(elem) && (typeof elem == 'string' || !Object.is(elem, NaN))) {
	        _results.push(elem === undefined ? "" : elem);
	    } else {
	        if (React.isValidElement(elem)) { // react对象则遍历children
	            let self = this;
	            if (Array.isArray((elem.props as HTMLElement).children)) {
	                // @ts-ignore
	                (elem.props as HTMLElement).children.forEach((item: HTMLElement | string) => {
	                    self.getChildrenText(item, _results);
	                })
	            } else {
	                // @ts-ignore
	                self.getChildrenText((elem.props as HTMLElement).children, _results);
	            }
	        }
	    }
	    return _results.join();
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
	        hasSum,
	        bodyDisplayInRow,
	        lazyStartIndex,
	        // lazyEndIndex,
	        getCellClassName,
	        onCell,
	        fieldid,
	        isExpandedRow = false,
	        col,
	        isExpandCell,
	        expandIconCellWidth,
	        expandNode,
	        container,
	        currentRowKey,
	        openSelectCells,
	        dir
	    } = this.props;
	    const {dataIndex, render, fieldType, linkConfig, fontColor, bgColor, key, ...other} = column;
	    let {className = '', contentAlign, textAlign} = column;

	    let text = objectPath.has(record, dataIndex) ? objectPath.get(record, dataIndex) : objectPath.get(record, [dataIndex]);
	    let tdProps;
	    let colSpan;
	    let rowSpan, title;
	    let colMenu = column.cellMenu && this.renderColumnMenu(column.cellMenu, text, record, index);
	    const {fieldid: cellFieldid} = column;
	    let fieldidAttr = fieldid && !isExpandedRow ? { fieldid: (cellFieldid || dataIndex || key) + '' } : {}
	    // 如果是固定列在主表格上就渲染null
	    if (render && !hasSum) {
	        text = render(text, record, index, {
	            dataIndex, render, fieldType, linkConfig, fontColor, bgColor, ...other
	        });
	        if (this.isInvalidRenderCellText(text)) {
	            tdProps = text.props || {};
	            // rowSpan = (lazyEndIndex && tdProps.rowSpan > lazyEndIndex && lazyEndIndex > 5) ? lazyEndIndex - index : tdProps.rowSpan;
	            rowSpan = tdProps.rowSpan;
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


	    if (this.isInvalidRenderCellText(text)) {
	        text = null;
	    }

	    const indentText = expandIcon ? (
	        <span
	            style={{paddingLeft: `${indentSize * indent}px`}}
	            className={`${clsPrefix}-indent indent-level-${indent}`}
	        />
	    ) : null;


	    if (tdProps && tdProps.mergeEndIndex && index < tdProps.mergeEndIndex && rowSpan === 0) {
	        rowSpan = tdProps.mergeEndIndex - index;
	        text = ''
	    }
	    this.rowSpan = rowSpan;
	    // 注意：中间表格区域不需要渲染出固定列的单元格，以节省多余的性能消耗
	    // if (!fixed && column.fixed) return null;
	    let clsObj = {
	        [`${className}`]: !!className,
	        [`${prefix}-table-body-cell`]: true,
	        [`text-${column.contentAlign}`]: contentAlign,
	        [`text-${column.textAlign}`]: textAlign,
	        [`${clsPrefix}-has-expandIcon`]: expandIcon && expandIcon.props.expandable,
	        [`${prefix}-table-inline-icon`]: colMenu,
	        [`${clsPrefix}-cell-hover`]: this.state.hovered,
	    };
	    let classes = classnames(clsObj);
	    if ((typeof text == 'string' || typeof text === 'number') && bodyDisplayInRow) {
	        title = text + ''
	    }

	    if (typeof getCellClassName == 'function') {
	        const selfClassName = getCellClassName(record, index, column) || ''
	        classes += ` ${selfClassName}`
	    }

	    // 记录单元格数据和合并信息，框选点选需要使用计算
	    if (container && openSelectCells) {
	        const columnKey = key || dataIndex;
	        if (columnKey && (currentRowKey || currentRowKey == 0)) {
	            container[currentRowKey] = container[currentRowKey] || {};
	            container[currentRowKey][columnKey as string] = container[currentRowKey][columnKey as string] || {}
	            // container[currentRowKey][columnKey as string].text = typeof text === 'string' ? text : this.getChildrenText(text);
	            container[currentRowKey][columnKey as string].text = (rowSpan == 0 || colSpan == 0) ? '' : typeof text === 'string' ? text : this.getChildrenText(text);
	            container[currentRowKey][columnKey as string].rowSpan = (rowSpan || rowSpan == 0) ? rowSpan : 1;
	            container[currentRowKey][columnKey as string].colSpan = (colSpan || colSpan == 0) ? colSpan : 1;
	        }
	    }

	    if ((lazyStartIndex !== index) && (rowSpan === 0 || colSpan === 0)) {
	        return null;
	    }
	    if (colSpan == 0) return null;
	    const onCellObj = onCell && typeof onCell === 'function' ? onCell(record, index) : {};
	    const cellAttr = column.columnType && column.columnType === columnType.ROWDRAG ? { columnType: column.columnType } : {};
	    let cellStyle = {
	        // maxWidth: column.width,
	        color: fontColor,
	        backgroundColor: bgColor,
	        ...(record.style || {}),
	        ...column.style,
	    }
	    if (column && (column.fixed === 'right' || column.fixed === 'left' || column.fixed === true)) {
	        classes += ` ${prefix}-table-cell-fix-sticky`
	        if (column.fixed === 'right') {
	            cellStyle[dir === 'rtl' ? "left" : "right"] = column.offsetWidth;
	            classes += ` ${prefix}-table-cell-fix-right`
	            if (column.isFirstRight) {
	                classes += ` ${prefix}-table-cell-fix-right-first`
	            }
	        } else {
	            cellStyle[dir === 'rtl' ? "right" : "left"] = column.offsetWidth
	            classes += ` ${prefix}-table-cell-fix-left`
	            if (column.isLastLeft) {
	                classes += ` ${prefix}-table-cell-fix-left-last`
	            }
	            if (column.isAllLeft) {
	                classes += ` ${prefix}-table-cell-fix-left-all`
	            }
	        }
	    }


	    return (
	        isExpandCell ? (
	            hasSum ?
	                <td width={expandIconCellWidth} className={classes} style={cellStyle} dangerouslySetInnerHTML={{__html: '&nbsp;'}}></td> :
	                    <td
	                        className={`${clsPrefix}-expand-icon-cell ${classes}`}
	                        key={`${clsPrefix}-expand-icon-cell-${col}`}
	                        width={expandIconCellWidth}
	                        style={cellStyle}
	                    >
	                        {column && (column.fixed === 'left' || column.fixed === true) ? <span className={`${prefix}-table-cell-content`}> {expandNode} </span> : expandNode}
	                    </td>
	        ) : (
	            (column && (column.isFirstRight || column.isLastLeft)) && bodyDisplayInRow ?
	                <td
	                    {...fieldidAttr}
	                    draggable={column.draggable}
	                    colSpan={colSpan}
	                    rowSpan={rowSpan}
	                    className={classes}
	                    // onClick={this.handleClick}
	                    title={title}
	                    data-index={dataIndex}
	                    onPaste={this.onPaste}
	                    onMouseOver={this.onCellMouseOver}
	                    // key={colKey + "_" + daFixed}
	                    style={cellStyle}
	                    onMouseDown={(e) => this.onCellMouseDown(e, record, index)}
	                    onMouseEnter={(e) => this.onCellMouseEnter(e, record, index)}
	                    onMouseUp={(e) => this.onCellMouseUp(e, record, index)}
	                    onClick={(e) => this.onCellClick(e, record, index)}
	                    {...onCellObj} {...cellAttr}>
	                    <span className={`${prefix}-table-cell-content`}>
	                        {indentText}
	                        {expandIcon}
	                        {text}
	                        {colMenu}
	                    </span>
	                </td> : <td
	                    {...fieldidAttr}
	                    draggable={column.draggable}
	                    colSpan={colSpan}
	                    rowSpan={rowSpan}
	                    className={classes}
	                    // onClick={this.handleClick}
	                    title={title}
	                    data-index={dataIndex}
	                    onPaste={this.onPaste}
	                    onMouseOver={this.onCellMouseOver}
	                    onMouseDown={(e) => this.onCellMouseDown(e, record, index)}
	                    onMouseEnter={(e) => this.onCellMouseEnter(e, record, index)}
	                    onMouseUp={(e) => this.onCellMouseUp(e, record, index)}
	                    onClick={(e) => this.onCellClick(e, record, index)}
	                    style={cellStyle}
	                    {...onCellObj} {...cellAttr}>
	                    {indentText}
	                    {expandIcon}
	                    {text}
	                    {colMenu}
	                </td>
	        ))


	}
}

// TableCell.propTypes = propTypes;

export default TableCell;
