import { NativeProps } from '@utils/NativeProps'

type Offset = { x: number; y: number }

export interface FloatingBubbleProps extends NativeProps<
| '--initial-position-left'
| '--initial-position-right'
| '--initial-position-top'
| '--initial-position-bottom'
| '--z-index'
| '--edge-distance'
| '--size'
| '--border-radius'
| '--background'
> {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  axis?: 'x' | 'y' | 'xy' | 'lock'
  magnetic?: 'x' | 'y'
  children?: React.ReactNode
  offset?: Offset
  defaultOffset?: Offset
  onOffsetChange?: (offset: Offset) => void
  className?: string
  style?: React.CSSProperties
  fieldid?: string
  clsPrefix?: string
}
