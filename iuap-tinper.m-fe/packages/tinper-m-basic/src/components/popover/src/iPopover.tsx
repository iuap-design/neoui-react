import type { ReactElement, ReactNode } from 'react';
import { NativeProps } from '@utils/NativeProps';
import { DeprecatedPlacement, Placement } from './index';
import { GetContainer } from '@utils/GetContainer';
import { PropagationEvent } from '@utils/WithStopPropagation';

export interface PopoverProps extends NativeProps<'--z-index' | '--arrow-size'>{
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  getContainer?: GetContainer
  destroyOnHide?: boolean
  children: ReactElement
  mode?: 'light' | 'dark'
  trigger?: 'click'
  placement?: Placement | DeprecatedPlacement
  stopPropagation?: PropagationEvent[]
  clsPrefix?: string
  content: ReactNode
  fieldid?: string

}

export interface PopoverRef {
  show: () => void
  hide: () => void
  visible: boolean
}
