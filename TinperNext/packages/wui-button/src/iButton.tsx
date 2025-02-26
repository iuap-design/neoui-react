import * as React from 'react';
import type {BaseProps} from '../../wui-core/src/iCore';

export type ButtonSize = 'sm' | 'md' | 'xg' | 'lg' | 'small' | 'large' | 'middle';
export type ButtonShape = 'block' | 'round' | 'border' | 'squared' | 'floating' | 'pillRight' | 'pillLeft' | 'icon';
export type ButtonColors = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'light';
export type ButtonIcon = string | React.ReactElement<React.HTMLAttributes<any>>;
export type ButtonHtmlType = 'submit' | 'button' | 'reset';
export type ButtonType = 'default' | 'ghost' | 'danger' | 'primary' | 'dashed' | 'text' | 'link' | 'plainText';

export interface BaseButtonProps extends BaseProps {
    bordered?: boolean;
    icon?: ButtonIcon;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    htmlType?: ButtonHtmlType;
    isSubmit?: boolean;
    danger?: boolean;
    ghost?: boolean;
    block?: boolean;
    isText?: boolean;
    href?: string;
    type?: ButtonType;
    colors?: ButtonColors;
    shape?: ButtonShape;
    size?: ButtonSize;
    id?: string;
    maxWidth?: boolean;
    dir?: "rtl" |"ltr";
}

export type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;
export type AnchorButtonProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type'>;
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;