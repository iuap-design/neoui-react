import * as React from 'react';
import { BaseHtmlProps, BaseProps } from '../../wui-core/src/iCore';
import { Breakpoint, ScreenMap, ResponsiveMap } from '../../wui-core/src/LayoutUtils';


export type LayoutTag= 'header' | 'footer' | 'main' | 'section';
export interface GeneratorProps {
    suffixCls: string;
    tagName: LayoutTag;
    displayName: string;
}

export interface BasicProps extends BaseHtmlProps<HTMLElement> {
    prefixCls?: string;
    hasSider?: boolean;
    fillSpace?: boolean
}

export interface LayoutContextProps {
    siderHook: {
      addSider: (id: string) => void;
      removeSider: (id: string) => void;
    };
}
export interface BasicPropsWithTagName extends BasicProps {
    tagName?: LayoutTag;
}

// sider 组件props 声明
export interface SiderContextProps {
  siderCollapsed?: boolean;
  collapsedWidth?: number | string;
}


export type ThemeType = 'light' | 'dark';
export interface SiderProps extends BaseHtmlProps<HTMLElement> {
    prefixCls?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    reverseArrow?: boolean;
    onCollapse?: (collapsed: boolean, type: string) => void;
    zeroWidthTriggerStyle?: React.CSSProperties;
    trigger?: React.ReactNode;
    width?: number | string;
    collapsedWidth?: number | string;
    breakpoint?: Breakpoint;
    theme?: 'light' | 'dark';
    onBreakpoint?: (broken: boolean) => void;
}

export interface ContainerProps extends BaseHtmlProps<HTMLElement> {
    fluid?: boolean;
    componentClass?: React.ElementType;
}


// row col===========
export type Gutter = number | Partial<Record<Breakpoint, number>>;
export type RowAligns = 'top' | 'middle' | 'bottom';
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export interface RowProps extends Omit<BaseHtmlProps<HTMLElement>, 'wrap' | 'size'> {
    componentClass?: React.ElementType;
    grid?: 12 | 24;
    direction?: string,
    gutter?: Gutter | [Gutter, Gutter];
    align?: RowAligns;
    justify?: RowJustify;
    prefixCls?: string;
    wrap?: boolean;
    size?: ResponsiveMap;
}

export interface RowState{
    supportFlexGap: boolean;
    screens: ScreenMap;
}


type ColSpanType = number | string;
type FlexType = number | 'none' | 'auto' | string;
export interface ColSize {
    // flex?: FlexType;
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
}
export type ColPropsKey = 'xsOffset' | 'smOffset' | 'mdOffset' | 'lgOffset' | 'xlOffset' | 'xxlOffset' | 'xsPush' | 'smPush' | 'mdPush' | 'lgPush' | 'xlPush' | 'xxlPush' | 'xsPull' | 'smPull' | 'mdPull' | 'lgPull' | 'xlPull' | 'xxlPull';
export interface ColProps extends BaseHtmlProps<HTMLElement>, Partial<Record<ColPropsKey, number>>{
    componentClass?: React.ElementType;
    /**
	 * xs显示列数
	 */
     xs?: ColSpanType | ColSize;
    /**
	 * sm显示列数
	 */
    sm?: ColSpanType | ColSize;
    /**
	 * md显示列数
	 */
    md?: ColSpanType | ColSize;
    /**
	 * lg显示列数
	 */
    lg?: ColSpanType | ColSize;
    /**
	 * xl显示列数
	 */
    xl?: ColSpanType | ColSize;
     /**
	 * xxl显示列数
	 */
    xxl?: ColSpanType | ColSize;
    // /**
	//  * xs偏移列数
	//  */
    // xsOffset?: number;
    // /**
	//  * sm偏移列数
	//  */
    // smOffset?: number;
    // /**
	//  * md偏移列数
	//  */
    // mdOffset?: number;
    // /**
	//  * lg偏移列数
	//  */
    // lgOffset?: number;
    // /**
	//  * xs右偏移列数
	//  */
    // xsPush?: number;
    // /**
	//  * sm右偏移列数
	//  */
    // smPush?: number;
    // /**
	//  * md右偏移列数
	//  */
    // mdPush?: number;
    // /**
	//  * lg右偏移列数
	//  */
    // lgPush?: number;
    // /**
	//  * xs左偏移列数
	//  */
    // xsPull?: number;
    // /**
	//  * sm左偏移列数
	//  */
    // smPull?: number;
    // /**
	//  * md左偏移列数
	//  */
    // mdPull?: number;
    // /**
	//  * lg左偏移列数
	//  */
    // lgPull?: number;
    /**
	 * 显示列数
	 */
    span?: number;
    /**
	 * 偏移列数
	 */
    offset?: number;
    /**
	 * 左偏移列数
	 */
    pull?: number;
    /**
	 * 右偏移列数
	 */
    push?: number,
    order?: number,
    flex?: FlexType;
}

export interface ColState{
    screens: ScreenMap;
}

// Spliter======

export type SplitType = 'vertical' | 'horizontal';
export interface SpliterProps extends BaseProps{
    allowResize: boolean; // 暂留
    children?: React.ReactNode[];
    primary: 'first' | 'second'; // 暂留
    minSize: string | number;
    maxSize?: string | number;
    defaultSize?: string | number;
    size?: string | number;
    direction: SplitType;
    mode?:'default' | 'on' | 'mixed';// 挤占悬浮模式 on、default
    defaultMode: 'default' | 'on'; // 默认模式, 结合模式mixed 一起使用
    onDragStarted?: () => void;
    onDragFinished?: (size: string | number) => void;
    onDragMove?: (size: string | number) => void;
    onResizerClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onResizerDoubleClick?: (e: React.MouseEvent<HTMLElement>) => void;
    resizerStyle?: React.CSSProperties;
    resizerClassName?: string;
    step?: number; // 暂留
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    trigger?: React.ReactNode;
    onCollapse?: (collapsed: boolean) => void;
    resizerable?:boolean,
    triggerStyle? : React.CSSProperties;
    locale?: string;
    dir?: 'ltr' | 'rtl';
}

export interface SpliterState {
    active: boolean;
    resized: boolean;
    position: number;
    draggedSize: number|string|null;
    collapsed: boolean;
    mode: 'default' | 'on';
}

export interface ResizerProps extends BaseProps {
    onClick?: SpliterProps['onResizerClick'];
    onDoubleClick?: SpliterProps['onResizerDoubleClick'];
    onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
    onTouchStart?: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd?: (e: React.TouchEvent<HTMLElement>) => void;
    // prefixer: PropTypes.instanceOf(Prefixer).isRequired,
    direction?: SplitType;
    // style: stylePropType,
    resizerClassName?: string;
    trigger: JSX.Element | null;
    fixeNail: JSX.Element | null;
    resizerable?:boolean
    primary: 'first' | 'second';
    collapsed?: boolean;
}

export interface PaneProps extends BaseProps{
    size?: SpliterProps['size'];
    direction?: SplitType;
    primary: 'first' | 'second';
}

export interface PaneState extends BaseProps{
    size: SpliterProps['size'] | undefined;
}

