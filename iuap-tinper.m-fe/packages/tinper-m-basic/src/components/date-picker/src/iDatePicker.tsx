import type { DatePickerFilter, Precision } from './DatePickerUtils'
import type { NativeProps } from '@utils/NativeProps'
import type { ReactNode } from 'react';
import { PickerProps } from '@components/picker/src';
import { PickerActions } from '@components/picker/src/iPicker';

export type RangeDate = (Date|null)[]


type DateValue<T> = T extends true ? RangeDate : (Date | null)

interface InnerDatePickerProps<T extends boolean> extends Pick<
  PickerProps,
  | 'onCancel'
  | 'onClose'
  | 'onDismiss'
  | 'closeOnMaskClick'
  | 'visible'
  | 'confirmText'
  | 'cancelText'
  | 'clearAndReturnText'
  | 'getContainer'
  | 'afterShow'
  | 'afterClose'
  | 'onClick'
  | 'title'
  | 'stopPropagation'
  | 'showClear'
  | 'popupStyle'
  | 'popupClassName'
  | 'loading'
>, NativeProps {
  value?: DateValue<T>
  defaultValue?: DateValue<T>
  onSelect?: (value: DateValue<T>) => void
  onConfirm?: (value: DateValue<T>) => void
  min?: Date | string
  max?: Date | string
  precision?: Precision
  children?: (value:  DateValue<T>, actions: PickerActions) => ReactNode

  renderLabel?: (type: Precision, data: number) => ReactNode
  filter?: DatePickerFilter
  fieldid?: string,
  use12hours?: boolean,
  minuteStep?: number,
  disabled?: boolean,
  clsPrefix?: string,
  type?: 'time' | 'date'

}

export type RangeDatePickerProps = InnerDatePickerProps<true> & {range: true, active?: 'lower' | 'upper', onActiveChange?: (val: 'lower' | 'upper') => void}
export type SingleDatePickerProps = InnerDatePickerProps<false> & {range?: false}
export type DatePickerProps = RangeDatePickerProps | SingleDatePickerProps
