/*
 * @Author: Mr.mjc
 * @Date: 2022-06-28 17:33:37
 * @LastEditors: MJC
 * @LastEditTime: 2024-07-31 15:13:45
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/iTableHeader.tsx
 */
import React from 'react';
import {
    DefaultRecordType,
    FixedType,
    AfterDragColWidthType,
    DataIndex
} from './interface';
import { ColumnType } from './iTable';
import ColumnManager from './ColumnManager';
export declare type OnDragEndType = {
    dragSource?: DefaultRecordType,
    dragTarget?: DefaultRecordType
}
export interface TableHeaderProps {
    // 必填属性
    draggable: boolean;
    columnsChildrenList: ColumnType<DefaultRecordType>[];
    rows: DefaultRecordType[][];
    // 可选属性
    clsPrefix?: string;
    locale?: string | Record<string, any>;
    rowStyle?: DefaultRecordType | null;
    minColumnWidth?: number;
    contentDomWidth?: number;
    scrollbarWidth?: number;
    tableUid?: string;
    dragborder?: boolean | 'default' | 'fixed';
    contentTable?: HTMLElement | null;
    headerScroll?: any;
    parentNode?: React.ReactNode,
    columnManager?: ColumnManager;
    filterable?: boolean;
    lastShowIndex?: number;
    leftFixedWidth?: number;
    rightFixedWidth?: number;
    // onMouseMove?: React.MouseEvent<HTMLElement>;
    onDraggingBorder?: (e?:React.DragEvent<HTMLElement>, width?: number) => void;
    onDragEnd?: (e?:React.DragEvent<HTMLElement>, onDragEndData?: OnDragEndType) => void;
    onMouseDown?: (e?:React.MouseEvent<HTMLElement>) => void;
    onDrop?: (e?:React.DragEvent<HTMLElement>, onDragData?: OnDragEndType) => void;
    onFilterChange?: (key:string | number, value?:string, condition?:string) => void;
    onFilterClear?: (dataIndex: DataIndex) => void;
    onCopy?: (data?: DefaultRecordType, e?: React.ClipboardEventHandler<HTMLTableHeaderCellElement>) => void;
    bodyDisplayInRow?: boolean;
    eventNoStop?: boolean;
    onDropBorder?: (e?:React.DragEvent<HTMLElement>, width?: number) => void;
    fixed?: FixedType;
    afterDragColWidth?: (data: AfterDragColWidthType) => void;
    filterDelay?: number;
    onHeaderRow?: (columns?: DefaultRecordType[], index?: number) => void;
    fieldid?: string;
    bordered?: boolean;
    bigColumns?: boolean;
    headerHeight?: number | null;
    maxLevel?: number; // 最大层级
    expandIconColumnIndex?: number;
    expandedIcon?: JSX.Element;
    collapsedIcon?: JSX.Element;
    headerShowExpandIcon?: boolean;
    onExpandedAll?: (expand: boolean) => void;
    needIndentSpaced?: boolean;
    expanded?: boolean;
    expandIconAsCell?: boolean;
    showHeaderExpandIcon?: boolean;
    expandableColumnTitle?: React.ReactNode;
    showExpandColumn?: boolean;
    dir?: 'ltr' | 'rtl';
}
