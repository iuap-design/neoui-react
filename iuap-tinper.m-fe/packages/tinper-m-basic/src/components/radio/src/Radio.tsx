import React, { useContext } from 'react'
import classnames from 'classnames';
import { withNativeProps } from '@utils/NativeProps'
import { RadioGroupContext } from './GroupContext'
import { usePropsValue } from '@hooks/UsePropsValue'
import { CheckIcon } from './CheckIcon'
import { devWarning } from '@utils/DevLog'
import { isDev } from '@utils/IsDev'
import WebUI from '@utils/UpdatePrefixs';

import { NativeInput } from './NativeInput'
import { RadioProps } from './iRadio'

const defaultProps = { defaultChecked: false, }

function Radio (props: RadioProps) {
  const {
    clsPrefix,
    fieldid,
    style={},
    defaultChecked,
    onChange,
    icon,
    onClick,
    block,
    id,
    children,
  } = props;
  const groupContext = useContext(RadioGroupContext)
  let disabled = props.disabled;

  const _clsPrefix = `${clsPrefix}-radio`

  let [checked, setChecked] = usePropsValue<boolean>({
    value: props.checked,
    defaultValue: defaultChecked,
    onChange: onChange,
  }) as [boolean, (v: boolean) => void]

  const { value } = props
  if (groupContext && value !== undefined) {
    if (isDev) {
      if (checked !== undefined) {
        devWarning(
          'Radio',
          'When used within `Radio.Group`, the `checked` prop of `Radio` will not work.'
        )
      }
      if (defaultChecked !== undefined) {
        devWarning(
          'Radio',
          'When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.'
        )
      }
    }

    checked = groupContext.value.includes(value)
    setChecked = (innerChecked: boolean) => {
      if (innerChecked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      onChange?.(innerChecked)
    }
    disabled = disabled || groupContext.disabled
  }

  const renderIcon = () => {
    if (icon) {
      return (
        <div className={`${_clsPrefix}-custom-icon`}>
          {icon(checked)}
        </div>
      )
    }

    return (
      <div className={`${_clsPrefix}-icon`} fieldid={fieldid ? `${fieldid}_radio_icon` : undefined}>{checked && <CheckIcon iconColor="var(--color-bg-selector-selected)" />}</div>
    )
  }

  const cls = classnames(
    _clsPrefix,
    {
      [`${_clsPrefix}-checked`]: checked,
      [`${_clsPrefix}-disabled`]: disabled,
      [`${_clsPrefix}-block`]: block,
    }
  )

  return withNativeProps(
    props,
    <label
      onClick={(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {onClick && onClick(event, checked)}}
      className={cls}
      style={style}
      fieldid={fieldid ? fieldid + '_radio' : undefined}
    >
      <NativeInput
        type='radio'
        checked={checked}
        onChange={setChecked}
        disabled={disabled}
        id={id}
        fieldid={fieldid ? `${fieldid}_radio_input` : undefined}
      />
      {renderIcon()}
      {children && (
        <div className={`${_clsPrefix}-content`}>{children}</div>
      )}
    </label>
  )
}

export default WebUI({ defaultProps })(Radio)
