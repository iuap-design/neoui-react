/**
 *
 * @title 默认 iconStyle
 * @description 自定义 最大值 max=12,step=3
 *
 */

import {Button, Col, InputNumber, Row} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo2 extends Component<{}, {value: number; max: number}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 10,
            max: 12
        }
    }

    handleChange = (value: number) => {
        console.log('demo2-change', value)
        this.setState({
            value
        })
    }
    addMax = () => {
        this.setState({
            max: this.state.max + 3
        })
    }

    onBlur = (value: number, e: React.FocusEvent<HTMLInputElement>) => {
        console.log(value, e)
        // this.setState({value: value})
    }

    render() {
        return (
            <Row gutter={10}>
                <Col>
                    <InputNumber
                        id='demo2-id'
                        fieldid='demo2-fieldid'
                        toNumber={false}
                        max={this.state.max}
                        step={1}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onBlur={this.onBlur}
                    />
                </Col>
                <Col>
                    <Button onClick={this.addMax}>当前max+3</Button>
                </Col>
            </Row>
        )
    }
}

export default Demo2
