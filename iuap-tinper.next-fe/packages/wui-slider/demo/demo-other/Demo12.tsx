/**
 *
 * @title 设置文字提示的位置
 * @description 设置 Tooltip 展示位置。
 *
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo12 extends Component {
	log = (value: number) => {
		console.log(value); //eslint-disable-line
	}

	render() {
	    const wrapperStyle = {width: 400, margin: 50};
	    return (
	        <div>
	            <div style={wrapperStyle}>
	                <p>tooltipPlacement 默认 top</p>
	                <Slider min={0} max={100} defaultValue={80} tipFormatter={value => `${value}%`} tooltipVisible
	                    getTooltipPopupContainer={dom => dom}/>
	            </div>
	            <div style={wrapperStyle} id="wrapper">
	                <p>tooltipPlacement 设置 bottom</p>
	                <Slider min={0} max={100} defaultValue={60} tipFormatter={value => `${value}%`} tooltipVisible
	                    tooltipPlacement="bottom" getTooltipPopupContainer={dom => dom}/>
	            </div>
	        </div>
	    )
	}
}

export default Demo12;
