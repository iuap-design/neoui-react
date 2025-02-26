import classnames from 'classnames';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI, getNid} from "../../wui-core/src";
import { IconProps } from './iIcon';
import { WithConfigConsumer } from '../../wui-provider/src/context';

// const propTypes = {
//     type: PropTypes.string,
//     fontName: PropTypes.string,
//     rotate: PropTypes.number,
//     style: PropTypes.object,
//     className: PropTypes.string,
// };
/**
 *  badge 默认显示内容1
 */
const defaultProps = {
    fontName: 'uf',
    type: '',
    className: '',
    style: {}
};


@WithConfigConsumer()
@WebUI({name: "icon", defaultProps})

class Icon extends Component<IconProps> {
    // constructor(props) {
    //     super(props);
    // }

	getStyle = () => {
	    const {style, rotate} = this.props;
	    if (!!rotate && typeof rotate === 'number') return {

	        transform: `rotate(${rotate}deg)`,
	        display: 'inline-block', ...style
	    };

	    return style;
	}

	render() {
	    let {clsPrefix, fontName, type, className, dir, ...others} = this.props;

	    let classNames = classnames(clsPrefix, fontName, type, className, `${clsPrefix}-${dir}`);

	    const Style = this.getStyle();
	    let adapterNid = getNid(this.props)

	    return (
	        <i {...others} className={classNames} style={Style} {...adapterNid}></i>
	    )
	}
}

// Icon.propTypes = propTypes;

export default Icon;
