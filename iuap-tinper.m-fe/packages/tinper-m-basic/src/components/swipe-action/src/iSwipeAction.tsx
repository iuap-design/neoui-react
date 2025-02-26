import type { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'
import { PropagationEvent } from '@utils/WithStopPropagation'

type SideType = 'left' | 'right'

export interface SwipeActionRef {
  close: () => void
  show: (side?: SideType) => void
}

type ActionColor =
  | 'light'
  | 'weak'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

export interface Action {
  key: string | number
  text: ReactNode
  color?: ActionColor | string
  onClick?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
  className?: string,
  icon?: ReactNode | string,
  iconPosition?: 'top' | 'right' | 'bottom' | 'left'
}

export interface SwipeActionProps extends NativeProps<'--background'> {
  rightActions?: Action[]
  leftActions?: Action[]
  onAction?: (action: Action, e: React.MouseEvent) => void
  closeOnTouchOutside?: boolean
  closeOnAction?: boolean
  children: ReactNode
  stopPropagation?: PropagationEvent[]
  onActionsReveal?: (side: SideType) => void,
  clsPrefix?: string,
  fieldid?: string,
  disabled?: boolean
}