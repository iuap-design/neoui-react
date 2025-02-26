import React, { Component, CSSProperties, KeyboardEvent, ReactNode } from "react";
import { BaseProps } from "../../wui-core/src/iCore";

export type NotiPosition = 'topRight' | 'bottomRight' | 'top' | 'bottom' | 'topLeft' | 'bottomLeft' | '';
export interface NotificationProps extends BaseProps {
    getPopupContainer?: ((node?: Element) => Element) | Element;
    getContainer?: ((node?: Element) => Element) | Element;
    container?: ((node?: Element) => Element) | Element;
    // show?: boolean;
    style?: CSSProperties;
    position?: NotiPosition;
    placement?: NotiPosition;
    transitionName?: string;
    keyboard?: boolean; // 按esc键是否关闭notice
    onEscapeKeyUp?: (e?: KeyboardEvent) => void; // 设置esc键特殊钩子函数
    animation?: string;
    maxCount?: number;
    transition?: boolean;
    // clsPrefix: string;
    // className?: string;
    // fieldid?: string;

}
export type Color = 'info' | 'success' | 'danger' | 'warning' | 'light' | 'dark' | 'news' | 'infolight' | 'successlight' | 'dangerlight' | 'warninglight' | 'error';

export type MappingColor = {
    success: string;
    info: string;
    danger: string;
    warning: string;
    [key: string]: string;
}
// export type Content = ReactChildren & (boolean | ReactChild | ReactFragment | ReactPortal | null);
// export type Content = ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
export type Content = ReactNode;
export interface NoticeProps extends BaseProps {
    duration?: number | null;
    onClose?: ()=> void;
    children?: ReactNode;
    color?: Color;
    title?: Content;
    message?: Content;
    closable?: boolean;
    style?: CSSProperties;
    content?: Content;
    description?: Content;
    onEnd?: ()=> void;
    key?: string | number;
    destroyWithKey?: boolean;
    getPopupContainer?: ((node?: Element) => Element) | Element;
    getContainer?: ((node?: Element) => Element) | Element;
    container?: ((node?: Element) => Element) | Element;
    transitionName?: string;
    icon?: ReactNode;
    closeIcon?: ReactNode;
    btn?: ReactNode;
    transition?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    // fieldid?: string;
    // clsPrefix?: string;
    // className?: string;
}
export interface NewInstanceCbArg {
    notice: (notice: NoticeProps) => void;
    removeNotice: (key: string | number) => void;
    component: Component;
    destroy: () => boolean;
    isKeyInNotices: (key: string | number) => boolean;
}
export type NewInstanceCb = (arg: NewInstanceCbArg)=> void