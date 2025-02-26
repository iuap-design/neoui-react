/**
 *
 * @title minusRight 属性
 * @description 负号在右边
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo15 extends Component {
    render() {
        return (
            <div>
                <InputNumber
                    minusRight
                    value={-300}
                />
            </div>
        )
    }
}

export default Demo15;
