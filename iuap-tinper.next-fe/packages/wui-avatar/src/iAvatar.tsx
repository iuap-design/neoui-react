import {CSSProperties, ReactElement, ReactNode} from 'react';
import { Breakpoint } from '../../wui-core/src/LayoutUtils';
import { BaseProps } from "../../wui-core/src/iCore";

export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;
export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;
export type Shape = 'circle' | 'square';

export interface AvatarProps extends BaseProps {
    /** Shape of avatar, options: `circle`, `square` */
    shape?: Shape; // 导出去
    /*
     * Size of avatar, options: `large`, `small`, `default`
     * or a custom number size
     * */
    size?: AvatarSize;
    gap?: number;
    /** Src of image avatar */
    src?: ReactNode;
    /** Srcset of image avatar */
    srcSet?: string;
    draggable?: boolean;
    /** Icon to be used in avatar */
    icon?: ReactNode;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: ReactNode;
    alt?: string | ReactElement;
    /* callback when img load error */
    /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
    onError?: () => boolean;
    fieldid?: string;
}

export interface GroupProps extends BaseProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  prefixCls?: string;
  maxCount?: number;
  maxStyle?: CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  size?: AvatarSize;
  fieldid?: string;
  maxPopoverTrigger?: 'hover' | 'focus' | 'click';
  reverse?: boolean;
}