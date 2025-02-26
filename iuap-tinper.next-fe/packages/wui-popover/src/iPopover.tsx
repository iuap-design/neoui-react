import * as React from 'react';
import {RenderFunction} from '../../wui-core/src/utils/createAntdUtils';
import {TooltipProps} from '../../wui-tooltip/src/iTooltip';

export interface PopoverProps extends TooltipProps {
    title?: React.ReactNode;
    content?: React.ReactNode | RenderFunction;
    resizable?: boolean | string;
    resizeStyle?: any;
    enable?: any;
    onResize?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
    onResizeStart?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
    onResizeStop?: (_v1?: any, _v2?: any, _v3?: any, _v4?: any) => void;
}
