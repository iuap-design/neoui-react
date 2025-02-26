import { NativeProps } from '@utils/NativeProps'
import type { ErrorBlockStatus } from '.'

export interface ErrorBlockProps extends NativeProps<
| '--image-height'
| '--image-height-full-page'
| '--image-width'
| '--image-width-full-page'
>{
  status?: ErrorBlockStatus
  title?: React.ReactNode
  image?: string | React.ReactElement
  description?: React.ReactNode
  fullPage?: boolean
  children?: React.ReactNode
  clsPrefix?: string
  fieldid?: string
}
