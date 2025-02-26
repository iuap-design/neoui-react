/**
 * @title Radio.Group size的 使用
 * @description 支持 'lg' | 'sm' | 'md'。
 */

import { Radio, RadioGroupProps } from '@tinper/next-ui'
import React, { useState } from 'react'

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }]

const Demo10: React.FC = () => {
    const [value1, setValue1] = useState<RadioGroupProps["value"]>('Apple');
    const [value3, setValue3] = useState<RadioGroupProps["value"]>('Apple');

    const onChange1: RadioGroupProps["onChange"] = (value) => {
        console.log('radio1 checked', value);
        setValue1(value as RadioGroupProps["value"]);
    };

    const onChange3: RadioGroupProps["onChange"] = (value) => {
        console.log('radio3 checked', value);
        setValue3(value as RadioGroupProps["value"]);
    };
    return (
        <>
            <Radio.Group options={plainOptions} optionType="button" size='sm' onChange={onChange1} value={value1} />
            <br />
            <br />
            <Radio.Group options={options} onChange={onChange3} size='md' value={value3} optionType="button" />
            <br />
            <br />
            <Radio.Group options={options} onChange={onChange3} size='lg' value={value3} optionType="button" />
        </>
    );
};

export default Demo10;
