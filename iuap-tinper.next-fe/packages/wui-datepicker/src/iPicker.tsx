import type { PanelMode, PickerMode, EventValue, RangeValue, Locale as RcPickerLocale, RangeValue as RCRangeValueType } from '@tinper/rc-picker/lib/interface';
import type { DateRender } from '@tinper/rc-picker/lib/panels/DatePanel/DateBody';
import type { MonthCellRender } from '@tinper/rc-picker/lib/panels/MonthPanel/MonthBody';
import type { SharedTimeProps } from '@tinper/rc-picker/lib/panels/TimePanel';
import type {
    PickerBaseProps as RCPickerBaseProps,
    PickerDateProps as RCPickerDateProps,
    PickerTimeProps as RCPickerTimeProps
} from '@tinper/rc-picker/lib/Picker';
import type {
    RangePickerBaseProps as RCRangePickerBaseProps,
    RangePickerDateProps as RCRangePickerDateProps,
    RangePickerTimeProps as RCRangePickerTimeProps
} from '@tinper/rc-picker/lib/RangePicker';
import type { Moment } from 'moment';
import React, { FocusEvent, ReactElement, ReactNode } from 'react';
import type { AlignType, BaseProps, BorderType, SizeType } from '../../wui-core/src/iCore';
import type { Lang, PlacementType } from '../../wui-core/src/utils/type';

export interface AdditionalPickerLocaleProps {
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
    quarterFormat?: string;
}

export interface AdditionalPickerLocaleLangProps {
    placeholder?: string;
    yearPlaceholder?: string;
    quarterPlaceholder?: string;
    monthPlaceholder?: string;
    weekPlaceholder?: string;
    rangeYearPlaceholder?: [string, string];
    rangeMonthPlaceholder?: [string, string];
    rangeWeekPlaceholder?: [string, string];
    rangePlaceholder?: [string, string];
}

export type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
} & AdditionalPickerLocaleProps & RcPickerLocale;

type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'components'> & {
    locale?: PickerLocale | string;
};

export type DatePickerValueType = EventValue<Moment>;

export interface DatePresetType {
    label: string;
    key: string;
    value: DatePickerValueType | (() => DatePickerValueType);
}

export type DatePresetsType = DatePresetType[];

// Picker Props
export interface PickerBaseProps<DateType> extends InjectDefaultProps<RCPickerBaseProps<DateType>> {}
export interface PickerDateProps<DateType> extends InjectDefaultProps<RCPickerDateProps<DateType>> {}
export interface PickerTimeProps<DateType> extends InjectDefaultProps<RCPickerTimeProps<DateType>> {}

type WeekStartsOn = 0 | 1 | 6 | 7 | 'MONDAY' | 'SATURDAY' | 'SUNDAY'; // 支持周六、周日、周一

type OmitDatePickerProps =
    | 'locale'
    | 'closeIcon'
    | 'clearIcon'
    | 'renderIcon'
    | 'suffixIcon'
    | 'defaultPanelShown'
    | 'dateCellRender'
    | 'onChange'
    | 'onOk'
    | 'onBlur'
    | 'onOpenChange'
    | 'onSelect'
    | 'placement'
    | 'dropdownAlign'
    | 'picker'
    | 'format'
    | 'weekStartsOn'
    | 'showTime'
    | 'defaultValue'
    | 'value'
    | 'placeholder'
    | 'presets'
    | 'activePresetLabel'
    // | 'validatorFunc';

export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export interface RangePickerShowTimeProps extends Omit<SharedTimeProps<Moment | string>, 'defaultValue'> {
    defaultValue?: Moment | string | Moment[] | string[]
}

export interface DatePickerProps extends Omit<
    PickerBaseProps<Moment> | PickerDateProps<Moment> | PickerTimeProps<Moment>,
    OmitDatePickerProps
>, BaseProps {
    activePresetKey?: string;
    presets?: DatePresetsType | string[] | boolean;
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    autoFix?: boolean;
    enterKeyDown?: boolean;
    placeholder?: string | ReactElement;
    locale?: string | Partial<PickerLocale>; // object兼容antd及locale
    closeIcon?: ReactNode | (() => ReactNode);
    clearIcon?: ReactNode | (() => ReactNode);
    renderIcon?: ReactNode | (() => ReactNode);
    suffixIcon?: ReactNode | (() => ReactNode);
    defaultPanelShown?: boolean;
    disabledDateValid?: boolean;
    disabledDate?: (date: Moment) => boolean;
    iconClick?: React.MouseEventHandler<HTMLSpanElement>;
    dateCellRender?: DateRender<Moment>;
    monthCellContentRender?: MonthCellRender<Moment>;
    onChange?: (value: Moment | null, dateString: string, halfYearArr?: string[]) => void;
    onOk?: (value: Moment | null, dateString: string) => void;
    onBlur?: (event: FocusEvent, dateString: string) => void;
    onDateInputBlur?: (event: FocusEvent, dateString: string) => void;
    outInputKeydown?: (event: React.KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => void;
    outInputFocus?: React.FocusEventHandler<HTMLInputElement>;
    onOpenChange?: (open: boolean, value?: Moment | string | null, dateString?: string) => void;
    onSelect?: (value: Moment | null, dateString: string) => void;
    placement?: Placement;
    dropdownAlign?: string;
    popupClassName?: PickerBaseProps<Moment>['dropdownClassName'];
    picker?: PickerMode | 'range';
    format?: string | string[];
    showToday?: boolean;
    showTime?: boolean | SharedTimeProps<Moment | string>; // object接收time的默认值等
    timezone?: string; // 支持 'GMT+8'、'Asia/Shanghai'
    serverTimezone?: string; // 支持 'Asia/Shanghai' 'GMT+8'
    enableTimezone?: boolean;
    weekStartsOn?: WeekStartsOn;
    use12Hours?: boolean;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    defaultValue?: Moment | string;
    value?: Moment | string | null;
    // validatorFunc?: () => boolean;
    getCalendarContainer?: (node: HTMLElement) => HTMLElement;
    isHeaderSelect?: boolean;
    dir?: 'ltr' | 'rtl';
}

export interface DatePickerState {
    lang: {lang: string; langMap: any};
    activePresetLabel: string;
    presets: DatePresetsType;
    open: DatePickerProps['open'];
    value: DatePickerProps['value'];
    format: string;
    initFormat: string;
    dropdownAlign: PlacementType;
    showTime: DatePickerProps['showTime'];
    clearIcon: ReactNode;
    suffixIcon: ReactNode;
    _isFix: boolean;
    _forbidOpen: boolean;
    diffValue: [number, number];
    selectYear: number;
    selectMonth: number;
    maskShow: boolean;
    activeYearNum: number;
    activeMonthNum: number;
}

// Range Picker Props
export interface RangePickerBaseProps<DateType> extends InjectDefaultProps<RCRangePickerBaseProps<DateType>> {}
export interface RangePickerDateProps<DateType> extends InjectDefaultProps<RCRangePickerDateProps<DateType>> {}
export interface RangePickerTimeProps<DateType> extends InjectDefaultProps<RCRangePickerTimeProps<DateType>> {}

export type RangeValueType = RCRangeValueType<Moment>;

export interface RangePresetType {
    label: string;
    key: string;
    value: RangeValueType | (() => RangeValueType);
}

export type RangesType = RangePresetType[] | {
    [preset: string]: RangeValueType
}

type OmitRangePickerProps =
    | 'align'
    | 'mode'
    | 'placeholder'
    | 'value'
    | 'defaultValue'
    | 'defaultPickerValue'
    | 'weekStartsOn'
    | 'format'
    | 'disabled'
    | 'showTime'
    | 'closeIcon'
    | 'renderExtraFooter'
    | 'ranges'
    | 'presets'
    | 'activePresetLabel'
    | 'activeSelectPanel'
    | 'onPresetChange'
    | 'onBlur'
    | 'onChange'
    | 'onPanelChange'
    | 'suffixIcon'
    | 'clearIcon';

type RangeValuesType = string | [string, string] | RangeValue<Moment>;

export interface RangePickerProps extends Omit<
    RangePickerBaseProps<Moment> | RangePickerDateProps<Moment> | RangePickerTimeProps<Moment>,
    OmitRangePickerProps
>, BaseProps {
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    autoFix?: boolean;
    antd?: boolean;
    mode?: PanelMode | [PanelMode, PanelMode];
    placeholder?: string | [string, string] | ReactElement | [ReactElement, ReactElement];
    dateInputPlaceholder?: string | [string, string];
    value?: RangeValuesType;
    defaultValue?: RangeValuesType;
    defaultPickerValue?: RangeValue<Moment>;
    format?: string | [string, string];
    weekStartsOn?: WeekStartsOn;
    order?: boolean;
    popupClassName?: PickerBaseProps<Moment>['dropdownClassName'];
    disabled?: boolean | boolean[];
    disabledDateValid?: boolean;
    allowEmpty?: [boolean, boolean];
    use12Hours?: boolean;
    showTime?: boolean | RangePickerShowTimeProps;
    timezone?: string; // 支持 'GMT+8'、'Asia/Shanghai'
    serverTimezone?: string; // 支持 'Asia/Shanghai' 'GMT+8'
    enableTimezone?: boolean;
    ranges?: RangesType;
    presets?: RangesType;
    showRangeLabel?: boolean; // 是否在输入框中显示快捷键选中的日期范围的文本
    activePresetKey?: string;
    dateCellRender?: RangePickerDateProps<Moment>['dateRender'];
    renderExtraFooter?: (mode: PanelMode) => ReactNode;
    renderFooter?: (mode: PanelMode) => ReactNode;
    closeIcon?: DatePickerProps['closeIcon'];
    renderIcon?: DatePickerProps['renderIcon'];
    iconClick?: DatePickerProps['iconClick'];
    getCalendarContainer?: (dom: HTMLElement) => void;
    onPresetChange?: (label: string, values: RangeValue<Moment>, range: RangeValueType | RangePresetType, lastSelectDate: Moment | null
    ) => void;
    onStartInputBlur?: (event: FocusEvent, startValue: string, value: [string, string]) => void;
    onEndInputBlur?: (event: FocusEvent, endValue: string, value: [string, string]) => void;
    onBlur?: (event: FocusEvent) => void;
    onChange?: (value: RangeValue<Moment>, formatString: string | [string, string], format?: [string, string] | null, halfYearArr?: string[][]
    ) => void;
    onSelect?: (value: Moment) => void;
    onPanelChange?: (values: RangeValue<Moment>, modes?: [PanelMode, PanelMode]) => void;
    onCalendarChange?: (value: RangeValue<Moment> | null, formatString: [string, string], info: {range: string}
    ) => void;
    isHeaderSelect?: boolean;
    clearIcon?: ReactNode | (() => ReactNode);
    suffixIcon?: ReactNode | (() => ReactNode);
    atOnceFinish?: boolean;
    dir?: 'ltr' | 'rtl';
}

export interface RangePickerState {
    langInfo: {lang: Lang; langMap: RcPickerLocale & {weekdaysMin?: string[]}};
    value: RangeValue<Moment>;
    format: [string, string];
    initFormat: [string, string];
    showTime: RangePickerProps['showTime'];
    labelFormat: [string, string];
    ranges: RCRangePickerBaseProps<Moment>['ranges'];
    activePresetLabel: string;
    placeholder?: [string, string];
    clearIcon: ReactNode;
    suffixIcon: ReactNode;
    open?: boolean;
    modeArr: [PanelMode, PanelMode] | undefined;
    lastSelectDate: Moment | null;
    diffValue: [number, number];
    maskShow: boolean;
    // monthData: any,
    leftValue: string
    rightValue: string;
    inputActiveIndex: number;
    activeSelectPanel: RCRangePickerBaseProps<Moment>['activeSelectPanel'];
}

export interface DateRangePickerProps extends Omit<RangePickerProps, 'picker'> {
    picker?: 'range'
}
