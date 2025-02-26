import React, { forwardRef, useContext, useImperativeHandle } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'
import classnames from 'classnames'
import { CheckboxGroupContext } from './GroupContext'
import { usePropsValue } from '@hooks/UsePropsValue'
import { mergeProps } from '@utils/WithDefaultProps'
import { devWarning } from '@utils/DevLog'
import { CheckIcon } from './CheckIcon'
import { IndeterminateIcon } from './IndeterminateIcon'
import { isDev } from '@utils/IsDev'
import WebUI from '@utils/UpdatePrefixs';
import { NativeInput } from './NativeInput'
import { CheckboxProps, CheckboxRef } from './iCheckbox'

const defaultProps = {
  defaultChecked: false,
  indeterminate: false,
  type: 'circle',
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>((p, ref) => {
  const groupContext = useContext(CheckboxGroupContext)

  const props = mergeProps(defaultProps, p)

  let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  }) as [boolean, (v: boolean) => void]
  let disabled = props.disabled

  const { value, className, fieldid } = props
  if (groupContext && value !== undefined) {
    if (isDev) {
      if (p.checked !== undefined) {
        devWarning(
          'Checkbox',
          'When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work.'
        )
      }
      if (p.defaultChecked !== undefined) {
        devWarning(
          'Checkbox',
          'When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.'
        )
      }
    }

    checked = groupContext.value.includes(value)
    setChecked = (checked: boolean) => {
      if (checked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      props.onChange?.(checked)
    }
    disabled = disabled || groupContext.disabled
  }

  useImperativeHandle(ref, () => ({
    check: () => {
      setChecked(true)
    },
    uncheck: () => {
      setChecked(false)
    },
    toggle: () => {
      setChecked(!checked)
    },
  }))

  const renderIcon = () => {
    if (props.icon) {
      return (
        <div className={`${_clsPrefix}-custom-icon`}>
          {props.icon(checked, props.indeterminate)}
        </div>
      )
    }

    const iconClass = classnames(
      `${_clsPrefix}-icon`,
      {
        [`${_clsPrefix}-icon-circle`]: props.type === 'circle',
        [`${_clsPrefix}-icon-square`]: props.type === 'square',
      }
    );

    return (
      <div className={iconClass}>
        {props.indeterminate ? <IndeterminateIcon /> : checked && <CheckIcon />}
      </div>
    )
  }

  const _clsPrefix = `${props.clsPrefix}-checkbox`

  const cls = classnames(
    _clsPrefix,
    {
      [`${_clsPrefix}-checked`]: checked && !props.indeterminate,
      [`${_clsPrefix}-indeterminate`]: props.indeterminate,
      [`${_clsPrefix}-disabled`]: disabled,
      [`${_clsPrefix}-block`]: props.block,
    }
  );

  return withNativeProps(
    props,
    <label
      onClick={props.onClick}
      className={cls}
      fieldid={fieldid}
    >
      <NativeInput
        fieldid={fieldid ? `${fieldid}_input` : undefined}
        type='checkbox'
        clsPrefix={_clsPrefix}
        checked={checked}
        onChange={setChecked}
        disabled={disabled}
        id={props.id}
      />
      {renderIcon()}
      {props.children && (
        <div className={`${_clsPrefix}-content`}>{props.children}</div>
      )}
      {props.content && (
        <div className={`${_clsPrefix}-content`}>{props.content}</div>
      )}
    </label>
  )
})

export default WebUI({ name: 'checkbox', defaultProps })(Checkbox)
