/* *
1，兼容多选/单选旧有的api
2，逻辑重构实现
*/
import React, { Fragment, useCallback, useMemo, useRef, useState, useContext } from "react";
import {prefix} from "../../../wui-core/src/index"
// import ColumnGroup from '../ColumnGroup';
// import Column from '../Column';
import Checkbox from '../../../wui-checkbox/src';
import RadioWrapper from '../../../wui-radio/src';
import Menu from "../../../wui-menu/src";
import Icon from "../../../wui-icon/src";
import Dropdown from "../../../wui-dropdown/src";
import TreeUtils from "../../../wui-core/src/TreeUtils";
import { columnType, DEFAULT_SELECT_WIDTH } from '../constant';
import { TableProps, Key, ColumnType, DefaultRecordType} from '../iTable';
import { MenuSelectionsType } from '../interface'
import {getLangInfo} from "../../../wui-locale/src/tool";
import {ConfigContext} from '../../../wui-provider/src/context';
import i18n from "../lib/i18n";
import { SelectInfo } from 'rc-menu/lib/interface';
import {ObjectAssign} from '../lib/util';
import {
    SELECTION_ALL,
    SELECTION_INVERT,
    SELECTION_NONE
} from '../constant';
import Tooltip from "../../../wui-tooltip/src";

const {Item} = Menu;

/**
 *
 * @param rowSelection {rowSelection}
 * @param config {影响因素}
 * return [newColumn, selectRowKeys]
 */
const useSelect = (rowSelection: TableProps['rowSelection'], config: any): [(columns: ColumnType[]) => ColumnType[], any[], (record: DefaultRecordType, index: number, event: React.MouseEvent<HTMLElement>, onRowClick?:any) => void] => {
    // rowSelection 要区分多选和单选的新旧版传参方式，所有需要额外的变量区分多选和单选，不可仅仅根据rowSelection.type区分
    // selectType 由multiSelectX和singleSelect文件内部传递 false | 'checkbox' | 'radio'
    const context = useContext(ConfigContext)
    const {
        type: selectionType,
        selectedRowKeys,
        defaultSelectedRowKeys,
        onChange,
        onSelectAll,
        onSelect,
        getCheckboxProps,
        columnTitle,
        columnWidth,
        fixed,
        hideSelectAll,
        renderCell,
        selections,
        onSelectInvert,
        onSelectNone
    } = rowSelection || {};
    const {
        columns,
        data,
        showData,
        selectType,
        getRowKey,
        multiSelectConfig,
        children,
        childrenColumnName,
        getSelectedDataFunc,
        checkStrictly,
        autoSelect,
        autoCheckedByClickRows,
        selectedRowIndex,
        antd,
        locale,
        fieldid,
        // onRowClick
    } = config;

    let ref = useRef<{_selectedRowKeys?: any[], _selectRowList?: any[]}>({})


    // 实际的单选or多选,false说明都不是
    let realSelectionType = useMemo(() => {
        if (selectType) {
            return selectType
        }
        if (Object.keys(rowSelection || {}).length && selectType !== false) {
            return selectionType || 'checkbox'
        }
        if (columns && Array.isArray(columns)) {
            let columnTypes = columns.map(col => col.columnType);
            if (columnTypes.includes(columnType.MULTISELECT)) {
                return 'checkbox'
            } else if (columnTypes.includes(columnType.SINGLESELECT)) {
                return 'radio'
            } else {
                return false
            }
        }
        // if (!columns && children && Array.isArray(children) && children.length > 0) {
        //     let columnTypes = children.map(col => col.props.columnType);
        //     if (columnTypes.includes(columnType.MULTISELECT)) {
        //         return 'checkbox'
        //     } else if (columnTypes.includes(columnType.SINGLESELECT)) {
        //         return 'radio'
        //     } else {
        //         return false
        //     }
        // }
        return false
    }, [selectType, selectionType, children, columns])

    const isOld = useMemo(() => {
        return rowSelection === undefined
    }, [rowSelection])

    const innerAutoSelect = useMemo(() => {
        if (autoSelect !== undefined) {
            return autoSelect
        }
        return !checkStrictly
    }, [checkStrictly, autoSelect])

    // 处理旧版多选数据里面的_checked和_disabled属性，提取selectRowKeys和disableKeys
    const getTreeData = useCallback((
        arr: DefaultRecordType[],
        selectRowKeys: Key[],
        selectRowList: DefaultRecordType[],
        disableKeys: Key[],
        getRowKey: any,
        getCheckboxProps: any,
        isOld: boolean,
        selectedRowKeys: Key[] | undefined,
        defaultSelectedRowKeys: Key[] | undefined,
        realSelectionType: 'checkbox' | 'radio' | false,
        selectedRowIndex: number | undefined
    ) => {
        (arr || []).forEach((item, index) => {
            // 旧版
            if (isOld) {
                if (realSelectionType === 'radio') {
                    let selectedRowKeys = typeof selectedRowIndex === 'number' && arr[selectedRowIndex] ? [getRowKey(arr[selectedRowIndex], selectedRowIndex)] : []
                    selectRowKeys = selectedRowKeys;
                    selectRowList = [arr[selectRowKeys[0]]]
                } else {
                    if (item.hasOwnProperty('_checked')) {
                        if (item._checked) {
                            let checkedRowKey = getRowKey(item, index);
                            selectRowKeys.push(checkedRowKey)
                            selectRowList.push(item)
                        }
                    }
                }
                if (item.hasOwnProperty('_disabled')) {
                    if (item._disabled) {
                        let checkedRowKey = getRowKey(item, index);
                        disableKeys.push(checkedRowKey)
                    }
                }
            } else {
                if (realSelectionType === 'radio') {
                    let oldSelectedRowKeys = typeof selectedRowIndex === 'number' && arr[selectedRowIndex] ? [getRowKey(arr[selectedRowIndex], selectedRowIndex)] : []
                    selectRowKeys = selectedRowKeys || defaultSelectedRowKeys || oldSelectedRowKeys || [];
                    selectRowList = selectRowKeys.length ? [arr[selectRowKeys[0]]] : []
                } else {
                    selectRowKeys = selectedRowKeys || defaultSelectedRowKeys || [];
                    if (selectRowKeys.includes(getRowKey(item, index))) {
                        selectRowList.push(item)
                    }
                }
                if (getCheckboxProps && typeof getCheckboxProps === 'function' && getCheckboxProps(item, index).disabled) {
                    let currentDisabledKey = getRowKey(item, index);
                    disableKeys.push(currentDisabledKey)
                }
            }
            if (item.children && Array.isArray(item.children)) {
                getTreeData(item.children, selectRowKeys, selectRowList, disableKeys, getRowKey, getCheckboxProps, isOld, selectedRowKeys, defaultSelectedRowKeys, realSelectionType, selectedRowIndex)
            }
        })
        return {_selectedRowKeys: realSelectionType === 'radio' ? selectRowKeys.slice(0, 1) : selectRowKeys, _selectRowList: selectRowList, _disableKeys: disableKeys};
    }, [data, getRowKey, isOld, selectedRowKeys, defaultSelectedRowKeys, realSelectionType, selectedRowIndex, getCheckboxProps])


    const getData = useCallback((
        data: DefaultRecordType[],
        getRowKey: any,
        getCheckboxProps: any,
        isOld: boolean,
        selectedRowKeys: Key[] | undefined,
        defaultSelectedRowKeys: Key[] | undefined,
        realSelectionType: 'checkbox' | 'radio' | false,
        selectedRowIndex: number | undefined
    ) => {
        let selectRowKeys: Key[] = [];
        let selectRowList: DefaultRecordType[] = [];
        let disableKeys: Key[] = [];
        let { _selectedRowKeys, _selectRowList, _disableKeys} = getTreeData(data, selectRowKeys, selectRowList, disableKeys, getRowKey, getCheckboxProps, isOld, selectedRowKeys, defaultSelectedRowKeys, realSelectionType, selectedRowIndex);
        return {_selectedRowKeys, _selectRowList, _disableKeys};
    }, [data, getRowKey, isOld, selectedRowKeys, defaultSelectedRowKeys, realSelectionType, selectedRowIndex])


    let keyTarget = useMemo(() => {
        return getData(data, getRowKey, getCheckboxProps, isOld, selectedRowKeys, defaultSelectedRowKeys, realSelectionType, selectedRowIndex)
    },
    [isOld, selectedRowKeys, defaultSelectedRowKeys, getRowKey, realSelectionType, selectedRowIndex, data, getCheckboxProps]
    )

    let [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState<Key[]>(keyTarget._selectedRowKeys || []);
    let [innerSelectedRowList, setInnerSelectedRowList] = useState<DefaultRecordType[]>(keyTarget._selectRowList || []);
    // innerDisableKeys该值不应被setState操作
    const innerDisableKeys = useMemo(() => {
        return keyTarget._disableKeys || []
    }, [keyTarget])

    let checkAllSelected = useCallback((showData: DefaultRecordType[], innerSelectedRowKeys: Key[], innerDisableKeys: Key[], getRowKey: any) => {
        if (!Array.isArray(showData) || !showData.length) {
            return {
                checkedAll: false,
                indeterminate: false,
                disabledAll: false
            }
        }
        let checkedLength = 0;
        let disableLength = 0;
        let allLength = 0;
        let noDisableCheckedLength = 0;
        let getTree = (arr: DefaultRecordType[]) => {
            arr.forEach((item: DefaultRecordType, index: number) => {
                allLength++;
                let checkedRowKey = getRowKey(item, index);
                if (innerSelectedRowKeys.includes(checkedRowKey)) {
                    checkedLength++
                    if (!innerDisableKeys.includes(checkedRowKey)) {
                        noDisableCheckedLength++
                    }
                }
                if (innerDisableKeys.includes(checkedRowKey)) {
                    disableLength++
                }
                if (item.children && Array.isArray(item.children)) {
                    getTree(item.children);
                }
            })
        }
        getTree(showData);
        return {
            checkedAll: allLength === noDisableCheckedLength + disableLength && checkedLength != 0,
            indeterminate: allLength - disableLength > noDisableCheckedLength && noDisableCheckedLength != 0,
            disabledAll: allLength === disableLength
        }
    }, [showData, data, innerSelectedRowKeys, innerDisableKeys, getRowKey])

    const realIsControlled = useMemo(() => {
        if (realSelectionType === 'radio') {
            if (isOld) {
                return selectedRowIndex !== undefined
            } else {
                return selectedRowKeys !== undefined || selectedRowIndex !== undefined
            }
        } else {
            if (isOld) {
                return false
            } else {
                return selectedRowKeys !== undefined
            }
        }
    }, [isOld, realSelectionType, selectedRowIndex, selectedRowKeys])

    useMemo(() => {
        if (JSON.stringify(keyTarget._selectedRowKeys) !== JSON.stringify(ref.current._selectedRowKeys || [])) {
            ref.current = keyTarget;
            setInnerSelectedRowKeys(keyTarget._selectedRowKeys)
            setInnerSelectedRowList(keyTarget._selectRowList)
        }
    }, [keyTarget])

    const dataTarget = useMemo((): any[] | false => {
        if (!innerAutoSelect) {
            return false
        }
        let target: any[] = [];
        let dataTargetFun = (data: DefaultRecordType[], parentKey = null) => {
            (data || []).forEach((record: DefaultRecordType, index: number) => {
                let currentKey = getRowKey(record, index)
                target.push({
                    key: currentKey,
                    parentKey,
                    checked: innerSelectedRowKeys.includes(currentKey),
                })
                if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                    dataTargetFun(record[childrenColumnName], currentKey)
                }
            })
        }
        dataTargetFun(showData)
        return target;
    }, [showData, childrenColumnName, innerAutoSelect, getRowKey, innerSelectedRowKeys])

    const isAllChecked = useMemo(() => {
        const checkAllTarget = checkAllSelected(showData, innerSelectedRowKeys, innerDisableKeys, getRowKey);
        return checkAllTarget;

    }, [showData, innerSelectedRowKeys, innerDisableKeys, getRowKey])


    const onAllCheckChange = useCallback((check: boolean, isAll: boolean = false) => {
        // let selectedRowKeyList: Key[] = [...innerSelectedRowKeys]; // 选择key集合
        // let selectedRowList: DefaultRecordType[] = [...innerSelectedRowList]; // 选择数据的集合
        let keySet = new Set(innerSelectedRowKeys); // 选择key集合
        let keyListSet = new Set(innerSelectedRowList); // 选择数据的集合
        let disableKeySet = new Set(innerDisableKeys);
        let changeRowList: DefaultRecordType[] = []; // 改变选择状态数据的集合
        let handledData: DefaultRecordType[] = [] // 旧版整理后数据的集合
        // let handleDataFun = (data: DefaultRecordType[], check: boolean, handledData: DefaultRecordType[]) => {
        //     data.forEach((item, index) => {
        //         let currentKey = getRowKey(item, index); // 当前key
        //         let isDisable = innerDisableKeys.includes(currentKey) // 是否是禁选状态
        //         handledData.push({...item})
        //         if (check) { // 全选
        //             if (!isDisable) { // 非禁选
        //                 if (!innerSelectedRowKeys.includes(currentKey)) { // 原来的不包含选中项则添加，包含则无需操作
        //                     selectedRowKeyList.push(currentKey);
        //                     selectedRowList.push(item);
        //                     changeRowList.push(item)
        //                 }
        //                 handledData[index]._checked = true;
        //                 handledData[index]._disabled = isDisable;
        //             } else { // 禁选
        //                 handledData[index]._checked = innerSelectedRowKeys.includes(currentKey);
        //                 handledData[index]._disabled = isDisable;
        //             }
        //         } else { // 取消全选
        //             if (!isDisable) { // 非禁选
        //                 // let keySet = new Set(selectedRowKeyList)
        //                 if (innerSelectedRowKeys.includes(currentKey)) { // 原来的包含选中项则去除，不包含则无需操作
        //                     selectedRowKeyList = selectedRowKeyList.filter(key => key !== currentKey)
        //                     selectedRowList = selectedRowList.filter((item, index) => getRowKey(item, index) !== currentKey)
        //                     changeRowList.push(item)
        //                 }
        //                 handledData[index]._checked = false;
        //                 handledData[index]._disabled = isDisable;
        //             } else { // 禁选
        //                 handledData[index]._checked = innerSelectedRowKeys.includes(currentKey);
        //                 handledData[index]._disabled = isDisable;
        //             }
        //         }
        //         if (item && typeof item === 'object' && childrenColumnName in item && Array.isArray(item[childrenColumnName])) {
        //             handledData[index][childrenColumnName] = []
        //             handleDataFun(item[childrenColumnName], check, handledData[index][childrenColumnName])
        //         }
        //     })
        // }
        let handleDataFun = (data: DefaultRecordType[], check: boolean, handledData: DefaultRecordType[]) => {
            data.forEach((item, index) => {
                let currentKey = getRowKey(item, index); // 当前key
                let isDisable = disableKeySet.has(currentKey) // 是否是禁选状态
                handledData.push({...item})
                if (check) { // 全选
                    if (!isDisable) { // 非禁选
                        if (!keySet.has(currentKey)) { // 原来的不包含选中项则添加，包含则无需操作
                            keySet.add(currentKey);
                            keyListSet.add(item);
                            changeRowList.push(item)
                        }
                        handledData[index]._checked = true;
                        handledData[index]._disabled = isDisable;
                    } else { // 禁选
                        handledData[index]._checked = keySet.has(currentKey);
                        handledData[index]._disabled = isDisable;
                    }
                } else { // 取消全选
                    if (!isDisable) { // 非禁选
                        // let keySet = new Set(selectedRowKeyList)
                        if (keySet.has(currentKey)) { // 原来的包含选中项则去除，不包含则无需操作
                            keySet.delete(currentKey);
                            // if (item.hasOwnProperty('_checked')) { // 兼容旧版_checked属性的设置
                            //     keyListSet.forEach((point) => {
                            //         if (getRowKey(point) === currentKey) {
                            //             keyListSet.delete(point);
                            //         }
                            //     });
                            // } else {
                            //     keyListSet.delete(item);
                            // }
                            // keyListSet.delete(item);
                            keyListSet.forEach((point) => {
                                if (getRowKey(point) === currentKey) {
                                    keyListSet.delete(point);
                                }
                            });
                            changeRowList.push(item)
                        }
                        handledData[index]._checked = false;
                        handledData[index]._disabled = isDisable;
                    } else { // 禁选
                        handledData[index]._checked = keySet.has(currentKey);
                        handledData[index]._disabled = isDisable;
                    }
                }
                if (item && typeof item === 'object' && childrenColumnName in item && Array.isArray(item[childrenColumnName])) {
                    handledData[index][childrenColumnName] = []
                    handleDataFun(item[childrenColumnName], check, handledData[index][childrenColumnName])
                }
            })
        }


        handleDataFun(isAll ? data : showData, check, handledData);
        let selectedRowKeyList = Array.from(keySet);
        let selectedRowList = Array.from(keyListSet);

        if (!realIsControlled) {
            ref.current._selectedRowKeys = selectedRowKeyList
            ref.current._selectRowList = selectedRowList
            setInnerSelectedRowKeys(selectedRowKeyList)
            setInnerSelectedRowList(selectedRowList)
        }

        onChange && onChange(selectedRowKeyList, selectedRowList)
        onSelectAll && onSelectAll(check, selectedRowList, changeRowList)
        getSelectedDataFunc && getSelectedDataFunc(selectedRowList, undefined, undefined, handledData);
        if (!check && isAll) {
            onSelectNone && onSelectNone()
        }
    }, [innerDisableKeys, onChange, onSelectAll, getSelectedDataFunc, innerSelectedRowKeys, realIsControlled, data, showData, onSelectNone, dataTarget, keyTarget])

    const delkey = useCallback((keys: Key[], key: Key) => {
        let index = keys.findIndex(item => item === key);
        return index > -1 && !innerDisableKeys.includes(key) ? keys.splice(index, 1) : keys
    }, [innerDisableKeys])

    const setChildrenKey = useCallback((selectedKeyList: Key[], currentKey: Key, check: boolean) => {
        let childrenList = (dataTarget || []).filter(item => item.parentKey === currentKey); // 是否有子集
        if (!childrenList.length) return selectedKeyList; // 3
        if (check) { // 选中
            selectedKeyList = selectedKeyList.concat(childrenList.filter(item => !innerDisableKeys.includes(item.key)).map(item => item.key)) // 3
            childrenList.forEach((item: any) => {
                selectedKeyList = setChildrenKey(selectedKeyList, item.key, check)
            })
        } else {
            childrenList.forEach((item: any) => {
                delkey(selectedKeyList, item.key)
                selectedKeyList = setChildrenKey(selectedKeyList, item.key, check)
            })
        }
        return selectedKeyList;
    }, [dataTarget, innerDisableKeys])

    const setParentKey = useCallback((selectedKeyList: Key[], currentKey: Key, check: boolean) => {
        let currentTarget = (dataTarget || []).find(item => item.key === currentKey);
        let parentTarget = (dataTarget || []).find(item => item.key === currentTarget.parentKey);
        if (parentTarget) { // 存在父级
            let childrenList = (dataTarget || []).filter(item => item.parentKey === parentTarget.key);
            let isAll = true;
            for (let i = 0; i < childrenList.length; i++) {
                if (!selectedKeyList.includes(childrenList[i].key) && !innerDisableKeys.includes(childrenList[i].key)) {
                    isAll = false;
                    continue
                }
            }
            if (check) {
                if (isAll) {
                    selectedKeyList.push(parentTarget.key);
                    setParentKey(selectedKeyList, parentTarget.key, check)
                }
            } else {
                if (!isAll) {
                    delkey(selectedKeyList, parentTarget.key)
                    setParentKey(selectedKeyList, parentTarget.key, check)
                }
            }
        }
        return selectedKeyList
    }, [dataTarget, innerDisableKeys])

    const getRows = useCallback((data: DefaultRecordType[], oldData: DefaultRecordType[], oldSelectedRows: DefaultRecordType[], selectedRows: DefaultRecordType[], selectedKeyList: Key[], innerDisableKeys: Key[], clickKey: Key) => {
        data.forEach((record, index) => {
            // TODO: 适配生产环境暂时的更改，后续要区分新旧模式是否返回_checked属性并优化代码
            let currentKey = getRowKey(record, index);
            // record._checked = selectedKeyList.includes(currentKey);
            // record._disabled = innerDisableKeys.includes(currentKey)
            // selectedRows顺序和selectedKeyList保持一致
            let currentIndex = selectedKeyList.findIndex(key => key === currentKey) // 下标
            if (currentIndex > -1) {
                // selectedRows.push(record)
                // oldSelectedRows.push({
                //     ...record,
                //     _checked: true,
                //     _disabled: innerDisableKeys.includes(currentKey)
                // });
                selectedRows[currentIndex] = record
                oldSelectedRows[currentIndex] = {
                    ...record,
                    _checked: true,
                    _disabled: innerDisableKeys.includes(currentKey)
                };
            }
            oldData.push({
                ...record,
                _checked: selectedKeyList.includes(currentKey),
                _disabled: innerDisableKeys.includes(currentKey)
            })
            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                oldData[index][childrenColumnName] = []
                getRows(record[childrenColumnName], oldData[index][childrenColumnName], oldSelectedRows, selectedRows, selectedKeyList, innerDisableKeys, clickKey)
            }
        });
        return {
            oldData,
            oldSelectedRows,
            selectedRows
        }
    }, [showData, innerDisableKeys])

    const onCheckboxChange = useCallback((_text: any, record: DefaultRecordType, index: number) => (check: boolean, e: React.MouseEvent<HTMLElement>) => {
        let currentKey = getRowKey(record, index);
        if (!currentKey && currentKey !== 0 && currentKey !== '0') return;
        let matchResults =
            TreeUtils.findWithPropName(data, (row: DefaultRecordType, i: number) => {
                return getRowKey(row, i);
            }, currentKey, true, true);
        let matchRecord = matchResults.length > 0 ? matchResults[0] : null;
        if (!matchRecord) return;
        // innerAutoSelect => 父子联动
        // 递归遍历
        // 1, 选中：查找某个有子集的节点，非该节点下如果他的子集全部选中，那他也选中， 该节点下，那他子集全部选中，
        // 2，取消：非该节点下，如果他的子集不是全部选中，那么他取消选中，
        //     当前点击节点下的所有子集及以下全部取消选中
        // let selectedKeyList = [...innerSelectedRowKeys];
        let selectedKeyList = [...(ref.current._selectedRowKeys || [])];
        let selectedRows: DefaultRecordType[] = [];
        let oldSelectedRows: DefaultRecordType[] = [];
        let oldData: DefaultRecordType[] = [];
        if (check) {
            selectedKeyList.push(currentKey)
            if (innerAutoSelect) {
                selectedKeyList = setChildrenKey(selectedKeyList, currentKey, check);
                selectedKeyList = setParentKey(selectedKeyList, currentKey, check)
            }
        } else {
            delkey(selectedKeyList, currentKey)
            if (innerAutoSelect) {
                selectedKeyList = setChildrenKey(selectedKeyList, currentKey, check);
                selectedKeyList = setParentKey(selectedKeyList, currentKey, check)
            }
        }

        let getSelectedDataTarget = getRows(showData, oldData, oldSelectedRows, selectedRows, [...new Set(selectedKeyList)], innerDisableKeys, currentKey)

        if (!realIsControlled) {
            ref.current._selectedRowKeys = [...new Set(selectedKeyList)]
            ref.current._selectRowList = selectedRows
            setInnerSelectedRowKeys([...new Set(selectedKeyList)])
            setInnerSelectedRowList(selectedRows)
        }

        onChange && onChange([...new Set(selectedKeyList)], selectedRows, e)
        onSelect && onSelect(matchRecord, check, selectedRows, e)
        let setRecord = {
            ...record,
            _checked: check,
            _disabled: innerDisableKeys.includes(currentKey)
        }
        getSelectedDataFunc && getSelectedDataFunc(getSelectedDataTarget.oldSelectedRows, setRecord, index, getSelectedDataTarget.oldData); // record需要带_checked

    }, [innerAutoSelect, onChange, onSelect, getSelectedDataFunc, innerSelectedRowKeys, realIsControlled, data, dataTarget, keyTarget, showData]);

    // const normalize = useCallback((elements: React.ReactElement[], _defaultColumns: ColumnType<DefaultRecordType>[]) => {
    //     const columns:ColumnType<DefaultRecordType>[] = [];
    //     React.Children.forEach(elements, element => {
    //         if (!(element && (element.type === Column || element.type === ColumnGroup))) return;
    //         let column = {...element.props};
    //         let _columnType = column.columnType || columnType.DEFAULTTYPE;
    //         if (element.key) {
    //             column.key = element.key;
    //         }
    //         if (element.type === ColumnGroup) {
    //             column.children = normalize(column.children, _defaultColumns);
    //         }
    //         if (_columnType === columnType.ROWDRAG) { // 拖拽行
    //             column = {
    //                 ...defaultDragHandleColumn,
    //                 ...column
    //             }
    //         }
    //         if (_columnType === columnType.MULTISELECT || _columnType === columnType.SINGLESELECT) { // 多选, 单选
    //             column = {
    //                 ..._defaultColumns[0],
    //                 ...column
    //             }
    //         }
    //         columns.push(column);
    //     });
    //     return columns;
    // }, [columns])


    const onRadioChange = useCallback((record: DefaultRecordType, index: number, event: React.MouseEvent<HTMLElement>) => {
        let currentKey = getRowKey(record, index);
        if (!currentKey && currentKey !== 0 && currentKey !== '0') return;
        let matchResults =
            TreeUtils.findWithPropName(ObjectAssign(data), (row: DefaultRecordType, i: number) => {
                return getRowKey(row, i);
            }, currentKey, true, true);
        let matchRecord = matchResults.length > 0 ? matchResults[0] : null;
        if (!matchRecord) return;
        if (innerSelectedRowKeys[0] === currentKey) {
            if (!realIsControlled) { // 非受控
                ref.current._selectedRowKeys = []
                setInnerSelectedRowKeys([])
            }
            getSelectedDataFunc && getSelectedDataFunc(record, index, event);
            // antd没有单选取消事件，tinper有，且tinper受控的话需要对外返回事件
            if (!antd) {
                onSelect && onSelect(record, false, [record], event)
                onChange && onChange([], [], event);
            }
        } else {
            if (!realIsControlled) { // 非受控
                ref.current._selectedRowKeys = [currentKey]
                ref.current._selectRowList = [record]
                setInnerSelectedRowKeys([currentKey])
                setInnerSelectedRowList([record])
            }
            getSelectedDataFunc && getSelectedDataFunc(record, index, event);
            onSelect && onSelect(record, true, [record], event)
            onChange && onChange([currentKey], [record], event);
        }
    }, [innerSelectedRowKeys, onSelect, onChange, getSelectedDataFunc, realIsControlled, data, keyTarget, showData])

    const setByClickRowsChange = useCallback((record: DefaultRecordType, index: number, event: any, onRowClick?: any) => {
        if (autoCheckedByClickRows && (!!selectType || rowSelection !== undefined)) { // 多选单选
            let currentKey = getRowKey(record, index)
            let checked = innerSelectedRowKeys.includes(currentKey)
            if (!innerDisableKeys.includes(currentKey) && autoCheckedByClickRows) {
                if (realSelectionType === 'radio') {
                    if (event.target?.tagName !== 'INPUT' && event?.target?.name !== 'table-radio') {
                        onRadioChange(record, index, event)
                    }
                } else {
                    onCheckboxChange('', record, index)(!checked, event)
                }
            }
        }
        onRowClick && onRowClick(record, index, event)
    }, [innerSelectedRowKeys, innerDisableKeys, autoCheckedByClickRows, realSelectionType, data, selectType, rowSelection, onRadioChange, onCheckboxChange, onAllCheckChange, showData])

    const onCellClick = useCallback((record: DefaultRecordType, event: any, index: number) => {
        if (!!selectType || rowSelection !== undefined) { // 多选单选
            let currentKey = getRowKey(record, index)
            let checked = innerSelectedRowKeys.includes(currentKey)
            if (!innerDisableKeys.includes(currentKey)) {
                if (realSelectionType === 'radio') {
                    if (event.target?.tagName !== 'INPUT' && event?.target?.name !== 'table-radio') {
                        onRadioChange(record, index, event)
                    }
                } else {
                    onCheckboxChange('', record, index)(!checked, event)
                }
            }
        }
    }, [innerSelectedRowKeys, innerDisableKeys, realSelectionType, data, selectType, rowSelection, onRadioChange, onCheckboxChange, onAllCheckChange, showData])

    const onInvertCheckChange = useCallback(() => {
        let selectKeys = [...(ref.current._selectedRowKeys || [])]
        let invertDataFun = (data: DefaultRecordType[]) => {
            data.forEach((item: DefaultRecordType, index: number) => {
                let currentKey = getRowKey(item, index); // 当前key
                let isDisable = innerDisableKeys.includes(currentKey) // 是否是禁选状态
                if (!isDisable) {
                    if (selectKeys.includes(currentKey)) {
                        delkey(selectKeys, currentKey)
                    } else {
                        selectKeys = selectKeys.concat(currentKey)
                    }
                }
                if (item && typeof item === 'object' && childrenColumnName in item && Array.isArray(item[childrenColumnName])) {
                    invertDataFun(item[childrenColumnName])
                }
            })
        }
        invertDataFun(showData)
        if (!realIsControlled) {
            ref.current._selectedRowKeys = [selectKeys]
            setInnerSelectedRowKeys(selectKeys)
        }
        onSelectInvert && onSelectInvert(selectKeys)
    }, [innerSelectedRowKeys, showData, realIsControlled, onSelectInvert])

    const mergeSelections = useMemo(() => {
        const selectionList = selections === true ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE] : selections;
        return selectionList;
    }, [selections])

    const onSelectionSelect = useCallback(({key}: SelectInfo) => {
        if (key === 'all') {
            // 内置全选所有的逻辑
            onAllCheckChange(true, true)
        } else if (key === 'invert') {
            // 内置反选当页的逻辑
            onInvertCheckChange()
        } else if (key === 'none') {
            // 内置清空所有的逻辑
            onAllCheckChange(false, true)
        } else {
            const _index = (mergeSelections as any[]).findIndex((el: DefaultRecordType) => el.key == key) as number
            const onSelect = (mergeSelections as any[])[_index].onSelect;
            let changedKeys = showData.flat(Infinity).map((item: DefaultRecordType, index: number) => (getRowKey(item, index))).filter((key: string) => (!innerDisableKeys.includes(key)))
            _index > -1 && onSelect && onSelect(changedKeys)
        }
    }, [mergeSelections, innerSelectedRowKeys, innerDisableKeys, showData])

    const mergeColumns = useCallback(
        (columns: ColumnType<DefaultRecordType>[]) => {
            // 拖拽宽度
            // if ((columns || []).map(col => (col.key)).includes('checkbox') || (columns || []).map(col => (col.key)).includes('radio')) return columns;
            let fieldidAttr = fieldid ? {fieldid} : {};
            if (realSelectionType === 'checkbox') {
                const { checkedAll, indeterminate, disabledAll } = isAllChecked;
                let propsLocale = locale || context.locale
		        let _locale = getLangInfo(propsLocale, i18n, 'table');
                const menu = (
                    <Menu onClick={onSelectionSelect}>
                        {
                            ((mergeSelections || []) as MenuSelectionsType[] | string[]).map((data: MenuSelectionsType | string) => {
                                if (data === SELECTION_ALL) {
                                    return <Item key={'all'}>{_locale.langMap.selectAll || '全选所有'}</Item>
                                }
                                if (data === SELECTION_INVERT) {
                                    return <Item key={'invert'}>{_locale.langMap.invertCurrentPage || '反选当页'}</Item>
                                }
                                if (data === SELECTION_NONE) {
                                    return <Item key={'none'}>{_locale.langMap.clearAll || '清空所有'}</Item>
                                }
                                return <Item key={(data as MenuSelectionsType).key}>{(data as MenuSelectionsType).text}</Item>
                            })
                        }
                    </Menu>
                )

                const selectionsView = <div className={`${prefix}-table-selection-extra`}>
                    <Dropdown trigger={['click']} overlay={menu} transitionName='slide-up'>
                        <Icon type="uf-anglearrowdown"/>
                    </Dropdown>
                </div>
                let defaultTitle: React.ReactNode = (
                    <Fragment>
                        <Checkbox
                            className="table-checkbox"
                            checked={checkedAll}
                            indeterminate={indeterminate}
                            {...multiSelectConfig}
                            {...fieldidAttr}
                            disabled={disabledAll}
                            onChange={(checked) => onAllCheckChange(checked as boolean, false)}
                        />
                        {mergeSelections ? selectionsView : null}
                    </Fragment>
                )
                let title: React.ReactNode = columnTitle ? columnTitle : hideSelectAll ? null : defaultTitle

                let defaultColumn: ColumnType<DefaultRecordType>[] = [{
                    className: `${prefix}-table-multiSelect-column`,
                    title: title,
                    key: "checkbox",
                    dataIndex: "checkbox",
                    columnType: columnType.MULTISELECT,
                    fixed: typeof fixed === 'boolean' ? !!fixed : 'left',
                    width: columnWidth || DEFAULT_SELECT_WIDTH,
                    onCellClick: onCellClick,
                    render:
                        renderCell && typeof renderCell === 'function' ?
                            (text: any, record: DefaultRecordType, index: number) => renderCell(text, record, index) :
                            (text: any, record: DefaultRecordType, index: number) => {
                                let _getCheckboxProps = getCheckboxProps && typeof getCheckboxProps === 'function' ? {...getCheckboxProps(record, index)} : {}
                                let checkedRowKey = getRowKey(record, index);
                                let currentIndeterminate =
                                    record && typeof record === 'object' && childrenColumnName in record && Array.isArray(record[childrenColumnName]) && innerAutoSelect ?
                                        checkAllSelected([record], innerSelectedRowKeys, innerDisableKeys, getRowKey).indeterminate :
                                        false
                                const { tooltip } = _getCheckboxProps
                                return tooltip && tooltip() ? <div>
                                    <Tooltip arrowPointAtCenter placement="top" overlay={tooltip()}>
                                        <div>
                                            <Checkbox
                                                key={index}
                                                className="table-checkbox"
                                                {...multiSelectConfig}
                                                {..._getCheckboxProps}
                                                {...fieldidAttr}
                                                checked={innerSelectedRowKeys.includes(checkedRowKey)}
                                                disabled={innerDisableKeys.includes(checkedRowKey)}
                                                indeterminate={currentIndeterminate}
                                                onChange={onCheckboxChange(text, record, index)}
                                            />
                                        </div>
                                    </Tooltip>
                                </div> : <Checkbox
                                    key={index}
                                    className="table-checkbox"
                                    {...multiSelectConfig}
                                    {..._getCheckboxProps}
                                    {...fieldidAttr}
                                    checked={innerSelectedRowKeys.includes(checkedRowKey)}
                                    disabled={innerDisableKeys.includes(checkedRowKey)}
                                    indeterminate={currentIndeterminate}
                                    onChange={onCheckboxChange(text, record, index)}
                                />
                            }
                }]
                // if (columns === undefined && children && Array.isArray(children) && children.length > 0) {
                //     return normalize(children, defaultColumn)
                // } else {
                let currentIndex = columns?.findIndex(col => col.columnType === columnType.MULTISELECT || col.columnType === columnType.SINGLESELECT);
                if (currentIndex > -1) {
                    columns.splice(currentIndex, 1, defaultColumn[0])
                    return columns;
                } else {
                    return defaultColumn.concat(columns);
                }
                // }
            } else { // 单选
                let _defaultColumns: ColumnType<DefaultRecordType>[] = [{
                    className: `${prefix}-table-single-column`,
                    title: columnTitle || '',
                    key: "radio",
                    dataIndex: "radio",
                    columnType: columnType.SINGLESELECT,
                    fixed: typeof fixed === 'boolean' ? !!fixed : 'left',
                    width: columnWidth || DEFAULT_SELECT_WIDTH,
                    onCellClick: onCellClick,
                    render: renderCell && typeof renderCell === 'function' ? (text: any, record: DefaultRecordType, index: number) => renderCell(text, record, index) : (_text: any, record: DefaultRecordType, index: number) => {
                        let _getCheckboxProps = getCheckboxProps && typeof getCheckboxProps === 'function' ? {...getCheckboxProps(record)} : {}
                        const { tooltip } = _getCheckboxProps;
                        return tooltip && tooltip() ? <div>
                            <Tooltip arrowPointAtCenter placement="top" overlay={tooltip()}>
                                <div>
                                    <RadioWrapper.Group
                                        Component='div'
                                        className="table-radio"
                                        name="table-radio"
                                        {...fieldidAttr}
                                        value={innerSelectedRowKeys[0]}
                                        onClick={(_v: string | boolean | number, e: React.MouseEvent<HTMLElement>) => onRadioChange(record, index, e)}
                                        style={{width: '14px', height: '14px', display: 'block'}}>
                                        <RadioWrapper value={getRowKey(record, index)} {..._getCheckboxProps}/>
                                    </RadioWrapper.Group>
                                </div>
                            </Tooltip>
                        </div> : <RadioWrapper.Group
                            Component='div'
                            className="table-radio"
                            name="table-radio"
                            {...fieldidAttr}
                            value={innerSelectedRowKeys[0]}
                            onClick={(_v: string | boolean | number, e: React.MouseEvent<HTMLElement>) => onRadioChange(record, index, e)}
                            style={{width: '14px', height: '14px', display: 'block'}}>
                            <RadioWrapper value={getRowKey(record, index)} {..._getCheckboxProps}/>
                        </RadioWrapper.Group>
                    }
                }]
                // if (columns === undefined && children && Array.isArray(children)) {
                //     return normalize(children, _defaultColumns)
                // } else {
                let currentIndex = columns.findIndex(col => col.columnType === columnType.SINGLESELECT || col.columnType === columnType.MULTISELECT);
                if (currentIndex > -1) {
                    columns.splice(currentIndex, 1, _defaultColumns[0])
                    return columns;
                } else {
                    return _defaultColumns.concat(columns);
                }
                // }
            }
        },
        [
            realSelectionType,
            showData,
            innerSelectedRowKeys,
            innerDisableKeys,
            getRowKey,
            mergeSelections,
            multiSelectConfig,
            getSelectedDataFunc,
            columns,
            fieldid,
            getCheckboxProps
        ],
    );

    if (!realSelectionType) {
        return [() => columns, [], () => {}]
    }

    return [mergeColumns, innerSelectedRowKeys, setByClickRowsChange]
}

export default useSelect;