/**
 * @title 清空按钮
 * @description 通过设置 showClose 属性，让Input组件有清空功能
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo6 extends Component<{}, {value: string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 'test'
        }
    }

	onChange = (value: string) => {
	    this.setState({value: value})
	}

	onSearch = (value: string) => {
	    console.log(value)
	}

	render() {
	    return (
	        <div className='demo6'>
	            <Input
	                style={{width: '200px', boxSizing: 'border-box'}}
	                value={this.state.value}
	                onChange={this.onChange}
	                allowClear
	            />
	        </div>
	    )
	}
}
