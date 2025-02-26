import classNames from 'classnames';
import * as React from 'react';
import {prefix} from "../../wui-core/src/index";
import {SpaceCompactProps} from './iSpace'
import {useConfigContext} from '../../wui-provider/src/context';


const Compact: React.FC<SpaceCompactProps> = (props: SpaceCompactProps) => {
    const {
        direction,
        block,
        className,
        children,
        dir: dirProp,
        ...restProps
    } = props;
    const {dir} = dirProp ? {dir: dirProp} : useConfigContext();

    const prefixCls = `${prefix}-space-compact`;
    const clx = classNames(
        prefixCls,
        {
            [`${prefixCls}-block`]: block,
            [`${prefixCls}-rtl`]: dir === 'rtl',
            [`${prefixCls}-vertical`]: direction === 'vertical',
        },
        className,
    );

    const childNodes = React.Children.toArray(children);
    // =========================== Render ===========================
    if (childNodes.length === 0) {
        return null;
    }

    return (
        <div className={clx} {...restProps}>
            {childNodes}
        </div>
    );
};

export default Compact;
