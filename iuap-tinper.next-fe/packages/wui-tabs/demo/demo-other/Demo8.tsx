/**
 *
 * @title 新增和关闭页签
 * @description 只有卡片样式的页签支持新增和关闭选项。使用 closable={false} 禁止关闭。自定义新增按钮（默认是 “+” 号）
 * @type other
 */

import {Tabs, TabsProps, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;

interface TabsState8 {
	activeKey: string;
	panes: {title: string, content: string, key: string, closable?: boolean}[]
}

class Demo8 extends Component<{}, TabsState8> {
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
	        panes
	    }
	}

	onTabChange: TabsProps['onChange'] = (activeKey) => {
	    this.setState({
	        activeKey,
	    });
	}

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

	onEdit: TabsProps['onEdit'] = (targetKey, action) => {
	    console.log('onEdit', targetKey, action)
	    this[action](targetKey);
	};

	onTabScroll: TabsProps['onTabScroll'] = (key) => {
	    console.log(key)
	}

	render() {
	    return (
	        <Tabs
	            className="demo8"
	            activeKey={this.state.activeKey}
	            onChange={this.onTabChange}
	            tabBarStyle="editable-card"
	            onEdit={this.onEdit}
	            onTabScroll={this.onTabScroll}
	            style={{maxWidth: '750px'}}
	            addIcon={<Icon type="uf-book" />}
	        >
	            {this.state.panes.map(pane => (
	                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
	                    {pane.content}
	                </TabPane>
	            ))}
	        </Tabs>
	    );
	}
}

export default Demo8;
