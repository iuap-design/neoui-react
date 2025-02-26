/**
 *
 * @title 设置文字提示挂载点
 * @description Tooltip 渲染父节点，默认渲染到 body 上。
 *
 */

import {Slider} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo8 extends Component {
	log = (value: number) => {
		console.log(value); //eslint-disable-line
	}


	render() {
	    const wrapperStyle = {width: 400, margin: 50};
	    return (
	        <div style={wrapperStyle}>
	            <p>Tooltip 渲染父节点</p>
	            <Slider min={0} max={100} defaultValue={90} tipFormatter={value => `${value}%`} tooltipVisible
	                getTooltipPopupContainer={dom => dom}/>
	        </div>
	    )
	}
}

export default Demo8;
