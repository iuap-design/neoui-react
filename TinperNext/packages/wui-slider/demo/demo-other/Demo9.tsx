/**
 *
 * @title 反向
 * @description 设置 reverse 可以将滑动条置反
 *
 */


import {Slider, Switch} from "@tinper/next-ui";
import React, {Component} from 'react';

const style = {width: 400, margin: 50, marginBottom: 60};

interface SliderState {
	reverse: boolean;
}
class Demo9 extends Component<{}, SliderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            reverse: false
        }
    }

	handleReverseChange = (reverse: boolean) => {
	    this.setState({reverse});
	};

	render() {
	    const {reverse} = this.state;
	    return (
	        <div>
	            <div style={style}>
	                <Slider reverse={reverse} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <Slider reverse={reverse} range min={0} max={20} defaultValue={[3, 10]}/>
	            </div>
				Reversed: <Switch checked={reverse} onChange={this.handleReverseChange}/>
	        </div>
	    )
	}
}


export default Demo9;
