import {CSSProperties, ReactChild, ReactElement, ReactNode} from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export type BadgeColors = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'default';
export type BadgeStatus = 'processing' | 'error' | 'success' | 'warning' | 'default' | 'dark';
export type BadgePlacement = 'bottom' | 'top';
export type BadgeSize = 'sm' | 'default' | 'small';
export type BadgeColorHack = BadgeColors | BadgeStatus;
type RibbonPlacement = 'start' | 'end';

export interface BadgeProps extends Omit<BaseHtmlProps<HTMLSpanElement>, 'size' | 'title'> {
    colors?: BadgeColors;
    dataBadge?: ReactNode;
    dataBadgePlacement?: BadgePlacement;
    dot?: boolean;
    color?: string;
    count?: number | HTMLElement | ReactNode;
    overflowCount?: number;
    showZero?: boolean;
    status?: BadgeStatus;
    size?: BadgeSize;
    text?: ReactChild;
    title?: string | ReactElement;
    offset?: [number, number];
}

export interface RibbonProps {
    className?: string;
    style?: CSSProperties; // style of ribbon element, not the wrapper
    text?: ReactNode;
    color?: BadgeColors | string;
    children?: ReactNode;
    placement?: RibbonPlacement;
  }