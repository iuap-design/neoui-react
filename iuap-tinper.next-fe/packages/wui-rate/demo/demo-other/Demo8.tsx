/**
 *
 * @title 事件
 * @description 触发事件
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
}
class Demo8 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 3
        };
    }

	handChange = (value: number) => {
	    this.setState({
	        value
	    })
	}
	focus = () => {
	    console.log('focus')
	}
	blur = () => {
	    console.log('blur')
	}
	hoverChange = (v: number) => {
	    console.log('hoverChange', v)
	}
	keyDown = (v?: KeyboardEvent) => {
	    console.log('keyDown', v)
	}

	render() {
	    return (
	        <Rate allowHalf value={this.state.value} onChange={this.handChange}
				  onHoverChange={this.hoverChange} onFocus={this.focus} onBlur={this.blur} onKeyDown={this.keyDown}/>
	    )
	}
}

export default Demo8;
