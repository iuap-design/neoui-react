/**
 * This source code is quoted from rc-animate.
 * homepage: https://github.com/react-component/animate
 */
import React, { ReactElement } from 'react';
import { Key } from '../../wui-core/src/iCore';

export function toArrayChildren(children: ReactElement) {
    const ret: ReactElement[] = [];
    React.Children.forEach(children, (child) => {
        ret.push(child);
    });
    return ret;
}

export function findChildInChildrenByKey(children: ReactElement[], key: Key | null) {
    let ret: any = null;
    if (children) {
        children.forEach((child) => {
            if (ret) {
                return;
            }
            if (child && child.key === key) {
                ret = child;
            }
        });
    }
    return ret;
}

export function findShownChildInChildrenByKey(children: ReactElement[], key: Key | null, showProp: string) {
    let ret: any = null;
    if (children) {
        children.forEach((child) => {
            if (child && child.key === key && child.props[showProp]) {
                if (ret) {
                    throw new Error('two child with same key for <rc-animate> children');
                }
                ret = child;
            }
        });
    }
    return ret;
}

export function findHiddenChildInChildrenByKey(children: ReactElement[], key: Key | null, showProp: string) {
    let found: number | boolean = 0;
    if (children) {
        children.forEach((child) => {
            if (found) {
                return;
            }
            found = child && child.key === key && !child.props[showProp];
        });
    }
    return found;
}

export function isSameChildren(c1: ReactElement[], c2: ReactElement[], showProp?: string) {
    let same = c1.length === c2.length;
    if (same) {
        c1.forEach((child, index) => {
            const child2 = c2[index];
            if (child && child2) {
                if ((child && !child2) || (!child && child2)) {
                    same = false;
                } else if (child.key !== child2.key) {
                    same = false;
                } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
                    same = false;
                }
            }
        });
    }
    return same;
}

export function mergeChildren(prev: ReactElement[], next: ReactElement[]) {
    let ret: any = [];

    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    const nextChildrenPending = {};
    let pendingChildren: ReactElement[] = [];
    prev.forEach((child) => {
        if (child && findChildInChildrenByKey(next, child.key as Key)) {
            if (pendingChildren.length) {
                nextChildrenPending[child.key as Key] = pendingChildren;
                pendingChildren = [];
            }
        } else {
            pendingChildren.push(child);
        }
    });

    next.forEach((child) => {
        if (child && nextChildrenPending && nextChildrenPending.hasOwnProperty(child.key as Key)) {
            ret = ret.concat(nextChildrenPending[child.key as Key]);
        }
        ret.push(child);
    });

    ret = ret.concat(pendingChildren);

    return ret;
}
