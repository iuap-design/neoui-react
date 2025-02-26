import type { CSSProperties, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactElement } from 'react';
import type { Moment } from 'moment';
import type { AlignType } from 'rc-trigger/lib/interface';
import type { BaseProps } from '../../../wui-core/src/iCore';
import type { Placement } from '../../../wui-datepicker/src/iPicker';

export type RCSelectType = 'hour' | 'minute' | 'second' | 'ampm';

export type AmpmType = 'AM' | 'PM';

export type RCLangInfoType = {
    lang: string;
} & {
    [key: string]: Record<string, any>;
};

export interface RCSelectOption {
    value: string;
    disabled?: boolean;
}

export type SelectHandler = (type: RCSelectType, value: string) => void;

export interface RCSelectProps {
    prefixCls: string;
    options: RCSelectOption[];
    selectedIndex: number;
    width: number;
    type: RCSelectType;
    onSelect: SelectHandler;
    onMouseEnter: MouseEventHandler<HTMLDivElement>;
}

interface RCBaseSelectConfig {
    showHour: boolean;
    showMinute: boolean;
    showSecond: boolean;
    disabledHours: () => number[];
    disabledMinutes: (hour: number | null) => number[];
    disabledSeconds: (hour: number | null, minute: number | null) => number[];
}

interface RCBaseSelect extends RCBaseSelectConfig {
    prefixCls: string;
    width?: number;
    format: string;
    defaultOpenValue: Moment;
    value?: Moment | null;
    use12Hours: boolean;
    onChange: (value: Moment | null) => void;
    onAmPmChange: (ampm: AmpmType) => void;
}

interface RCBaseSelectOptions {
    hourOptions: number[];
    minuteOptions: number[];
    secondOptions: number[];
}

export interface RCComboboxProps extends RCBaseSelect, RCBaseSelectOptions {
    onCurrentSelectPanelChange: (range: RCSelectType) => void;
    isAM: boolean;
    dir: "rtl" |"ltr"|undefined;
}

export interface RCPanelProps extends RCBaseSelect {
    fieldid?: string;
    clearText: string;
    className?: string;
    locale?: RCLangInfoType;
    showNow: boolean;
    hideDisabledOptions: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    onClick: MouseEventHandler;
    dir: "rtl" |"ltr" | undefined;
    onOpenChange: (open: boolean) => void;
    renderExtraFooter?: (args: any) => ReactElement;
}

export interface RCPanelState {
    value?: Moment | null;
    currentSelectPanel?: RCSelectType;
}

export interface RCInputProps extends RCBaseSelectConfig, RCBaseSelectOptions {
    id?: string;
    fieldid?: string;
    format: string;
    prefixCls: string;
    placeholder?: string;
    locale?: RCLangInfoType;
    clearText: string;
    value?: Moment | null;
    inputReadOnly: boolean;
    onChange: (value: Moment | null) => void;
    onEsc?: () => void;
    allowEmpty: boolean;
    defaultOpenValue: Moment;
    focusOnOpen: boolean;
    onKeyDown?: KeyboardEventHandler;
    handleInputWidthChange?: (width: number) => void;
    onFocus?: FocusEventHandler;
    onBlur: (date: Moment | null) => void;
    autoComplete: string;
    name?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    blurHandle?: () => void;
}

export interface RCInputState {
    str: string;
    valueString: string;
    invalid: boolean;
}

export interface RCTimePickerProps extends Partial<RCInputProps>, Partial<Omit<RCPanelProps, 'onOpenChange'>>, BaseProps {
    dir?: "rtl" |"ltr";
    popupClassName?: string;
    defaultOpen?: boolean;
    locale: RCLangInfoType;
    defaultValue?: Moment | null;
    open?: boolean;
    focusOnOpen?: boolean;
    inputIcon?: ReactElement;
    clearIcon?: ReactElement & BaseProps;
    clearText: string;
    allowClear?: boolean;
    showNow: boolean;
    addon?: (args: any) => ReactElement;
    onAmPmChange?: (ampm: AmpmType) => void;
    onOpen?: ({ open }: { open: true; }) => void;
    onClose?: ({ open }: { open: false; }) => void;
    // onEsc: () => void;
    onBlur?: (value: Moment) => void;
    onOpenChange?: ({ open }: { open: boolean; }) => void;
    align?: AlignType;
    placement?: Placement;
    transitionName?: string;
    style?: CSSProperties;
    popupStyle?: CSSProperties;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

export interface RCTimePickerState {
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    inputWidth?: number;
    inputFocused?: boolean;
    panelFocused?: boolean;
    open?: boolean;
    value?: RCTimePickerProps['value'] | null;
}
