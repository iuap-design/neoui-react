/**
 * @title Checkbox.Group maxCount的使用
 * @description 当maxCount 为true时 需要外层dom 设置一个宽度
 */


import {Checkbox, CheckboxGroupProps} from "@tinper/next-ui";
import React, { useState} from 'react';

const opts = [
    { label: 'Apple', value: 'Apple', disabled: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Pear1', value: 'Pear1' },
    { label: 'Pear2', value: 'Pear2', disabled: true },
    { label: 'Pear3', value: 'Pear3' },
    { label: 'Orange', value: 'Orange', disabled: true },
];

const Demo10: React.FC = () => {
    const [value3, setValue3] = useState<CheckboxGroupProps["value"]>(['Apple']);

    const onChange3: CheckboxGroupProps["onChange"] = (value) => {
        console.log('onChange3', value);
        setValue3(value);
    };

    return (
        <>
            <div style={{width: '300px'}}>
                <Checkbox.Group options={opts} onChange={onChange3} value={value3} maxCount={true} optionType={'button'}/>
                <br/>
            </div>
        </>
    );
};

export default Demo10;

