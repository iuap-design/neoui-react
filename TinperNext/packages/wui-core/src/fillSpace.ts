import { IEVersion } from './formatUtils';
type ElementAndIE = HTMLElement&Partial<{currentStyle:any}>;

// 获取元素的计算样式
const getTheStyle = (ele:ElementAndIE, rule:string) => {
    if (ele.currentStyle && IEVersion() !== 11) { // 仅ie和opera支持
        return ele.currentStyle[rule]
    }
    return window.getComputedStyle(ele).getPropertyValue(rule);
}
// 获取原素的外部高度包括 padding，border，margin，及内容高度
const outerHeight = (ele:ElementAndIE) => {
    let height = ele.offsetHeight;
    const style = ele.currentStyle || getComputedStyle(ele);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}
// 获取元素的标签名称
const getNodeName = (ele:ElementAndIE) => {
    return ele?.nodeName.toUpperCase()
}

/**
 * @desc 填充全屏
 * @param element - 需要填充全屏的DOM元素
 * @param func - 自定义填充
 * 	传递参数：elem - 当前元素		pageW - 页面宽度	pageH - 页面高度
 */
const fillScreen = (elem:HTMLElement, func?:Function) => {
    let pageW = window.innerWidth, pageH = window.innerHeight;
    if (typeof pageW !== 'number' || typeof pageH !== 'number') {
        if (document.compatMode == "CSS1Compat") {// 是否处于标准模式
            pageW = document.documentElement.clientWidth;
            pageH = document.documentElement.clientHeight;
        } else {
            pageW = document.body.clientWidth;
            pageH = document.body.clientHeight;
        }
    }
    if (typeof func == 'function') {
        func!.call(this, elem, pageW, pageH);
    } else {
        elem.style.width = pageW + 'px';
        elem.style.height = pageH + 'px';
    }
};
/**
 * @desc 填充空白
 * @param elem 需要填充的元素
 * @param target 填充参考的父容器元素
 * @param func 自处理填充
 * 传递参数：
 * 	element - 当前元素
 * 	parent	 - 目标元素
 * 	maxWidth - 预计最大宽度
 * 	maxHeight - 预计最大高度
 */
const fillSpace = (element: HTMLElement, target: HTMLElement | undefined, func: (this:any, element: HTMLElement, parent: HTMLElement, noPaddingMaxW: number, noPaddingMaxH: number) => void) => {
    let parent:any = null;
    let isParent = false;
    if (target) {
        parent = target;
        isParent = false;
    } else {
        parent = element.parentNode;
        isParent = true;
    }
    let maxHeight:number, maxWidth:number;
    // 如果为form元素则取其父级
    if (getNodeName(parent) === 'FORM') {
        parent = parent.parentNode;
    }
    // 如果父级是body则认为是全屏
    if (getNodeName(parent) === 'BODY') {
        parent.style.overflow = "hidden";
    } else {
        parent.style.overflow = "visible";
    }

    maxHeight = parent.clientHeight + element.clientHeight;
    maxWidth = parent.clientWidth;
    // 排除当前元素可见的兄弟节点高度
    const siblings = Array.prototype.slice.call(element.parentNode?.children);
    (siblings || []).forEach((sibling:HTMLElement) => {
        if (getTheStyle(sibling, 'display') !== 'none') {
            const position = getTheStyle(sibling, 'position');
            if (position === "absolute" || position === "fixed") {
                return;
            }
            maxHeight -= outerHeight(sibling);
        }
    })
    // 如果当前元素不属于目标元素的一级子集
    if (!isParent) {
        // 排除目标元素中除当前元素父元素以外的其它元素高度
        let children = Array.prototype.slice.call(parent.children);
        (children || []).forEach((child:HTMLElement) => {
            maxHeight -= outerHeight(child);
        })
    }

    // 注意：排除padding的尺寸
    const elemW = parseInt(getTheStyle(element, 'width'));
    const elemH = parseInt(getTheStyle(element, 'height'));
    const noPaddingMaxW = Math.max(0, maxWidth - element.clientWidth + elemW);
    const noPaddingMaxH = Math.max(0, maxHeight - element.clientHeight + elemH);
    if (typeof func == 'function') {
        func.call(this, element, parent, noPaddingMaxW, noPaddingMaxH);
    } else {
        if (getNodeName(parent) === "BODY") {// 如果父级为body元素
            if (parent.childNodes.length <= 1) {
                fillScreen(element);// 则填充全屏
            } else {
                // 排除其它元素高度
                let _otherH = 0;
                let children = Array.prototype.slice.call(parent.children);
                (children || []).forEach((child:HTMLElement) => {
                    if (getTheStyle(child, 'display') !== 'none' && child != element) {
                        const position = getTheStyle(child, 'position');
                        if (position === "absolute") {
                            // 此元素为悬浮，不算在全局填充之内
                        } else {
                            _otherH += outerHeight(child);
                        }
                    }
                })

                fillScreen(element, (elem:HTMLElement, pageW:number, pageH:number) => {
                    elem.style.width = pageW + 'px';
                    elem.style.height = pageH - _otherH + 'px';
                });
            }
            parent.style.overflow = "hidden";
        } else {
            element.style.width = noPaddingMaxW + 'px';
            element.style.height = noPaddingMaxH + 'px';
        }
    }
}
export default fillSpace;
