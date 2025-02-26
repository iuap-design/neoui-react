/**
 *
 * @title 隐藏加减按钮
 * @description 通过设置hideActionButton来隐藏加减按钮
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo13 extends Component {
    render() {
        return (
            <div>
                <InputNumber
                    iconStyle="one"
                    controls
                    min={-999999}
                    max={999999}
                />

            </div>
        )
    }
}

export default Demo13;
