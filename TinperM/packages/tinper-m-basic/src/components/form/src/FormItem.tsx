import React, { useContext, useCallback, useState, useRef } from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { Field } from 'rc-field-form'
import FieldContext from 'rc-field-form/lib/FieldContext'
import type { Meta, InternalNamePath } from 'rc-field-form/lib/interface'
import { devWarning } from '@utils/DevLog'
import { FormContext, NoStyleItemContext, MemoInputProps, FormItemLayoutProps, FormItemProps, RenderChildren } from './iForm'
import { toArray, isSafeSetRefComponent } from '@utils/FormUtil'
import List from '../../list/src/index'
import Popover from '../../popover/src/index'
import QuestionMarkCircle from '@tinper/m-icons/lib/cjs/QuestionMarkCircle'
import { useConfig } from '@components/config-provider/src/index';
import { undefinedFallback } from '@utils/UndefinedFallback'
import WebUI from '@utils/UpdatePrefixs'
import ExclamationMark from '@tinper/m-icons/lib/cjs/ExclamationMark'

const ErrorIcon = () => <div style={{width: '0.32rem', height: '0.32rem', background: 'var(--ynfm-color-bg-verification-formitemwrapper, #F50C001A)', borderRadius: '50%', overflow: 'hidden', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
  <ExclamationMark style={{width: '0.16rem', height: '0.16rem', color: 'var(--mui-color-danger)'}}  />
</div>

const NAME_SPLIT = '__SPLIT__'

const MemoInput = React.memo(
  ({ children }: MemoInputProps) => children as JSX.Element,
  (prev, next) => prev.value === next.value && prev.update === next.update
)

const FormItemLayout: React.FC<FormItemLayoutProps> = props => {
  const {
    style,
    extra,
    label,
    help,
    required,
    children,
    htmlFor,
    hidden,
    arrow,
    childElementPosition = 'normal',
    clsPrefix,
    fieldid,
    requiredPosition
  } = props
  const context = useContext(FormContext)

  const { locale } = useConfig()
  const hasFeedback =
    props.hasFeedback !== undefined ? props.hasFeedback : context.hasFeedback
  const layout = props.layout || context.layout
  const disabled = props.disabled ?? context.disabled

  const requiredMark = (() => {
    const { requiredMarkStyle } = context
    switch (requiredMarkStyle) {
      case 'asterisk':
        return (
          required && (
            <span className={`${clsPrefix}-required-asterisk`}>*</span>
          )
        )
      case 'text-required':
        return (
          required && (
            <span className={`${clsPrefix}-required-text`}>
              ({locale.Form.required})
            </span>
          )
        )
      case 'text-optional':
        return (
          !required && (
            <span className={`${clsPrefix}-required-text`}>
              ({locale.Form.optional})
            </span>
          )
        )
      case 'none':
        return null
      default:
        return null
    }
  })()
  const requiredP = (requiredPosition || context.requiredPosition) === 'left';
  const labelElement = !!label && (
    <label className={classNames(`${clsPrefix}-label`, requiredP && `${clsPrefix}-label-left`)} htmlFor={htmlFor} fieldid={fieldid ? fieldid + '_form_item_label' : undefined}>
      {label}
      {requiredMark}
      {help && (
        <Popover content={help} mode='dark' trigger='click'>
          <span
            className={`${clsPrefix}-label-help`}
            fieldid={fieldid ? fieldid + '_form_item_label_help' : undefined}
            onClick={e => {
              e.preventDefault()
            }}
            style={{ marginLeft: (requiredMark && !requiredP && context.requiredMarkStyle === 'asterisk') ? '0.16rem' : 'unset' }}
          >
            <QuestionMarkCircle />
          </span>
        </Popover>
      )}
    </label>
  )

  const description = (!!props.description) && (
    <>
      {props.description}
    </>
  )

  const formList = withNativeProps(
    props,
    <List.Item
      style={style}
      title={layout === 'vertical' && labelElement}
      prefix={layout === 'horizontal' && labelElement}
      extra={extra}
      description={description}
      className={classNames(clsPrefix, `${clsPrefix}-${layout}`, {
        [`${clsPrefix}-hidden`]: hidden,
        [`${clsPrefix}-has-error`]: props.errors.length,
        [`${clsPrefix}-has-feedback-error-icon`]: hasFeedback && props.showErrorIcon && props.errors?.length !== 0
      })}
      fieldid={fieldid ? fieldid + '_form_item' : undefined}
      disabled={disabled}
      onClick={props.onClick}
      clickable={props.clickable}
      arrow={arrow}
    >
      <div
        className={classNames(
          `${clsPrefix}-child`,
          `${clsPrefix}-child-position-${childElementPosition}`
        )}
        fieldid={fieldid ? fieldid + '_form_item_child' : undefined}
      >
        <div className={classNames(`${clsPrefix}-child-inner`)}>
          {children}
        </div>
      </div>
    </List.Item>
  )

  return (
    <div style={{ position: 'relative' }} className={`${clsPrefix}-list-wrapper`}>
      {formList}
      {hasFeedback && props.showErrorIcon && props.errors?.length !== 0 && (
        <div className={`${clsPrefix}-feedback-error-icon`} style={{ ...props.rightErrorIconStyle }}>
        {
          props.rightIcon ? props.rightIcon : <ErrorIcon />
        }
      </div>
      )}
      {hasFeedback && !(props.showFeedbackError === false) && (
        <>
          {props.errors.map((error, index) => (
            <div
              key={`error-${index}`}
              className={`${clsPrefix}-feedback-error`}
            >
              {error}
            </div>
          ))}
          {props.warnings.map((warning, index) => (
            <div
              key={`warning-${index}`}
              className={`${clsPrefix}-feedback-warning`}
            >
              {warning}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

const FormItem: React.FC<FormItemProps> = props => {
  const {
    // 样式相关
    style,
    // FormItem 相关
    label,
    help,
    extra,
    hasFeedback,
    name,
    required,
    noStyle,
    hidden,
    layout,
    childElementPosition,
    description,
    // Field 相关
    disabled,
    rules,
    children,
    messageVariables,
    trigger = 'onChange',
    validateTrigger = trigger,
    onClick,
    shouldUpdate,
    dependencies,
    clickable,
    arrow,
    clsPrefix,
    fieldid,
    requiredPosition,
    ...fieldProps
  } = props

  const _clsPrefix = `${clsPrefix}-form-item`
  const { name: formName } = useContext(FormContext)
  const { validateTrigger: contextValidateTrigger } = useContext(FieldContext)

  const mergedValidateTrigger = undefinedFallback(
    validateTrigger,
    contextValidateTrigger,
    trigger
  )

  const widgetRef = useRef<any>(null)

  const updateRef = useRef(0)
  updateRef.current += 1

  const [subMetas, setSubMetas] = useState<Record<string, Meta>>({})
  const onSubMetaChange = useCallback(
    (subMeta: Meta & { destroy?: boolean }, namePath: InternalNamePath) => {
      setSubMetas(prevSubMetas => {
        const nextSubMetas = { ...prevSubMetas }
        const nameKey = namePath.join(NAME_SPLIT)
        if (subMeta.destroy) {
          delete nextSubMetas[nameKey]
        } else {
          nextSubMetas[nameKey] = subMeta
        }
        return nextSubMetas
      })
    },
    [setSubMetas]
  )

  function renderLayout(
    baseChildren: ReactNode,
    fieldId?: string,
    meta?: Meta,
    isRequired?: boolean
  ) {

    if (noStyle && !hidden) {
      return baseChildren
    }

    const curErrors = meta?.errors ?? []
    const errors = Object.keys(subMetas).reduce(
      (subErrors: string[], key: string) => {
        const errors = subMetas[key]?.errors ?? []
        if (errors.length) {
          subErrors = [...subErrors, ...errors]
        }
        return subErrors
      },
      curErrors
    )
    const curWarnings = meta?.warnings ?? []
    const warnings = Object.keys(subMetas).reduce(
      (subWarnings: string[], key: string) => {
        const warnings = subMetas[key]?.warnings ?? []
        if (warnings.length) {
          subWarnings = [...subWarnings, ...warnings]
        }
        return subWarnings
      },
      curWarnings
    )

    return withNativeProps(
      props,
      <FormItemLayout
        style={style}
        label={label}
        extra={extra}
        help={help}
        description={description}
        required={isRequired}
        disabled={disabled}
        hasFeedback={hasFeedback}
        htmlFor={fieldId}
        errors={errors}
        warnings={warnings}
        showErrorIcon={props.showErrorIcon}
        showFeedbackError={props.showFeedbackError}
        rightIcon={props.rightIcon}
        rightErrorIconStyle={props.rightErrorIconStyle}
        onClick={onClick && ((e: React.MouseEvent<Element, MouseEvent>) => onClick(e, widgetRef))}
        hidden={hidden}
        layout={layout}
        childElementPosition={childElementPosition}
        clickable={clickable}
        arrow={arrow}
        clsPrefix={_clsPrefix}
        fieldid={fieldid}
        requiredPosition={requiredPosition}
      >
        <NoStyleItemContext.Provider value={onSubMetaChange}>
          {baseChildren}
        </NoStyleItemContext.Provider>
      </FormItemLayout>
    )
  }

  const isRenderProps = typeof children === 'function'

  if (!name && !isRenderProps && !props.dependencies) {
    return renderLayout(children) as JSX.Element
  }

  let Variables: Record<string, string> = {}
  Variables.label = typeof label === 'string' ? label : ''
  if (messageVariables) {
    Variables = { ...Variables, ...messageVariables }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const notifyParentMetaChange = useContext(NoStyleItemContext)
  const onMetaChange = (meta: Meta & { destroy?: boolean }) => {
    if (noStyle && notifyParentMetaChange) {
      const namePath = meta.name
      notifyParentMetaChange(meta, namePath)
    }
  }

  return (
    <Field
      {...fieldProps}
      name={name}
      shouldUpdate={shouldUpdate}
      dependencies={dependencies}
      rules={rules}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onMetaChange={onMetaChange}
      messageVariables={Variables}
    >
      {(control: { [x: string]: any }, meta: any, context: any) => {
        let childNode: ReactNode = null
        const isRequired =
          required !== undefined
            ? required
            : rules &&
            rules.some(
              (rule) => !!(rule && typeof rule === 'object' && rule.required)
            )

        const nameList = toArray(name).length && meta ? meta.name : []
        const fieldId = (
          nameList.length > 0 && formName ? [formName, ...nameList] : nameList
        ).join('_')

        if (shouldUpdate && dependencies) {
          devWarning(
            'Form.Item',
            '`shouldUpdate` and `dependencies` shouldn\'t be used together.'
          )
        }

        if (isRenderProps) {
          if ((shouldUpdate || dependencies) && !name) {
            childNode = (children as RenderChildren)(context)
          } else {
            if (!(shouldUpdate || dependencies)) {
              devWarning(
                'Form.Item',
                '`children` of render props only work with `shouldUpdate` or `dependencies`.'
              )
            }
            if (name) {
              devWarning(
                'Form.Item',
                'Do not use `name` with `children` of render props since it\'s not a field.'
              )
            }
          }

          // not render props
        } else if (dependencies && !name) {
          devWarning(
            'Form.Item',
            'Must set `name` or use render props when `dependencies` is set.'
          )
        } else if (React.isValidElement(children)) {
          if (children.props.defaultValue) {
            devWarning(
              'Form.Item',
              '`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.'
            )
          }
          const childProps = { ...children.props, ...control }

          if (isSafeSetRefComponent(children)) {
            childProps.ref = (instance: any) => {
              const originRef = (children as any).ref
              if (originRef) {
                if (typeof originRef === 'function') {
                  originRef(instance)
                }
                if ('current' in originRef) {
                  originRef.current = instance
                }
              }
              widgetRef.current = instance
            }
          }

          if (!childProps.id) {
            childProps.id = fieldId
          }

          // We should keep user origin event handler
          const triggers = new Set<string>([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger),
          ])

          triggers.forEach(eventName => {
            childProps[eventName] = (...args: any[]) => {
              control[eventName]?.(...args)
              children.props[eventName]?.(...args)
            }
          })

          childNode = (
            <MemoInput
              value={control[props.valuePropName || 'value']}
              update={updateRef.current}
            >
              {React.cloneElement(children, childProps)}
            </MemoInput>
          )
        } else {
          if (name) {
            devWarning(
              'Form.Item',
              '`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
            )
          }
          childNode = children
        }

        return renderLayout(childNode, fieldId, meta, isRequired)
      }}
    </Field>
  )
}

export default WebUI({})(FormItem)
