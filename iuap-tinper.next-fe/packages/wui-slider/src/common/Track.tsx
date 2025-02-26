/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
import React from 'react';
import type {TrackProps, FieldidProps} from '../iSlider'
// import {sliderPropTypes} from './createSlider';

// const propTypes = {
//     ...sliderPropTypes
// }

const Track = (props: TrackProps) => {
    // 处于激活状态的track
    const {className, included, vertical, offset, length, style, reverse, fieldid, dir: direction} = props;

    const positonStyle = vertical ? (
        reverse ? {
            top: `${offset}%`,
            height: `${length}%`,
            bottom: 'auto'
        } : {
            bottom: `${offset}%`,
            height: `${length}%`,
            top: 'auto'
        }) : (reverse ? {
        [direction == "rtl" ? "right" : "left"]: 'auto',
        width: `${length}%`,
        [direction == "rtl" ? "left" : "right"]: `${offset}%`,
    } : {
        [direction == "rtl" ? "right" : "left"]: `${offset}%`,
        width: `${length}%`,
        [direction == "rtl" ? "left" : "right"]: 'auto'
    });

    const elStyle: any = {
        visibility: included ? 'visible' : 'hidden',
        ...style,
        ...positonStyle,
    };
    const fieldidObj: FieldidProps = {}
    if (fieldid || fieldid === 0) {
        fieldidObj.fieldid = `${fieldid}_slider_track`
    }
    return <div className={className} style={elStyle} {...fieldidObj}/>;
};

// Track.propTypes = propTypes;
export default Track;
