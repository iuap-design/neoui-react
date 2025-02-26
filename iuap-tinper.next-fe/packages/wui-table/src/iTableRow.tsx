/*
 * @Author: Mr.mjc
 * @Date: 2022-06-28 20:41:24
 * @LastEditors: MJC
 * @LastEditTime: 2024-07-31 15:02:24
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/iTableRow.tsx
 */
import React from 'react';
import {
    Key,
    FixedType,
    PositonType,
    RenderExpandIcon,
    DefaultRecordType
} from './interface';
import { InnerColumnType } from './iTable';
export interface TableRowProps<T = DefaultRecordType> {
    // 必填属性
    expandIconColumnIndex: number;
    leftColumnsLength: number;
    centerColumnsLength: number;
    columns: InnerColumnType[];
    record: T;
     // 可选属性
    fixedIndex?: number | undefined;
    indentSize?: number | undefined;
    index?: number | undefined;
    indent?: number | undefined;
    contentTable?: HTMLElement | null;
    childrenColumnName?: string;
    expanded?: boolean;
    className?: string;
    onDestroy?: (record?: T, index?: number, isExpandOperation?: boolean) => void;
    hoverKey?: Key;
    onRowClick?: (record?: T, index?: number, event?: React.MouseEvent<HTMLElement>, isActive?: boolean) => void;
    onRowDoubleClick?: (record?: T, index?: number, event?: React.MouseEvent<HTMLElement>) => void;
    clsPrefix?: string;
    onHover?: (flag?:boolean, hoverKey?: Key, event?: React.MouseEvent<HTMLElement>, index?: number, record?: T) => void;
    height?: string | number | null;
    visible?: boolean;
    expandable?: boolean;
    onExpand?: (expanded?: boolean, record?: T, fixedIndex?: number, event?: React.MouseEvent<HTMLElement>) => void;
    needIndentSpaced?: boolean;
    expandIconAsCell?: boolean;
    expandRowByClick?: boolean;
    store?: any;
    rowDraggAble?: boolean;
    onRow?: (record?: T, index?: number) => void;
    selectedRowKeys?: Key[];
    findRowKeys?: Key[];
    locale?: string | Record<string, any>;
    isExpandedRow?: boolean;
    oldMode?: boolean;
    treeType?: boolean;
    syncHover?: boolean;
    setRowHeight?: (height?: number, index?: number, rowKey?: Key) => void;
    expandedContentHeight?: number;
    fixed?: FixedType;
    setRowParentIndex?: number;
    rootIndex?: number;
    // setRowParentIndex?: () => void;
    onPaste?:(event?: React.ClipboardEvent<HTMLTableDataCellElement>, positon?: PositonType) => void;
    hasLeftFixed?: boolean;
    useDragHandle?: boolean;
    isShowExpandIcon?: boolean;
    bodyDisplayInRow?: boolean;
    expandedIcon?: JSX.Element;
    collapsedIcon?: React.ReactNode;
    lazyStartIndex?: number;
    lazyEndIndex?: number;
    expandIconCellWidth?: number;
    getCellClassName?: (record?: T, index?: number, column?: T) => string;
    expandIcon?: RenderExpandIcon<T>;
    fieldid?: string;
    tableUid?: string;
    bordered?: boolean;
    showExpandColumn?: boolean;
    findCurrentRowKey?: string | Key;
    lastScrollTop?: any;
    headTable?: any;
    rowActiveKeys?: boolean | Key[];
    hoverContent?: (data?: T | null, index?: number | null) => JSX.Element | null;
    contentDomWidth?: number;
    sumIndex?: number;
    onCellMouseDown?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
    onCellMouseEnter?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
    onCellMouseUp?: (event?: React.MouseEvent<HTMLElement>, record?: T, index?: number, columnKey?: Key) => void;
	container?: any;
    openSelectCells?: boolean;
    dir?: 'rtl' | 'ltr';
}

export interface TableRowState {
    hovered?: boolean;
    notRowDrag?: boolean;
    actived?: boolean;
    rowHeight?: number;
}