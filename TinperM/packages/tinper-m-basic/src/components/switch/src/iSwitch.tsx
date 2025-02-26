import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React, { ReactNode } from 'react';

export interface SwitchProps extends BaseProps, NativeProps<
  | '--fill-color'
  > {
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  checked?: boolean // 指定当前是否打开
  defaultChecked?: boolean // 初始是否打开
  disabled?: boolean // 禁用状态
  checkedText?: ReactNode // 选中时的内容
  uncheckedText?: ReactNode // 非选中时的内容
  loading?: boolean // 加载状态
  visible?: boolean // 是否可见
  onChange?: (nextChecked: boolean) => void | Promise<void> // 变化时的回调函数，当返回 Promise 时，会自动显示加载状态
  beforeChange?: (nextChecked: boolean) => Promise<void> // 变化前执行
}

