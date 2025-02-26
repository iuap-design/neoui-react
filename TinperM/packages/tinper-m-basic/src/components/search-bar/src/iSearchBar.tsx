export interface SearchProps {
  value?: string;
  defaultValue?: string;
  clsPrefix?: string
  className?: string
  style?: any
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  cancelText?: string
  clearOnCancel?: boolean
  onlyShowClearWhenFocus?: boolean
  clearable?: boolean
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRightIn?: boolean
  fieldid?: string;
  autoFocus?: boolean
  showCancelButton?: () => boolean | boolean
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  onCancel?: () => void;
  onSubmit?: (value?: string) => void;
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: (value: string) => void;
}
