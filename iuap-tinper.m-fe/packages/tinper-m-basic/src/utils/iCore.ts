import { CSSProperties, ReactNode, AllHTMLAttributes, Key as ReactKey } from 'react';

// 全局可选基础属性
export interface BaseProps{
    // html公共属性
    className?: string|undefined;
    style?: CSSProperties|undefined;

    // 组件的公共属性
    clsPrefix?: string|undefined;
    fieldid?: string|undefined;
    children?:ReactNode|undefined;

    // 设计器相关的属性
    nid?: string|undefined,
    uitype?:string|undefined,
    uirunmode?:string|undefined
}
// 全局可选基础属性+html基础属性
export interface BaseHtmlProps<T> extends BaseProps, AllHTMLAttributes<T>{}

export type SizeType = 'xs' | 'sm' | 'md' | 'nm' | 'lg' | 'small' | 'middle' | 'large'

export type AlignType = 'left' | 'center' | 'right'

export type BorderType = boolean | 'bottom'
export type Key = Exclude<ReactKey, bigint>
