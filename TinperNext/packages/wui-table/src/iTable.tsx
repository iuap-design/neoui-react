/*
 * @Author: Mr.mjc
 * @Date: 2022-06-15 10:09:42
 * @LastEditors: MJC
 * @LastEditTime: 2025-02-10 15:49:55
 * @Description:
 * @FilePath: /next-ui/packages/wui-table/src/iTable.tsx
 */
import * as React from 'react';
import { BaseProps } from '../../wui-core/src/iCore';
import { SpinProps } from '../../wui-spin/src/iSpin';
import { SelectValue, SelectProps } from '../../wui-select/src/iSelect';
import { InputNumberDefaultProps } from '../../wui-input-number/src/iInputNumber';

import {
    Key,
    DataIndex,
    FixedType,
    FilterTypes,
    FilterDropdownTypes,
    FilterDropdownAutoType,
    FilterDropdownDataType,
    FieldTypes,
    AlignTypes,
    GetRowKey,
    GetComponentProps,
    RowClassName,
    TriggerEventHandler,
    PanelRender,
    WrapperRener,
    DropEventHandler,
    PositonType,
    ScrollPositionType,
    ObjRenderType,
    EventHandler,
    DefaultRecordType,
    DropDataSourceType,
    FocusHandler,
    FilterDropdownKeysStrType,
    FilterDropdownKeysNumType,
    RenderExpandIcon,
    DropDataEventHandlers,
    AfterDragColWidthType,
    GetSelectedDataFuncType,
    InputValueType,
    SingleGetSelectedDataFuncType,
    SortDirectionsKey,
    SortColType
} from './interface';

export type {
    Key,
    DataIndex,
    FixedType,
    FilterTypes,
    FilterDropdownTypes,
    FilterDropdownAutoType,
    FilterDropdownDataType,
    FieldTypes,
    AlignTypes,
    GetRowKey,
    GetComponentProps,
    RowClassName,
    TriggerEventHandler,
    PanelRender,
    WrapperRener,
    DropEventHandler,
    PositonType,
    ScrollPositionType,
    ObjRenderType,
    EventHandler,
    DefaultRecordType,
    DropDataSourceType,
    FocusHandler,
    FilterDropdownKeysStrType,
    FilterDropdownKeysNumType,
    RenderExpandIcon,
    DropDataEventHandlers,
    AfterDragColWidthType,
    GetSelectedDataFuncType,
    InputValueType,
    SingleGetSelectedDataFuncType,
    SortDirectionsKey,
    SortColType
}

export interface ShowRowNumType extends ColumnType {
    key?: string;
    fixed?: FixedType;
    width?: number | string;
    name?: string | React.ReactNode;
    type?: string;
    base?: number | string;
}

export interface SorterType {
    compare?: (a:DefaultRecordType, b: DefaultRecordType) => number;
    multiple?: number
}


export interface ColumnSharedType {
    title?: React.ReactNode | string;
    key?: Key;
    className?: string;
    fixed?: FixedType;
}

export interface ColumnGroupType<T> extends ColumnSharedType {
    children: ColumnsType<T>;
}


export interface ColumnType<T extends DefaultRecordType = DefaultRecordType> extends ColumnSharedType{
    dataIndex?: DataIndex;
    colSpan?: number;
    rowSpan?: number;
    children?: React.ReactNode | ColumnType<T>[];
    width?: number | string;
    columnType?: string;
    sumCol?: boolean;
    sumThousandth?: boolean;
    render?: (text: any, record: T, index: number, renderConfig?: Record<string, any>) => React.ReactNode | any;
    notRowDrag?: boolean;
    onCell?: GetComponentProps<T>;
    onCellClick?: (record: T, e: React.MouseEvent<HTMLElement>, index?: number) => void;
    onHeadCellClick?: (record: T, e: React.MouseEvent<HTMLElement>) => void;
    filterType?: FilterTypes;
    filterDropdown?: FilterDropdownTypes;
    format?: string;
    filterDropdownAuto?: FilterDropdownAutoType;
    filterDropdownData?: FilterDropdownDataType[];
    // filterDropdownFocus?: (record: T, e: React.MouseEvent<HTMLElement>) => void;
    filterDropdownType?: number | string;
    filterDropdownIncludeKeys?: FilterDropdownKeysStrType[] | FilterDropdownKeysNumType[];
    filterDropdownOptions?: any;
    filterInputNumberOptions?: InputNumberDefaultProps;
    mergeEndIndex?: number;
    sortEnable?: boolean;
    fieldType?: FieldTypes;
    fontColor?: string;
    bgColor?: string;
    titleAlign?: AlignTypes;
    contentAlign?: AlignTypes;
    textAlign?: AlignTypes;
    required?: boolean;
    isShow?: boolean;
    ifshow?: boolean;
    style?: React.CSSProperties;
    fieldid?: string;
    drgHover?: boolean;
    dragborder?: boolean | 'default' | 'fixed';
    onHeaderCell?: GetComponentProps<ColumnsType<T>[number]>;
    filterDropdownFocus?:FocusHandler;
    draggable?: boolean;
    sorter?: ((a:DefaultRecordType, b: DefaultRecordType) => number) | SorterType | boolean | 'number' | 'string' | 'date';
    align?: AlignTypes;
    sortOrder?: boolean | string;
    order?: string | boolean | null;
    orderNum?: number;
    // sorterClick?: Function;
    ellipsis?: boolean;
    dragIndex?: number;
    checked?: boolean;
    lockIndex?: number;
    parentIndex?: number;
    singleFilter?: boolean;
    onFilter?: (value?: string, record?: DefaultRecordType) => boolean;
    filterMultiple?: boolean;
    singleFind?: boolean;
    field?: DataIndex;
    sorterClick?:(column: ColumnType, tempType: string) => void;
    sortDirections?: SortDirectionsKey[];
    sumRender?: (value?: number | string) => void;
    getMultiSorterValue?: (data?: DefaultRecordType, currentCol?: ColumnType) => void;
    showSorterTooltip?: boolean | Record<string, any>;
    // 额外
    _hasFilterColumn?: boolean;
    _hasSingleFilter?: boolean;
    _hasSingleFind?: boolean;
    _hasSort?: boolean;
    _originTitle?: React.ReactNode | string;
    innerHeaderIcon?: any,
    shouldCellUpdate?: (record: DefaultRecordType, prevRecord: DefaultRecordType) => boolean | undefined;
    nid?: string;
    uitype?: string;
    uirunmode?: string;
    totalRender?: string | number | ((column: ColumnType, data: DefaultRecordType[]) => void);
    sumPrecision?: number;
    tip?: React.ReactNode | string | ((column: ColumnType) => void); // 列提示
    singleFilterType?: 'list' | 'date';
    filters?: any[];
    searchCondition?: (record: DefaultRecordType, column: ColumnType, value: string) => boolean;
}

// 适用内部column规则界定，不对外使用
export interface InnerColumnType extends ColumnType {
    // 新的column再sticky下使用
    // isSticky?: boolean; // 优化掉
    offsetWidth?: number | string;
    isLastLeft?: boolean;
    isFirstRight?: boolean;
    isAllLeft?: boolean;
    // 后两个排斥的是否可以合并一个变量
}

export type ColumnsType<T = DefaultRecordType> = (ColumnGroupType<T> | ColumnType<DefaultRecordType>)[];
export interface DropType<T=any> {
    dragSource?: T;
    dragTarget?: T;
}
export type ExpandIconType<T = DefaultRecordType> = (record?: T, index?: number) => boolean;


export interface RowSelectionType<T = DefaultRecordType> {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: Key[];
    defaultSelectedRowKeys?: Key[];
    getCheckboxProps?: (record?:T, index?: number) => Record<string, any>;
    onSelect?: (record?:T, selected?:boolean, selectedRows?: T[], nativeEvent?:React.MouseEvent<HTMLElement>) => void;
    onChange?: (selectedRowKeys?: Key[], selectedRows?: T[], e?:React.MouseEvent) => void;
    checkStrictly?: boolean;
    onSelectAll?: (check?: boolean, selectedRows?: T[], changeRows?: T[]) => void;
    onSelectInvert?: (selectedRowKeys?: Key[]) => void;
    onSelectNone?: () => void;
    selections?: any[] | true;
    columnTitle?: React.ReactNode | string;
    columnWidth?: number | string;
    fixed?: FixedType;
    hideSelectAll?: boolean;
    renderCell?: (text: any, record: T, index: number, renderConfig?: Record<string, any>) => React.ReactNode | any;
}

export interface TableProps<T extends DefaultRecordType = DefaultRecordType> extends BaseProps {
    // 必填属性
    data: T[];
    prefixCls: string;
    expandIconAsCell: boolean;
    defaultExpandAllRows: boolean;
    expandedRowKeys: Key[];
    columnKey: string;
    rowKey: string | GetRowKey<T>;
    bordered: boolean;
    rowClassName: RowClassName<T>;
    expandedRowClassName: RowClassName<T>;
    onExpand: (expanded: boolean, record: T, index?: number) => void;
    onExpandedRowsChange: (expandedKeys: Key[]) => void;
    onRowClick: TriggerEventHandler<T>;
    bodyStyle: React.CSSProperties;
    style: React.CSSProperties;
    childrenColumnName: string;
    indentSize: number;
    expandIconColumnIndex: number;
    showHeader: boolean;
    scroll: {
        x?: string | number | boolean | undefined;
        y?: string | number | undefined;
    };
    rowRef: (record?: T, index?: number, indent?: number) => string | null;
    getBodyWrapper: WrapperRener;
    // columns: ColumnsType<T>;
    columns: ColumnType<T>[];
    minColumnWidth: number;
    maxColumnWidth?: number;
    syncHover: boolean;
    tabIndex: number;
    height: number | null | undefined;
    // heightConsistent: boolean;
    // syncFixedRowHeight: boolean;
    // size: string; // 废弃
    rowDraggAble: boolean;
    hideDragHandle: boolean;
    onDropRow: DropDataEventHandlers<T[], T>;
    onDragRowStart: DropEventHandler<T>;
    onRowDrop: DropEventHandler<T>;
    onBodyScroll: (scrollTop: number) => void;
    bodyDisplayInRow: boolean;
    headerDisplayInRow: boolean;
    headerHeight: number | null | undefined;
    showRowNum: boolean | ShowRowNumType;
    onPaste: (event?: React.ClipboardEvent<HTMLTableDataCellElement>, positon?: PositonType) => void;
    originWidth: number | null | undefined;
    selectedRowKeys: Key[];
    stripeLine: boolean;
    findRowKeys: Key[];
    locale: string | Record<string, any>;
    fillSpace: boolean;
    // 可选属性
    defaultExpandedRowKeys?: Key[];
    useFixedHeader?: boolean;
    clsPrefix?:string;
    onRowHover?: (index: number, record: T, isHover: boolean, tr?: any) => void;
    onRowDoubleClick?: TriggerEventHandler<T>;
    title?: PanelRender<T>;
    footer?: PanelRender<T>;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    children?: JSX.Element[];
    draggable?: boolean;
    filterable?: boolean;
    filterDelay?: number;
    onFilterChange?: (field?: DataIndex, value?: string, condition?: string) => void;
    onFilterClear?: (dataIndex?: DataIndex) => void;
    hoverContent?: (data?: T | null, index?: number | null) => JSX.Element | null;
    popMenu?: (rowKeys?: Key[], colKeys?: Key[]) => {key: Key, text: Key}[];
    onPopMenu?: (open: boolean, rowKeys?: Key[], colKeys?: Key[]) => void;
    onPopMenuClick?: (type: Key, rowKeys: Key[], colKeys: Key[]) => void;
    onBodyMouseLeave?:(event?: React.MouseEvent<HTMLElement>) => void;
    scrollTop?: number;
    lazyLoad?: undefined | ObjRenderType;
    ignoreScrollYChange?:boolean;
    onResize?: () => void;
    onDrop?: (event?: React.MouseEvent<HTMLElement>, DropType?: DropType<T>) => void;
    // onDragEnd?: (event?: React.MouseEvent<HTMLElement>, DropType?: DropType<T>) => void;
    onMouseDown?:(event?: React.MouseEvent<HTMLElement>) => void;
    dragborder?: boolean | 'default' | 'fixed';
    onDropBorder?: (event?: React.MouseEvent<HTMLElement>, width?: number, column?: ColumnType<T>, columns?:ColumnsType) => void;
    onDraggingBorder?: (event?: React.MouseEvent<HTMLElement>, width?: number, column?: ColumnType<T>, columns?: ColumnsType) => void;
    // dragborderKey
    afterDragColWidth?: (data: AfterDragColWidthType) => void;
    // headerScroll?: boolean;
    headerEventNoStop?: boolean;
    onCopy?: (data?: DefaultRecordType, e?: React.ClipboardEventHandler<HTMLTableHeaderCellElement>) => void;
    resetScroll?: boolean;
    footerScroll?: boolean;
    // hideHeaderScroll?: boolean;
    getCellClassName: (record?: T, index?: number, column?: T) => string;
    useDragHandle?: boolean;
    expandedRowRender?: (record: T, index?: number, indent?: number) => string | JSX.Element;
    expandRowByClick?: boolean;
    haveExpandIcon?: ExpandIconType<T>;
    showExpandIcon?: boolean | ExpandIconType<T>;
    expandedIcon?: JSX.Element;
    collapsedIcon?: React.ReactNode;
    expandIcon?: RenderExpandIcon<T>;
    showSum?: string[];
    // setRowParentIndex
    handleScrollY?: (scrollTop?: number, treeType?: boolean, cb?: (scrollTop?: number) => void) => void;
    handleScrollX?: (scrollTop?: number, treeType?: boolean, e?: any) => void
    onKeyTab?: (e?:React.FocusEvent<HTMLElement>) => void;
    onKeyUp?:(e?:React.KeyboardEvent<HTMLElement>) => void;
    onKeyDown?: (e?:React.KeyboardEvent<HTMLElement>) => void;
    onTableKeyDown?: (e?:React.KeyboardEvent<HTMLElement>) => void;
    focusable?: boolean;
    loading?: boolean | SpinProps;
    expandIconCellWidth?: number;
    onRow?: (record?: T, index?: number) => void;
    onHeaderRow?: (record?: T, index?: number) => void;
    onRowDragStart?: (options: Record<string, any>) => void;
    onRowDragDrop?: (options: Record<string, any>) => void;
    bodyClassName?: string;
    footerClassName?: string;
    emptyClassName?: string;
    fieldid?: string;
    onDragStart?: EventHandler;
    onDragEnter?: EventHandler;
    onDragOver?:EventHandler;
    setRowHeight?: (height?: number, index?: number, rowKey?: Key) => void;
    className?: string;
    currentIndex?: number
    // _onDataChange?: (data?: T[]) => void;
    // **** antd组件相关的
    autoSelect?: boolean;
    tableLayout?: string;
    dataSource?: T[];
    rowSelection?: RowSelectionType;
    expandable?: DefaultRecordType;
    pagination?: false | DefaultRecordType;
    onChange?: any;
    isBigData?: boolean;
    // **** bigData
    loadBuffer: number;
    isTree?: null | boolean;
    // ****DragColumn
    onDragEnd?: (event?: React.MouseEvent<HTMLElement>, DropType?: DropType<T>, sortedColumns?: ColumnType[]) => void;
    // **** filterColumn
    filterCheckboxProps?: (column?: ColumnType) => Record<string, any>;
    columnFilterAble?: boolean;
    checkMinSize?: number;
    lockable?: boolean | 'disable' | 'enable' | 'onlyHeader' | 'onlyPop';
    afterFilter?: (columns?:ColumnsType<T>, tempColumns?:ColumnsType<T>) => void;
    columnSetPopover?: boolean;
    // **** multiSelect
    autoCheckedByClickRows?: boolean;
    getSelectedDataFunc?: GetSelectedDataFuncType<T>;
    // getSelectedDataFunc?: GetSelectedDataFuncType<T> | SingleGetSelectedDataFuncType<T>;
    multiSelectConfig?: ObjRenderType;
    _onDataChange?: (data?: T[]) => void;
    _checked?: boolean;
    _disabled?: boolean;
    // **** singleSelect
    selectedRowIndex: number | string | boolean;
    // **** sort
    sort?: {
        mode?: string, // 单列排序,
        backSource?:boolean, // 默认是前端排序，值为true为后端排序
        sortFun?: (sortCol?: SortColType[], data?: DefaultRecordType[], oldData?: DefaultRecordType[]) => void
    };
    sumClassName?: string;
    sortDirections?: SortDirectionsKey[];
    scrollMode?: 'table' | 'sticky';
    currentScrollColumn?: string;
    bigColumns?: boolean;
    columnsLoadBuffer?: number;
    // filterColumn属性
    filterColumnContent?: JSX.Element;
    filterColumnShowModal?: boolean;
    filterColumnOnHide?: () => void;
    filterColumnOnVisibleChange?: (flag: boolean) => void;
    filterColumnOpenCloumList?: (adaptiveHeight?: number) => void;
    // 是否来源antdTable组件
    antd?: boolean;
    selectType?: 'checkbox' | 'radio' | false;
    onExpandAll?: (expand: boolean, expandedRowKeys: any[]) => void;
    showHeaderExpandIcon?: boolean;
    // 兼容的扩展系列属性
    expandableColumnTitle?: React.ReactNode
    expandIconFixed?: 'left' | 'right' | true | false, // 暂都为左固定
    showExpandColumn?: boolean
    showSorterTooltip?: boolean | Record<string, any>;
    originData?: DefaultRecordType[]; // 大数据模式下传的未截取的全部数据，单选多选取key使用
    sumdata?: DefaultRecordType; // 合计行的数据
    findCurrentRowKey?: string | Key;
    cacheId?: string; // 缓存关于表格列的操作的唯一标识
    // filterColumnRender?: (column?:ColumnsType) => void;
    filterColumnRender?: (column?: ColumnType) => void;
    onSingleFilterRender?: (column?: ColumnType) => void;
    filterMode: 'single' | 'multiple', // 单列过滤模式
    scrollType?: 'multiple' | 'single'; // 滚动条模式
    rowActiveKeys?: boolean | Key[];
    sumPrecision?: number;
    onFilterColumnRender?: (columns?: ColumnType[]) => JSX.Element;
    keyToIndex: any;
    bigData?: boolean;
    clearFilter?: boolean;
    resetFilterColumns?: (columns?: ColumnType[]) => void;
    singleFilter?: boolean;
    addEmptyColumn?: boolean | number;
    openSelectCells?: boolean; // 开启单元格框选，点选
    dir?: 'rtl' | 'ltr';
    filterColumnClassName?: string; // 内部用
    onSetColumnVisibleChange?: (visible: boolean) => void;
    onSetColumnReset?: (columns: ColumnType[]) => ColumnType[];
    isEmptyHiddenIcon?: boolean;
}

export interface TableState<T = DefaultRecordType> {
    data: T[];
    expandedRowKeys: Key[];
    currentHoverKey?: null | number;
    scrollPosition?: ScrollPositionType;
    fixedColumnsHeadRowsHeight?: null | number;
    fixedColumnsBodyRowsHeight?: number[];
    fixedColumnsExpandedRowsHeight: Record<Key, number>;
    scroll?: {
        x?: string | number | boolean | undefined;
        y?: string | number | undefined;
    } | undefined;
    cssRowHeight?: number | null;
    cssRowHeaderHeight?: number | null;
    currentHoverRecord?: T | null;
    currentHoverIndex?: number;
    copyCurrentHoverIndex?: number | null;
    copyCurrentHoverRecord?: T | null;
    contentWidthDiff?: number;
    lastDataIndex?: Key | null;
    lastShowIndex?: number;
    resizerVisible?: boolean;
    resizerLineHeight?: number;
    resizerLineLeft?: number;
    resizerDefaultWidth?: number;
    resizerMinWidth?: number;
    resizerMaxWidth?: number;
    dataSource?: DropDataSourceType;
    renderFlag?: boolean,
    defaultColumnWidth: number,
    contextMenuKey?: Key | null,
	contextMenuDataIndex?: Key | null,
    contentDomWidth: number,
    selectCellColumnKeys: Key[],
    selectCellRowsKeys: Key[],
}

// antd
export interface IAntdTableState<T = DefaultRecordType> extends Partial<TableState<T>> {
    _selectedRowKeys: Key[];
    _expandedRowKeys: Key[];
    pagination?: boolean | DefaultRecordType;
}

// bigData
export interface IBigDataXState<T = DefaultRecordType> extends Partial<TableState<T>> {
    needRender: boolean;
    scrollTop: number;
    showCount: number;
    treeType: boolean;
}

// bigColumn
export interface IBigColumnState<T = DefaultRecordType> extends Partial<TableState<T>> {
    // needRender: boolean;
    // scrollTop: number;
    // showCount: number;
    // treeType: boolean;
}

// dragColumn
export interface IDragColumnState<T = DefaultRecordType> extends Partial<TableState<T>> {
    columns: ColumnType[]
}

// filterColumn
export interface IFilterColumnState<T = DefaultRecordType> extends Partial<TableState<T>> {
    columns: ColumnType[];
    tempColumns: ColumnType[];
    srcColumns: ColumnType[];
    showModal: boolean;
    searchStr: string;
    adaptiveHeight: number;
}
// multiSelect
export interface IMultiSelectXState<T = DefaultRecordType> extends Partial<TableState<T>> {
    isControlled: boolean;
    selectedRowKeys: Key[];
    data: T[];
    disableKeys: Key[];
}

// singleFilter
export interface ISingleFilterState<T = DefaultRecordType> extends Partial<TableState<T>> {
    data: T[];
    flatColumns: ColumnType<DefaultRecordType>[];
    columns: ColumnType<DefaultRecordType>[];
    showTop: boolean;
    filterObj: ObjRenderType;
}

// singleFind
export interface ISingleFindState<T = DefaultRecordType> extends Partial<TableState<T>>{
    data: T[];
    flatColumns: ColumnType<DefaultRecordType>[];
    columns: ColumnType<DefaultRecordType>[];
    currentIndex: number;
    showTop: boolean;
    inputValue: ObjRenderType;
}

// singleSelect
export interface ISingleSelectState extends Partial<TableState> {
    // selectedRowIndex: number | string | boolean;
    data: DefaultRecordType[];
    selectedRowKeys: Key[];
    isControlled: boolean;
}

// sort
export interface ISortState<T = DefaultRecordType> extends Partial<TableState<T>> {
    data: T[];
    columns: ColumnType<DefaultRecordType>[];
    flatColumns: ColumnType<DefaultRecordType>[];
    oldData: T[];
}

export interface IDragRowLineProps<T = DefaultRecordType> {
    container: React.ReactInstance;
    clsPrefix?: string;
    bigData?: boolean;
    data?: T[];
    onRowDragStart: (option?: {dragStartKey?: Key, dragStartIndex?: number}) => void,
    onRowDragDrop: (option?: {dragTargetKey?: Key,
        dragTargetIndex?: number,
        dropTargetKey?: Key,
        dropTargetIndex?: number
        event?: React.DragEvent<HTMLElement>}) => void;
    useDragHandle: boolean;
    onRowDrop: DropEventHandler<T>;
}

export interface IDragRowLineState {
    visible: boolean;
    top: number,
    left: number,
    width: number
}

export interface IDragResizerLineProps {
    container: React.ReactInstance;
    clsPrefix?: string;
    dataSource?: DropDataSourceType;
    onResizeEnd?: (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => void;
    onResizeCancel?: () => void;
    onChange?: (event:React.MouseEvent<HTMLElement>, moveX: number, info?: DropDataSourceType) => void;
    visible?: boolean;
    left?: number;
    height?:number;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    contentDomWidth?: number;
    dir?:'ltr' | 'rtl';
    dragborder?: boolean | 'default' | 'fixed';
}


export interface IDragResizerLineState {
    left: number | null | undefined;
    x: number;
    moveX: number;
}

export interface IFilterTypeProps{
    // data?: SelectDataSourceType[];
    options?:SelectProps<SelectValue>['data'];
    notFoundContent?: string;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    rendertype: string;
    filterDropdown?: FilterDropdownTypes;
    filterDropdownType?: string;
    onFilterClear?: (dataIndex: DataIndex) => void;
    onFilterChange?: (field?: DataIndex, value?: string, condition?: string) => void;
    onChange?: any; // TODO
    onSelectDropdown?: any; // TODO
    filterdropdownoptions?: any;
    filterDropdownOptions?: any;
    filterInputNumberOptions?: InputNumberDefaultProps;
    filterDropdownIncludeKeys?: FilterDropdownKeysStrType[] | FilterDropdownKeysNumType[];
    locale?:string | Record<string, any>;
    dataIndex?: DataIndex;
    format?: any;
    className?: string;
    clsPrefix?: string;
    fieldid?: string;
    dir?: 'rtl' | 'ltr'
}

export interface IFilterTypeState{
    value: string,
    text: string,
    selectValue: string,
    dateValue: string,
    open: boolean,
    condition: string,
    number: number,
    timeOpen: boolean
}

export interface IFilterDropDownProps{
    locale?: string | Record<string, any>;
    dataIndex?: DataIndex;
    dataText?: string;
    onSelectDropdown?: any; // TODO
    onClickClear?: Function;
    isShowCondition?: string;
    isShowClear?: string | boolean;
    filterDropdownType?: string | number;
    filterDropdownIncludeKeys?: FilterDropdownKeysStrType[] | FilterDropdownKeysNumType[];
    fieldid?: string;
    conditionValue?: string;
    dir?: 'rtl' | 'ltr'
}
export interface IFilterDropDownState{
    selectValue: string[];
    selectNumberValue: string[];
}

export interface FilterColumnContainerProps {
    unDragArrLeft: ColumnType[];
    dragArr: ColumnType[];
    unDragArrRight: ColumnType[];
    prefixCls: string;
    checkedColumItemClick: (da?: ColumnType) => void;
    lockable: boolean | 'disable' | 'enable' | 'onlyHeader' | 'onlyPop';
    lockClick: (da?: ColumnType) => void;
    onDragEnd: (dragIndex: number, hoverIndex: number) => void;
    filterCheckboxProps?: (_column?: ColumnType) => {};
}


export interface FilterColumnCardProps {
    prefixCls: string;
    data: ColumnType;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    checkedColumItemClick: (da?: ColumnType) => void;
    lockable: boolean | 'disable' | 'enable' | 'onlyHeader' | 'onlyPop';
    lockClick: (da?: ColumnType) => void;
    filterCheckboxProps?: (_column?: ColumnType) => {};
}