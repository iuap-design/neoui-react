/**
 * @title 使用前后缀
 * @description 设置 prefix、suffix
 * @type other
 */

import {Icon, Input, Tooltip} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo9 extends Component {
    render() {
        return (
            <div className='demo9'>
                <Input
                    style={{
                        width: '200px',
                        boxSizing: 'border-box',
                        marginRight: '20px'
                    }}
                    prefix='￥'
                />
                <Input
                    style={{
                        width: '200px',
                        boxSizing: 'border-box',
                        marginRight: '20px'
                    }}
                    suffix='RMB'
                />
                <Input
                    style={{
                        width: '200px',
                        boxSizing: 'border-box',
                        marginRight: '20px'
                    }}
                    prefix='前缀'
                    suffix='后缀'
                    disabled
                />
                <Input
                    style={{
                        width: '200px',
                        boxSizing: 'border-box',
                        marginRight: '20px'
                    }}
                    prefix={<Icon type='uf-caven' />}
                    placeholder='Enter your username'
                    suffix={
                        <Tooltip title='Extra information'>
                            <Icon type='uf-exc-c-o' />
                        </Tooltip>
                    }
                />
                <Input
                    style={{
                        width: '200px',
                        boxSizing: 'border-box',
                        marginRight: '20px'
                    }}
                    prefix={<Icon type="uf-zuzhi" />}
                    suffix={
                        <Icon type="uf-symlist" />
                    }
                />
            </div>
        )
    }
}
