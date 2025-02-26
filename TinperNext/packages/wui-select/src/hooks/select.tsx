import React, {useState, useCallback} from 'react';
import Resizable from 're-resizable';
import classNames from 'classnames';
import {BaseSelectRef} from 'rc-select';
import { SelectProps } from '../iSelect';

export interface SelectResizeProps extends Pick<SelectProps, 'listHeight' | 'getPopupContainer' | 'dropdownRender' | 'onResizeStart' | 'onResize' | 'onResizeStop'>{
    clsPrefix: string;
    selectRef: React.RefObject<BaseSelectRef>;
    resizable: 'vertical' | 'horizontal' | boolean
}

interface EnableProps {
    bottom?: boolean,
    top?: boolean,
    left?: boolean,
    right?: boolean,
    bottomLeft?: boolean,
    topLeft?: boolean,
    topRight?: boolean,
    bottomRight?: boolean
}

const parentsHaveClass = (element: HTMLElement, className: string): boolean => {
    const parent = element.parentElement as HTMLElement;
    if (parent.nodeName === 'BODY') {
        return false
    }
    if (parent.classList.contains(className)) {
        return true
    }
    return parentsHaveClass(parent, className)
}

// 仅纵向或者仅横向拖拽
const getResizeBoxEnable = (oldEnable: EnableProps, resizable: boolean | 'vertical' | 'horizontal') =>{
    let {top = false, left = false, bottom = false, right = false} = oldEnable;
    // 返回两项，其中有一项没传默认为false
    if (resizable === "vertical") {
        return { bottom, top };
    }
    if (resizable === "horizontal") {
        return { left, right };
    }
    return oldEnable
}

export const useResizeDropdownRender = (props: SelectResizeProps) => {
    const {clsPrefix, selectRef, resizable, getPopupContainer, dropdownRender, onResizeStart, onResize, onResizeStop} = props;
    const [resizeStates, setResizeStates] = useState((): {
        minWidth: number,
        maxHeight: number,
        maxWidth: number,
        resizeClass: undefined | string,
        enable: undefined | EnableProps,
    } => ({
        minWidth: 0,
        maxHeight: window.innerHeight,
        maxWidth: window.innerWidth,
        resizeClass: undefined,
        enable: undefined,
    }))
    const onMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
        let minWidth, maxHeight, maxWidth, resizeClass, enable;
        const resizebox = e.currentTarget as HTMLElement;
        const rootNode = selectRef.current?.getSelectDOMNode() as HTMLElement; // seelct输入框
        const {bottom, top, left, right} = resizebox.getBoundingClientRect();
        const boundsRect = typeof getPopupContainer === 'function' && getPopupContainer(null)?.getBoundingClientRect();
        minWidth = rootNode.offsetWidth;
        if (parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-bottomRight`)) {
            maxWidth = boundsRect ? right - boundsRect.left : right;
            maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
            enable = { bottom: true, left: true, bottomLeft: true};
            resizeClass = 'resizable-bottomLeft';
        } else if (parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-topRight`)) {
            maxWidth = boundsRect ? right - boundsRect.left : right;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            enable = { top: true, left: true, topLeft: true};
            resizeClass = 'resizable-topLeft';
        } else if (parentsHaveClass(resizebox, `${clsPrefix}-dropdown-placement-topLeft`)) {
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? bottom - boundsRect.top : bottom;
            enable = { top: true, right: true, topRight: true};
            resizeClass = 'resizable-topRight';
        } else { // 默认下拉框位置是bottomLeft
            maxWidth = maxHeight = boundsRect ? boundsRect.right - left : window.innerWidth - left;
            maxHeight = boundsRect ? boundsRect.bottom - top : window.innerHeight - top;
            enable = { bottom: true, right: true, bottomRight: true};
            resizeClass = 'resizable-bottomRight';
        }
        // 仅纵向、横向拖拽
        if (resizable === 'vertical' || resizable === "horizontal") {
            enable = getResizeBoxEnable(enable, resizable)
        }
        maxHeight -= 8; // 减去dropdown的padding
        setResizeStates({minWidth, maxHeight, maxWidth, resizeClass, enable});
    }, [clsPrefix, selectRef.current, getPopupContainer]);
    return useCallback((node: React.ReactElement) => {
        let {minWidth, enable, resizeClass, maxWidth, maxHeight} = resizeStates;
        return <Resizable
            className={classNames([`${clsPrefix}-resizebox`], resizeClass)}
            handleClasses={{
                top: `${clsPrefix}-resizebox-handle-top`,
                right: `${clsPrefix}-resizebox-handle-right`,
                bottom: `${clsPrefix}-resizebox-handle-bottom`,
                left: `${clsPrefix}-resizebox-handle-left`,
            }}
            // minHeight={listHeight || 200}
            minWidth={minWidth}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            enable={enable}
            onResize={onResize}
            onResizeStart={onResizeStart}
            onResizeStop={onResizeStop}
            onMouseEnter={onMouseEnter}
            onMouseDown={(e) => e.preventDefault() }
            handleWrapperClass={'resize-handle'}
        >
            {typeof dropdownRender === "function" ? dropdownRender(node) : node}
        </Resizable>
    }, [resizeStates, clsPrefix, onResize, onResizeStart, onResizeStop, onMouseEnter, dropdownRender]);
}
