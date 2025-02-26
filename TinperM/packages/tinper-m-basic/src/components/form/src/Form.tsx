import React, { useMemo } from 'react'
import type { ReactNode, ForwardedRef } from 'react'
import classNames from 'classnames'
import List from '../../list/src/index'
import RcForm from 'rc-field-form'
import type { FormInstance as RCFormInstance, } from 'rc-field-form'
import { defaultFormContext, FormContext, FormInstance, FormProps } from './iForm'
import { mergeProps } from '@utils/WithDefaultProps'
import { Header } from './Header'
import { useConfig } from '@components/config-provider/src/index';
import merge from 'lodash/merge'
import FormArray from './FormArray'
import { traverseReactNode } from '@utils/TraverseReactNode'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = defaultFormContext

const Form = React.forwardRef<FormInstance, FormProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const {
    className,
    style,
    hasFeedback,
    children,
    layout,
    footer,
    mode,
    disabled,
    requiredMarkStyle,
    requiredPosition,
    clsPrefix,
    fieldid,
    ...formProps
  } = props

  const { locale } = useConfig()
  const _clsPrefix = `${clsPrefix}-form`

  const validateMessages = useMemo(
    () =>
      merge(
        {},
        locale.Form.defaultValidateMessages,
        formProps.validateMessages
      ),
    [locale.Form.defaultValidateMessages, formProps.validateMessages]
  )

  const lists: ReactNode[] = []

  let currentHeader: ReactNode = null
  let items: ReactNode[] = []
  let count = 0

  function collect() {
    if (items.length === 0) return
    count += 1
    lists.push(
      <List header={currentHeader} key={count} mode={mode} style={{ '--border-top': 'unset', '--border-bottom': 'unset' }}>
        {items}
      </List>
    )
    items = []
  }

  traverseReactNode(props.children as ReactNode, child => {
    if (React.isValidElement(child)) {
      if (child.type === Header) {
        collect()
        currentHeader = child.props.children
        return
      }
      if (child.type === FormArray) {
        collect()
        lists.push(child)
        return
      }
    }
    items.push(child)
  })
  collect()

  return (
    <RcForm
      className={classNames(_clsPrefix, className)}
      fieldid={fieldid ? fieldid + '_form' : undefined}
      style={style}
      ref={ref as ForwardedRef<RCFormInstance>}
      {...formProps}
      validateMessages={validateMessages}
    >
      <FormContext.Provider
        value={{
          name: formProps.name,
          hasFeedback,
          layout,
          requiredMarkStyle,
          requiredPosition,
          disabled,
        }}
      >
        {lists}
      </FormContext.Provider>
      {footer && <div className={`${_clsPrefix}-footer`} fieldid={fieldid ? fieldid + '_form_footer' : undefined}>{footer}</div>}
    </RcForm>
  )
})

export default WebUI({ defaultProps })(Form)
