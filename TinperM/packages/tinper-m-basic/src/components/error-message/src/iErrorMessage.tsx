import { NativeProps } from '@utils/NativeProps'
import { GetContainer } from '@utils/RenderToContainer'

export interface ErrorMessageProps extends NativeProps {
  className?: string
  style?: React.CSSProperties
  clsPrefix?: string
  fieldid?: string
  visible?: boolean
  closeOnMaskClick?: boolean
  onClose?: () => void
  message?: React.ReactNode
  errorInfo?: string
  traceId?: string
  onUploadClick?: () => void
  onCodeClick?: () => void
  detailMsg?: React.ReactNode
  uploadable?: boolean
  getContainer?: GetContainer
  afterClose?: () => void
}