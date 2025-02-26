import React, { useState } from 'react'
import classnames from 'classnames';
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import { useConfig } from '@components/config-provider/src'
import { isPromise } from '@utils/Validate'
import WebUI from '@utils/UpdatePrefixs';
import { SwitchProps } from './iSwitch'
import { SpinIcon } from './SpinIcon'

const defaultProps = {
  defaultChecked: false,
  visible: true,
}

function Switch (props: SwitchProps) {

  const {
    className,
    clsPrefix,
    fieldid,
    style={},
    disabled,
    checkedText,
    uncheckedText,
    loading,
    visible,
    beforeChange
  } = props;

  const _clsPrefix = `${clsPrefix}-switch`

  const disabledValue = disabled || loading || false
  const [changing, setChanging] = useState(false)
  const { locale } = useConfig()

  const [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  })

  async function onClick() {
    console.log('onClick', disabledValue, changing)
    if (disabledValue || changing) {
      return
    }
    const nextChecked = !checked
    if (beforeChange) {
      setChanging(true)
      try {
        await beforeChange(nextChecked)
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
    console.log('nextChecked', nextChecked)

    const result = setChecked(nextChecked)
    console.log('result', result)

    if (isPromise(result)) {
      setChanging(true)
      try {
        await result
        setChanging(false)
      } catch (e) {
        setChanging(false)
        throw e
      }
    }
  }

  console.log('checked', checked)
  const cls = classnames(
    className,
    _clsPrefix,
    { [`${_clsPrefix}-checked`]: checked, },
    { [`${_clsPrefix}-disabled`]: disabledValue || changing, },
    { [`${_clsPrefix}-hidden`]: !visible, },
  )

  return withNativeProps(
    props,
    <div
      onClick={onClick}
      className={cls}
      style={style}
      fieldid={fieldid}
      role='switch'
      aria-label={locale.Switch.name}
      aria-checked={checked}
      aria-disabled={disabledValue}
    >
      <div className={`${_clsPrefix}-checkbox`}>
        <div className={`${_clsPrefix}-handle`}>
          {(loading || changing) && (
            <SpinIcon className={`${_clsPrefix}-spin-icon`} />
          )}
        </div>
        <div className={`${_clsPrefix}-inner`}>
          {checked ? checkedText : uncheckedText}
        </div>
      </div>
    </div>
  )
}

export default WebUI({ name: 'switch', defaultProps })(Switch)
