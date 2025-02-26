import React from 'react';
import objectPath from 'object-path';
import warning from 'warning';
import {myBrowser, measureScrollbar, debounce} from "../../../wui-core/src/browserUtils";
export {myBrowser, measureScrollbar, debounce};
import { ColumnType } from '../iTable';
import { DefaultRecordType } from '../interface';
import { getComputedStyle } from './util';
import Column from '../Column';
import ColumnGroup from '../ColumnGroup';
import { columnType, defaultDragHandleColumn, defaultMulSelect, defaultSingleSelect, defaultRowNum } from '../constant';

const warned = {};
const MINWIDTH = 80;
const MAXWIDTH = 300;

const reTrimStart = /^\s+/
function parseInt(string: string, radix?: any) {
    if (radix == null) {
        radix = 0
    } else if (radix) {
        radix = +radix
    }
    return window.parseInt(`${string}`.replace(reTrimStart, ''), radix || 0)
}

export function warningOnce(condition: boolean, format: string, args?: any) {
    if (!warned[format]) {
        warning(condition, format, args);
        warned[format] = true;
    }
}

export function getOffset(Node:HTMLElement, offset: DefaultRecordType):DefaultRecordType {
    if (!offset) {
        offset = {};
        offset.top = 0;
        offset.left = 0;
    }
    if (Node == document.body) {
        return offset;
    }
    offset.top += Node.offsetTop;
    offset.left += Node.offsetLeft;
    if (Node.offsetParent)
        return getOffset(Node.offsetParent as HTMLElement, offset);
    else
        return offset;
}


export const tryParseInt = (value: string | number, defaultValue: number = 0) => {
    const resultValue = parseInt(value + '');

    if (isNaN(resultValue)) {
        return defaultValue;
    }
    return resultValue;
};


export function addClass(elm: HTMLElement, className: string) {
    if (!className) return;

    const els = Array.isArray(elm) ? elm : [elm];

    els.forEach((el) => {
        if (el.classList) {
            el.classList.add(className.split(' '));
        } else {
            el.className += ` ${className}`;
        }
    });
}

export function removeClass(elm: HTMLElement, className: string) {
    if (!className) return;

    const els = Array.isArray(elm) ? elm : [elm];

    els.forEach((el) => {
        if (el.classList) {
            el.classList.remove(className.split(' '));
        } else {
            el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
        }
    });
}

/**
 * 简单数组数据对象拷贝
 * @param {*} obj 要拷贝的对象
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ObjectAssign(obj: any[] | Record<string, any>) {
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
 * 获取某个父元素
 * */

export function closest(ele: any, selector:any) {
    const matches = ele.matches || ele.webkitMatchesSelector || ele.mozMatchesSelector || ele.msMatchesSelector;
    if (matches) {
        while (ele) {
            if (matches.call(ele, selector)) {
                return ele;
            } else {
                ele = ele.parentElement;
            }
        }
    }
    return null;
}

export function getColChildrenLength(columns: ColumnType<DefaultRecordType>[], chilrenLen: number) {
    columns.forEach((item: ColumnType<DefaultRecordType>) => {
        if (item.children) {
            chilrenLen = getColChildrenLength(item.children as ColumnType<DefaultRecordType>[], chilrenLen + 1);
        }
    })
    return chilrenLen;
}

export function getMaxColChildrenLength(columns: ColumnType<DefaultRecordType>[]) {
    let arr = [];
    arr = columns.map((item: ColumnType<DefaultRecordType>) => {
        let chilrenLen = 0;
        if (item.children) {
            chilrenLen = getColChildrenLength(item.children as ColumnType<DefaultRecordType>[], chilrenLen + 1)
        }
        return chilrenLen
    })
    let max = Math.max.apply(null, arr);
    return max;
}


function addHandler(element: any, type: string, handler: Function) {
    if (!element) return;
    let event = null;
    if (element.addEventListener) {// 检测是否为DOM2级方法
        event = element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {// 检测是否为IE级方法
        event = element.attachEvent("on" + type, handler);
    } else {// 检测是否为DOM0级方法
        event = element["on" + type] = handler;
    }
    return event;
}

function removeHandler(element: any, type: string, handler: Function) {
    if (element && element.removeEventListener) {// element&& ie11报错兼容
        element.removeEventListener(type, handler, false);
    } else if (element && element.detachEvent) {
        element.detachEvent("on" + type, handler);
    } else if (element) {
        element["on" + type] = null;
    }
}

function addHandlerArray(elemArray: any[], type: string, handler: Function) {
    if (!elemArray || !elemArray.length) return;
    for (let i = 0; i < elemArray.length; i++) {
        let elem = elemArray[i];
        addHandler(elem, type, handler);
    }
}

function removeHandlerArray(elemArray: any[], type: string, handler: Function) {
    if (!elemArray || !elemArray.length) return;
    for (let i = 0; i < elemArray.length; i++) {
        let elem = elemArray[i];
        removeHandler(elem, type, handler);
    }
}

// 获取事件对象的兼容性写法
function getEvent(event: any) {
    return event ? event : window.event;
}

// 获取事件对象目标的兼容性写法
function getTarget(event: any) {
    return event.target || event.srcElement;
}

function preventDefault(event: any) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

function stopPropagation(event: any) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

// 是否支持触摸事件
function isSupportTouch() {
    var support = {
        touch: !!(('ontouchstart' in window) || (window as any).DocumentTouch && document instanceof (window as any).DocumentTouch)
    };
    return support;
}


// 用事件冒泡方式，如果想兼容事件捕获只需要添加个bool参数
export const EventUtil = {
    addHandler: addHandler,
    removeHandler: removeHandler
}

export function checkDicimalInvalid(value: any, precision: number) {
    if (value == null || isNaN(value))
        return "";
    // 浮点数总位数不能超过10位
    let digit = parseFloat(value);
    let result = (digit * Math.pow(10, precision) / Math.pow(10, precision))
        .toFixed(precision);
    if (result == "NaN")
        return "";
    return result;
}

/*
 * 处理精度
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function DicimalFormater(value: any, precision: number) {
    value = value + '';
    precision = precision ? precision : 0;
    for (let i = 0; i < value.length; i++) {
        if ("-0123456789.".indexOf(value.charAt(i)) == -1)
            return "";
    }
    return checkDicimalInvalid(value, precision);
}


/**
 * 将数值转化为货币类型
 * @param {*} number 数值
 * @param {*} places 精度
 * @param {*} thousand 是否展示千分位
 */
export function formatMoney(number: number | string, places: number | undefined = 2, thousand: boolean = true) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    let thousandSymbol = thousand ? "," : '';
    let negative = number < 0 ? "-" : "";
    let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
    let a = i.length;
    let j = i.length > 3 ? a % 3 : 0;
    return negative + (j ? i.slice(0, j) + thousandSymbol : "") + i.slice(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandSymbol) + (places ? '.' + Math.abs(Number(number) - Number(i)).toFixed(places).slice(2) : "");
}

export const Event = {
    addHandler,
    removeHandler,
    addHandlerArray,
    removeHandlerArray,
    isSupportTouch,
    getEvent,
    getTarget,
    preventDefault,
    stopPropagation
}

/**
 * 将一维数组转换为树结构
 * @param {*} treeData  扁平结构的 List 数组
 * @param {*} attr 属性配置设置
 * @param {*} flatTreeKeysMap 存储所有 key-value 的映射，方便获取各节点信息
 */
export function convertListToTree(treeData: DefaultRecordType[], attr: DefaultRecordType, flatTreeKeysMap: DefaultRecordType) {
    console.log('treeData', treeData, 'attr', attr, 'flatTreeKeysMap', flatTreeKeysMap);
    let tree = []; // 存储所有一级节点
    let resData = treeData, // resData 存储截取的节点 + 父节点（除一级节点外）
        resKeysMap = {}, // resData 的Map映射
        treeKeysMap = {}; // tree 的Map映射
    resData.map((element) => {
        let key = attr.id;
        resKeysMap[element[key]] = element;
    });
    // 查找父节点，为了补充不完整的数据结构
    let findParentNode = (node: DefaultRecordType) => {
        let parentKey = node[attr.parendId];
        if (parentKey !== attr.rootId) { // 如果不是根节点，则继续递归
            let item = flatTreeKeysMap[parentKey];
            // 用 resKeysMap 判断，避免重复计算某节点的父节点
            if (resKeysMap.hasOwnProperty(item[attr.id])) return;
            resData.unshift(item);
            resKeysMap[item[attr.id]] = item;
            findParentNode(item);
        } else {
            // 用 treeKeysMap 判断，避免重复累加
            if (!treeKeysMap.hasOwnProperty(node[attr.id])) {
                let {key, title, _isLeaf, ...otherProps} = node;
                let obj = {
                    key,
                    title,
                    _isLeaf,
                    children: []
                }
                tree.push(Object.assign(obj, {...otherProps}));
                treeKeysMap[key] = node;
            }
        }
    }
    // 遍历 resData ，找到所有的一级节点
    for (let i = 0; i < resData.length; i++) {
        let item = resData[i];
        if (item[attr.parendId] === attr.rootId && !treeKeysMap.hasOwnProperty(item[attr.id])) { // 如果是根节点，就存放进 tree 对象中
            let {key, ...otherProps} = item;
            let obj = {
                key: item[attr.id],
                _isLeaf: item[attr._isLeaf],
                children: []
            };
            tree.push(Object.assign(obj, {...otherProps}));
            treeKeysMap[key] = item;
            resData.splice(i, 1);
            i--;
        } else { // 递归查找根节点信息
            findParentNode(item);
        }
    }
    // console.log('resData',resKeysMap);
    let run = function(treeArrs: DefaultRecordType[]) {
        if (resData.length > 0) {
            for (let i = 0; i < treeArrs.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    let item = resData[j];
                    if (treeArrs[i].key === item[attr.parendId]) {
                        let {...otherProps} = item;
                        let obj = {
                            key: item[attr.id],
                            _isLeaf: item[attr._isLeaf],
                            children: []
                        };
                        treeArrs[i].children.push(Object.assign(obj, {...otherProps}));
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(treeArrs[i].children);
            }
        }
    };
    run(tree);
    console.log('tree', tree);
    return tree;
}


const outerHeight = (ele:HTMLElement) => {
    let height = ele.offsetHeight;
    // @ts-ignore
    let style = ele.currentStyle || window.getComputedStyle(ele);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

const getNodeName = (ele: HTMLElement) => {
    return ele.nodeName.toUpperCase()
}


export const getItemKey = (item: DefaultRecordType, key: string | number) => {
    return objectPath.has(item, key) ? objectPath.get(item, key) : objectPath.get(item, [key])
}

export const fillTargetSpace = (element: HTMLElement, target: HTMLElement | undefined, func: Function) => {
    let parent = null;
    let isParent = false;
    if (target) {
        isParent = false;
    } else {
        parent = element.parentNode;
        isParent = true;
    }
    let maxHeight: number, maxWidth: number;
    // 如果为form元素则取其父级
    if (parent && getNodeName(parent as HTMLElement) === 'FORM') {
        parent = parent.parentNode;
    }
    // 如果父级是body则认为是全屏
    if (parent && getNodeName(parent as HTMLElement) === 'BODY') {
        (parent as HTMLElement).style.overflow = "hidden";
    }
    // 测试几种不是body的情况，无影响，不应该干预不属于表格的样式结构
    // else {
    //     (parent as HTMLElement).style.overflow = "visible";
    // }
    // TIP：clientHeight和clientWidth在某些浏览器下（edge）会自动四舍五入为整数，导致计算有误差，出现滚动条
    // maxHeight = (parent as HTMLElement).clientHeight; // 0
    // maxWidth = (parent as HTMLElement).clientWidth; // 0
    maxHeight = (parent as HTMLElement).getBoundingClientRect().height; // 0
    maxWidth = (parent as HTMLElement).getBoundingClientRect().width; //
    // 如果element的某个祖级display:none；则未渲染
    if (!maxHeight || !maxWidth) {
        return;
    }
    // 排除当前元素可见的兄弟节点高度
    let siblings = Array.prototype.slice.call(element.parentNode!.children);
    (siblings || []).forEach((sibling) => {
        if (getComputedStyle(sibling, 'display') !== 'none' && sibling !== element) {
            let position = getComputedStyle(sibling, 'position');
            if (position === "absolute" || position === "fixed") {
                return;
            }
            maxHeight -= outerHeight(sibling);
        }
    })
    // 如果当前元素不属于目标元素的一级子集
    if (!isParent) {
        // 排除目标元素中除当前元素父元素以外的其它元素高度
        let children = Array.prototype.slice.call(parent!.children);
        (children || []).forEach((child) => {
            maxHeight -= outerHeight(child);
        })
    }

    // @ts-ignore
    let style = parent.currentStyle || window.getComputedStyle(parent);

    maxHeight -= parseInt(style?.paddingTop || 0) + parseInt(style?.paddingBottom || 0)
    maxWidth -= parseInt(style?.paddingLeft || 0) + parseInt(style?.paddingRight || 0)

    // 注意：排除padding的尺寸
    let elemW = parseInt(getComputedStyle(element, 'width'));
    let elemH = parseInt(getComputedStyle(element, 'height'));
    let noPaddingMaxW = Math.max(0, maxWidth - element.clientWidth + elemW);
    let noPaddingMaxH = Math.max(0, maxHeight - element.clientHeight + elemH);
    if (!noPaddingMaxW || !noPaddingMaxH || isWithinTolerance(noPaddingMaxW, 0) || isWithinTolerance(noPaddingMaxH, 0)) {
        return;
    }
    if (func && typeof func === 'function') {
        func.call(this, element, parent, noPaddingMaxW, noPaddingMaxH);
    } else {
        // if(getNodeName(parent) === "BODY"){//如果父级为body元素
        //     if(parent.childNodes.length <= 1){
        //         this.fillScreen(element);//则填充全屏
        //     }else{
        //         //排除其它元素高度
        //         var _otherH = 0;
        //         let children = Array.prototype.slice.call(parent.children);
        //         _.forEach(children, function(child) {
        //             if (getComputedStyle(child,'display') !== 'none' && child != element) {
        //                 var position = getComputedStyle(child, 'position');
        //                 if (position === "absolute") {
        //                     //此元素为悬浮，不算在全局填充之内
        //                 } else {
        //                     _otherH += outerHeight(elem);
        //                 }
        //             }
        //         })

        //         this.fillScreen(element,function(elem,pageW,pageH){
        //             elem.style.width = pageW + 'px';
        //             elem.style.height = pageH - _otherH + 'px';
        //         });
        //     }
        //     parent.style.overflow = "hidden";
        // }else{
        //     element.style.width = noPaddingMaxW+'px';
        //     element.style.height = noPaddingMaxH+'px';
        // }
    }
}

// 计算数组columns多表最大层级数
export const getColLeave = (arr: any[]) => {
    let maxLeave = 0;
    let fun = (arr: any[], leave: number) => {
        ++leave;
        maxLeave = Math.max(leave, maxLeave);
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item.children && item.children.length > 0) {
                fun(item.children, leave)
            }
        }
    };
    fun(arr, 0)
    return maxLeave;
}


export const getSumWidth = (start: number, end: number, cols: DefaultRecordType[]) => {
    let sumWidth = 0;
    for (let index = start; index < end; index++) {
        let currentColWidth = cols[index].width;
        sumWidth += currentColWidth;
    }
    return sumWidth;
}

export const validIndex = (totalCount: number, currentIndex: number) => {
    let cursorIndex = currentIndex || 0;
    if (currentIndex < 0) cursorIndex = 0; // 确保不小于0
    if (currentIndex > totalCount - 1) cursorIndex = totalCount - 1; // 确保不超出总数据行
    return cursorIndex;
}

/**
 * @description:
 * @param {number} totalCount: 非固定列的总列数
 * @param {number} showCount: 非规定列区域显示的列数
 * @param {number} columnsLoadBuffer: 左右缓存列数
 * @param {number} currentScrollColumnIndex: 非固定列当前指定的列下标
 * @return {*}
 */
export const computeIndex = (totalCount: number, showCount: number = 0, columnsLoadBuffer: number, currentScrollColumnIndex: number, centerColumns: DefaultRecordType[]) => {
    let screenCount = showCount + columnsLoadBuffer * 2;// 渲染的总行数
    let startIndex = 0, endIndex = 0;
    let cursorIndex = validIndex(totalCount, currentScrollColumnIndex);
    if (totalCount <= screenCount) { // 总数不足或刚好一屏
        startIndex = 0;
        endIndex = totalCount > 1 ? totalCount - 1 : 1;// 注意只有1行的场景
    } else {// 总数超过一屏
        if (cursorIndex == 0) {// 等于列数左边界
            startIndex = 0;
            endIndex = screenCount - 1;
        } else if (cursorIndex == totalCount - 1) {// 等于列数右边界
            endIndex = totalCount - 1;
            startIndex = endIndex - screenCount;
        } else {
            startIndex = cursorIndex - (columnsLoadBuffer - 1);
            if (startIndex < 0) startIndex = 0; // 注意上行有计算出为负值的情况
            endIndex = startIndex + (screenCount - 1);
        }
        if (endIndex < 0) endIndex = 0;// 确保结束位置区间不越界
        // 如果结束位置超过总记录数，则把超过的部分在开始位置往前移动
        if (endIndex > totalCount - 1) {
            startIndex = startIndex - (endIndex - (totalCount - 1));
            endIndex = totalCount - 1; // 1005
        }
        if (startIndex < 0) startIndex = 0;// 确保开始位置区间不越界

    }
    // 对于合并列特殊的截取需要特殊处理, 不能截取合并列的一半，否则会渲染异常
    // 找到特殊的合并列的columns
    let spanCols = centerColumns.filter(col => col.hasOwnProperty('colSpan'));
    if (spanCols.length) {
        let target = setColSpanTarget(centerColumns);
        if (centerColumns[startIndex].hasOwnProperty('colSpan')) {
            if (target[startIndex]) {
                startIndex = target[startIndex]
            }
        }
        if (centerColumns[endIndex].hasOwnProperty('colSpan')) {
            if (target[startIndex]) {
                endIndex = target[startIndex]
            }
        }
    }
    return {screenCount, startIndex, endIndex};
}


// 处理columns合并列的数据
export const setColSpanTarget = (columns: DefaultRecordType[]) => {
    let colTarget = {};
	    let f = false;
	    let tar = 0;
	    let next = false;
	    let len = 0;
	    columns.forEach((item: DefaultRecordType, i: number) => {
	        if (item.hasOwnProperty('colSpan')) {
	            if (!f) {
	                tar = i;
                colTarget[i] = i
	                if (item.colSpan === 0) {
	                    f = true;
	                    len = 1;
	                } else {
	                    next = true;
	                    f = true;
	                    len = item.colSpan - 1;
	                }
	            } else {
                colTarget[i] = tar
	                if (item.colSpan === 0) {
	                    if (next) {
	                        len--;
	                        if (len === 0) {
	                            next = false;
	                            f = false;
	                        }
	                    } else {
	                        len++;
	                    }
	                } else {
	                    if (len + 1 === item.colSpan) {
	                        f = false;
	                    }
	                }

	            }
	        }
	    })
    return colTarget
}

const isColumnElement = (element: JSX.Element) => {
    return element && (element.type === Column || element.type === ColumnGroup);
}

// 对于columns不存在，存在children的处理
export const normalize = (elements: JSX.Element[]) => {
    const columns:ColumnType<DefaultRecordType>[] = [];
    React.Children.forEach(elements, element => {
        if (!isColumnElement(element)) return;
        let column = {...element.props};
        let _columnType = column.columnType || columnType.DEFAULTTYPE;
        if (element.key) {
            column.key = element.key;
        }
        if (element.type === ColumnGroup) {
            column.children = normalize(column.children);
        }
        if (_columnType === columnType.ROWDRAG) { // 拖拽行
            column = {
                ...defaultDragHandleColumn,
                ...column
            }
        }
        if (_columnType === columnType.MULTISELECT) { // 多选行
            column = {
                ...defaultMulSelect,
                ...column
            }
        }
        if (_columnType === columnType.SINGLESELECT) { // 单选行
            column = {
                ...defaultSingleSelect,
                ...column
            }
        }

        if (_columnType === columnType.ROWNUM) { // 序列号
            column = {
                ...defaultRowNum,
                ...column
            }
        }

        columns.push(column);
    });
    return columns;
}

// 深拷贝对象，包括不可枚举属性
export const mergeObjectsWithNonEnumerableProps = (obj1: any, obj2: any) => {
    const descriptors1 = Object.getOwnPropertyDescriptors(obj1);
    const descriptors2 = Object.getOwnPropertyDescriptors(obj2);
    const mergedObj = Object.create(null);

    // Merge properties from obj1 and obj2 into the mergedObj
    for (let prop in descriptors1) {
        if (descriptors1.hasOwnProperty(prop)) {
            mergedObj[prop] = obj1[prop];
        }
    }

    for (let prop in descriptors2) {
        if (descriptors2.hasOwnProperty(prop)) {
            mergedObj[prop] = obj2[prop];
        }
    }

    return mergedObj;
}


export const throttle = (fn: any, delay: any, isImmediate = true) => {
    // isImmediate 为 true 时使用前缘节流，首次触发会立即执行，为 false 时使用延迟节流，首次触发不会立即执行
    let last = Date.now();
    let timeoutId: any = null;
    return function() {
        let now = Date.now();
        if (isImmediate) {
            fn.apply(this, arguments);
            isImmediate = false;
            last = now;
        }
        if (now - last >= delay) {
            fn.apply(this, arguments);
            last = now;
        } else {
            if (timeoutId) {clearTimeout(timeoutId);}
            timeoutId = setTimeout(() => {
                last = now;
                fn.apply(this, arguments);
            }, delay);
        }
    }
}


export const innerDebounce = (func: any, wait: any = 300, immediate = true) => {
    let time: any;
    let debounced = function() {
        // eslint-disable-next-line consistent-this
        let context = this
        if (time) clearTimeout(time)
        if (immediate) {
            let callNow = !time
            if (callNow) func.apply(context, arguments)
            time = setTimeout(
                ()=>{
                    time = null
                }
                , wait)
        } else {
            time = setTimeout(
                ()=>{
                    func.apply(context, arguments)
                }
                , wait)
        }
    }
    return debounced
}

// 判断两个值的误差不超过x
export const isWithinTolerance = (a: number, b: number, tolerance = 2) => {
    // 计算两个数的差值的绝对值
    const difference = Math.abs(a - b);
    return difference <= tolerance;
}

export const getTextWidth = (text: any, font: any = "14px Microsoft YaHei") => {
    const canvas = document.createElement("canvas");
    let context = canvas.getContext("2d") as any;
    context.font = font
    let textmetrics = context.measureText(text)
    return textmetrics.width;
}

const treeToList = (data: DefaultRecordType[], childrenColumnName: string = 'children') => {
    return (data || []).reduce((newData: DefaultRecordType[], record: DefaultRecordType, _index: number) => {
        newData.push(record);
        if (record[childrenColumnName] && Array.isArray(record[childrenColumnName]) && record[childrenColumnName].length) {
            newData = newData.concat(treeToList(record[childrenColumnName]))
        }
        return newData;
    }, [])
}

// 获取单列的最大宽度
export const getSingleAdaptiveWidth = (data: DefaultRecordType[] = [], column: ColumnType) => {
    let widthMap = new Map()
    let _data = data.length <= 20 ? data.slice(0) : data.slice(0, 20);
    let { dataIndex, key } = column;
    let _key = (dataIndex || key) as string;
    let newData = treeToList(_data)
    if ((_key || _key == '0') && newData.length) {
        newData.forEach((record: DefaultRecordType) => {
            if (record[_key] && typeof record[_key] === 'string') {
                let keyWidth = getTextWidth(record[_key]);
                keyWidth = keyWidth <= MINWIDTH ? MINWIDTH : keyWidth >= MAXWIDTH ? MAXWIDTH : keyWidth;
                widthMap.set(_key, (widthMap.get(key) || 0) > keyWidth ? widthMap.get(key) : keyWidth)
            }
        })
    }
    return widthMap.get(_key);
}

// export const getAdaptiveWidth = (data, columns) => {
//     // 定义一个 Map 接收每列的长度值
//     let widthMap = new Map()
//     // columns 为动态表格的表头数组 data为展示数据的数组
//     // 作用是遍历所有数据拿到长度，记下每一列的宽度
//     let _data = data.slice(0, 20) || []
//     _data.forEach(target => {
//         for (let key in target) {
//             if (target.hasOwnProperty(key)) {
//                 let keyWidth = getTextWidth(target[key])
//                 // 字段有值就放入数组
//                 widthMap.has(key) ? widthMap.set(key, widthMap.get(key).concat(keyWidth)) : widthMap.set(key, [].concat(keyWidth ? keyWidth : []))
//             }
//         }
//     })

//     // 计算平均值,保证列宽尽量保持均衡
//     for (let [mapKey] of widthMap) {
//         let valueArr = widthMap.get(mapKey)
//         let len = valueArr.length
//         let value = valueArr.reduce((acc, cur) => acc + 1 / cur, 0)
//         widthMap.set(mapKey, len / value)
//     }

//     // 遍历表头，拿到对应表头的宽度与对应表头下内容比对，取最大值作为列宽，这样可以确保表头不换行。35为表头title左右的padding + border
//     columns.map((item)=>{
//         // title，dataIndex为 ant design Table对应参数
//         let textWidth = getTextWidth(item.title)
//         console.log('textWidth', textWidth) // 97
//         if (typeof widthMap.get(item.dataIndex) === 'number' && widthMap.get(item.dataIndex) < textWidth) {
//             widthMap.set(item.dataIndex, textWidth)
//             console.log('widthMap', widthMap)
//             item.width = Math.ceil(widthMap.get(item.dataIndex)) + 35
//         }
//         // else {
//         //     widthMap.set(item.dataIndex, textWidth)
//         // }
//         // console.log(' Math.ceil(widthMap.get(item.dataIndex))', Math.ceil(widthMap.get(item.dataIndex)))
//         return item
//     })

//     return columns;
// }

export const getBordered = (bordered: boolean | string) => {
    return typeof bordered === 'boolean' ? bordered : false;
}