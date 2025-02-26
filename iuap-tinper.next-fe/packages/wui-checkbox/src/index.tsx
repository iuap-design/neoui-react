import React from 'react';
import {Warning} from "../../wui-core/src";
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import CheckboxButton from './CheckboxButton';
import { CheckboxGroupProps, CheckboxGroupState } from "./iCheckbox";

const {isShouldUpdate} = Warning;

class CheckboxGroupWrapper extends React.Component<Partial<CheckboxGroupProps>, CheckboxGroupState> {
    render() {
        // const {value, selectedValue, ...others} = this.props;
        isShouldUpdate("CheckboxGroup", this.props);
        // const extral = {
        //     // selectedValue: isUndefined(value) ? selectedValue : value,
        //     selectedValue: value === undefined ? selectedValue : value,
        // }
        return <CheckboxGroup {...this.props} />
    }
}


type CheckboxType = typeof Checkbox;
interface CheckboxInterface extends CheckboxType {
    Group: typeof CheckboxGroupWrapper;
    Button: typeof CheckboxButton;
}

const CheckboxWrapper = Checkbox as CheckboxInterface;
CheckboxWrapper.Group = CheckboxGroupWrapper;
CheckboxWrapper.Button = CheckboxButton;

export default CheckboxWrapper;
