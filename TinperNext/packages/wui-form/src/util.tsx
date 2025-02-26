import * as React from 'react';

export function toArray(candidate: any) {
    if (candidate === undefined || candidate === false) return [];
    return Array.isArray(candidate) ? candidate : [candidate];
}

export function getFieldId(namePath: Array<string|number>, formName?: string) {
    if (!namePath.length) return undefined;

    const mergedId = namePath.join('_');
    return formName ? `${formName}_${mergedId}` : mergedId;
}

export const {isValidElement} = React;

// type AnyObject = Record<any, any>;

// type RenderProps = undefined | AnyObject | ((originProps: AnyObject) => AnyObject | undefined);

export function replaceElement(element: React.ReactElement, replacement: React.ReactElement, props: any) {
    if (!isValidElement(element)) return replacement;

    return React.cloneElement(element, typeof props === 'function' ? props(element.props || {}) : props);
}

export function cloneElement(element: React.ReactElement, props: any) {
    return replaceElement(element, element, props);
}

export function useForceUpdate() {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    return forceUpdate;
}
