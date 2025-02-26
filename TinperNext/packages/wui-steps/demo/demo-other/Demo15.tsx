/**
 *
 * @title items
 * @description 配置选项卡内容
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
class Demo15 extends Component {
    render() {
        return (
            <Steps current={2} fieldid={'field'} id={'steps'} items={items} />
        )
    }
}

export default Demo15;
