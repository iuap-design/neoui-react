/**
 * @title 密码框
 * @description 设置type="password"属性，让Input组件有密码显示隐藏功能。
 */

import {Input, Icon} from '@tinper/next-ui'
import React, {Component} from 'react'
const {Password} = Input

interface DemoState {
    value: string
    value2: string
    visible: boolean
}

export default class Demo12 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: '默认click切换显示隐藏',
            value2: 'hover切换显示隐藏',
            visible: true
        }
    }

    onChange = (value: string) => {
        this.setState({value})
        console.log('change ' + value)
    }

    onChange2 = (value2: string) => {
        this.setState({value2})
        console.log('change2 ' + value2)
    }

    onVisibleChange = (visible: boolean) => {
        console.log('visible chagne ----> ', visible)
        this.setState({visible})
    }

    iconRender = (passwordVisible: boolean) => (passwordVisible ? <Icon type='uf-eye' /> : <Icon type='uf-eye-o' />)

    render() {
        const style = {marginTop: '10px', marginLeft: '10px', width: '200px'}
        let {value, value2, visible} = this.state
        return (
            <div className='demo12'>
                <Input.Password
                    style={style}
                    placeholder='Password 默认click切换显示隐藏'
                    allowClear
                    value={value}
                    onChange={this.onChange}
                    iconRender={this.iconRender}
                />
                <Password
                    style={style}
                    placeholder='Password hover切换显示隐藏'
                    trigger='hover'
                    prefix={<Icon type='uf-security-2' />}
                    passwordVisible={visible}
                    allowClear
                    value={value2}
                    onChange={this.onChange2}
                    onVisibleChange={this.onVisibleChange}
                    iconRender={this.iconRender}
                />
                <Password
                    style={style}
                    placeholder='Password 有小眼睛无清除'
                    value='456'
                    allowClear={false}
                    visibilityToggle
                    iconRender={this.iconRender}
                    bordered='bottom'
                    requiredStyle
                />
                <Password style={style} placeholder='Password 禁用且密码不可见' disabled value='123' />
                <Password
                    style={style}
                    placeholder='Password 无切换显示隐藏图标'
                    visibilityToggle={false}
                    value='123'
                    bordered='bottom'
                    requiredStyle
                />
                <Password
                    style={style}
                    placeholder='Password 老版本用suffix自定义后缀(不推荐)'
                    value='456'
                    //  iconRender可以实现任意后缀，不再推荐suffix
                    suffix={<Icon type='uf-pass-o' />}
                />
            </div>
        )
    }
}
