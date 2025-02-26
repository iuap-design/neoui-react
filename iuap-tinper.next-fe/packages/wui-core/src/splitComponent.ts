/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import {ComponentClass} from "react";

function _objectEntries(obj:any) {
    let entries = [];
    let keys = Object.keys(obj);

    for (let k = 0; k < keys.length; ++k) entries.push([keys[k], obj[keys[k]]]);

    return entries;
}

/**
 * 分割要传入父元素和子元素的props
 * @param  {[object]} props     传入的属性
 * @param  {[reactElement]} Component 组件
 * @return {[array]}           返回数组，第一个元素为父元素props对象，第二个子元素props对象
 */
export default function splitComponentProps(props:any, Component:ComponentClass) {
    const componentPropTypes:any = Component.propTypes;

    const parentProps:any = {};
    const childProps:any = {};

    _objectEntries(props).forEach(([propName, propValue]) => {
        if (componentPropTypes[propName]) {
            parentProps[propName] = propValue;
        } else {
            childProps[propName] = propValue;
        }
    });

    return [parentProps, childProps];
}
