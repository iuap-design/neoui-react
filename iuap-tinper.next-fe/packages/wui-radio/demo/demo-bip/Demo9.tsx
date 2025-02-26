/**
 * @title Radio.Group options 基本使用
 * @description 通过配置 options 参数来渲染单选框。也可通过 optionType 参数来设置 Radio 类型。
 */

import { Radio, RadioGroupProps } from '@tinper/next-ui'
import React, { useState } from 'react'

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
];

const Demo9: React.FC = () => {
    const [value1, setValue1] = useState<RadioGroupProps["value"]>('Apple');
    const [value2, setValue2] = useState<RadioGroupProps["value"]>('Apple');
    const [value3, setValue3] = useState<RadioGroupProps["value"]>('Apple');
    const [value4, setValue4] = useState<RadioGroupProps["value"]>('Apple');

    const onChange1: RadioGroupProps["onChange"] = (value) => {
        console.log('radio1 checked', value);
        setValue1(value as RadioGroupProps["value"]);
    };

    const onChange2: RadioGroupProps["onChange"] = (value) => {
        console.log('radio2 checked', value);
        setValue2(value as RadioGroupProps["value"]);
    };

    const onChange3: RadioGroupProps["onChange"] = (value) => {
        console.log('radio3 checked', value);
        setValue3(value as RadioGroupProps["value"]);
    };

    const onChange4: RadioGroupProps["onChange"] = (value) => {
        console.log('radio4 checked', value);
        setValue4(value as RadioGroupProps["value"]);
    };

    return (
        <>
            <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
            <br />
            <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
            <br />
            <br />
            <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
            <br />
            <br />
            <Radio.Group
                options={optionsWithDisabled}
                onChange={onChange4}
                value={value4}
                optionType="button"
                // buttonStyle="solid"
            />
        </>
    );
};

export default Demo9;
