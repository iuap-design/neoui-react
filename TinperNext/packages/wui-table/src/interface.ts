/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 17:46:22
 * @LastEditors: MJC
 * @LastEditTime: 2023-11-13 16:37:37
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/interface.ts
 */
import * as React from 'react';
import {Moment} from 'moment';
import { Key as KeyCore } from '../../wui-core/src/iCore';

export type Key = KeyCore;
export type DefaultRecordType = Record<string, any>;
export type DataIndex = string | number;
export type FixedType = 'left' | 'right' | boolean | undefined;
export type FilterTypes = 'text' | 'dropdown' | 'date' | 'dateyear' | 'datemonth' | 'dateweek' | 'daterange' | 'number' | 'time';
export type FilterDropdownTypes = 'show' | 'hide';
export type FilterDropdownAutoType = 'auto' | 'manual';
export type FilterDropdownDataType = {
    key: any;
    value: any
};
export type FieldTypes = 'string' | 'number' | 'currency' | 'bool' | 'link' | 'stringChinese' | 'date' | 'select';
export type AlignTypes = 'left' | 'center' | 'right';
export type SortDirectionsKey = 'ascend' | 'descend';
export type GetRowKey<T> = (record: T, index?: number) => Key;
export type GetComponentProps<DataType> = (data: DataType, index?: number) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;
export type RowClassName<T> = (record: T, index?: number, indent?: number) => string;
export type TriggerEventHandler<T> = (record: T, index?: number, event?: React.MouseEvent<HTMLElement>, isActive?: boolean) => void;
export type ExpandEventHandler<T> = (status?: boolean, record?: T, index?: number, event?: React.MouseEvent<HTMLElement>) => void;
export type PanelRender<T> = (data: readonly T[]) => React.ReactNode;
export type WrapperRener = (body: React.ReactNode) => React.ReactNode;
export type DropEventHandler<T> = (record?: T, index?: number, dataIndex?: Key, e?: React.MouseEvent<HTMLElement> ) => void;
export type DropDataEventHandlers<DataType, T> = (data: DataType, record?: T, index?: number, DropRecord?: T, DropIndex?: number, event?: React.DragEvent<HTMLElement>) => void;
export type ScrollPositionType = 'left' | 'middle' | 'right';
export type EventHandler = (event?: React.MouseEvent<HTMLElement>) => void;
export type PositonType = {
    row?: number;
    col?: number;
    fixed?: FixedType
}
export type DropDataSourceType = {
    columnKey?: Key;
    columnFixed?:FixedType;
    columnWidth?: number;
    columnIndex?: number
}
export type ObjRenderType = {[key: string]: any};

export type GetSelectedDataFuncType<T> = (
    selectedRows?: T[] | T,
    record?: T | number | undefined,
    index?: number | React.MouseEvent | undefined,
    checkedData?: T[]
) => void;

export type SingleGetSelectedDataFuncType<T> = ( // 兼容旧有的单选
    record?: T | undefined,
    index?: number | undefined,
    e?: React.MouseEvent
) => void;

export type FocusHandler = (
    value: React.FocusEvent<HTMLInputElement> | string | number,
    event: React.FocusEvent<HTMLInputElement>
) => any;
export type FilterDropdownKeysStrType = 'LIKE' | 'ULIKE' | 'EQ' | 'UEQ' | 'START' | 'END';
// export type ConditionType = Pick<FilterDropdownKeysStrType, 'LIKE', 'EQ'>;
export type FilterDropdownKeysNumType = 'GT' | 'GTEQ' | 'LT' | 'LTEQ' | 'EQ' | 'UEQ';
export type BrowserInfoType = {
    browserType?: string;
    osType?: string
}

export interface RenderExpandIconProps<T> {
    // prefixCls: string;
    expanded?: boolean;
    onExpand?: ExpandEventHandler<T>;
    record?: T;
    // expandable: boolean;
}
export type RenderExpandIcon<T> = (props: RenderExpandIconProps<T>) => React.ReactNode;
export type GetTableOptions<T = DefaultRecordType> = {
    columns: T[];
    fixed?: FixedType
}

export type AfterDragColWidthType = {
    rows?: DefaultRecordType[],
    cols?: DefaultRecordType[],
    currIndex?: number
}

export type RenderLinkTypeConfig<T> = {
    url?: (data: any, record: T, index: number) => any;
    urlIndex?: Key;
    linkType?: '_self' | '_blank';
    className?: string;
    underline?: boolean;
    descIndex?: Key;
    desc?: boolean | string | ((data: any, record: T, index: number) => any);
    linkColor?: string
}

export type RenderNumberConfig = {
    precision?: number;
    thousand?: boolean;
    makeUp?: boolean;
    preSymbol?: string;
    nextSymbol?: string
}

export type RenderDateConfig = {
    moment?: Moment;
    format?: string;
}

export type RenderSelectConfig = {
    options?: DefaultRecordType;
    defaultShow?: string;
}

export type MenuType = {
    key: string;
    text?: string;
    icon?: string | JSX.Element;
    callback?: (text?: any, record?:DefaultRecordType, index?:number) => void
}

export type ColMenuType = {
    menu?: MenuType[];
    trigger?: 'hover' | 'click';
    icon?: string | JSX.Element;
    iconSize?: number;
    className?: string
}


export type SelectDataSourceType = {
    key: string;
    value: any
}

export type MenuSelectionsType = {
    key: string;
    text: React.ReactNode | string;
    onSelect?: (changeableRowKeys: Key[]) => void;
}


export interface PageInfo {
    current: number;
    pageSize: number;
}


export type InputValueType = Record<Key, string>

export type SortColType = {
    order?: string;
    field?: string | number | undefined;
    orderNum?: number
}