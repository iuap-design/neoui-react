import React from 'react'
import type { FC, ReactNode } from 'react'
import { mergeProps } from '@utils/WithDefaultProps'
import { CheckboxGroupContext } from './GroupContext'
import { usePropsValue } from '@hooks/UsePropsValue'
import { CheckboxGroupProps } from './iCheckbox'

const defaultProps = {
  disabled: false,
  defaultValue: [],
}

export const Group: FC<CheckboxGroupProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [value, setValue] = usePropsValue(props)

  return (
    <CheckboxGroupContext.Provider
      value={{
        value: value,
        disabled: props.disabled,
        check: v => {
          setValue([...value, v])
        },
        uncheck: v => {
          setValue(value.filter(item => item !== v))
        },
      }}
    >
      {props.children}
    </CheckboxGroupContext.Provider>
  )
}
