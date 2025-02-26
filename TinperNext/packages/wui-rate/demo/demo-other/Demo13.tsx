/**
 *
 * @title 数值类tooltips
 * @description 给评分组件加上数值提示, 非整数数值格式可以自动跟随工作台格式或者自定义。
 *
 */

import {Rate} from "@tinper/next-ui";
import React, { useState } from 'react';


const App: React.FC = () => {
    const [value, setValue] = useState(3);
    const [desc, setDesc] = useState(['1', '2', '3', '4', '5']);
    const handleChange = (val: number, dispalyValue: string) => {
        console.log(val, dispalyValue);
        setValue(val);
    }

    const handleHoverChange = (val: number, dispalyValue: string) => {
        const descIndex = Math.ceil(val) - 1;
        const newDes = [...desc];
        newDes.splice(descIndex, 1, dispalyValue)
        setDesc(newDes);
    }

    return (
        <span>
            <Rate allowHalf tooltips={desc} onChange={handleChange} onHoverChange={handleHoverChange} value={value} decimalSeparator="/" />
            {value ? <span>{desc[Math.ceil(value) - 1]}</span> : ''}
        </span>
    );
};

export default App;
