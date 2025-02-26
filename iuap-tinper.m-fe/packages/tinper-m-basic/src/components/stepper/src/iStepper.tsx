import { NativeProps } from '@utils/NativeProps'
import { InputProps, InputRef } from '../../input/src/iInput'


type ValueProps<ValueType> = {
  allowEmpty: true
  value?: ValueType | null
  defaultValue?: ValueType | null
  onChange?: (value: ValueType | null) => void
}

type ValuePropsWithNull<ValueType> = {
  allowEmpty?: false
  value?: ValueType
  defaultValue?: ValueType
  onChange?: (value: ValueType) => void
}

export type BaseStepperProps<ValueType> = Pick<
  InputProps,
  'onFocus' | 'onBlur'
> &
  (ValuePropsWithNull<ValueType> | ValueProps<ValueType>) & {
  min?: ValueType
  max?: ValueType
  step?: ValueType
  digits?: number
  disabled?: boolean
  inputReadOnly?: boolean
  clsPrefix?: string
  fieldid?: string

  // Format & Parse
  parser?: (text: string) => ValueType
  formatter?: (value?: ValueType) => string
} & NativeProps<
  | '--height'
  | '--input-width'
  | '--input-font-size'
  | '--input-background-color'
  | '--border-radius'
  | '--border'
  | '--border-inner'
  | '--active-border'
  | '--button-font-size'
  | '--button-background-color'
  | '--button-width'
  | '--input-font-color'
  | '--button-text-color'
>

export type NumberStepperProps = BaseStepperProps<number> & {
  // stringMode
  handleBtnClick?: (type: string, value?: number | string) => void; // 加减按钮点击回调
  stringMode?: false
}
export type StringStepperProps = BaseStepperProps<string> & {
  // stringMode
  handleBtnClick?: (type: string, value?: number | string) => void; // 加减按钮点击回调
  stringMode: true
}

export type StepperProps = NumberStepperProps | StringStepperProps

export type StepperRef = Pick<InputRef, 'blur' | 'focus' | 'nativeElement'>

type DEFAULT_PROPS = 'step'
export type MergedStepperProps<ValueType> = Omit<
  BaseStepperProps<ValueType>,
  DEFAULT_PROPS
> &
  Required<Pick<BaseStepperProps<ValueType>, DEFAULT_PROPS>> & {
  stringMode?: boolean
  handleBtnClick?: (type: string, value?: number | string) => void; // 加减按钮点击回调
}

type StepperPropsCoverage = {
  allowEmpty: true
  value?: any
  defaultValue?: any
  onChange?: (value:any) => void
  min?: any
  max?: any
  step?: any
  digits?: number
  disabled?: boolean
  inputReadOnly?: boolean
  clsPrefix?: string
  fieldid?: string
  parser?: (text: string) => any
  formatter?: (value?: any) => string
  stringMode?: boolean
  onFocus: any
   onBlur: any
}
