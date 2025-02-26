import classNames from 'classnames';
import {Circle as RCCircle} from 'rc-progress';
import * as React from 'react';
import { ProgressCircleProps, ProgressStatus } from './iProgress';
import {validProgress} from './utils';

const statusColorMap = {
    normal: '#4e97ff',
    exception: '#ff5735',
    success: '#18b681',
};
// const propTypes = {
//     width: PropTypes.number,
//     strokeWidth: PropTypes.string,
//     trailColor: PropTypes.string,
//     strokeLinecap: PropTypes.string,
//     gapPosition: PropTypes.string,
//     gapDegree: PropTypes.number,
//     fieldid: PropTypes.string,
//     type: PropTypes.string
// }

function getPercentage({percent, successPercent, success}: {percent?: number, successPercent?: number, success?: {percent?: number; strokeColor?: string}}) {
    const realSuccessPercent = success?.percent || successPercent;
    const ptg = validProgress(percent);
    if (!realSuccessPercent) {
        return ptg;
    }

    const successPtg = validProgress(realSuccessPercent);
    return [realSuccessPercent, validProgress(ptg - successPtg)];
}

function getStrokeColor({progressStatus, successPercent, strokeColor, success}: {progressStatus?: ProgressStatus; successPercent?: number;strokeColor?: string | {[key: string]: string}; success?: {percent?: number; strokeColor?: string}}) {
    const color = strokeColor || statusColorMap[progressStatus as Exclude<ProgressStatus, 'active'>];
    if (!successPercent && !success) {
        return color;
    }
    if (success?.percent === 0) { // success内的percent为0时，显示的颜色应为strokeColor颜色或者默认颜色
        return [color]
    } else {
        return [success?.strokeColor || statusColorMap.success, color];
    }
    // return [success?.strokeColor || statusColorMap.success, color];
}

const Circle: React.FC<ProgressCircleProps> = props => {
    const {
        clsPrefix,
        width,
        strokeWidth,
        trailColor,
        strokeLinecap,
        gapPosition,
        gapDegree,
        type,
        fieldid,
        children,
    } = props;
    const circleSize = width || 120;
    const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.15 + 6,
    };
    const circleWidth = strokeWidth || 6;
    const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
    const gapDeg = gapDegree || (type === 'dashboard' ? 75 : undefined);
    const strokeColor = getStrokeColor(props);
    const isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';

    const wrapperClassName = classNames(`${clsPrefix}-inner`, {
        [`${clsPrefix}-circle-gradient`]: isGradient,
    });

    return (
        <div className={wrapperClassName} fieldid={fieldid ? `${fieldid}` : undefined} style={circleStyle}>
            <RCCircle
                percent={getPercentage(props)}
                strokeWidth={circleWidth}
                trailWidth={circleWidth}
                strokeColor={strokeColor}
                strokeLinecap={strokeLinecap}
                trailColor={trailColor}
                // clsPrefix={clsPrefix}
                gapDegree={gapDeg}
                gapPosition={gapPos}
            />
            {children}
        </div>
    );
};
// Circle.propTypes = propTypes;
export default Circle;
