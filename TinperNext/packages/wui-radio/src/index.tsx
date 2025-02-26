import React from 'react';
import {Warning} from "../../wui-core/src";
import Radio from './Radio';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import { RadioGroupProps, RadioGroupState } from "./iRadio";


const {isShouldUpdate} = Warning;

// Radio.RadioGroup = RadioGroup;//使用Radio.Group代替
// Radio.RadioButton = RadioButton;//使用Radio.Button代替


class RadioGroupWrapper extends React.Component<Partial<RadioGroupProps>, RadioGroupState> {
    render() {
        const {value, selectedValue, ...others} = this.props;
        isShouldUpdate("RadioGroup", this.props);
        const extral = {
            // selectedValue: isUndefined(value) ? selectedValue : value,
            selectedValue: value === undefined ? selectedValue : value,
        }
        return <RadioGroup {...extral} {...others} />
    }
}

type RadioType = typeof Radio;

interface RadioInterface extends RadioType {
    Group: typeof RadioGroupWrapper;
    Button: typeof RadioButton;
}

const RadioWrapper = Radio as RadioInterface
RadioWrapper.Group = RadioGroupWrapper
RadioWrapper.Button = RadioButton

export default RadioWrapper;
