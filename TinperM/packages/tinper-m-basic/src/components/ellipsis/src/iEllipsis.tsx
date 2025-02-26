import { NativeProps } from '@utils/NativeProps'
import { PropagationEvent } from '@utils/WithStopPropagation'

export interface EllipsisProps extends NativeProps {
  content: string
  direction?: 'start' | 'end' | 'middle'
  rows: number
  expandText?: React.ReactNode
  collapseText?: React.ReactNode
  stopPropagationForActionButtons: PropagationEvent[]
  onContentClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  defaultExpanded?: boolean
  style?: React.CSSProperties,
  className?: string,
  fieldid?: string,
  clsPrefix?: string,
}
