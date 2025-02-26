import classNames from 'classnames';
// import PropTypes from 'prop-types';
import * as React from 'react';
import { SkeletonParagraphProps } from './iSkeleton';

// export const SkeletonParagraphProps = {
//     prefixCls: PropTypes.string,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     rows: PropTypes.number,
// }

const SkeletonParagraph = (props: SkeletonParagraphProps) => {
    const getWidth = (index: number) => {
        const {width, rows = 2} = props;
        if (Array.isArray(width)) {
            return width[index];
        }
        // last paragraph
        if (rows - 1 === index) {
            return width;
        }
        return undefined;
    };
    const {prefixCls, className, style, rows} = props;
    const rowList = [...Array(rows)].map((_, index) => (
        <li key={index} style={{width: getWidth(index)}}/>
    ));
    return (
        <ul className={classNames(prefixCls, className)} style={style}>
            {rowList}
        </ul>
    );
};

// SkeletonParagraph.propTypes = SkeletonParagraphProps;

export default SkeletonParagraph;
