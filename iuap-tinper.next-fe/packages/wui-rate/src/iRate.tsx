import * as React from 'react';
import type {BaseProps} from '../../wui-core/src/iCore';

// import type { RateProps as RcRateProps } from 'rc-rate/lib/Rate';
// export interface RateProps extends RcRateProps {
//     fieldid?: string;
// }

export interface StarProps {
    value?: number;
    index?: number;
    prefixCls?: string;
    allowHalf?: boolean;
    disabled?: boolean;
    onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, index: number) => void;
    character?: React.ReactNode;
    characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
    focused?: boolean;
    count?: number;
}

export interface RateProps extends BaseProps {
    disabled?: boolean;
    value?: number;
    index?: number;
    defaultValue?: number;
    count?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    // style?: React.CSSProperties;
    prefixCls?: string;
    onChange?: (value: number, dispalyValue?: string) => void;
    onHoverChange?: (value: number, dispalyValue?: string) => void;
    // className?: string;
    character?: React.ReactNode;
    characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: ((e?: KeyboardEvent) => void);
    autoFocus?: boolean;
    tooltips?: Array<string>;
    dir?:'ltr' | 'rtl';
    decimalSeparator?: string;
    // fieldid?: string;
}