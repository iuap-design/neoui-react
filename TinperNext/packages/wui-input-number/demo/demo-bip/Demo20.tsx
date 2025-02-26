/**
 *
 * @title 占位码遮掩码
 * @description 占位码、遮掩码的使用，配合onFocus使用
 * @type bip
 */

import {InputNumber, ConfigProvider} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo20 extends Component<{}, {value?: number | string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '112234.1'
        }
    }

    handleChange = (value: number) => {
        this.setState({
            value
        })
    }

    render() {
        return (
            <ConfigProvider>
                <InputNumber
                    id='demo20-id'
                    fieldid='demo20-fieldid'
                    iconStyle='one'
                    style={{width: '200px'}}
                    min={-200000}
                    max={2000000}
                    autoFix
                    formatReg="#**##*"
                    toNumber={false}
                    displayCheckPrompt
                    value={this.state.value}
                    onFocus={(value: string) => {
                        this.setState({
                            value
                        })
                    }}
                    onChange={this.handleChange}
                    precision={2} // 有format也需配合传入精度，过程中生效
                />
            </ConfigProvider>
        )
    }
}

export default Demo20
