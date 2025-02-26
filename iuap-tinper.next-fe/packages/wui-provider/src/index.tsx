/* eslint-disable react/prop-types */
// import { FormProvider as RcFormProvider } from 'rc-field-form';
// import { ValidateMessages } from 'rc-field-form/lib/interface';
import useMemo from 'rc-util/lib/hooks/useMemo';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { prefix } from '../../wui-core/src/index';
import LocaleProvider, { ANT_MARK } from '../../wui-locale/src/locale-provider';
import { globalLangs, langTransform, mapLangFn } from '../../wui-locale/src/tool';
import LocaleReceiver from '../../wui-locale/src/locale-receiver';
// import message from '../../wui-message/src';
// import notification from '../../wui-notification/src';
import { ConfigConsumer, ConfigContext } from './context';
import SizeContext, { SizeContextProvider, sizeMap } from './SizeContext';
import AlignContext, { AlignContextProvider } from './AlignContext';
import BorderContext, { BorderContextProvider } from './BorderContext';
import DisabledContext, { DisabledContextProvider } from './DisabledContext';
import RTLContext, { RTLContextProvider } from './RTLContext';
// import PropTypes from 'prop-types';
import { registerTheme, updateTheme, getTheme2Style } from './cssVariables';
import type {
    ProviderChildrenProps,
    ConfigProviderProps,
    DataFormatContextProps,
    ProviderLocale,

} from './iProvider';
import { Locale } from '../../wui-locale/src/iLocale';
import { SizeType } from '../../wui-core/src/iCore';
import formJDWorkJson from './jdWorkConfig';
import staticLocalMap from './locale';

export {
    ConfigContext,
    ConfigConsumer,
    ProviderLocale
    // CSPConfig,
    // DirectionType,
    // ConfigConsumerProps,
};


export const defaultPrefixCls = `${prefix}`;
let globalPrefixCls: string;
let globalDirection: 'ltr' | 'rtl' | undefined;
let globalLocale: Locale;
let globalDataFormat: DataFormatContextProps;

const setGlobalConfig = (params: ConfigProviderProps) => {
    if (params.prefixCls !== undefined) {
        globalPrefixCls = params.prefixCls;
    }
    if (params.locale !== undefined) {
        globalLocale = params.locale as Locale;
    }
    if (params.dataFormat && typeof params.dataFormat === 'object') {
        globalDataFormat = params.dataFormat;
    }
    if (params.dir && typeof params.dir === 'string') {
        globalDirection = params.dir;
    }
};
const hasRegisterLang = (name: string) => {
    if (name) {
        return !!globalLangs[langTransform(name)]
    }
    return false
}
const registerLang = (name: string, config: any) => {
    if (config && name && !hasRegisterLang(name)) {
        const configMap = mapLangFn(config);
        if (configMap && Object.keys?.(configMap)?.length) {
            globalLangs[langTransform(name)] = configMap || {}
        }
    }
}
function getGlobalPrefixCls() {
    return globalPrefixCls || defaultPrefixCls;
}

function filterProps(
    config: ConfigProviderProps,
    props: ConfigProviderProps,
    obj: { [key: string]: string | string[] } = {
        antd: 'antd',
        locale: 'locale',
        timeFormat: 'timeFormat'
    }
): any {
    for (let k in obj) {
        if (Array.isArray(obj[k])) {
            let hasAttr = (obj[k] as string[]).find((k: string) => k in props);
            if (!hasAttr) {
                delete config[k];
            }
        } else {
            if (!((obj[k] as string) in props) && k in config) {
                delete config[k];
            }
        }
    }
    return config;
}
// // -7，111,222。33
// // 111.222，33
// // 验证 jDiwork
// (window as any).jDiwork = {
//     diworkContext: () => {
//         return {
//             locale: "id_ID",
//             enableTimezone: true,
//             dataformat: '{"area":"zh-CN","calendar":"gregory","dateFormat":"yyyy-MM-dd","dateTimeFormat":"yyyy-MM-dd hh:mm:ss a","dayOfWeek":"SUNDAY","numberFormat":"#,###,###,###,###,###[.]########+","timeFormat":"hh:mm:ss a","timezone": "Europe/Moscow"}', // utc+3
//             // "America/New_York" "America/Lima" "America/Los_Angeles" "Asia/Singapore" "Asia/Tokyo" "Asia/Shanghai" "Asia/Jerusalem" "Europe/Moscow"
//             // "#.###.###.###.###.###[,]########+"
//             // "#,###,###,###,###,###[.]########+"
//             serverTimezone: "Asia/Shanghai",
//             timezone: "UTC+08:00"
//         }
//     }
// }

const getAttrFromJDWork = (config: any) => {
    let diworkContext = (window as any)?.jDiwork?.diworkContext?.();
    let diworkDataformat = diworkContext?.dataformat;
    // 注意：可能存在非工作台下用户自行引入jDiwork，没有首选项的场景，参考 https://uretail-bip-daily.yyuap.com/portal?env=dev 零售管理 --> 零售单 节点
    if (diworkDataformat && typeof diworkDataformat === 'string') {
        try {
            diworkDataformat = JSON.parse(diworkDataformat);
            diworkContext.dataformat = diworkDataformat
        } catch (e) {
            console.error(e);
        }
    }
    Object.entries(formJDWorkJson).forEach(([jdName, obj]) => {
        if (diworkContext) {
            const diworkDataformatKey = obj.isDataformat ? diworkContext?.dataformat?.[jdName] : diworkContext?.[jdName]
            if (diworkDataformatKey !== undefined) {
                const { comp, key, jdworkMap } = obj;
                if (comp === 'all') {
                    config[key] = diworkDataformatKey
                } else if (Array.isArray(comp)) {
                    comp.forEach(c => {
                        if (!config.provider[c]) {
                            config.provider[c] = {};
                        }
                        if (config.provider[c][key] === undefined) {
                            config.provider[c][key] = jdworkMap?.[diworkDataformatKey] || (jdworkMap as (key: string) => string)?.(diworkDataformatKey) || diworkDataformatKey;
                        }
                    })
                }
            }
        }
    })
    return config

}

export const globalConfig = () => ({
    getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
        if (customizePrefixCls) return customizePrefixCls;
        return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
    },
    getRootPrefixCls: (rootPrefixCls: string, customizePrefixCls?: string) => {
        // Customize rootPrefixCls is first priority
        if (rootPrefixCls) {
            return rootPrefixCls;
        }

        // If Global prefixCls provided, use this
        if (globalPrefixCls) {
            return globalPrefixCls;
        }

        // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
        if (customizePrefixCls && customizePrefixCls.includes('-')) {
            return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
        }

        // Fallback to default prefixCls
        return getGlobalPrefixCls();
    },
    getGlobalLocale: () => globalLocale,

    getGlobalDataFormat: () => {
        if (globalDataFormat) return globalDataFormat;
        let diworkDataformat;
        if ((window as any)?.jDiwork?.diworkContext) {
            diworkDataformat = (window as any).jDiwork.diworkContext?.()?.dataformat;
        }
        // 注意：可能存在非工作台下用户自行引入jDiwork，没有首选项的场景，参考 https://uretail-bip-daily.yyuap.com/portal?env=dev 零售管理 --> 零售单 节点
        if (diworkDataformat && typeof diworkDataformat === 'string') {
            try {
                diworkDataformat = JSON.parse(diworkDataformat);
            } catch (e) {
                console.error(e);
            }
        }
        return diworkDataformat && Object.prototype.toString.call(diworkDataformat) === '[object Object]'
            ? diworkDataformat
            : {};
    },
    getGlobalDirection: () => {
        return globalDirection;
    }
});

// todo 后续删除改为业务单独适配
function getDefaultDirectionFromLang(lang:any) {
    const rtlLangs = ["ar", "ar-sa", "he-il"];
    const locale = typeof lang === 'object' ? lang?.locale?.replace("_", "-").toLowerCase() : lang?.replace("_", "-").toLowerCase();
    const dir = rtlLangs.includes(locale) ? "rtl" : "ltr";

    return dir;
}

function getDefaultDirectionFromDir() :string | undefined {
    let dir: string | undefined;
    if ((window as any)?.jDiwork?.diworkContext) {
        dir = (window as any).jDiwork.diworkContext?.()?.direction;
    }
    return dir;
}


const ProviderChildren: React.FC<ProviderChildrenProps> = props => {
    let {
        children,
        // csp,
        // autoInsertSpaceInButton,
        // form,
        locale,
        componentSize,
        size,
        align,
        bordered,
        componentDisabled,
        disabled,
        dir,
        // space,
        // virtual,
        // dropdownMatchSelectWidth,
        legacyLocale,
        parentContext,
        // iconPrefixCls,
        antd,
        ...others
    } = props;
    size = size ?? componentSize;
    const parentSize = parentContext.size ?? parentContext.componentSize
    size = (
        size
            ? sizeMap[size] || size
            : parentSize
                ? sizeMap[parentSize] || parentSize
                : undefined
    ) as SizeType;
    let config = {
        ...parentContext,
        provider: { ...others }, // 每个组件定制属性
        locale: locale || legacyLocale,
        size: size,
        align: align ?? parentContext.align,
        bordered: bordered ?? parentContext.bordered,
        disabled: disabled ?? componentDisabled ?? parentContext.disabled ?? parentContext.componentDisabled,
        antd: antd || parentContext.antd,
        // csp,
        // autoInsertSpaceInButton,
        dir,
        // space,
        // virtual,
        // dropdownMatchSelectWidth,
        // getPrefixCls,
    };
    config = filterProps(config, props); // provider没有提供属性，默认不设置;
    config = getAttrFromJDWork(config)
    // Pass the props used by `useContext` directly with child component.
    // These props should merged into `config`.
    // PASSED_PROPS.forEach(propName => {
    //     const propValue = props[propName];
    //     if (propValue) {
    //         config[propName] = propValue;
    //     }
    // });
    // provider > 工作台 > 通过语言获取(脱离工作台) > 默认方向
    let innerDirection = (dir || getDefaultDirectionFromDir() || getDefaultDirectionFromLang(config.locale || "zh-CN")) as "ltr" | "rtl";
    config.dir = innerDirection || "ltr";
    if (innerDirection && document.dir !== innerDirection) {
        config.dir = innerDirection;
        document.documentElement.setAttribute("dir", innerDirection);
    }
    let roleDom = document.querySelector('div[tinper-next-role="container"]') as any
    if (innerDirection && roleDom?.dir !== innerDirection) {
        if (roleDom) {
            roleDom?.setAttribute("dir", innerDirection);
        }
    }


    const memoedConfig = useMemo(
        () => config,
        config,
        (prevConfig: Record<string, any>, currentConfig: Record<string, any>) => {
            const prevKeys = Object.keys(prevConfig);
            const currentKeys = Object.keys(currentConfig);
            return (
                prevKeys.length !== currentKeys.length || prevKeys.some(key => prevConfig[key] !== currentConfig[key])
            );
        }
    );

    let childNode = children;


    if (locale) {
        setGlobalConfig({locale: locale})
        childNode = (
            <LocaleProvider locale={locale as Locale} _ANT_MARK__={ANT_MARK}>
                {childNode}
            </LocaleProvider>
        );
    }
    if (size) {
        childNode = <SizeContextProvider size={size}>{childNode}</SizeContextProvider>;
    }

    if (align !== undefined) {
        childNode = <AlignContextProvider align={align}>{childNode}</AlignContextProvider>;
    }

    if (bordered !== undefined) {
        childNode = <BorderContextProvider bordered={bordered}>{childNode}</BorderContextProvider>;
    }

    if (disabled) {
        childNode = <DisabledContextProvider disabled={disabled}>{childNode}</DisabledContextProvider>;
    }

    if (innerDirection) {
        childNode = <RTLContextProvider dir={innerDirection}>{childNode}</RTLContextProvider>;
        setGlobalConfig({dir: innerDirection})
    }

    // console.log('memoedConfig',memoedConfig)
    return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>;
};

const ConfigProvider: React.FC<ConfigProviderProps> & {
    ConfigContext: typeof ConfigContext;
    SizeContext: typeof SizeContext;
    AlignContext: typeof AlignContext;
    BorderContext: typeof BorderContext;
    DisabledContext: typeof DisabledContext;
    RTLContext: typeof RTLContext;
    config: typeof setGlobalConfig;
    getConfig: typeof globalConfig;
    registerTheme: typeof registerTheme;
    registerLang: typeof registerLang;
    hasRegisterLang: typeof hasRegisterLang;
} = props => {
    const [locale, setLocale] = React.useState<string | {[key: string]: any}>();

    const ref = React.useRef<any>({});

    const getContainerDOM = (container: any) => {
        if (!container) return;
        let containerDom;
        if (typeof container === 'function') {
            containerDom = container();
        } else {
            containerDom = ReactDOM.findDOMNode(container as any);
        }
        return containerDom;
    };
    const langMapFn = async() => {
        const { 'locale': localeProps } = props;
        if (!localeProps) {
            return;
        }
        if ((typeof localeProps !== 'object' && typeof localeProps !== 'string') || locale === localeProps) {
            return;
        }
        if (typeof localeProps === 'object' || hasRegisterLang(localeProps)) {
            return setLocale(localeProps);
        }
        let langMap = (await staticLocalMap[langTransform(localeProps)]?.());
        langMap = langMap?.default || langMap;
        // console.log(langMap)
        if (langMap) {
            registerLang(localeProps, langMap)
            setLocale(localeProps)
        }
    }

    langMapFn()

    React.useEffect(() => {
        try {
            if (props.theme) {
                const { node, nodeStyle } = ref.current;
                if (node && nodeStyle) {
                    for (let k in nodeStyle) {
                        node.style.removeProperty(k);
                    }
                    ref.current.node = null;
                    ref.current.nodeStyle = null;
                }
                const partDom = getContainerDOM(props.getThemeContainer);
                if (partDom) {
                    const style = getTheme2Style(props.theme);

                    for (let k in style) {
                        partDom.style.setProperty(k, style[k]);
                    }

                    ref.current.node = partDom;
                    ref.current.nodeStyle = style;
                }
                updateTheme(props.theme, !!partDom);
            }
        } catch (e) {
            console.error(e);
        }
    }, [props.theme, props.getThemeContainer]);

    const _locale = locale || props.locale
    return (
        // @ts-ignore LocaleReceiver
        <LocaleReceiver>
            {(_: any, __: any, legacyLocale: any) => (
                <ConfigConsumer>
                    {context => <ProviderChildren parentContext={context} legacyLocale={legacyLocale} {...props} locale={_locale} />}
                </ConfigConsumer>
            )}
        </LocaleReceiver>
    );
};

/** @private internal Usage. do not use in your production */
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.AlignContext = AlignContext;
ConfigProvider.BorderContext = BorderContext;
ConfigProvider.DisabledContext = DisabledContext;
ConfigProvider.RTLContext = RTLContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.getConfig = globalConfig; // 新增获取当前配置的方法
ConfigProvider.registerTheme = registerTheme;
ConfigProvider.registerLang = registerLang;
ConfigProvider.hasRegisterLang = hasRegisterLang;

export default ConfigProvider;
