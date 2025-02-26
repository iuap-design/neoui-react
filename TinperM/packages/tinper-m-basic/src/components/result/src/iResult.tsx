import { NativeProps } from '@utils/NativeProps'

export interface ResultProps extends NativeProps {
  status?: 'success' | 'error' | 'info' | 'waiting' | 'warning'
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
  fieldid?: string
}
