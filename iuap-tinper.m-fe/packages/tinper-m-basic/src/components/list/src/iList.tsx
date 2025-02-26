import { NativeProps } from '@utils/NativeProps'

export interface ListProps extends NativeProps {
  children?: React.ReactNode
  fieldid?: string
  clsPrefix?: string
  className?: string
  header?: React.ReactNode
  mode?: 'default' | 'card'
}

export interface ListItemProps extends NativeProps{
  children?: React.ReactNode
  fieldid?: string
  clsPrefix?: string
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  prefix?: React.ReactNode
  extra?: React.ReactNode
  clickable?: boolean
  arrow?: boolean | React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}
