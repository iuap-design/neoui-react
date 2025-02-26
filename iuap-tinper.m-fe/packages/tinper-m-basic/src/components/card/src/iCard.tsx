import { NativeProps } from '@utils/NativeProps'


export interface CardProps extends NativeProps {
  title?: React.ReactNode
  extra?: React.ReactNode
  headerStyle?: React.CSSProperties
  headerClassName?: string
  bodyStyle?: React.CSSProperties
  bodyClassName?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onBodyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onHeaderClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties
}
