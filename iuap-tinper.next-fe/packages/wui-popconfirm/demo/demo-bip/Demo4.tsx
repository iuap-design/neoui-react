/**
 *
 * @title 控制显示和隐藏
 *
 */

import {Button, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo4 extends Component<{}, {show: boolean}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            show: false
        }
    }

	handleShow = () => {
	    this.setState({
	        show: !this.state.show
	    })
	}

	cancel = () => {
	    this.setState({
	        show: false
	    })
	}

	close = () => {
	    this.setState({
	        show: false
	    })
	}

	render() {
	    let {show} = this.state
	    const content = '您喜欢使用tinper-next组件库吗？'
	    return (
	        <div className='demoPadding'>
	            <Button colors='primary' onClick={this.handleShow}>
	                {show ? '隐藏popConfirm' : '显示popConfirm'}
	            </Button>
	            <Popconfirm
	                trigger='click'
	                placement='right'
	                content={content}
	                show={show}
	                onClick={() => console.log(1234)}
	                onCancel={this.cancel}
	                onClose={this.close}
	            >
	                <Button colors='primary' style={{margin: 'auto 10px'}}>
						向右!
	                </Button>
	            </Popconfirm>
	        </div>
	    )
	}
}

export default Demo4
