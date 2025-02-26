/**
 *
 * @title 位置
 * @description tab页签头的位置，可以在['top','bottom','left','right']中选择。当页签宽度超过容器宽度时，可以左右、上下滑动，容纳更多标签。
 * @type other
 * demo4
 */

import {Select, Tabs, TabsProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {TabPane} = Tabs;
const {Option} = Select;

interface TabsState4 {
	activeKey: string;
	start: number;
	tabBarPosition: string;
}

class Demo4 extends Component<{}, TabsState4> {
    constructor(props: {}) {
        super(props);
        this.state = ({
            activeKey: "1",
            start: 0,
            tabBarPosition: "left"
        })
    }

	onChange: TabsProps['onChange'] = (activeKey) => {
	    console.log(`onChange ${activeKey}o-^-o`);
	    this.setState({
	        activeKey,
	    });
	}

	changeTabPosition = (tabBarPosition: string) => {
	    this.setState({tabBarPosition});
	}

	render() {

	    return (
	        <div className="demo4" style={{width: '600px', margin: '20px'}}>
	            <div style={{marginBottom: 16}}>
					Tab position：
	                <Select
	                    value={this.state.tabBarPosition}
	                    onChange={this.changeTabPosition}
	                    style={{width: '100px'}}
	                >
	                    <Option value="top">top</Option>
	                    <Option value="bottom">bottom</Option>
	                    <Option value="left">left</Option>
	                    <Option value="right">right</Option>
	                </Select>
	            </div>
	            <Tabs
	                activeKey={this.state.activeKey}
	                tabPosition={this.state.tabBarPosition}
	                onChange={this.onChange}
	                defaultActiveKey="1"
	                className="demo4-tabs"
	                // onTabClick={this.onTabClick}
	            >
	                <TabPane tab='Tab 1' key="1">
	                    <Tabs
	                // activeKey={this.state.activeKey}
	                tabPosition={'left'}
	                // onChange={this.onChange}
	                defaultActiveKey="1"
	                className="demo4-tabs1"
	                // onTabClick={this.onTabClick}
	            >
	                <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
	                <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
	                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
	                <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
	                <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
	                <TabPane tab='Tab 6' key="6">Content of Tab Pane 6</TabPane>
	                <TabPane tab='Tab 7' key="7">Content of Tab Pane 7</TabPane>
	                <TabPane tab='Tab 8' key="8">Content of Tab Pane 8</TabPane>
	            </Tabs>
	                </TabPane>
	                <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
	                <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
	                <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
	                <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
	                <TabPane tab='Tab 6' key="6">Content of Tab Pane 6</TabPane>
	                <TabPane tab='Tab 7' key="7">Content of Tab Pane 7</TabPane>
	                <TabPane tab='Tab 8' key="8">Content of Tab Pane 8</TabPane>
	            </Tabs>
	        </div>
	    )
	}
}

export default Demo4;
