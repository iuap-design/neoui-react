/**
 *
 * @title  设置前缀和后缀组件
 * @description 设置前后缀的文字，组件功能
 *
 */

import {InputNumber, Select} from '@tinper/next-ui'
import React, {Component} from 'react'

const Option = Select.Option

class Demo18 extends Component {
    render() {
        return (
            <div className='demo18'>
                <div>
                    <InputNumber
                        className='demo18-input-number'
                        iconStyle='one'
                        min={-9999}
                        max={99999}
                        size={'sm'}
                        addonBefore={'宽'}
                        addonAfter={'米'}
                    />
                </div>
                <br/>

                <div className='http'>
                    <InputNumber
                        className='demo18-input-number'
                        iconStyle='one'
                        min={-9999}
                        max={99999}
                        addonBefore={
                            <Select defaultValue={'http'}>
                                <Option value={'http'}>http</Option>
                                <Option value={'https'}>https</Option>
                            </Select>
                        }
                    />
                </div>
                <br/>

                <div className='com'>
                    <InputNumber
                        className='demo18-input-number'
                        placeholder='demo18'
                        iconStyle='one'
                        size='lg'
                        min={-9999}
                        max={99999}
                        addonAfter={
                            <Select defaultValue={'com'} size='lg'>
                                <Option value={'com'}>com</Option>
                                <Option value={'cn'}>cn</Option>
                            </Select>
                        }
                        addonBefore={
                            <Select defaultValue={'http'} size='lg'>
                                <Option value={'http'}>http</Option>
                                <Option value={'https'}>https</Option>
                            </Select>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default Demo18
