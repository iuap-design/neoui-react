// import PropTypes from 'prop-types';
import * as React from 'react';
import { ProgressLineProps } from './iProgress';
import {validProgress} from './utils';
import classnames from 'classnames';

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
// const propTypes = {
//     percent: PropTypes.number,
//     successPercent: PropTypes.number,
//     strokeWidth: PropTypes.number,
//     size: PropTypes.string,
//     strokeColor: PropTypes.oneOfType([
//         PropTypes.object,
//         PropTypes.string
//     ]),
//     strokeLinecap: PropTypes.string,
//     fieldid: PropTypes.string
// }

export const sortGradient = (gradients: {[key: string]: string}) => {
    let tempArr = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(gradients)) {
        const formatKey = parseFloat(key.replace(/%/g, ''));
        if (isNaN(formatKey)) {
            return {};
        }
        tempArr.push({
            key: formatKey,
            value,
        });
    }
    tempArr = tempArr.sort((a, b) => a.key - b.key);
    return tempArr.map(({key, value}) => `${value} ${key}%`).join(', ');
};

/**
 * {
 *   '0%': '#afc163',
 *   '25%': '#66FF00',
 *   '50%': '#00CC00',     ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *   '75%': '#009900',              #00CC00 50%, #009900 75%, #ffffff 100%)
 *   '100%': '#ffffff'
 * }
 *
 * Then this man came to realize the truth:
 * Besides six pence, there is the moon.
 * Besides bread and butter, there is the bug.
 * And...
 * Besides women, there is the code.
 */
export const handleGradient = (strokeColor: {[key: string]: string}) => {
    const {from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest} = strokeColor;
    if (Object.keys(rest).length !== 0) {
        // const sortedGradients = sortGradient(rest as StringGradients);
        const sortedGradients = sortGradient(rest);
        return {backgroundImage: `linear-gradient(${direction}, ${sortedGradients})`};
    }
    return {backgroundImage: `linear-gradient(${direction}, ${from}, ${to})`};
};

const Line: React.FC<ProgressLineProps> = props => {
    const {
        clsPrefix,
        percent,
        success,
        strokeWidth,
        size,
        strokeColor,
        strokeLinecap,
        children,
        fieldid,
    } = props;
    const successPercent = success?.percent || props.successPercent;
    let backgroundProps;
    if (strokeColor && typeof strokeColor !== 'string') {
        backgroundProps = handleGradient(strokeColor);
    } else {
        backgroundProps = {
            background: strokeColor,
        };
    }
    const percentStyle = {
        width: `${validProgress(percent as number)}%`,
        height: strokeWidth,
        borderRadius: strokeLinecap === 'square' ? 0 : '',
        ...backgroundProps,
    };
    const percentClassName = classnames({
        [`${clsPrefix}-bg`]: true,
        [
        size === 'small' ?
            `${clsPrefix}-bg-small` :
            `${clsPrefix}-bg-default`
        ]: true,
    });
    const successPercentStyle = {
        width: `${validProgress(successPercent as number)}%`,
        height: strokeWidth,
        borderRadius: strokeLinecap === 'square' ? 0 : '',
        background: success?.strokeColor,
    };
    const successPercentClassName = classnames({
        [`${clsPrefix}-success-bg`]: true,
        [
        size === 'small' ?
            `${clsPrefix}-success-bg-small` :
            `${clsPrefix}-success-bg-default`
        ]: true,
    });
    const successSegment =
		successPercent !== undefined ? (
		    <div className={successPercentClassName} style={successPercentStyle}/>
		) : null;
    return (
        <div className={`${clsPrefix}-line-box`}>
            <div className={`${clsPrefix}-outer`}>
                <div className={`${clsPrefix}-inner`}>
                    <div className={percentClassName} fieldid={fieldid ? `${fieldid}` : undefined} style={percentStyle}/>
                    {successSegment}
                </div>
            </div>
            {children}
        </div>
    );
};
// Line.propTypes = propTypes;
export default Line;
