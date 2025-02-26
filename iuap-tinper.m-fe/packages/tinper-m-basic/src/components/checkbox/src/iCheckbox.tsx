import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils/NativeProps'
import React, { ReactNode } from 'react';

export type CheckboxValue = string | number

export interface CheckboxProps extends BaseProps, NativeProps<
  '--icon-size' | '--font-size' | '--gap'
  > {
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  value?: CheckboxValue
  indeterminate?: boolean
  block?: boolean
  id?: string
  icon?: (checked: boolean, indeterminate: boolean) => ReactNode
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
  type?: 'square' | 'circle'
  content?: string
}

export type CheckboxRef = {
  check: () => void
  uncheck: () => void
  toggle: () => void
}

export interface CheckboxGroupProps extends BaseProps
{
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties

  value?: CheckboxValue[]
  onChange?: (val: CheckboxValue[]) => void
  defaultValue?: CheckboxValue[]
  disabled?: boolean
  children?: ReactNode
}
