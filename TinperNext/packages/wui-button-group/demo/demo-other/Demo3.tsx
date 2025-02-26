/**
 *
 * @title 传入列表渲染按钮组
 * @description 通过`list`属性传入按钮组信息, 并且按钮具有选中样式,信息为Button组件可接受的props
 *
 */

import {ButtonGroup} from '@tinper/next-ui';
import React, {Component} from 'react';

const LIST = [
    {
        title: '未读信息',
        colors: 'primary',
        key: 'notRead'
    },
    {
        title: '已读信息',
        colors: 'primary',
        key: 'readed'
    },
    {
        title: '已发送信息',
        colors: 'primary',
        key: 'write'
    },
]

class Demo3 extends Component {
    render() {
        return (
            <ButtonGroup list={LIST}/>
        )
    }
}


export default Demo3;
