/**
 *
 * @title 自定义关闭图标
 * @description 卡片样式为type="editable-card"时，closeIcon属性自定义关闭图标。
 * @type other
 */

import {Icon, Select, Tabs, TabsProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;
let { Option } = Select

interface TabsState10 {
	activeKey: string;
	tabType: string;
	allType: string[];
	panes: {title: string, content: string, key: string, closable?: boolean}[]
}

class Demo10 extends Component<{}, TabsState10> {
	newTabIndex: number
	constructor(props: {}) {
	    super(props);
	    this.newTabIndex = 0;
	    const panes = [
	        {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
	        {title: 'Tab 2', content: 'Content of Tab 2', key: '2'},
	        {
	            title: 'Tab 3',
	            content: 'Content of Tab 3',
	            key: '3',
	            closable: false,
	        },
	    ];
	    this.state = {
	        activeKey: panes[0].key,
	        panes,
	        tabType: 'editable-card',
	        allType: ['line', 'card', 'editable-card', 'fill', 'primary', 'trangle', 'fade', 'trapezoid']
	    }
	}

	onTabChange = (activeKey: string) => {
	    this.setState({
	        activeKey,
	    });
	}

	onEdit: TabsProps['onEdit'] = (targetKey, action) => {
	    console.log('onEdit', targetKey, action)
	    this[action](targetKey);
	};

	remove = (targetKey: string) => {
	    let {activeKey} = this.state;
	    let lastIndex: number = 0;
	    this.state.panes.forEach((pane, i) => {
	        if (pane.key === targetKey) {
	            lastIndex = i - 1;
	        }
	    });
	    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
	    if (panes.length && activeKey === targetKey) {
	        if (lastIndex >= 0) {
	            activeKey = panes[lastIndex].key;
	        } else {
	            activeKey = panes[0].key;
	        }
	    }
	    this.setState({panes, activeKey});
	};

	add = () => {
	    const {panes} = this.state;
	    const activeKey = `newTab${this.newTabIndex++}`;
	    panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
	    this.setState({panes, activeKey});
	};

	onTabScroll: TabsProps['onTabScroll'] = (key) => {
	    console.log(key)
	}
	changeTabPosition = (tabType: string) => {
	    this.setState({tabType});
	}

	render() {
	    return (
	        <div>
	            <div style={{marginBottom: 16}}>
					Tab Type：
	                <Select
	                    value={this.state.tabType}
	                    onChange={this.changeTabPosition}
	                    style={{width: '120px'}}
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
	                className="demo10"
	                activeKey={this.state.activeKey}
	                onChange={this.onTabChange}
	                tabBarStyle={this.state.tabType}
	                onEdit={this.onEdit}
	                onTabScroll={this.onTabScroll}
	                hideAdd
	            >
	                {this.state.panes.map(pane => (
	                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}
								 closeIcon={<Icon type="uf-qq"/>}>
	                        {pane.content}
	                    </TabPane>
	                ))}
	            </Tabs>
	        </div>

	    );
	}
}

export default Demo10;
