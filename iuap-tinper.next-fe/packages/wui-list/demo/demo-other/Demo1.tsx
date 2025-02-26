/**
 *
 * @title 简单列表
 * @description 列表拥有大、中、小三种尺寸。默认为中
 *
 */

import {Divider, List} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo extends Component {

    render() {
        const data = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ];
        return (
            <>
                <Divider orientation="left">Default Size</Divider>
                <List
                    fieldid="list"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
                <Divider orientation="left">Small Size</Divider>
                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <Divider orientation="left">Large Size</Divider>
                <List
                    size="large"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
                <Divider orientation="left">Default Size 没有分割线</Divider>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    split={false}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </>
        )
    }
}

export default Demo;
