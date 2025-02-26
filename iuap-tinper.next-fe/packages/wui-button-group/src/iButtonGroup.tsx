import * as React from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

type ButtonGroupItemProps = {
    className?: string,
    title?: string,
    key?: string,
    isText?: boolean,
    onClick?: (e: React.MouseEvent) => void,
}

export interface ButtonGroupProps extends Omit<BaseHtmlProps<HTMLDivElement>, 'list'> {
    vertical?: boolean;
    justified?: boolean;
    block?: boolean;
    separated?: boolean;
    list?: Array<ButtonGroupItemProps>;
}

export interface ButtonGroupState {
    activeKey?: string;
}