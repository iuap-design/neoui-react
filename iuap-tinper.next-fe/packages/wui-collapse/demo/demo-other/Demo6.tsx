/**
 *
 * @title panel面板collapsible属性
 * @description collapsible属性，控制面板是否可折叠或可折叠触发区域，值为：disabled或者header
 * @type other
 */

import {Button, Collapse} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Panel} = Collapse;

class Demo6 extends Component<{}, {collapsdile: '' | 'disabled' | 'header' | string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            collapsdile: ''
        }
    }

	handleHeader = (val: string) => {
	    this.setState({collapsdile: val});
	}

	render() {
	    return (
	        <div>
	            <div style={{marginBottom: '20px'}}>
	                <Button onClick={this.handleHeader.bind(this, 'header')}>header</Button>
	                <Button onClick={this.handleHeader.bind(this, 'disabled')}>disabled</Button>
	            </div>
	            <Panel header="Panel header" footer='Panel footer' collapsible={(this.state.collapsdile)}>
					Panel content
	            </Panel>
	        </div>

	    )
	}
}


export default Demo6;
