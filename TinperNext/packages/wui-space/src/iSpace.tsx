import * as React from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

type SizeType = 'small' | 'middle' | 'large' | string;
export type SpaceSize = SizeType | number;
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'size' | 'wrap'> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical' | string;
    align?: SpaceAlign;
    split?: React.ReactNode;
    wrap?: boolean;
  }

export interface ItemProps {
    className: string;
    children: React.ReactNode;
    index: number;
    direction?: 'horizontal' | 'vertical' | string;
    marginDirection: 'marginLeft' | 'marginRight' | string;
    split?: string | React.ReactNode;
    wrap?: boolean;
}

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
  block?: boolean;
  dir?: 'ltr' | 'rtl';
}