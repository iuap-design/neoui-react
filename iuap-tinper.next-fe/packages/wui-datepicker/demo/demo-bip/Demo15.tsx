/**
 *
 * @title 切换面板
 * @description 用户手动切换面板，注意：mode必须和picker匹配才可选择日期，详见API文档问答。
 */

import {Button, Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const {RangePicker} = DatePicker

type ModeType = 'date' | 'week' | 'month' | 'year'
interface DemoState {
    value: Moment | string,
	mode: ModeType
}

class Demo15 extends Component<{}, DemoState> {
    constructor(props:{}) {
        super(props)
        this.state = {
            value: '2000-01-02',
            mode: 'date'
        }
    }

	changeMode = () => {
	    const modeList = ['date', 'week', 'month', 'year']
	    let index = modeList.indexOf(this.state.mode)
	    index = index < modeList.length - 1 ? index + 1 : 0
	    this.setState({mode: modeList[index] as ModeType})
	}

	onPanelChange = (values: [Moment | null, Moment | null], modes?: string[]) => {
	    console.log(values, modes)
	    console.log(values[1]?.year())
	}
	onChange = (d: [Moment, Moment], dateString: [string, string]) => {
	    console.warn('change--->', d, dateString)
	}

	render() {
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        picker={this.state.mode}
	                        placeholder='选择日期'
	                        value={this.state.value}
	                        mode={this.state.mode}
	                    />
	                </Col>
	                <Col md={6}>
	                    <RangePicker
	                        picker={this.state.mode}
	                        placeholder='选择日期'
	                        mode={[this.state.mode, this.state.mode]}
	                        onChange={this.onChange}
	                        onPanelChange={this.onPanelChange}
	                    />
	                </Col>
	                <Col md={4}>
	                    <Button onClick={this.changeMode}>切换mode</Button>
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo15
