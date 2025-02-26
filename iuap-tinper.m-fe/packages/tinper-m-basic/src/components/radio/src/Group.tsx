import React from 'react'
import { RadioGroupContext } from './GroupContext'
import { usePropsValue } from '@hooks/UsePropsValue'
import WebUI from '@utils/UpdatePrefixs';

import { RadioGroupProps } from './iRadio'

const defaultProps = {
  disabled: false,
  defaultValue: null,
}

function Group (props: RadioGroupProps) {
  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  return (
    <RadioGroupContext.Provider
      value={{
        value: value === null ? [] : [value],
        check: v => {
          setValue(v)
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        uncheck: () => {},
        disabled: props.disabled || false,
      }}
    >
      {props.children}
    </RadioGroupContext.Provider>
  )
}

export default WebUI({ defaultProps })(Group)
