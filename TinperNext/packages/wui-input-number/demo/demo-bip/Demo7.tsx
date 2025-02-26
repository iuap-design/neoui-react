/**
 *
 * @title 显示数量级
 * @description 输入过程中显示数量级Tooltip，失焦显示Tag，也可通过integerMarks自定义数量级显示的内容。注意，如用户传入了mark，则
 * @type bip
 */

import {InputNumber, ConfigProvider, Icon} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo7 extends Component<{}, {value?: number | string}> {
    render() {
        return (
            <ConfigProvider>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px'}}>
                    <InputNumber
                        iconStyle='one'
                        style={{width: '200px'}}
                        showMark
                        toThousands
                        displayCheckPrompt
                        onChange={(value) => console.log('1111-------', value)}
                    />
                    <InputNumber
                        iconStyle='one'
                        style={{width: '200px'}}
                        showMark
                        toThousands
                        displayCheckPrompt
                    />
                    <InputNumber
                        style={{width: '200px'}}
                        showMark
                        toThousands
                        integerMarks={[
                            {
                                len: 5,
                                mark: <Icon type="uf-heart-o" />
                            }
                        ]}
                    />
                </div>
            </ConfigProvider>
        )
    }
}

export default Demo7
