/* eslint-disable react/prop-types */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';

import {Col} from '../../wui-layout/src/index';
// 多语
// import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
// import defaultLocale from '../locale/default';
import Tooltip from '../../wui-tooltip/src';
import Icon from '../../wui-icon/src';
import {FormContext} from './context';
import type {FormItemLabelProps, FormContextProps} from './iForm'
import type {TooltipProps} from '../../wui-tooltip/src/iTooltip'

function toTooltipProps(tooltip: React.ReactNode) {
    if (!tooltip) {
        return null;
    }

    if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
        return tooltip;
    }

    return {
        title: tooltip
    };
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({prefixCls, label, htmlFor, labelCol, labelAlign, colon, required, requiredMark, tooltip}) => {
    // const [formLocale] = useLocaleReceiver('Form');

    if (!label) return null;

    return (
        <FormContext.Consumer key='label'>
            {({vertical, labelAlign: contextLabelAlign, labelCol: contextLabelCol, labelWrap, colon: contextColon}: FormContextProps) => {
                const mergedLabelCol = labelCol || contextLabelCol || {};

                const mergedLabelAlign = labelAlign || contextLabelAlign;

                const labelClsBasic = `${prefixCls}-item-label`;
                const labelColClassName = classNames(
                    labelClsBasic,
                    mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
                    (mergedLabelCol as any).className,
                    {
                        [`${labelClsBasic}-wrap`]: !!labelWrap
                    }
                );

                let labelChildren = label;
                // Keep label is original where there should have no colon
                const computedColon =
                    colon !== undefined ? colon === true || (contextColon !== false && colon !== false) : false;
                const haveColon = computedColon && !vertical;
                // Remove duplicated user input colon
                if (haveColon && typeof label === 'string' && label.trim() !== '') {
                    labelChildren = label.replace(/[:|：]\s*$/, '');
                }

                // Tooltip
                const tooltipProps = toTooltipProps(tooltip);
                let tooltipNode = null
                if (tooltipProps) {
                    // const {...restTooltipProps} = tooltipProps;
                    const { icon = <Icon title='' type="uf-a-wenhaomoren" />, ...restTooltipProps } = tooltipProps as {icon: React.ReactElement} & TooltipProps;
                    tooltipNode = <Tooltip {...restTooltipProps}>{React.cloneElement(icon, { className: `${prefixCls}-item-label-icon-tooltip` })}</Tooltip>;
                }

                // Add required mark if optional
                if (requiredMark === 'optional' && !required) {
                    labelChildren = (
                        <>
                            {labelChildren}
                            <span className={`${prefixCls}-item-optional`}></span>
                        </>
                    );
                }

                const labelClassName = classNames({
                    [`${prefixCls}-item-required`]: required,
                    [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
                    [`${prefixCls}-item-no-colon`]: !computedColon
                });

                return (
                    // @ts-ignore Col组件参数
                    <Col {...mergedLabelCol} className={labelColClassName}>
                        <label
                            htmlFor={htmlFor}
                            className={labelClassName}
                            title={typeof label === 'string' ? label : ''}
                        >
                            {labelChildren}
                        </label>
                        {tooltipNode}
                    </Col>
                );
            }}
        </FormContext.Consumer>
    );
};

export default FormItemLabel;
