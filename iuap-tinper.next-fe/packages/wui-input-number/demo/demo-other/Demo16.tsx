/**
 *
 * @title readOnly 属性
 * @description 输入框只读
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo16 extends Component {
    render() {
        return (
            <div>
                <InputNumber
                    readOnly
                />
            </div>
        )
    }
}

export default Demo16;
