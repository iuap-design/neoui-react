/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
import React from 'react';
import { TabBarRootNodeProps } from './iTabs'

export function toArray(children: React.ReactNode) {
    // allow [c,[a,b]]
    const c: any[] = [];
    React.Children.forEach(children, child => {
        if (child) {
            c.push(child);
        }
    });
    return c;
}

export function getActiveIndex(children: React.ReactNode, activeKey?: string) {
    const c = toArray(children);
    for (let i = 0; i < c.length; i++) {
        if (c[i].key === activeKey) {
            return i;
        }
    }
    return -1;
}

export function getActiveKey(children: React.ReactNode, index: number) {
    const c = toArray(children);
    return c[index].key;
}

export function setTransform(style: React.CSSProperties, v?: string) {
    style.transform = v;
    style.WebkitTransform = v;
    // @ts-ignore
    style.mozTransform = v;
}

export function isTransformSupported(style: React.CSSProperties) {
    return 'transform' in style ||
		'webkitTransform' in style ||
		'MozTransform' in style;
}

export function setTransition(style: React.CSSProperties, v: string) {
    style.transition = v;
    style.WebkitTransition = v;
    style.MozTransition = v;
}

export function getTransformPropValue(v: string) {
    return {
        transform: v,
        WebkitTransform: v,
        MozTransform: v,
    };
}

export function isVertical(tabBarPosition?: string) {
    return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getTransformByIndex(index: number, tabBarPosition: string) {
    const translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
    return `${translate}(${-index * 100}%) translateZ(0)`;
}

export function getMarginStyle(index: number, tabBarPosition: string) {
    const marginDirection = isVertical(tabBarPosition) ? 'marginTop' : 'marginLeft';
    return {
        [marginDirection]: `${-index * 100}%`,
    };
}

export function getStyle(el: HTMLElement, property: string) {
    return +getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

export function setPxStyle(el: HTMLElement, property: string, value: number) {
    el.style[property] = `${value}px`;
}

function toNum(style: any, property: string) {
    return +style.getPropertyValue(property).replace('px', '');
}

function getTypeValue(start: string, current: string, end: string, tabNode: HTMLElement, wrapperNode: HTMLElement) {
    let total = getStyle(wrapperNode, `padding-${start}`);
    if (!tabNode || !tabNode.parentNode) {
        return total;
    }

    const {childNodes} = tabNode.parentNode;
    Array.prototype.some.call(childNodes, (node) => {
        const style = window.getComputedStyle(node);
        if (node !== tabNode) {
            total += toNum(style, `margin-${start}`);
            if (current === 'offsetWidth') { // offsetWidth获取的值为四舍五入的整数，和实际宽度存在偏差
                total += parseFloat(node.getBoundingClientRect().width.toFixed(2));
            } else {
                total += parseFloat(node.getBoundingClientRect().height.toFixed(2));
            }
            // total += node[current];
            total += toNum(style, `margin-${end}`);

            if (style.boxSizing === 'content-box') {
                total += toNum(style, `border-${start}-width`) + toNum(style, `border-${end}-width`);
            }
            return false;
        }

        // We need count current node margin
        // ref: https://github.com/react-component/tabs/pull/139#issuecomment-431005262
        total += toNum(style, `margin-${start}`);

        return true;
    });

    return total;
}

export function getLeft(tabNode: HTMLElement, wrapperNode: HTMLElement) {
    return getTypeValue('left', 'offsetWidth', 'right', tabNode, wrapperNode);
}

export function getTop(tabNode: HTMLElement, wrapperNode: HTMLElement) {
    return getTypeValue('top', 'offsetHeight', 'bottom', tabNode, wrapperNode);
}

export function getDataAttr(props: Omit<TabBarRootNodeProps, 'onKeyDown' | 'extraContent' | 'tabBarPosition' | 'children' | 'direction' | 'tabBarClassName'>) {
    return Object.keys(props).reduce((prev, key) => {
        if (key.slice(0, 5) === 'aria-' || key.slice(0, 5) === 'data-' || key === 'role') {
            prev[key] = props[key];
        }
        return prev;
    }, {});
}

export function requestAnimationFrame(callback: () => void) {
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(callback)
    } else {
        window.setTimeout(callback, 1000 / 60);
    }
}
