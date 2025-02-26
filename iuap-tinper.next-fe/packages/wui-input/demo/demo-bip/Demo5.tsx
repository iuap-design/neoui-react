/**
 * @title 搜索框
 * @description 通过设置type="search"属性，让Input组件有搜索功能。type="search"下，若disabled则allowClear不可用
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo5 extends Component<{}, {value: string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 'test'
        }
    }

    onChange = (value: string) => {
        this.setState({value})
        console.log('change ' + value)
    }

    onClick: React.MouseEventHandler<HTMLInputElement> = e => {
        console.log('click ', e)
    }

    onSearch = (value: string) => {
        console.log('onSearch ' + value)
    }

    onBlur = (value: string) => {
        console.log('onBlur ' + value)
    }

    render() {
        return (
            <div className='demo5' style={{display: 'grid', 'gridTemplateColumns': "repeat(2, 1fr)"}}>
                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    allowClear
                    maxLength={5}
                    type='search'
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box', margin: '0 20px'}}
                    value={this.state.value}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    disabled
                    type='search'
                />
            </div>
        )
    }
}
