import {prefix} from "./updatePrefix";

const cssUtil = {
    /**
     * 从指定元素开始遍历父级节点(向上)找到匹配样式的全部节点
     * @param elem
     * @param selector  css筛选器
     * @param isFirst  是否匹配到第一个就终止
     * @return {Array}
     */
    parents: function(elem:HTMLElement, selector:string, isFirst:boolean):HTMLElement[] {
        const result:HTMLElement[] = [];
        const loopMath = function(elem:HTMLElement, selector:string) {
            let pel = elem.parentElement;
            let matchesSelector = pel ? (pel.matches || pel.webkitMatchesSelector /* || pel.mozMatchesSelector || pel.msMatchesSelector */ ) : null;
            while (pel && pel.nodeType !== 9 && (isFirst ? result.length < 1 : true)) {// 当父节点不存在或者父节点为document则表示向上遍历到了顶层节点
                if (matchesSelector && matchesSelector.call(pel, selector)) {
                    result.push(pel);
                }
                pel = pel.parentElement;
                matchesSelector = pel ? (pel.matches || pel.webkitMatchesSelector /* || pel.mozMatchesSelector || pel.msMatchesSelector */ ) : null;
            }
        };
        loopMath(elem, selector);
        return result;
    },
    /**
     * 从指定元素开始遍历父级节点(向上)找到匹配样式的第一个父节点
     * @param elem
     * @param selector  css筛选器
     * @return {Object}
     */
    parent: function(elem:HTMLElement, selector:string) {
        let result = cssUtil.parents(elem, selector, true);
        return result && result.length > 0 ? result[0] : null;
    },
    parentsUntil: function(elem:HTMLElement, selectorArr = [`.${prefix}-modal-content`, `.${prefix}-drawer-body`, `[tinper-next-role=container]`]) {
        if (!elem) return document.body;

        let container = null;
        if (Array.isArray(selectorArr)) {
            for (let i = 0; i < selectorArr.length; i++) {
                container = cssUtil.parent(elem, selectorArr[i]);
                if (container) {
                    break;
                }
            }
        } else {
            container = cssUtil.parent(elem, selectorArr);
        }
        return container || document.body;
    }
};
const parents = cssUtil.parents, parent = cssUtil.parent, parentsUntil = cssUtil.parentsUntil;
export {parents, parent, parentsUntil};
export default cssUtil;
