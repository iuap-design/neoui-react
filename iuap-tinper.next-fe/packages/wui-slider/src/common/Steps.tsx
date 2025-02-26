/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
import classNames from 'classnames';
import React from 'react';
import warning from 'warning';
import type {StepsProps, FieldidProps} from '../iSlider'
// import {sliderPropTypes} from './createSlider';

/* const propTypes = {
    ...sliderPropTypes
} */

const calcPoints = (_vertical: boolean, marks: StepsProps['marks'], dots: boolean | undefined, step: number, min: number, max: number) => {
    warning(
        dots ? step > 0 : true,
        '`Slider[step]` should be a positive number in order to make Slider[dots] work.'
    );

    const points = Object.keys(marks).map(parseFloat);
    if (dots) {
        for (let i = min; i <= max; i = i + step) {
            if (points.indexOf(i) >= 0) continue;
            points.push(i);
        }
    }
    return points;
};

const Steps = ({
				   prefixCls, vertical, marks, dots, step, included,
				   lowerBound, upperBound, max, min, dotStyle, reverse, activeDotStyle, fieldid, dir: direction
			   }: StepsProps) => {
    const range = max - min;
    const fieldidObj: FieldidProps = {}
    if (fieldid || fieldid === 0) {
        fieldidObj.fieldid = `${fieldid}_slider_step`
    }
    const elements = calcPoints(vertical, marks, dots, step, min, max).map((point, index) => {
        const offset = `${Math.abs(point - min) / range * 100}%`;

        const isActived = (!included && point === upperBound) ||
			(included && point <= upperBound && point >= lowerBound);
        let style = vertical ? (reverse ? {top: offset, ...dotStyle} : {bottom: offset, ...dotStyle}) : (reverse ? {[direction === 'rtl' ? "left" : "right"]: offset, ...dotStyle} : {[direction === 'rtl' ? "right" : "left"]: offset, ...dotStyle});
        if (isActived) {
            style = {...style, ...activeDotStyle};
        }

        const pointClassName = classNames({
            [`${prefixCls}-dot`]: true,
            [`${prefixCls}-dot-active`]: isActived,
        });
        const eleFieldid = fieldidObj.fieldid ? `${fieldidObj.fieldid}_${index}` : undefined;

        return <span className={pointClassName} style={style} key={point} fieldid={eleFieldid}/>;
    });

    return <div className={`${prefixCls}-step`} {...fieldidObj}>{elements}</div>;
};

// Steps.propTypes = propTypes;
export default Steps;
