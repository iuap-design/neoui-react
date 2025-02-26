// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {prefix} from "../../wui-core/src/index"
import { SearchTabsProps, SearchTabsState } from './iTabs'

// const propTypes = {
//     clsfix: PropTypes.string,
//     onChange: PropTypes.func,
//     value: PropTypes.string
// };
const defaultProps = {
    clsfix: `${prefix}-search-tabs`,
    onChange: () => {
    },
};

class SearchTabs extends Component<SearchTabsProps, SearchTabsState> {

	static defaultProps = defaultProps
	static Item: any
	constructor(props: SearchTabsProps) {
	    super(props);
	    this.state = {
	        activeValue: props.value
	    }
	}

	// eslint-disable-next-line
    UNSAFE_componentWillReceiveProps(nextProps: SearchTabsProps) {
	    if ('value' in nextProps && nextProps.value != this.state.activeValue) {
	        this.setState({
	            activeValue: nextProps.value
	        })
	    }
	}

	getChildren = () => {
	    let {children, clsfix} = this.props;
	    let childs = [];
	    if ((children as any[])?.length >= 1) {
	        React.Children.map(children, (child: React.ReactElement, index) => {
	            childs.push(
	                React.cloneElement(child, {
	                    tabClick: this.childClick,
	                    active: child!.props.value == this.state.activeValue,
	                    clsfix: clsfix
	                })
	            )
	            if (index < (children as any[]).length - 1) {
	                childs.push(
	                    <span className={`${clsfix}-split`} key={`split-${index}`}>|</span>
	                )
	            }
	        })
	    } else {
	        if (children && !Array.isArray(children)) { // 如果是空数组不加载children
	            childs.push(
	                React.cloneElement(children as React.ReactElement, {
	                    tabClick: this.childClick,
	                    active: (children as React.ReactElement)?.props?.value == this.state.activeValue,
	                    clsfix: clsfix
	                })
	            )
	        }
	    }
	    return childs;
	}
	childClick = (activeValue: string) => {
	    this.setState({
	        activeValue
	    })
	    this.props.onChange!(activeValue)
	}

	render() {

	    let {clsfix, onChange, ...others} = this.props;

	    return (
	        <div className={`${clsfix}`} {...others}>
	            {
	                this.getChildren()
	            }
	        </div>
	    )
	}
}
// SearchTabs.propTypes = propTypes;
// SearchTabs.defaultProps = defaultProps;
export default SearchTabs;
