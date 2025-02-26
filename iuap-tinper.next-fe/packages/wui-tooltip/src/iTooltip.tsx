import * as React from 'react';
import {TooltipProps as RcTooltipProps} from 'rc-tooltip/lib/Tooltip';
import {placements as Placements} from 'rc-tooltip/lib/placements';
import {AdjustOverflow} from './placements';
import {tuple, ElementOf, LiteralUnion} from './../../wui-core/src/utils/type';
import type {RenderFunction} from '../../wui-core/src/utils/createAntdUtils';
import type {BaseProps} from '../../wui-core/src/iCore';

export const presetColorTypes = tuple(
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
);

export type TooltipPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';

export type PresetColorType = ElementOf<typeof presetColorTypes>;

export interface TooltipProps extends Omit<RcTooltipProps, 'children' | 'overlay'>, BaseProps {
    color?: LiteralUnion<PresetColorType, string>;
    dir?: 'rtl' | 'ltr';
    placement?: TooltipPlacement;
    builtinPlacements?: typeof Placements;
    openClassName?: string;
    overlayMaxHeight?: boolean;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    delay?: number;
    show?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    rootClose?: boolean;
    maskClosable?: boolean;
    inverse?: boolean;
    hideArrow?: boolean;
    onOpenChange?: RcTooltipProps['onVisibleChange'],
    onHide?: (visible: boolean) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseOut?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    container?: React.ReactNode | RenderFunction;
    getPopupContainer?: HTMLElement | ((node: HTMLElement) => HTMLElement);
    getTooltipContainer?: (node: HTMLElement) => HTMLElement;
    getContextPopupContainer?: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode;
    title?: React.ReactNode;
    autoAdjustOverflowHeight?: boolean;
    tagName?: string;
    resizable?: boolean | string;
    resizeStyle?: any;
    enable?: any;
    onResize?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
    onResizeStart?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
    onResizeStop?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
    isCenterArrow?: boolean;
}
