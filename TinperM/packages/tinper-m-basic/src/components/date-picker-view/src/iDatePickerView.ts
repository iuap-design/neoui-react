import type { ReactNode } from 'react'
import { DatePickerFilter, Precision } from '@components/date-picker/src/DatePickerUtils';
import { NativeProps } from '@utils/NativeProps';
import { PickerDate } from '@components/picker/src/util';
import { PickerViewProps } from '@components/picker-view/src';

export type RenderLabel = (type: Precision | 'now', data: number) => ReactNode

export type DatePickerViewProps = Pick<
  PickerViewProps,
  'style' | 'mouseWheel' | 'loading' | 'loadingContent'
> & {
  value?: PickerDate
  defaultValue?: PickerDate
  onChange?: (value: PickerDate) => void
  min?: PickerDate
  max?: PickerDate
  precision?: Precision
  renderLabel?: RenderLabel
  filter?: DatePickerFilter
  type?: 'date' | 'time',
  use12hours?: boolean,
  minuteStep?: number,

} & NativeProps
