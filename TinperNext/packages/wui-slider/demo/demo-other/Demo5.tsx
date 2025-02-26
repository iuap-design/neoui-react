/**
 *
 * @title 范围可拖拽
 * @description 数组变化的slider
 *
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class PureRenderRange extends React.Component {
    constructor(props: {}) {
        super(props);
    }

	handleChange = (value: number | number[]) => {
	    console.log(value);
	}

	render() {
	    return (
	        <Slider.Range defaultValue={[20, 40, 60, 80]} onChange={this.handleChange} allowCross={false}/>
	    );
	}
}

class Demo5 extends Component {
	log = (value: number | number[]) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    let style = {width: 600, marginLeft: 50, marginBottom: 60}
	    return (
	        <div>
	            <div style={style}>
	                <p>Basic Range，`allowCross=false step默认是1 defaultValue=[0, 20]`</p>
	                <Slider.Range allowCross={false} defaultValue={[0, 20]} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>Basic Range，`allowCross=true step默认是1 defaultValue=[10, 40]`</p>
	                <Slider.Range defaultValue={[10, 40]} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>Basic Range，`disabled defaultValue=[0, 20]`</p>
	                <Slider.Range allowCross={false} defaultValue={[0, 20]} onChange={this.log} disabled/>
	            </div>
	            <div style={style}>
	                <p>Basic Range，`step=20 defaultValue=[20, 80]` </p>
	                <Slider.Range step={20} defaultValue={[20, 80]} onBeforeChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>Basic Range，`step=20, dots defaultValue=[20, 40]` </p>
	                <Slider.Range dots step={20} defaultValue={[20, 40]} onAfterChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>Range as child component</p>
	                <PureRenderRange/>
	            </div>
	        </div>
	    )
	}
}

export default Demo5;
