import { NativeProps } from '@utils/NativeProps'

export interface GridProps extends NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'> {
  columns: number
  gap?: number | string | [number | string, number | string]
  children?: React.ReactNode
  fieldid?: string
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
}

export interface GridItemProps extends NativeProps {
  span?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: React.ReactNode
  fieldid?: string
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
}
