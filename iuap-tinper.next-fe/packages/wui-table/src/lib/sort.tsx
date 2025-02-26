// import PropTypes from 'prop-types';
import React, {Component} from "react";
import {prefix} from "../../../wui-core/src/index";
// import Icon from '../../../wui-icon/src';
import { TableProps, ISortState, ColumnType, SortColType } from '../iTable';
import { DefaultRecordType, DataIndex } from '../interface';
import { TableInterface } from "../index";
import Tooltip from '../../../wui-tooltip/src/index'
import omit from "omit.js"
import {getLangInfo} from "../../../wui-locale/src/tool";
import {ConfigContext} from '../../../wui-provider/src/context';
import i18n from './i18n';
import { ConfigConsumerProps } from "../../../wui-provider/src/iProvider";
import cacheTarget from './cache';
import { normalize } from '../lib/utils';

/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 * @param {*} Icon
 */

export default function sort(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class SortTable extends Component<TableProps, ISortState> {
		static contextType = ConfigContext;
		context!: ConfigConsumerProps;
		constructor(props: TableProps) {
		    super(props);
		    let {columns, cacheId, children, data = []} = props;
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    if (cacheId && typeof cacheId === 'string') {
		        columns = cacheTarget.get(cacheId, columns)
		    }
		    let flatColumns = this._toFlatColumn(columns, -1);
		    let oldData = data.concat();
		    // this.showData = this.getShowData(props.data,props.columns)
		    this.state = {
		        data: props.data,
		        columns: props.columns,
		        flatColumns: flatColumns,
		        oldData
		    };
		}

		static defaultProps = {
		    prefixCls: `${prefix}-table`,
		    sort: {mode: "single", backSource: false}, // 默认是前端排序，值为true为后端排序s
		    rowKey: 'key',
		    showSorterTooltip: false,
		    // locale: 'zh-cn'
		};

		// static propTypes = {
		//     columns: PropTypes.any,
		//     sort: PropTypes.any,
		//     data: PropTypes.any,
		//     onDropBorder: PropTypes.func,
		//     sortDirections: PropTypes.array, // 支持的排序方式
		//     rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		//     _onDataChange: PropTypes.func,
		// }

		componentDidMount() {
		    this._initSort();
		}

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {

		    if (nextProps.columns !== this.props.columns || nextProps.children !== this.props.children) {
		        let {columns, cacheId, children} = nextProps;
		        if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		            columns = normalize(children)
		        }
		        if (cacheId && typeof cacheId === 'string') {
		            columns = cacheTarget.get(cacheId, columns)
		        }
		        let flatColumns = this._toFlatColumn(columns, -1);
		        this.setState({
		            columns: nextProps.columns,
		            flatColumns
		        }, () => {
		            this._initSort(); // columns改变时（sortOrder改变）重新排序
		        });
		    }
		    if ('data' in nextProps) {
		        // const { data, columns } = nextProps;
		        // let newDataKeys = this.getOldDataKey(data);
		        // let oldDataKeys = this.getOldDataKey(this.state.data);
		        // if(nextProps.data !== this.state.data && newDataKeys.toString() !== oldDataKeys.toString()) { // 多选后数据经过处理引用地址不同，但是顺序没变
		        // if(JSON.stringify(this.getShowData(data, columns)) !== JSON.stringify(this.showData)){
		        if (nextProps.data !== this.state.data) {
		            this.setState({
		                data: nextProps.data,
		                oldData: nextProps.data.concat()
		            }, function() {
		                this._initSort(); // 数据更新后需要重新排序
		            });
		            // this._initSort()
		        }
		    }
		}

		// getOldDataKey = (data) => {
		// 	let rowKeyList = []
		// 	const { rowKey } = this.props;
		// 	(data || []).forEach((item, index) => {
		// 		let key = getRowKey(item, index, rowKey);
		// 		rowKeyList.push(key);
		// 	})
		// 	return rowKeyList;
		// }

		// 通过oldData还原data
		resetData = (data: DefaultRecordType[]) => {
		    const {oldData = []} = this.state;
		    oldData.forEach((item, index) => {
		        data[index] = item;
		    })
		    return data;
		}

		// 初始化或data数据变化时重新依据排序状态进行排序
		_initSort = () => {
		    const {sort} = this.props;
		    const {flatColumns} = this.state;
		    let needSort = false;
		    flatColumns.forEach(item => {
		        if (item.order == 'descend' || item.order == 'ascend' || item.sortOrder == 'descend' || item.sortOrder == 'ascend') {
		            needSort = true;
		            return
		        }
		    })
		    if (needSort) {
		        if (sort && !sort.backSource && sort.mode !== "single") {// 多列排序情况下数据排序
		            let data = this.multiSort(flatColumns)
		            this.setState({data})
		            this.props._onDataChange && this.props._onDataChange(data)
		        } else {
		            // //单列排序情况下如果data受控会出现死循环，需要重新考虑
		            if (sort && !sort.backSource) {
		                this.singleSort(flatColumns)
		            }
		        }
		    }
		}

		// 初始化多列排序
		// initMultisort = () => {
		// 	const {flatColumns} = this.state;
		// 	flatColumns.forEach((item) => {
		// 		if (item.order == "ascend" || item.order == "descend" || item.sortOrder == "ascend" || item.sortOrder == "descend") {
		// 			let orderCopy = item.order || item.sortOrder
		// 			this.toggleSortOrder(orderCopy, item)
		// 		}
		// 	})
		// }

		/**
		 *column扁平化处理，适应多表头避免递归操作
		 *
		 */
		_toFlatColumn(columns: ColumnType[], parentIndex: number = -1, flatColumns:ColumnType[] = []):ColumnType[] {
		    const that = this;
		    let children = [];
		    flatColumns = flatColumns || [];
		    columns.forEach((item: ColumnType) => {
		        item.parentIndex = parentIndex;
		        item.key = item.key || item.dataIndex; // 保证唯一值
		        children = item.children as ColumnType[];
		        flatColumns.push(item);
		        if (children) {
		            // item.children = [];
		            that._toFlatColumn(children, flatColumns.length - 1, flatColumns);
		        }
		    });
		    return flatColumns;
		}

		getOrderNum = () => {
		    let orderNum = 0;
		    // todo 1
		    this.state.flatColumns.forEach((item) => {
		        if (item.order == "ascend" || item.order == "descend") {
		            orderNum++;
		        }
		    });
		    return orderNum ? orderNum : 1;
		};

		/**
		 * column 当前的排序的列
		 * 当有的列不排序时，将该列的orderNum置为‘’，并动态的修改其他列的orderNum。
		 */
		changeOrderNum = (column:ColumnType) => {
		    let {flatColumns} = this.state;
		    // todo 2
		    flatColumns.forEach((col:ColumnType) => {
		        if (col.orderNum && column.orderNum && col.orderNum > column.orderNum) {
		            col.orderNum--;
		        }
		        if (col.orderNum && column.key == col.key) {
		            // col.orderNum = null;
		            col.orderNum = undefined;
		        }
		    });
		    this.setState({flatColumns});
		};
		/**
		 * 获取排序字段
		 */
		getOrderCols = (columns: ColumnType[]) => {
		    let orderCols: SortColType[] = [];
		    // todo 3
		    columns.forEach(item => {
		        if (item.order == "ascend" || item.order == "descend") {
		            orderCols.push({
		                order: item.order,
		                field: item.dataIndex,
		                orderNum: item.orderNum
		            });
		        }
		    });
		    return orderCols;
		};

		/**
		 * pre：前一条数据
		 * after:后一条数据
		 * orderType:升序、降序
		 */
		_sortBy = (pre:DefaultRecordType, after:DefaultRecordType, orderCols:Partial<ColumnType>, orderColslen: number, currentIndex: number): any => {
		    const currentCol = orderCols[currentIndex];
		    const getMultiSorterValueFunc = currentCol?.getMultiSorterValue
		    let preKey = pre[currentCol?.key];
		    let afterKey = after[currentCol?.key];
		    if (getMultiSorterValueFunc) {
		        preKey = getMultiSorterValueFunc(pre, currentCol)
		        afterKey = getMultiSorterValueFunc(after, currentCol)
		    }
		    let colSortFun = currentCol?.sorter;
		    if (typeof colSortFun !== 'function') {
		        if (colSortFun === 'string') {
		            colSortFun = () => preKey.localeCompare(afterKey);
		        } else if (colSortFun === 'date') {
		            // @ts-ignore
		            colSortFun = () => new Date(preKey) - new Date(afterKey);
		        } else {
		            colSortFun = () => preKey - afterKey;
		        }
		    }
		    if (preKey == afterKey && currentIndex + 1 <= orderColslen) {
		        return this._sortBy(pre, after, orderCols, orderColslen, currentIndex + 1);
		    }
		    if (currentCol?.sortOrder == "ascend" || currentCol?.order == "ascend") {
		        return colSortFun(pre, after);
		    } else {
		        return -colSortFun(pre, after);
		    }
		};
		/**
		 * 多列排序 先排order为1的，其他的基于已排序的数据排
		 */
		multiSort = (columns: ColumnType[]) => {
		    let {data} = this.state;
		    const that = this;
		    let orderCols = {},
		        orderColslen = 0;
		    // todo 4
		    columns.forEach(item => {
		        if (item.orderNum) {
		            orderColslen++;
		            orderCols[item.orderNum] = item;
		        }
		    });
		    if (orderColslen > 0) {
		        data = data.sort(function(a, b) {
		            return that._sortBy(a, b, orderCols, orderColslen, 1);
		        });
		    } else {
		        // data = oldData.concat();
		        data = this.resetData(data)
		    }
		    return data;
		};

		singleSort = (columns: ColumnType[] = []) => {
		    let currentCol = columns.find(item => (item.order && item.order !== 'flatscend') || (item.sortOrder && item.sortOrder !== 'flatscend'))// 初始化第一个order排序
		    if (currentCol) {
		        let order = currentCol.sortOrder || currentCol.order || ''
		    	this.toggleSortOrder(order as string, currentCol)
		    }
		}

		toggleSortOrder = (order: string, column:ColumnType) => {
		    let {data = [], oldData = [], flatColumns = []} = this.state;
		    // let {sort} = this.props;
		    let {sort, cacheId} = this.props;
		    let seleObj: Partial<ColumnType> = {};
		    // if (!oldData.length) {
		    // 	oldData = data.concat();
		    // }
		    let sortCol;
		    // 单列排序，清空其他列的排序
		    if (sort && sort.mode == "single") {
		        // todo 5
		        flatColumns.forEach(da => {
		            if (da.key == column.key) {
		                seleObj = da;
		            } else {
		                if (da.order) {
		                    da.order = "flatscend";// 还原排序状态
		                } else if (da.sortOrder) {
		                    da.sortOrder = 'flatscend'
		                }
		            }
		        });
		        seleObj.order = order;// 当前排序列状态
		        sortCol = [{order: order, field: seleObj.dataIndex}]
		        // 通过后端请求
		        if (sort.backSource && typeof sort.sortFun === "function") {
		            // 获取排序的字段和方式
		            sort.sortFun(sortCol);

		        } else {
		            if (column.sorter) {
		                if (order === "ascend" || order === "descend") {
		                    if (typeof column.sorter == 'function') {
		                        data = data.sort(function(a, b) {
		                            // @ts-ignore
		                            return order === "ascend" ? column.sorter(a, b) : column.sorter(b, a);
		                        });
		                    } else if (typeof column.sorter == 'string') {
		                        if (column.sorter == 'string') {
		                            data = data.sort(function(a, b) {
		                                // @ts-ignore
		                                return order === "ascend" ? a[column.dataIndex].localeCompare(b[column.dataIndex]) : b[column.dataIndex].localeCompare(a[column.dataIndex]);
		                            });
		                        } else if (column.sorter == 'number') {
		                            data = data.sort(function(a, b) {
		                                // @ts-ignore
		                                return order === "ascend" ? a[column.dataIndex] - b[column.dataIndex] : b[column.dataIndex] - a[column.dataIndex];
		                            });
		                        } else if (column.sorter == 'date') {
		                            data = data.sort(function(a, b) {
		                                // @ts-ignore
		                                return order === "ascend" ? new Date(a[column.dataIndex]) - new Date(b[column.dataIndex]) : new Date(b[column.dataIndex]) - new Date(a[column.dataIndex]);
		                            });
		                        }
		                    }
		                } else {
		                    data = this.resetData(data)
		                }
		            } else {
		                data = this.resetData(data)
		            }
		            typeof sort.sortFun === "function" && sort.sortFun(sortCol, data, oldData);
		        }
		    } else {// 多列排序
		        seleObj = flatColumns.find(da => da.key == column.key) as ColumnType;
		        seleObj.order = order;
		        if (order === "flatscend") {
		            this.changeOrderNum(column);
		        }
		        if (!seleObj.orderNum && (column.sortOrder == "ascend" || column.sortOrder == "descend" || order == "ascend" || order == "descend")) {
		            seleObj.orderNum = this.getOrderNum();
		        }
		        sortCol = this.getOrderCols(flatColumns);
		        if (sort && sort.backSource && typeof sort.sortFun === "function") {
		            sort.sortFun(sortCol);
		        } else {
		            data = this.multiSort(flatColumns);
		            sort && typeof sort.sortFun === "function" && sort.sortFun(sortCol, data, oldData);
		        }
		    }
		    if (cacheId && typeof cacheId === 'string') {
		        cacheTarget.setOne(cacheId, flatColumns, seleObj)
		    }
		    if (!sort || (sort && !sort.backSource)) { // 非后端排序
		        this.setState({data, oldData, flatColumns});
		        this.props._onDataChange && this.props._onDataChange(data)
		    }
		};
		// 每个column上添加orderNum属性，不排序时为“”。
		// 点击时orderNum有值则不重新赋值，如果没有值，则取当前column下的有oderNum的length值。并排序
		// 点击置为“”时，动态的设置相关column的orderNum值。并排序
		renderColumnsDropdown = (columns: ColumnType[]) => {
		    // const { cacheId, childrenColumnName} = this.props;
		    // if (cacheId && typeof cacheId === 'string') {
		    //     columns = cacheTarget.get(cacheId, columns, childrenColumnName) as ColumnType<DefaultRecordType>[];
		    // }
		    let tempColumns = [], rsColumns = [];
		    tempColumns = columns.map((originColumn:ColumnType) => {
		        let column = Object.assign({}, originColumn);
		        return this.sortColumn(column);
		    });
		    rsColumns = this._flatToColumn(tempColumns);
		    return rsColumns;
		};

		sortColumn = (column: ColumnType) => {
		    const { mode = 'single' } = this.props.sort || {};
		    let {sortDirections, fieldid, showSorterTooltip, dir: direction = 'ltr'} = this.props;
		    let fieldidUpAttr = fieldid ? { fieldid: `${fieldid}_sort_up_icon` } : {}
		    let fieldidDownAttr = fieldid ? { fieldid: `${fieldid}_sort_down_icon` } : {}
		    let directionAttr = direction ? { dir: direction } : {}
		    sortDirections = column.sortDirections || sortDirections || ['ascend', 'descend']
		    let iconTypeIndex = 0;
		    let sorterClass = "flat";

		    // 兼容antd的sortOrder
		    if (column.sortOrder === "ascend" || column.order === "ascend") {
		        iconTypeIndex = 1;
		        sorterClass = "up";
		    } else if (column.sortOrder === "descend" || column.order === "descend") {
		        iconTypeIndex = 2;
		        sorterClass = "down";
		    }

		    let sortButton;

		    // sorter和sortEnable均可触发排序,且sorter优先级更高
		    if (column.sorter || column.sortEnable) {
		        // 大于0说明不是升序就是降序，判断orderNum有没有值，没有值赋值
		        if (column.sortEnable && !column.sorter && column.dataIndex) {
		            switch (column.fieldType) {
		            case 'number': {
		                column.sorter = this.numberSortFn(column.dataIndex);
		                break;
		            }
		            case 'stringChinese': {
		                column.sorter = this.chineseSortFn(column.dataIndex);
		                break;
		            }
		            default: {
		                column.sorter = this.defaultSortFn(column.dataIndex);
		                break;
		            }
		            }
		        }
		        if (iconTypeIndex > 0 && !column.orderNum && mode == "multiple") {
		            column.orderNum = this.getOrderNum();
		        }
		        let {overlayUpText, overlayDownText} = this.tooltipOverlay(column)
		        let tooltipProps: any = column?.showSorterTooltip && typeof column?.showSorterTooltip === 'object' ? {...column?.showSorterTooltip} : showSorterTooltip && typeof showSorterTooltip === 'object' ? {...showSorterTooltip} : null
		        let wrapClassName = sorterClass === 'up' || sorterClass === 'down' ? `${prefix}-table-column-sorter ${prefix}-table-column-sorter-active` : `${prefix}-table-column-sorter`;
		        sortButton = <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
		            <span className={`${prefix}-table-column-sorter-${sorterClass}`}>
		                {sortDirections && sortDirections.includes('ascend') ? <Tooltip overlay={overlayUpText} { ...directionAttr } {...omit(tooltipProps, ["overlay"])}><i className={`uf uf-triangle-up`} { ...fieldidUpAttr } { ...directionAttr } onClick={() => {
		                    this.iconClick('ascend', 'up', column)
		                }}/></Tooltip> : null}
		                {sortDirections && sortDirections.includes('descend') ? <Tooltip overlay={overlayDownText} { ...directionAttr } {...omit(tooltipProps, ["overlay"])}><i className={`uf uf-triangle-down`} { ...fieldidDownAttr } { ...directionAttr } onClick={() => {
		                    this.iconClick('descend', 'down', column)
		                }}/></Tooltip> : null}
		                <span className={`${prefix}-table-column-sorter-num`}>{column.orderNum}</span>
		            </span>
		        </div>;
		    }
		    column._originTitle = column._originTitle || column.title;
		    column.title = <>
		        {typeof column.title === 'string' ? <span className={`${prefix}-table-title-text-span`}
														  title={column.title}>{column.title}</span> : column.title}
		        {/* {column._hasSort ? null : sortButton} */}
		    </>;
		    column.innerHeaderIcon = column.innerHeaderIcon || {}
		    if (sortButton) {
		        column.innerHeaderIcon.sortButton = sortButton
		    }
		    // column._hasSort = column._hasSort || true;
		    return column;
		};

		tooltipOverlay = (column: ColumnType) => {
		    if (column.sortOrder) {
		        return {
		            overlayDownText: '',
		            overlayUpText: ''
		        }
		    }
		    let { showSorterTooltip } = this.props
		    let columnShowSorterTooltip = column?.showSorterTooltip
		    let overlayUpText = ''
		    let overlayDownText = ''
		    let propsLocale = this.props.locale || this.context.locale
		    let local = getLangInfo(propsLocale, i18n, 'table');
		    if (typeof columnShowSorterTooltip === 'boolean' && columnShowSorterTooltip) {
		        if (column?.order == 'descend') {
		            overlayDownText = local.langMap.cancelOverlay || '点击取消排序'
		            overlayUpText = local.langMap.overlayUpText || '点击升序'
		        } else if (column?.order == 'ascend') {
		            overlayDownText = local.langMap.overlayDownText || '点击降序'
		            overlayUpText = local.langMap.cancelOverlay || '点击取消排序'
		        } else if (column?.order == 'flatscend' || !column?.order) {
		            overlayDownText = local.langMap.overlayDownText || '点击降序'
		            overlayUpText = local.langMap.overlayUpText || '点击升序'
		        }
		    } else if (typeof columnShowSorterTooltip === 'boolean' && !columnShowSorterTooltip) {
		        overlayDownText = ''
		        overlayUpText = ''
		    } else if (typeof columnShowSorterTooltip === 'object') {
		        if (columnShowSorterTooltip?.overlay) {
		            overlayDownText = columnShowSorterTooltip?.overlay
		            overlayUpText = columnShowSorterTooltip?.overlay
		        } else {
		            if (column?.order == 'descend') {
		                overlayDownText = local.langMap.cancelOverlay || '点击取消排序'
		                overlayUpText = local.langMap.overlayUpText || '点击升序'
		            } else if (column?.order == 'ascend') {
		                overlayDownText = local.langMap.overlayDownText || '点击降序'
		                overlayUpText = local.langMap.cancelOverlay || '点击取消排序'
		            } else if (column?.order == 'flatscend' || !column?.order) {
		                overlayDownText = local.langMap.overlayDownText || '点击降序'
		                overlayUpText = local.langMap.overlayUpText || '点击升序'
		            }
		        }
		    } else {
		        if (typeof showSorterTooltip === 'boolean' && showSorterTooltip) {
		            if (column?.order == 'descend') {
		                overlayDownText = local.langMap.cancelOverlay || '点击取消排序'
		                overlayUpText = local.langMap.overlayUpText || '点击升序'
		            } else if (column?.order == 'ascend') {
		                overlayDownText = local.langMap.overlayDownText || '点击降序'
		                overlayUpText = local.langMap.cancelOverlay || '点击取消排序'
		            } else if (column?.order == 'flatscend' || !column?.order) {
		                overlayDownText = local.langMap.overlayDownText || '点击降序'
		                overlayUpText = local.langMap.overlayUpText || '点击升序'
		            }
		        } else if (typeof showSorterTooltip === 'boolean' && !showSorterTooltip) {
		            overlayDownText = ''
		            overlayUpText = ''
		        } else if (typeof showSorterTooltip === 'object') {
		            if (showSorterTooltip?.overlay) {
		                overlayDownText = showSorterTooltip?.overlay
		                overlayUpText = showSorterTooltip?.overlay
		            } else {
		                if (column?.order == 'descend') {
		                    overlayDownText = local.langMap.cancelOverlay || '点击取消排序'
		                    overlayUpText = local.langMap.overlayUpText || '点击升序'
		                } else if (column?.order == 'ascend') {
		                    overlayDownText = local.langMap.overlayDownText || '点击降序'
		                    overlayUpText = local.langMap.cancelOverlay || '点击取消排序'
		                } else if (column?.order == 'flatscend' || !column?.order) {
		                    overlayDownText = local.langMap.overlayDownText || '点击降序'
		                    overlayUpText = local.langMap.overlayUpText || '点击升序'
		                }
		            }
		        } else {
		            overlayDownText = ''
		            overlayUpText = ''
		        }
		    }
		    return {overlayUpText, overlayDownText}
		}

		iconClick = (order: string, type: string, column: ColumnType) => {
		    if (column.sortOrder) {
		        return
		    }
		    let tempOrder = order;
		    let tempType = type;
		    if (column.order === order) {
		        tempOrder = 'flatscend';
		        tempType = 'flat';
		    }

		    this.toggleSortOrder(tempOrder, column);

		    if (column.sorterClick) {
		        column.sorterClick(column, tempType);
		    }
		}


		// 默认的比较函数,即字符串比较函数
		defaultSortFn = (key: DataIndex) => (a:DefaultRecordType, b: DefaultRecordType) => {
		    return a[key] >= b[key] ? 1 : -1;
		}
		// 数值比较函数
		numberSortFn = (key: DataIndex) => (a:DefaultRecordType, b: DefaultRecordType) => {
		    let numberA = parseFloat(a[key]);
		    let numberB = parseFloat(b[key]);
		    return numberA >= numberB ? 1 : -1;
		}

		// 中文比较函数，按拼音排序
		chineseSortFn = (key: DataIndex) => (a:DefaultRecordType, b: DefaultRecordType) => {
		    return a[key].localeCompare(b[key], 'zh-Hans-CN', {sensitivity: 'accent'});
		}

		_flatToColumn(flatColumns: ColumnType[]) {
		    const colLen = flatColumns.length;
		    let parentIndex, rsColumns = [];
		    // 每次渲染需要将父类的children置空，避免重复
		    flatColumns.forEach(item => {
		        if (item.children) {
		            item.children = [];
		        }
		    })
		    for (let i = colLen - 1; i >= 0; i--) {
		        parentIndex = flatColumns[i].parentIndex;
		        if ((parentIndex || parentIndex == 0) && parentIndex >= 0) {
		            // @ts-ignore
		            flatColumns[parentIndex].children.unshift(flatColumns[i]);
		        }
		    }
		    rsColumns = flatColumns.filter(item => {
		        return item.parentIndex == -1
		    })
		    return rsColumns;
		}

		// 列宽度拖拽后需要更新sort组件的state.columns数据（否则点了排序后被拖拽的列宽度会被还原）
		handleDropBorder = (event:React.MouseEvent<HTMLElement>, newWidth: number, newColumn:ColumnType, newColumns:ColumnType[]) => {
		    const {onDropBorder} = this.props;
		    let flatColumn = this.state.flatColumns.find(column => column.dataIndex == newColumn.dataIndex) as ColumnType;
		    flatColumn.width = newWidth;
		    this.setState({flatColumns: this.state.flatColumns});
		    typeof onDropBorder == 'function' && onDropBorder(event, newWidth, newColumn, newColumns);
		}

		_onDataChange = (data: DefaultRecordType[]) => {
		    this.setState({data, oldData: data.concat()})
		    this.props._onDataChange && this.props._onDataChange(data)
		}

		render() {
		    let columns = this.renderColumnsDropdown(this.state.flatColumns.concat());
		    return <Table {...this.props} columns={columns} data={this.state.data} onDropBorder={this.handleDropBorder}
						  _onDataChange={this._onDataChange}/>;
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
