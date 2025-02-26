/**
 *
 * @title 响应式的栅格列表
 * @description 响应式的栅格列表。尺寸与 Layout Grid 保持一致。
 *
 */

import {Card, Divider, List} from '@tinper/next-ui';
import React, {Component} from 'react';

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
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
];

class Demo extends Component {

    render() {
        return (
            <>
                <Divider orientation="left">响应式</Divider>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 6,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>Card content</Card>
                        </List.Item>
                    )}
                    rowKey={item => item.title}
                />
                <Divider orientation="left">非响应式</Divider>
                <List
                    grid={{
                        gutter: 16,
                        column: 6
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>Card content</Card>
                        </List.Item>
                    )}
                />
            </>
        )
    }
}

export default Demo;
