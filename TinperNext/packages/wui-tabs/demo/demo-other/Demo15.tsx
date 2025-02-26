/**
 *  @title 标签居中展示
 *  @description centered设置标签居中展示。
 *
 */

import {Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';

 // const {TabPane} = Tabs;
 interface TabsState18 {
     items: any;
     activeKey: string;
 }

class Demo19 extends Component<{}, TabsState18> {
    constructor(props: {}) {
        super(props)
        this.state = {
            items: [
                {
                    key: '1',
                    tab: `Tab 1`,
                    children: `Content of Tab Pane 1`,
                },
                {
                    key: '2',
                    tab: `Tab 2`,
                    children: `Content of Tab Pane 2`,
                    placeholder: <div>懒加载内容</div>
                },
                {
                    key: '3',
                    tab: `Tab 3`,
                    children: `Content of Tab Pane 3`,
                    forceRender: true
                },
                {
                    key: '4',
                    tab: `Tab 4`,
                    children: `Content of Tab Pane 4`,
                },
                {
                    key: '5',
                    tab: `Tab 5`,
                    children: `Content of Tab Pane 5`,
                },
                {
                    key: '6',
                    tab: `Tab 6`,
                    children: `Content of Tab Pane 6`,
                },
                {
                    key: '7',
                    tab: `Tab 7`,
                    children: `Content of Tab Pane 7`,
                },
                {
                    key: '8',
                    tab: `Tab 8`,
                    children: `Content of Tab Pane 8`,
                }
            ],
            activeKey: '1'
        }
    }
    render() {
        return (
            <Tabs
                // tabBarStyle="trangle"
                // defaultActiveKey="1"
                items={this.state.items}
                centered={true}
            >
                {/* <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                 <TabPane tab='Tab 2' disabled key="2">Content of Tab Pane 2</TabPane>
                 <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane> */}
            </Tabs>
        )
    }
}

export default Demo19;