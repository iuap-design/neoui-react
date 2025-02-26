import * as React from 'react';
import { BaseProps, BaseHtmlProps } from '../../wui-core/src/iCore';

export type CardSize = 'default' | 'small';

export interface CardProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'size' | 'title'> {
    title?: string | React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    headStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    loading?: boolean;
    hoverable?: boolean;
    id?: string;
    size?: CardSize;
    type?: 'inner';
    actions?: React.ReactNode[];
}

export interface GridProps extends BaseProps {
    hoverable?: boolean;
}