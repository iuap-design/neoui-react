/**
 * This source code is quoted from rc-steps.
 * homepage: https://github.com/react-component/steps
 */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, { ReactNode, isValidElement } from 'react';
import omit from 'omit.js';
// import {Icon} from "../../index";
import Icon from '../../wui-icon/src';
import Progress from '../../wui-progress/src';
import {StepProps, StepStatus} from './iSteps'

function isString(str: string | ReactNode) {
    return typeof str === 'string';
}

const iconMap = {
    finish: <Icon type="uf-yiwancheng"/>,
    process: <Icon type="uf-jinhangzhong"/>,
    error: <Icon type="uf-jinhangzhong"/>,
    wait: <Icon type="uf-weikaishi"/>
}

class Step extends React.Component<StepProps> {

	click = (...args: []) => {
	    const {onClick, onStepClick, stepIndex} = this.props;
	    if (onClick) {
	        onClick(...args);
	    }

	    onStepClick?.(stepIndex);
	}

	isValidNode = (node: React.ReactNode): string | undefined => {
	    return isValidElement(node) ? undefined : typeof node === 'string' ? node : undefined;
	}

	renderIconNode() {
	    const {
	        clsPrefix, progressDot, stepNumber, status, title, description, icon,
	        iconPrefix, icons, type, percent, size
	    } = this.props;
	    let iconNode;
	    const iconClassName = classNames(`${clsPrefix}-icon`, `${iconPrefix}icon`, {
	        [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
	        [`${iconPrefix}icon-check`]: !icon && status === 'finish' && (icons && !icons.finish),
	        [`${iconPrefix}icon-close`]: !icon && status === 'error' && (icons && !icons.error),
	    });
	    const iconDot = <span className={`${clsPrefix}-icon-dot`}></span>;
	    // `progressDot` enjoy the highest priority
	    if (progressDot || type === 'dot') { // 点状步骤条
	        if (typeof progressDot === 'function') {
	            iconNode = (
	                <span className={`${clsPrefix}-icon`}>
	                    {progressDot(iconDot, {index: (stepNumber as number) - 1, status, title, description})}
	                </span>
	            );
	        } else {
	            iconNode = <span className={`${clsPrefix}-icon`}>{iconDot}</span>;
	        }
	    } else if (icon && !isString(icon)) { // 自定义icon样式
	        iconNode = <span className={`${clsPrefix}-icon`}>{icon}</span>;
	    } else if (type && type === 'arrow') { // 箭头步骤条
	        let iconDom: ReactNode = '';
	        if (status === 'finish') {
	            iconDom = <Icon type="uf-correct-2"/>;
	        } else if (status === 'error') {
	            iconDom = <Icon type="uf-exc-t"/>
	        }
	        iconNode = <span className={`${clsPrefix}-icon`}>{iconDom}</span>;
	    } else if (type && type === 'number') { // 数字步骤条
	        iconNode = <span className={`${clsPrefix}-icon`}>{stepNumber}</span>;
	    } else if (icons && icons.finish && status === 'finish') {
	        iconNode = <span className={`${clsPrefix}-icon`}>{icons.finish}</span>;
	    } else if (icons && icons.error && status === 'error') {
	        iconNode = <span className={`${clsPrefix}-icon`}>{icons.error}</span>;
	    } else {
	        if (status === 'process' && percent !== undefined && type === 'default') {
	            const width = size === 'default' ? 20 : 28;
	            iconNode = <span className={iconClassName}>
	                <Progress
	                    type="circle"
	                    percent={percent}
	                    width={width}
	                    strokeWidth={8}
	                    format={() => ''}
	                />
	                {iconMap[status as StepStatus]}
	            </span>;
	        } else {
	            iconNode = <span className={iconClassName}>{iconMap[status as StepStatus]}</span>;
	        }
	    }

	    return iconNode;
	}

	render() {
	    const {
	        className, clsPrefix, style, itemWidth,
	        status = 'wait', icon,
	        adjustMarginRight, stepNumber,
	        description, title, tailContent,
	        more, out, disabled, stepIndex, onStepClick, onClick, active, type, stepFieldId, subTitle, percent, progressDot, direction,
	        ...restProps // iconPrefix, wrapperStyle, progressDot, icons,
	    } = this.props;

	    let isActive = active;
	    let isOnchange = onStepClick && !disabled;
	    let isProgress = status === 'process' && percent !== undefined && type === 'default';
	    const classString = classNames(
	        `${clsPrefix}-item`,
	        `${clsPrefix}-item-${status}`,
	        className,
	        {
	            [`${clsPrefix}-item-custom`]: icon,
	            [`${clsPrefix}-more-out`]: out,
	            [`${clsPrefix}-disabled`]: disabled,
	            [`${clsPrefix}-item-active`]: isActive,
	            [`${clsPrefix}-item-hover`]: isOnchange
	        },
	    );
	    const stepItemStyle = {...style};
	    if (itemWidth) {
	        stepItemStyle.width = itemWidth;
	    }
	    if (adjustMarginRight) {
	        stepItemStyle.marginRight = adjustMarginRight;
	    }

	    const accessibilityProps: Pick<StepProps, 'onClick' | 'fieldid'> = {}
	    if (isOnchange) {
	        accessibilityProps.onClick = this.click;
	    }
	    if (this.props.fieldid || stepFieldId) {
	        accessibilityProps.fieldid = this.props.fieldid ?? `${stepFieldId}_steps_icon_${stepIndex}`;
	    }

	    const subTitleDom = subTitle ? (<div className={`${clsPrefix}-item-subtitle`} title={this.isValidNode(subTitle)}>{subTitle}</div>) : '';

	    const defaultContentCls = type === 'default' && direction === 'horizontal' && !progressDot && !more ? `${clsPrefix}-item-content-width-control` : ''; // 默认模式启用自动宽度计算


	    if (type && type === 'arrow') {
	        return (
	            <div
	                {...omit(restProps, ["iconPrefix", "icons"])}
	                className={classString}
	                style={stepItemStyle}
	                data-text={this.isValidNode(title)}
	                data-num={stepIndex}
	                data-status={disabled}
	                onClick={onClick}
	                {...accessibilityProps}
	            >
	                <svg className={`${clsPrefix}-arrow-before`} viewBox="0 0 32 32" >
	                    <polygon strokeLinejoin="round" points="0,0 32,0 32,32 0,32 10,16"></polygon>
	                </svg>
	                <div className={`${clsPrefix}-item-number`}>
	                    {stepNumber}
	                </div>
	                <div className={`${clsPrefix}-item-content`}>
	                    <div className={`${clsPrefix}-item-title`}>
	                        <span title={this.isValidNode(title)}>{title}{subTitleDom}</span>
	                        {this.renderIconNode()}
	                    </div>
	                    {description &&
							<div className={`${clsPrefix}-item-description`} title={this.isValidNode(description)}>{description}</div>}
	                </div>
	                <svg className={`${clsPrefix}-arrow-after`} viewBox="0 0 32 32" >
	                    <polygon strokeLinejoin="round" points="0,0 22,0 32,16 22,32 0,32"></polygon>
	                </svg>
	            </div>
	        )
	    }

	    return (
	        <div
	            {...omit(restProps, ["iconPrefix", "icons"])}
	            className={classString}
	            style={stepItemStyle}
	            data-text={this.isValidNode(title)}
	            data-num={stepIndex}
	            data-status={disabled}
	            onClick={onClick}
	            {...accessibilityProps}
	        >
	            <div className={`${clsPrefix}-item-tail`}>
	                {tailContent}
	            </div>
	            <div className={`${clsPrefix}-item-icon ${isProgress ? clsPrefix + '-item-progress-icon' : ''}`}>
	                {this.renderIconNode()}
	            </div>
	            <div className={`${clsPrefix}-item-content ${defaultContentCls}`}>
	                {
	                    defaultContentCls ?
	                        (
	                            <div className={`${clsPrefix}-item-title`} title={this.isValidNode(title)}>
	                                <div className={`${clsPrefix}-item-title-content`}>{title}{subTitleDom}</div>
	                            </div>
	                        ) :
	                        (
	                            <div className={`${clsPrefix}-item-title`} title={this.isValidNode(title)}>
	                                {title}{subTitleDom}
	                            </div>
	                        )
	                }
	                {description && <div className={`${clsPrefix}-item-description`}>{description}</div>}
	            </div>
	            {more && type === 'default' && (<div className={`${clsPrefix}-item-line`}></div>)}
	        </div>
	    );
	}
}

export default Step;
