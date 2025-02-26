/* eslint-disable camelcase */
import * as React from 'react';
import {RenderFunction} from '../../wui-core/src/utils/createAntdUtils';
import {TooltipProps} from '../../wui-tooltip/src/iTooltip';
import {ButtonProps, ButtonType} from '../../wui-button/src/iButton';

export interface PopconfirmProps extends TooltipProps {
    title?: React.ReactNode;
    locale?: Record<string, any> | string;
    onRootClose?: Function;
    onVisibleChange?: (value: boolean, e?: React.MouseEvent | React.KeyboardEvent) => void;
    onCancel?: React.MouseEventHandler<HTMLElement>;
    onConfirm?: React.MouseEventHandler<HTMLElement>;
    onClose?: React.MouseEventHandler<HTMLElement>;
    content?: RenderFunction | React.ReactNode;
    description?: RenderFunction | React.ReactNode;
    okText?: React.ReactNode;
    okType?: ButtonType;
    cancelText?: React.ReactNode;
    cancel_btn?: React.ReactElement;
    close_btn?: React.ReactElement;
    icon?: React.ReactElement;
    showCancel?: boolean;
    disabled?: boolean;
    cancelButtonProps?: ButtonProps;
    okButtonProps?: ButtonProps;
    keyboard?: boolean
}
