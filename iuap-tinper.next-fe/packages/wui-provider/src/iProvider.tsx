import * as React from 'react';
import renderEmpty from './renderEmpty';
import {Locale} from '../../wui-locale/src/iLocale';
import type {AlignType, BaseProps, BorderType, SizeType} from '../../wui-core/src/iCore';

export type RenderEmptyHandler = typeof renderEmpty;
export type ProviderLocale = Locale | string;

export interface ConfigConsumerProps {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
    renderEmpty?: RenderEmptyHandler;
    locale?: ProviderLocale;
    antd?: boolean;
    componentSize?: SizeType;
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    componentDisabled?: boolean;
    disabled?: boolean;
    provider?: any;
    dir?: 'ltr' | 'rtl';
}

export interface ConfigProviderProps extends BaseProps {
    prefixCls?: string;
    antd?: boolean;
    // children?: React.ReactNode;
    renderEmpty?: RenderEmptyHandler;
    locale?: ProviderLocale;
    componentSize?: SizeType;
    size?: SizeType;
    align?: AlignType;
    bordered?: BorderType;
    componentDisabled?: boolean;
    disabled?: boolean;
    theme?: string | Array<string>;
    getThemeContainer?: (() => HTMLElement | null) | HTMLElement | React.ReactInstance | null;
    dir?: 'ltr' | 'rtl' | undefined;
    [key: string]: any;
}

export interface ProviderChildrenProps extends ConfigProviderProps {
    parentContext: ConfigConsumerProps;
    legacyLocale: ProviderLocale;
}

export type IReactComponent<P = any> = React.FC<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;

export interface ConsumerConfig {
    prefixCls?: string;
    name?: string;
}

export interface SizeContextProps {
    size?: any;
    children?: React.ReactNode;
}
export interface BorderContextProps {
    bordered?: BorderType;
    children?: React.ReactNode;
}
export interface AlignContextProps {
    align?: AlignType;
    children?: React.ReactNode;
}

export interface DisabledContextProps {
    disabled?: boolean;
    children?: React.ReactNode;
}

export interface RTLContextProps {
    dir?: 'ltr' | 'rtl';
    children?: React.ReactNode;
}

export interface ConstructorProps {
    displayName?: string;
}
export interface JSONLabelProps {
    property?: string;
    value?: string;
}
export interface DataFormatContextProps {
    dateTimeFormat?: string;
    dateFormat?: string;
    timeFormat?: string;
}

export type DirectionProps = "ltr" | "rtl";
