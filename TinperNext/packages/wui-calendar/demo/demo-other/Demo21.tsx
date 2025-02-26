/**
 *
 * @title 设置周起始日(单选)
 * @description 通过 weekStartsOn 设置周几作为每周的第一天，0 代表周日，1 代表周一，以此类推。
 *
 */

import {Button, Calendar} from "@tinper/next-ui";
import React, {Component} from 'react';


class Demo21 extends Component<{}, {weekStart: number}> {
    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            weekStart: 0
        }
    }
    render() {
	    return (
	        <div>
                <div style={{margin: '0 0 15px 10px'}}>
                    <Button onClick={() => this.setState({ weekStart: 0 })} size="sm">默认</Button>
                    <Button onClick={() => this.setState({ weekStart: 1 })} size="sm">周一</Button>
                    <Button onClick={() => this.setState({ weekStart: 2 })} size="sm">周二</Button>
                    <Button onClick={() => this.setState({ weekStart: 3 })} size="sm">周三</Button>
                    <Button onClick={() => this.setState({ weekStart: 4 })} size="sm">周四</Button>
                    <Button onClick={() => this.setState({ weekStart: 5 })} size="sm">周五</Button>
                    <Button onClick={() => this.setState({ weekStart: 6 })} size="sm">周六</Button>
                </div>
	            <Calendar
	                style={{margin: 10}}
	                fullscreen={false}
	                fieldid="demo21"
                    weekStartsOn={this.state.weekStart}
	            />
	        </div>
	    )
    }
}


export default Demo21
