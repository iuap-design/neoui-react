/**
 *
 * @title 附加操作
 * @description `tabBarExtraContent`参数可以在页签右边自定义附加操作。
 * @type other
 * demo6
 */

import {Button, Tabs, TabsProps, Icon, Select} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;
let { Option } = Select

interface TabsState6 {
	data: {tab: string, key: string, text: string, disabled?: boolean}[];
    activeKey: string;
	activeTabNum: string;
	allType: string[];
	selectVal: string;
	tabType: string[];
}

class Demo6 extends Component<{}, TabsState6> {
    constructor(props: {}) {
        super(props)
        let pane = [
            {
                tab: 'Tab 1',
                key: '1',
                text: 'Content of Tab Pane 1'
            },
            {
                tab: 'Tab 2',
                key: '2',
                text: 'Content of Tab Pane 2'
            },
            {
                tab: 'Tab 3',
                key: '3',
                text: 'Content of Tab Pane 3'
            },
            {
                tab: 'Tab 4',
                key: '4',
                text: 'Content of Tab Pane 4'
            }
        ]
        this.state = {
            data: pane,
            activeKey: pane[0].key,
            activeTabNum: '',
            allType: ['rightClick', 'hover', 'all'],
            selectVal: 'rightClick',
            tabType: ['click']
        }
    }

	selectHide = (val: boolean, val2: string) => {
	    if (val) {
	        this.setState({
	            activeTabNum: val2
	        })
	    } else {
	        this.setState({
	            activeTabNum: ''
	        })
	    }
	}

	add = () => {
	    alert("在这里添加操作 ^_^")
	}
	onMenuClose: TabsProps['onPopMenuClick'] = (val) => {
	    console.log('type', val.type)
	    console.log('tabkey', val.tabKey)
	    if (val.type === 'closecur') {
	        this.closecur(val.tabKey)
	    } else if (val.type === 'closeall') {
	        this.closeall()
	    } else if (val.type === 'closeoth') {
	        this.closeoth(val.tabKey)
	    } else if (val.type === 'closeRight') {
	        this.closeRight(val.tabKey)
	    }
	}
	closecur = (key: string) => {
	    // let {data} = this.state
	    // let afterData = []
	    // data.forEach(item => {
	    //     if (item.key !== key) {
	    //         afterData = [...afterData, item]
	    //     }
	    // })
	    // this.setState({
	    //     data: [{
	    //         tab: 'Tab 2',
	    //         key: '2',
	    //         text: 'Content of Tab Pane 2',
	    //         disabled: true
	    //     },
	    //     {
	    //         tab: 'Tab 3',
	    //         key: '3',
	    //         text: 'Content of Tab Pane 3'
	    //     }]
	    // })
	    // console.log('afterdata======>',afterData)
	    // console.log('data======>',this.state.data)

	    let {activeKey} = this.state;
	    // let lastIndex;
	    // this.state.data.forEach((pane, i) => {
	    //   if (pane.key === key) {
	    //     lastIndex = i - 1;
	    //   }
	    // });
	    const panes = this.state.data.filter(pane => pane.key !== key);
	    if (panes.length == 0) { // panes为空数组时，则当前tabs只有触发项，关闭当前相当于关闭全部
	        this.setState({data: panes})
	    } else {
	        activeKey = panes[0].key;
	    	this.setState({data: panes, activeKey});
	    }
	}
	// 关闭全部
	closeall = () => {
	    let {activeKey} = this.state;
	    const panes = this.state.data.filter(pane => pane.disabled == true);
	    activeKey = panes[0]?.key;
	    this.setState({data: panes, activeKey});
	}
	// 关闭其他
	closeoth = (key: string) => {
	    let {activeKey} = this.state;
	    const panes = this.state.data.filter(pane => pane.key == key || pane.disabled == true);
	    activeKey = key;
	    this.setState({data: panes, activeKey});
	}
	// 关闭右侧
	closeRight = (key: string) => {
	    let {activeKey} = this.state;
	    let curIndex = 0
	    this.state.data.forEach((item, index) => {
	        if (item.key == key) {
	            curIndex = index
	        }
	    })
	    let panes = this.state.data.filter((pane, index) => {
	        console.log('pane', pane)
	        return index <= curIndex
	    });
	    activeKey = key;
	    this.setState({data: panes, activeKey});
	}
	onTabChange: TabsProps['onChange'] = (activeKey) => {
	    this.setState({
	        activeKey,
	    });
	}

	popMenu: TabsProps['popMenu'] = () => { // 自定义下拉项
	    let items = [
	        {key: "refresh", text: "刷新"}
	        , {key: "closecur", text: "关闭当前"}
	        , {key: "closeall", text: "关闭全部"}
	        , {key: "closeoth", text: "关闭其他"}
	        , {key: 'closeRight', text: '关闭右侧'}
	    ]
	    return items
	}

	changeTabPosition = (val: string) => {
	    if (val === 'rightClick') {
	        this.setState({
	            selectVal: 'rightClick',
	            tabType: ['click'],
	        })
	    } else if (val === 'hover') {
	        this.setState({
	            selectVal: 'hover',
	            tabType: ['hover'],
	        })
	    } else {
	        this.setState({
	            selectVal: 'all',
	            tabType: ['hover', 'click'],
	        })
	    }
	}

	render() {
	    // debugger
	    return (
	        <div className="Demo6" style={{position: 'relative'}}>
	            <div style={{marginBottom: 16}}>
					下拉触发形式：
	                <Select
	                    value={this.state.selectVal}
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
	            <Tabs
	                className="Demo6-tabs"
	                // defaultActiveKey={this.state.activeKey}
	                activeKey={this.state.activeKey}
	                tabBarStyle="card"
	                tabBarExtraContent={
	                    <Button className="add-button" size="sm" colors="primary" onClick={this.add}
	                        style={{margin: '0 7px'}}>一些操作</Button>
	                }
	                onChange={this.onTabChange}
	                // menuClose={true}
	                onPopMenuClick={this.onMenuClose}
	                popMenu={this.popMenu}
	                trigger={this.state.tabType}
	                onPopMenu={this.selectHide}
	                style={{height: '400px'}}
	            >
	                {
	                    this.state.data.map(item =>
	                        (
	                            <TabPane tab={<span>{item.tab}<Icon rotate={item.key === this.state.activeTabNum ? 180 : 0} style={{fontSize: '12px', marginLeft: '5px'}} type="uf-treearrow-down" /></span>} key={item.key} disabled={item.disabled}>{<div>{item.tab}</div>}</TabPane>
	                        )
	                    )
	                }
	            </Tabs>
	        </div>
	    )
	}
}

export default Demo6;
