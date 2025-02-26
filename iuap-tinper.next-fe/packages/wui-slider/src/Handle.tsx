/**
 * This source code is quoted from rc-slider.
 * homepage: https://github.com/react-component/slider
 */
// import PropTypes from 'prop-types';
import React from 'react';
import type {HandleProps, FieldidProps} from './iSlider'

export default class Handle extends React.Component<HandleProps> {
    render() {
        const {
            className, vertical, offset, style, disabled, min, max, value, reverse, fieldid, dir: direction, ...restProps
        } = this.props;

        const postionStyle = vertical ? (reverse ? {top: `${offset}%`, bottom: 'auto'} : {
            bottom: `${offset}%`,
            top: 'auto'
        }) : (reverse ? {[direction === 'rtl' ? "right" : "left"]: 'auto', [direction === 'rtl' ? "left" : "right" ]: `${offset}%`} : {[direction === 'rtl' ? "right" : "left"]: `${offset}%`, [direction === 'rtl' ? "left" : "right"]: 'auto'});
        const elStyle = {
            ...style,
            ...postionStyle
        };
        let ariaProps = {};
        if (value !== undefined) {
            ariaProps = {
                ...ariaProps,
                'aria-valuemin': min,
                'aria-valuemax': max,
                'aria-valuenow': value,
                'aria-disabled': !!disabled
            };

        }
        const fieldidObj: FieldidProps = {}
        if (fieldid || fieldid === 0) {
            fieldidObj.fieldid = `${fieldid}_slider_handle`
        }
        return (
            <div
                role="slider"
                tabIndex={0}
                {...ariaProps}
                {...restProps}
                className={className}
                style={elStyle}
                {...fieldidObj}
            />
        );
    }
}

/* Handle.propTypes = {
    className: PropTypes.string,
    vertical: PropTypes.bool,
    offset: PropTypes.number,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    reverse: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
}; */
