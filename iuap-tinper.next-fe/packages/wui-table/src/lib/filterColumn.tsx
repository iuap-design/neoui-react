/*
 * @Author: Mr.mjc
 * @Date: 2022-06-28 10:56:19
 * @LastEditors: MJC
 * @LastEditTime: 2024-11-15 14:16:49
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/filterColumn.tsx
 */
// import PropTypes from "prop-types";
import React, {Component, ReactNode} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {ConfigContext} from '../../../wui-provider/src/context';
import Button from "../../../wui-button/src";
import Checkbox from "../../../wui-checkbox/src";
import {prefix} from "../../../wui-core/src/index"
import Icon from "../../../wui-icon/src";
import Input from "../../../wui-input/src";
import Message from "../../../wui-message/src";
import i18n from "./i18n";
import {ObjectAssign} from "./util";
import {getLangInfo} from "../../../wui-locale/src/tool";
import {WithConfigConsumer} from "../../../wui-provider/src/context";
import { TableProps, IFilterColumnState, ColumnType, FixedType } from '../iTable';
import { TableInterface } from "../index";
import { ConfigConsumerProps } from "../../../wui-provider/src/iProvider";
import cacheTarget from './cache';
import { normalize } from '../lib/utils';

/**
 * 参数: 过滤表头
 * @param {*} Table
 * @param {*} Popover
 * @param {*} Icon
 */

export default function filterColumn(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    class FilterColumn extends Component<TableProps, IFilterColumnState> {
		static contextType = ConfigContext;
		static defaultProps = {
		    prefixCls: `${prefix}-table`,
		    afterFilter: () => {},
		    columnFilterAble: true,
		    scroll: {},
		    // locale: 'zh-cn',
		    lockable: 'enable', // 是否开启锁定列功能
		    filterCheckboxProps: (_column?: ColumnType) => {}
		};
		// static propTypes = {
		//     columns: PropTypes.any,
		//     data: PropTypes.any,
		//     scroll: PropTypes.any,
		//     columnSetPopover: PropTypes.bool,
		//     columnFilterAble: PropTypes.bool,
		//     checkMinSize: PropTypes.number,
		//     afterFilter: PropTypes.func,
		//     lockable: PropTypes.bool,
		//     locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		// };
		// static contextTypes = {
		//     beeLocale: PropTypes.object
		// }
		dragArr: ColumnType[] = [];
		unDragArrLeft: ColumnType[] = [];
		unDragArrRight: ColumnType[] = [];
		context!: ConfigConsumerProps;
		showColumnsKeys: any[];

		constructor(props: TableProps) {
		    super(props);
		    let {columns, cacheId, children} = props;
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    if (cacheId && typeof cacheId === 'string') {
		        columns = cacheTarget.get(cacheId, columns)
		    }
		    this.showColumnsKeys = [];
		    this.state = {
		        columns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[]),
		        tempColumns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[]), // 修改，未确定之前，临时的变量,popover展示的数据源
		        srcColumns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[]), // 最原始的数据源
		        showModal: props.columnSetPopover || false,
		        searchStr: '',
		        adaptiveHeight: 0,
		    };
		}

		setColumOrderByIndex = (_column: ColumnType[]) => {
		    _column.forEach((da: ColumnType) => {
		        // 默认所有的列都显示，如果传递ifshow属性，根据ifshow属性值来判断是否显示某列
		        if (da.hasOwnProperty("ifshow")) {
		            da.checked = !!da.ifshow;
		            da.ifshow = da.checked;
		            da.isShow = da.checked;
		            if (da.ifshow) {
		                this.showColumnsKeys.push(da.dataIndex)
		            }
		        } else if (da.hasOwnProperty("isShow")) {
		            da.checked = !!da.isShow;
		            da.ifshow = da.checked;
		            da.isShow = da.checked;
		            if (da.isShow) {
		                this.showColumnsKeys.push(da.dataIndex)
		            }
		        } else {
		            da.checked = true;
		            da.ifshow = true;
		            da.isShow = true;
		            this.showColumnsKeys.push(da.dataIndex)
		        }
		    });
		    return _column;
		};

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    if (nextProps.columns != this.props.columns || nextProps.children !== this.props.children) {
		        let {columns, cacheId, children} = nextProps;
		        if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		            columns = normalize(children)
		        }
		        if (cacheId && typeof cacheId === 'string') {
		            columns = cacheTarget.get(cacheId, columns)
		        }
		        this.showColumnsKeys = [];
		        this.setState({
		            columns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[]),
		            tempColumns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[]),
		            srcColumns: this.setColumOrderByIndex(ObjectAssign(columns) as ColumnType[])
		        });
		    }
		    this.setState({
		        showModal: !!nextProps.columnSetPopover
		    });
		}

		checkedColumItemClick = (da: ColumnType) => {
		    let {checkMinSize} = this.props; // 设置最少被选中的
		    let sum = 0,
		        leng = 0;
		    this.state.tempColumns.forEach(da => {
		        da.fixed ? "" : leng++;
		        !da.fixed && da.checked ? sum++ : "";
		    });
		    if (checkMinSize && sum < checkMinSize && da.checked) {
		        return false;
		    } else {
		        if (sum <= 1 && da.checked) return;
		    }
		    da.checked = !da.checked;
		    da.ifshow = !!da.checked;
		    da.isShow = !!da.checked;

		    this.setState({
		        ...this.state
		    });
		    // afterFilter(da, this.state.columns);
		};

		openCloumList = (height?: number) => {
		    // let realHeight = height ? height - 64 - 16 : 0; // 64（QDJCJS-15074），16为最外层内边距
		    let boxHeight = height ? height - 64 - 16 - 70 : 0;
		    let realHeight = boxHeight ? boxHeight : 0;
		    if (!this.state.showModal || this.state.adaptiveHeight !== realHeight) {
		        this.setState({
		            showModal: true,
		            adaptiveHeight: realHeight
		        });
		    }
		    // this.setState({
		    //     showModal: true,
		    // 	maxHeight: realHeight
		    // });
		};

		onHide = () => {
		    if (!('columnSetPopover' in this.props)) {
		        this.setState({
		            showModal: false
		        })
		    }
		}

		onChange = (e: string) => {
		    // console.log(e)
		    this.setState({
		        searchStr: e || ''
		    })
		}

		search = (str: any) => {
		    // return str.title.indexOf(this.state.searchStr) !== -1
		    // return typeof str.title == 'string' ? str.title.indexOf(this.state.searchStr) !== -1 : true; // 兼容处理，不是字符串时的情况
		    const { searchStr } = this.state;
		    if (typeof str.title == 'string') {
		        return str.title.toLocaleLowerCase().indexOf(searchStr.toLocaleLowerCase()) !== -1
		    } else {
		        return this.getChildrenText(str.title).indexOf(searchStr) !== -1
		    }
		}

		/**
		 * 递归获取React元素子集的文本集合
		 * @param elem
		 * @param results
		 * @returns {*}
		 */
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

		// sort = (a: any) => {
		//     // 兼容火狐浏览器排序错误
		//     let returnNum = a.fixed ? -1 : 1
		//     return returnNum;
		// }

		// 递归列锁定和非锁定状态
		setChildColumns = (columns: ColumnType[], fixed: FixedType) => {
		    columns.forEach((da, _i) => {
		        da.fixed = fixed;
		        if (da.children && Array.isArray(da.children) && da.children.length > 0) {
		            this.setChildColumns(da.children as ColumnType[], fixed);
		        }
		    })
		}


		lockClick = (da: ColumnType) => {
		    let {lockIndex, fixed} = da;
		    const {tempColumns} = this.state;
		    tempColumns.forEach((da, i) => {
		        if ((lockIndex || lockIndex === 0) && fixed && i >= lockIndex) {
		            // 如果右固定则保持不动
		            let newFixed = fixed === 'right' ? 'right' : undefined as FixedType;
		            da.fixed = newFixed;
		            if (da.children && Array.isArray(da.children) && da.children.length > 0) {
		                this.setChildColumns(da.children as ColumnType[], fixed);
		            }
		        }

		        if ((lockIndex || lockIndex === 0) && !fixed && i <= lockIndex) {
		            da.fixed = 'left';
		            if (da.children && Array.isArray(da.children) && da.children.length > 0) {
		                this.setChildColumns(da.children as ColumnType[], 'left');
		            }
		        }

		    })

		    this.setState({
		        ...this.state
		    });
		}

		getTargetLockble = (propsLockable: boolean | string): string => {
		    if (typeof propsLockable === 'boolean') {
		        return propsLockable ? 'enable' : 'disable'
		    } else if (typeof propsLockable === 'string') {
		        return propsLockable
		    } else {
		        return 'enable'
		    }
		}

		getCloumItem = () => {
		    const {prefixCls, lockable: propsLockable = 'enable', filterCheckboxProps, fieldid, filterColumnRender, dir: direction = 'ltr'} = this.props;
		    let lockable = this.getTargetLockble(propsLockable)
		    const {tempColumns} = this.state;
		    this.dragArr = [];
		    this.unDragArrLeft = [];
		    this.unDragArrRight = [];
		    let fieldidCheckBox = fieldid ? { fieldid: `${fieldid}_check_box` } : {};
		    let fieldidDrag = fieldid ? { fieldid: `${fieldid}_drag` } : {};
		    let fieldidLock = fieldid ? { fieldid: `${fieldid}_lock` } : {};
		    let fieldidUnlock = fieldid ? { fieldid: `${fieldid}_unlock` } : {};
		    let directionAttr = direction === 'rtl' ? { direction } : {};
		    tempColumns.forEach((da, i) => {
		        da.lockIndex = i;
		        const { dataIndex } = da;
		        let isDefaultColumn = dataIndex === 'checkbox' || dataIndex === 'radio' || dataIndex === '_index';
		        if (!isDefaultColumn) {
		            if (da.fixed === true || da.fixed === 'left') {
		                this.unDragArrLeft.push(da);
		            } else if (da.fixed === 'right') {
		                this.unDragArrRight.push(da);
		            } else {
		                this.dragArr.push(da);
		            }
		        }
		    });
		    return (
		        <DragDropContext onDragEnd={this.onDragEnd}>
		            {
		                this.unDragArrLeft.filter(this.search).map((da, i) => ( // 表现行为和列表展示一致
		                    <div
		                        key={da.key + "_" + i}
		                        data-key={da.key}
		                        className={`${prefixCls}-filter-column-pop-cont-item`}
		                    >
		                        <Icon type="uf-tuodong" { ...fieldidDrag } {...directionAttr}/>
		                        <Checkbox { ...fieldidCheckBox } {...directionAttr} {...((filterCheckboxProps && filterCheckboxProps(da)) || {})} checked={da.checked} disabled>
		                            {(filterColumnRender && typeof filterColumnRender === 'function' ? filterColumnRender(da) : da._originTitle || da.title) as ReactNode}
		                        </Checkbox>
		                        {(lockable === 'enable' || lockable === 'onlyPop') && da.fixed && <Icon type="uf-dongjie" { ...fieldidLock} {...directionAttr} onClick={() => {
		                            this.lockClick(da)
		                        }}/>}
		                        {(lockable === 'enable' || lockable === 'onlyPop') && !da.fixed && <Icon type="uf-weidongjie" { ...fieldidUnlock } {...directionAttr} onClick={() => {
		                            this.lockClick(da)
		                        }}/>}
		                    </div>
		                ))
		            }
		            <Droppable droppableId="droppable" direction="vertical">
		                {(provided: any) => (
		                    <div
		                        ref={provided.innerRef}
		                        {...provided.droppableProps}
		                    >
		                        {
		                            this.dragArr.filter(this.search).map((da, i) =>
		                                (
		                                    <Draggable key={da.key + "_" + i} index={i} draggableId={da.key + "_" + i}>
		                                        {(provided: any, snapshot: any) => (
		                                            <div
		                                                ref={provided.innerRef}
		                                                {...provided.draggableProps}
		                                                {...provided.dragHandleProps}
		                                                key={da.key + "_" + i}
		                                                data-key={da.key}
		                                                className={`${prefixCls}-filter-column-pop-cont-item`}
		                                                style={{
		                                                    backgroundColor: snapshot.isDragging ? '#eff1f6' : '#fff',
		                                                    border: snapshot.isDragging ? '1px dashed #666' : 'none',
		                                                    ...provided.draggableProps.style
														  }}
		                                            >
		                                                <Icon type="uf-tuodong" { ...fieldidDrag } {...directionAttr}/>
		                                                <Checkbox { ...fieldidCheckBox } {...directionAttr} checked={da.checked} onClick={() => this.checkedColumItemClick(da)} {...((filterCheckboxProps && filterCheckboxProps(da)) || {})}>
		                                                    {(filterColumnRender && typeof filterColumnRender === 'function' ? filterColumnRender(da) : da._originTitle || da.title) as ReactNode}
		                                                </Checkbox>
		                                                {(lockable === 'enable' || lockable === 'onlyPop') && da.fixed && <Icon type="uf-dongjie" { ...fieldidLock} {...directionAttr} onClick={() => {
		                                                    this.lockClick(da)
		                                                }}/>}
		                                                {(lockable === 'enable' || lockable === 'onlyPop') && !da.fixed && <Icon type="uf-weidongjie" { ...fieldidUnlock } {...directionAttr} onClick={() => {
		                                                    this.lockClick(da)
		                                                }}/>}
		                                            </div>
		                                        )}
		                                    </Draggable>
		                                )
		                            )
		                        }
		                        {provided.placeholder}
		                    </div>
		                )}
		            </Droppable>
		            {
		                this.unDragArrRight.filter(this.search).map((da, i) => ( // 表现行为和列表展示一致
		                    <div
		                        key={da.key + "_" + i}
		                        className={`${prefixCls}-filter-column-pop-cont-item`}
		                        data-key={da.key}
		                    >
		                        <Icon type="uf-tuodong" { ...fieldidDrag } {...directionAttr}/>
		                        <Checkbox { ...fieldidCheckBox } {...directionAttr} {...((filterCheckboxProps && filterCheckboxProps(da)) || {})} checked={da.checked} disabled>
		                            {(filterColumnRender && typeof filterColumnRender === 'function' ? filterColumnRender(da) : da._originTitle || da.title) as ReactNode}
		                        </Checkbox>
		                        {(lockable === 'enable' || lockable === 'onlyPop') && da.fixed && <Icon type="uf-dongjie" { ...fieldidLock} {...directionAttr} onClick={() => {
		                            this.lockClick(da)
		                        }}/>}
		                        {(lockable === 'enable' || lockable === 'onlyPop') && !da.fixed && <Icon type="uf-weidongjie" { ...fieldidUnlock } {...directionAttr} onClick={() => {
		                            this.lockClick(da)
		                        }}/>}
		                    </div>
		                ))
		            }
		        </DragDropContext>
		    );
		};

		clear = (flag: boolean) => { // 全选，重置
		    // const {srcColumns} = this.state;
		    // let cloneSrcColumns: ColumnType[] = [];
		    // srcColumns.forEach((da, index) => {
		    //     cloneSrcColumns[index] = {
		    //         ...da,
		    //         checked: flag || this.showColumnsKeys.includes(da.dataIndex),
		    //         ifshow: flag || this.showColumnsKeys.includes(da.dataIndex),
		    //         isShow: flag || this.showColumnsKeys.includes(da.dataIndex),
		    //     }
		    // });
		    // srcColumns 原始的数据源
		    // tempColumns 修改，未确定之前，临时的变量,popover展示的数据源\
			const { onSetColumnReset } = this.props;
			const {srcColumns, tempColumns} = this.state;
			let cloneSrcColumns: ColumnType[] = [];
			if (flag) {
				let dataList = tempColumns;
				cloneSrcColumns = dataList.map((da) => {
					// 全选时, 列锁定, 要保持原状态
				if (flag && da.fixed) {
						return {...da}
					}
					return {
						...da,
						checked: flag || this.showColumnsKeys.includes(da.dataIndex),
						ifshow: flag || this.showColumnsKeys.includes(da.dataIndex),
						isShow: flag || this.showColumnsKeys.includes(da.dataIndex),
					}
				})
				this.setState({
					tempColumns: cloneSrcColumns,
					searchStr: ''
				});
			} else {
				if (onSetColumnReset && typeof onSetColumnReset === 'function') {
					cloneSrcColumns = onSetColumnReset(srcColumns);
				} else {
					let dataList = srcColumns;
					cloneSrcColumns = dataList.map((da) => {
							// 全选时, 列锁定, 要保持原状态
						if (flag && da.fixed) {
							return {...da}
						}
						return {
							...da,
							checked: flag || this.showColumnsKeys.includes(da.dataIndex),
							ifshow: flag || this.showColumnsKeys.includes(da.dataIndex),
							isShow: flag || this.showColumnsKeys.includes(da.dataIndex),
						}
					})
					this.setState({
						tempColumns: cloneSrcColumns,
						searchStr: ''
					});
				}
			}

			// if (onSetColumnReset && typeof onSetColumnReset === 'function') {
			// 	cloneSrcColumns = onSetColumnReset(srcColumns);
			// } else {
			// 	let dataList = flag ? tempColumns : srcColumns;
			// 	cloneSrcColumns = dataList.map((da) => {
			// 			// 全选时, 列锁定, 要保持原状态
			// 		if (flag && da.fixed) {
			// 				return {...da}
			// 			}
			// 			return {
			// 				...da,
			// 				checked: flag || this.showColumnsKeys.includes(da.dataIndex),
			// 				ifshow: flag || this.showColumnsKeys.includes(da.dataIndex),
			// 				isShow: flag || this.showColumnsKeys.includes(da.dataIndex),
			// 			}
			// 		})
			// }
		    this.setState({
		        tempColumns: cloneSrcColumns,
		        searchStr: ''
		    });
		};

		// 检测是否显示的列都是固定状态，不允许显示列全部固定
		checkColumn = (tempColumns: any) => {
		    // let isAllFixed = true;
		    let showNum = 0;
		    let fixedNum = 0;
		    for (let i = 0; i < tempColumns.length; i++) {
		        if (tempColumns[i].isShow !== false && tempColumns[i].ifshow !== false) {
		            showNum++
		        }
		        if (tempColumns[i].fixed) {
		            fixedNum++
		        }
		    }
		    return showNum === fixedNum;
		}

		resetFilterColumns = (newColumns: ColumnType[]) => {
		    this.setState({
		        columns: this.setColumOrderByIndex(ObjectAssign(newColumns) as ColumnType[]),
		        tempColumns: this.setColumOrderByIndex(ObjectAssign(newColumns) as ColumnType[]),
		        srcColumns: this.setColumOrderByIndex(ObjectAssign(newColumns) as ColumnType[])
		    });
		}

		setColumns = (newColumns: ColumnType[]) => {
		    return newColumns.map((column: ColumnType, _index: number) => {
		        delete column.innerHeaderIcon;
		        return {
		            ...column,
		            title: column._originTitle || column.title
		        }
		    })
		}

		save = () => {
		    if (this.checkColumn(this.state.tempColumns)) {
		        let propsLocale = this.props.locale || this.context.locale
		    	let locale = getLangInfo(propsLocale, i18n, 'table');
		        Message.destroy();
    			Message.create({ content: `${locale.langMap.cancelLock || '锁定区域超出屏幕范围, 已为您临时取消锁定'}`, color: 'warning' });
		        return;
		    }
		    const { afterFilter, cacheId } = this.props;
		    this.setState({
		        columns: ObjectAssign(this.state.tempColumns) as ColumnType[]
		    })
		    if (cacheId && typeof cacheId === 'string') {
		        cacheTarget.set(cacheId, ObjectAssign(this.state.tempColumns) as ColumnType[]);
		    }
		    afterFilter && afterFilter(this.setColumns(this.state.columns), this.setColumns(this.state.tempColumns));
		    this.onHide()
		};

		onDragEnd = (result: any) => {
			 if (!result.destination) {
		        return;
		    }
		    if (result.destination.index === result.source.index) {
		        return;
		    }
		    // const {tempColumns} = this.state
		    const [removed] = this.dragArr.splice(result.source.index, 1);
		    this.dragArr.splice(result.destination.index, 0, removed);
		    this.setState({
		        tempColumns: this.unDragArrLeft.concat(this.dragArr).concat(this.unDragArrRight)
		    })

		};

		onVisible = (bool: boolean) => {
		    const { onSetColumnVisibleChange } = this.props;
		    if (bool) { // 弹框显示，同步popover要展示的数据
		        this.setState({
		            tempColumns: ObjectAssign(this.state.columns) as ColumnType[],
		            searchStr: ''
		        });
		    }
		    onSetColumnVisibleChange && onSetColumnVisibleChange(bool);
		}

		lockTableClick = (column: ColumnType, index: number) => {
		    let {lockIndex = index, fixed} = column;
		    const {tempColumns} = this.state;
		    const { afterFilter, cacheId } = this.props;
		    const targetColumns = ObjectAssign([...tempColumns]) as ColumnType[]
		    targetColumns.forEach((da, i) => {
		        if (fixed && i >= lockIndex) {
		            let fixed = da.fixed === 'right' ? 'right' : undefined as FixedType;
		            da.fixed = fixed;
		            if (da.children && Array.isArray(da.children) && da.children.length > 0) {
		                this.setChildColumns(da.children as ColumnType[], fixed);
		            }
		        }

		        if (!fixed && i <= lockIndex) {
		            da.fixed = 'left';
		            if (da.children && Array.isArray(da.children) && da.children.length > 0) {
		                this.setChildColumns(da.children as ColumnType[], 'left');
		            }
		        }

		    })
		    if (this.checkColumn(targetColumns)) {
		        let propsLocale = this.props.locale || this.context.locale
		    	let locale = getLangInfo(propsLocale, i18n, 'table');
		        Message.destroy();
    			Message.create({ content: `${locale.langMap.cancelLock || '锁定区域超出屏幕范围, 已为您临时取消锁定'}`, color: 'warning' });
		        return;
		    }
		    if (cacheId && typeof cacheId === 'string') {
		        cacheTarget.set(cacheId, targetColumns);
		    }
		    this.setState({
		        columns: ObjectAssign(targetColumns) as ColumnType[]
		    })
		    afterFilter && afterFilter(this.setColumns(this.state.columns), this.setColumns(targetColumns));
		}
		lockColumn = (column: ColumnType, index: number) => {
		    // 根据回调重新设置的colunms会带有已经设置的icon功能属性，如拖拽后重新setColumns,所以需要判读是否还需要重新添加
		    const { lockable: propsLockable = 'enable', fieldid, dir: direction = 'ltr' } = this.props;
		    let lockable = this.getTargetLockble(propsLockable)
		    let fieldidLockAttr = fieldid ? { fieldid: `${fieldid}_filter_column_lock_icon` } : {};
		    let fieldidUnlockAttr = fieldid ? { fieldid: `${fieldid}_filter_column_unlock_icon` } : {};
		    let directionAttr = direction === 'rtl' ? { dir: direction } : {};
		    if (column.dataIndex === 'checkbox' || column.dataIndex === 'radio' || column.dataIndex === '_index') {
		        return column;
		    }
		    let wrapClassName = column.fixed ? `${prefix}-table-column-lock ${prefix}-table-column-lock-active` : `${prefix}-table-column-lock`;
		    let lockButton = <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
		        {column.fixed && <Icon type="uf-dongjie" { ...fieldidLockAttr } { ...directionAttr } onClick={() => {
		            this.lockTableClick(column, index)
		        }}/>}
		        {!column.fixed && <Icon type="uf-weidongjie" { ...fieldidUnlockAttr } { ...directionAttr } onClick={() => {
		            this.lockTableClick(column, index)
		        }}/>}
		    </div>;
		    column._originTitle = column._originTitle || column.title;
		    column.title = <>
		        {typeof column.title === 'string' ? <span className={`${prefix}-table-title-text-span`}
														  title={column.title}>{column.title}</span> : column.title}
		        {/* {lockable && !column._hasFilterColumn ? lockButton : null} */}
		    </>;
		    column.innerHeaderIcon = column.innerHeaderIcon || {}
		    if ((lockable === 'enable' || lockable === 'onlyHeader')) {
		        column.innerHeaderIcon.lockButton = lockButton
		    } else {
		        // 消除拖拽等造成的影响
		        column.innerHeaderIcon.lockButton = null
		    }
		    // column._hasFilterColumn = column._hasFilterColumn || true;
		    return column
		}
		renderColums = (columns: ColumnType[]) => {
		    let tempColumns = [];
		    tempColumns = columns.map((originColumn: ColumnType, i: number) => {
		        let column = Object.assign({}, originColumn);
		        return this.lockColumn(column, i);
		    });
		    return tempColumns;
		}

		render() {
		    const {data, prefixCls, fieldid, onFilterColumnRender, filterColumnClassName, dir: direction = 'ltr'} = this.props;
		    const {columns, showModal, adaptiveHeight} = this.state;

		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n, 'table');
		    let fieldidInput = fieldid ? { fieldid } : {};
		    let fieldidReset = fieldid ? { fieldid: `${fieldid}_reset` } : {};
		    let fieldidCancel = fieldid ? { fieldid: `${fieldid}_cancel` } : {};
		    let fieldidOk = fieldid ? { fieldid: `${fieldid}_ok` } : {};
		    let directionAttr = direction === 'rtl' ? { direction } : {};
		    // let _columns: ColumnType[] = [];
		    // columns.forEach(da => {
		    //     if (da.ifshow || da.isShow) {
		    //         _columns.push(da);
		    //     }
		    // });
		    let filterClassName = filterColumnClassName ? `${prefixCls}-filter-column-pop-cont ${filterColumnClassName}` : `${prefixCls}-filter-column-pop-cont`
		    let maxHeightAttr = adaptiveHeight ? { maxHeight: adaptiveHeight > 105 ? adaptiveHeight : 105, minHeight: '105px' } : {minHeight: '105px'}
		    let content = onFilterColumnRender ? onFilterColumnRender(columns) : (
		        <div className={filterClassName}>
		            <div className={`${prefixCls}-filter-column-pop-header`}>
		                <Input type="search" value={this.state.searchStr} onChange={this.onChange} { ...fieldidInput } { ...directionAttr }
							   onSearch={this.onChange}/>
		            </div>
		            {/* <div className={`${prefixCls}-filter-column-pop-content`}>
		                {this.getCloumItem()}
		            </div> */}
		            <div className={`${prefixCls}-filter-column-pop-box`} style={{...maxHeightAttr}}>
		                <div className={`${prefixCls}-filter-column-pop-content`}>
		                    {this.getCloumItem()}
		                </div>
		            </div>
		            <div className={`${prefixCls}-filter-column-pop-footer`}>
		                <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.clear(true)} { ...fieldidReset }>
		                    {locale.langMap.selAll || '全选'}
		                </span>
		                <span className={`${prefixCls}-filter-column-clear-setting`} onClick={() => this.clear(false)} { ...fieldidReset }>
		                    {locale.langMap.resetSettings || '重置'}
		                </span>
		                <Button colors="secondary" size="sm" { ...fieldidCancel } { ...directionAttr } onClick={this.onHide}>{locale.langMap.cancel || '取消'}</Button>
		                <Button colors="primary" size="sm" { ...fieldidOk } { ...directionAttr } onClick={this.save}>{locale.langMap.ok || '确定'}</Button>
		            </div>
		        </div>
		    );

		    return (
		        <Table
		            {...this.props}
		            columns={this.renderColums(columns)}
		            data={data}
		            filterColumnContent={content}
		            filterColumnShowModal={showModal}
		            filterColumnOnHide={this.onHide}
		            filterColumnOnVisibleChange={this.onVisible}
		            filterColumnOpenCloumList={this.openCloumList}
		            resetFilterColumns={this.resetFilterColumns}
		        />
		    );
		}
    }
    return WithConfigConsumer()(FilterColumn) as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
