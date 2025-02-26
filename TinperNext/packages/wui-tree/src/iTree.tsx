import React, { CSSProperties } from 'react';
import { BaseProps, SizeType } from '../../wui-core/src/iCore';

export interface SibilingPosition {
    first?: boolean;
    last?: boolean;
}

export interface TreeNodesStatesItem {
    node: React.ReactElement;
    key?: string;
    checked?: boolean;
    halfChecked?: boolean;
    siblingPosition: SibilingPosition;
}

export interface TreeNodesStates {
    [name: string]: TreeNodesStatesItem
}

export interface TreeNodeStates {
    treeNodesStates: any,
    checkedKeys: string[],
    halfCheckedKeys: string[]
}

export interface CheckedKeysObj {
    checked: string[];
    halfChecked: string[];
}

export interface OnExpandInfo {
    node: React.ReactElement;
    expanded: boolean;
}

export interface CheckedNodeInfo {
    node: React.ReactNode;
    pos: string;
}

export interface OnCheckInfo {
    checked: boolean;
    checkedNodes?: React.ReactNode[];
    checkedNodesPositions?: CheckedNodeInfo[];
    event: string;
    eventObject: React.MouseEvent | React.KeyboardEvent | undefined;
    halfCheckedKeys?: string[];
    checkedChildrenKeys?: string[];
    node: React.ReactNode;
}

export interface OnSelectInfo {
    event: string;
    eventObject: React.MouseEvent | React.KeyboardEvent;
    node: React.ReactElement;
    selected: boolean;
    selectedNodes: React.ReactElement[];
}

export interface OnMouseInfo {
    event: React.MouseEvent;
    node: React.ReactElement;
}

export interface OnDragEnterInfo extends OnMouseInfo {
    expandedKeys: string[];
    dropPosition: number;
}

export interface OnDropInfo extends OnMouseInfo {
    dragNode: React.ReactElement;
    dropPosition: number;
    dragNodesKeys: string[];
    event: React.DragEvent;
    node: React.ReactElement;
    dropToGap?: boolean;
    rawExpandedKeys?: string[]
}

export interface TreeData {
    key?: string;
    title?: string | React.ReactElement;
    children?: TreeData[];
    disabled?: boolean;
    selectable?: boolean;
    [name: string]: any;
}

export interface FlatTreeData {
    key?: string;
    title?: string;
    isExpanded?: boolean;
    parentKey?: string | null;
    isShown?: boolean;
    isLeaf?: boolean;
    [name: string]: any;
}

export type RenderFunction = () => HTMLElement;

export interface DBClickInfo {
    event: string,
    node: React.ReactElement
}

export interface AnimateProps {
    transitionName?: string;
    animation?: {
        enter?: (node: HTMLElement, done: (el: React.ReactElement) => void) => void;
        leave?: (node: HTMLElement, done: (el: React.ReactElement) => void) => void;
        appear?: (node: HTMLElement, done: (el: React.ReactElement) => void) => void;
    }
}
export interface TreeProps extends BaseProps {
    showLine?: boolean;
    height?: number;
    showIcon?: boolean;
    selectable?: boolean;
    multiple?: boolean;
    checkable?: boolean | React.ReactNode,
    _treeNodesStates?: TreeNodeStates,
    checkStrictly?: boolean;
    draggable?: boolean;
    autoExpandParent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: string[];
    expandedKeys?: string[];
    defaultCheckedKeys?: string[];
    checkedKeys?: string[] | CheckedKeysObj;
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    onExpand?: (expandedKeys: string[], info: OnExpandInfo, e?: React.MouseEvent | React.KeyboardEvent) => void | Promise<any>;
    onCheck?: (checkedKeys: string[] | CheckedKeysObj, info: OnCheckInfo) => void;
    onSelect?: (selectedKeys: string[], info: OnSelectInfo) => void;
    loadData?: (treeNode: React.ReactNode) => Promise<any>;
    loadedKeys?: string[];
    onLoad?: (loadedKeys: string[], info: {event: 'load'; node: React.ReactElement}) => void;
    onMouseEnter?: (info: OnMouseInfo) => void;
    onMouseLeave?: (info: OnMouseInfo) => void;
    onRightClick?: (info: OnMouseInfo) => void;
    onDragStart?: (info: OnMouseInfo) => void;
    onDragEnter?: (info: OnDragEnterInfo) => void;
    onDragOver?: (info: OnMouseInfo & {extension?: {dropPosition?: string; dropPositionX: string}}) => void;
    onDragLeave?: (info: OnMouseInfo) => void;
    onDrop?: (info: OnDropInfo) => void;
    onDragEnd?: (info: OnMouseInfo) => void;
    filterTreeNode?: (treeNode: React.ReactNode) => boolean;
    openTransitionName?: string;
    focusable?: boolean;
    openAnimation?: AnimateProps['animation'];
    lazyLoad?: boolean;
    virtual?: boolean;
    treeData?: TreeData[];
    renderTreeNodes?: (data: TreeData[]) => React.ReactElement[];
    autoSelectWhenFocus?: boolean;
    getScrollContainer?: RenderFunction;
    // expandWhenDoubleClick?: boolean;
    expandOnClickNode?: boolean;
    _getTreeObj?: (tree: React.ReactNode) => void;
    onDoubleClick?: (eventKey: string, info: DBClickInfo) => void;
    onFocus?: (isExist: boolean) => Promise<any> | void;
    keyFun?: (event: React.KeyboardEvent, treeNode: React.ReactNode) => void;
    onKeyDown?: () => void;
    renderTitle?: (data: any, props:any) => string | React.ReactElement; // TODO: ts define type
    tabIndexValue?: number;
    debounceDuration?: number;
    openIcon?: string | React.ReactElement;
    closeIcon?: string | React.ReactElement;
    mustExpandable?: boolean;
    cancelUnSelect?: boolean;
    canCloseFreely?: boolean;
    getCheckboxAttrs?: (treeNodeProps: Partial<TreeNodeProps>) => any,
    syncCheckedAndSelectedStatus?: boolean;
    disabled?: boolean;
    icon?: React.ReactElement | null | ((props: any) => React.ReactNode); // TODO: ts expand RenderFunction
    inverse?: boolean;
    dragDelayExpandTime?: number;
    blockNode?: boolean;
    fieldNames?: {
        title?: string;
        key?: string;
        children?: string;
    };
    rootClassName?: string;
    rootStyle?: CSSProperties;
    size?: SizeType;
    unsetDropPositionX: boolean;
    filterValue?: string;
    optionFilterProp?: string;
    dragInitialState?: boolean;
    dir?: 'ltr' | 'rtl';
}

export interface TreeState {
    dropPositionX: string;
    expandedKeys: string[];
    checkedKeys: string[];
    selectedKeys: string[];
    dragNodesKeys: string[],
    dragOverNodeKey: string,
    dropNodeKey: string,
    focusKey: string,
    treeData: TreeData[],
    loadedKeys: string[],
    flatTreeData: FlatTreeData[],
    prevProps: TreeProps | null
}

export interface LatestTreeNodeProps {
    eventKey?: string; // 这个对象只关注eventKey
    [name: string]: any;
}

export interface OnDragEnterState {
    dragOverNodeKey: string;
    expandedKeys?: string[];
    selectedKeys?: string[];
}

export interface CheckKeysInfo {
    halfCheckedKeys: string[];
    checkedKeys: string[];
    checkedNodes: React.ReactElement[];
    checkedNodesPositions: any;
    treeNodesStates: any;
}

export interface AnyObject {
    [name: string]: any
}

export interface UpdateStateObj extends Pick<TreeState, 'expandedKeys' | 'checkedKeys' | 'loadedKeys'
| 'selectedKeys' | 'treeData' | 'flatTreeData' | 'prevProps'>{}

export interface TreeUlDomProps extends BaseProps {
    role: string;
    onFocus?: any;
}

export interface InfiniteScrollProps extends BaseProps {
    element?: React.ReactElement | string;
    ref?: (el: HTMLElement) => void;
    getScrollParent?: () => HTMLElement;
    treeList?: FlatTreeData[];
    handleTreeListChange?: (newTreeList: FlatTreeData[], startIndex: number, endIndex: number) => void;
    isFold?: boolean;
    useCapture?: boolean;
    useWindow?: boolean;
    debounceDuration?: number;
    height?: number;
    store: AnyObject;
    loadBuffer?: number;
}

export interface InfiniteScrollRestProps extends Omit<InfiniteScrollProps, 'children' | 'element'> {}

export interface RootTreeMethods { // TODO: ts define type
    onCheck: (treeNode: any, event: React.MouseEvent | React.KeyboardEvent) => void;
    onSelect: (treeNode: any, event: React.MouseEvent | React.KeyboardEvent) => void;
    onDoubleClick: (treeNode: any, e: React.MouseEvent | React.KeyboardEvent) => void;
    onMouseEnter: (e: React.MouseEvent, treeNode: any) => void;
    onMouseLeave: (e: React.MouseEvent, treeNode: any) => void;
    onContextMenu: (e: React.MouseEvent, treeNode: any) => void;
    onDragStart: (e: React.DragEvent, treeNode: any) => void;
    onDragEnter: (e: React.DragEvent, treeNode: any) => void;
    onDragOver: (e: React.DragEvent, treeNode: any) => void;
    onDragLeave: (e: React.DragEvent, treeNode: any) => void;
    onDragEnd: (e: React.DragEvent, treeNode: any) => void;
    onDrop: (e: React.DragEvent, treeNode: any) => void;
    onExpand: (treeNode: any, keyType?: string, e?: React.MouseEvent | React.KeyboardEvent) => undefined | Promise<any>;
    onKeyDown: (e: React.KeyboardEvent, treeNode: any) => void;
    [name: string]: any; // 其他Tree组件的方法和属性
}

export interface TreeNodeProps extends Pick<TreeProps, 'loadData' | 'onMouseEnter' | 'onMouseLeave' | 'disabled' | 'icon' | 'checkable'
    | 'onRightClick' | 'onDoubleClick' | 'onKeyDown' | 'showLine' | 'showIcon' | 'openAnimation' | 'inverse'
    | 'openIcon' | 'closeIcon' | 'focusable' | 'tabIndexValue' | 'mustExpandable' | 'filterTreeNode' | 'syncCheckedAndSelectedStatus'
    | 'getCheckboxAttrs'
>, SibilingPosition, BaseProps {
    root?: RootTreeMethods;
    eventKey?: string;
    autoExpand?: boolean;
    pos?: string;
    selectable?: boolean;
    draggable?: boolean;
    dragOver?: boolean;
    dragOverGapTop?: boolean;
    dragOverGapBottom?: boolean;
    _dropTrigger?: boolean;
    expanded?: boolean;
    selected?: boolean;
    focused?: boolean;
    openTransitionName?:string;
    tabIndexKey?: string,
    ext?: Record<string, any>,
    isLeaf?: boolean;
    checked?: boolean;
    halfChecked?: boolean;
    treeNodesStatesKeysInfo?: AnyObject;
    treeNodesStates?: TreeNodesStates;
    onResetFocusKey?: () => void;
    switcherClass?: string;
    switcherStyle?: React.CSSProperties;
    disableCheckbox?: boolean;
    title?: string | React.ReactElement;
    titleClass?: string;
    titleStyle?: React.CSSProperties;
    liAttr?: AnyObject;
    style?: React.CSSProperties;
    visibleCheckbox?: boolean;
    fieldidPrefix?: string;
    contentCls?: string;
    dropPositionX?: string;
    onRenderTitle?: (data: any, props:any) => string | React.ReactElement;
    expandOnClickNode?: boolean;
    dir?: 'ltr' | 'rtl' | undefined;
}

export interface TreeNodeState {
    dataLoading: boolean,
	dragNodeHighlight: boolean,
}

export interface TreeNodeLinkDomProps extends BaseProps {
    onClick?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    href?: string;
    draggable?: boolean;
    'aria-grabbed'?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    onBlur?: () => void;
    pos?: string;
    className: string;
    onDragEnter?: (e: React.DragEvent) => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDragLeave?: (e: React.DragEvent) => void;
    onDragEnd?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent) => void;

}

export interface LevelObj {
    [name: string]: (string | null)[]
}

export interface ConvertListAttrs {
    id: string;
    parendId: string;
    name: string;
    rootId: null | string;
    isLeaf: string;
    children: string;
}

export interface FlatTreeKeysMap {
    [key: string]: FlatTreeData
}

export interface DisabledTreeNode {
    key: string;
    checked?: boolean;
}

export interface TreeStore {
    setState: (partial: AnyObject) => void;
    getState: () => AnyObject; // state的值
    subscribe: (listener: () => void) => void;
}
