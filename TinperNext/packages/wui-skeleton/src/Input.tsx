import classNames from 'classnames';
// import PropTypes from 'prop-types';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import {ConfigContext} from "../../wui-provider/src/context";
import Element from './Element';
import { SkeletonInputProps } from './iSkeleton';
import {getNid} from "../../wui-core/src/index";


// export const SkeletonInputProps = {
//     ...omit(SkeletonElementProps, ['size', 'shape']),
//     size: PropTypes.oneOf(['large', 'small', 'default'])
// }

const SkeletonInput = (props: SkeletonInputProps) => {
    const {className, active} = props;
    const {getPrefixCls} = React.useContext(ConfigContext);
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
            <Element prefixCls={`${prefixCls}-input`} {...otherProps} />
        </div>
    );
};

// SkeletonInput.propTypes = SkeletonInputProps;
SkeletonInput.defaultProps = {
    size: 'default',
};

export default SkeletonInput;
