import React, {ReactElement} from 'react';
import { DropDownProps } from '../../wui-dropdown/src/iDropdown';
import { BaseHtmlProps } from '../../wui-core/src/iCore';

export interface BreadcrumbProps extends Omit<BaseHtmlProps<HTMLElement>, 'onClick' | 'type'> {
    // onClick?: React.MouseEventHandler<HTMLElement>;
    onClick?: (e: React.MouseEvent, key?: string) => void;
    separator?: React.ReactNode;
    fillSpace?: boolean | number;
    activeKey?: string;
}

export interface BreadcrumbItemProps extends Omit<BreadcrumbProps, 'title' | 'onClick'> {
    onItemClick?: (e: React.MouseEvent, key: string) => void;
    title?: string | ReactElement;
    active?: boolean;
    href?: string;
    overlay?: DropDownProps['overlay'];
    menu?: DropDownProps['overlay'];
    dropdownProps?: DropDownProps;
    keyValue?: string | undefined;
    isActiveKey?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}


export interface BreadcrumbState {
    fillSpaceStyle: React.CSSProperties;
    activeKey?: string;
}