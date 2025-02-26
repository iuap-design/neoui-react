/* eslint-disable react/prop-types */
import classNames from 'classnames';
// import omit from "omit.js"
// import PropTypes from 'prop-types';
import toArray from 'rc-util/lib/Children/toArray';
import React, { ReactNode } from 'react';
import {prefix, getNid} from "../../wui-core/src/index";
import Item from './Item';
import RTLContext from '../../wui-provider/src/RTLContext';

import {SpaceProps, SpaceSize} from './iSpace'


/* const propTypes = {
    size: PropTypes.string,
    align: PropTypes.string,
    direction: PropTypes.string,
    split: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    wrap: PropTypes.bool,
    style: PropTypes.object
};*/

export const SpaceContext = React.createContext({
    latestIndex: 0,
    horizontalSize: 0,
    verticalSize: 0,
});
const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefix}-${suffixCls}` : `${prefix}`;
};

const ConfigContext = React.createContext({
    // We provide a default function for Context without provider
    getPrefixCls: defaultGetPrefixCls,
    space: {
        size: undefined
    },
    direction: undefined
});
const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
};

function getNumberSize(size: SpaceSize) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = props => {
    const {getPrefixCls, space, } = React.useContext(ConfigContext);
    const directionConfig = React.useContext(RTLContext);

    const {
        size = space?.size || 'small',
        align,
        className,
        children,
        direction = 'horizontal',
        prefixCls: customizePrefixCls,
        split,
        style,
        wrap = false,
        ...otherProps
    } = props;

    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
            (Array.isArray(size) ? size : [size, size]).map(item =>
                getNumberSize(item),
            ),
        [size],
    );

    const childNodes = toArray(children, {keepEmpty: true});

    if (childNodes.length === 0) {
	    if (props.uirunmode === "design") {
            let adapterNid = getNid(props);
	        return <div {...adapterNid} ></div>
	    }
        return null;
    }

    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
    const prefixCls = getPrefixCls('space', customizePrefixCls);
    const cn = classNames(
        prefixCls,
        `${prefixCls}-${direction}`,
        {
            [`${prefixCls}-rtl`]: directionConfig === 'rtl',
            [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
        },
        className,
    );

    const itemClassName = `${prefixCls}-item`;

    const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

    // Calculate latest one
    let latestIndex = 0;
    const nodes = childNodes.map((child: ReactNode, i: number) => {
        if (child !== null && child !== undefined) {
            latestIndex = i;
        }

        /* eslint-disable react/no-array-index-key */
        return (
            <Item
                className={itemClassName}
                key={`${itemClassName}-${i}`}
                direction={direction}
                index={i}
                marginDirection={marginDirection}
                split={split}
                wrap={wrap}
            >
                {child}
            </Item>
        );
        /* eslint-enable */
    });
    let adapterNid = getNid(props)

    return (
        <div
            className={cn}
            style={{
                ...(wrap && {flexWrap: 'wrap', marginBottom: -verticalSize}),
                ...style,
            }}
            {...otherProps}
            {...adapterNid}
            // {...omit(otherProps, [""])}
        >
            <SpaceContext.Provider value={{horizontalSize, verticalSize, latestIndex}}>
                {nodes}
            </SpaceContext.Provider>
        </div>
    );
};

// Space.propTypes = propTypes;
export default Space;
