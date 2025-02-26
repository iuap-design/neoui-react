import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils/NativeProps'
import React, { ReactNode } from 'react';

export type RadioValue = string | number

export interface RadioProps extends BaseProps, NativeProps<
'--icon-size' | '--font-size' | '--gap'
  > {
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  block?: boolean // 是否渲染为块级元素
  checked?: boolean // 指定当前是否打开
  defaultChecked?: boolean // 初始是否打开
  disabled?: boolean // 禁用状态
  icon?: (checked: boolean) => React.ReactNode // 自定义 icon 图标
  id?: string // input 元素的 id，常用来配合 label 使用
  value?: RadioValue // 携带的标识值，用于 Group 模式
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>, checked:boolean) => void // Radio 的点击事件
  onChange?: (val: boolean) => void // 变化时的回调函数
}

export interface RadioGroupProps extends BaseProps
{
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  block?: boolean // 是否渲染为块级元素

  children?: ReactNode
  defaultValue?: RadioValue | null // 默认选中的选项
  disabled?: boolean // 整组失效
  onChange?: (val: boolean) => void // 变化时的回调函数
  value?: RadioValue | null // 指定选中的选项
}

export interface dataType {
  text: string;
  value: string;
  disabled?: boolean;
}

export type RadioControlProps = Omit<
  RadioProps,
  'value' | 'onChange' | 'onClick'
  > & {
  mode?: 'tag' | 'list' | 'default';
  dataSource?: dataType[];
  onClick?: (data: dataType) => void;
  onSelect?: (data: dataType) => void;
  onChange?: (selectedValue: string[], selectedData: dataType[]) => void;
  value?: string[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  itemsStyle?: React.CSSProperties;
  fieldid?: string;
  title?: string;
  showCloseButton?: boolean;
  contentStyle?: React.CSSProperties;
  clsPrefix?: string;
  mandatorySelection?: boolean;
}
