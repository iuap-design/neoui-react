/* eslint-disable react/prop-types */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import React, {useContext, useEffect, useRef} from 'react';
import Icon from '../../wui-icon/src';
import {Col} from '../../wui-layout/src/index';
import Popover from '../../wui-popover/src/index';
import {FormContext, FormItemPrefixContext} from './context';
import ErrorList from './ErrorList';
import Upload from '../../wui-upload/src';
import Rate from '../../wui-rate/src';
import type {FormItemInputProps, FormItemInputMiscProps} from './iForm'

const iconMap = {
    success: <Icon type='uf-correct' />,
    warning: <Icon type='uf-exc-t' />,
    error: <Icon type='uf-exc-c' />,
    validating: <Icon type='uf-i-c' />
};

const topLeftMap = [`${Upload.defaultProps?.clsPrefix}`, `${Rate.defaultProps?.prefixCls}`];

// #QDJCJS-9848 formItem 适配占不了整行的组件 如 upload、Rate等
const topLeftCheck = (children: React.ReactNode): Boolean => {
    if (!children) return false;
    let flag: boolean = false;
    const check = (child: React.ReactNode) => {
        if (!child || flag) return;
        if (Array.isArray(child)) { // child可能是个数组、对象
            child.forEach(item => {
                check(item);
            })
        } else {
            let component: any = child;
            if (component.props && typeof component.props === 'object') {
                let clsPrefix = component.props.clsPrefix || component.props.prefixCls // 基于antd组件一般类名前缀prefixCls
                if (topLeftMap.includes(clsPrefix)) {
                    flag = true;
                }
            }
            child = component.props && component.props.children;
            child && check(child); // 递归遍历
        }
    }
    check(children);
    return flag;
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = props => {
    const {
        prefixCls,
        status,
        wrapperCol,
        children,
        help,
        errors,
        onDomErrorVisibleChange,
        hasFeedback,
        _internalItemRender: formItemRender,
        validateStatus,
        extra
    } = props;
    const baseClassName = `${prefixCls}-item`;

    const formContext = useContext(FormContext) as any;

    const mergedWrapperCol = wrapperCol || formContext.wrapperCol || {};

    const className = classNames(`${baseClassName}-control`, mergedWrapperCol.className);
    const inputContentRef = useRef<any>(null);
    useEffect(
        () => () => {
            onDomErrorVisibleChange(false);
        },
        []
    );

    // Should provides additional icon if `hasFeedback`
    const IconNode = validateStatus && iconMap[validateStatus];
    const icon = hasFeedback && IconNode ? <span className={`${baseClassName}-children-icon`}>{IconNode}</span> : null;

    // Pass to sub FormItem should not with col info
    const subFormContext = {...formContext};
    delete subFormContext.labelCol;
    delete subFormContext.wrapperCol;
    const isError = errors.length > 0;
    let hasTriangle = '';
    if (isError && ['input', 'textarea'].includes(inputContentRef?.current?.childNodes[0]?.nodeName?.toLowerCase())) {
        hasTriangle = 'has-triangle';
    }
    const errorInputBorder = isError ? 'error-input' : '';
    const isTopLeft = topLeftCheck(children);
    const inputDom = (
        <div className={classNames(`${baseClassName}-control-input`, errorInputBorder)}>
            <div className={classNames(`${baseClassName}-control-input-content`, hasTriangle)} ref={inputContentRef}>{children}</div>
            {icon}
        </div>
    );
    const errorListDom = isError ? (
        <FormItemPrefixContext.Provider value={{prefixCls, status}}>
            <ErrorList errors={errors} help={help} onDomErrorVisibleChange={onDomErrorVisibleChange} />
        </FormItemPrefixContext.Provider>
    ) : null;

    // If extra = 0, && will goes wrong
    // 0&&error -> 0
    const extraDom = extra ? <div className={`${baseClassName}-extra`}>{extra}</div> : null;
    const dom =
        formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? (
            formItemRender.render(props, {input: inputDom, errorList: errorListDom, extra: extraDom})
        ) : (
            <>
                {
                    <Popover placement={isTopLeft ? 'topLeft' : 'top'} content={isError ? errorListDom : ''} trigger={['hover', 'focus']}>
                        {inputDom}
                    </Popover>
                }
                {extraDom}
            </>
        );
    return (
        <FormContext.Provider value={subFormContext}>
            <Col {...mergedWrapperCol} className={className}>
                {dom}
            </Col>
        </FormContext.Provider>
    );
};
/* FormItemInput.propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.any,
    errors: PropTypes.array,
    hasFeedback: PropTypes.bool,
    validateStatus: PropTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
    onDomErrorVisibleChange: PropTypes.func,
    status: PropTypes.any,
    wrapperCol: PropTypes.any,
    help: PropTypes.any,
    _internalItemRender: PropTypes.any,
    extra: PropTypes.any
}; */
export default FormItemInput;
