/**
 *
 * @title 气泡确认框修改显示语言
 *
 */
import {Button, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo3 extends Component {
	onRootClose = () => {
	    console.log('onRootClose')
	}

	render() {
	    const content = 'Do you like tinper-next UI Components Library？'
	    let locale = {
	        lang: 'zh-tw'
	    }
	    return (
	        <div className='demoPadding'>
	            <Popconfirm
	                fieldid='demo3-fieldid'
	                trigger='click'
	                placement='right'
	                content={content}
	                locale={locale}
	                onRootClose={this.onRootClose}
	            >
	                <Button colors='primary'>Click me</Button>
	            </Popconfirm>
	        </div>
	    )
	}
}

export default Demo3
