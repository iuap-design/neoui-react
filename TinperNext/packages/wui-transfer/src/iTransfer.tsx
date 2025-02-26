import React from 'react'
import { BaseProps } from '../../wui-core/src/iCore';

export type TransferKeyType = string | number | boolean;

export type OperationsType = Partial<Record<'rightAll' | 'rightOne' | 'leftAll' | 'leftOne', {'text'?: string, 'index'?: number}>> | string[]

export type SelectAllLabel =
  | React.ReactNode
  | ((info: { checkedCount: number; totalCount: number, checkedKeys: TransferKeyType[], totalDataSource: TransferItem[] }) => React.ReactNode);

export interface TransferItem {
    key: TransferKeyType;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}

export interface SplitedDataSource {
    leftDataSource: TransferItem[],
	rightDataSource: TransferItem[]
}

export interface RenderItemObj {
    value: string;
    label: React.ReactElement;
}

export interface DragSource {
    index: number;
    droppableId: string;
}

export interface ReOrder {
    dataArr?: TransferItem[];
    targetKeyArr?: TransferKeyType[];
}

export interface Move {
    droppable1?: TransferItem[];
    droppable2?: TransferItem[];
    newTargetKeys?: TransferKeyType[];
}

export interface TransferProps extends Omit<BaseProps, 'children'> {
    prefixCls?: string;
    locale?: string,
    dataSource: TransferItem[];
    render: (item: TransferItem) => React.ReactElement | RenderItemObj | string;
    targetKeys: TransferKeyType[];
    onChange?: (targetKeys: TransferKeyType[], direction: string, moveKeys: TransferKeyType[] | TransferKeyType) => void;
    onScroll?: (direction: string, event: React.UIEvent<HTMLElement>) => void;
    // height?: number;
    listStyle?: React.CSSProperties;
    titles?: [string, string];
    operations: OperationsType;
    showSearch: boolean;
    filterOption?: (filter: string, item: TransferItem) => void;
    searchPlaceholder?: string;
    notFoundContent?: React.ReactNode;
    body?: (props?: TransferListProps) => React.ReactNode;
    footer?: (props?: TransferListProps) => React.ReactNode;
    rowKey?: (record: TransferItem) => string;
    lazy?: { container: string };
    showCheckbox: boolean;
    draggable: boolean;
    appendToBottom: boolean;
    renderOperation?: () => React.ReactNode;
    onSelectChange?: (keys1: TransferKeyType[], keys2: TransferKeyType[]) => void;
    selectedKeys?: TransferKeyType[];
    children?: (props: TransferListBodyProps) => React.ReactNode;
    disabled?: boolean;
    selectAllLabels?: SelectAllLabel[];
    onSearchChange?: (direction: string, value: string) => void;
    dir?: 'ltr' | 'rtl'| undefined
}

export interface TransferState {
    leftFilter: string;
    rightFilter: string;
    sourceSelectedKeys: TransferKeyType[];
    targetSelectedKeys: TransferKeyType[];
    leftDataSource: TransferItem[];
    rightDataSource: TransferItem[];
    droppableId: string;
    draggingItemId: string;
}

export interface TransferListProps extends Partial<Pick<TransferProps, 'dataSource' | 'render' | 'prefixCls'
     | 'showSearch' | 'filterOption' | 'searchPlaceholder' | 'notFoundContent' | 'footer' |
    'body' | 'lazy' | 'showCheckbox' | 'draggable'>>, BaseProps {
    titleText?: string;
    checkedKeys?: TransferKeyType[];
    id?: string;
    filter?: string;
    droppableId?: string;
    draggingItemId?: string;
    handleSelectAll?: (filteredDataSource: TransferItem[], checkAll: boolean) => void;
    handleScroll?: (e: React.UIEvent<HTMLElement>) => void;
    handleClear?: () => void;
    handleFilter?: (v: string) => void;
    handleSelect?: (selectedItem: TransferItem, checked?: boolean) => void;
    direction?: string;
    renderList?: (props: TransferListBodyProps) => React.ReactNode;
    disabled?: boolean;
    selectAllLabel?: SelectAllLabel;
}

export interface TransferListBodyProps extends TransferListProps {
    onItemSelect: TransferListProps['handleSelect'],
    onItemSelectAll: TransferListProps['handleSelectAll'],
}

export interface TransferListState {
    mounted: boolean
}

export type TransferListMixin = [
    nextProps: TransferListProps,
    nextState: TransferListState
]

export interface RenderCheckboxObj {
    prefixCls: string;
    filteredDataSource: TransferItem[];
    checked: boolean;
    checkPart: boolean;
    disabled: boolean;
}

export interface SearchProps extends BaseProps {
    prefixCls?: string;
    placeholder?: string;
    onChange?: (searchValue: string) => void;
    value?: string;
    handleClear?: (e: React.MouseEvent) => void;
    disabled?: boolean;
}

export interface SearchState {}

export interface OperationProps extends BaseProps {
    // leftArrowText?: string;
    // rightArrowText?: string;
    operations: OperationsType;
    moveToLeft?: () => void,
    moveToRight?: () => void,
    allMoveToLeft?: () => void,
    allMoveToRight?: () => void,
    renderOperation?: () => void,
    leftActive?: boolean;
    rightActive?: boolean;
    allLeftActive?: boolean;
    allRightActive?: boolean;
    dir?: 'ltr' | 'rtl'| undefined

}

export interface OperationState {}

export interface TransferItemProps extends Pick<TransferProps, 'lazy' | 'prefixCls' | 'showCheckbox'>,
Pick<TransferListProps, 'checkedKeys' | 'draggingItemId'> {
    item?: TransferItem;
    onClick?: (item: TransferItem) => void;
    renderedText?: string;
    renderedEl?: string | React.ReactNode;
    isMultiDragSource?: boolean;
    checked?: boolean;
}

export interface TransferItemStates {}

export type TransferItemMixin = [
    nextProps: TransferItemProps,
    nextState: TransferItemStates
]

export interface DragResult {
    destination: DragSource
    draggableId: string;
    reason: string;
    source: DragSource;
    type: string;
}