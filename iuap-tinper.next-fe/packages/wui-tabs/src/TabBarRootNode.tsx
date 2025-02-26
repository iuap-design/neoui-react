import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React, {cloneElement} from 'react';
import {getDataAttr} from './utils';
import { TabBarRootNodeProps } from './iTabs'
const defaultProps = {
    clsPrefix: '',
    className: '',
    style: {},
    tabBarPosition: 'top',
    extraContent: null,
    children: null,
    onKeyDown: () => {
    },
    saveRef: () => {
    },
}

export default class TabBarRootNode extends React.Component<TabBarRootNodeProps> {
	static defaultProps = defaultProps
	getExtraContentStyle = () => {
	    const {tabBarPosition, dir: direction} = this.props;
	    const topOrBottom = (tabBarPosition === 'top' || tabBarPosition === 'bottom');
	    if (direction === 'rtl') {
	        return topOrBottom ? {float: 'left'} : {};
	    }
	    return topOrBottom ? {float: 'right'} : {};
	}

	render() {
	    const {
	        clsPrefix, onKeyDown, extraContent, tabBarPosition, children, dir: direction, tabBarClassName, tabBarStyle,
	        ...restProps
	    } = this.props;
	    const cls = classnames(`${clsPrefix}-bar`, {
	        // [className]: !!className,
	        [`${tabBarClassName}`]: tabBarClassName
	    });
	    const topOrBottom = (tabBarPosition === 'top' || tabBarPosition === 'bottom');
	    const extraContentStyle = (extraContent && (extraContent as React.ReactElement).props) ? (extraContent as React.ReactElement).props.style : {};
	    let newChildren = children;
	    if (extraContent) {
	        newChildren = [
	            cloneElement((extraContent as React.ReactElement), {
	                key: 'extra',
	                style: {
	                    ...this.getExtraContentStyle(),
	                    ...extraContentStyle,
	                },
	            }),
	            cloneElement((children as React.ReactElement), {key: 'content'}),
	        ];
	        newChildren = topOrBottom ? newChildren : (newChildren as any[]).reverse();
	    }
	    return (
	        <div
	            role="tablist"
	            className={cls}
	            tabIndex={0}
	            ref={this.props.saveRef?.('root')}
	            onKeyDown={onKeyDown}
	            style={tabBarStyle}
	            {...getDataAttr(restProps)}
	        >
	            {newChildren}
	        </div>
	    );
	}
}

// TabBarRootNode.propTypes = {
//     clsPrefix: PropTypes.string,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     tabBarPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
//     children: PropTypes.node,
//     extraContent: PropTypes.node,
//     onKeyDown: PropTypes.func,
//     saveRef: PropTypes.func,
//     direction: PropTypes.oneOf(['ltr', 'rtl']),
//     tabBarClassName: PropTypes.string
// };

// TabBarRootNode.defaultProps = {
//     clsPrefix: '',
//     className: '',
//     style: {},
//     tabBarPosition: 'top',
//     extraContent: null,
//     children: null,
//     onKeyDown: () => {
//     },
//     saveRef: () => {
//     },
// };
