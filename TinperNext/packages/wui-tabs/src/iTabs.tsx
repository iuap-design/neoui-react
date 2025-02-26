import React from 'react'
import type { BaseProps, BaseHtmlProps } from '../../wui-core/src/iCore';

export type TabPosition = 'top' | 'bottom' | 'left' | 'right' | string;
export type TabType = 'line' | 'card' | 'editable-card' | 'fill' | 'primary' | 'trangle' | 'fade' | 'trapezoid' | string;
export type MoreType = 'moreTabsSelect' | 'moreTabsArrow';
export interface EntranceProps extends TabsProps, Omit<BaseHtmlProps<HTMLDivElement>, 'onChange' | 'onDrag' | 'tabIndex'> {
    extraContent?: React.ReactNode;
    tabBarExtraContent?: React.ReactNode;
    tabPosition?: TabPosition;
    tabBarPosition?: TabPosition;
    // tabBarStyle?: React.CSSProperties | tabType | undefined;
    style?: React.CSSProperties;
    type?: TabType;
    dir?: 'rtl' | 'ltr';
}

export interface TabsProps extends BaseProps {
    destroyInactiveTabPane?: boolean
    renderTabBar?: (p: TabsProps, node: any) => React.ReactNode;
    renderTabContent?: () => React.ReactNode;
    onChange?: (key: string) => void;
    // children?: any;
    // clsPrefix?: string;
    // className?: string;
    tabBarPosition?: string;
    // style?: React.CSSProperties;
    tabBarStyle?: React.CSSProperties | TabType | undefined | null;
    activeKey?: string;
    defaultActiveKey?: string;
    onTabClick?: (key: string) => void;
    hideAdd?: boolean;
    onEdit?: (key: string, c: string) => void;
    // menuClose?: any;
    onPopMenuClick?: (val: {type: string, tabKey: string}) => void;
    onPrevClick?: (e: React.MouseEvent) => void;
    onTabScroll?: (position: Record<string, any>, e?: React.MouseEvent) => void;
    onNextClick?: (e: React.MouseEvent) => void;
    extraContent?: React.ReactNode;
    animated?: boolean;
    tabIndex?: string;
    inkBarAnimated?: boolean;
    moreType?: MoreType;
    tabBarClassName?: string;
    tabContentClassName?: string;
    tabBarExtraContent?: React.ReactNode;
    // fieldid?: string;
    dragable?: boolean;
    onDrag?: (result: object) => void;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    scrollAnimated?: boolean;
    // useTransform3d?: boolean;
    trigger?: string[];
    popMenu?: (val?: string) => {key: string, text: string}[];
    onPopMenu?: (open: boolean, tab: string) => void;
    addIcon?: React.ReactElement;
    moreIcon?: React.ReactElement;
    id?: string;
    items?: {key: string, tab: React.ReactElement | string, children: any, style?: React.CSSProperties, forceRender?: boolean, placeholder?: any, closeIcon?: React.ReactElement, closable?: boolean, fieldid?: string, id?: string, disabled?: boolean, nid?: string, uitype?: string}[]
    centered?: boolean;
    type?: TabType;
    dropdownClassName?: string;
    moreTypeAllShow?: boolean;
    isTruncationShow?: boolean;
    dir?: 'ltr' | 'rtl';
}

export interface TabsState {
    activeKey?: string;
    disableCloseOth?: boolean;
    contextmenuType?: Record<string, any> | null;
}

export interface TabProps extends BaseProps {
    active?: boolean;
    value?: string;
    clsfix?: string;
    tabClick?: (key: string) => void;
    onClick?: (key: string) => void;
    children?: any;
}

export interface InkTabBarProps {
    onTabClick?: () => void;
}

export interface InkTabBarNodeProps {
    clsPrefix?: string;
    styles: React.CSSProperties;
    inkBarAnimated?: boolean;
    saveRef?: (ref: string) => React.LegacyRef<HTMLDivElement>;
    getRef?: (ref: string) => HTMLElement;
    dir?: string;
}

export interface SaveRefProps {
    children?: (saveRef:(name: string) => React.LegacyRef<HTMLDivElement>, getRef:(name: string) => HTMLElement) => React.ReactNode;
}

export interface ScrollableInkTabBarProps {
    children?: (() => void) | null;
    onTabClick?: (key: string) => void;
}

export interface ScrollableTabBarNodeProps extends BaseProps {
    activeKey?: string;
    getRef?: (name: string) => HTMLElement;
    saveRef?: (name: string) => React.LegacyRef<HTMLDivElement>;
    tabBarPosition?: TabPosition;
    // clsPrefix?: string;
    scrollAnimated?: boolean;
    onPrevClick?: (e: React.MouseEvent) => void;
    onNextClick?: (e: React.MouseEvent) => void;
    navWrapper?: (child: React.ReactNode) => React.ReactNode;
    children: React.ReactNode;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    onTabClick?: (key: string) => void;
    moreType?: MoreType;
    panels?: any;
    isEditNum?: number;
    tabBarStyle?: React.CSSProperties | TabType | null;
    onEdit?: (key: string, c: string) => void;
    moreIcon?: React.ReactElement;
    type?: TabType;
    dropdownClassName?: string;
    dragable?: boolean;
    moreTypeAllShow?: boolean;
    isTruncationShow?: boolean;
    items?: any;
    dir?: 'ltr' | 'rtl';
}

export interface ScrollableTabBarNodeState {
    next?: boolean;
    prev?: boolean;
    menuArr?: any[] | string;
    menuArrowLeft?: any;
    menuArrowRight?: any;
    isShowArr?: any[] | null;
    dropDownArr?: any[] | null;
    tabsItems?: any[];
    allItemW?: number;
    deltaY?: number;
    prevTransformValue?: number;
}

export interface SearchTabsProps {
    clsfix?: string;
    onChange?: (key: string) => void;
    value?: string;
    children?: any;
}

export interface SearchTabsState {
    activeValue?: string;
}

export interface TabBarRootNodeProps extends BaseProps {
    // clsPrefix?: string;
    // className?: string;
    // style?: React.CSSProperties;
    tabBarPosition?: TabPosition;
    // children?: React.ReactNode;
    extraContent?: React.ReactNode;
    onKeyDown?: () => void;
    saveRef?: (name: string) => React.LegacyRef<HTMLDivElement>;
    dir?: 'ltr' | 'rtl';
    tabBarClassName?: string;
    tabBarStyle?: React.CSSProperties;
}

export interface TabBarTabsNodeProps extends BaseHtmlProps<HTMLElement> {
    activeKey?: string;
    panels?: React.ReactNode[];
    // clsPrefix?: string;
    tabBarGutter?: number;
    onTabClick?: (key: string) => void;
    saveRef?: (name: string) => React.LegacyRef<HTMLDivElement>;
    renderTabBarNode?: (node: any) => React.ReactChild;
    tabBarPosition?: TabPosition;
    dir?: 'ltr' | 'rtl';
    // fieldid?: string;
    dragable?: boolean;
    onDrag?: (result: object) => void;
    tabBarStyle?: React.CSSProperties | TabType | null;
    items?: {key: string, tab: React.ReactElement | string, children: any, style?: React.CSSProperties, forceRender?: boolean, placeholder?: any, closeIcon?: React.ReactElement, closable?: boolean, fieldid?: string, id?: string, disabled?: boolean, nid?: string, uitype?: string}[]
}

export interface TabContentProps {
    animated?: boolean;
    animatedWithMargin?: boolean;
    clsPrefix?: string;
    children?: React.ReactNode;
    activeKey?: string;
    style?: React.CSSProperties;
    tabBarPosition: string;
    destroyInactiveTabPane?: any;
    tabContentClassName?: string;
    items?: {key: string, tab: React.ReactElement | string, children: any, style?: React.CSSProperties, forceRender?: boolean, placeholder?: any, closeIcon?: React.ReactElement, closable?: boolean, fieldid?: string, id?: string, disabled?: boolean, nid?: string, uitype?: string}[]
}

export interface TabPaneProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'placeholder'> {
    // className?: string;
    rootclsPrefix?: string;
    active?: boolean;
    // style?: React.CSSProperties;
    destroyInactiveTabPane?: boolean;
    forceRender?: boolean;
    placeholder?: React.ReactNode;
    tab?: React.ReactNode;
    disabled?: boolean;
    closable?: boolean;
    closeIcon?: React.ReactNode;
}

export interface DragSnapshot {
    draggingOver: null;
    isDragging: boolean;
    isDropAnimating: boolean;
    [name: string]: any;
}

export interface PopMenuProps extends BaseProps {
    items?: {text?: string, key?: string}[];
    onMenuClick?: (val: string, activeKey: string) => void;
    onPopMenuIsShow: (open: boolean) => void;
    dir?: 'ltr' | 'rtl';
}

export interface PopMenuState {
    visible?: boolean;
    activeKey?: string;
    position?: Record<string, string | number>;
}
