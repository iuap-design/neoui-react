import type {ReactElement} from 'react';
import type {Moment} from 'moment';
import type {AlignType, BaseProps, BorderType, SizeType} from '../../wui-core/src/iCore';
import type {Lang} from '../../wui-core/src/utils/type';
import type {Placement} from '../../wui-datepicker/src/iPicker';
import type {RCTimePickerProps} from './rc/iRCTimePicker';
import {Locale} from '../../wui-locale/src/iLocale';

type HandleTimePickerProps =
    | 'align'
    | 'className'
    | 'getPopupContainer'
    | 'locale'
    | 'value'
    | 'defaultValue'
    | 'defaultOpenValue'
    | 'placeholder'
    | 'placement'
    | 'onChange';

export interface TimePickerProps extends Partial<Omit<RCTimePickerProps, HandleTimePickerProps>>, BaseProps {
    size?: SizeType;
    showClear?: boolean;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    locale?: Lang;
    value?: Moment | string | null;
    defaultValue?: Moment | string | null;
    defaultOpenValue?: Moment | string;
    placeholder?: string | ReactElement;
    placement?: Placement;
    suffixIcon?: ReactElement;
    onChange?: (time: Moment | null, timeString?: string) => void;
    getPopupContainer?: RCTimePickerProps['getPopupContainer'] | HTMLElement;
}

export interface TimePickerState {
    showTime?: boolean | {showHour: boolean, showMinute: boolean, showSecond: boolean};
    langInfo: { lang: string; langMap: Locale; };
    value?: Moment | null;
    defaultValue?: Moment | null;
    format: string;
}

export interface TimePickerDefaultProps {
    size: SizeType;
    allowClear: boolean; // 默认允许清除
    focusOnOpen: boolean;
    autoComplete: 'off' | 'on' | string;
    placeholder: string;
    locale: string;
    dir?: 'rtl' | 'ltr';
    // showHour: boolean;
    // showMinute: boolean;
    // showSecond: boolean;
    // inputIcon: ReactElement;
    clearIcon: ReactElement & BaseProps;
}

export interface TimePickerWithDefaultProps
    extends Omit<TimePickerProps, keyof TimePickerDefaultProps>,
        TimePickerDefaultProps {}
