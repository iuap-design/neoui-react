/**
 *
 * @title 文字类tooltips
 * @description 给评分组件加上文案展示。
 *
 */

import {Rate} from "@tinper/next-ui";
import React, { useState } from 'react';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const App: React.FC = () => {
    const [value, setValue] = useState(3);

    return (
        <span>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{desc[value - 1]}</span> : ''}
        </span>
    );
};

export default App;
