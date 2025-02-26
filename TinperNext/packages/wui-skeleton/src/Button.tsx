import classNames from 'classnames';
// import PropTypes from 'prop-types';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import Element from './Element';
import { SkeletonButtonProps } from './iSkeleton';
import {getNid} from "../../wui-core/src/index";


// export const SkeletonButtonProps = {
//     ...omit(SkeletonElementProps, ['size', 'shape']),
//     size: PropTypes.oneOf(['large', 'small', 'default']),
//     shape: PropTypes.oneOf(['default', 'circle', 'round']),
// }

const SkeletonButton = (props: SkeletonButtonProps) => {
    const {getPrefixCls} = React.useContext(ConfigContext);
    const {className, active, block} = props;
    const prefixCls = getPrefixCls('skeleton');
    const otherProps = omit(props, ['prefixCls']);
    const cls = classNames(
        prefixCls,
        `${prefixCls}-element`,
        {
            [`${prefixCls}-active`]: active,
            [`${prefixCls}-block`]: block,
        },
        className,
    );
    let adapterNid = getNid(props)
    return (
        <div className={cls} {...adapterNid}>
            <Element prefixCls={`${prefixCls}-button`} {...otherProps} />
        </div>
    );
};

// SkeletonButton.propTypes = SkeletonButtonProps;
SkeletonButton.defaultProps = {
    size: 'default',
    active: false
};

export default SkeletonButton;
