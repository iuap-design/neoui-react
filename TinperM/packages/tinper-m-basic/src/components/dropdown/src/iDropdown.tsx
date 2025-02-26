import type { ReactNode } from 'react';
import { PopupProps } from '@components/popup/src';
import { NativeProps } from '@utils/NativeProps';

export type DropdownProps = {
  activeKey?: string | null
  defaultActiveKey?: string | null
  closeOnMaskClick?: boolean
  closeOnClickAway?: boolean
  position?: 'top' | 'bottom'
  onChange?: (key: string | null) => void
  arrow?: ReactNode
  getContainer?: PopupProps['getContainer']
  clsPrefix?: string
  label?: boolean
  fieldid?: string
} & NativeProps


export type DropdownRef = {
  close: () => void
}
