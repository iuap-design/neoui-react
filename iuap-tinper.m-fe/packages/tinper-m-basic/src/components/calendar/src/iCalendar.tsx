import type { ReactNode } from 'react';
import { Page } from '@components/calendar/src/Convert';
import { NativeProps } from '@utils/NativeProps';

type ValueChange<T> = {
  value?: T | null
  defaultValue?: T | null
  onChange?: (val: T | null, current?: Date) => void
}

type SingleSelection = {
  selectionMode?: 'single'
} & ValueChange<Date>

type RangeSelection = {
  selectionMode?: 'range'
} & ValueChange<[Date, Date]>



type Selection = SingleSelection | RangeSelection

export type CalendarProps = {
  prevMonthButton?: ReactNode
  prevYearButton?: ReactNode
  nextMonthButton?: ReactNode
  nextYearButton?: ReactNode
  onPageChange?: (year: number, month: number) => void
  weekStartsOn?: 'Monday' | 'Sunday'
  renderLabel?: (date: Date) => ReactNode
  renderDate?: (date: Date) => ReactNode
  allowClear?: boolean
  max?: Date
  min?: Date
  shouldDisableDate?: (date: Date) => boolean
  minPage?: Page
  maxPage?: Page
  fieldid?: string,
  clsPrefix?: string
  mode?: 'month' | 'quarter' | 'day'
  showWeekNumber?: boolean
  formatWeekNumber?: (weekNumber: number) => ReactNode
} & Selection
  & NativeProps
