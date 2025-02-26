/**
 *
 * @title 单选模式 周六、日所在列添加背景色
 * @description markWeekend 为周六、日所在列添加背景色
 *
 */

import {Calendar} from "@tinper/next-ui";
import {Moment} from "moment"
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log(value);
}

class Demo16 extends Component {

    render() {
	    return (
	        <div>
	            <Calendar
	                style={{margin: 10}}
	                fullscreen={false}
	                onSelect={onSelect}
	                fieldid="demo18"
                    markWeekend
	            />
	        </div>
	    )
    }
}


export default Demo16