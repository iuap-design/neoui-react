/**
 *
 * @title 自定义卡片样式(头部，body)
 * @description 自定义卡片的头部和内容样式
 *
 */

import {Card} from "@tinper/next-ui";
import React, {Component} from 'react';


class Demo extends Component {

    render() {
        return (
            <Card
                title="card title"
                bodyStyle={{padding: '14px'}}
                headStyle={{background: '#eee'}}
            >
                <p>This is the description</p>
                <p>This is the description</p>
                <p>This is the description</p>
            </Card>
        )
    }
}


export default Demo;
