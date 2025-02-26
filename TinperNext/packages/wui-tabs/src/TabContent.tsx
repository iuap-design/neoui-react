/**
 * This source code is quoted from rc-tabs.
 * homepage: https://github.com/react-component/tabs
 */
import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React from 'react';
import {prefix} from "../../wui-core/src/index";
// import {getActiveIndex, getMarginStyle, getTransformByIndex, getTransformPropValue} from './utils';
import { TabContentProps } from './iTabs'
import TabPanel from './TabPane'

// const propTypes = {
//     animated: PropTypes.bool,
//     animatedWithMargin: PropTypes.bool,
//     clsPrefix: PropTypes.string,
//     children: PropTypes.any,
//     activeKey: PropTypes.string,
//     style: PropTypes.any,
//     tabBarPosition: PropTypes.string,
//     destroyInactiveTabPane: PropTypes.any,
//     tabContentClassName: PropTypes.any
// };
const defaultProps = {
    animated: true,
    animatedWithMargin: undefined,
    clsPrefix: `${prefix}-tabs`,
    children: null,
    activeKey: '',
    style: {},
    tabBarPosition: ''
}

class TabContent extends React.Component<TabContentProps> {
	static defaultProps = {...defaultProps}
	// getDefaultProps() {
	//   return {
	//     animated: true,
	//   };
	// }
	handleitems = () => {
	    let { activeKey, children, items } = this.props
	    let newChildren: any[] = [];
	    if (items && items?.length > 0) {
	        items?.map(item => {
	            const key = item.key;
	            const active = activeKey === key;
	            newChildren.push(React.cloneElement(<TabPanel style={item?.style} key={item.key} placeholder={item?.placeholder} forceRender={item?.forceRender}>{item.children}</TabPanel>, {
	                active,
	                destroyInactiveTabPane: this.props.destroyInactiveTabPane,
	                rootclsPrefix: this.props.clsPrefix,
	            }));
	        })
	    } else {
	        React.Children.forEach(children, (child: any) => {
	            if (!child) {
	                return;
	            }
	            const key = child.key;
	            const active = activeKey === key;
	            newChildren.push(React.cloneElement(child, {
	                active,
	                destroyInactiveTabPane: this.props.destroyInactiveTabPane,
	                rootclsPrefix: this.props.clsPrefix,
	                fieldid: undefined,
	                id: undefined
	            }));
	        });
	    }
	    return newChildren;
	}
	// getTabPanes = () => {
	//     const props = this.props;
	//     const activeKey = props.activeKey;
	//     const children = props.children;
	//     const newChildren: any[] = [];

	//     React.Children.forEach(children, (child: any) => {
	//         if (!child) {
	//             return;
	//         }
	//         const key = child.key;
	//         const active = activeKey === key;
	//         newChildren.push(React.cloneElement(child, {
	//             active,
	//             destroyInactiveTabPane: props.destroyInactiveTabPane,
	//             rootclsPrefix: props.clsPrefix,
	//         }));
	//     });

	//     return newChildren;
	// }

	render() {
	    const {props} = this;
	    const {
	        clsPrefix, animated, tabContentClassName
	    } = props;
	    let {style} = props;
	    const classes = classnames({
	        [`${clsPrefix}-content`]: true,
	        [animated ?
	            `${clsPrefix}-content-animated` :
	            `${clsPrefix}-content-no-animated`]: true,
	        [`${tabContentClassName}`]: tabContentClassName
	    });
	    // if (animated) {
	    //     const activeIndex = getActiveIndex(children, activeKey);
	    //     if (activeIndex !== -1) {
	    //         const animatedStyle = animatedWithMargin ?
	    //             getMarginStyle(activeIndex, tabBarPosition) :
	    //             getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition));
	    //         style = {
	    //             ...style,
	    //             ...animatedStyle,
	    //         };
	    //     } else {
	    //         style = {
	    //             ...style,
	    //             display: 'none',
	    //         };
	    //     }
	    // }
	    return (
	        <div
	            className={classes}
	            style={style}
	        >
	            {this.handleitems()}
	        </div>
	    );
	}
}

// TabContent.propTypes = propTypes
// TabContent.defaultProps = defaultProps
export default TabContent;
