/**
 * @title 文本框输入长度控制
 * @description
 */

import {Input, Row, Col} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo13 extends Component<{}, {value: string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 'test'
        }
    }

    onChange = (v: string, e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('v: --------- ', v, e)
        this.setState({value: v})
    }

    onResize = ({width, height}) => {
        console.log(111111, width, height)
    }

    render() {
        return (
            <Row className='demo13' gutter={[24, 24]}>
                <Col span={8}>
                    <Input
                        type='textarea'
                        autoSize={{minRows: 5, maxRows: 10}}
                        showMaxLabel
                        maxLength={20}
                        allowInputOverMax
                        placeholder='超长后可继续输入，显示数字角标'
                        onChange={this.onChange}
                    />
                </Col>

                <Col span={8}>
                    <Input
                        type='textarea'
                        autoSize={{minRows: 5, maxRows: 10}}
                        showMaxLabel
                        allowInputOverMax={false}
                        maxLength={20}
                        placeholder='超长后禁止输入，显示数字角标'
                        onChange={this.onChange}
                    />
                </Col>

                <Col span={8}>
                    <Input
                        type='textarea'
                        autoSize={{minRows: 5, maxRows: 10}}
                        allowClear
                        showMaxLabel
                        allowInputOverMax={false}
                        maxLength={20}
                        placeholder='超长后禁止输入,可清空'
                        onChange={this.onChange}
                    />
                </Col>

                <Col span={8}>
                    <Input
                        type='textarea'
                        autoSize={{minRows: 5, maxRows: 10}}
                        maxLength={20}
                        allowInputOverMax={false}
                        placeholder='超长后禁止输入，不显示数字角标'
                        onChange={this.onChange}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        type='textarea'
                        value={this.state.value}
                        maxLength={20}
                        allowInputOverMax
                        showMaxLabel
                        placeholder='超长后可继续输入，显示数字角标'
                        onChange={this.onChange}
                        onResize={this.onResize}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        type='textarea'
                        maxLength={20}
                        placeholder='最简版，无角标'
                    />
                </Col>
            </Row>
        )
    }
}
