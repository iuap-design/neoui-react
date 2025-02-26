/**
 *  @title 图标
 *  @description 有图标的标签。
 * @type other
 * demo3
 */

import {Icon, Tabs} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TabPane} = Tabs;

class Demo3 extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="uf-home"></Icon>主页</span>} key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab={<span><Icon type="uf-settings"></Icon>设置</span>} key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab={<span><Icon type="uf-folder-o"></Icon>文件</span>} key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}

export default Demo3;
