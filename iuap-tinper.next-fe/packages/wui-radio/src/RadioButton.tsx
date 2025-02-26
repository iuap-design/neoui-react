// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {WebUI} from "../../wui-core/src/index"
import Radio from './Radio';
import { RadioProps, RadioState } from './iRadio';

// const propTypes = {
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]),
//     style: PropTypes.object
// }

@WebUI({name: "radio-button"})
class RadioButton extends Component<RadioProps, RadioState> {
    render() {
        return (
            <Radio {...this.props} />
        );
    }
}

// RadioButton.propTypes = propTypes;
export default RadioButton;
