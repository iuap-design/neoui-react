import * as React from 'react';
import type {AlignType, BaseHtmlProps, BorderType, SizeType} from '../../wui-core/src/iCore';
import type {InputProps} from '../../wui-input/src/iInput';

type OmitType = 'size' | 'onChange' | 'onBlur' | 'onFocus';
type MarkType = 'hundred' | 'thousand' | 'tenThousand' | 'hundredThousand' | 'million' | 'tenMillion' | 'hundredMillion' | 'billion' | 'tenBillion' | 'hundredBillion' | 'trillion' | 'tenTrillion' | 'hundredTrillion' | 'quadrillion'
export type IntegerMarksType = {len: number; key?: MarkType, mark?: React.ReactNode}[]

export interface InputNumberProps extends Omit<BaseHtmlProps<HTMLElement>, OmitType> {
    dir?: "rtl" |"ltr";
    max?: number;
    min?: number;
    step?: number;
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    autoFix?: boolean;
    autoWidth?: boolean;
    precision?: number;
    readOnly?: boolean;
    showMark?: boolean;
    integerMarks?: IntegerMarksType,
    thousandSeparator?: string;
    decimalSeparator?: string;
    delay?: number;
    disabled?: boolean;
    toThousands?: boolean;
    locale?: Record<string, any> | string;
    toNumber?: boolean; // 回调函数内的值是否转换为数值类型
    displayCheckPrompt?: boolean; // 是否显示超出限制范围之后的检验提示
    minusRight?: boolean; // 负号是否在右边
    hideActionButton?: boolean; // 隐藏加减按钮
    controls?: boolean; // 隐藏加减按钮,兼容antd api
    rootClassName?: string; // 根节点添加className
    autoFocus?: boolean;
    keyboard?: boolean; // 是否启用键盘操作
    value?: number | string;
    defaultValue?: number | string; // 不支持
    antd?: boolean;
    format?: (value?: number | string) => number | string;
    formatter?: (value?: number | string) => number | string; // 兼容antd属性
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement | HTMLDivElement>;
    handleBtnClick?: (type: string, value?: number | string) => void; // 加减按钮点击回调
    onStep?: (value: number | string, info?: {offset: number; type: 'up' | 'down'}) => void; // 兼容antd属性，作用同加减按钮点击回调
    onChange?: InputProps['onChange'];
    onFocus?: InputProps['onFocus'];
    onBlur?: InputProps['onBlur'];
    changeOnBlur?: boolean;
    round?: boolean;
    iconStyle?: 'double' | 'one';
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    placeholder?: string;
    autoCorrectCase?: boolean;
    invalidCaseError?: () => void;
    showAmountInWords?: boolean;
    showAmountLayout?: 'vertical' | 'horizontal';
    inputWidth?: string;
    onlyShowAmount?: boolean;
    decimalFormat?: boolean;
    roundAt?: number;
    formatReg?: string;
    hiddenChart?: string;
    replaceChart?: string;
}

export interface InputNumberState {
    thousandSeparator: string;
    decimalSeparator: string;
    minusRight: boolean;
    toThousands: boolean;
    precision: InputNumberProps['precision'];
    preValue: number | string;
    value: number | string;
    showValue: string;
    max: number;
    min: number;
    minusDisabled: boolean;
    plusDisabled: boolean;
    placeholderShow: boolean;
    local: {
        lang: string;
        langMap: Record<string, any>;
    };
}

export interface InputNumberDefaultProps {
    size: SizeType;
    value: number | string;
    max: number;
    min: number;
    step: number;
    iconStyle: 'double' | 'one';
    autoFix: boolean;
    autoWidth: boolean;
    readOnly: boolean;
    delay: number;
    autoFocus: boolean;
    disabled: boolean;
    locale: string;
    toNumber: boolean;
    displayCheckPrompt: boolean;
    keyboard: boolean;
    // hideActionButton: boolean;
    rootClassName: string;
    autoCorrectCase: boolean;
    roundAt: 5
}

export interface InputNumberWithDefaultProps
    extends Omit<InputNumberProps, keyof InputNumberDefaultProps>,
        InputNumberDefaultProps {}
