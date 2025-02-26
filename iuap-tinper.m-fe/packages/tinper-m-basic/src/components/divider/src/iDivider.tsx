import { NativeProps } from '@utils/NativeProps'

export interface DividerProps extends NativeProps {
  contentPosition?: 'left' | 'right' | 'center'
  direction?: 'horizontal' | 'vertical'
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
  fieldid?: string
  visible?: boolean
}
