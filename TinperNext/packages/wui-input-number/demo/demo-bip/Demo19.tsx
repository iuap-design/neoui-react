/**
 *
 * @title 金额大写示例
 * @description 金额大写的两种展示形式，只在中文环境下生效
 * @type bip
 */

import { InputNumber, ConfigProvider, Col } from '@tinper/next-ui'
import React, { Component } from 'react'

class Demo19 extends Component<{}, { value?: number | string, value2?: number | string }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '333.1',
            value2: '23.12'
        }
    }

    handleChange = (value: number) => {
        console.log('demo-value', value)
        this.setState({
            value
        })
    }

    handleChange2 = (value: number) => {
        console.log('demo-value2', value)
        this.setState({
            value2: value
        })
    }

    render() {
        return (
            <ConfigProvider>
                <Col style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '80px 100%' }}>
                    <span>左右布局：</span>
                    <InputNumber
                        fieldid='demo19-1-fieldid'
                        iconStyle='one'
                        autoFix
                        toNumber={false}
                        displayCheckPrompt
                        value={this.state.value}
                        onChange={this.handleChange}
                        toThousands={false}
                        showAmountInWords
                        showAmountLayout='horizontal'
                        inputWidth='200px'
                    />
                </Col>
                <br />
                <Col style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '80px 100%' }}>
                    <span>上下布局：</span>
                    <InputNumber
                        fieldid='demo19-2-fieldid'
                        iconStyle='one'
                        autoFix
                        toNumber={false}
                        displayCheckPrompt
                        value={this.state.value2}
                        onChange={this.handleChange2}
                        toThousands={false}
                        showAmountInWords
                        inputWidth='200px'
                    />
                </Col>
            </ConfigProvider>
        )
    }
}

export default Demo19
