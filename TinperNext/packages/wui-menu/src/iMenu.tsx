import * as React from 'react';
import { MenuProps as RcMenuProps, MenuItemProps as RcMenuItemProps, SubMenuProps as RcSubMenuProps } from 'rc-menu';
import type {
    MenuDividerType as RcMenuDividerType,
    MenuItemGroupType as RcMenuItemGroupType,
    MenuItemType as RcMenuItemType,
    SubMenuType as RcSubMenuType,
} from 'rc-menu/lib/interface';
import { SiderContextProps } from '../../wui-layout/src/iLayout';
import { BaseProps } from '../../wui-core/src/iCore';

export type MenuTheme = 'light' | 'dark';
export type MenuMode = RcMenuProps['mode'] | 'vertical-left' | 'vertical-right' | 'dropdown';
export type MenuPosition = 'leftTop' | 'rightTop';

export interface MenuItemType extends RcMenuItemType {
    icon?: React.ReactElement;
    danger?: boolean;
    title?: React.ReactNode;
}

export interface SubMenuType extends Omit<RcSubMenuType, 'children'> {
    icon?: React.ReactElement;
    children: ItemType[];
}

export interface MenuItemGroupType extends Omit<RcMenuItemGroupType, 'children'> {
    children?: ItemType[];
    key?: React.Key;
}

export interface MenuDividerType extends RcMenuDividerType {
    className?: string;
    dashed?: boolean;
    key?: React.Key;
}

export type ItemType = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType | null;

export interface MenuProps extends Omit<RcMenuProps, 'mode' | 'items'>, BaseProps {
    theme?: MenuTheme;
    keyboard?: boolean;
    mode?: MenuMode,
    position?: MenuPosition,
    tabIndex?: number;
    selectIcon?: React.ReactElement,
    items?: ItemType[];
    arrowdown?: boolean;
    onSubMenuClick?: (info: {key: string | undefined, title: React.ReactNode, children: React.ReactNode}) => void;
    popupOffset?:[number, number];
    dir?: 'ltr' | 'rtl';
}

export type InternalMenuProps = MenuProps & SiderContextProps;

export type DirectionType = 'ltr' | 'rtl' ;
export interface MenuContextProps {
    rootPrefixCls?: string;
    inlineCollapsed: boolean;
    menuTheme?: MenuTheme;
    dir?: DirectionType;
    firstLevel: boolean;
    mode?: string;
    selectIcon?: MenuProps['selectIcon'];
    multiple?: boolean;
    arrowdown?: boolean;
    parentFieldid?: string;
    popupOffset?: [number, number];
}

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'>, BaseProps {
    icon?: React.ReactElement;
    danger?: boolean;
    title?: React.ReactNode;
    disabled?: boolean;
}

interface TitleEventEntity {
    key: string;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  }
export interface SubMenuProps extends RcSubMenuProps, BaseProps {
    disabled?: boolean;
    icon?: React.ReactElement;
    onTitleClick?: (e: TitleEventEntity) => void;
    onTitleMouseEnter?: (e: TitleEventEntity) => void;
    onTitleMouseLeave?: (e: TitleEventEntity) => void;
    popupOffset?: [number, number];
    popupClassName?: string;
    dir?: 'ltr' | 'rtl';
  }
export interface MenuInfo {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface MenuDividerProps extends BaseProps {
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
    dashed?: boolean;
  }