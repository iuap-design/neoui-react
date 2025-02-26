/**
 * @title 获取Input对象句柄
 * @description 获取对象句柄，两种方式。
 */

import {Button, Input} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo3 extends Component<{}, {value: string}> {
	test1: any
	textInput: any
	constructor(props: {}) {
	    super(props)
	    this.state = {
	        value: 'test'
	    }
	    this.test1 = React.createRef()
	}

	onHander = () => {
	    console.log(this.textInput)
	    this.textInput.input.focus()
	    this.test1.current.input.focus()
	}

	render() {
	    return (
	        <div>
	            <Button colors='primary' onClick={this.onHander}>
					获取input对象句柄
	            </Button>

	            <Input
	                style={{marginTop: '10px', width: '200px', display: 'block'}}
	                value={this.state.value}
	                ref={(input: HTMLInputElement) => (this.textInput = input)}
	            />
	            <Input.Password
	                style={{marginTop: '10px', width: '200px'}}
	                value={this.state.value}
	                ref={this.test1}
	            />
	        </div>
	    )
	}
}

export default Demo3
