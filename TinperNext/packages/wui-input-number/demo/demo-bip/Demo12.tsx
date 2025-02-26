/**
 *
 * @title 多格式组件
 * @description 自定义 format ，支持格式自定义
 * @type bip
 */

import {Button, Col, InputNumber} from '@tinper/next-ui'
import React, {Component} from 'react'

interface DemoState {
    value1: number
    value2: number
    precision: number
}
class Demo12 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value1: 3.123456789,
            value2: 5,
            precision: 4
        }
    }

    addPrecision = () => {
        let {precision} = this.state
        this.setState({
            precision: precision + 1
        })
    }

    minusPrecision = () => {
        let {precision} = this.state
        this.setState({
            precision: Math.max(0, precision - 1)
        })
    }

    render() {
        return (
            <div className='demo12'>
                <Col
                    style={{
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: '80px 200px 150px'
                    }}
                >
                    <span>销售价格:</span>
                    <InputNumber
                        className='demo12-input-number'
                        iconStyle='one'
                        round
                        onFocus={(value: number, e: React.FocusEvent<HTMLInputElement>) => {
                            console.log(value + '  ==== ', e)
                            this.setState({
                                value1: value
                            })
                        }}
                        onBlur={(value: string, e: React.FocusEvent<HTMLInputElement>) => {
                            console.log('  ==== ', value, e)
                        }}
                        onChange={(value: number) => {
                            this.setState({
                                value1: value
                            })
                        }}
                        precision={this.state.precision}
                        step={1}
                        format={(value: string | number) => `${value} 千克`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        value={this.state.value1}
                    />
                    <div>
                        <Button onClick={this.addPrecision}>精度+1</Button>
                        <Button onClick={this.minusPrecision}>精度-1</Button>
                    </div>
                </Col>
                <br />
                <Col
                    style={{
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: '80px 200px'
                    }}
                >
                    <span>销售占比:</span>
                    <InputNumber
                        className='demo12-input-number'
                        iconStyle='one'
                        format={(value: string | number) => `${value} %`}
                        value={this.state.value2}
                    />
                </Col>
            </div>
        )
    }
}

export default Demo12
