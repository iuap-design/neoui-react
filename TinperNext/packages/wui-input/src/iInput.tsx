import type {
    ChangeEvent,
    CSSProperties,
    CompositionEvent,
    FocusEvent,
    HTMLAttributes,
    KeyboardEvent,
    KeyboardEventHandler,
    MouseEvent,
    ReactNode,
    Ref,
    RefObject,
    ReactElement
} from 'react'
import type {LiteralUnion} from './../../wui-core/src/utils/type'
import type {AlignType, BaseProps, BorderType, SizeType} from '../../wui-core/src/iCore'

export type InputType = LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
>

export type BlurHandler = (
    value: FocusEvent<HTMLInputElement> | string | number,
    event: FocusEvent<HTMLInputElement>,
    isClear?: boolean
) => any

export type FocusHandler = (
    value: FocusEvent<HTMLInputElement> | string | number,
    event: FocusEvent<HTMLInputElement>
) => any

export type SearchHandler = (value: string, event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => any

export type ChangeHandler = (
    value: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement> | CompositionEvent<HTMLElement> | string | number,
    event?: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement> | CompositionEvent<HTMLElement>
) => any

type OmitType = 'size' | 'prefix' | 'type' | 'placeholder' | 'onChange' | 'onBlur' | 'onFocus' | 'onSearch' | 'onResize'

export interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, OmitType>, BaseProps {
    dir?: "rtl" |"ltr";
    componentClass?: keyof JSX.IntrinsicElements
    size?: SizeType
    bordered?: BorderType
    align?: AlignType
    type?: InputType
    ref?: Ref<any>
    autoComplete?: string
    // 是否兼容ant design模式
    antd?: boolean
    disabled?: boolean
    showClose?: boolean
    allowClear?: boolean
    trim?: boolean | 'left' | 'right'
    loading?: boolean
    focusSelect?: boolean
    // style 与 className 默认加载到input组件的外层上 ，如果需要加到input元素上需要使用innerStyle 及 innerClassName
    innerStyle?: CSSProperties
    innerClassName?: string
    wrapperClassName?: string
    debounceDelay?: number
    maxLength?: number
    showMaxLabel?: boolean
    showCount?: boolean
    allowInputOverMax?: boolean
    value?: string | number
    defaultValue?: string | number
    autoSize?: {minRows?: number; maxRows?: number}
    onResize?: (position: {width?: number; height?: number; offsetHeight?: number; offsetWidth?: number}) => void
    onFocus?: FocusHandler
    onSearch?: SearchHandler
    onChange?: ChangeHandler
    onBlur?: BlurHandler
    onPressEnter?: KeyboardEventHandler<HTMLInputElement>
    prefix?: ReactNode
    suffix?: ReactNode
    icon?: ReactElement
    placeholder?: string | ReactElement
    trigger?: 'click' | 'hover'
    iconRender?: (visible?: boolean) => ReactNode
    enterButton?: ReactNode | boolean
    visibilityToggle?: boolean
    passwordVisible?: boolean
    onVisibleChange?: (visible?: boolean) => void
    readOnly?: boolean
    requiredStyle?: boolean
    autoFocus?: boolean
}

export interface InputState {
    size?: SizeType;
    isInputChinese?: boolean;
    showSearch?: boolean
    value?: InputProps['value']
    focused?: boolean
    prevValue?: InputProps['value']
    passwordVisible?: boolean
    autoSize?: InputProps['autoSize'] | boolean
}

export interface MutableRefObject extends RefObject<HTMLInputElement> {
    current: any
}

export interface DefaultProps {
    componentClass: any
    clsPrefix: string
    type: string
    size: SizeType
    bordered: BorderType
    trim: InputProps['trim']
    trigger: 'click' | 'hover'
    iconRender: (visible?: boolean) => ReactNode
    // showMaxLabel: boolean;
    allowInputOverMax: boolean
    // passwordVisible: boolean;
    visibilityToggle: boolean
    debounceDelay: number
    antd: boolean
}

export interface InputWithDefaultProps extends Omit<InputProps, keyof DefaultProps>, DefaultProps {}
