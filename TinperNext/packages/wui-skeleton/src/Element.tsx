import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { SkeletonElementProps } from './iSkeleton';
import {setComponentSize} from "../../wui-core/src/componentStyle"

// export const SkeletonElementProps = {
//     prefixCls: PropTypes.string,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     shape: PropTypes.oneOf(['circle', 'square', 'round', 'default']),
//     active: PropTypes.bool,
// }

const Element = (props: SkeletonElementProps) => {
    const {prefixCls, className, style, size, shape} = props;

    const sizeCls = classNames({
        [`${prefixCls}-lg`]: setComponentSize(size) === 'lg',
        [`${prefixCls}-sm`]: setComponentSize(size) === 'sm',
    });

    const shapeCls = classNames({
        [`${prefixCls}-circle`]: shape === 'circle',
        [`${prefixCls}-square`]: shape === 'square',
        [`${prefixCls}-round`]: shape === 'round',
    });

    const sizeStyle =
		typeof size === 'number'
		    ? {
		        width: setComponentSize(size),
		        height: setComponentSize(size),
		        lineHeight: `${setComponentSize(size)}px`,
		    }
		    : {};

    return (
        <span
            className={classNames(prefixCls, sizeCls, shapeCls, className)}
            style={{...sizeStyle, ...style}}
        />
    );
};

// Element.propTypes = SkeletonElementProps;

export default Element;
