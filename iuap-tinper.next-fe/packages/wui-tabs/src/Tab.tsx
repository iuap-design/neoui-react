// import PropTypes from 'prop-types';
import React from 'react';
import {getNid} from "../../wui-core/src/index"
import { TabProps } from './iTabs'

// const propTypes = {
//     active: PropTypes.bool, // 是否active
//     value: PropTypes.string, // 唯一标示
//     clsfix: PropTypes.string,
//     tabClick: PropTypes.func,
//     onClick: PropTypes.func,
// }

const defaultProps = {
    active: false
}

class Tab extends React.Component<TabProps> {

	static defaultProps = defaultProps
	click = () => {
	    this.props.tabClick!(this.props.value as string);
	    this.props.onClick && this.props.onClick(this.props.value as string);
	}

	render() {
	    let {clsfix, children, active} = this.props;
	    let classes = `${clsfix}-item`;
	    if (active) classes += ' active'
	    let adapterNid = getNid(this.props) // 适配nid、uitype
	    return (
	        <span className={classes} onClick={this.click} {...adapterNid}>
	            {children}
	        </span>
	    )
	}
}


// Tab.propTypes = propTypes;
// Tab.defaultProps = defaultProps;

export default Tab;
