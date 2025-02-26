/**
 *
 * @title 输入时校验提示
 * @description 设置 displayCheckPrompt={true}，显示超出限制范围之后的提示。
 * @type bip
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo10 extends Component {
    render() {
        return (
            <InputNumber
                iconStyle="one"
                min={-100}
                max={100}
                value={50}
                displayCheckPrompt={true}
            />
        )
    }
}

export default Demo10;
