import type { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface TextAreaProps extends NativeProps<
  | '--color'
  | '--count-text-align'
  | '--disabled-color'
  | '--font-size'
  | '--placeholder-color'
  | '--text-align'
> {
  onChange?: (val: string) => void
  onFocus?: (value: string) => void
  onBlur?: (value: string) => void
  value?: string
  defaultValue?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  showCount?: boolean | ((length: number, maxLength?: number) => ReactNode)
  autoSize?:
    | boolean
    | {
        minRows?: number
        maxRows?: number
      }
  id?: string
  fieldid?: string,
  clsPrefix?: string,
  isHTML?: boolean,
  autoFocus?: boolean,
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void,
  name?: string,
  disabled?: boolean,
  readOnly?: boolean,
  onCompositionStart?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void,
  onCompositionEnd?: (e: React.CompositionEvent<HTMLTextAreaElement>) => void,
  autoComplete?: string,
  showClose?: boolean,
  onClickClear?: (value: string) => void,
}

export type TextAreaRef = {
  clear: () => void
  focus: () => void
  blur: () => void
}