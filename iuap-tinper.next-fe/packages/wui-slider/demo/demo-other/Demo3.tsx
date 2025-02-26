/**
 *
 * @title 自定义slider样式
 * @description 自定义slider样式（track,handle,rail等样式自定义）
 * @type other
 * demo3
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo3 extends Component {
	log = (value: number) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    let style = {width: 600, marginLeft: 50, marginBottom: 60}
	    return (
	        <div style={style}>
	            <p>Slider with custom handle and track style.</p>
	            <Slider
	                defaultValue={30}
	                trackStyle={{backgroundColor: '#588ce9', height: 10}}
	                handleStyle={{
	                    borderColor: '#588ce9',
	                    height: 28,
	                    width: 28,
	                    marginLeft: -14,
	                    marginTop: -9,
	                    backgroundColor: '#fff',
	                }}
	                railStyle={{backgroundColor: '#ff5735', height: 10}}
	            />
	        </div>
	    )
	}
}

export default Demo3;
