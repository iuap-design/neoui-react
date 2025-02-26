
import * as React from 'react';
import type {Moment} from 'moment';
import { BaseProps } from '../../wui-core/src/iCore';
export type IsArr<K, T> = K extends string ? T : K extends Array<any> ? T[] : T | T[];
export type QSDir = "horizontal" | "vertical";
export type CalendarType = "hour" | "date" | "week" | "month" | "year";
export interface CalendarProps<T> extends BaseProps {
    onChange?: (value: Moment, flag?: boolean, valueStings?: string[]) => void;
    value?: IsArr<T, Moment>;
    defaultValue?: IsArr<T, Moment>;
    type?: string;
    onTypeChange?: (type: CalendarType) => void;
    onPanelChange?: (type: CalendarType) => void;
    fullscreen?: boolean;
    monthCellRender?: (value: Moment, locale: string) => React.ReactElement;
    dateCellRender?: (current: Moment, value: Moment) => React.ReactElement;
    hourCellRender?: (item: number, show: boolean) => (React.ReactElement | null);
    disabledDate?: string | ((current: Moment, value?: Moment) => boolean);
    monthCellContentRender?: (value: Moment, locale: string) => React.ReactElement;
    monthFullCellRender?: (value: Moment, locale: string) => React.ReactElement;
    dateCellContentRender?: (current: Moment, values: Moment[]) => (React.ReactElement | null);
    dateFullCellRender?: (current: Moment, values: Moment[]) => (React.ReactElement | null);
    hourCellContentRender?: (item: number, show: boolean) => (React.ReactElement | null);
    mutiple?: boolean;
    dateCellHeaderReader?: (current: Moment, selectValues: Moment[], headerChilds: (React.ReactElement | null)[]) => React.ReactElement[];
    onSelect?: (value: Moment) => void;
    headerRender?: React.ReactElement | (() => React.ReactElement);
    onYearChange?: () => (void | Promise<boolean>);
    getDateCellAttr?: (current: Moment, value: Moment) => { [key: string]: any };
    onTimeEventsClick?: (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => void;
    fillSpace?: boolean;
    onQuickSelect?: ({changeValues, isChecked, value, direction}: {changeValues: string[]; isChecked: boolean; value: Map<string, boolean>; direction: QSDir;}) => void;
    headerComponent?: React.ReactElement | (() => React.ReactElement);
    scrollIntoValue?: Moment;
    defaultScrollIntoValue?: Moment;
    renderDateHeaderCell: (day: string, xindex: number) => React.ReactElement;
    layout?: string;
    operations?: string[]
    timeEvents?: EventObject[];
    showTimeLine?: boolean;
    markWeekend?: boolean;

    defaultType: string;
    mode: string;
    locale: string;
    quickSelect: boolean | number;
    weekStartsOn?: number;
    allowLunar: boolean;
    sidebar: boolean;
    customInterval: number;
    showSingleMonth?: boolean;
    onSelectChange?: (value:Moment) => void;
    bodyClassName?: string;
    onCreateEvent?: (v1: any) => void;
    silderModalBody?: React.ReactNode;
    silderModalHeader?: React.ReactNode;
    onModalOk?: (callback: any) => void;
    isDragEvent?: boolean;
    disabledHoverStyle?: boolean;
    strideValue: any[];
    onMoreEvent?: (e: any, sameCellDom: any[], date: string) => void;
    onCellClick?: (event: any, sameCellDom: any, date: string) => void;
    moreRender?: (current: any) => React.ReactNode | boolean;
    onMouseHandle?: ({startTitleValue, titleValue, dataFlag}: {startTitleValue: any, titleValue: any, dataFlag: string}) => void;
    weekTimeEvents?: any;
    isEditEvent: boolean;
    cellAdaptHeight: boolean;
    isShowWeek: boolean;
    createAdd?: React.ReactNode;
    onHourBodyScroll?: (e: any) => void;
}
export interface CalendarState {
    selectValuesMap: Map<string, boolean>;
    value: Moment;
    fillSpaceStyle: React.CSSProperties;
    hourFillSpaceStyle: React.CSSProperties;
    highLightDate: string[];
    type: string;
    current: Moment;
    focusedDay: string;
    isFlag?: boolean;
    callFunction?: boolean;
    strideValue: any[];
    allDataAdd?: any;
    modalVisible: boolean;
    dataFlag?: any;
    isDelete?: boolean;
    cellHeight: number
}

export interface CalendarHourBodyState {
    divWidth: number;
    modalVisible: boolean;
    targetEventDom?: any;
}

export interface EventObject {
    start: string | number,
    end: string | number,
    content: React.ReactNode,
    key: string,
    className?: string,
    contentDom?: any;
}
export interface EventObjectO extends EventObject {
    start: string,
    end: string,
}
export interface EventObjectT extends EventObjectO {
    date: string
}
export interface EventObjectInput{
    start: string,
    end?: string,
    content?: React.ReactNode,
}

export interface CalendarHeaderProps extends BaseProps {
    value: Moment;
    locale: Record<string, string>;
    Select: keyof JSX.IntrinsicElements | any;
    type?: string;
    showTypeSwitch: boolean;
    headerComponents?: React.ReactElement | (() => React.ReactElement);
    prefixCls: string;
    yearSelectOffset: number;
    yearSelectTotal: number;
    onValueChange: (v?: Moment) => void;
    onTypeChange?: (type?: CalendarType) => void;
    operations?: string[];
    // fieldid: string;
    setSelectValue: (date: Moment) => void;
    lang: string;
    isShowWeek: boolean;
}
export interface CalendarHeaderDefaultProps {
    yearSelectOffset: number;
    yearSelectTotal: number;
    onValueChange: (v?: Moment) => void;
    onTypeChange: (type?: CalendarType) => void;
    locale: {[key: string]: string | string[]};
}
export interface CalendarSliderProps {
    value: Moment;
    prefixCls?: string;
    lang: string;
    fieldid?: string;
    onMonthChange: (v?: Moment) => void;
    type?: string;
    onTimeEventsClick?: (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => void;
    showTimeLine?: boolean;
    hourCellRender?: (item: number, show: boolean) => (React.ReactElement | null);
    hourCellContentRender?: (item: number, show: boolean) => (React.ReactElement | null);
    customInterval: number;
    localeData: {[key: string]: string | string[]};
}
export interface CalendarHourBodyProps {
    clsPrefix?: string;
    fieldid?: string;
    value: Moment;
    timeEvents?: EventObject[];
    showTimeLine?: boolean;
    current: Moment;
    layout?: string;
    onTimeEventsClick?: (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => void;
    customInterval: number;
    onCreateEvent?: (val: any) => void;
    silderModalBody?: React.ReactNode;
    silderModalHeader?: React.ReactNode;
    onModalOk?: (callback: any) => void;
    isDragEvent?: boolean;
    type?: string;
    locale: Record<string, string>;
    isEditEvent: boolean;
    onHourBodyScroll?: (e: any) => void;
}
export interface CalendarNode {
    arguments: {width: number, left: number, content: React.ReactNode},
    children: CalendarNode[],
    data: [{hour: number, minute: number; beginTime?: string;}, {hour: number, minute: number}, number, React.ReactNode, [string, string], string, string | undefined, any],
    level: number,
    maxEnd: number,
    parent: CalendarNode | null,
    timeInfo: {begin: number, end: number},
    contains: (v1: CalendarNode, v2: boolean) => boolean
}
export interface CalendarHeaderSelectProps {
    value: Moment;
    setSelectValue: (date: Moment) => void;
    type?: string;
    lang: string;
    prefixCls: string;
    localeData: {[key: string]: string | string[]};
}
export interface CalendarHeaderSelectState {
    maskShow?: boolean;
    activeYearNum: number;
    activeMonthNum: number;
    activeDateNum: number;
    dateDom?: any;
}
export interface CalendarWeekBodyProps {
    clsPrefix?: string;
    fieldid?: string;
    locale: Record<string, string>;
    value: Moment;
    weekStartsOn?: number;
    weekTimeEvents?: any;
    onTimeEventsClick?: (e: React.MouseEvent<HTMLElement>, value: EventObjectInput, time: Moment) => void;
    current: Moment;
    customInterval: number;
    showTimeLine?: boolean;
    isDragEvent?: boolean;
    onModalOk?: (callback: any) => void;
    onCreateEvent?: ({start, end}: {start: string, end: string}) => void;
    silderModalBody?: React.ReactNode;
    silderModalHeader?: React.ReactNode;
    isEditEvent?: any;
}