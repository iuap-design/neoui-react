import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'
export interface ToastProps {
  afterClose?: () => void
  maskStyle?: React.CSSProperties
  maskClassName?: string
  maskClickable?: boolean
  content?: React.ReactNode
  icon?: 'success' | 'fail' | 'loading' | React.ReactNode
  duration?: number
  position?: 'top' | 'bottom' | 'center'
  visible?: boolean
  getContainer?: GetContainer
  stopPropagation?: PropagationEvent[]
  fieldid?: string
  clsPrefix?: string
  className?: string
  singleton?: boolean
}
