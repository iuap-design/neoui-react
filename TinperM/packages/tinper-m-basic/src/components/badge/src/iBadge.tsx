import React from 'react'
import { NativeProps } from '@utils/NativeProps'

const dot = <React.Fragment />

export interface BadgeProps extends NativeProps<
  '--right'
| '--top'
| '--color'
> {
  content?: React.ReactNode | typeof dot
  color?: string
  bordered?: boolean
  children?: React.ReactNode
  wrapperClassName?: string
  wrapperStyle?: React.CSSProperties
  fieldid?: string
  clsPrefix?: string
}
