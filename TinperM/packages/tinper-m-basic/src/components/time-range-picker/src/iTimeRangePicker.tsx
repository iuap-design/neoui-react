import { RangeDate, RangeDatePickerProps } from '@components/date-picker/src/iDatePicker';
import { GetContainer } from '@utils/RenderToContainer'

type InnerRangeDate = Array<Date | string>

export type DateMode =
  | 'year'
  | 'month'
  | 'day'
  | 'minute'
  | 'second'
  | 'time'
  | 'hms'

export type TimeRangePickerProps = {
    minDate?: Date | string
    maxDate?: Date | string
    mode?: 'year' | 'month' | 'day' | 'minute' | 'second' | 'week' | 'time' | 'hms'
    disabled?: boolean
    onDismiss?: () => void
    onOk?: (date: RangeDate) => void
    popTitle?: string
    placeholder?: string
    onClearReturn?: () => void;
    readOnly?: boolean;
    value?: InnerRangeDate,
    defaultValue?: InnerRangeDate,
    getContainer?: GetContainer;
  }
  & Omit<RangeDatePickerProps, 'value' | 'defaultValue' | 'range'>
