import classNames from 'classnames';
import omit from 'omit.js';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src/index"
import Icon from '../../wui-icon/src';
import Circle from './Circle';
import Line from './Line';
import Bar from './Bar';
import Steps from "./Step"
import {validProgress} from './utils';
import {ProgressProps, ProgressStatus} from './iProgress';
import { WithConfigConsumer } from '../../wui-provider/src/context';

// const ProgressTypes = ['line', 'circle', 'dashboard'];
const progressStatuses = ['normal', 'exception', 'active', 'success'];

// const propTypes = {
//     status: PropTypes.oneOf(progressStatuses),
//     type: PropTypes.oneOf(ProgressTypes),
//     showInfo: PropTypes.bool,
//     percent: PropTypes.number,
//     width: PropTypes.number,
//     strokeWidth: PropTypes.number,
//     strokeLinecap: PropTypes.oneOf(['round', 'square']),
//     strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//     trailColor: PropTypes.string,
//     format: PropTypes.func,
//     gapDegree: PropTypes.number,
//     successPercent: PropTypes.number,
//     size: PropTypes.string,
//     steps: PropTypes.number,
//     fieldid: PropTypes.string,
// };
const defaultProps: ProgressProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    size: 'default',
    gapDegree: 0,
    strokeLinecap: 'round',
};
@WithConfigConsumer({name: "progress"})
@WebUI({name: "progress", defaultProps})
class Progress extends Component<ProgressProps> {
    static defaultProps = defaultProps;
    static Bar = Bar;
    getPercentNumber() {
        const {percent = 0} = this.props;
        const successPercent = this.props.success?.percent || this.props.successPercent;
        return parseInt(
            successPercent !== undefined ? successPercent.toString() : percent.toString(),
            10,
        );
    }

    getProgressStatus() {
        const {status} = this.props;
        if (progressStatuses.indexOf(status as string) < 0 && this.getPercentNumber() >= 100) {
            return 'success';
        }
        return status || 'normal';
    }

    renderProcessInfo(clsPrefix: string, progressStatus: ProgressStatus) {
        const {showInfo, format, type, percent, dir} = this.props;
        const successPercent = this.props.success?.percent || this.props.successPercent;
        if (!showInfo) return null;

        let text;
        const textFormatter = format || (percentNumber => dir === 'rtl' ? `%${percentNumber}` : `${percentNumber}%`);
        const iconType = type === 'circle' || type === 'dashboard' ? '' : '-c';
        if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
            text = textFormatter(validProgress(percent), validProgress(successPercent));
        } else if (progressStatus === 'exception') {
            text = <Icon type={`uf-close${iconType}`} />;
        } else if (progressStatus === 'success') {
            text = <Icon type={`uf-correct-2`} />;
        }
        return (
            <span className={`${clsPrefix}-text`} title={typeof text === 'string' ? text : undefined}>
                {text as React.ReactNode}
            </span>
        );
    }

	renderProgress = () => {
	    const {props} = this;
	    const {clsPrefix, className, size, type, steps, showInfo, strokeColor, fieldid, ...restProps} = props;
	    // const clsPrefix = getPrefixCls('progress', customizePrefixCls);
	    const progressStatus = this.getProgressStatus();
	    const progressInfo = this.renderProcessInfo(clsPrefix as string, progressStatus);
	    let progress;
	    // Render progress shape
	    // 处理Line和Circle传入数组类型stokeColor问题
	    const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
	    if (type === 'line') {
	        // progress = (
	        //   steps ? (
	        //     <Steps
	        //       {...this.props}
	        //       strokeColor={typeof strokeColor === 'string' ? strokeColor : undefined}
	        //       clsPrefix={clsPrefix}
	        //       steps={steps}
	        //     >
	        //       {progressInfo}
	        //     </Steps>
	        //   ) :<Line {...this.props} clsPrefix={clsPrefix}>
	        //     {progressInfo}
	        //   </Line>
	        // );
	        progress = steps ? (
	            <Steps
	                {...omit(this.props, ['clsPrefix'])}
	                fieldid={fieldid ? `${fieldid}_progress` : undefined}
	                strokeColor={typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined}
	                clsPrefix={clsPrefix}
	                steps={steps}
	            >
	                {progressInfo}
	            </Steps>
	        ) : (
	            <Line {...omit(this.props, ['clsPrefix'])} fieldid={fieldid ? `${fieldid}_progress` : undefined} clsPrefix={clsPrefix} strokeColor={strokeColorNotArray}>
	                {progressInfo}
	            </Line>
	        );
	    } else if (type === 'circle' || type === 'dashboard') {
	        progress = (
	            <Circle {...omit(this.props, ['clsPrefix'])} clsPrefix={clsPrefix} progressStatus={progressStatus} fieldid={fieldid ? `${fieldid}_progress-circle` : undefined} strokeColor={strokeColorNotArray}>
	                {progressInfo}
	            </Circle>
	        );
	    }

	    const classString = classNames(
	        clsPrefix,
	        {
	            [`${clsPrefix}-${(type === 'dashboard' && 'circle') || type}`]: true,
	            [`${clsPrefix}-status-${progressStatus}`]: true,
	            [`${clsPrefix}-show-info`]: showInfo,
	            [`${clsPrefix}-${size}`]: size,
	        },
	        className,
	    );
	    let adapterNid = getNid(this.props)

	    return (
	        <div
	            {...omit(restProps, [
	                'status',
	                'format',
	                'trailColor',
	                'success',
	                'successPercent',
	                'strokeWidth',
	                'width',
	                'gapDegree',
	                'gapPosition',
	                'strokeLinecap',
	                'percent',
					'tipsContent'
	            ])}
	            className={classString}
	            fieldid={fieldid}
	            {...adapterNid}
	        >
	            {progress}
	        </div>
	    );
	};

	render() {
	    return this.renderProgress();
	}
}

export default Progress;
