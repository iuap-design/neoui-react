import { NativeProps } from '@utils/NativeProps'

export interface PageIndicatorProps extends NativeProps {
  total: number
  current: number
  direction?: 'horizontal' | 'vertical'
  color?: 'primary' | 'white'
  fieldid?: string
  className: string
  clsPrefix?: string
  style: object
}
