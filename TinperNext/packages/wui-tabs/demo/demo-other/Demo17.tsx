/**
 *  @title 页签头部效果
 *  @description 页签头部不同长度，下面红线效果。
 *
 */

import {Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;

class Demo17 extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="0">
                <TabPane tab='0' key="0">Content of Tab Pane 0</TabPane>
                <TabPane tab='Tab 1111111' key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab='Tab 22222222222222' key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab='Tab 333333333333333333333333333' key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}

export default Demo17;
