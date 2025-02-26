
import * as React from 'react';
import { PaginationProps } from '../../wui-pagination/src/iPagination';
import { BaseHtmlProps, BaseProps } from '../../wui-core/src/iCore';
import { Breakpoint } from '../../wui-core/src/LayoutUtils';

export interface ListGridType extends Partial<Record<Breakpoint, number>> {
    gutter?: number;
    column?: number;
    // xs?: number;
    // sm?: number;
    // md?: number;
    // lg?: number;
    // xl?: number;
    // xxl?: number;
}

export type ListSize = 'small' | 'default' | 'large';

export type ListItemLayout = 'horizontal' | 'vertical';

export type PaginationPosition = 'top' | 'bottom' | 'both';

export interface PaginationConfig extends PaginationProps {
  position?: PaginationPosition;
}

export interface ListContextProps {
    grid?: ListGridType;
    itemLayout?: string;
}

export interface ListProps<T> extends Omit<BaseHtmlProps<HTMLElement>, 'size'> {
    bordered?: boolean;
    dataSource?: T[];
    extra?: React.ReactNode;
    grid?: ListGridType;
    itemLayout?: ListItemLayout;
    loading?: boolean | {spinning: boolean};
    loadMore?: React.ReactNode;
    pagination?: PaginationConfig | boolean;
    prefixCls?: string;
    rowKey?: ((item: T) => React.Key);
    renderItem?: (item: T, index: number) => React.ReactNode;
    size?: ListSize;
    split?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    emptyText?: React.ReactNode;
}

export interface ListItemProps extends BaseHtmlProps<HTMLElement>{
    prefixCls?: string;
    extra?: React.ReactElement;
    actions?: React.ReactNode[];
    grid?: ListGridType,
    colStyle?: React.CSSProperties;
}

export interface ListItemMetaProps extends BaseProps{
    avatar?: React.ReactNode;
    description?: React.ReactNode;
    prefixCls?: string;
    title?: React.ReactNode;
}
