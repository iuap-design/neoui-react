/**
 *  @title 翻页与全部功能并存
 *  @description 左右翻页及全选下拉功能并存
 */

import {Tabs, TabsProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;

class Demo21 extends Component {
	state = {
	    activeKey: "1",
	    testvalue: ''
	}

	onChange: TabsProps['onChange'] = (activeKey) => {
	    console.log(`onChange ${activeKey} o-^-o`);
	    this.setState({
	        activeKey,
	    });
	}
	handleScroll: TabsProps['onTabScroll'] = (res) => {
	    console.log(res)
	    this.setState({
	        testvalue: res
	    })
	}

	render() {
	    return (
	        <Tabs
	            defaultActiveKey="1"
	            onChange={this.onChange}
	            className="demo1-tabs"
	            type="card"
	            // tabBarStyle={{background: '#aaa'}}
	            // tabPosition="left"
	            // tabBarExtraContent={(<span>112233</span>)}
	            onTabScroll={this.handleScroll}
	            moreType="moreTabsArrow"
	            moreTypeAllShow={true}
	            isTruncationShow={false}
	        >
	            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
	            <TabPane tab='Tab 22222222' key="2">Content of Tab Pane 2</TabPane>
	            <TabPane tab='Tab 3333' key="3">Content of Tab Pane 3</TabPane>
	            <TabPane tab='Tab 444444444444444444' key="4">Content of Tab Pane 4</TabPane>
	            <TabPane tab='Tab 5555' key="5">Content of Tab Pane 5</TabPane>
	            <TabPane tab='Tab 6' key="6">Content of Tab Pane 6</TabPane>
	            <TabPane tab='Tab 7777777777' key="7">Content of Tab Pane 7</TabPane>
	            <TabPane tab='Tab 88888888888' key="8">Content of Tab Pane 8</TabPane>
	            <TabPane tab='Tab 9999' key="9">Content of Tab Pane 9</TabPane>
	            <TabPane tab='Tab 10' key="10">Content of Tab Pane 10</TabPane>
	            <TabPane tab='Tab 11' key="11">Content of Tab Pane 11</TabPane>
	            <TabPane tab='Tab 12' key="12">Content of Tab Pane 12</TabPane>
	            <TabPane tab='Tab 13' key="13">Content of Tab Pane 13</TabPane>
	            <TabPane tab='Tab 14' key="14">Content of Tab Pane 14</TabPane>
	            <TabPane tab='Tab 15' key="15">Content of Tab Pane 15</TabPane>
	            <TabPane tab='Tab 16' key="16">Content of Tab Pane 16</TabPane>
	            <TabPane tab='Tab 17' key="17">Content of Tab Pane 17</TabPane>
	            <TabPane tab='Tab 18' key="18">Content of Tab Pane 18</TabPane>
	            <TabPane tab='Tab 19' key="19">Content of Tab Pane 19</TabPane>
	            <TabPane tab='Tab 20' key="20">Content of Tab Pane 20</TabPane>
	            <TabPane tab='Tab 21' key="21">Content of Tab Pane 21</TabPane>
	            <TabPane tab='Tab 22' key="22">Content of Tab Pane 22</TabPane>
	            <TabPane tab='Tab 23' key="23">Content of Tab Pane 23</TabPane>
	            <TabPane tab='Tab 24' key="24">Content of Tab Pane 24</TabPane>
	            <TabPane tab='Tab 25' key="25">Content of Tab Pane 25</TabPane>
	            <TabPane tab='Tab 26' key="26">Content of Tab Pane 26</TabPane>
	            <TabPane tab='Tab 27' key="27">Content of Tab Pane 27</TabPane>
	            <TabPane tab='Tab 28' key="28">Content of Tab Pane 28</TabPane>
	            <TabPane tab='Tab 29' key="29">Content of Tab Pane 29</TabPane>
	            <TabPane tab='Tab 30' key="30">Content of Tab Pane 30</TabPane>
	            <TabPane tab='Tab 31' key="31">Content of Tab Pane 31</TabPane>
	            <TabPane tab='Tab 32' key="32">Content of Tab Pane 32</TabPane>
	            <TabPane tab='Tab 33' key="33">Content of Tab Pane 33</TabPane>
	            <TabPane tab='Tab 34' key="34">Content of Tab Pane 34</TabPane>
	            <TabPane tab='Tab 35' key="35">Content of Tab Pane 35</TabPane>
	        </Tabs>
	    )
	}
}

export default Demo21;
