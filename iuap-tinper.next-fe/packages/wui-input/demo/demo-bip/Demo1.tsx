/**
 * @title 不同size Input
 * @description size=xs/sm/md/nm/lg
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component<{}, {value: string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 'test'
        }
    }

    onChange = (value: string) => {
        console.error('111--------', value + '000')
        this.setState({
            value
        })
    }

    render() {
        let style = {marginTop: '10px', width: '200px'}
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: '10px'}}>
                <Input
                    placeholder={'请输入'}
                    style={style}
                    value={this.state.value}
                    type='search'
                    trim
                    onChange={this.onChange}
                    size='xs'
                    allowClear
                />

                <Input
                    style={style}
                    value={this.state.value}
                    type='password'
                    trim='left'
                    onChange={this.onChange}
                    size='sm'
                />

                <Input
                    allowClear
                    autoFocus
                    style={style}
                    defaultValue={0}
                    maxLength={10}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Input style={style} maxLength={10} showMaxLabel value={this.state.value} onChange={this.onChange} />
                <Input style={style} value={this.state.value} onChange={this.onChange} size='nm' allowClear />

                <Input style={style} value={this.state.value} onChange={this.onChange} size='lg' />
                <Input
                    placeholder={'请输入'}
                    style={style}
                    value={this.state.value}
                    type='textarea'
                    trim='right'
                    onChange={this.onChange}
                    size='lg'
                />
            </div>
        )
    }
}

export default Demo1
