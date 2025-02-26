/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
import classNames from 'classnames';
import React from 'react';
import type {MarksProps, FieldidProps} from '../iSlider'
// import PropTypes from 'prop-types';
// import {sliderPropTypes} from './createSlider';

// const propTypes = {
//     ...sliderPropTypes,
//     upperBound: PropTypes.number,
//     lowerBound: PropTypes.number
// }

const Marks = ({
				   className,
				   vertical,
				   reverse,
				   marks,
				   included,
				   upperBound,
				   lowerBound,
    dir: direction,
				   max, min, fieldid
			   }: MarksProps) => {
    const marksKeys = Object.keys(marks);
    const marksCount = marksKeys.length;
    const unit = marksCount > 1 ? 100 / (marksCount - 1) : 100;
    const markWidth = unit * 0.9;

    const range = max - min;
    const fieldidObj: FieldidProps = {}
    if (fieldid || fieldid === 0) {
        fieldidObj.fieldid = `${fieldid}_slider_mark`
    }
    const elements = marksKeys.map(parseFloat).sort((a, b) => a - b).map((point, index) => {
        const isActive = (!included && point === upperBound) ||
			(included && point <= upperBound && point >= lowerBound);
        const markClassName = classNames({
            [`${className}-text`]: true,
            [`${className}-text-active`]: isActive,
        });

        const bottomStyle = {
            marginBottom: '-50%',
            bottom: `${(point - min) / range * 100}%`,
            top: 'auto'
        };

        const topStyle = {
            marginTop: '-50%',
            bottom: 'auto',
            top: `${(point - min) / range * 100}%`,
        };

        const leftStyle = {
            width: `${markWidth}%`,
            marginLeft: `${-markWidth / 2}%`,
            left: `${(point - min) / range * 100}%`,
            right: 'auto'
        };

        const rightStyle = {
            width: `${markWidth}%`,
            marginRight: `${-markWidth / 2}%`,
            left: 'auto',
            right: `${(point - min) / range * 100}%`
        }

        const style = vertical ? (reverse ? topStyle : bottomStyle) : (reverse ? (direction === "rtl" ? leftStyle : rightStyle) : (direction === "rtl" ? rightStyle : leftStyle));

        const markPoint = marks[point];
        const markPointIsObject = typeof markPoint === 'object' &&
			!React.isValidElement(markPoint);
        const markLabel = markPointIsObject ? markPoint.label : markPoint;
        const markStyle = markPointIsObject ?
            {...style, ...markPoint.style} : style;
        const eleFieldid = fieldidObj.fieldid ? `${fieldidObj.fieldid}_${index}` : undefined;
        return (
            <span
                className={markClassName}
                style={markStyle}
                key={point}
                fieldid={eleFieldid}
            >
                {markLabel}
            </span>
        );
    });

    return <div className={className} {...fieldidObj}>{elements}</div>;
};
// Marks.propTypes = propTypes;
export default Marks;
