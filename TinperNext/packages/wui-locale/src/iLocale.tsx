import { ReactNode } from "react";

export type LangMap = {
    'zh': string,
    'zh-cn': string,
    'en': string,
    'en-us': string,
    'zh-tw': string,
    'vi': string,
    'vi-vn': string,
    [key: string]: string
}
export interface Locale {
    locale?: string;
    lang?: keyof LangMap;
    [key: string]: any;
}
export type LocaleType = Locale | string;
export interface LocaleProviderProps {
    locale?: Locale;
    children?: ReactNode;
    _ANT_MARK__: string;
}
export interface LocaleReceiverProps {
    componentName: string;
    defaultLocale: string;
    children: (l: {[key: string]: any}, c: string, t: {[key: string]: any}) => any;
}