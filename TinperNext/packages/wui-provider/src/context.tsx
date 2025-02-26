import omit from 'omit.js';
// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import {prefix} from "../../wui-core/src/index"
import defaultRenderEmpty from './renderEmpty';
import type {IReactComponent, ConsumerConfig, ConfigConsumerProps, ConstructorProps} from './iProvider'

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${prefix}-${suffixCls}` : `${prefix}`;
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
    // We provide a default function for Context without provider
    getPrefixCls: defaultGetPrefixCls,
    renderEmpty: defaultRenderEmpty,
    locale: undefined,
    disabled: undefined,
    bordered: undefined,
    align: undefined,
    size: undefined,
    antd: undefined,
    dir: undefined
});

export const ConfigConsumer = ConfigContext.Consumer;

export function WithConfigConsumer(config: ConsumerConfig = {}) {
    return function WithConfigConsumerFunc(Component: IReactComponent): any {
        // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
        const SFC: Record<string, any> = React.forwardRef((props, ref) => (
            <ConfigConsumer>
                {(configProps: ConfigConsumerProps) => {
                    const providerProps = config.name ? configProps?.provider?.[config.name] : {};
                    return <Component {...omit(config, ["name"])} {...omit(configProps, ["getPrefixCls", "renderEmpty", "provider"])} {...providerProps} {...props}
									  ref={ref}/>;
                }}
            </ConfigConsumer>
        ))
        let showComponentKeys = Object.keys(Component);
        if (showComponentKeys.length > 0) {
            showComponentKeys.forEach((key) => {
                // @ts-ignore
                SFC[key] = Component[key];
            });
        }

        const cons: ConstructorProps = Component.constructor as ConstructorProps;
        const name = (cons && cons.displayName) || Component.name || 'Component';
        const clsPrefix = Component.defaultProps ? Component.defaultProps.clsPrefix : undefined;
        SFC.displayName = `WithConfigConsumer(${name})`;
        SFC.defaultProps = {clsPrefix} as any
        return SFC;
    };
}

export function useConfigContext(config: ConsumerConfig = {}) {
    const configProps = React.useContext(ConfigContext);
    const providerProps = config.name ? configProps?.provider?.[config.name] : {};
    return {
        ...omit(config, ["name"]),
        ...omit(configProps, ["getPrefixCls", "renderEmpty", "provider"]),
        ...providerProps
    }
}
