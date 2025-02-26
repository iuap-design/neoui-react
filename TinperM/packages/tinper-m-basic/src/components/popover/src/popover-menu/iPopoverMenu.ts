import { CSSProperties, ReactNode } from 'react';
import type { PopoverProps } from '../index';

export type Action = {
  text: ReactNode
  icon?: ReactNode
  disabled?: boolean
  key?: string | number
  style?: CSSProperties,
  className?: string
  onClick?: () => void
}

export type PopoverMenuProps = Omit<PopoverProps, 'content'> & {
  actions: Action[]
  maxCount?: number
  onAction?: (item: Action) => void
}
