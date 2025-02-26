import * as React from 'react';
import {InputNumberProps} from './iInputNumber'

type OmitProps = 'value' | 'placeholder' | 'onChange' | 'onBlur' | 'onFocus';
type ValueArrayType = [InputNumberProps['value'], InputNumberProps['value']];

export interface InputNumberGroupProps extends Omit<InputNumberProps, OmitProps> {
    value?: ValueArrayType;
    placeholder?: [string, string];
    split?: React.ReactNode;
    onChange?: (value: ValueArrayType) => any;
    onBlur?: (value: ValueArrayType) => any;
    onFocus?: (value: ValueArrayType) => any;
}

export interface InputNumberGroupState {
    value: ValueArrayType;
}
