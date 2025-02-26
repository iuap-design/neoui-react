/**
 *
 * @title Collapse collapsible属性
 * @description collapsible属性，控制所有子面板是否可折叠或可折叠触发区域，值为：disabled或者header(当值为header时，只有点击header标题部位才可以触发折叠效果)
 * @type other
 */

import {Button, Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo7 extends Component<{}, {activeKey: string; collapsdile: '' | 'disabled' | 'header' | string}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeKey: '1',
            collapsdile: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(activeKey: string) {
        console.log(activeKey)
        this.setState({activeKey});
    }

	handleHeader = (val: string) => {
	    this.setState({collapsdile: val});
	}

	render() {
	    return (
	        <div>
	            <div style={{marginBottom: '20px'}}>
	                <Button onClick={this.handleHeader.bind(this, 'icon')}>icon</Button>
	                <Button onClick={this.handleHeader.bind(this, 'header')}>header</Button>
	                <Button onClick={this.handleHeader.bind(this, 'disabled')}>disabled</Button>
	            </div>
	            <Collapse defaultActiveKey={this.state.activeKey} ghost={false} onChange={this.handleChange}
						  collapsible={this.state.collapsdile}>
	                <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
	                <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
	            </Collapse>

	        </div>
	    )
	}
}

export default Demo7;
