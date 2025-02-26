import { NativeProps } from '@utils/NativeProps';
import { GetContainer } from '@utils/RenderToContainer'

export type DateMode =
  | 'year'
  | 'month'
  | 'day'
  | 'minute'
  | 'second'
  | 'time'
  | 'hms'

export type DateTimePickerProps = {
  popTitle?: string;
  placeholder?: string;
  minDate?: Date | string | null;
  maxDate?: Date | string | null;
  defaultValue?: Date | string;
  value?: Date | string;
  mode?: DateMode;
  disabled?: boolean;
  readOnly?: boolean;
  onDismiss?: () => void;
  onClearReturn?: () => void;
  onOk?: (dateTime: Date | null) => void;
  fieldid?: string;
  clsPrefix?: string;
  use12Hours?: boolean;
  format?: (date: Date | string | null) => string;
  minuteStep?: number;
  onChange?: (dateTime: Date | null) => void;
  getContainer?: GetContainer;
} & NativeProps;
