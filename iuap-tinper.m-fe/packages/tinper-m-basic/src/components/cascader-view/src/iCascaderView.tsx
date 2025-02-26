import { ReactNode } from 'react';
import { NativeProps } from '@utils/NativeProps';
import type { BaseOptionType, FieldNamesType } from '@/hooks';

export type CascaderValue = string

export type CascaderOption = {
  label?: string
  value?: string
  disabled?: boolean
  children?: CascaderOption[]
} & BaseOptionType

export type CascaderValueExtend = {
  items: (CascaderOption | null)[]
  isLeaf: boolean
}

export interface CascaderViewProps extends NativeProps<'--height'> {
  options: CascaderOption[]
  value?: CascaderValue[]
  defaultValue?: CascaderValue[]
  onChange?: (value: CascaderValue[], extend: CascaderValueExtend) => void
  placeholder?: string | ((index: number) => string)
  onTabsChange?: (index: number) => void
  activeIcon?: ReactNode
  loading?: boolean
  fieldNames?: FieldNamesType
  clsPrefix?: string
  fieldid?: string
}
