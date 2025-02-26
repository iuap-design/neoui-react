import React from 'react';

const isSingleNode = (child: React.ReactNode) => {
    let type = typeof child;
    return type === 'string' || type === 'number';
};

// merged所有文本信息
export function mergedToString(children: any): string {
    const mergedResult = [''];
    React.Children.forEach(children, (child) => {
        const prevIndex = mergedResult.length - 1;
        const prevChild = mergedResult[prevIndex];

        if (isSingleNode(child) && isSingleNode(prevChild)) {
            mergedResult[prevIndex] = `${prevChild}${child}`;
        } else if (child && child.props && child.props.children) {
            mergedResult.push(mergedToString(child.props.children));
        }
    });

    return mergedResult.join('');
}

const target = typeof window === 'undefined' ? global : window;
let raf: any = (target as unknown as Window).requestAnimationFrame; // eslint-disable-line
let caf: any = (target as unknown as Window).cancelAnimationFrame; // eslint-disable-line
export function throttleByRaf(cb: (...args: any[]) => void) {
    let timer: null | number = null;

    const throttle = function(...args: any[]) {
        timer && caf(timer);
        timer = raf(() => {
            cb(...args);
            timer = null;
        });
    };

    throttle.cancel = () => {
        caf(timer);
        timer = null;
    };

    return throttle;
}

const opt = Object.prototype.toString;
export function isObject(obj: any): obj is { [key: string]: any } {
    return opt.call(obj) === '[object Object]';
}