import * as React from 'react';
import {ReactElement} from "react";

const {isValidElement} = React;

function replaceElement(
    element:ReactElement,
    replacement:any,
    props:any,
) {
    if (!isValidElement(element)) return replacement;

    return React.cloneElement(
        element,
        typeof props === 'function' ? props(element.props || {}) : props,
    );
}

function cloneElement(element:ReactElement, props:any) {
    return replaceElement(element, element, props);
}

export type RenderFunction = () => React.ReactNode;

const getRenderPropValue = (propValue:any) => {
    if (!propValue) {
        return null;
    }

    const isRenderFunction = typeof propValue === 'function';
    if (isRenderFunction) {
        return propValue();
    }

    return propValue;
};
const getTransitionName = (rootPrefixCls:string, motion:string, transitionName?:string) => {
    if (transitionName !== undefined) {
        return transitionName;
    }
    return `${rootPrefixCls}-${motion}`;
};

export {
    isValidElement,
    replaceElement,
    cloneElement,
    getRenderPropValue,
    getTransitionName
}
