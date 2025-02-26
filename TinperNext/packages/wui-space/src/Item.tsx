// import PropTypes from 'prop-types';
import * as React from 'react';
import {SpaceContext} from './Space';
import {ItemProps} from './iSpace'
// const propTypes = {
//     direction: PropTypes.string,
//     index: PropTypes.number,
//     marginDirection: PropTypes.string,
//     split: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//     wrap: PropTypes.bool
// };


function Item({className, direction, index, marginDirection, children, split, wrap}: ItemProps) {
    const {horizontalSize, verticalSize, latestIndex} = React.useContext(SpaceContext);

    let style = {};

    if (direction === 'vertical') {
        if (index < latestIndex) {
            style = {marginBottom: horizontalSize / (split ? 2 : 1)};
        }
    } else {
        style = {
            ...(index < latestIndex && {[marginDirection]: horizontalSize / (split ? 2 : 1)}),
            ...(wrap && {paddingBottom: verticalSize}),
        };
    }

    if (children === null || children === undefined) {
        return null;
    }

    return (
        <>
            <div className={className} style={style}>
                {children}
            </div>
            {index < latestIndex && split && (
                <span className={`${className}-split`} style={style}>
                    {split}
                </span>
            )}
        </>
    );
}

// Item.propTypes = propTypes;
export default Item
