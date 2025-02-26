// import PropTypes from 'prop-types';
import React from 'react';
import {Warning} from "../../wui-core/src/index";
import Dropdown from './Dropdown';
import DropdownButton from "./DropdownButton";
import { DropdownIndexProps } from './iDropdown';

// export const propTypes = {
//     ...Dropdown.propTypes,
//     delayShow: PropTypes.number,
//     mouseEnterDelay: PropTypes.number,
//     delayHide: PropTypes.number,
//     mouseLeaveDelay: PropTypes.number
// }
const {isShouldUpdate} = Warning;

class DropdownWrapper extends React.Component<DropdownIndexProps> {
    static Button: typeof DropdownButton;
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const {
            delayShow,
            mouseEnterDelay,
            delayHide,
            mouseLeaveDelay,
            ...others
        } = this.props;
        isShouldUpdate("Dropdown", this.props);
        const extral = {
            delayShow: mouseEnterDelay ?? delayShow,
            delayHide: mouseLeaveDelay ?? delayHide,
        }
        return (
            <Dropdown {...extral} {...others} />
        )
    }
}

DropdownWrapper.Button = DropdownButton;
// DropdownWrapper.propTypes = propTypes;
export default DropdownWrapper;
