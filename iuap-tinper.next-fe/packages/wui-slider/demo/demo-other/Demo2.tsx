/**
 *
 * @title 只能拖拽到刻度上
 * @description 设置dots的slider(dots间距同step)，只能拖拽到刻度上
 *
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo2 extends Component {
	log = (value: number) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    const style = {width: 600, marginLeft: 50, marginBottom: 60}
	    return (
	        <div>
	            <div style={style}>
	                <p>Basic Slider，`step=20, dots `</p>
	                <Slider dots step={20} defaultValue={60} onAfterChange={this.log}/>
	            </div>
	            <div style={style}>
	                <p>Basic Slider，`step=10, dots, dotStyle={"{borderColor: 'orange'}"},
						activeDotStyle={"{borderColor: 'yellow'}"}`</p>
	                <Slider dots step={10} defaultValue={100} onAfterChange={this.log}
	                    dotStyle={{borderColor: 'orange'}} activeDotStyle={{borderColor: 'yellow'}}/>
	            </div>
	        </div>
	    )
	}
}

export default Demo2;
