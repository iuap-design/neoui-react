/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
import React from 'react';
import {findDOMNode} from 'react-dom';
import keyCode from '../../wui-core/src/keyCode';
import type {GenericSliderProps} from './iSlider'

type EventType = React.TouchEvent | React.MouseEvent | React.KeyboardEvent | React.FocusEvent;

export function isEventFromHandle(e: EventType, handles: {[key: string]: HTMLDivElement}) {
    return Object.keys(handles)
        .some(key => e.target === findDOMNode(handles[key]));
}

export function isValueOutOfRange(value: number, {min, max}: Pick<GenericSliderProps, 'min' | 'max'>) {
    return value < min || value > max;
}

export function isNotTouchEvent(e: React.TouchEvent) {
    // event.touches，多点触碰时的位置数组，比如缩放手势必须要用两指的触摸点，就是一个数组
    return e.touches.length > 1 ||
		(e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

export function getClosestPoint(val: number, {marks, step, min}: Pick<GenericSliderProps, 'min' | 'marks' | 'step'>) {
    const points = Object.keys(marks).map(parseFloat);
    if (step !== null) {
        const closestStep =
			Math.round((val - min) / step) * step + min;// Math.round(((val - min) / step) * step) + min;
        points.push(closestStep);
    }
    const diffs = points.map(point => Math.abs(val - point));
    return points[diffs.indexOf(Math.min(...diffs))];
}

export function getPrecision(step: number) {
    const stepString = step.toString();
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
        precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
}

export function getMousePosition(vertical: boolean, e: React.MouseEvent, zoom: number) {
    // 处理设置zoom属性导致body尺寸变大,而鼠标位置是对于window的(没有改变),这里让鼠标位置除以zoom
    zoom = zoom || (document.body.style as any).zoom || 1;
    return vertical ? e.clientY / zoom : e.pageX / zoom;
}

export function getTouchPosition(vertical: boolean, e: React.TouchEvent) {
    return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}

export function getHandleCenterPosition(vertical: boolean, handle: HTMLElement) {
    const coords = handle.getBoundingClientRect();
    return vertical ?
        coords.top + (coords.height * 0.5) :
        coords.left + (coords.width * 0.5);
}

export function ensureValueInRange(val: number, {max, min}: Pick<GenericSliderProps, 'min' | 'max'>) {
    if (val <= min) {
        return min;
    }
    if (val >= max) {
        return max;
    }
    return val;
}

export function ensureValuePrecision(val: number, props: GenericSliderProps) {
    const {step} = props;
    const closestPoint = getClosestPoint(val, props);
    return step === null ? closestPoint :
        parseFloat(closestPoint.toFixed(getPrecision(step)));
}

export function pauseEvent(e: EventType) {
    e.stopPropagation();
    e.preventDefault();
}

export function getKeyboardValueMutator(e: React.KeyboardEvent) {
    switch (e.keyCode) {
        case keyCode.UP:
        case keyCode.RIGHT:
            return (value: number, props: GenericSliderProps):number => value + props.step!;

        case keyCode.DOWN:
        case keyCode.LEFT:
            return (value: number, props: GenericSliderProps):number => value - props.step!;

        case keyCode.END:
            return (_value: number, props: GenericSliderProps):number => props.max;
        case keyCode.HOME:
            return (_value: number, props: GenericSliderProps):number => props.min;
        case keyCode.PAGE_UP:
            return (value: number, props: GenericSliderProps):number => value + props.step! * 2;
        case keyCode.PAGE_DOWN:
            return (value: number, props: GenericSliderProps):number => value - props.step! * 2;

        default:
            return undefined;
    }
}
