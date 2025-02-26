import * as React from 'react';
import { BaseProps } from '../../wui-core/src/iCore';
import { ButtonSize, ButtonHtmlType } from '../../wui-button/src/iButton';
import { MenuProps } from '../../wui-menu/src/iMenu';


export type Align = {
    points: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
      adjustX?: number;
      adjustY?: number;
    };
};

export type DropdownPlacement = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | Align;
export interface DropDownProps extends Omit<BaseProps, 'children'> {
    animation?: any; // 暂不抛出使用， 将动画名称前添加 clsPrefix- 前缀
    align?: Align; // 暂不抛出使用， 由placement 接受 转换使用
    disabled?: boolean | [boolean, boolean];
    hideAction?: ('click' | 'mouseLeave')[];
    showAction?: ('click' | 'mouseEnter')[];
    trigger?: ('click' | 'hover') | ('click' | 'hover')[];
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    minOverlayWidthMatchTrigger?: boolean;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    overlay?: React.ReactElement<any> | (() => React.ReactElement<any>) | string | MenuProps;
    onVisibleChange?: (visible: boolean) => void;
    placement?: DropdownPlacement;
    transitionName?: string, // 动画名称，目前支持slide-up 可自定义enter appear leave动画
    visible?: boolean;
    defaultVisible?: boolean;
    getDocument?: (element?: HTMLElement) => HTMLDocument;
    delay?: number;
    delayShow?: number;
    delayHide?: number;
    overlayMaxHeight?: boolean | number;
    destroyPopupOnHide?: boolean;
    matchNode?: HTMLElement;
    children?: React.ReactElement
    | string
    | number
    | React.ReactFragment
    | React.ReactPortal
    | boolean;
    dropdownStyle?: (style: Record<string, any>) => object;
    dir?: "rtl" |"ltr";
}

export interface DropDownState {
    visible: boolean;
    popupAlign: Align | null;
}

export interface DropdownIndexProps extends DropDownProps {
    delayShow?: number;
    mouseEnterDelay?: number;
    delayHide?: number;
    mouseLeaveDelay?: number;
}

export interface DropdownButtonProps extends DropdownIndexProps {
    size?: ButtonSize;
    htmlType?: ButtonHtmlType;
    type?: 'primary' | 'ghost' | 'dashed' | 'default' | 'plainText';
    // disabled?: boolean | [boolean, boolean];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    href?: string;
    title?: string;
    // 触发下拉的类型button、icon, 默认button 类型
    triggerType?: 'button' | 'icon';
    /**
	 * @title 自定义左右两个按钮
	 * @des 返回一个处理好的元素数组 (buttons: ReactNode[]) => ReactNode[]
	 * @veIgnore
	 */
    buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
    id?: string;
}

export interface DropdownButtonState {
    rootNode: React.ReactNode | Element | Text | HTMLElement;
}
