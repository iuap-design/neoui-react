/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 17:39:30
 * @LastEditors: MJC
 * @LastEditTime: 2024-04-16 19:21:16
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/lib/singleFilter.tsx
 */
// import PropTypes from 'prop-types';
import List from 'rc-virtual-list';
import React, {Component} from "react";
import {ConfigContext} from '../../../wui-provider/src/context';
import Button from "../../../wui-button/src";
import Checkbox from "../../../wui-checkbox/src";
import RadioWrapper from "../../../wui-radio/src";
import {prefix} from "../../../wui-core/src/index"
import Icon from "../../../wui-icon/src";
import Input from "../../../wui-input/src";
import Popover from "../../../wui-popover/src";
import i18n from "./i18n";
import {getLangInfo} from "../../../wui-locale/src/tool";
import { ObjectAssign} from "./util";
import {getItemKey, normalize} from './utils';
import { TableProps, ISingleFilterState, ColumnType} from '../iTable';
import { DefaultRecordType, DataIndex, FilterDropdownDataType } from '../interface';
import { TableInterface } from "../index";
import { ConfigConsumerProps } from '../../../wui-provider/src/iProvider';
import singleFilterX from './singleFilterX';

// const CheckboxGroup = Checkbox.Group;
/**
 * 参数：prefixCls，默认bee-table,用于设置图标的样式
 * @param {*} Table
 * @param {*} Icon
 */


export default singleFilterX;

export function singleFilter(Table: React.ComponentClass<Partial<TableProps>> | TableInterface) {
    return class SingleFilterTable extends Component<TableProps, ISingleFilterState> {
		key: string | number;
		handleKey: string | number;
		handleSrc: boolean;
		data: DefaultRecordType[];
		// handleIcon: HTMLElement | undefined | EventTarget | null;
		static contextType = ConfigContext;
		context!: ConfigConsumerProps;
		hideData: DefaultRecordType[];
		// data: DefaultRecordType[];
		constructor(props: TableProps) {
		    super(props);
		    let {columns, children} = props
		    if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		        columns = normalize(children)
		    }
		    let flatColumns = this._toFlatColumn(columns, -1);
		    this.state = {
		        data: this.props.data,
		        columns: columns,
		        flatColumns: flatColumns,
		        filterObj: {},
		        showTop: false
		    };
		    this.key = ''; // 当前点击的key
		    this.handleKey = ''; // 当前过滤操作的key
		    this.handleSrc = false; // 触发当前过滤事件的入口
		    this.data = ObjectAssign(this.props.data) as DefaultRecordType[]; // 缓存一份未过滤初始的数据
		    // this.data = [...this.props.data]; // 缓存一份未过滤初始的数据
		    this.hideData = [];
		}

		static defaultProps = {
		    prefixCls: `${prefix}-table`, // 默认是前端排序，值为true为后端排序
		    rowKey: 'key',
		    filterDropdownAuto: 'auto',
		    filterDropdownData: [],
		    childrenColumnName: 'children',
		    filterMode: 'single'
		};

		UNSAFE_componentWillReceiveProps(nextProps: TableProps) {
		    let {columns, children, data, clearFilter = true, childrenColumnName} = nextProps
		    if (columns !== this.props.columns || children !== this.props.children) {
		        if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
		            columns = normalize(children)
		        }
		        let flatColumns = this._toFlatColumn(columns, -1);
		        this.setState({columns: columns, flatColumns});
		    }
		    if (data !== this.state.data) {
		        if (clearFilter) {
		            this.setState({
		                data: data,
		                filterObj: {},
		                showTop: false
		            }, () => {
		                this.key = ''; // 当前点击的key
		                this.handleSrc = false; // 数据变化引起的过滤
		                this.handleKey = ''; // 重新拉去数据后清空之前点击缓存的column的key
		                this.data = ObjectAssign(data) as DefaultRecordType[];
		            });
		        } else {
		            this.data = ObjectAssign(data) as DefaultRecordType[];
		            let hideKeys: any = [];
		            this.hideData.forEach((item, index) => {
		                hideKeys.push(this.getRowKey(item, index))
		            })

		            const newData = this.handleData(data, hideKeys, childrenColumnName);
		            this.setState({data: newData});
		            this.props._onDataChange && this.props._onDataChange(newData)
		        }
		    }

		}

		getRowKey = (record: any, index?: number) => {
		    const { rowKey } = this.props;
		    return typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey as string]
		}

		handleData = (data: any[], hideKeys: any[], childrenColumnName: string) => {
		    return data.reduce((newData: any[], record: any, index: number) => {
		        const currentKey = this.getRowKey(record, index);
		        const newRecord = {...record};
		        if (!hideKeys.includes(currentKey)) {
		            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length > 0) {
		                let childrenRecord = this.handleData(record[childrenColumnName], hideKeys, childrenColumnName);
		                newRecord[childrenColumnName] = childrenRecord;
		            }
		            newData.push(newRecord)
		        }
		        return newData
		    }, [])
		}

		/**
		 *column扁平化处理，适应多表头避免递归操作
		 *
		 */
		_toFlatColumn(columns: ColumnType[], parentIndex: number = -1, flatColumns: ColumnType[] = []):ColumnType[] {
		    const that = this;
		    let children = [];
		    flatColumns = flatColumns || [];
		    // const flatColumns = that.state;
		    columns.forEach((item) => {
		        item.parentIndex = parentIndex;
		        children = item.children as ColumnType[];
		        flatColumns.push(item);
		        if (children) {
		            // item.children = [];
		            that._toFlatColumn(children, flatColumns.length - 1, flatColumns);
		        }
		    });
		    return flatColumns;
		}

		/**
		 * 初始化数据
		 * */
		initData = (key: string | number) => {
		    const {columns = []} = this.state;
		    const { filterMode = 'single' } = this.props;
		    let filterObj = {...this.state.filterObj}
		    let currentColumn = columns.find(item => item.dataIndex === key) as ColumnType;
		    if (!currentColumn) return;
		    const { filterMultiple = true } = currentColumn;
		    if (filterMode === 'single') { // 单列筛选，同时期只支持一列筛选
		        // 每点击一列，其他列置空
		        if (filterObj[key]) {
		            return
		        }
		        if (currentColumn.filterDropdownAuto && currentColumn.filterDropdownAuto === 'manual') {
		            filterObj[key] = {
		                dataIndex: key,
		                searchStr: '', // 输入框搜索的值
		                filterAllList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], //  选框所有的数据集合
		                originFilterCheckedList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 缓存选框选中的数据集合
		                filterCheckedList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 选框选中的数据集合
		                originFilterAllList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
		                // filterList: [], // 启用选中的item
		                isFilter: false, // 是否启用过滤
		                checkAll: true,
		                indeterminate: false
		            }
		        } else {
		            filterObj[key] = {
		                dataIndex: key,
		                searchStr: '', // 输入框搜索的值
		                filterAllList: [],
		                originFilterCheckedList: [],
		                filterCheckedList: [],
		                // filterList: [], // 启用选中的item
		                originFilterAllList: [],
		                isFilter: false, // 是否启用过滤
		                checkAll: true,
		                indeterminate: false
		            };
		            this.data.forEach(item => {
		                let itemKey = getItemKey(item, key);
		                if (filterObj[key].filterAllList.indexOf(itemKey) === -1 && (typeof itemKey === 'number' || typeof itemKey === 'string' || itemKey === undefined)) {
		                    filterObj[key].filterAllList.push(itemKey);
		                    if (filterMultiple) {
		                        filterObj[key].filterCheckedList.push(itemKey);
		                        filterObj[key].originFilterCheckedList.push(itemKey);
		                    }
		                    filterObj[key].originFilterAllList.push(itemKey);
		                }
		            })
		        }
		    } else if (filterMode === 'multiple') { // 多列筛选，每次点击都要重新
		        // 过滤所有筛选项：已选中的是否显示 =>  取决于当前显示的数据是否还有包含项
               	// 未选中的是否显示 =>  取决于隐藏的数据是否还有包含项

		        if (!filterObj[key] || !filterObj[key].isFilter) { // 未过滤过，第一次点击
		            if (currentColumn.filterDropdownAuto && currentColumn.filterDropdownAuto === 'manual') {
		                filterObj[key] = {
		                    dataIndex: key,
		                    searchStr: '', // 输入框搜索的值
		                    filterAllList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], //  选框所有的数据集合
		                    originFilterCheckedList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 缓存选框选中的数据集合
		                    filterCheckedList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 选框选中的数据集合
		                    originFilterAllList: ((currentColumn.filterDropdownData || []) as FilterDropdownDataType[]).map(item => item.value) || [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
		                    // filterList: [], // 启用选中的item
		                    isFilter: false, // 是否启用过滤
		                    checkAll: true,
		                    indeterminate: false
		                }
		            } else {
		                filterObj[key] = {
		                    dataIndex: key,
		                    searchStr: '', // 输入框搜索的值
		                    filterAllList: [],
		                    originFilterCheckedList: [],
		                    filterCheckedList: [],
		                    // filterList: [], // 启用选中的item
		                    originFilterAllList: [],
		                    isFilter: false, // 是否启用过滤
		                    checkAll: true,
		                    indeterminate: false
		                };
		                this.data.forEach(item => {
		                    let itemKey = getItemKey(item, key);
		                    if (filterObj[key].filterAllList.indexOf(itemKey) === -1 && (typeof itemKey === 'number' || typeof itemKey === 'string' || itemKey === undefined)) {
		                        if (filterMultiple) {
		                            filterObj[key].filterCheckedList.push(itemKey);
		                            filterObj[key].originFilterCheckedList.push(itemKey);
		                        }
		                        filterObj[key].filterAllList.push(itemKey)
		                        filterObj[key].originFilterAllList.push(itemKey);
		                    }
		                })
		            }
		        }
		        let newItemKeys = this.state.data.map(item => getItemKey(item, key)); // 现有的展示数据的所有集合
		        let hideKeys = this.hideData.map(item => getItemKey(item, key)) // 隐藏的数据的集合
		        filterObj[key].filterAllList = filterObj[key].originFilterAllList.filter((item: any) => {
		            if (!filterObj[key].originFilterCheckedList.includes(item)) { // 未勾选，是否显示判断标准勾选后会不会有新数据显示
		                if (hideKeys.includes(item)) { // 隐藏的数据包含
		                    let result = this.checkData(key, item)
		                    return result
		                } else {
		                    return false
		                }
		            } else { // 已勾选
		                if (newItemKeys.includes(item)) { // 显示的数据包含
		                    return true
		                } else {
		                    return false
		                }
		            }
		        }) // 过滤其他列已筛选掉的数据
		        filterObj[key].checkAll = this.isContainerArr(true, filterObj);
		    	filterObj[key].indeterminate = this.isContainerArr(false, filterObj);

		    }
		    this.setState({filterObj})
		}
		// 每个column上添加orderNum属性，不排序时为“”。
		// 点击时orderNum有值则不重新赋值，如果没有值，则取当前column下的有oderNum的length值。并排序
		// 点击置为“”时，动态的设置相关column的orderNum值。并排序
		renderColumnsDropdown = (columns: ColumnType[]) => {
		    let tempColumns = [], rsColumns: ColumnType[] = [];
		    tempColumns = columns.map((originColumn: ColumnType) => {
		        let column = Object.assign({}, originColumn);
		        return this.filterColumn(column);
		    });
		    rsColumns = this._flatToColumn(tempColumns);
		    return rsColumns;
		};

		checkData = (key: string | number, item: string | number) => {
		    const {filterObj} = this.state;
		    let restData: any[] = [];
		    this.hideData.forEach(da => {
		        if (getItemKey(da, key) === item) { //  隐藏数据中包含的数据
		            let result = true;
		            Object.keys(filterObj).filter(k => k != key).forEach(_k => {
		                if (!filterObj[_k].filterCheckedList.includes(getItemKey(da, _k))) {
		                    result = false
		            	}
		        	})
		            if (result) {
		                restData.push(da)
		            }
		        }
		    })
		    return !!restData.length;
		}

		/**
		 * input 有过滤值时， selectList是否包含 filterAllList,判断全选状态, 参数：ture是全选判断，false是半选判断
		 * */
		isContainerArr = (v: boolean, target?: any) => {
		    // const {filterObj} = this.state;
		    let filterObj = target || this.state.filterObj;
		    const {key} = this;
		    let newArr = filterObj[key].filterAllList.filter((item: string) => {
		        return filterObj[key].filterCheckedList.indexOf(item) !== -1;
		    })
		    if (v) {
		        return newArr.length === filterObj[key].filterAllList.length && newArr.length !== 0;
		    } else {
		        return newArr.length > 0;
		    }
		}
		/**
		 * check onchange 事件判断
		 * */
		checkChange = (v: boolean, item:string) => {
		    const {filterObj} = this.state;
		    const {key} = this;
		    if (v) {
		        filterObj[key].filterCheckedList = filterObj[key].filterCheckedList.concat(item)
		    } else {
		        filterObj[key].filterCheckedList = filterObj[key].filterCheckedList.filter((_item:string) => _item !== item)
		    }
		    filterObj[key].checkAll = this.isContainerArr(true);
		    filterObj[key].indeterminate = this.isContainerArr(false);
		    this.setState({
		        filterObj: this.state.filterObj
		    })
		};

		clickRadio = (_event: React.ChangeEvent<HTMLInputElement>, value: string | boolean | number, item: string) => {
		    const {filterObj} = this.state;
		    const {key} = this;
		    filterObj[key].filterCheckedList = []
		    if (value) {
		        filterObj[key].filterCheckedList.push(item)
		    }
		    this.setState({
		        filterObj: this.state.filterObj
		    })
		};

		iconClick = (_e:React.MouseEvent<HTMLElement>, key:string | number) => {
		    this.handleSrc = true; // 主动触发的过滤
		    this.key = key;
		    this.initData(key);
		    this.setState({
		        showTop: true
		    })
		}
		/**
		 * input 输入框改变时，触发的事件
		 * */
		inputChange = (v: string) => {
		    const {filterObj} = this.state;
		    const {key} = this;
		    filterObj[key].searchStr = v;
		    if (v) {
		        if (v === '空值') {
		            filterObj[key].filterAllList = filterObj[key].originFilterAllList.filter((item: string | number) => item == undefined);
		        } else {
		            filterObj[key].filterAllList = filterObj[key].originFilterAllList.filter((item: string | number) => ((item || item === 0) && item.toString().indexOf(v) !== -1));
		        }
		    } else {
		        filterObj[key].filterAllList = filterObj[key].originFilterAllList.concat();
		    }
		    // filterObj[key].filterCheckedList = filterObj[key].filterCheckedList.filter((item: string | number) => filterObj[key].filterAllList.includes(item)) // 搜索过滤完需要筛选去掉过滤掉的选项
		    filterObj[key].checkAll = this.isContainerArr(true);
		    filterObj[key].indeterminate = this.isContainerArr(false);
		    this.setState({
		        filterObj: this.state.filterObj
		    })
		}

		/**
		 * 全选触发事件, 参数bool
		 * */
		isAllCheck = (v: boolean) => {
		    const {filterObj} = this.state;
		    const {key} = this;
		    filterObj[key].checkAll = v;
		    filterObj[key].indeterminate = v;
		    if (v) {
		        filterObj[key].filterCheckedList = filterObj[key].filterAllList
		    } else {
		        filterObj[key].filterCheckedList = []
		    }
		    this.setState({
		        filterObj: this.state.filterObj
		    })
		};

		filterData = (data: DefaultRecordType[], key?: string, hideData?: DefaultRecordType[]) => {
		    const {childrenColumnName, filterMode = 'single'} = this.props;
		    const {columns = [], filterObj} = this.state;
		    if (filterMode === 'multiple') {
		        return data.reduce((newData, record) => {
		            let result = true;
		            let newRecord = {...record};
		            columns.forEach(col => {
		                const { filterMultiple = true, onFilter, dataIndex } = col;
		                if (filterObj[dataIndex as string]) {
		                    let checkedList: any[] = filterObj[dataIndex as string].filterCheckedList;
		                    checkedList = filterMultiple ? checkedList : checkedList[0];
		                    if (onFilter && typeof onFilter === 'function') { // 这一条数据要满足所有列的onFilter
		                        let flag = checkedList.some(item => onFilter(item, record))
		                        if (!flag) {
		                            result = false
		                        }
		                    } else {
		                        let itemKey = getItemKey(record, dataIndex as string);
		                        if (!checkedList.includes(itemKey)) {
		                            result = false
		                        }
		                    }
		                }
		            })
		            if (result) {
		                newData.push(newRecord)
		            } else {
		                hideData && hideData.push(newRecord)
		            }
		            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length > 0) {
		                let childrenRecord = this.filterData(record[childrenColumnName]);
		                newRecord[childrenColumnName] = childrenRecord;
		            }
		            return newData;
		        }, [])
		    } else {
		        return data.reduce((newData, record) => {
		            let result = true;
		            let newRecord = {...record};
		            let currentColumn = columns.find(item => item.dataIndex === key) as ColumnType;
		    		if (!currentColumn) return;
		            const { filterMultiple = true, onFilter, dataIndex } = currentColumn;
		            if (filterObj[dataIndex as string]) {
		                let checkedList: any[] = filterObj[dataIndex as string].filterCheckedList;
		                checkedList = filterMultiple ? checkedList : checkedList[0];
		                if (onFilter && typeof onFilter === 'function') { // 这一条数据要满足所有列的onFilter
		                    let flag = checkedList.some(item => onFilter(item, record))
		                    if (!flag) {
		                        result = false
		                    }
		                } else {
		                    let itemKey = getItemKey(record, dataIndex as string);
		                    if (!checkedList.includes(itemKey)) {
		                        result = false
		                    }
		                }
		            }
		            if (result) {
		                newData.push(newRecord)
		            } else {
		                hideData && hideData.push(newRecord)
		            }
		            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length > 0) {
		                let childrenRecord = this.filterData(record[childrenColumnName]);
		                newRecord[childrenColumnName] = childrenRecord;
		            }
		            return newData;
		        }, [])
		    }

		}


		onHide = () => {
		    const {key} = this;
		    const {filterObj} = this.state;
		    filterObj[key].filterCheckedList = filterObj[key].originFilterCheckedList;
		    filterObj[key].checkAll = filterObj[key].filterCheckedList.length && filterObj[key].filterAllList.length === filterObj[key].filterCheckedList.length;
		    filterObj[key].indeterminate = filterObj[key].filterCheckedList.length;
		    this.setState({
		        filterObj: filterObj,
		        showTop: false,
		    });
		}

		save = () => {
		    const {filterObj} = this.state;
		    const {filterMode = 'single'} = this.props;
		    if (this.handleSrc) { // 点击触发的过滤，更新操作的key
		        this.handleKey = this.key;
		    }
		    const {handleKey: key} = this;
		    let tempData = this.state.data;
		    if (filterObj[key]) {
		        if (filterObj[key].filterCheckedList.length !== filterObj[key].originFilterAllList.length) {
		            filterObj[key].isFilter = true;
		            if (filterMode === 'single') { // 单列筛选则去除其他选项的已筛选状态
		                Object.keys(filterObj).forEach((item: string) => {
		                    if (key !== item) {
		                        // filterObj[item].isFilter = false
		                        delete filterObj[item];
		                    }
		                })
		            }
		        } else {
		            filterObj[key].isFilter = false;
		        }
		        filterObj[key].originFilterCheckedList = filterObj[key].filterCheckedList;
		    }

		    // tempData = this.filter(tempData, filterObj);
		    tempData.splice(0)
		    this.hideData = [];
		    let newData = this.filterData([...this.data], key as string, this.hideData) as DefaultRecordType[];
		    newData.forEach((item, index) => { // 不改变原有的引用地址
		        tempData[index] = item;
		    })
		    this.setState({
		        data: tempData,
		        filterObj
		    })
		    this.props._onDataChange && this.props._onDataChange(tempData)
		    this.handleSrc && this.onHide()
		};

		getCloumItem = (key: string | number, column: ColumnType) => {
		    const {filterObj} = this.state;
		    const {prefixCls} = this.props;
		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n);
		    const { filterMultiple = true } = column;
		    return (
		        <List data={filterObj[key]?.filterAllList || []} height={300} itemHeight={30} itemKey="item">
		            {
		                (item: string, index: number) => {
		                    let text = item === undefined ? (locale.langMap.nullValue || '空值') : item;
		                    return (
		                        <div className={`${prefixCls}-pop-check-wrap`} title={text}>
		                            {filterMultiple ? <Checkbox value={item} key={`${item}_${index}`}
		                                checked={filterObj[key]?.filterCheckedList.includes(item)}
		                                onChange={(v: boolean) => this.checkChange(v, item)}>
		                                {text}
		                            </Checkbox> :
		                                <RadioWrapper value={item} checked={filterObj[key]?.filterCheckedList.includes(item)} onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string | boolean | number) => this.clickRadio(event, value, item)}>{text}</RadioWrapper>}
		                        </div>
		                    )
		                }
		            }
		        </List>
		    );
		};

		showTop = () => {
		    this.setState({
		        showTop: true
		    })
		}

		onVisibleChangeTop = (visible: boolean) => {
		    if (!visible) {
		        this.key = ''
		    }
		    this.setState({
		        showTop: visible
		    })
		}

		filterColumn = (column: ColumnType) => {
		    if (column.dataIndex === 'checkbox' || column.dataIndex === 'radio' || column.singleFilter === false) {
		        return column
		    }
		    let propsLocale = this.props.locale || this.context.locale
		    let locale = getLangInfo(propsLocale, i18n, 'table');
		    const {dataIndex, filterMultiple = true} = column;
		    const {prefixCls, fieldid, onSingleFilterRender} = this.props;
		    let fieldidAttr = fieldid ? { fieldid: `${fieldid}_single_filter_icon` } : {}
		    const {filterObj} = this.state;
		    let content = this.key === dataIndex ? (
		        <div className={`${prefixCls}-pop-cont-single-filter`}>
		            <div>
		                <Input type="search" showClose value={filterObj[dataIndex]?.searchStr}
							   onChange={this.inputChange}/>
		            </div>
		            <div className={`${prefixCls}-pop-cont-single-filter-check`}>
		                {this.getCloumItem(dataIndex, column)}
		            </div>
		            <div className={`${prefixCls}-pop-footer`}>
		                {filterMultiple ? <span className={`${prefixCls}-clear-setting`}>
		                    <Checkbox indeterminate={filterObj[dataIndex]?.indeterminate} checked={filterObj[dataIndex]?.checkAll}
		                        onChange={(checked: boolean) => {
		                            this.isAllCheck(checked)
		                        }}>{locale.langMap.all || '全部'}</Checkbox>
		                </span> : null}
		                <Button colors="secondary" size="sm" onClick={this.onHide}>{locale.langMap.cancel || '取消'}</Button>
		                <Button colors="primary" size="sm" onClick={this.save}>{locale.langMap.ok || '确定'}</Button>
		            </div>
		        </div>
		    ) : null;
		    let isActive = (filterObj[dataIndex as DataIndex] && filterObj[dataIndex as DataIndex].isFilter) || (this.state.showTop && this.key === dataIndex)
		    let wrapClassName = isActive ? `${prefix}-table-column-single-filter ${prefix}-table-column-single-filter-active` : `${prefix}-table-column-single-filter`;
		    let filterButton = onSingleFilterRender ? onSingleFilterRender(column) : <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
		        <Popover rootClose arrowPointAtCenter placement="top" content={content} trigger="click" show={this.state.showTop}
				        onVisibleChange={this.onVisibleChangeTop}>
		            <Icon type={isActive ? "uf-biaotoushaixuanyixuannormal" : "uf-shaixuan1-copy"} {...fieldidAttr} onClick={(e) => {
		                this.iconClick(e, dataIndex as DataIndex)
		            }}/>
		        </Popover>
		    </div>;
		   column._originTitle = column._originTitle || column.title;
		    column.title = <>
		        {typeof column.title === 'string' ? <span className={`${prefix}-table-title-text-span`}
														  title={column.title}>{column.title}</span> : column.title}
		        {/* {column._hasSingleFilter ? null : filterButton} */}
		    </>;
		    // 集合所有的最后一起处理，方便调整样式和维护(需要考虑自定义title生成icon情况)
		    column.innerHeaderIcon = column.innerHeaderIcon || {}
		    column.innerHeaderIcon.filterButton = filterButton
		    // column._hasSingleFilter = column._hasSingleFilter || true;
		    return column;
		};

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
		handleDropBorder = (event:React.MouseEvent<HTMLElement>, newWidth: number, newColumn: ColumnType, newColumns: ColumnType[]) => {
		    const {onDropBorder} = this.props;
		    let flatColumn = this.state.flatColumns.find(column => column.dataIndex == newColumn.dataIndex) as ColumnType;
		    flatColumn.width = newWidth;
		    this.setState({flatColumns: this.state.flatColumns});
		    typeof onDropBorder == 'function' && onDropBorder(event, newWidth, newColumn, newColumns);
		}

		_onDataChange = (data: DefaultRecordType[]) => {
		    this.setState({data})
		    this.props._onDataChange && this.props._onDataChange(data)
		}

		render() {
		    let columns = this.renderColumnsDropdown(this.state.flatColumns.concat());
		    return <Table {...this.props} columns={columns} data={this.state.data} onDropBorder={this.handleDropBorder}
						  _onDataChange={this._onDataChange}/>;
		}
    } as React.ComponentClass<Partial<TableProps>> | TableInterface;
}
