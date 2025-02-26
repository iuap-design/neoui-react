import React from 'react';
import type { BaseSelectRef, SelectProps } from 'rc-select';

import { TreeNode } from 'rc-tree-select';
import { AlignType, BaseProps, BorderType, SizeType } from '../../wui-core/src/iCore';
import { ResizeStartCallback, ResizeCallback } from 're-resizable';
export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type RawValueType = string | number;
export interface BaseTreeDataOption {
    disabled?: boolean;
    checkable?: boolean;
    disableCheckbox?: boolean;
    children?: BaseTreeDataOption[];
    [name: string]: any;
}

export interface TreeDataOption extends BaseTreeDataOption {
    value?: RawValueType;
    title?: React.ReactNode;
    label?: React.ReactNode;
    key?: React.Key;
    children?: TreeDataOption[];
}

export interface LabeledValueType {
    key?: React.Key;
    value?: RawValueType;
    label?: React.ReactNode;
    halfChecked?: boolean;
}

export interface TreeDataSimpleMode {
    id?: React.Key;
    pId?: React.Key;
    rootPId?: React.Key;
}

export interface ChangeEventExtra {
    preValue: LabeledValueType[];
    triggerValue: RawValueType;
    selected?: boolean;
    checked?: boolean;
    triggerNode: React.ReactElement;
    allCheckedNodes: any[]; // extra属性在各处使用时都是返回undefined，暂时这么定义
}

export interface FieldNames {
    value?: string;
    label?: string;
    children?: string;
}

export interface TreeSelectRef extends BaseSelectRef {
}
export interface BaseOptionType {
    disabled?: boolean;
    checkable?: boolean;
    disableCheckbox?: boolean;
    children?: BaseOptionType[];
    [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
    value?: RawValueType;
    title?: React.ReactNode;
    label?: React.ReactNode;
    key?: React.Key;
    children?: DefaultOptionType[];
}
export interface LegacyDataNode extends DefaultOptionType {
    props: any;
}
export interface DisplayValueType {
    key?: React.Key;
    value?: RawValueType;
    label?: React.ReactNode;
    disabled?: boolean;
}
export declare const SHOW_ALL = "SHOW_ALL";
export declare const SHOW_PARENT = "SHOW_PARENT";
export declare const SHOW_CHILD = "SHOW_CHILD";

export type CheckedStrategy = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;

export type MaxTagCount = number | 'responsive';
export interface TreeSelectProps<ValueType=any> extends BaseProps {
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    multiple?: boolean;
    treeCheckable?: boolean | React.ReactNode;
    showSearch?: boolean;
    treeData?: TreeDataOption[];
    dropdownClassName?: string;
    popupClassName?: string;
    size?: SizeType;
    notFoundContent?: string;
    dropdownStyle?: React.CSSProperties;
    suffixIcon?: React.ReactNode;
    loadData?: (dataNode: LegacyDataNode) => Promise<unknown>;
    align?: AlignType;
    bordered?: BorderType;
    requiredStyle?: boolean;
    allowClear?: boolean;
    autoClearSearchValue?: boolean;
    defaultValue?: ValueType;
    disabled?: boolean;
    dropdownMatchSelectWidth?: boolean | number;
    dropdownRender?: (node: React.ReactElement, Footer?: (obj: any) => React.ReactNode) => React.ReactElement;
    filterTreeNode?: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean);
    labelInValue?: boolean;
    listHeight?: number;
    maxTagCount?: MaxTagCount;
    maxTagPlaceholder?: React.ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode);
    placeholder?: string;
    searchValue?: string;
    showArrow?: boolean;
    showCheckedStrategy?: CheckedStrategy;
    switcherIcon?: React.ReactElement;
    treeCheckStrictly?: boolean;
    treeDataSimpleMode?: boolean | TreeDataSimpleMode;
    treeDefaultExpandAll?: boolean;
    treeDefaultExpandedKeys?: string[];
    treeExpandedKeys?: string[];
    treeIcon?: boolean;
    treeNodeFilterProp?: string;
    treeNodeLabelProp?: string;
    value?: ValueType;
    virtual?: boolean;
    onChange?: (value: ValueType, label: React.ReactNode[], extra: ChangeEventExtra) => void;
    onDropdownVisibleChange?: (open: boolean) => void;
    onSearch?: (value: string) => void;
    onSelect?: SelectProps<TreeDataOption>['onSelect'];
    onDeselect?: SelectProps<TreeDataOption>['onDeselect'];
    onTreeExpand?: (expandedKeys: string[]) => void;
    fieldNames?: FieldNames;
    open?: boolean;
    defaultOpen?: boolean;
    inputIcon?: React.ReactNode;
    removeIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
    onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    resizable?: boolean | 'vertical' | "horizontal";
    onResizeStart?: ResizeStartCallback;
    onResize?: ResizeCallback;
    onResizeStop?: ResizeCallback;
    placement?: Placement;
    locale: string | {[key: string]: any};
}
export interface TreeSelectState {
    listHeight: number;
    minWidth: number;
    maxHeight: number;
    maxWidth: number;
    resizeClass?: string;
    enable?: {
        top?: boolean,
        right?: boolean,
        bottom?: boolean,
        left?: boolean,
        topRight?: boolean,
        bottomRight?: boolean,
        bottomLeft?: boolean,
        topLeft?: boolean,
    },
}

export type TreeNodeType = typeof TreeNode