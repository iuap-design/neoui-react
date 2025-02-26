import React from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface ProgressCircleProps extends NativeProps<'--size' | '--track-width' | '--track-color' | '--fill-color'>{
  percent?: number
  children?: React.ReactNode
  fieldid?: string
  className: string
  clsPrefix?: string
  style: object
}
