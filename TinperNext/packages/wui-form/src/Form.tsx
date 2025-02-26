/* eslint-disable react/prop-types */
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import FieldForm, {List} from 'rc-field-form';
import * as React from 'react';
import {useMemo} from 'react';
import { getLangInfo } from '../../wui-locale/src/tool'
import {ConfigContext} from '../../wui-provider/src/context';
import SizeContext, {SizeContextProvider} from '../../wui-provider/src/SizeContext';
import {FormContext} from './context';
import useForm from './hooks/useForm';
import type {FormInstance, FormProps, ValidateErrorEntity, FormContextProps} from './iForm'
import {getNid} from "../../wui-core/src/index";
import i18n from './i18n';

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props, ref) => {
    const contextSize = React.useContext(SizeContext);
    const contextConfig = React.useContext(ConfigContext) as any;
    const {getPrefixCls, dir: direction, form: contextForm, disabled: contextDisables, locale: contextLocale} = contextConfig;

    const {
        prefixCls: customizePrefixCls,
        className = '',
        size = contextSize || 'md',
        form,
        colon,
        labelAlign,
        labelWrap,
        labelCol,
        wrapperCol = direction === 'rtl' ? {span: 24} : {},
        hideRequiredMark,
        layout = direction === 'rtl' ? "vertical" : 'horizontal',
        scrollToFirstError,
        requiredMark,
        onFinishFailed,
        name,
        disabled,
        hidden,
        validateMessages,
        ...restFormProps
    } = props;
    const mergedRequiredMark = useMemo(() => {
        if (requiredMark !== undefined) {
            return requiredMark;
        }

        if (contextForm && contextForm.requiredMark !== undefined) {
            return contextForm.requiredMark;
        }

        if (hideRequiredMark) {
            return false;
        }

        return true;
    }, [hideRequiredMark, requiredMark, contextForm]);

    const prefixCls = getPrefixCls('form', customizePrefixCls);

    const mergeDisabled = disabled ?? (contextDisables ?? false);

    const formClassName = classNames(
        prefixCls,
        {
            [`${prefixCls}-${layout}`]: true,
            [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
            [`${prefixCls}-rtl`]: direction === 'rtl',
            [`${prefixCls}-${size}`]: size
        },
        className
    );

    const [wrapForm] = useForm(form);
    const {__INTERNAL__} = wrapForm;
    __INTERNAL__.name = name;

    const formContextValue = useMemo<FormContextProps>(
        () => ({
            name,
            labelAlign,
            labelWrap,
            labelCol,
            wrapperCol,
            vertical: layout === 'vertical',
            colon,
            requiredMark: mergedRequiredMark,
            itemRef: __INTERNAL__.itemRef
        }),
        [name, labelAlign, labelCol, wrapperCol, layout, colon, mergedRequiredMark]
    ) as any;

    React.useImperativeHandle(ref, () => wrapForm);

    const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
        onFinishFailed?.(errorInfo);

        let defaultScrollToFirstError; // Options = { block: 'nearest' };

        if (scrollToFirstError && errorInfo.errorFields.length) {
            if (typeof scrollToFirstError === 'object') {
                defaultScrollToFirstError = scrollToFirstError;
            }
            wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError);
        }
    };
    const getHidden = () => {
        if (typeof hidden === 'boolean') {
            return hidden;
        }
        if (typeof hidden === 'string') {
            switch (hidden) {
                case 'hidden':
                    return true;
                case 'visible':
                    return false;
                case 'destroy':
                    return true;
                default:
                    return false;
            }
        }
        return;
    }
    let adapterNid = getNid(props)
    let dispaly = getHidden();

    const local = getLangInfo(contextLocale, i18n, 'form')
    const mergedValidateMessages = {...validateMessages, ...local.langMap.defaultValidateMessages}

    return (
        <ConfigContext.Provider value={{...contextConfig, disabled: mergeDisabled}}>
            <SizeContextProvider size={size}>
                <FormContext.Provider value={formContextValue}>
                    {
                        hidden === 'destroy' ? null : <FieldForm
                            id={name}
                            {...restFormProps}
                            validateMessages={mergedValidateMessages}
                            hidden = {dispaly}
                            name={name}
                            onFinishFailed={onInternalFinishFailed}
                            form={wrapForm}
                            className={formClassName}
                            {...adapterNid}
                        />
                    }
                </FormContext.Provider>
            </SizeContextProvider>
        </ConfigContext.Provider>
    );
};

const Form = React.forwardRef(InternalForm);

export {useForm, List};

export default Form;
