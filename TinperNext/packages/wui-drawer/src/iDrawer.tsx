import * as React from 'react';
import type { BaseProps } from '../../wui-core/src/iCore';

export type PalcePosition = 'left' | 'right' | 'top' | 'bottom' | string;
export type PushObj = {
    distance?: string;
}

export interface DrawerProps extends BaseProps {
    placement: PalcePosition;
    hasHeader?: boolean;
    show?: boolean;
    title?: string | React.ReactNode;
    // className?: string;
    showMask?: boolean;
    maskClosable?: boolean;
    zIndex?: number;
    showClose?: boolean;
    width?: number | string;
    height?: number | string;
    destroyOnClose?: boolean;
    container?: HTMLElement | (() => HTMLElement | string | null);
    getContainer?: HTMLElement | (() => HTMLElement | string | null);
    getPopupContainer?: HTMLElement | (() => HTMLElement | string | null);
    closeIcon?: React.ReactNode;
    onClose?: () => void;
    drawerStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    footer?: React.ReactNode;
    // style?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    // contentWrapperStyle?: React.CSSProperties;
    push?: boolean | PushObj;
    forceRender?: boolean;
    keyboard?: boolean;
    autoFocus?: boolean;
    extra?: React.ReactNode;
    dir?: 'ltr' | 'rtl' | undefined;
    // fieldid?: string;
    // clsPrefix?: string;
}

export interface EntranceProps extends DrawerProps {
    visible?: boolean;
    mask?: boolean;
    closable?: boolean;
}

export interface DrawerState {
    show?: boolean;
    width?: number | string;
    pushFlag?: boolean
}
export interface DrawerFooterProps extends BaseProps {
    componentClass: keyof JSX.IntrinsicElements;
    // onCustomRender: (children: React.ReactNode) => React.ReactNode;
    [key: string]: any;
}