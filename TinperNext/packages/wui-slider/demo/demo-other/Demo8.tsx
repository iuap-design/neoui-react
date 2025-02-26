/**
 *
 * @title 带tip提示的slider
 * @description 和 tip展示 组件保持同步。
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
	        <div>
	            <div style={wrapperStyle}>
	                <p>Slider with Tooltip</p>
	                <Slider min={0} max={100} defaultValue={45} tipFormatter={value => `${value}%`} tooltipVisible
	                    getTooltipPopupContainer={(dom: HTMLElement) => dom}/>
	            </div>
	            <div style={wrapperStyle}>
	                <p>Slider with Tooltip (tooltipVisible 设置为 false)</p>
	                <Slider min={0} max={100} defaultValue={60} tipFormatter={value => `${value}%`}
	                    tooltipVisible={false}/>
	            </div>
	            <div style={wrapperStyle}>
	                <p>Range with Tooltip</p>
	                <Slider min={0} max={20} defaultValue={[3, 10]} range tipFormatter={value => `${value}%`} getTooltipPopupContainer={(dom: HTMLElement) => dom} />
	            </div>
	        </div>
	    )
	}
}

export default Demo8;
