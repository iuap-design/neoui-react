/**
 * @title 文本对齐方式
 * @description
 */

import {Input} from '@tinper/next-ui';
import React, {Component} from 'react';

export default class Demo4 extends Component {
    render() {
        return (
            <div className='demo4'>
                <Input value='测试文本' allowClear />
                <br />
                <br />
                <Input align='right' value='测试文本' allowClear />
                <br />
                <br />
                <Input type='search' align='center' value='测试文本' allowClear />
                <br />
                <br />
                <Input type='password' align='right' value='测试文本' allowClear />
                <br />
                <br />
                <Input type='textarea' align='center' value='测试文本' allowClear />
                <br />
                <br />
                <Input prefix='前缀' suffix='后缀' align='right' value='测试文本' allowClear />
            </div>
        );
    }
}
