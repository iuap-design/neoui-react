import type { HTMLAttributes } from 'react'
import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils/NativeProps';

type OmitType = 'onChange' | 'onBlur' | 'onFocus' | 'onError'
export interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, OmitType>, BaseProps, NativeProps<
    | '--color'
    | '--cursor-color'
    | '--readonly-color'
    | '--disabled-color'
    | '--placeholder-color'
> {
    textAlign?: 'left' | 'right' | 'center',
    inputStyle?: React.CSSProperties,
    clsPrefix?: string,
    style?: React.CSSProperties,
    fieldid?: string,
    defaultValue?: string,
    value?: string,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    maxLength?: number,
    onChange?: (value: string) => void,
    onFocus?: (value: string) => void,
    onBlur?: (value: string) => void,
    onClickClear?: (value: string) => void,
    showClose?: boolean,
    check?: boolean,
    required?: boolean,
    pattern?: RegExp, // 输入过程中的校验规则
    finalPattern?: RegExp | Array<{ reg: RegExp, text: string }>, // 输入结束的校验规则
    customCheck?: (value: string, final?: boolean) => boolean, // 用户自定义校验
    onError?: (value: string, pattern: { reg?: RegExp, text?: string }) => void,
    onSuccess?: (value: string) => void,
    inputmode?: 'text' | 'decimal',
    mode?: 'text' | 'password' | 'idCard' | 'email' | 'ipAddress' | 'bankCard16' | 'bankCard19' | 'tel' | 'number' | 'search',
    id?: string,
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onlyShowClearWhenFocus?: boolean,
    suffix?: React.ReactNode,
    onSuffixClick?: React.MouseEventHandler<HTMLDivElement>,
    name?: string,
    updatePlaceholder?: boolean,
    max?: number,
    min?: number,
    tips?: React.ReactNode
}

export interface InputState {
    _value: string,
    _focus: boolean,
    _type: 'text' | 'number' | 'tel' | 'password',
    _placeholder: string
}

export type InputRef = {
    clear: () => void
    focus: () => void
    blur: () => void
    nativeElement: HTMLInputElement | null

}
