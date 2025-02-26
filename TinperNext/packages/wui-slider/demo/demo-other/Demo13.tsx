/**
 *
 * @title 设置fieldid
 * @description fieldid属性添加及生成fieldid
 *
 */


import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo13 extends Component {
	log = (value: number) => {
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

	    return (
	        <div>
	            <div style={style}>
	                <p>Slider with marks,`steps默认是1`</p>
	                <Slider fieldid={'slider'} min={-10} marks={marks} defaultValue={33} onChange={this.log}/>
	            </div>
	        </div>
	    )
	}
}

export default Demo13;
