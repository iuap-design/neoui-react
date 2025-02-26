/**
 *
 * @title 基础列表
 * @description 结合使用Item.Meta对文章内容进行描述
 *
 */

import {Avatar, List} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo extends Component {

    render() {
        const data = [
            {
                title: 'Title 1',
            },
            {
                title: 'Title 2',
            },
            {
                title: 'Title 3',
            },
            {
                title: 'Title 4',
            },
        ];
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                pagination
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar
                                src="https://img1.baidu.com/it/u=1851283359,3457678391&fm=26&fmt=auto&gp=0.jpg"/>}
                            title={<a href="https://yondesign.yonyou.com/">{item.title}</a>}
                            description="A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size."
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default Demo;
