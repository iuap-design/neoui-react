import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React from 'react';

export interface TagProps extends BaseProps, NativeProps<
  | '--background-color'
  | '--border-color'
  | '--border-radius'
  | '--text-color'
  > {
  readOnly?: boolean // true:只读，不能选择 点击无效  false:可设置selected disabled onClick
  label?: string // 文本
  textAlign?: 'left' | 'right' | 'center'
  leftIcon?: string | React.ReactNode
  rightIcon?: string | React.ReactNode
  lineNum?: number
  textLength?: number
  visible?: boolean
  prefix?: string
  suffix?: string
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  className?: string
  style?: React.CSSProperties
  fieldid?: string
  closable?: boolean
  closeIcon?: string | React.ReactNode
  onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  innerStyle?: React.CSSProperties,
  clsPrefix?: string
  disabled?: boolean
  selected?: boolean
  small?: boolean
  round?: boolean
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'message' | 'info' | 'invalid' | 'start'| string
  fill?: 'solid' | 'outline' | 'none' | 'signature'
  onChange?: (selected: boolean) => void
  afterClose?: () => void
  signatureText?: string
}

