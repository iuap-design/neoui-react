/**
 *
 * @title  自定义颜色
 * @description 可以通过color属性控制标签的颜色
 * @type bip
 */

import {Tag} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Tag color="rgba(39,211,129,0.75)">green</Tag>
                <Tag color="#2db7f5">#2db7f5</Tag>
            </div>
        )
    }
}

export default Demo6;
