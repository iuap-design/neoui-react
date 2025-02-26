/**
 *
 * @title 禁止Enter键打开面板
 * @description 默认Enter按键可切换弹窗显示、隐藏，可禁止Enter打开弹窗
 */

import {Button, Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'

interface DemoState {
	enterKeyDown: boolean
}

class Demo16 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            enterKeyDown: true
        }
    }

	disableEnterOpen = (disable: boolean) => {
	    this.setState({enterKeyDown: disable})
	}

	render() {
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        picker='date'
	                        format='YYYY-MM-DD HH:mm:ss'
	                        placeholder='选择日期'
	                        enterKeyDown={this.state.enterKeyDown}
	                    />
	                </Col>
	                <Col>
	                    <Button.Group>
	                        <Button
	                            onClick={() => {
	                                this.disableEnterOpen(false)
	                            }}
	                        >
								禁止Enter打开弹窗面板
	                        </Button>
	                        <Button
	                            onClick={() => {
	                                this.disableEnterOpen(true)
	                            }}
	                        >
								允许Enter打开弹窗面板
	                        </Button>
	                    </Button.Group>
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo16
