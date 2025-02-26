/**
 *  @title 查询形式tab
 *  @description SearchTabs = Tabs.SearchTabs
 * @type other
 * demo7
 */

import {Button, Tabs} from '@tinper/next-ui';
import React, {Component} from 'react';

const SearchTabs = Tabs.SearchTabs;

interface TabsState7 {
	selectValue: string;
	tabList: {name: string, value: string}[]
}

class Demo1 extends Component<{}, TabsState7> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tabList: [
                {
                    name: "待提交(9)", value: '1'
                },
                {
                    name: "审批中(12)", value: '2'
                },
                {
                    name: "执行中(5)", value: '3'
                },
                {
                    name: "已完成(123)", value: '4'
                },
                {
                    name: "已删除(0)", value: '5'
                },
                {
                    name: "全部(149)", value: '6'
                },
            ],
            selectValue: '3'
        }
    }

	getData = () => {
	    this.setState({
	        selectValue: '1',
	        tabList: [
	            {
	                name: "已删除(0)", value: '1'
	            },
	            {
	                name: "全部(70)", value: '2'
	            },
	            {
	                name: "待提交(3)", value: '3'
	            },
	            {
	                name: "审批中(67)", value: '4'
	            },
	        ]
	    })
	}

	render() {
	    return (
	        <div>
	            <Button colors='primary' onClick={this.getData} style={{'marginBottom': '10px'}}>更改数据</Button>
	            <SearchTabs value={this.state.selectValue} onChange={(v: string) => {
	                console.log('onchange', v)
	            }}>
	                {
	                    this.state.tabList.map(item =>
	                        <SearchTabs.Item value={item.value} key={item.value}>{item.name}</SearchTabs.Item>)
	                }
	            </SearchTabs>
	        </div>
	    )
	}
}

export default Demo1
