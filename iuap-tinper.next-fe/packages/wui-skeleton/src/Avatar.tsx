import classNames from 'classnames';
// import PropTypes from 'prop-types';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import Element from './Element';
import { AvatarProps } from './iSkeleton';
import {getNid} from "../../wui-core/src/index";


// export const AvatarProps = {
//     ...omit(SkeletonElementProps, ['shape']),
//     shape: PropTypes.oneOf(['circle', 'square'])
// }

const SkeletonAvatar = (props: AvatarProps) => {
    const {getPrefixCls} = React.useContext(ConfigContext);
    const {className, active} = props;
    const prefixCls = getPrefixCls('skeleton');
    const otherProps = omit(props, ['prefixCls']);
    const cls = classNames(
        prefixCls,
        `${prefixCls}-element`,
        {
            [`${prefixCls}-active`]: active,
        },
        className,
    );
    let adapterNid = getNid(props)
    return (
        <div className={cls} {...adapterNid}>
            <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
        </div>
    );
};

// SkeletonAvatar.propTypes = AvatarProps;

SkeletonAvatar.defaultProps = {
    size: 'default',
    shape: 'circle',
};

export default SkeletonAvatar;
