/**
 * @title 搜索框loading及自定义按钮
 * @description 通过设置loading属性，显示搜索中状态。
 */

import {Input, Button, Icon} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo14 extends Component<{}, {value: string}> {
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
        console.log('搜索 ' + value)
    }

    render() {
        return (
            <div className='demo14' style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridRowGap: '10px'}}>
                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    icon={<Icon type='uf-star' />}
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    enterButton
                    icon={
                        <Icon
                            type='uf-star'
                            onClick={() => {
                                console.log(33333)
                            }}
                        />
                    }
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    enterButton='search'
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    enterButton='search'
                    icon={
                        <Icon
                            type='uf-star'
                            onClick={() => {
                                console.log(33333)
                            }}
                        />
                    }
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    enterButton={<Button style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>搜索</Button>}
                    icon={
                        <Icon
                            type='uf-star'
                            onClick={() => {
                                console.log(444)
                            }}
                        />
                    }
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    loading
                />

                <Input
                    style={{width: '200px', boxSizing: 'border-box'}}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    allowClear
                    maxLength={5}
                    type='search'
                    loading
                    enterButton='Search'
                    fieldid='12345'
                />
            </div>
        )
    }
}
