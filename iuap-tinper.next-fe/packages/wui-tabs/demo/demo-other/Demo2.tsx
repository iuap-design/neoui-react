/**
 *  @title 禁用
 *  @description 禁用某一项。
 *
 */

import {Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;

class Demo2 extends Component {
    render() {
        return (
            <Tabs tabBarStyle="trangle" defaultActiveKey="1">
                <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab='Tab 2' disabled key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}

export default Demo2;
