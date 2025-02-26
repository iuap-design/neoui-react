import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React from 'react';

export interface ToolBarProps extends BaseProps, NativeProps<
  | '--background-color'
  > {
    direction?: 'left' | 'right',
    className?: string,
    style?: React.CSSProperties,
    fieldid?: string,
    onSelect?: (node: any, index?: number) => void,
    children?: JSX.Element[] | JSX.Element,
    maxVisibleNum?: number,
    mode?: 'popover' | 'slider' | 'popup',
    clsPrefix?: string,
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end',
    onDotClick?: (moreNode: any, children: any, e: any) => void
    cancelText?: string
    buttonWidthAuto?: boolean
  }