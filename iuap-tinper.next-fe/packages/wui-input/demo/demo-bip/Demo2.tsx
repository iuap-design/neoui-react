/**
 * @title 可控 Input
 * @description
 */

import {Button, Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo2 extends Component<{}, {value: string; select: boolean}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '我是这样',
            select: true
        }
    }

	onChange = (value: string) => {
	    this.setState({value: value})
	}

	onHander = () => {
	    this.setState({
	        value: '我改变了',
	        select: false
	    })
	}

	render() {
	    return (
	        <div>
	            <Button colors='primary' onClick={this.onHander}>
					修改输入框值
	            </Button>
	            <Input
	                focusSelect={this.state.select}
	                style={{marginTop: '10px', width: '200px', display: 'block'}}
	                value={this.state.value}
	                onChange={this.onChange}
	            />
	        </div>
	    )
	}
}
