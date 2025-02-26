/*
* 快速排序，按某个属性，或按“获取排序依据的函数”，来排序.
* @method soryBy
* @static
* @param {array} arr 待处理数组
* @param {string|function} prop 排序依据属性，获取
* @param {boolean} desc 降序
* @return {array} 返回排序后的新数组
*/

import {warningOnce} from "./utils";
import { GetRowKey, DefaultRecordType, Key } from '../interface';
// import { getRowKey } from '../antdTable/util'


/**
 * 解析props.rowKey属性获取行的唯一键值
 * @param rowKey 来自 table.props.rowKey
 * @param record 当前单行数据对象
 * @param index  当前单行索引值
 */
export function getValueByRowKey(rowKey: GetRowKey<DefaultRecordType> | string, record: DefaultRecordType, index: number) {
    if (!rowKey || !record) return;
    const key = (typeof rowKey === 'function') ?
        rowKey(record, index) : record[rowKey];
    warningOnce(
        key !== undefined,
        'Each record in table should have a unique `key` prop,' +
		'or set `rowKey` to an unique primary key.'
    );
    return key;
}


// export function sortBy(arr: any[], prop:any, desc: any) {
//     let props = [],
//         ret = [],
//         i = 0,
//         len = arr.length;
//     if (typeof prop == 'string') {
//         for (; i < len; i++) {
//             let oI = arr[i];
//             (props[i] = new String(oI && oI[prop] || ''))._obj = oI;
//         }
//     } else if (typeof prop == 'function') {
//         for (; i < len; i++) {
//             let oI = arr[i];
//             (props[i] = new String(oI && prop(oI) || ''))._obj = oI;
//         }
//     } else {
//         // throw '参数类型错误';
//     }
//     props.sort();
//     for (i = 0; i < len; i++) {
//         ret[i] = props[i]._obj;
//     }
//     if (desc) ret.reverse();
//     return ret;
// }

/**
 * 数组对象排序
 * console.log(arr.sort(compare('age')))
 * @param {} property
 */
export function compare(property: string | number) {
    return function(a: any, b: any) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

/**
 * 简单数组数据对象拷贝
 * @param {*} obj 要拷贝的对象
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ObjectAssign(obj: any[] | DefaultRecordType) {
    let b = obj instanceof Array;
    let tagObj = b ? [] : {};
    if (b) {// 数组
        obj.forEach((da: any) => {
            let _da = {};
            Object.assign(_da, da);
            (tagObj as any[]).push(_da);
        });
    } else {
        Object.assign(tagObj, obj);
    }
    return tagObj;
}

/**
 * 移动数组元素位置
 * @param {array} arr 数组
 * @param moveIndex 移动的位置
 * @param toIndex 目标的位置
 */
export function arrayMoveTo(arr: DefaultRecordType[], moveIndex: number, toIndex: number) {
    let value = arr[moveIndex];
    if (moveIndex < toIndex) {
        arr.splice(moveIndex, 1);
        arr.splice(toIndex, 0, value)
    } else if (moveIndex > toIndex) {
        arr.splice(moveIndex, 1);
        arr.splice(toIndex, 0, value)
    }
    return arr;
}

/**
 * 判断要拖拽改变位置的数据长度
 * @param data 数据
 * @param childrenColumnName 子级字段
 */
export const getLength = (data:DefaultRecordType[] = [], childrenColumnName: string) => {
    let length = 0;
    let lengthFn = (arr:DefaultRecordType[]) => {
        arr.forEach((record: DefaultRecordType) => {
            length++;
            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                lengthFn(record[childrenColumnName])
            }
        })
    }
    lengthFn(data);
    return length;
}

/**
 * 有标识的array数据转变为树形数据
 * @param list array数据
 */
export const setTreeData = (list:DefaultRecordType[]) => {
    list.forEach((item:DefaultRecordType) => {
        if (item.children) {
            item.children = []
        }
    })
    let res = [];
    const map = list.reduce((res, v) => (res[v.key] = v, res), {})
    for (const item of list) {
        if (!item.parentKey) {
            delete item.parentKey;
            delete item.currentRowKey;
            res.push(item)
            continue
        }
        if (item.parentKey in map) {
            const parent = map[item.parentKey]
            parent.children = parent.children || [];
            delete item.parentKey;
            delete item.currentRowKey;
            parent.children.push(item)
        }
    }
    return res;
}

/**
 * 树形数据转变为有标识的array数据
 * @param arr 树形数据
 * @param childrenColumnName 子级字段
 * @param rowKey
 */
export const toArray = (arr:DefaultRecordType[], childrenColumnName: string, rowKey:GetRowKey<DefaultRecordType> | string):DefaultRecordType[] => {
    let list:DefaultRecordType[] = [];
    let fn = (dataList:DefaultRecordType[], parentKey: any = null) => { // level标识等级
        (dataList || []).forEach((record, index) => {
            let currentRowKey = getValueByRowKey(rowKey, record, index);
            let currentData = {
                ...record,
                parentKey,
                currentRowKey,
            }
            list.push(currentData)
            if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
                fn(record[childrenColumnName], currentRowKey)
            }
        })
    }
    fn(arr);
    return list;
}

/**
 * 判断该行是否是展开行并且处于展开状态
 * @param data 改行数据
 * @param childrenColumnName 子级字段
 * @param expandedRowKeys 展开行
 */
export const isExpandedFn = (data:DefaultRecordType, childrenColumnName: string, expandedRowKeys: Key[] = []) => {
    if (data[childrenColumnName] && Array.isArray(data[childrenColumnName]) && data[childrenColumnName].length) {
        return expandedRowKeys.includes(data.currentRowKey)
    } else {
        return false;
    }
}

/**
 * 移动树形数组元素位置
 * @param {array} arr 数组
 * @param moveIndex 移动的位置
 * @param toIndex 目标的位置
 */
export function arrayTreeMoveTo(arr:DefaultRecordType[], moveKey: Key, toKey: Key, childrenColumnName: string, rowKey:GetRowKey<DefaultRecordType> | string, expandedRowKeys: Key[]) {
    let list = toArray(arr, childrenColumnName, rowKey);
    let moveData = list.find(item => item.currentRowKey === moveKey) as DefaultRecordType;
    let moveDataIndex = list.findIndex(item => item.currentRowKey === moveKey)
    let toData = list.find(item => item.currentRowKey === toKey) as DefaultRecordType;
    let toDataIndex = list.findIndex(item => item.currentRowKey === toKey);
    let moveLength = getLength([moveData], childrenColumnName);
    let moveDataParentKey = moveData.parentKey; // 移动数据的parentKey;
    let moveDataCurrentKey = moveData.currentRowKey; // 移动数据的currentKey;
    let toDataParentKey = toData.parentKey; // 移动到改位置的parentKey;
    let toDataCurrentKey = toData.currentRowKey
    if (moveDataIndex < toDataIndex) { // 上向下移动
        if (moveDataIndex + moveLength - 1 >= toDataIndex) { // 自身拖拽到自身子级或者子孙级,则拖动停止的位置至拖动起始位置之间的直接子级parnentKey指向moveDataParentKey
            // let upData = list.slice(moveDataIndex, toDataIndex)
            let targetMove = list.slice(moveDataIndex, moveDataIndex + 1); // 移动的数据
            // console.log('targetMove', targetMove)
            for (let i = moveDataIndex + 1; i <= toDataIndex; i++) {
                if (list[i].parentKey === moveDataCurrentKey) {
                    list[i].parentKey = moveDataParentKey
                }
            }
            // targetMove[0].parentKey = toData.parentKey; // 移动的数据第一条parentKey指向移动位置的parentKey
            targetMove[0].parentKey = isExpandedFn(toData, childrenColumnName, expandedRowKeys) ? toData.currentRowKey : toData.parentKey
            list.splice(moveDataIndex, 1)
            list.splice(toDataIndex, 0, targetMove[0])
        } else {
            let targetMove = list.slice(moveDataIndex, moveDataIndex + moveLength); // 移动的数据
            // targetMove[0].parentKey = toDataParentKey; // 移动的数据第一条parentKey指向移动位置的parentKey
            targetMove[0].parentKey = isExpandedFn(toData, childrenColumnName, expandedRowKeys) ? toDataCurrentKey : toDataParentKey; // 移动的数据第一条parentKey指向移动位置的parentKey
            list.splice(moveDataIndex, moveLength)
            list.splice(toDataIndex - moveLength + 1, 0, ...targetMove)
        }
    } else if (moveDataIndex > toDataIndex) {
        let targetMove = list.slice(moveDataIndex, moveDataIndex + moveLength); // 移动的数据

        // targetMove[0].parentKey = isExpandedFn(toData, childrenColumnName, expandedRowKeys) ? toDataCurrentKey : toDataParentKey; // 移动的数据第一条parentKey指向移动位置的parentKey

        if (toDataIndex == 0) {
            targetMove[0].parentKey = null
        } else {
            let realData = list[toDataIndex - 1]; // 需要找出实际显示的上一个

            let fun = (record: DefaultRecordType): any => {
                if (!record.parentKey && !isExpandedFn(record, childrenColumnName, expandedRowKeys)) { // 拖拽到的是顶级
                    return record.parentKey
                } else {
                    if (!isExpandedFn(record, childrenColumnName, expandedRowKeys)) {
                        let upData = list.find(item => item.key === record.parentKey) as DefaultRecordType;
                        return fun(upData)
                    } else {
                        return record.currentRowKey
                    }
                }
            }
            targetMove[0].parentKey = fun(realData)
            // targetMove[0].parentKey = isExpandedFn(realData, childrenColumnName, expandedRowKeys) ? realData.currentRowKey : realData.parentKey
        }


        list.splice(moveDataIndex, moveLength)
        list.splice(toDataIndex, 0, ...targetMove)
    }
    // 数组转换为tree数据
    let data = setTreeData(list)
    return data;
}


/**
 *判断是否是树形结构
 * @param isTree    来自table.props.isTree
 * @param data      来自table.props.data
 */
export function checkIsTreeType(isTree: boolean | null | undefined, data: DefaultRecordType[]) {
    if (typeof isTree == 'boolean') return isTree;
    let tempData = data || [];
    let hasChildren = tempData.some((item) => item.children !== undefined);
    return hasChildren;
}


// todo: 检测浏览器是否支持粘性布局，如不支持，自动降级处理, 优化？是否通过css动态特征去判断
export const sticky = () => {
    const vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
        vendorListLength = vendorList.length,
        stickyElement = document.createElement('div');
    for (let i = 0; i < vendorListLength; i++) {
        stickyElement.style.position = vendorList[i] + 'sticky';
        if (stickyElement.style.position !== '') {
            return true;
        }
    }
    return false;
};


export const getComputedStyle = (ele: HTMLElement, key: string) => {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele).getPropertyValue(key)
    } else {
        // @ts-ignore 适配ie校验
        return ele.currentStyle[key]
    }
}

export const getTableCssHeight = (key: string) => {
    let cssHeight = parseFloat(getComputedStyle(document.documentElement, key));
    return cssHeight;
}


