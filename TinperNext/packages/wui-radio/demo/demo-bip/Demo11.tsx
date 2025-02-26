/**
 * @title Radio.Group maxCount spaceSize的使用
 * @description 当maxCount 为true时 需要外层dom 设置一个宽度
 */

import { Radio, RadioGroupProps, RadioProps } from '@tinper/next-ui'
import { clone } from 'lodash';
import React, { ReactElement, ReactNode, cloneElement, useState } from 'react'

const opts = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Pear1', value: 'Pear1' },
    { label: 'Pear2', value: 'Pear2' },
    { label: 'Pear3', value: 'Pear3' },
    { label: 'Orange', value: 'Orange' },
];
const btns = [
    <Radio.Button key="1" color="primary" value="1">苹果</Radio.Button>,
    <Radio.Button key="2" color="success" value="2">香蕉</Radio.Button>,
    <Radio.Button key="3" color="info" value="3">葡萄</Radio.Button>,
    <Radio.Button key="4" color="warning" value="4">菠萝</Radio.Button>,
    <Radio.Button key="5" color="danger" value="5">梨</Radio.Button>,
    <Radio.Button key="6" color="dark" value="6">石榴</Radio.Button>,
]
const Demo9: React.FC = () => {
    const [value3, setValue3] = useState<RadioGroupProps["value"]>('Apple');
    const [options, setOptions] = useState<(RadioProps & { label: ReactNode })[]>(opts);
    const [selectedValue, setSelectedValue] = useState<RadioGroupProps["value"]>('danger');
    const [buttons, setbuttons] = useState<ReactElement[]>(btns);

    const onChange3: RadioGroupProps["onChange"] = (value, _event, option) => {
        if (option?.maxCount) {
            const selectOption = options!.find(option => option.value === value)
            const selectOptionIndex = options!.findIndex(option => option.value === value)

            options[selectOptionIndex] = clone(options[option.maxCount - 1]);
            options[option.maxCount! - 1] = selectOption!;
            setOptions(options)
        }
        console.log('radio3 checked', value);
        setValue3(value as RadioGroupProps["value"]);
    };


    const handleChange: RadioGroupProps['onChange'] = (value, _e, option) => {
        if (option?.maxCount) {
            const selectOption = buttons!.find(option => option.props.value === value)
            const selectOptionIndex = buttons!.findIndex(option => option.props.value === value)

            buttons[selectOptionIndex] = cloneElement(buttons[option.maxCount - 1]);
            buttons[option.maxCount! - 1] = selectOption!;
            setbuttons(buttons)
        }
        setSelectedValue(value as Required<RadioGroupProps>['value']);
    }
    return (
        <>
            <div style={{width: '200px'}}>
                <Radio.Group maxCount={true} options={options} onChange={onChange3} value={value3} optionType="button" />
            </div>
            <br/>
            <br/>
            <div style={{width: '200px'}}>
                <Radio.Group
                    name="color"
                    value={selectedValue}
                    spaceSize='md'
                    maxCount={true}
                    onChange={handleChange}>
                    {buttons}
                </Radio.Group>
            </div>

        </>
    );
};

export default Demo9;
