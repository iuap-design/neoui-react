/* 树结构数据的相关操作工具方法*/
function isObject(value: any) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}
const hasOwnProperty = Object.prototype.hasOwnProperty
function isEmpty(value: any) {
    if (value == null) {
        return true
    }
    if (Array.isArray(value)) {
        return !value.length
    }
    for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false
        }
    }
    return true
}

// 获取下一级节点个数
function getChildrenlength(children:any) {
    let len = 1;
    if (Array.isArray(children)) {
        len = children.length;
    }
    return len;
}

function getSiblingPosition(index:number, len:number, siblingPosition:{first:boolean, last:boolean}|null) {
    if (siblingPosition == null) {
        siblingPosition = {first: false, last: false}
    }
    if (len === 1) {
        siblingPosition.first = true;
        siblingPosition.last = true;
    } else {
        siblingPosition.first = index === 0;
        siblingPosition.last = index === len - 1;
    }
    return siblingPosition;
}

const TreeUtils = {
    /**
	 * 遍历树结构子集对象
	 * @param childs  {array} 需要遍历的树结构
	 * @param callback {function} 遍历时的回调函数，传递参数：
	 * {
	 *   item(当前节点)
	 *   index(同级节点之间的索引)
	 *   pos(父子节点层级和索引)
	 *   key(当前节点键值)
	 *   siblingPos(兄弟节点间的开始first与结束last标识)
	 *   parent(父节点)
	 * }
	 * @param parent {object} 当前父级节点
	 */
    loopAll: function(childs:any[], callback:Function, parent?:any) {
        const loop = (children:any[], level:string, _parent:any) => {
            const len = getChildrenlength(children);
            // forEach(children, (item: any, index: number) => {
            children.forEach((item: any, index: number) => {
                const pos = `${level}-${index}`;
                if (item) {
                    if (Array.isArray(item.children)) {
                        loop(item.children, pos, {node: item, pos});
                    }
                    callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, null), _parent);
                }
            });
        };
        loop(childs, '0', parent);
    }
    /**
	 * 查找树节点下指定节点属性值匹配的节点
	 * @param nodes {array} 子节点集合
	 * @param propName {string} 属性名
	 * @param propValue {*} 属性值
	 * @param loop{boolean} 默认：true，是否递归遍历子集合
	 * @param only{boolean} 默认：true，是否匹配到第一个就终止
	 * @param childPropName{boolean} 默认：children，子节点集合的属性名
	 */
    , findWithPropName: function(nodes:any, propName:string|Function, propValue:any, loop?:boolean, only?:boolean, childPropName?:string) {
        let _results:any[] = [];
        let _nodes:any[] = Array.isArray(nodes) ? nodes : [];
        let _childPropName = childPropName ? childPropName : 'children';
        for (let i = 0; i < _nodes.length; i++) {
            let node = _nodes[i];
            if (!isObject(node)) continue;
            let currPropValue = typeof propName == 'function' ? propName(node, i) : (node && node[propName])// 支持外部自定义返回匹配值
            let isMatch = currPropValue == propValue;
            if (isMatch) {
                _results.push(node);
                if (only == undefined || only == true) break;
            }
            if (loop != false && node[_childPropName] && node[_childPropName].length > 0) {
                let currResults = this.findWithPropName(node[_childPropName], propName, propValue, loop, only, _childPropName);
                if (currResults != null) {
                    _results = _results.concat(currResults);
                }
            }
        }
        return _results;
    }
    /**
	 * 移除树节点下指定节点属性值匹配的节点
	 * @param tree {object} 子节点集合
	 * @param propName {string} 属性名
	 * @param propValue {*} 属性值
	 * @param loop{boolean} 默认：true，是否递归遍历子集合
	 * @param childName 子集合的属性名
	 */
    , removeWithPropName: function(tree:any, propName:string, propValue:any, loop?:boolean, childName?:string) {
        if (childName == undefined)childName = "children";
        const doLoop = (data:any, propName:string, propVal:any, callback:Function) => {
            // forEach(data, (item:any, index:number, arr:any) => {
            data.forEach((item:any, index:number, arr:any) => {
                if (item && item[propName] === propVal) {
                    return callback(item, index, arr);
                }
                if (item && loop != false && Array.isArray(item[childName!])) {
                    return doLoop(item[childName!], propName, propVal, callback);
                }
            });
        };
        if (tree && propName && propValue) {
            doLoop(Array.isArray(tree) ? tree : [tree], propName, propValue, function(_item: any, index:number, arr:any) {
                arr.splice(index, 1);
            });
        }
        return tree;
    }
    /**
	 * 通过ID查找树节点
	 * @param nodes {array} 子节点集合
	 * @param idValue {*} ID属性值
	 * @param idKey {string} ID属性名
	 */
    , findById: function(nodes:any, idValue:any, idKey:string) {
        let results = this.findWithPropName(nodes, idKey || 'id', idValue, true, true);
        return results.length > 0 ? results[0] : null;
    }
    /**
	 * 删除树下对应ID的节点
	 * @param tree {object} 树结构对象
	 * @param nodeId {*} 树节点id
	 * @param idKey {string} ID属性名
	 */
    , removeById: function(tree:any, nodeId:any, idKey:string) {
        return this.removeWithPropName(tree, idKey || 'id', nodeId, true);
    }
    // 递归遍历树数据，其中参数tree为数组
    , loopTreeData: function(tree:any, callback?:(item:any, index?:any, arr?:any)=>any) {
        let that = this;
        // forEach(tree, function(item: any, index: number, arr: any[]) {
        tree.forEach(function(item: any, index: number, arr: any[]) {
            if (item && Array.isArray(item.children)) {
                that.loopTreeData(item.children, callback)
            }
            callback && callback(item, index, arr);
        });
    }
    // 依据nid查找当前节点的父节点
    , findParentNode: function(tree:any, nodeId:any) {
        if (isEmpty(tree) || !nodeId) return;
        let pNode:any = null;
        this.loopTreeData(Array.isArray(tree) ? tree : [tree], function(item:any, _index: number, _arr: any) {
            // 找到第一个父级节点就不再匹配
            if (pNode == null && item && Array.isArray(item.children)) {
                // let isParent = some(item.children, function(child: any) {
                let isParent = (item.children).some(function(child: any) {
                    return child.nid === nodeId;// 注意：匹配"nid"属性
                })
                if (isParent) pNode = item;
            }
        });
        return pNode;
    },
    /**
	 * 依据id查找当前节点的所有父节点对象
	 * @param tree 树结构数据
	 * @param nodeId 节点的id
	 * @param nodeIdKey  作为节点id的属性名，默认为"id"
	 * @return array 越接近对应节点的父级排列在最后面(即数组第一位为父级根节点)
	 */
    findAllParents: function(tree:any, nodeId:any, nodeIdKey = "id") {
        if (isEmpty(tree) || !nodeId) return [];
        let treeArr = Array.isArray(tree) ? tree : [tree];
        let positionList = [];// 所有节点位置集合
        let positionMap = {};// 所有节点位置与节点信息的关系
        let currPosition:string = '';// 当前节点位置
        // 遍历树结构获取相关坐标信息
        TreeUtils.loopAll(treeArr, (item:any, _idx: string, pos:any) => {
            positionList.push(pos);
            positionMap[pos] = item;
            if (item[nodeIdKey] === nodeId) {// 记录当前匹配节点的坐标
                currPosition = pos;
                // currPositionNode = item;
            }
        });
        let parentNodes = [];
        if (currPosition) {
            let arrayPos = currPosition.split("-");
            let parentPos = "";
            for (let i = 0; i < arrayPos.length - 1; i++) {
                parentPos = (i === 0) ? arrayPos[i] : (parentPos + "-" + arrayPos[i]);// 获取匹配节点的所有父级节点的坐标
                let parentNode = positionMap[parentPos];// 获取对应父节点的信息
                if (parentNode) parentNodes.push(parentNode);
            }
        }
        return parentNodes;
    }
}
export default TreeUtils;
