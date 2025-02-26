import type  { NativeProps } from '@utils/NativeProps';
import type { ReactNode } from 'react';

export type RateProps = {
  allowClear?: boolean
  allowHalf?: boolean
  character?: ReactNode
  count?: number
  defaultValue?: number
  readOnly?: boolean
  value?: number
  onChange?: (value: number) => void
  fieldid?: string
  clsPrefix?: string
  disabled?: boolean
} & NativeProps<
  | '--star-size'
  | '--active-color'
  | '--inactive-color'
  | '--inactive-color-half'
>
