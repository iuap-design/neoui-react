import classNames from 'classnames';
import omit from 'omit.js';
import React from 'react'
import Button from '../../wui-button/src';
import {WebUI, getNid} from "../../wui-core/src/index"
import {ButtonGroupProps, ButtonGroupState} from "./iButtonGroup"

/* const propTypes = {
    /!**
	 * 是否垂直排列
	 *!/
    vertical: PropTypes.bool,
    /!**
	 * 是否对齐
	 *!/
    justified: PropTypes.bool,

    /!**
	 * 垂直时是否为块状元素
	 *!/
    block: PropTypes.bool,
    /!**
	 * 传入数组替代button
	 *!/
    list: PropTypes.array,
    separated: PropTypes.bool,
    clsPrefix: PropTypes.string
};*/

const defaultProps = {
    block: false,
    justified: false,
    vertical: false,
    list: [],
    clsPrefix: "u-button-group"
};

@WebUI({name: "button-group", defaultProps})
class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {
    constructor(props: ButtonGroupProps, context?: any) {
        super(props, context);
        this.state = {
            activeKey: ''
        }
    }

	handleItemClick = (key?: string, onClick?: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
	    this.setState({
	        activeKey: key
	    })
	    onClick && onClick(e);
	}

	render() {
	    const {block, justified, clsPrefix, separated, vertical, className, list, ...others} = this.props;
	    const tbClass = {
	        [`${clsPrefix}`]: !vertical,
	        [`${clsPrefix}-block`]: vertical ? block : false,
	        [`${clsPrefix}-vertical`]: vertical,
	        [`${clsPrefix}-justified`]: justified,
	        [`${clsPrefix}-separated`]: separated
	    };
	    if (list!.length === 0) {
	        return (
	            <div
	                {...others}
	                className={classNames(tbClass, className)}
	            >
	                {this.props.children}
	            </div>
	        );
	    }
	    let adapterNid = getNid(this.props)

	    return (
	        <div
	            {...others}
	            className={classNames(tbClass, className)}
	            {...adapterNid}
	        >
	            {
	                list!.map((item, i) => {
	                    let {title, onClick, className, ...otherProps} = item;
	                    return (
	                        <Button
	                            key={item.key || i}
	                            className={classNames(className, {'active': this.state.activeKey === item.key})}
	                            onClick={this.handleItemClick(item.key, onClick)}
	                            {...omit(otherProps, ["isText"])}>
	                            {title}
	                        </Button>
	                    )
	                })
	            }
	        </div>
	    )

	}
}

// ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
