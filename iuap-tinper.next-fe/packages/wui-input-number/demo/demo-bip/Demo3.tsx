/**
 *
 * @title 高精度小数
 * @description 通过 `toNumber`和`precision` 开启高精度小数支持，`onChange` 事件返回 string 类型。
 * @type bip
 */

import {InputNumber} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo3 extends Component<{}, {value?: number | string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '-1.00000000000000'
        }
    }

    handleChange = (value: number) => {
        console.log('demo-value', value)
        this.setState({
            value
        })
    }

    render() {
        return (
            <InputNumber
                iconStyle='one'
                align='right'
                precision={18}
                toNumber={false}
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}

export default Demo3
