/**
 *
 * @title 嵌套页签
 * @description editable-card类型页签嵌套line类型页签示例。
 * @type other
 */

import {Tabs, TabsProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {TabPane} = Tabs;
interface TabsState5 {
	activeKey: string;
	panes: {title: string, content: any, key: string, closable?: boolean}[]
}

let contentCom2 = (<Tabs
    defaultActiveKey="1"
    tabBarStyle="line"
>
    <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
    <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
    <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
</Tabs>)
let contentCom3 = (<Tabs
    defaultActiveKey="3"
    tabBarStyle="line"
    moreType="moreTabsArrow"
>
    <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
    <TabPane tab='Tab 3' key="3">Content of Tab Pane 3</TabPane>
    <TabPane tab='Tab 4' key="4">Content of Tab Pane 4</TabPane>
    <TabPane tab='Tab 5' key="5">Content of Tab Pane 5</TabPane>
</Tabs>)
class Demo5 extends Component<{}, TabsState5> {
    constructor(props: {}) {
        super(props)
        const panes = [
	        {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
	        {title: 'Tab 2', content: contentCom2, key: '2'},
	        {
	            title: 'Tab 3',
	            content: contentCom3,
	            key: '3',
	            closable: false,
	        },
            {title: 'Tab 4', content: 'Content of Tab 4', key: '4'},
            {title: 'Tab 5', content: 'Content of Tab 5', key: '5'}
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

	onEdit: TabsProps['onEdit'] = (targetKey, action) => {
	    console.log('onEdit', targetKey, action)
	    this[action](targetKey);
	};
	render() {

	    return (
	        <div className="Demo5">
	            <Tabs
	                className="Demo5-tabs"
	                activeKey={this.state.activeKey}
	                // tabBarStyle="upborder"
	                type="editable-card"
	                hideAdd
	                onEdit={this.onEdit}
	                onChange={this.onTabChange}
	            >
	                {this.state.panes.map(pane => (
	                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
	                        {pane.content}
	                    </TabPane>
	                ))}
	            </Tabs>
	        </div>
	    )
	}
}

export default Demo5;
