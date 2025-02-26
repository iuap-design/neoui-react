import { ButtonProps, ButtonColors } from '../../wui-button/src/iButton';
import * as React from 'react';
import { DraggableEventHandler } from 'react-draggable';
import { BaseProps } from '../../wui-core/src/iCore';

export type NumberSize = {
    width: number;
    height: number;
}
export type ResizableDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export type KeyboardType = 'esc' | 'cancel' | 'ok' | 'enter';

export type ResizeCallback = (
    event: MouseEvent | TouchEvent,
    direction: ResizableDirection,
    elementRef: HTMLDivElement,
    delta: NumberSize,
) => void;

export type ResizeStartCallback = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    dir: ResizableDirection,
    elementRef: HTMLDivElement,
    delta?: NumberSize,
) => void;
export interface AnyObject {
    [key: string]: any;
}
export type Bounds = { left?: number, top?: number, right?: number, bottom?: number } | string | undefined;
export type ModalSize = "sm" | "md" | "lg" | "xlg";
export interface ModalFooterProps extends BaseProps {
    componentClass: keyof JSX.IntrinsicElements;
    onCustomRender: (children: React.ReactNode) => React.ReactNode;
    [key: string]: any;
}

export interface ModalProps extends BaseProps {
    /**
         * 是否弹出遮罩层/遮罩层点击是否触发关闭
         */
    backdrop: boolean;
    id?: string;

    /**
     * Modal body 样式
     */
    bodyStyle: React.CSSProperties;
    bodyClassName: string;

    /**
     * 关闭Modal之后销毁组件
     */
    destroyOnClose: boolean;

    /**
     * 可用于设置浮层的样式，调整浮层位置等
     */
    style: React.CSSProperties;
    header?: React.ReactElement | null;

    /**
     * 底部内容，当不需要默认底部按钮时，可以设为footer={null}
     */
    footer: React.ReactElement | null;
    /**
     * 底部属性
     */
    footerProps?: Partial<ModalFooterProps>;

    /**
     * 是否显示右上角的关闭按钮
     */
    closable: boolean;

    /**
     * 自定义关闭图标
     */
    closeIcon: React.ReactElement | null;

    /**
     * 标题
     */
    title?: React.ReactNode;

    /**
     * 多语
     */
    locale: AnyObject | string;

    /**
     * 取消按钮属性
     */
    cancelButtonProps: ButtonProps;

    /**
     * 取消按钮文字
     */
    cancelText?: string;

    /**
     * 确认按钮属性
     */
    okButtonProps: ButtonProps;

    /**
     * 确认按钮文字
     */
    okText?: string;

    /**
     * 确认按钮colors类型
     */
    okType: ButtonColors;

    /**
     * 设置z-index
     */
    zIndex: number | null;
    /**
     * 点击遮罩层是否允许关闭
     */
    backdropClosable?: boolean;
    renderBackdrop?: () => React.ReactElement | React.ReactElement;
    onEscapeKeyUp?: (e: React.KeyboardEvent) => void;
    afterClose?: () => void;
    maskClassName?: string;
    containerStyle?: React.CSSProperties;
    backdropStyle?: React.CSSProperties;
    /**
     * 快捷键模式
     */
    keyboard?: boolean | KeyboardType[];

    // /**
    //  * 显隐时是否使用动画
    //  */
    // animation?: boolean;

    /**
     * 传递给模态框的样式
     */
    dialogComponentClass: React.ReactNode;

    /**
     * 自动设置焦点
     */
    autoFocus?: boolean | string;

    /**
     * 防止打开时焦点离开模态框
     */
    enforceFocus: boolean;

    /**
     * 是否打开模态框
     */
    show?: boolean;
    /**
     * 关闭时的钩子函数
     */
    onHide?: () => void;
    /**
     * 显示时的钩子函数
     */
    onShow?: (modal: HTMLDivElement | null) => void;

    // onEnter?: PropTypes.func;
    //
    // onEntering?: PropTypes.func;
    //
    // onEntered?: PropTypes.func;
    //
    // onExit?: PropTypes.func;
    //
    // onExiting?: PropTypes.func;
    //
    // onExited?: PropTypes.func;

    onOk: (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => void;

    onCancel: () => void;
    onMaskClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

    containerClassName?: string;

    /**
     * 要添加到的元素
     */
    container?: ((node: HTMLElement) => HTMLElement) | HTMLElement;

    /**
     * 尺寸
     */
    size: ModalSize;
    /**
     * 自定义宽度
     */
    width?: number | string;
    /**
     * 自定义高度
     */
    height?: number | string;
    /**
     * 是否可拖拽
     */
    draggable: boolean;

    /**
     * 是否可以resize
     */
    resizable: boolean;
    resizeClassName?: string;
    onStart?: DraggableEventHandler;
    onStop?: DraggableEventHandler;
    /* resize开始 */
    onResizeStart?: ResizeStartCallback;

    /* resizing */
    onResize?: ResizeCallback;

    /* resize结束 */
    onResizeStop?: ResizeCallback;

    /* resize 最小宽度、最小高度、最大宽度、最大高度 */
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    bounds?: Bounds;
    wrapClassName?: string;
    dialogClassName?: string;
    /* 模态框是否居中显示 */
    centered?: boolean | 'once';
    maximize?: HTMLElement | boolean | (() => HTMLElement | null);
    isMaximize?: boolean;
    onMaximize: (isMaximize: boolean) => void;
    renderMaximizeButton?: () => React.ReactElement | string;
    onKeyUp?: (e: React.KeyboardEvent, modal: HTMLDivElement) => void;
    showPosition: { x: null | string | number, y: null | string | number };
    // fieldid?: string;
    className: string;
    clsPrefix: string;
    forceRender?: boolean;
    dir?: "rtl" |"ltr";
}

export interface ModalState {
    style?: React.CSSProperties;
    show?: boolean | undefined;
    isMaximize?: boolean;
    maximizeDOM?: null | HTMLElement;
}
export interface ModalDialogState {
    _bounds: Bounds;
    original: {
        x: number;
        y: number;
    };
    isScroll: boolean;
    maxWidth: number | string;
    maxHeight: number | string;
    width: undefined | number | string | null;
    height: undefined | number | string | null;
    bottomEdgeTrim: boolean;
    rightEdgeTrim: boolean;
    zoom: number;
}
// export interface ModalContext {
// style: React.CSSProperties;
// show: boolean | undefined;
// isMaximize: boolean;
// maximizeDOM: null | HTMLElement;
// }
export interface ModalDialogProps extends BaseProps {
    optimizePerformance?: boolean;
    wrapClassName?: string;
    dialogClassName?: string;
    maskClassName?: string;
    show?: boolean;
    resizable?: boolean;
    draggable?: boolean;
    centered?: boolean | 'once';
    maxWidth?: number | string;
    resizeClassName?: string;
    size?: ModalSize;
    style?: React.CSSProperties;
    maxHeight?: number | string;
    destroyOnClose?: boolean;
    backdropStyle?: React.CSSProperties;
    backdrop?: boolean;
    onResizeStart?: ResizeStartCallback;
    onResize?: ResizeCallback;
    onResizeStop?: ResizeCallback;
    onMaskClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    renderBackdrop?: () => React.ReactElement | React.ReactElement;
    zIndex?: number | null;
    // id属性 需要隐士附着到div,wui-modal 上(兼容代码)
    id?: string;
    contentStyle: React.CSSProperties;
    showPosition: { x: null | number | string; y: null | number | string; };
    onStart: DraggableEventHandler;
    onStop: DraggableEventHandler;
    minHeight: number | string;
    clsPrefix: string;
    minWidth: number | string;
    bounds: Bounds | null;
    isMaximize: boolean;
    maximizeDOM: HTMLElement | null;
    dragCtrlId: number;
    dir?: "rtl" |"ltr";
}
export interface ModalPortalProps {
    children?: React.ReactNode;
    show?: boolean;
    /**
     * 容器
     */
    container?: ((node?: HTMLElement) => HTMLElement) | HTMLElement;
    /**
     * 当模态框打开时的钩子函数
     */
    onShow?: (modal: HTMLDivElement | null) => void;
    /**
     * 当show参数为false时触发的模态框关闭时的钩子函数
     */
    onHide?: () => void;
    /**
     * 设置esc键特殊钩子函数
     */
    onEscapeKeyUp?: (e: React.KeyboardEvent) => void;
    /**
     * 设置按键钩子函数
     */
    onKeyUp?: (e: React.KeyboardEvent, modal: HTMLDivElement) => void;
    /**
     * 按esc键是否关闭模态框
     */
    keyboard?: boolean | KeyboardType[];
    /**
     *容器的class
     */
    className?: string;
    /**
     *容器的style
     */
    style?: React.CSSProperties;
    /**
     * 是否自动设置焦点
     */
    autoFocus?: boolean | string;
    /**
     * 防止焦点离开模态框
     */
    enforceFocus?: boolean;
    backdrop?: boolean;
    fieldid?: string;
    clsPrefix?: string;
    destroyOnClose?: boolean;
    forceRender?: boolean;
}

export interface ModalHeaderProps extends BaseProps {
    /**
     * 自定义关闭按钮的钩子函数
     */
    renderCloseButton?: (() => React.ReactElement) | null;
    /**
     * 自定义全屏按钮的钩子函数
     */
    renderMaximizeButton?: (isMaximize: boolean) => React.ReactElement | string;
    /**
     * 自定义关闭按钮的 props
     */
    closeButtonProps?: ButtonProps;
    onMaximize?: (isMaximize: boolean) => void;
    maximize?: HTMLElement | boolean | (() => HTMLElement | null);
    isMaximize?: boolean;
    fieldid?: string;
    id?: string;
    className?: string;
    dragCtrlId?: number;
    draggable?: boolean;
    /**
     * 是否显示关闭按钮
     */
    closeButton: boolean;
    'aria-label': string;
    clsPrefix: string;
}
export interface ModalTitleProps extends BaseProps {
    componentClass: keyof JSX.IntrinsicElements;
    clsPrefix: string;
    [key: string]: any;
}
export interface ModalBodyProps extends BaseProps {
    componentClass: keyof JSX.IntrinsicElements;
    clsPrefix: string;
    [key: string]: any;
}
export interface ModalRootProps extends Partial<ModalProps> {
    // close?: string
    getContainer?: ((node: HTMLElement) => HTMLElement) | HTMLElement;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | HTMLElement;
    // iconType?: string
    // icon?: PropTypes.element;
    // okCancel?: string
    // autoFocusButton?: PropTypes.element;
    // transitionName?: string
    // maskTransitionName?: string
    // type?: string
    // content?: PropTypes.any;
    visible?: boolean;
    mask?: boolean;
    maskStyle?: React.CSSProperties;

    maskClosable?: boolean;
    onExited?: () => void;
    onBackdropClick?: () => void;
    backdropClassName?: string
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
}
export type ModalType = 'success' | 'info' | 'warning' | 'error' | 'default' | 'confirm';
export interface ModalConfirmProps {
    title?: React.ReactNode;
    keywords?: string;
    content?: React.ReactNode;
    onOk?: (e?: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => (void | Promise<boolean>);
    onCancel?: (e?: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => void;
    okType?: ButtonColors;
    show?: boolean;
    width?: number | string;
    close?: () => void;
    keyword?: string;
    type?: ModalType;
    zIndex?: number | null;
    okText?: string;
    cancelText?: string;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | HTMLElement;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    locale?: AnyObject | string;
    fieldid?: string;
    className?: string;
    onHide?: () => void;
    okCancel?: boolean;
    icon?: string | React.ReactElement,
    footer?: React.ReactElement | null;
    footerProps?: Partial<ModalFooterProps>;
    afterClose?: () => void;
    centered?: boolean | 'once';
    keyboard?: boolean | KeyboardType[];
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    autoFocus?: boolean | string;
    dir?: "rtl" |"ltr";
    draggable?: boolean;
}
export interface ModalConfirmState {
    okLoading: boolean;
    show: boolean;
}
export interface ModalContext {
    $modal : {
        onOk: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<Element>) => void;
        onCancel: () => void;
        handleHide: () => void;
        handleMaximize: (isMaximize : boolean) => void;
        isMaximize: () => boolean;
    }
}
