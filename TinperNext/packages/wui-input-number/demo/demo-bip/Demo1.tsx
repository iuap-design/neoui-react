/**
 *
 * @title 基础示例
 * @description 最简单输入控制。最小值为-200000，最大值为2000000，超出范围显示提示
 * @type bip
 */

import {InputNumber, ConfigProvider} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component<{}, {value?: number | string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '333.1'
        }
    }

    handleChange = (value: number) => {
        console.log('demo-value', value)
        this.setState({
            value
        })
    }
    handleBtnClick = (type: 'up' | 'down', value: number) => {
        console.log(type, value)
    }

    toThousands(number: string | number) {
        let decimalSeparator = '.', thousandSeparator = ','
        if (number === '') return ''
        if (number === '0') return '0'
        let num = (number || 0).toString()
        if (!isNaN(+num)) {
            num = num.replace('.', decimalSeparator) // 用户传入的正常数字'22.333'区别于千分位`.`格式化出来的数据'22.333'，小数点转换为与首选项配置格式
        }
        let [integer, decimal = ''] = num.split(decimalSeparator)
        const hasMinus = integer.includes('-')
        integer = integer.replace('-', '')
        let result = ''
        while (integer.length > 3) {
            result = thousandSeparator + integer.slice(-3) + result
            integer = integer.slice(0, integer.length - 3)
        }
        if (integer) {
            result = integer + result
            if (num == decimalSeparator || num.indexOf(decimalSeparator) == num.length - 1) {
                result = result + decimalSeparator + decimal
            } else if (decimal) {
                result = result + decimalSeparator + decimal
            }
        }
        if (hasMinus) {
            result = '-' + result
        }
        return result
    }

    render() {
        return (
            <ConfigProvider>
                <InputNumber
                    id='demo1-id'
                    fieldid='demo1-fieldid'
                    iconStyle='one'
                    style={{width: '200px'}}
                    min={-200000}
                    max={2000000}
                    autoFix
                    toNumber={false}
                    displayCheckPrompt
                    value={this.state.value}
                    format={(value: string) => this.toThousands(value)}
                    onFocus={(value: string) => {
                        this.setState({
                            value
                        })
                    }}
                    onChange={this.handleChange}
                    onKeyDown={(e) => { // 用于领域的特定需求，如用户输入等号时触发合计等特定事件
                        if (e.code === 'Equal') {
                            console.log('111-------keydown', e)
                        }
                    }}
                    handleBtnClick={this.handleBtnClick}
                    toThousands={false}
                    precision={2} // 有format也需配合传入精度，过程中生效
                />
            </ConfigProvider>
        )
    }
}

export default Demo1
