import React from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface SpaceProps extends NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'> {
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
  wrap?: boolean
  block?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
  style?: React.CSSProperties,
  className?: string,
  fieldid?: string,
  clsPrefix?: string,
}
