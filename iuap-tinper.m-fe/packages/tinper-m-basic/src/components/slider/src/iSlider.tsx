import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils/NativeProps'
import React, { ReactNode, RefObject } from 'react';

export interface SliderProps extends BaseProps, NativeProps<
  | '--fill-color'
  > {
  // Props
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  disabled?: boolean // 是否禁用组件
  marks?: object  // 刻度标记
  max?: number // 滑块范围最大值
  min?: number // 滑块范围最小值
  range?: boolean // 双游标滑块
  step?: number // 步长
  value?: number // 滑块值
  ticks?: boolean // 是否显示刻度
  defaultValue?: number // 滑块值
  popover?:  boolean | ((value: number) => ReactNode)// 是否在拖动时显示悬浮提示，支持传入函数自定义渲染内容
  residentPopover?: boolean // popover 是否常驻显示，popover 存在时生效
  icon?: ReactNode // 滑块的图标
  handleStyle?: React.CSSProperties // 滑块的样式
  trackStyle?: React.CSSProperties // 选中部分滑动条的样式
  railStyle?: React.CSSProperties // 未选中部分
  onChange?: (value: number) => void // 滑块值变化时触发
  onAfterChange?: (value: number | [number, number]) => void // 与 ontouchend 触发时机一致，把当前值作为参数传入
}

export interface TicksProps {
  clsPrefix: string
  points: number[]
  max: number
  min: number
  upperBound: number
  lowerBound: number
  trackStyle?: React.CSSProperties // 选中部分滑动条的样式
  railStyle?: React.CSSProperties // 未选中部分
  fieldid?: string
}

export interface ThumbProps extends NativeProps {
  clsPrefix: string
  value: number
  min: number
  max: number
  disabled: boolean
  onDrag: (value: number, first: boolean, last: boolean) => void
  trackRef: RefObject<HTMLDivElement>
  icon?: ReactNode
  style?: React.CSSProperties // 滑块的样式
  popover: boolean | ((value: number) => ReactNode)
  residentPopover: boolean
  fieldid?: string
}

export interface SliderMarks {
  [key: number]: ReactNode
}

export interface MarksProps {
  clsPrefix: string
  marks: SliderMarks
  max: number
  min: number
  upperBound: number
  lowerBound: number
  fieldid?: string
}
