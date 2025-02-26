/**
 *
 * @title 其它评分样式
 * @description character的使用
 * @type other
 * demo4
 */

import {Icon, Rate} from '@tinper/next-ui';
import React, {Component} from 'react';

interface RateState {
	v1: number;
	v2: number;
	v3: number;
	v4: number;
}

class Demo4 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4
        };
    }

	handChange = (value: number, type: number) => {
	    switch (type) {
	    case 1:
	        this.setState({
	            v1: value
	        });
	        break;
	    case 2:
	        this.setState({
	            v2: value
	        });
	        break;
	    case 3:
	        this.setState({
	            v3: value
	        });
	        break;
	    case 4:
	        this.setState({
	            v4: value
	        });
	        break;
	        default:
		            break;
	    }
	}

	render() {
	    return (
	        <ul style={{"listStyle": "none"}}>
	            <li><Rate allowHalf character="A" value={this.state.v1} onChange={(v) => {
	                this.handChange(v, 1)
	            }}/></li>
	            <li><Rate allowHalf character="字" value={this.state.v2} onChange={(v) => {
	                this.handChange(v, 2)
	            }}/></li>
	            <li><Rate allowHalf character={<Icon type="uf-bell" style={{padding: 0}}/>} value={this.state.v3}
						  onChange={(v) => {
							  this.handChange(v, 3)
						  }}/></li>
	            <li><Rate allowHalf character={<Icon type="uf-heart" style={{padding: 0}}/>} value={this.state.v4}
						  onChange={(v) => {
							  this.handChange(v, 4)
						  }}/></li>
	        </ul>
	    )
	}
}

export default Demo4;
