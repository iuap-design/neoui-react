/* eslint no-loop-func: 0*/

import React from 'react';
import omit from 'omit.js';
import { SibilingPosition, CheckedNodeInfo, LevelObj, FlatTreeData, TreeNodesStates,
    ConvertListAttrs, FlatTreeKeysMap, TreeNodesStatesItem, TreeData, TreeProps } from './iTree'

export function browser(navigator: Navigator) {
    let tem;
    const ua = navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = ua.match(/version\/(\d+)/i);
    if (tem) {
        M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
}

// export function getOffset(el) {
//   const obj = el.getBoundingClientRect();
//   return {
//     left: obj.left + document.body.scrollLeft,
//     top: obj.top + document.body.scrollTop,
//     width: obj.width,
//     height: obj.height
//   };
// }

// // iscroll offset
// offset = function (el) {
//   var left = -el.offsetLeft,
//     top = -el.offsetTop;

//   // jshint -W084
//   while (el = el.offsetParent) {
//     left -= el.offsetLeft;
//     top -= el.offsetTop;
//   }
//   // jshint +W084

//   return {
//     left: left,
//     top: top
//   };
// }

/* eslint-disable */
export function getOffset(ele: HTMLElement) {
	let doc, win, docElem, rect;

	if (!ele.getClientRects().length) {
		return {top: 0, left: 0};
	}

	rect = ele.getBoundingClientRect();

	if (rect.width || rect.height) {
		doc = ele.ownerDocument;
		win = doc.defaultView;
		docElem = doc.documentElement;

		return {
			top: rect.top + (win ? win.pageYOffset : 0) - docElem.clientTop,
			left: rect.left + (win ? win.pageXOffset : 0) - docElem.clientLeft
		};
	}

	return rect;
}

/* eslint-enable */

function getChildrenlength(children: React.ReactElement[] | TreeData[]) {
    let len = 1;
    if (Array.isArray(children)) {
        len = children.length;
    }
    return len;
}

function getSiblingPosition(index: number, len: number, siblingPosition: SibilingPosition) {
    if (len === 1) {
        siblingPosition.first = true;
        siblingPosition.last = true;
    } else {
        siblingPosition.first = index === 0;
        siblingPosition.last = index === len - 1;
    }
    return siblingPosition;
}

export function loopAllChildren(childs: React.ReactElement[], callback: Function, parent?: CheckedNodeInfo, baseNum?: number | string) {
    baseNum === undefined && (baseNum = 0)
    const loop = (children: React.ReactElement[], level: string | number, _parent?: CheckedNodeInfo, baseNum?: number | string) => {
        const len = getChildrenlength(children);
        React.Children.forEach(children, (item: React.ReactElement, index) => {
            if (item) {
                const pos = `${level}-${index + (typeof baseNum === 'string' ? parseInt((baseNum as string)) : baseNum as number)}`;
                callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}), _parent);
                if (item.props.children && item.type && (item.type as any).isTreeNode) {
                    loop(item.props.children, pos, {node: item, pos}, 0);
                }
            }
        });
    };
    loop(childs, 0, parent, baseNum);
}

export function isInclude(smallArray: string[], bigArray: string[]) {
    return smallArray.every((ii, i) => {
        return ii === bigArray[i];
    });
}

// console.log(isInclude(['0', '1'], ['0', '10', '1']));


// arr.length === 628, use time: ~20ms
export function filterParentPosition(arr: string[]) {
    const levelObj: LevelObj = {};
    arr.forEach((item) => {
        const posLen = item.split('-').length;
        if (!levelObj[posLen]) {
            levelObj[posLen] = [];
        }
        levelObj[posLen].push(item);
    });

    const levelArr: string[] = Object.keys(levelObj).sort((a, b):any => +a > +b);
    for (let i = 0; i < levelArr.length; i++) {
        if (levelArr[i + 1]) {
            levelObj[levelArr[i]].forEach((ii: string) => {
                for (let j = i + 1; j < levelArr.length; j++) {
                    levelObj[levelArr[j]].forEach((_i: string, index) => {
                        if (isInclude(ii.split('-'), _i.split('-'))) {
                            levelObj[levelArr[j]][index] = null;
                        }
                    });
                    levelObj[levelArr[j]] = levelObj[levelArr[j]].filter(p => p);
                }
            });
        }
    }
    let nArr: string[] = [];
    levelArr.forEach(i => {
        nArr = nArr.concat(levelObj[i] as string[]);
    });
    return nArr;
}

// console.log(filterParentPosition(
//   ['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']
// ));


function stripTail(str: string) {
    const arr = str.match(/(.+)(-[^-]+)$/);
    let st = '';
    if (arr && arr.length === 3) {
        st = arr[1];
    }
    return st;
}

function splitPosition(pos: string) {
    return pos.split('-');
}
const setChildCheckes = (_pos: string, obj: TreeNodesStates, checkIt: boolean, deep: boolean) => {
    if (obj[`${_pos}-0`]) {
        const array = Object.keys(obj);
        // 此处仅仅 使用index  array 理论不超过 所有的tree节点之和 使用 break 提前中断  性能大幅提高
        for (let index = 0; index < array.length; index++) {
            const childItem = obj[`${_pos}-${index}`];
            const flag = deep ? childItem : childItem && childItem.checked !== checkIt;
            if (flag) {
                childItem.halfChecked = false;
                childItem.checked = checkIt;
                setChildCheckes(`${_pos}-${index}`, obj, checkIt, deep)
            } else if (!childItem) {
                break
            }
        }
    }
}
export function handleCheckState(obj: TreeNodesStates, checkedPositionArr: string[], checkIt: boolean, oldTreeKeysArr: string[]) {
    let deep = false;
    // 如果 数据量 小于 3000 条 直接深度 变量 不会损害很多性能 ，超过3000条时候 需要比较和 老的数据对比 新数据是否 有新增情况（动态加载）
    if (oldTreeKeysArr.length && (Object.keys(obj).length < 3000 || Object.keys(obj).length !== oldTreeKeysArr.length)) {
        deep = true;
    }
    let objKeys: (string | null)[] = Object.keys(obj);
    checkedPositionArr.forEach((_pos) => {
        setChildCheckes(_pos, obj, checkIt, deep);
    });

    // TODO: 循环 2470000 次耗时约 1400 ms。 性能瓶颈！
    objKeys = objKeys.filter(i => i); // filter non null;

    for (let pIndex = 0; pIndex < checkedPositionArr.length; pIndex++) {
        // 循环设置父节点的 选中 或 半选状态
        const loop = (__pos: string) => {
            const _posLen = splitPosition(__pos).length;
            if (_posLen <= 2) { // e.g. '0-0', '0-1'
                return;
            }
            let sibling = 0;
            let siblingChecked = 0;
            const parentPosition = stripTail(__pos);
            objKeys.forEach((i: string /* , index*/) => {
                const iArr = splitPosition(i);
                if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
                    sibling++;
                    if (obj[i].checked) {
                        siblingChecked++;
                        const _i = checkedPositionArr.indexOf(i);
                        if (_i > -1) {
                            checkedPositionArr.splice(_i, 1);
                            if (_i <= pIndex) {
                                pIndex--;
                            }
                        }
                    } else if (obj[i].halfChecked) {
                        siblingChecked += 0.5;
                    }
                    // objKeys[index] = null;
                }
            });
            // objKeys = objKeys.filter(i => i); // filter non null;
            const parent = obj[parentPosition];
            // sibling 不会等于0
            // 全不选 - 全选 - 半选
            if (parent) {
                if (siblingChecked === 0) {
                    parent.checked = false;
                    parent.halfChecked = false;
                } else if (siblingChecked === sibling) {
                    parent.checked = true;
                    parent.halfChecked = false;
                } else {
                    parent.halfChecked = true;
                    parent.checked = false;
                }
            }
            loop(parentPosition);
        };

        loop(checkedPositionArr[pIndex]);
    }
}

export function getCheck(treeNodesStates: TreeNodesStates) {
    const halfCheckedKeys: string[] = [];
    const checkedKeys: string[] = [];
    const checkedChildrenKeys: string[] = [];
    const checkedNodes: React.ReactElement[] = [];
    const checkedNodesPositions: CheckedNodeInfo[] = [];
    Object.keys(treeNodesStates).forEach((item) => {
        const itemObj: TreeNodesStatesItem = treeNodesStates[item];
        if (itemObj.checked) {
            checkedKeys.push(itemObj.key as string); // 调用这个方法传的treeNodesStates都是带有所有key的
            checkedNodes.push(itemObj.node);
            checkedNodesPositions.push({node: itemObj.node, pos: item});
            if (!itemObj.node.props?.children || !itemObj.node.props?.children?.length) {
                checkedChildrenKeys.push(itemObj.key as string)
            }

        } else if (itemObj.halfChecked) {
            halfCheckedKeys.push(itemObj.key as string);
        }
    });
    return {
        halfCheckedKeys, checkedKeys, checkedNodes, checkedNodesPositions, treeNodesStates, checkedChildrenKeys
    };
}

export function getStrictlyValue(checkedKeys: string[], halfChecked: string[]) {
    if (halfChecked) {
        return {checked: checkedKeys, halfChecked};
    }
    return checkedKeys;
}

export function arraysEqual(a: string[], b: string[]) { // 树组件里用于比较字符串keys数组
    if (a === b) return true;
    if (a === null || typeof a === 'undefined' || b === null || typeof b === 'undefined') {
        return false;
    }
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


export function closest(el: any, selector: string) { // TODO: ts define type
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
}

export function isTreeNode(node: React.ReactElement) {
    return node && node.type && (node.type as any).isTreeNode;
}

/**
	 * @description 计算懒加载时的前置占位和后置占位
	 * @param start {Number} 开始截取数据的位置
	 * @param end {Number} 结束截取数据的位置
     * @param rowHeight {Number} 每行的高度
	 * @return sumHeight {Number} 空白占位的高度
	 */
export const getSumHeight = (start: number, end: number, rowHeight: number) => {
    let sumHeight = 0;
    if (start > end) {
        return sumHeight;
    }
    let span = Math.abs(end - start);
    if (span) {
        sumHeight = span * rowHeight;
    }
    return sumHeight;
}

export function toArray(children: React.ReactElement[]) {
    const ret: React.ReactElement[] = [];
    React.Children.forEach(children, (c) => {
        ret.push(c);
    });
    return ret;
}

export function getNodeChildren(children: React.ReactElement[]) {
    return toArray(children).filter(isTreeNode);
}

let onlyTreeNodeWarned = false;

export function warnOnlyTreeNode() {
    if (onlyTreeNodeWarned) return;
    onlyTreeNodeWarned = true;
}

/**
 * 将一维数组转换为树结构
 * @param {*} treeData  扁平结构的 List 数组
 * @param {*} attr 属性配置设置
 * @param {*} flatTreeKeysMap 存储所有 key-value 的映射，方便获取各节点信息
 */
export function convertListToTree(treeData: FlatTreeData[], attr: ConvertListAttrs, flatTreeKeysMap: FlatTreeKeysMap) {
    let run = (_treeArrs: TreeData[]) => {}
    let tree: TreeData[] = []; // 存储所有一级节点
    let resData = treeData, // resData 存储截取的节点 + 父节点（除一级节点外）
        resKeysMap: FlatTreeKeysMap = {}, // resData 的Map映射
        treeKeysMap: FlatTreeKeysMap = {}; // tree 的Map映射
    resData.map((element) => {
        let key = attr.id;
        resKeysMap[element[key]] = element;
    });
    // 查找父节点，为了补充不完整的数据结构
    let findParentNode = (node: FlatTreeData) => {
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
                let {key, title, isLeaf, ...otherProps} = node;
                let obj: FlatTreeData = {
                    key,
                    title,
                    isLeaf
                    // children: []
                }
                if (!obj.isLeaf) {
                    // obj.children = [];
                    obj[attr.children] = [];
                }
                tree.push(Object.assign(obj, {...omit(otherProps, [attr.children])}) as TreeData);
                treeKeysMap[key as string] = node;
            }
        }
    }
    // 遍历 resData ，找到所有的一级节点
    for (let i = 0; i < resData.length; i++) {
        let item = resData[i];
        if (item[attr.parendId] === attr.rootId && !treeKeysMap.hasOwnProperty(item[attr.id])) { // 如果是根节点，就存放进 tree 对象中
            let {key, ...otherProps} = item;
            let obj: FlatTreeData = {
                key: item[attr.id],
                title: item[attr.name],
                isLeaf: item[attr.isLeaf]
            };
            if (!obj.isLeaf) {
                // obj.children = []
                obj[attr.children] = [];
            }
            tree.push(Object.assign(obj, {...omit(otherProps, ["title", attr.children])}) as TreeData);
            treeKeysMap[key as string] = item;
            resData.splice(i, 1);
            i--;
        } else { // 递归查找根节点信息
            findParentNode(item);
        }
    }
    // console.log('resData',resKeysMap);
    run = function(treeArrs = []) {
        if (resData.length < 1) {
            return;
        }
        for (let i = 0; i < treeArrs.length; i++) {
            for (let j = 0; j < resData.length; j++) {
                let item = resData[j];
                if (treeArrs[i].key === item[attr.parendId]) {
                    let {...otherProps} = item;
                    let obj: FlatTreeData = {
                        key: item[attr.id],
                        title: item[attr.name],
                        isLeaf: item[attr.isLeaf]
                        // children: []
                    };
                    if (!obj.isLeaf) {
                        obj[attr.children] = [];
                    }
                    treeArrs[i][attr.children].push(Object.assign(obj, {...omit(otherProps, ["key", "title", attr.children])} as TreeData));
                    resData.splice(j, 1);
                    j--;
                }
            }
            run(treeArrs[i][attr.children]!);
        }
    };
    run(tree);
    return tree;
}

export const isLazyLoad = (treeData?: TreeData[], fieldNames: TreeProps['fieldNames'] = {}) => {
    if (!treeData) {
        return false
    }
    const children = fieldNames.children || 'children';
    let len = 0;
    const calcLength = (treeData: TreeData[], childrenField: string,) => {
        for (const data of treeData) {
            if (len >= 500) {
                break;
            }
            len = len + 1;
            if (data[childrenField]?.length && len < 200) {
                calcLength(data[childrenField], childrenField)
            }
        }
    }
    calcLength(treeData, children)
    return len >= 500
}
// /**
//  * 函数节流
//  * @param {*} func 延时调用函数
//  * @param {*} wait 延迟多长时间
//  * @return Function 延迟执行的方法
//  */
// export const throttle = (fn: Function, wait: number) => {
//     let last:number;
//     const that = this
//     return function() {
//         // const args: any = arguments
//         let now = Date.now();
//         if (!last) {
//             fn.apply(that, arguments);
//             last = now;
//             return;
//         }
//         if (now - last >= wait) {
//             fn.apply(that, arguments);
//             last = now;
//         }
//     }
// }

/**
 * 根据关键字过滤树节点, 可以通过 optionFilterProp 指定过滤属性 默认为title
 * treedata: 原始树节点数据
 * keeyword: 过滤关键字 默认过滤title
 * */

export const filterTreeData = (treeData: TreeData[], keyword: string, props: TreeProps) => {
    if (!keyword) {
        return treeData;
    }
    const { fieldNames, optionFilterProp = "title" } = props;
    const filteredTreeData: TreeData[] = [];
    treeData.forEach((item: FlatTreeData) => {
        let cloneItem: FlatTreeData = {...item};
        let children = fieldNames?.children ? cloneItem[fieldNames?.children] : cloneItem?.children;
        cloneItem.title = fieldNames?.title ? cloneItem[fieldNames?.title] : cloneItem?.title;
	    cloneItem.key = (fieldNames?.key ? cloneItem[fieldNames?.key] : cloneItem?.key) + "";
	    cloneItem.children = children && children.length > 0 ? filterTreeData(children, keyword, props) : null;

        // 自己包含特殊字符或者children包含特殊字符
        if (cloneItem[optionFilterProp]?.indexOf(keyword) > -1 || cloneItem.children?.length > 0) {
            filteredTreeData.push(cloneItem);
        }
    })

    return filteredTreeData;

}
