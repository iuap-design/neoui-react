/*
 * @Author: Mr.mjc
 * @Date: 2022-06-28 20:41:24
 * @LastEditors: MJC
 * @LastEditTime: 2024-08-06 10:53:54
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/iTableCell.tsx
 */
import React from 'react';
import {
    FixedType,
    PositonType,
    GetComponentProps,
    DefaultRecordType,
    RenderLinkTypeConfig,
    RenderNumberConfig,
    RenderDateConfig,
    RenderSelectConfig,
    ColMenuType,
    Key
} from './interface';
import { InnerColumnType } from './iTable';

export interface CellColumnType<T = DefaultRecordType> extends InnerColumnType {
    cellMenu?: ColMenuType;
    draggable?: boolean;
    linkConfig?: RenderLinkTypeConfig<T>;
    boolConfig?: {trueText?: string; falseText?: string};
    currencyConfig?: RenderNumberConfig;
    numberConfig?: RenderNumberConfig;
    dateConfig?: RenderDateConfig;
    selectConfig?: RenderSelectConfig;
}

export interface TableCellProps<T = DefaultRecordType> {
    isExpandCell: boolean;
    column: CellColumnType<T>;
    record: T;
    index: number;
    indent: number;
    indentSize: number;
    clsPrefix?: string;
    expandIcon?: JSX.Element | null | undefined;
    onPaste?:(event?: React.ClipboardEvent<HTMLTableDataCellElement>, positon?: PositonType) => void;
    fixed?: FixedType;
    showSum?: string[];
    hasSum?: boolean;
    col?: number;
    bodyDisplayInRow?: boolean;
    stopRowDrag?: (isStop?: boolean) => void;
    lazyStartIndex?: number;
    lazyEndIndex?: number;
    getCellClassName?: (record?: T, index?: number, column?: T) => string;
    onCell?: GetComponentProps<T>;
    locale?: string | Record<string, any>;
    isExpandedRow?: boolean;
    fieldid?: string;
    store?: any;
    syncHover?: boolean;
    sumIndex?: number;
    expandIconCellWidth?: number;
    expandNode?: JSX.Element;
    onCellMouseDown?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
    onCellMouseEnter?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
    onCellMouseUp?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
    currentRowKey?: Key;
	container?: any;
    openSelectCells?: boolean;
    dir?: 'ltr' | 'rtl';
}

export interface TableCellState {
    showDropdowm: boolean;
    hovered: boolean;
}