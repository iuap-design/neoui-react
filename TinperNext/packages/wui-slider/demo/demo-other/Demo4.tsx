/**
 *
 * @title 带有标签的slider
 * @description 带有marks标签的step
 *
 */


import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo4 extends Component {
	log = (value: number | number[]) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    let style = {width: 600, marginLeft: 50, marginBottom: 60};
	    const marks = {
	        '-10': '-10°C',
	        0: <strong>0°C</strong>,
	        26: '26°C',
	        47: '47°C',
	        100: {
	            style: {
	                color: 'red',
	            },
	            label: <strong>100°C</strong>
	        }
	    };

	    const marksOther = {
	        0: <strong>0°C</strong>,
	        33: '33°C',
	        87: '87°C',
	        100: {
	            style: {
	                color: 'red',
	            },
	            label: <strong>100°C</strong>
	        }
	    };

	    return (
	        <div>
	            <div style={style}>
	                <p>（1）Slider with marks,`steps默认是1`</p>
	                <Slider fieldid={'mark'} min={-10} marks={marks} defaultValue={33} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>（2）Slider with marks and `steps=20`</p>
	                <Slider min={0} marks={marksOther} step={20} defaultValue={58} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>（3）Slider with marks and `dots steps=20`</p>
	                <Slider dots min={0} marks={marksOther} step={20} defaultValue={58} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>（4）Slider with marks, `step=null`，因此step = marks</p>
	                <Slider min={0} marks={marksOther} step={null} defaultValue={68} onChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>（5）Slider with marks, `included=false`</p>
	                <Slider min={0} marks={marksOther} included={false} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <p>（6）Slider with marks and `steps=10,included=false`</p>
	                <Slider min={-10} marks={marks} step={10} included={false} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <p>（7）Range with marks</p>
	                <Slider.Range min={-10} marks={marks} onChange={this.log} defaultValue={[20, 40]}/>
	            </div>
	            <div style={style}>
	                <p>（8）Range with marks and steps</p>
	                <Slider.Range min={-10} marks={marks} step={10} onChange={this.log} defaultValue={[20, 40]}/>
	            </div>
	        </div>
	    )
	}
}

export default Demo4;
