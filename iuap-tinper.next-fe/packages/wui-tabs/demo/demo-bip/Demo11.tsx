/**
 *  @title 基础页签
 *  @description bip 使用tabs 标签页的三种类型
 *  @type bip
 */

import {Select, Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Option} = Select
const {TabPane} = Tabs;

interface TabsState11 {
	tabType: string;
	allType: string[];
}

class Demo extends Component<{}, TabsState11> {
    constructor(props: {}) {
        super(props)
        this.state = {
            tabType: 'card',
            allType: ['card', 'line', 'trangle']
        }
    }

	changeTabPosition = (tabType: string) => {
	    this.setState({tabType});
	}

	render() {
	    return (
	        <>
	            <div style={{marginBottom: 16}}>
					Tab Type：
	                <Select
	                    value={this.state.tabType}
	                    onChange={this.changeTabPosition}
	                    style={{width: '100px'}}
	                >
	                    {
	                        this.state.allType.map(item => {
	                            return (
	                                <Option value={item} key={item}>{item}</Option>
	                            )
	                        })
	                    }
	                </Select>
	            </div>
	            <Tabs style={{marginBottom: '100px'}} type={this.state.tabType} defaultActiveKey="1">
	                <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
	                <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
	                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
	            </Tabs>
	            {/* <Tabs style={{ marginBottom: '100px' }} defaultActiveKey="1">
              <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
          <Tabs tabBarStyle="trangle" defaultActiveKey="1">
              <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
          </Tabs> */}

	        </>

	    )
	}
}

export default Demo;
