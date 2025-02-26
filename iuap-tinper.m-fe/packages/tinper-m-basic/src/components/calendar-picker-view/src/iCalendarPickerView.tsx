import { NativeProps } from '@utils/NativeProps';
import { Page, DateRange } from './Convert';
import type { ReactNode } from 'react';


type ValueChange<T> = {
  value?: T | null
  defaultValue?: T | null
  onChange?: (val: T | null) => void
}

type SingleSelection = {
  selectionMode: 'single'
} & ValueChange<Date>

type RangeSelection = {
  selectionMode: 'range'
} & ValueChange<[Date, Date]>

type Selection = SingleSelection | RangeSelection

export type CalendarPickerViewProps = {

  title?: React.ReactNode
  weekStartsOn?: 'Monday' | 'Sunday'
  renderDate?: (date: Date) => ReactNode
  renderTop?: (date: Date) => React.ReactNode
  renderBottom?: (date: Date) => React.ReactNode
  allowClear?: boolean
  max?: Date | string
  min?: Date | string
  shouldDisableDate?: (date: Date) => boolean
  fieldid?: string,
  clsPrefix?: string
} & Selection
  & NativeProps
