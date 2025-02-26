import { PickerProps } from '@components/picker/src';
import { NativeProps } from '@utils/NativeProps';
import { GetContainer } from '@utils/RenderToContainer'

export type TimeMode = 'HH:mm' | 'HH:mm:ss'

export type TimePickerProps = {
  hourStep?: number; // 小时步长
  minuteStep?: number; // 分钟步长
  secondStep?: number; // 秒步长
  use12Hours?: boolean; // 是否12小时制
  subuitype?: TimeMode; // 时间选择格式
  defaultValue?: Date | string | null; // 默认值
  value?: Date | string | null; // 默认值
  placeholder?: string; // 缺省文本
  popTitle?: string; // 时间控件 弹窗的title
  disabled?: boolean; // 禁用
  readOnly?: boolean;
  onDismiss?: () => void;
  onClearReturn?: () => void;
  onOk?: (time: Date  | null) => void; // 确认按钮
  format?: (date: Date | string  | null) => string;
  fieldid?: string;
  clsPrefix?: string;
  getContainer?: GetContainer;
  showClear?: boolean;
} & NativeProps & Pick<PickerProps, 'popupClassName' | 'popupStyle'>;
