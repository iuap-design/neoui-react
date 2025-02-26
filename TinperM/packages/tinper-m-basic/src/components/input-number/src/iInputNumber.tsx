import type { HTMLAttributes, ChangeEvent } from 'react'
import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils/NativeProps';

type OmitType = 'onChange' | 'onBlur' | 'onFocus' | 'onError'
type MarkType = 'hundred' | 'thousand' | 'tenThousand' | 'hundredThousand' | 'million' | 'tenMillion' | 'hundredMillion' | 'billion' | 'tenBillion' | 'hundredBillion' | 'trillion' | 'tenTrillion' | 'hundredTrillion' | 'quadrillion'
export type IntegerMarksType = {len: number; key?: MarkType, mark?: React.ReactNode}[]
export interface InputNumberProps extends Omit<HTMLAttributes<HTMLInputElement>, OmitType>, BaseProps, NativeProps<
    | '--color'
    | '--cursor-color'
    | '--readonly-color'
    | '--disabled-color'
    | '--placeholder-color'
> {
    align?: 'left' | 'right' | 'center',
    inputStyle?: React.CSSProperties,
    clsPrefix?: string,
    style?: React.CSSProperties,
    fieldid?: string,
    defaultValue?: string,
    value?: string | number,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    onBlur: (e: React.FocusEvent<HTMLInputElement>, value: any) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange: (
      param: string | number,
      e: React.MouseEvent | ChangeEvent<HTMLInputElement> | any
    ) => void
    onClickClear?: (value: string) => void,
    showClose?: boolean
    check?: boolean,
    required?: boolean,
    pattern?: RegExp, // 输入过程中的校验规则
    finalPattern?: RegExp | Array<{ reg: RegExp, text: string }>, // 输入结束的校验规则
    customCheck?: (value: any, final?: boolean) => boolean, // 用户自定义校验
    onError?: (value: any, pattern: { reg?: RegExp, text?: string }) => void,
    onSuccess?: (value: any) => void,
    id?: string,
    className?: string,
    onlyShowClearWhenFocus?: boolean,
    addonBefore?: React.ReactNode,
    addonAfter?: React.ReactNode,
    max?: number,
    min?: number,
    name?: string,
    format?: (value?: string | number) => string,
    precision?: number,
    tips?: React.ReactNode,
    showUnit?: boolean,
    integerMarks?: IntegerMarksType,
    showRealValue?: boolean,
    maxLength?: number,
    autoSelect?: boolean,
    toThousands?: boolean
    toThousandsFormat?: string
    roundAt?: number
    decimalFormat?: boolean
    formatReg?: string
    hiddenChart?: string
    replaceChart?: string
    autoCorrectCase?: boolean
    invalidCaseError?: () => void
}
