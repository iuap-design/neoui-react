/**
 *
 * @title 竖直方向的slider
 * @description 竖直vertical
 * @type other
 * demo5
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo6 extends Component {
	log = (value: number | number[]) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    const style = {float: 'left' as any, height: 400, marginBottom: 160, marginLeft: 50, width: 200}
	    const parentStyle = {overflow: 'hidden'};
	    const marks = {
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

	    return (
	        <div style={parentStyle}>
	            <div style={style}>
	                <p style={{marginBottom: '10px', height: '46px'}}>Slider with `marks, step=null`</p>
	                <Slider vertical min={0} marks={marks} step={null} onChange={this.log} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <p style={{marginBottom: '10px', height: '46px'}}>Slider with `marks and steps=25`</p>
	                <Slider vertical dots min={0} marks={marks} step={25} onChange={this.log} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <p style={{marginBottom: '10px', height: '46px'}}>Slider with `marks and steps默认是1
						included=false`</p>
	                <Slider vertical min={0} marks={marks} included={false} defaultValue={20}/>
	            </div>
	            <div style={style}>
	                <p style={{marginBottom: '10px', height: '46px'}}>Range with `marks steps默认是1,`</p>
	                <Slider.Range vertical min={0} marks={marks} onChange={this.log} defaultValue={[20, 40]}/>
	            </div>
	            <div style={style}>
	                <p style={{marginBottom: '10px', height: '46px'}}>Range with `marks and steps=10`</p>
	                <Slider.Range vertical min={0} marks={marks} step={10} onChange={this.log} defaultValue={[20, 40]}/>
	            </div>
	        </div>
	    )
	}
}

export default Demo6;
