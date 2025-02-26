import { FieldNamesType } from '@hooks/UseFieldNames';
import { NativeProps } from '@utils/NativeProps';
import type { ReactNode } from 'react';
import { BaseOptionType } from '@hooks/index';
import { GridProps } from '@components/grid/src';

export type SelectorProps<V> = {
  options: SelectorOption<V>[]
  columns?: GridProps['columns']
  multiple?: boolean
  disabled?: boolean
  defaultValue?: V[]
  value?: V[]
  onChange?: (v: V[], extend: { items: SelectorOption<V>[] }) => void
  showCheckMark?: boolean
  fieldNames?: FieldNamesType
  clsPrefix?: string
  widthAdjustment?: 'fixed' | 'auto' | 'equal'
  fieldid?: string
} & NativeProps<
  | '--color'
  | '--checked-color'
  | '--text-color'
  | '--checked-text-color'
  | '--border'
  | '--checked-border'
  | '--border-radius'
  | '--padding'
  | '--gap'
  | '--gap-vertical'
  | '--gap-horizontal'
  | '--item-width'
  | '--flex'
>


export type SelectorValue = string | number

export type SelectorOption<V> = {
  label?: ReactNode
  description?: ReactNode
  value?: V
  disabled?: boolean
} & BaseOptionType


type SelectorPropsCoverage = {
  options: any
  columns?: GridProps['columns']
  multiple?: boolean
  disabled?: boolean
  defaultValue?: any
  value?: any
  onChange?: any
    showCheckMark ?: boolean
  fieldNames?: FieldNamesType
  clsPrefix?: string
  widthAdjustment?: 'fixed' | 'auto' | 'equal'
  fieldid?: string
}
