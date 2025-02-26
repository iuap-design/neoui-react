/**
 *
 * @title delay 属性
 * @description 当持续按住增减按钮式，变换的速度（毫秒）  demo中按住持续2秒增加1
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo17 extends Component {
    render() {
        return (
            <div>
                <InputNumber
                    min={-9999}
                    max={99999}
                    delay={2000}
                />
            </div>
        )
    }
}

export default Demo17;
