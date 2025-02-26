/**
 * 目前popover是基于tooltips实现
 * PopoverProps 是继承于tooltips中 TooltipProps
 * 同时存在独立属性
 * title?: React.ReactNode | RenderFunction;
 * 和
 * content?: React.ReactNode | RenderFunction;
 */
// import PropTypes from 'prop-types';
import * as React from 'react';
import {prefix} from '../../wui-core/src/index';
import {getRenderPropValue, getTransitionName} from '../../wui-core/src/utils/createAntdUtils';
import Tooltip from '../../wui-tooltip/src';
// import {propTypes as popoverPropTypes} from '../../wui-tooltip/src/index';
import type {PopoverProps} from './iPopover';
import { useConfigContext } from '../../wui-provider/src/context';

const Popover = React.forwardRef<HTMLDivElement | null, PopoverProps>(({clsPrefix = `${prefix}-popover`, title, content, dir, ...otherProps}, ref: React.RefObject<HTMLDivElement>) => {
    const {dir: rtlDirection = 'ltr'} = dir ? {dir} : useConfigContext();
    const getOverlay = (clsPrefix: string) => {
        if (!title && !content) return null;
        return (
            <>
                {title && <div className={`${clsPrefix}-title`}>{getRenderPropValue(title)}</div>}
                <div className={`${clsPrefix}-inner-content`}>{getRenderPropValue(content)}</div>
            </>
        );
    };
    return (
        <Tooltip
            {...otherProps}
            dir={rtlDirection}
            prefixCls={`${clsPrefix}`}
            ref={ref}
            overlay={getOverlay(clsPrefix)}
            transitionName={getTransitionName('u', 'zoom-big', otherProps.transitionName)}
        />
    );
});

Popover.displayName = 'Popover';

/* Popover.propTypes = {
    ...popoverPropTypes,
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}; */
Popover.defaultProps = {
    placement: 'top',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {}
};

export default Popover;
