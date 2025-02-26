import * as React from 'react';
import type {BaseProps, BaseHtmlProps} from '../../wui-core/src/iCore';
export interface AntdAnchorProps extends BaseProps {
    getContainer?: () => HTMLElement;
    affix?: boolean;
    offsetTop?: number;
    showInkInFixed?: boolean;
    onChange?: (v: string) => void;
    onClick?: (v: Record<string, unknown>) => void;
    // style?: React.CSSProperties;
    // fieldid?: string;
    activeKey?: string;
    // className?: string;
    prefixCls?: string;
    activeIcon?: React.ReactElement;
    items?: {key: string, href: string, title: string}[];
    collapsable?: boolean;
    onDropDownChange?: (href: string) => void;
    onCollapsable?: (v: boolean) => void;
    curAnchorItem?: string;
}

export interface AntAnchorState {
    activeKey?: string;
    isFix: boolean;
}

export interface AnchorLinkProps extends BaseProps {
    href: string;
    target?: string;
    title: any;
    onSelect?: (value: {href: string, title: string}, e: React.MouseEvent) => void;
    expanded?: boolean;
    // fieldid?: string;
    prefixCls?: string;
    // className?: string;
    isdirection?: boolean;
    activeIcon?: React.ReactElement;
}

export interface AnchorLinkState {
    active?: boolean;
}

export interface AnchorProps extends BaseProps {
    selector?: string;
    offset?: number;
    navClass?: string;
    contentClass?: string;
    nested?: boolean;
    nestedClass?: string;
    reflow?: boolean;
    event?: boolean;
    activeHandle?: (li: EventTarget, link: HTMLElement, content: HTMLElement) => void;
    deactiveHandle?: (li: EventTarget, link: HTMLElement, content: HTMLElement) => void;
    events?: boolean;
    // clsPrefix?: string;
}

export interface AnchorHorizontalState {
    activeKey?: string;
    next?: boolean;
    prev?: boolean;
    prevStatus?: boolean;
    nextStatus?: boolean;
    menuArr?: React.ReactNode;
    scrollX: number; // X轴滚动距离
    wrapperW: number;
    anchorItems: {key: number | string, width: number, left: number, href: string}[]; // 所有锚点尺寸
    allItemW: number;
}

export interface EntranceProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'getContainer' | 'onClick' | 'onChange'>, AnchorProps, AntdAnchorProps {
    antd?: boolean;
    direction?: string;
    offsetTop?: number;
    affix?: boolean;
    getContainer?: () => HTMLElement;
    getCurrentAnchor?: () => string;
}
