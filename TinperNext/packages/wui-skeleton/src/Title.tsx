import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { SkeletonTitleProps } from './iSkeleton';

// export const SkeletonTitleProps = {
//     prefixCls: PropTypes.string,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// }

const Title = ({prefixCls, className, width, style}: SkeletonTitleProps) => (
    <h3 className={classNames(prefixCls, className)} style={{width, ...style}}/>
);

// Title.propTypes = SkeletonTitleProps;

export default Title;
