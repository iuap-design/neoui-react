/**
 *
 * @title 自定义图片
 * @description  自定义图片大小、描述、附属内容。
 *
 */


import {Empty, Button} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo3 extends Component {
    render() {
        return (
            <Empty
                fieldid="demo"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span fieldid="demo_span">
                        Customize <a href="#API">Description</a>
                    </span>
                }
            >
                <Button type="primary">Create Now</Button>
            </Empty>
        )
    }
}

export default Demo3;
