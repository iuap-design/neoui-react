/**
 *
 * @title percent
 * @description 带有进度的步骤。
 *
 */

import React, { Component } from 'react';
import { Steps } from "@tinper/next-ui";
const description = "这是一段描述";
const items = [
    {
        title: '已完成',
        description
    },
    {
        title: '已完成',
        subTitle: 'Time 00:00:08',
        description
    },
    {
        title: '进行中',
        description
    },
    {
        title: '未开始'
    }
]
class Demo16 extends Component {
    render() {
        return (
            <div>
                <Steps percent={75} current={2} items={items} /><br /><br />
                <Steps percent={75} current={2} items={items} size="small" />
            </div>
        )
    }
}

export default Demo16;
