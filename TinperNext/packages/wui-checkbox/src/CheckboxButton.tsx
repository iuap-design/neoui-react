// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI} from "../../wui-core/src/index"
import Checkbox from './Checkbox';
import { CheckboxProps, CheckboxState } from './iCheckbox';

// const propTypes = {
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//     style: PropTypes.object
// }

@WebUI({name: "checkbox-button"})
class RadioButton extends Component<CheckboxProps, CheckboxState> {
	static defaultProps: any;
	render() {
	    return (
	        <Checkbox {...this.props} />
	    );
	}
}

// RadioButton.propTypes = propTypes;
export default RadioButton;
