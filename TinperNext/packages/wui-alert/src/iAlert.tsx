import * as React from 'react';
import type {BaseHtmlProps} from '../../wui-core/src/iCore';

export interface AlertProps extends Omit<BaseHtmlProps<HTMLElement>, "action"> {
    onDismiss?: React.MouseEventHandler<HTMLDivElement>;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    closable?: boolean;
    showIcon?: boolean;
    message?: React.ReactNode;
    action?: React.ReactNode;
    icon?:React.ReactNode;
    bordered?: boolean;
    description?: React.ReactNode;
    closeLabel?: React.ReactNode;
    closeText?: React.ReactNode;
    closeIcon?: React.ReactNode;
    dark?: boolean;
    colors?: `success` | `info` | `warning` | `danger`;
    type?: `success` | `info` | `warning` | `danger`;
    afterClose?: () => void;
}