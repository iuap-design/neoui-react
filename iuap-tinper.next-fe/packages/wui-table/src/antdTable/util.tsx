/*
 * @Author: Mr.mjc
 * @Date: 2021-11-09 19:32:36
 * @LastEditors: MJC
 * @LastEditTime: 2023-03-16 11:01:19
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/antdTable/util.tsx
 */
import {sortTypeMap} from './config';
import { TableProps, ColumnType, SorterType } from '../iTable';
// import { ColumnType } from '../iTable';
import { DefaultRecordType, Key, GetRowKey } from '../interface';

export const checkOne = (a: any, b: any) => {
    if (a === undefined || a === null) return b;
    return a
}

/**
 * @description: 处理props
 * @param {*}
 * @return {*}
 */
export const handlePropsFun = (props: TableProps, ComplexColumns: ColumnType<DefaultRecordType>[] = [], expandedRowKeys: Key[]) => {
    let ComplexProps: Record<string, any>;
    const {
        rowSelection,
        expandable = {}, // antd的展开配置项
        // size = 'default',
        locale = {},
        expandIconColumnIndex, // 多选本地属性
        autoSelect, // 多选本地属性
        childrenColumnName = 'children',
        defaultExpandAllRows,
        defaultExpandedRowKeys = [],
        expandedRowClassName,
        expandedRowRender,
        expandRowByClick,
        indentSize,
        tableLayout,
        expandIconAsCell,
    } = props;
    let {type: selectionType = undefined, checkStrictly = undefined} = rowSelection == null ? {} : rowSelection;
    const {
        childrenColumnName: antdChildrenColumnName = 'children',
        columnWidth: antdColumnWidth = 43, // 和tinper保持
        defaultExpandAllRows: antdDefaultExpandAllRows,
        defaultExpandedRowKeys: antdDefaultExpandedRowKeys = [],
        expandedRowClassName: antdExpandedRowClassName,
        expandedRowRender: antdExpandedRowRender,
        expandIcon: antdExpandIcon,
        expandIconColumnIndex: antdExpandIconColumnIndex,
        expandRowByClick: antdExpandRowByClick = false,
        fixed: antdFixed,
        indentSize: antdIndentSize = 15,
    } = expandable;
    let _antdColumnWidth = typeof antdColumnWidth === 'number' ? antdColumnWidth : Number(antdColumnWidth.replace('px', ''))
    const otherExpandable = {
        childrenColumnName: checkOne(antdChildrenColumnName, childrenColumnName),
        defaultExpandAllRows: checkOne(antdDefaultExpandAllRows, defaultExpandAllRows),
        defaultExpandedRowKeys: checkOne(antdDefaultExpandedRowKeys, defaultExpandedRowKeys),
        expandedRowClassName: checkOne(antdExpandedRowClassName, expandedRowClassName),
        expandedRowKeys: expandedRowKeys,
        expandedRowRender: checkOne(antdExpandedRowRender, expandedRowRender),
        expandRowByClick: checkOne(antdExpandRowByClick, expandRowByClick),
        indentSize: checkOne(antdIndentSize, indentSize),
        expandIcon: antdExpandIcon,
        expandIconAsCell: checkOne(antdFixed, expandIconAsCell), // TODO:Antd该APi好像有问题
        expandIconColumnIndex: checkOne(antdExpandIconColumnIndex, expandIconColumnIndex),
        expandIconCellWidth: _antdColumnWidth// 兼容可自定义扩展icon列宽度
    }
    ComplexProps = {
        ...props,
        ...otherExpandable,
        // size: sizeMap[size],
        columns: ComplexColumns,
        autoSelect: checkOne(checkStrictly, autoSelect)
    }
    // 兼容antd的emptyText
    if ((locale as Record<string, any>).emptyText) {
        if (typeof (locale as Record<string, any>).emptyText === 'function') {
            ComplexProps.emptyText = (locale as Record<string, any>).emptyText
        } else {
            ComplexProps.emptyText = () => (locale as Record<string, any>).emptyText
        }
        delete ComplexProps.locale;
    }
    // layout布局
    if (tableLayout) {
        ComplexProps.style = props.style ? {...props.style, tableLayout} : {tableLayout}
    }
    let isSort = ComplexColumns.filter((el) => el.hasOwnProperty('sorter'))
    if (isSort.length) {
        ComplexProps.sort = Object.assign({}, {...ComplexProps.sort});
        ComplexProps.sort.mode = 'single' // 置为默认的单列排序
        ComplexColumns.forEach((col: ColumnType<DefaultRecordType>)=> {
            if (col.sorter) {
                // tip: 如果后端排序需要sorter为true
                if (typeof col.sorter === 'boolean' && col.sorter === true) {
                    ComplexProps.sort.backSource = true
                }
                if (col.orderNum) { // handleColumns函数处理过多列排序属性
                    ComplexProps.sort.mode = 'multiple';
                }
                // if (Object.prototype.toString.call(col.sorter) === '[object Object]' && (col.sorter as SorterType).compare && typeof (col.sorter as SorterType).compare === 'function') {
                //     if ((col.sorter as SorterType).multiple) {
                //         ComplexProps.sort.mode = 'multiple';
                //     }
                // }
            }
            if (col.ellipsis) {
                ComplexProps.headerDisplayInRow = true
                ComplexProps.bodyDisplayInRow = true
            }
        })
    }

    if (Object.keys(rowSelection == null ? {} : rowSelection).length && !selectionType) {
        selectionType = 'checkbox'; // 默认为多选
    }
    if (selectionType === 'checkbox') {
        ComplexProps.expandIconColumnIndex = checkOne(antdExpandIconColumnIndex, expandIconColumnIndex);
    }
    return ComplexProps;

}

/**
 * @description: 处理Columns
 * @param {*}
 * @return {*}
 */
export const handleColumns = (columns:ColumnType<DefaultRecordType>[] = [], sortEventCache: DefaultRecordType, cb: Function) => {
    // let arr = JSON.parse(JSON.stringify(columns));
    columns.forEach(col => {
        // TODO:筛选的部分解析，项目暂未用到，可以滞后开发

        // 对齐方式兼容
        if (col.align) {
            col.textAlign = col.align;
        }
        if (col.sortOrder) { // 兼容sortOrder和order
            // if (typeof col.sortOrder === 'boolean' && !col.sortOrder) { // false
            //     col.order = col.order ? col.order : null
            // } else {
            col.order = col.sortOrder || col.order || null
            // }
        }
        if (col.sorter) {
            if (Object.prototype.toString.call(col.sorter) === '[object Object]' && (col.sorter as SorterType).compare && typeof (col.sorter as SorterType).compare === 'function') {
                if ((col.sorter as SorterType).multiple) {
                    col.orderNum = (col.sorter as SorterType).multiple
                    // _props.sort.mode = 'multiple';
                }
                col.sorter = (col.sorter as SorterType).compare
            }
        }
        if (col.sorterClick && typeof col.sorterClick === 'function') {
            if (col.dataIndex && !sortEventCache[col.dataIndex]) {
                sortEventCache[col.dataIndex] = col.sorterClick; // 外部函数
                col.sorterClick = (column: ColumnType, type: string) => {
                    let {dataIndex, key} = column;
                    let _sorterInfo = {
                        column: sortTypeMap[type] === 'undefined' ? 'undefined' : column,
                        columnKey: key,
                        field: dataIndex,
                        order: sortTypeMap[type]
                    }
                    column.dataIndex && sortEventCache[column.dataIndex](column, type)
                    cb && cb(_sorterInfo)
                }
            }
        } else {
            col.sorterClick = (column: ColumnType, type: string) => {
                let {dataIndex, key} = column;
                let _sorterInfo = {
                    column: sortTypeMap[type] === 'undefined' ? 'undefined' : column,
                    columnKey: key,
                    field: dataIndex,
                    order: sortTypeMap[type]
                }
                cb && cb(_sorterInfo)
            }
            if (col.dataIndex && !sortEventCache[col.dataIndex]) {
                sortEventCache[col.dataIndex] = col.sorterClick
            }
        }
    })
    return columns;
}


/**
 * @description: 获取每条数据的key的值
 * @param {*}
 * @return {*}
 */
export const getRowKey = (record: DefaultRecordType, index: number, rowKey: GetRowKey<DefaultRecordType> | string) => {
    let key;
    if (rowKey && typeof rowKey === 'function') {
        key = rowKey(record, index)
    } else if (rowKey) {
        key = record[rowKey]
    } else {
        if (record.hasOwnProperty('key')) {
            key = record.key
        }
    }
    return key
}

// const getChangeableRowKeys = (_data: DefaultRecordType[], childrenColumnName: string, rowKey: GetRowKey<DefaultRecordType> | string, list: DefaultRecordType[] = []) => {
//     _data.filter(v => !v.disabled).forEach((col, index) => {
//         let _key = getRowKey(col, index, rowKey)
//         list.push(_key)
//         if (col[childrenColumnName] && Array.isArray(col[childrenColumnName])) {
//             getChangeableRowKeys(col[childrenColumnName], childrenColumnName, rowKey, list)
//         }
//     })
// }

// export const changeableRowKeys = (_data: DefaultRecordType[], childrenColumnName: string, rowKey: GetRowKey<DefaultRecordType> | string) => {
//     let list: DefaultRecordType[] = [];
//     getChangeableRowKeys(_data, childrenColumnName, rowKey, list = [])
//     return list;
// }

const setCheckTree = (data: DefaultRecordType[] = [], hasCheckList:Key[] = [], getCheckboxProps: any, rowKey: GetRowKey<DefaultRecordType> | string) => {
    data.forEach((item, index) => {
        // 筛选disable条件
        item._key = getRowKey(item, index, rowKey);
        if (hasCheckList.includes(item._key)) {
            item._checked = true
        } else {
            item._checked = false
        }
        if (getCheckboxProps && typeof getCheckboxProps === 'function') {
            let target = getCheckboxProps(item) || {}
            if (target.hasOwnProperty('disabled')) {
                item._disabled = target.disabled
            } else {
                item._disabled = false
            }
        }
        if (item.children) {
            setCheckTree(item.children, hasCheckList, getCheckboxProps, rowKey)
        }
    })
    return data;
}


/**
 * @description: 多选处理树形的表格data
 * @param {*}
 * @return {*}
 */
// export const handleData = (data, rowSelection = {}, rowKey) => {
//     rowSelection = rowSelection == null ? {} : rowSelection;
//     // 树形数据需要递归做兼容处理，兼容antd数据格式
//     let _data = [];
//     const { selectedRowKeys = [], defaultSelectedRowKeys = [] } = rowSelection;
//     if(selectedRowKeys.length || defaultSelectedRowKeys.length) {
//         let hasCheckList = selectedRowKeys.length ? selectedRowKeys : defaultSelectedRowKeys
//         _data = setCheckTree(data, hasCheckList, rowKey)
//     } else {
//         _data = setCheckTree(data, [], rowKey)
//     }
//     return _data
// }

export const handleData = (data: DefaultRecordType[], selectedRowKeys: Key[] = [], getCheckboxProps:any, rowKey: GetRowKey<DefaultRecordType> | string) => {
    let _data: DefaultRecordType[] = [];
    _data = setCheckTree(data, selectedRowKeys, getCheckboxProps, rowKey)
    return _data
}

// const setSelectKeysTree = (selectList: DefaultRecordType[] = [], rowKey: GetRowKey<DefaultRecordType> | string, childrenColumnName: string, list: DefaultRecordType[]) => {
//     selectList.forEach((item, index) => {
//         let _key = getRowKey(item, index, rowKey);
//         if (item._checked) {
//             !list.includes(_key) && list.push(_key)
//         }
//         // 树形结构处理
//         if (item[childrenColumnName] && Array.isArray(item[childrenColumnName])) {
//             setSelectKeysTree(item[childrenColumnName], rowKey, childrenColumnName, list)
//         }
//     })
//     return list;
// }

/**
 * @description: 表格的已选数据keys
 * @param {*}
 * @return {*}
 */
// export const getSelectedRowKeys = (selectList: DefaultRecordType[] = [], rowKey: GetRowKey<DefaultRecordType> | string, childrenColumnName: string) => {
//     let list:DefaultRecordType[] = [];
//     let _list = setSelectKeysTree(selectList, rowKey, childrenColumnName, list)
//     return _list;
// }


/**
 * @description: 初始化onChange事件filter对象的key-value
 * @param {*}
 * @return {*}
 */
export const resetFilterInfo = (columns: ColumnType[]) => { // TODO：考虑多表头filter处理。底层不太一致，暂不考虑多表头tree结构处理
    // let arr = JSON.parse(JSON.stringify(columns))
    let target = {};
    (columns || []).forEach(item => {
        const {key} = item
        // columns[i]含有`onFilter`字段就会塞进初始化对象一个，不管值是否存在
        if (Object.keys(item).includes('onFilter')) {
            if (key) {
                target[key] = null
            }
        }
    })
    return target
}

// export const getSingleIndex = (dataSource: DefaultRecordType[], selectKey: Key, rowKey: GetRowKey<DefaultRecordType> | string) => {
//     if (!selectKey && selectKey !== 0 && selectKey !== '0') {
//         return null
//     }
//     let index = (dataSource || []).findIndex((item, index) => getRowKey(item, index, rowKey) === selectKey);
//     if (index > -1) {
//         return index
//     } else {
//         return null
//     }
// }


export const handlePageFun = (pagination: any) => {
    if (pagination === false) {
        return pagination; // 不显示分页
    }
    if (pagination === null || pagination === undefined) {
        let pageObj = {
            current: 1,
            pageSize: 10,
        }
        return pageObj
    } else {
        let pageObj = Object.assign({}, {
            current: 1,
            pageSize: 10,
        }, {...(pagination || {})})
        if (typeof pageObj.total !== 'number') {
            delete pageObj.total
        }
        return pageObj
    }
}

export const showDataFun = (pagination: any, ComplexPagination: any, data: DefaultRecordType[]) => {
    const {current = 1, pageSize = 10} = ComplexPagination;
    let flag = data.length > pageSize
    if (pagination === null || pagination === undefined || (flag && pagination !== false)) { // 前端分页
        let _data = (data || []).slice((current - 1) * pageSize, current * pageSize);
        return _data
    }
    return data
}


// export const throttle = (func, wait = 500, options = {}) => {
//     let timeout,
//     previous = 0

//     return function() {
//       let now = +new Date()
//       let remain = wait - (now - previous)

//       if (remain < 0) {
//         if (previous === 0 && !options.begin) {
//           previous = now
//           return
//         }

//         if (timeout) {
//           clearTimeout(timeout)
//           timeout = null
//         }

//         previous = now
//         func.call(this, arguments)
//       } else if (!timeout && options.end) {
//         timeout = setTimeout(() => {
//           func.call(this, arguments)
//           timeout = null
//         }, wait)
//       }
//     }
//   }
