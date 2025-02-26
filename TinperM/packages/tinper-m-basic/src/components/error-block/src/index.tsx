import type { ReactNode } from 'react'
import { ErrorBlock } from './ErrorBlock'

export { createErrorBlock } from './CreateErrorBlock'

export type { ErrorBlockProps } from './iErrorBlock'

export type ErrorBlockStatus = 'default' | 'disconnected' | 'failed' | 'denied' | 'error'
export type ImageRecord = Partial<Record<ErrorBlockStatus, string | ReactNode>>

export default ErrorBlock
