/**
 * @title 自适应文本高度的文本域
 * @description
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo10 extends Component {
	onPressEnter = (e: React.KeyboardEvent) => {
	    console.log('按下回车', e)
	}
	onResize = ({width, height}: {width: number; height: number}) => {
	    console.log('onResize', width, height)
	}

	render() {
	    return (
	        <div className='demo1'>
	            <Input
	                componentClass='textarea'
	                defaultValue={1}
	                onResize={this.onResize}
	            />
	            <Input
	                type='textarea'
	                style={{margin: '5px 0'}}
	                placeholder='Controlled autosize'
	                autoSize={{minRows: 3, maxRows: 5}}
	                onPressEnter={this.onPressEnter}
	            />
	        </div>
	    )
	}
}
