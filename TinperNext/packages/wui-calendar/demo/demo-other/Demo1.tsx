/**
 *
 * @title 卡片模式
 * @description 用于嵌套在空间有限的容器中
 *
 */

import {Calendar} from "@tinper/next-ui";
import moment, {Moment} from "moment"
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log(value);
}


class Demo1 extends Component {
	disabledDate = (current: Moment) => {
	    // Can not select days before today and today
	    // return current && current < moment().endOf(‘day’);！！！！！当天之前的不可选，包括当天
	    return current < moment().subtract(1, "day")
	}

	render() {
	    return (
	        <div>
	            <Calendar
	                style={{margin: 10}}
	                fullscreen={false}
	                onSelect={onSelect}
	                fieldid="demo"
	            />
	        </div>
	    )
	}
}


export default Demo1
