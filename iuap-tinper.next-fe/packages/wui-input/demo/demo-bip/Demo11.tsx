/**
 * @title fieldId示例
 * @description
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo11 extends Component {
    render() {
        return (
            <div className='demo11'>
                <Input fieldid='demo11-fieldid1' allowClear />
                <br />
                <br />
                <Input type='search' fieldid='demo11-fieldid2' allowClear />
                <br />
                <br />
                <Input type='textarea' fieldid='demo11-fieldid3' allowClear/>
                <br />
                <br />
                <Input fieldid='demo11-fieldid4' prefix='前缀' suffix='后缀' allowClear />
            </div>
        )
    }
}
