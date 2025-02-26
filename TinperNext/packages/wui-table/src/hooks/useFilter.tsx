import React, { Fragment, useCallback, useMemo, useRef, useState, useContext, useEffect } from "react";
import List from 'rc-virtual-list';
import {getLangInfo} from "../../../wui-locale/src/tool";
import {ConfigContext} from '../../../wui-provider/src/context';
import i18n from "../lib/i18n";
import {prefix} from "../../../wui-core/src/index"
import { DefaultRecordType} from "../interface";
import { InnerColumnType } from '../iTable';
import Popover from "../../../wui-popover/src/index";
import Icon from "../../../wui-icon/src/index";
import Input from "../../../wui-input/src/index";
import Button from "../../../wui-button/src/index";
import Checkbox from "../../../wui-checkbox/src/index";
import RadioWrapper from "../../../wui-radio/src/Radio";
// import Tooltip from "../../../wui-tooltip/src/index";
import Tag from "../../../wui-tag/src/index";
// import { ObjectAssign } from '../lib/util';
import { getItemKey, ObjectAssign } from '../lib/utils';
import shallowequal from 'shallowequal';

const prefixCls = `${prefix}-table`;


const useFilter = (config: any) => {
    const context = useContext(ConfigContext)
    // 列开启了过滤功能的条件，1，从高级组件透传过来（需指定一个内部API）,2,列singleFilter不是false
    const {
        columns,
        // flatColumns,
        // data,
        showData,
        singleFilter,
        fieldid,
        onSingleFilterRender,
        locale: propLocale,
        filterMode = 'single',
        childrenColumnName = 'children',
        onFilterChange,
        // keyToIndex,
        getRowKey,
        _onDataChange
    } = config;

    let currentKey = useRef<string | number>(''); // 当前操作的key
    let hideData = useRef<DefaultRecordType[]>([]); // 隐藏的数据
    let inputRef = useRef<any>(null);
    let filterDataRef = useRef<DefaultRecordType[]>(showData);
    let filterDataRowKeys = useRef<string[]>([]);

    const originData = useMemo(() => {
        return ObjectAssign(showData) as DefaultRecordType[]
    }, [showData])

    const [showTop, setShowTop] = useState(false);
    const [filterTarget, setFilterTarget] = useState<any>({}); // 过滤的数据集合
    const [showTags, setShowTags] = useState<boolean>(false); // 是否显示tags
    const [filterData, setFilterData] = useState<DefaultRecordType[]>(showData); // 过滤的数据集合

    useMemo(() => {
        if (!shallowequal(showData, filterData)) {
            // console.log('Object.keys(keyToIndex)', Object.keys(keyToIndex), 'filterDataRowKeys', filterDataRowKeys.current)
            // if (JSON.stringify(Object.keys(keyToIndex).reverse()) !== JSON.stringify(filterDataRowKeys.current) && Object.keys(keyToIndex).reverse().length) {
            //     filterDataRef.current = showData;
            //     setFilterData(showData)
            //     setFilterTarget({})
            // }
            // 如果使用多选单选采用旧版的方式改变了数据源的情况，清空过滤数据会导致bug，这个无法兼容，只能领域配合修改，历史最初设计问题，只能重构表格
            filterDataRef.current = showData;
            setFilterData(showData)
            setFilterTarget({})
        }
    }, [showData, [...showData]])

    if (!singleFilter) {
        return [() => columns, filterTarget, [...(filterDataRef.current)]]
    }

    const locale = useMemo(() => {
        let _locale = propLocale || context.locale;
        return getLangInfo(_locale, i18n, 'table')
    }, [context.locale, propLocale])

    const inputChange = useCallback((val: any, e: React.ChangeEvent<HTMLInputElement> | any, _column: InnerColumnType) => {
        let value = val || e?.target?.value;
        // const { filters, filterDropdownAuto, dataIndex } = _column;
        const key = currentKey.current;
        let _filterTarget = {...filterTarget};
        const target = {..._filterTarget[key]} || {};
        target.searchStr = value;
        if (!!value.trim() || value === '0') {
            target.filterAllList = target.originFilterAllList.filter((item: any) => {
                // let currentKey = item.key.toString();
                // return currentKey.indexOf(value) !== -1;
                // return item.key && item.key?.toString().indexOf(value) !== -1;
                return item.value && item.value?.toString().indexOf(value) !== -1; // 显示和搜索的值都是value，匹配
            });
            target.filterCheckedList = target.filterAllList;
        } else {
            // e.preventDefault();
            // e.stopPropagation();
            target.filterAllList = target.originFilterAllList;
            target.filterCheckedList = target.originFilterCheckedList;
        }
        target.showCheckedNum = getShowCheckedNum(target)
        _filterTarget[key] = target;
        target.checkAll = isContainerArr(true, _filterTarget);
        target.indeterminate = isContainerArr(false, _filterTarget);
        setFilterTarget(_filterTarget)
    }, [filterTarget, columns, showData])

    const isAllCheck = useCallback((checked: boolean) => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        target.checkAll = checked;
        target.indeterminate = checked;
        if (checked) {
            // target.filterCheckedList = target.filterAllList;
            target.filterCheckedList = target.originFilterAllList;
        } else {
            target.filterCheckedList = [];
        }
        // target.originFilterCheckedList = [...target.filterCheckedList];
        target.originFilterCheckedList = [...target.originFilterAllList];
        target.showCheckedNum = getShowCheckedNum(target)
        setFilterTarget(_filterTarget)
    }, [filterTarget, currentKey.current])

    const onCancel = useCallback(() => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        _filterTarget[key].filterCheckedList = _filterTarget[key].originFilterCheckedList;
        _filterTarget[key].searchStr = '';
        _filterTarget[key].checkAll = _filterTarget[key].filterCheckedList.length && _filterTarget[key].filterAllList.length === _filterTarget[key].filterCheckedList.length;
        _filterTarget[key].indeterminate = _filterTarget[key].filterCheckedList.length;
        setFilterTarget(_filterTarget)
        setShowTop(false)
    }, [filterTarget, currentKey.current, columns, showData, filterDataRef.current, showTop])

    const onSave = useCallback((_column: InnerColumnType, prpoFilterTarget?: any) => {
        // 要支持外部自己搜索的情况
        // 对外返回的回调函数需要知道的是，当前操作的列，当前列的过滤数据
        const key = currentKey.current;
        let _filterTarget = {...(prpoFilterTarget || filterTarget)};
        const target = {..._filterTarget[key]} || {};
        if (target) {
            const { filterCheckedList = [], originFilterAllList = [] } = target;
            if (filterCheckedList.length !== originFilterAllList.length) {
                target.isFilter = true;
                if (filterMode === 'single') {
                    Object.keys(_filterTarget).forEach(k => {
                        if (k !== key) {
                            // _filterTarget[k].isFilter = false;
                            delete _filterTarget[k];
                        }
                    }); // 其他列的数据要清空
                }
            } else {
                target.isFilter = false;
            }
            target.originFilterCheckedList = filterCheckedList;
        }
        _filterTarget[key] = target;
        let handleData = ObjectAssign(originData) as DefaultRecordType[];
        // 重新计算过滤数据
        filterData.splice(0)
        filterDataRowKeys.current = [];
        hideData.current = [];
        // let newData = handleFilterData([...originData] as DefaultRecordType[], key, hideData.current) as DefaultRecordType[];
        // newData.forEach((item, index) => { // 不改变原有的引用地址
        //     filterData[index] = item;
        // })
        // filterData.splice(0)
        // hideData.current = [];
        let newData = handleFilterData(handleData, key, hideData.current) as DefaultRecordType[];
        newData.forEach((item, index) => { // 不改变原有的引用地址
            filterData[index] = item;
            filterDataRowKeys.current.push(getRowKey(item, index))
        })
        setFilterTarget(_filterTarget)
        setFilterData(filterData)
        filterDataRef.current = filterData;
        // setFilterData(newData)
        setShowTop(false)
        const filterTargetKeys = Object.keys(_filterTarget);
        const filterChangeData = filterTargetKeys.reduce((obj: any, key: string) => {
            let { filterCheckedList = [] } = _filterTarget[key];
            obj[key] = filterCheckedList;
            return obj;
        }, {})
        onFilterChange && onFilterChange(filterChangeData, filterData)
        _onDataChange && _onDataChange(filterData);
    }, [filterMode, filterTarget, columns, currentKey.current, filterDataRef.current, showTop, onFilterChange, showData, filterData, originData])

    const handleFilterData = useCallback((data: DefaultRecordType[], key?: string | number, hideData?: DefaultRecordType[]) => {
        let _filterTarget = {...filterTarget};
        if (filterMode === 'multiple') {
            return data.reduce((newData: DefaultRecordType[], record: DefaultRecordType) => {
                let result = true;
                let newRecord = {...record};
                columns.forEach((column: InnerColumnType) => {
                    const { dataIndex, filterMultiple = true, onFilter } = column;
                    const target = _filterTarget[dataIndex as string];
                    if (target) {
                        let { filterCheckedList = [] } = target;
                        filterCheckedList = filterMultiple ? filterCheckedList : [filterCheckedList[0]];
                        if (onFilter && typeof onFilter === 'function') {
                            let flag = filterCheckedList.some((item: any) => onFilter(item.value, record));
                            if (!flag) {
                                result = false;
                            }
                        } else {
                            let itemKey = getItemKey(record, dataIndex as string);
                            if (!filterCheckedList.map((item: any) => item.value).includes(itemKey)) {
                                result = false;
                            }
                        }
                    }
                }); // 过滤其他列已筛选掉的数据
                if (result) {
                    newData.push(newRecord)
                } else {
                    hideData && hideData.push(newRecord)
                }
                if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                    let childrenRecord = handleFilterData(record[childrenColumnName]);
		            newRecord[childrenColumnName] = childrenRecord;
                }
                return newData;
            }, [])
        } else {
            return data.reduce((newData: DefaultRecordType[], record: DefaultRecordType) => {
                let result = true;
                let newRecord = {...record};
                let currentColumn = columns.find((column: InnerColumnType) => column.dataIndex === key);
                if (currentColumn) {
                    const { dataIndex, filterMultiple = true, onFilter } = currentColumn;
                    const target = _filterTarget[dataIndex];
                    if (target) {
                        let { filterCheckedList = [] } = target;
                        filterCheckedList = filterMultiple ? filterCheckedList : [filterCheckedList[0]];
                        if (onFilter && typeof onFilter === 'function') {
                            let flag = filterCheckedList.some((item: any) => onFilter(item.value, record));
                            if (!flag) {
                                result = false;
                            }
                        } else {
                            let itemKey = getItemKey(record, dataIndex);
                            const keys = filterCheckedList.map((item: any) => item.value);
                            if (!(keys.includes(itemKey))) {
                                result = false;
                            }
                        }
                    }
                    if (result) {
                        newData.push(newRecord)
                    } else {
                        hideData && hideData.push(newRecord)
                    }
                    if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                        let childrenRecord = handleFilterData(record[childrenColumnName]);
                        newRecord[childrenColumnName] = childrenRecord;
                    }
                }
                return newData;
            }, [])
        }
    }, [childrenColumnName, filterMode, columns, showData, filterTarget, currentKey.current])

    const clearChecked = useCallback(() => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        if (target) {
            target.filterCheckedList = [];
            target.originFilterCheckedList = [];
            target.showCheckedNum = getShowCheckedNum(target)
            target.checkAll = isContainerArr(true, _filterTarget);
            target.indeterminate = isContainerArr(false, _filterTarget);
            setFilterTarget(_filterTarget)
            setShowTags(false)
        }
    }, [filterTarget, currentKey.current, columns])

    const handleClose = useCallback((_column: InnerColumnType, tag: any) => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        if (target) {
            target.filterCheckedList = target.filterCheckedList.filter((item: any) => item.key !== tag.key);
            target.originFilterCheckedList = [...target.filterCheckedList];
            target.showCheckedNum = getShowCheckedNum(target)
            target.checkAll = isContainerArr(true, _filterTarget);
            target.indeterminate = isContainerArr(false, _filterTarget);
            setFilterTarget(_filterTarget)
            !target.filterCheckedList.length && setShowTags(false)
        }
    }, [filterTarget, currentKey.current, columns])

    const checkChange = useCallback((checked: boolean, item: any) => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        if (target) {
            let { filterCheckedList = [] } = target;
            if (checked) {
                filterCheckedList.push(item);
            } else {
                filterCheckedList = filterCheckedList.filter((i: any) => i.key !== item.key);
            }
            target.filterCheckedList = filterCheckedList;
            target.originFilterCheckedList = filterCheckedList;
            target.showCheckedNum = getShowCheckedNum(target)
            target.checkAll = isContainerArr(true, _filterTarget);
            target.indeterminate = isContainerArr(false, _filterTarget);
        }
        _filterTarget[key] = target;
        setFilterTarget(_filterTarget)
    }, [columns, locale, fieldid, filterTarget, currentKey.current, showTags])

    const clickRadio = useCallback((_e: React.ChangeEvent<HTMLInputElement>, checked: string | boolean | number, item: any) => {
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        if (target) {
            target.filterCheckedList = checked ? [item] : [];
            target.originFilterCheckedList = checked ? [item] : [];
        }
        _filterTarget[key] = target;
        setFilterTarget(_filterTarget)
    }, [columns, locale, fieldid, filterTarget, currentKey.current, showTags])

    const initData = useCallback((column: InnerColumnType) => {
        const { dataIndex, filterMultiple = true, filters, filterDropdownAuto, filterDropdownData } = column;
        const filterObj = {...filterTarget};
        if (filterMode === 'single') { // 单列筛选
            if (filterObj[dataIndex as string]) {
                filterObj[dataIndex as string].searchStr = '';
                filterObj[dataIndex as string].filterAllList = filterObj[dataIndex as string].originFilterAllList;
                filterObj[dataIndex as string].showCheckedNum = getShowCheckedNum(filterObj[dataIndex as string])
                setFilterTarget(filterObj);
                return;
            }
            if ((filters && Array.isArray(filters)) || (filterDropdownAuto && filterDropdownAuto === 'manual')) { // 受控传值
                filterObj[dataIndex as string] = {
                    dataIndex,
                    searchStr: '', // 输入框搜索的值
                    filterAllList: filters || filterDropdownData || [], //  选框所有的数据集合
                    originFilterCheckedList: filters || filterDropdownData || [], // 缓存选框选中的数据集合
                    filterCheckedList: filters || filterDropdownData || [], // 选框选中的数据集合
                    originFilterAllList: filters || filterDropdownData || [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
                    showCheckedNum: (filters || []).length, // 显示选中的数量
                    isFilter: false, // 是否启用过滤
                    checkAll: true,
                    indeterminate: false,
                }
            } else {
                filterObj[dataIndex as string] = {
                    dataIndex,
                    searchStr: '', // 输入框搜索的值
                    filterAllList: [], //  选框所有的数据集合
                    originFilterCheckedList: [], // 缓存选框选中的数据集合
                    filterCheckedList: [], // 选框选中的数据集合
                    originFilterAllList: [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
                    showCheckedNum: 0, // 显示选中的数量
                    isFilter: false, // 是否启用过滤
                    checkAll: true,
                    indeterminate: false,
                }
                const filterMap = new Map();
                originData.forEach((item: DefaultRecordType) => {
                    let itemKey = getItemKey(item, dataIndex as string);
                    if (typeof itemKey === 'number' || typeof itemKey === 'string' || itemKey === undefined) {
                        if (!filterMap.has(itemKey)) {
                            filterMap.set(itemKey, {
                                key: itemKey,
                                value: itemKey,
                                num: 1
                            })
                        } else {
                            let _item = filterMap.get(itemKey);
                            _item.num += 1;
                            filterMap.set(itemKey, _item)
                        }

                    }
                })
                filterObj[dataIndex as string].filterAllList = Array.from(filterMap.values());
                filterObj[dataIndex as string].originFilterAllList = Array.from(filterMap.values());
                if (filterMultiple) {
                    filterObj[dataIndex as string].filterCheckedList = Array.from(filterMap.values());
                    filterObj[dataIndex as string].originFilterCheckedList = Array.from(filterMap.values());
                }
                filterObj[dataIndex as string].showCheckedNum = getShowCheckedNum(filterObj[dataIndex as string])
            }
        } else if (filterMode === 'multiple') { // 多列筛选，每次点击都要重新
            // 过滤所有筛选项：已选中的是否显示 =>  取决于当前显示的数据是否还有包含项
            // 未选中的是否显示 =>  取决于隐藏的数据是否还有包含项
            // 左下角统计数量应该是显示的已选中的数据数量和显示的数据数量
            if (!filterObj[dataIndex as string] || !filterObj[dataIndex as string].isFilter) { // 未过滤过，第一次点击
                if ((filters && Array.isArray(filters)) || (filterDropdownAuto && filterDropdownAuto === 'manual')) { // 受控传值
                    filterObj[dataIndex as string] = {
                        dataIndex,
                        searchStr: '', // 输入框搜索的值
                        filterAllList: filters || filterDropdownData || [], //  选框所有的数据集合
                        originFilterCheckedList: filters || filterDropdownData || [], // 缓存选框选中的数据集合
                        filterCheckedList: filters || filterDropdownData || [], // 选框选中的数据集合
                        originFilterAllList: filters || filterDropdownData || [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
                        isFilter: false, // 是否启用过滤
                        checkAll: true,
                        indeterminate: false,
                    }
                } else {
                    filterObj[dataIndex as string] = {
                        dataIndex,
                        searchStr: '', // 输入框搜索的值
                        filterAllList: [], //  选框所有的数据集合
                        originFilterCheckedList: [], // 缓存选框选中的数据集合
                        filterCheckedList: [], // 选框选中的数据集合
                        originFilterAllList: [], // 初始化缓存的一份所有数据的集合（针对搜索功能清空还原数据）
                        isFilter: false, // 是否启用过滤
                        checkAll: true,
                        indeterminate: false,
                    }
                    // 内部处理原始数据
                    const filterMap = new Map();
                    originData.forEach((item: DefaultRecordType) => {
                        let itemKey = getItemKey(item, dataIndex as string);
                        if (typeof itemKey === 'number' || typeof itemKey === 'string' || itemKey === undefined) {
                            if (!filterMap.has(itemKey)) {
                                filterMap.set(itemKey, {
                                    key: itemKey,
                                    value: itemKey,
                                    num: 1
                                })
                            } else {
                                let _item = filterMap.get(itemKey);
                                _item.num += 1;
                                filterMap.set(itemKey, _item)
                            }

                        }
                    })
                    filterObj[dataIndex as string].filterAllList = Array.from(filterMap.values());
                    filterObj[dataIndex as string].originFilterAllList = Array.from(filterMap.values());
                    if (filterMultiple) {
                        filterObj[dataIndex as string].filterCheckedList = Array.from(filterMap.values());
                        filterObj[dataIndex as string].originFilterCheckedList = Array.from(filterMap.values());
                    }
                }
            } else {
                // 清空输入框
                filterObj[dataIndex as string].searchStr = '';
            }
            let newItemKeys = (filterDataRef.current || []).map((item: DefaultRecordType) => getItemKey(item, dataIndex as string)); // 现有的展示数据的所有集合
            let hideKeys = (hideData.current || []).map(item => getItemKey(item, dataIndex as string)) // 隐藏的数据的集合
            let originFilterCheckedListkeys = filterObj[dataIndex as string].originFilterCheckedList.map((item: any) => item.key);

            filterObj[dataIndex as string].filterAllList = filterObj[dataIndex as string].originFilterAllList.filter((item: any) => {
                if (!originFilterCheckedListkeys.includes(item.key)) { // 未勾选，是否显示判断标准勾选后会不会有新数据显示
                    if (hideKeys.includes(item.key)) { // 隐藏的数据包含
                        let result = checkData(dataIndex as string, item.key)
                        return result
                    } else {
                        return false
                    }
                } else { // 已勾选
                    if (newItemKeys.includes(item.key)) { // 显示的数据包含
                        return true
                    } else {
                        return false
                    }
                }
            }) // 过滤其他列已筛选掉的数据
            // filterObj[dataIndex].filterCheckedList = filterObj[dataIndex].filterAllList.filter((item: any) => {
            //     return originFilterCheckedListkeys.includes(item.value);
            // }); // 选中的数据集合
            filterObj[dataIndex as string].showCheckedNum = getShowCheckedNum(filterObj[dataIndex as string])
            filterObj[dataIndex as string].checkAll = isContainerArr(true, filterObj);
            filterObj[dataIndex as string].indeterminate = isContainerArr(false, filterObj);
        }
        setFilterTarget(filterObj)
    }, [columns, showData, filterTarget, filterData, filterDataRef.current, hideData.current, currentKey.current, filterDataRef.current, showTop, onFilterChange, childrenColumnName, filterMode, originData])

    // 计算每一列应该显示已选列的数量
    const getShowCheckedNum = useCallback((target: any) => {
        const originFilterCheckedListkeys = target.originFilterCheckedList.map((item: any) => item.key);
        return target.filterAllList.filter((item: any) => {
            return originFilterCheckedListkeys.includes(item.key);
        }).length;
    }, [columns, showData, hideData.current, filterData, filterDataRef.current, filterTarget, currentKey.current, filterDataRef.current, showTop, onFilterChange, childrenColumnName, filterMode])

    const checkData = useCallback((key: string | number, item: any) => {
        const _filterTarget = {...filterTarget};
        let restData: any[] = [];
        hideData.current.forEach(da => {
            if (getItemKey(da, key) === item) { //  隐藏数据中包含的数据
                let result = true;
                Object.keys(_filterTarget).filter(k => k != key).forEach(_k => { // 如果其他筛选项中有未勾选的数据，不显示
                    let filterCheckedListKeys = _filterTarget[_k].filterCheckedList.map((item: any) => item.key);
                    if (!filterCheckedListKeys.includes(getItemKey(da, _k))) {
                        result = false
                    }
                })
                if (result) {
                    restData.push(da)
                }
            }
        })

        return !!restData.length;
    }, [columns, showData, hideData.current, filterData, filterDataRef.current, filterTarget, currentKey.current, filterDataRef.current, showTop, onFilterChange, childrenColumnName, filterMode, originData])

    const isContainerArr = useCallback((isCheck: boolean, _filterTarget?: any) => {
        let filterObj = _filterTarget || filterTarget;
        const key = currentKey.current;
        const target = filterObj[key] || {};
        const { filterAllList = [], filterCheckedList = [] } = target || {};
        let checkedKeys = filterCheckedList.map((item: any) => item.key);
        let newArr = filterAllList.filter((item: any) => {
            return checkedKeys.indexOf(item.key) !== -1;
        })
        if (isCheck) {
            return newArr.length === filterAllList.length && newArr.length !== 0;
        } else {
            return newArr.length > 0;
        }
    }, [columns, showData, filterTarget])

    const onVisibleChangeTop = useCallback((visible: boolean, _column: InnerColumnType) => {
        if (!visible) {
            const _filterTarget = {...filterTarget};
            let key = currentKey.current;
            _filterTarget[key].filterCheckedList = _filterTarget[key].originFilterCheckedList;
            _filterTarget[key].searchStr = '';
            _filterTarget[key].checkAll = _filterTarget[key].filterCheckedList.length && _filterTarget[key].filterAllList.length === _filterTarget[key].filterCheckedList.length;
            _filterTarget[key].indeterminate = _filterTarget[key].filterCheckedList.length;
            currentKey.current = '';
            setFilterTarget(_filterTarget)
        }
        setShowTop(visible);
    }, [columns, showTop])

    const iconClick = useCallback((_e:React.MouseEvent<HTMLElement>, column: InnerColumnType) => {
        _e.preventDefault();
        _e.stopPropagation();
        const { dataIndex } = column;
        currentKey.current = dataIndex as string;
        initData(column)
        setShowTop(true)
    }, [columns, filterTarget, showTop, filterDataRef.current, originData])

    const toggleTags = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setShowTags(!showTags)
    }, [showTags])

    const filterItem = useCallback((e: React.MouseEvent<HTMLElement>, column: InnerColumnType, item: any) => {
        e.preventDefault();
        const _filterTarget = {...filterTarget};
        let key = currentKey.current;
        let target = _filterTarget[key];
        if (target) {
            target.filterCheckedList = [item];
            target.originFilterCheckedList = [item];
            target.showCheckedNum = getShowCheckedNum(target)
            target.checkAll = isContainerArr(true, _filterTarget);
            target.indeterminate = isContainerArr(false, _filterTarget);
        }
        _filterTarget[key] = target;
        onSave(column, _filterTarget);
    }, [columns, showData, showTop, filterTarget, currentKey.current])

    useEffect(() => {
        if (showTop && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100)
            // inputRef.current?.focus();
        }
        // return () => {
        //     inputRef.current?.blur();
        // }
    }, [columns, showTop, inputRef.current])

    const getCloumItem = useCallback((column: InnerColumnType) => {
        const { dataIndex, filterMultiple = true, } = column;
        const target = filterTarget[dataIndex as string];
        const { filterAllList = [], filterCheckedList = [] } = target || {};
        return (
            <List data={filterAllList} height={300} itemHeight={30} itemKey={`item`}>
                {
                    (item: any, index: number) => {
                        let text = item.value === undefined ? (locale.langMap.nullValue || '空值') : item.value;
                        return (
                            <div className={`${prefixCls}-pop-check-wrap`} title={text}>
                                <div className={`${prefixCls}-pop-check-wrap-item`}>
                                    {filterMultiple ? <Checkbox value={item} key={`${item}_${index}`}
                                        checked={filterCheckedList.includes(item)}
                                        onChange={(v: boolean) => checkChange(v, item)}>
                                        {text}
                                    </Checkbox> : <RadioWrapper value={item} checked={filterCheckedList.includes(item)} onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string | boolean | number) => clickRadio(event, value, item)}>{text}</RadioWrapper> }
                                    {item.num || item.num == 0 ? <span className={`${prefixCls}-pop-check-wrap-item-num`}>（{item.num}）</span> : null}
                                    <Button colors="dark" className={`${prefixCls}-pop-check-wrap-item-check`} onClick={(e) => filterItem(e, column, item)}>{ locale.langMap.onlyFilterThis || '仅筛选此项' }</Button>
                                </div>
                            </div>
                        )
                    }
                }
            </List>
        )
    }, [columns, locale, fieldid, filterTarget])

    const columnsContent = useCallback((column: InnerColumnType) => {
        const { dataIndex, filterMultiple = true } = column;
        const target = filterTarget[dataIndex as string];
        const {
            filterAllList = [],
            originFilterAllList = [],
            searchStr = '',
            indeterminate,
            checkAll,
            filterCheckedList = [],
            showCheckedNum = 0,
        } = target || {};
        return (
            <Fragment>
                <div className={`${prefixCls}-filter-box`}>
                    <div className={`${prefixCls}-filter-box-left`}>
                        {
                            originFilterAllList.length > 0 ? <div className={`${prefixCls}-filter-box-left-header`}>
                                <Input
                                    type="search"
                                    ref={inputRef}
                                    // showClose
                                    // allowClear={false} // 这个点击会触发onSearch
                                    value={searchStr}
                                    className={`${prefixCls}-filter-search`}
                                    onChange={(val, e) => inputChange(val, e, column)}
                                    onSearch={() => onSave(column)}
                                />
                            </div> : null
                        }
                        <div className={`${prefixCls}-filter-box-left-body`}>
                            {getCloumItem(column)}
                        </div>
                        <div className={`${prefixCls}-filter-box-left-footer`}>
                            {filterMultiple ? <span className={`${prefixCls}-filter-box-left-check`}>
                                <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={(checked: boolean) => isAllCheck(checked)}>
                                    <span className={`${prefixCls}-filter-box-left-check-num`} onClick={(e) => toggleTags(e)}>
                                        {/* <span
                                            style={{color: filterCheckedList.length ? '#1D4ED8' : 'inherit', cursor: filterCheckedList.length ? 'inherit' : 'not-allowed'}}
                                            className={`${prefixCls}-filter-box-left-checked-num`}
                                        >
                                            {filterCheckedList.length}
                                        </span> / {filterAllList.length} */}
                                        <span
                                            style={{color: showCheckedNum ? '#1D4ED8' : 'inherit', cursor: showCheckedNum ? 'inherit' : 'not-allowed'}}
                                            className={`${prefixCls}-filter-box-left-checked-num`}
                                        >
                                            {showCheckedNum}
                                        </span> / {filterAllList.length}
                                    </span>
                                </Checkbox>
                            </span> : null}
                            <Button colors="secondary" size="sm" onClick={onCancel}>{locale.langMap.cancel || '取消'}</Button>
                            <Button colors="primary" size="sm" onClick={() => onSave(column)} disabled={!filterCheckedList}>{locale.langMap.ok || '确定'}</Button>
                        </div>
                    </div>
                    {
                        filterCheckedList.length && showTags ? <div className={`${prefixCls}-filter-box-right`}>
                            <div className={`${prefixCls}-filter-box-right-body`}>
                                <div className={`${prefixCls}-filter-box-right-tag-box`}>
                                    {
                                        filterCheckedList.map((tag: any) => {
                                            return (
                                                <Tag visible closable key={tag.value} style={{marginBottom: '5px'}} onClose={(e) => {
                                                    e.preventDefault();
                                                    handleClose(column, tag);
                                                }}>
                                                    <span className={`${prefixCls}-filter-box-right-tag`}>{tag.value}</span>
                                                </Tag>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={`${prefixCls}-filter-box-right-footer`}>
                                <Button colors="secondary" size="sm" onClick={clearChecked}><Icon type="uf-filterno" style={{marginRight: '4px'}}/> { locale.langMap.clearFilter || '清除筛选' }</Button>
                            </div>
                        </div> : null
                    }
                </div>
            </Fragment>
        )
    }, [columns, locale, fieldid, filterTarget, showTags, inputRef.current])

    // 渲染单个列处理
    const renderColumn = useCallback((column: InnerColumnType) => {
        const { dataIndex } = column;
        const target = filterTarget[dataIndex as string];
        const { isFilter = false } = target || {};
        let isCurrent = currentKey.current === dataIndex;
        if (singleFilter && column.singleFilter !== false && dataIndex !== 'checkbox' && dataIndex !== 'radio') {
            let fieldidAttr = fieldid ? { fieldid: `${fieldid}_single_filter_icon` } : {}
            const content = isCurrent ? columnsContent(column) : null;
            let isActived = (target && isFilter) || (showTop && isCurrent);
            let wrapClassName = isActived ? `${prefix}-table-column-single-filter ${prefix}-table-column-single-filter-active` : `${prefix}-table-column-single-filter`;
            let filterButton = onSingleFilterRender ?
                onSingleFilterRender(column) :
                <div className={`${wrapClassName} ${prefix}-table-title-icon`}>
                    {content ? <Popover rootClose arrowPointAtCenter autoAdjustOverflowHeight placement="top" content={content} trigger="click" visible={showTop}
                        onVisibleChange={(visible: boolean) => onVisibleChangeTop(visible, column)}>
                        <Icon type={isActived ? "uf-biaotoushaixuanyixuannormal" : "uf-shaixuan1-copy"} {...fieldidAttr} onClick={(e) => iconClick(e, column)}/>
                    </Popover> : <Icon type={isActived ? "uf-biaotoushaixuanyixuannormal" : "uf-shaixuan1-copy"} {...fieldidAttr} onClick={(e) => iconClick(e, column)}/>}
                    {/* <Popover rootClose arrowPointAtCenter placement="top" content={content} trigger="click" visible={showTop}
                        onVisibleChange={(visible: boolean) => onVisibleChangeTop(visible, column)}>
                        <Icon type={isActived ? "uf-biaotoushaixuanyixuannormal" : "uf-shaixuan1-copy"} {...fieldidAttr} onClick={(e) => iconClick(e, column)}/>
                    </Popover> */}
                </div>;
            column._originTitle = column._originTitle || column.title;
            column.title = <>
                {typeof column.title === 'string' ? <span className={`${prefix}-table-title-text-span`}
                    title={column.title}>{column.title}</span> : column.title}
            </>;
            // 集合所有的最后一起处理，方便调整样式和维护(需要考虑自定义title生成icon情况)
            column.innerHeaderIcon = column.innerHeaderIcon || {}
            column.innerHeaderIcon.filterButton = filterButton
            // column._hasSingleFilter = column._hasSingleFilter || true;
            return column;
        } else {
            return column;
        }
    }, [columns, locale, fieldid, filterTarget, showTop, currentKey.current, showTags, inputRef.current, filterData, filterDataRef.current, singleFilter])


    // 处理columns
    const mergeColumns = useCallback((columns: InnerColumnType[]) => {
        return columns.map((column: InnerColumnType) => {
            return renderColumn(column)
        })
    }, [columns, locale, fieldid, filterTarget, currentKey.current, showTags, inputRef.current, filterData, filterDataRef.current])

    return [mergeColumns, filterTarget, [...(filterDataRef.current)]]
}

export default useFilter;