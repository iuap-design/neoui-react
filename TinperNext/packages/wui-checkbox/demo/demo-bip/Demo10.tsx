/**
 * @title Checkbox.Group button size
 * @description 支持 sm ml lg 三种尺寸
 */


import {Checkbox, CheckboxGroupProps} from "@tinper/next-ui";
import React, { useState} from 'react';

const optSize = (size: string) => ([
    { label: `${size}苹果`, value: `${size}苹果`, disabled: true },
    { label: `${size}香蕉`, value: `${size}香蕉` },
    { label: `${size}柑橘`, value: `${size}柑橘` },
]);

const Demo10: React.FC = () => {
    const [value3, setValue3] = useState<CheckboxGroupProps["value"]>(['Apple']);

    const onChange3: CheckboxGroupProps["onChange"] = (value) => {
        console.log('onChange3', value);
        setValue3(value);
    };

    return (
        <div>
            <Checkbox.Group options={optSize('小')} onChange={onChange3} value={value3} maxCount={true} size={'sm'}/>
            <br/>
            <Checkbox.Group options={optSize('中')} onChange={onChange3} value={value3} maxCount={true} size={'ml'}/>
            <br/>
            <Checkbox.Group options={optSize('大')} onChange={onChange3} value={value3} maxCount={true} size={'lg'}/>
            <br/>
        </div>
    );
};

export default Demo10;

