import * as React from 'react'
/**
     * 递归获取React元素子集的文本集合
     * @param elem
     * @param results
     * @returns {*}
    */
export function getChildrenText(elem: React.ReactNode, results?: string[]) {
    var _results = results ? results : [];
    if (!React.isValidElement(elem) && (typeof elem === 'string' || typeof elem === 'number')) {
        _results.push(elem.toString());
    } else {
        if (React.isValidElement(elem)) {// react对象则遍历children
            const children = (elem.props as any).children;
            if (Array.isArray(children)) {
                children.forEach((item: any) => {
                    getChildrenText(item, _results);
                });
            } else {
                getChildrenText(children, _results);
            }
        }
    }
    return _results;
}