import classNames from 'classnames';
import shallowequal from 'shallowequal';
import {Field} from 'rc-field-form';
import FieldContext from 'rc-field-form/lib/FieldContext';
import omit from 'rc-util/lib/omit';
import {supportRef} from 'rc-util/lib/ref';
import * as React from 'react';
import {useContext, useRef} from 'react';
import {devWarning} from '../../wui-core/src/warning';
import {Row} from '../../wui-layout/src/index';
import {ConfigContext} from '../../wui-provider/src/context';

import {FormContext, FormItemContext} from './context';
import FormItemInput from './FormItemInput';

import FormItemLabel from './FormItemLabel';
import useFrameState from './hooks/useFrameState';
import useItemRef from './hooks/useItemRef';
import {cloneElement, getFieldId, isValidElement, toArray} from './util';
import type {MemoInputProps, NamePath, FormItemProps, Meta, ValidateStatus, RcFormInstance} from './iForm'
import { setComponentSize, getNid } from '../../wui-core/src';

const NAME_SPLIT = '__SPLIT__';
const FIELD_META_PROP = 'data-__meta';
const FIELD_DATA_PROP = 'data-__field';

// const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');

/**
 * MemoInput
 * @param value any;
 * @param update number;
 * @param children React.ReactNode;
 */
const MemoInput = React.memo(
    ({children}: MemoInputProps) => children as JSX.Element,
    (prev, next) => prev.value === next.value && prev.update === next.update
);

function hasValidName(name?: NamePath): boolean {
    if (name === null) {
        devWarning(false, 'Form.Item', '`null` is passed as `name` property');
    }
    return !(name === undefined || name === null);
}

function FormItem<Values = any>(props: FormItemProps<Values>): React.ReactElement {
    const {
        name,
        fieldKey,
        noStyle,
        dependencies,
        prefixCls: customizePrefixCls,
        style,
        className,
        size: propsSize = 'md',
        shouldUpdate,
        hasFeedback,
        help,
        rules,
        validateStatus,
        children,
        required,
        label,
        messageVariables,
        trigger = 'onChange',
        validateTrigger = 'onBlur',
        hidden,
        tooltip,
        ...restProps
    } = props;
    const size = setComponentSize(propsSize, {defaultIsMd: true})
    const destroyRef = useRef(false);
    const {getPrefixCls} = useContext(ConfigContext);
    const {name: formName, requiredMark} = useContext(FormContext) as any;
    const {updateItemErrors} = useContext(FormItemContext);
    const [domErrorVisible, innerSetDomErrorVisible] = React.useState(!!help);
    const [inlineErrors, setInlineErrors] = useFrameState<Record<string, string[]>>({});

    const {validateTrigger: contextValidateTrigger} = useContext(FieldContext);
    const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

    function setDomErrorVisible(visible: boolean) {
        if (!destroyRef.current) {
            innerSetDomErrorVisible(visible);
        }
    }

    const hasName = hasValidName(name);
    // 旧版
    const getControls = (children: React.ReactNode, recursively: boolean) => {
        let controls: React.ReactNode[] = [];
        const childrenArray = React.Children.toArray(children);
        for (let i = 0; i < childrenArray.length; i++) {
            if (!recursively && controls.length > 0) {
                break;
            }

            const child: any = childrenArray[i];
            if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
                continue;
            }
            if (!child.props) {
                continue;
            }
            if (FIELD_META_PROP in child.props) {
                // And means FIELD_DATA_PROP in child.props, too.
                controls.push(child);
            } else if (child.props.children) {
                controls = controls.concat(getControls(child.props.children, recursively));
            }
        }
        return controls;
    };
    const getOnlyControl = () => {
        const child = getControls(props.children, false)[0];
        return child !== undefined ? child : null;
    };
    const getChildProp = (prop: string) => {
        const child: any = getOnlyControl();
        return child && child.props && child.props[prop];
    };
    const getMeta = () => {
        return getChildProp(FIELD_META_PROP);
    };
    const getField = () => {
        return getChildProp(FIELD_DATA_PROP);
    };

    function intersperseSpace(list: string[]) {
        return list.reduce((current: any, item: string) => [...current, ' ', item], []).slice(1);
    }

    const isRequiredV3 = () => {
        const {required} = props;
        if (required !== undefined) {
            return required;
        }
        if (getOnlyControl()) {
            const meta = getMeta() || {};
            const validate = meta.validate || [];

            return validate
                .filter((item: {rules: object[]}) => !!item.rules)
                .some((item: {rules: object[]}) => {
                    return item.rules.some((rule: {required?: boolean}) => rule.required);
                });
        }
        return false;
    };
    const getHelpMessage = () => {
        const {help} = props;
        if (help === undefined && getOnlyControl()) {
            const {errors} = getField();
            if (errors) {
                return intersperseSpace(
                    errors.map((e: React.ReactNode & {message?: React.ReactNode}, index: number) => {
                        let node = null;

                        if (React.isValidElement(e)) {
                            node = e;
                        } else if (React.isValidElement(e.message)) {
                            node = e.message;
                        }
                        // eslint-disable-next-line react/no-array-index-key
                        return node ? React.cloneElement(node, {key: index}) : e.message;
                    })
                );
            }
            return '';
        }
        return help;
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
    let display = getHidden();
    // Cache Field NamePath
    const nameRef = useRef<(string | number)[]>([]);

    // Should clean up if Field removed
    React.useEffect(
        () => () => {
            destroyRef.current = true;
            updateItemErrors(nameRef.current.join(NAME_SPLIT), []);
        },
        []
    );

    const prefixCls = getPrefixCls('form', customizePrefixCls);

    // ======================== Errors ========================
    // Collect noStyle Field error to the top FormItem
    const updateChildItemErrors = noStyle
        ? updateItemErrors
        : (subName: string, subErrors: string[], originSubName: string) => {
            setInlineErrors((prevInlineErrors = {}) => {
                // Clean up origin error when name changed
                if (originSubName !== subName) {
                    delete prevInlineErrors[originSubName];
                }

                // if (!isEqual(prevInlineErrors[subName], subErrors)) {
                if (!shallowequal(prevInlineErrors[subName], subErrors)) {
                    return {
                        ...prevInlineErrors,
                        [subName]: subErrors
                    };
                }
                return prevInlineErrors;
            });
        };

    // ===================== Children Ref =====================
    const getItemRef = useItemRef();

    // React.useImperativeHandle(ref, () => getItemRef);
    function renderLayout(baseChildren: React.ReactElement, fieldId?: string, meta?: Meta, required?: boolean): React.ReactNode {
        const isRequired =
            (required !== undefined
                ? required
                : !!(
                    rules &&
                      rules.some((rule: {required?: boolean} | ((value?: any) => {required?: boolean})) => {
                          if (rule && typeof rule === 'object' && rule.required) {
                              return true;
                          }
                          if (typeof rule === 'function') {
                              const ruleEntity = rule(baseChildren?.props?.value);
                              return ruleEntity && ruleEntity.required;
                          }
                          return false;
                      })
                )) || isRequiredV3();

        if (noStyle && !display) {
            return baseChildren;
        }
        // ======================== Errors ========================
        // >>> collect sub errors
        let subErrorList: string[] = getHelpMessage() ? [].concat(getHelpMessage()) : [];
        Object.keys(inlineErrors).forEach(subName => {
            subErrorList = [...subErrorList, ...(inlineErrors[subName] || [])];
        });

        // >>> merged errors
        let mergedErrors;
        if (help !== undefined && help !== null && help !== '') {
            mergedErrors = toArray(help);
        } else {
            mergedErrors = meta ? meta.errors : [];
            mergedErrors = [...mergedErrors, ...subErrorList];
        }

        // ======================== Status ========================
        let mergedValidateStatus: ValidateStatus = '';
        if (validateStatus !== undefined) {
            mergedValidateStatus = validateStatus;
        } else if (meta?.validating) {
            mergedValidateStatus = 'validating';
        } else if (meta?.errors?.length || subErrorList.length) {
            mergedValidateStatus = 'error';
            // } else if (meta?.touched) {
            //   mergedValidateStatus = 'success';
        }

        const itemClassName = {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-${size}`]: !!size,
            [`${prefixCls}-item-with-help`]: domErrorVisible || !!help,

            // Status
            [`${prefixCls}-item-has-feedback`]: !!(mergedValidateStatus && hasFeedback),
            [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
            [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
            // [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
            [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
            [`${prefixCls}-item-hidden`]: !!display,
            [`${prefixCls}-item-row-required`]: !!isRequired
        };
        let adapterNid = getNid(props)
        // ======================= Children =======================
        return (
            <Row
                className={classNames(itemClassName, className)}
                style={style}
                key='row'
                {...omit(restProps, [
                    'colon',
                    'extra',
                    'getValueFromEvent',
                    'getValueProps',
                    'htmlFor',
                    'id', // It is deprecated because `htmlFor` is its replacement.
                    'initialValue',
                    'isListField',
                    'labelAlign',
                    'labelWrap',
                    'labelCol',
                    'normalize',
                    'preserve',
                    // 'tooltip',
                    'validateFirst',
                    'valuePropName',
                    'wrapperCol',
                    '_internalItemRender' as any
                ])}
                {...adapterNid}
            >
                {/* Label */}
                <FormItemLabel
                    htmlFor={fieldId}
                    required={isRequired}
                    requiredMark={requiredMark}
                    {...props}
                    prefixCls={prefixCls}
                />
                {/* Input Group */}
                <FormItemInput
                    {...props}
                    {...meta}
                    errors={mergedErrors}
                    prefixCls={prefixCls}
                    status={mergedValidateStatus}
                    onDomErrorVisibleChange={setDomErrorVisible}
                    validateStatus={mergedValidateStatus}
                >
                    <FormItemContext.Provider value={{updateItemErrors: updateChildItemErrors}}>
                        {baseChildren}
                    </FormItemContext.Provider>
                </FormItemInput>
            </Row>
        );
    }

    const isRenderProps = typeof children === 'function';

    // Record for real component render
    const updateRef = useRef(0);
    updateRef.current += 1;

    if (!hasName && !isRenderProps && !dependencies) {
        return renderLayout(children as React.ReactElement) as JSX.Element;
    }

    let variables: Record<string, string> = {};
    if (typeof label === 'string') {
        variables.label = label;
    }
    if (messageVariables) {
        variables = {...variables, ...messageVariables};
    }
    if (hidden === 'destroy') return (<></>);
    return (
        <Field
            {...props}
            messageVariables={variables}
            trigger={trigger}
            validateTrigger={mergedValidateTrigger}
            onReset={() => {
                setDomErrorVisible(false);
            }}
        >
            {(control: {[name: string]: any}, meta: Meta, context: RcFormInstance) => {
                const {errors} = meta;

                const mergedName = toArray(name).length && meta ? meta.name : [];
                const fieldId = getFieldId(mergedName, formName);

                if (noStyle) {
                    // Clean up origin one
                    const originErrorName = nameRef.current.join(NAME_SPLIT);

                    nameRef.current = [...mergedName];
                    if (fieldKey) {
                        const fieldKeys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
                        nameRef.current = [...mergedName.slice(0, -1), ...fieldKeys];
                    }
                    updateItemErrors(nameRef.current.join(NAME_SPLIT), errors, originErrorName);
                }
                const isRequired =
                    (required !== undefined
                        ? required
                        : !!(
                            rules &&
                              rules.some((rule: {required?: boolean} | ((value?: any) => {required?: boolean})) => {
                                  if (rule && typeof rule === 'object' && rule.required) {
                                      return true;
                                  }
                                  if (typeof rule === 'function') {
                                      const ruleEntity = rule(context);
                                      return ruleEntity && ruleEntity.required;
                                  }
                                  return false;
                              })
                        )) || isRequiredV3();
                // ======================= Children =======================
                const mergedControl = {
                    ...control
                };

                let childNode = null;

                devWarning(
                    !(shouldUpdate && dependencies),
                    'Form.Item',
                    "`shouldUpdate` and `dependencies` shouldn't be used together."
                );
                if (Array.isArray(children) && hasName) {
                    devWarning(false, 'Form.Item', '`children` is array of render props cannot have `name`.');
                    childNode = children;
                } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) {
                    devWarning(
                        !!(shouldUpdate || dependencies),
                        'Form.Item',
                        '`children` of render props only work with `shouldUpdate` or `dependencies`.'
                    );
                    devWarning(
                        !hasName,
                        'Form.Item',
                        "Do not use `name` with `children` of render props since it's not a field."
                    );
                } else if (dependencies && !isRenderProps && !hasName) {
                    devWarning(false, 'Form.Item', 'Must set `name` or use render props when `dependencies` is set.');
                } else if (isValidElement(children)) {
                    devWarning(
                        (children as React.ReactElement).props.defaultValue !== undefined,
                        'Form.Item',
                        '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.'
                    );

                    const childProps = {...(children as React.ReactElement).props, ...mergedControl};
                    if (!childProps.id) {
                        childProps.id = fieldId;
                    }

                    if (supportRef(children)) {
                        childProps.ref = getItemRef(mergedName, children);
                    }

                    // We should keep user origin event handler
                    const triggers = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);

                    triggers.forEach(eventName => {
                        childProps[eventName] = (...args: any[]) => {
                            mergedControl[eventName]?.(...args);
                            (children as React.ReactElement).props[eventName]?.(...args);
                        };
                    });

                    childNode = (
                        <MemoInput value={mergedControl[props.valuePropName || 'value']} update={updateRef.current}>
                            {cloneElement(children, childProps)}
                        </MemoInput>
                    );
                } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
                    childNode = children(context);
                } else {
                    devWarning(
                        !mergedName.length,
                        'Form.Item',
                        '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
                    );
                    childNode = children;
                }

                return renderLayout(childNode as React.ReactElement, fieldId, meta, isRequired);
            }}
        </Field>
    );
}

export default FormItem;
