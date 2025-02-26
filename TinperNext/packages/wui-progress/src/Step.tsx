import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { ProgressStepProps } from './iProgress';
import Tooltip from '../../wui-tooltip/src'


// const propTypes = {
//     size: PropTypes.string,
//     fieldid: PropTypes.string,
//     steps: PropTypes.number,
//     percent: PropTypes.number,
//     strokeWidth: PropTypes.number,
//     strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     trailColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// }
const Steps: React.FC<ProgressStepProps> = props => {
    const {
        size,
        steps = 0,
        percent = 0,
        strokeWidth = 8,
        strokeColor,
        trailColor,
        clsPrefix,
        fieldid,
        children,
        tipsContent
    } = props;
    const current = Math.round(steps * (percent / 100));
    const stepWidth = size === 'small' ? 2 : 14;
    const styledSteps = [];
    // console.log(clsPrefix);
    for (let i = 0; i < steps; i += 1) {
        const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
        let stepDom = tipsContent && tipsContent?.length > 0 ? (
            <Tooltip overlay={tipsContent?.[i]}>
                <div
                    // title={tipsArr?.[i]}
                    fieldid={fieldid ? `${fieldid}_${i}` : undefined}
                    key={i}
                    className={classNames(`${clsPrefix}-steps-item`, {
                        [`${clsPrefix}-steps-item-active`]: i <= current - 1,
                    })}
                    style={{
                        backgroundColor: i <= current - 1 ? color : trailColor,
                        width: stepWidth,
                        height: strokeWidth,
                    }}
                />
            </Tooltip>
        ) : <div
                fieldid={fieldid ? `${fieldid}_${i}` : undefined}
                key={i}
                className={classNames(`${clsPrefix}-steps-item`, {
                    [`${clsPrefix}-steps-item-active`]: i <= current - 1,
                })}
                style={{
                    backgroundColor: i <= current - 1 ? color : trailColor,
                    width: stepWidth,
                    height: strokeWidth,
                }}
            />
        styledSteps.push(stepDom);
    }
    return (
        <div className={`${clsPrefix}-steps-outer`} fieldid={fieldid}>
            {styledSteps}
            {children}
        </div>
    );
};
// Steps.propTypes = propTypes;
export default Steps;
