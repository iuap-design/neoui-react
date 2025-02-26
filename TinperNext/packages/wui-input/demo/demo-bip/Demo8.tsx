/**
 * @title 输入框组
 * @description Input.Group、Input.Button示例
 */
import {Button, Input} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo8 extends Component {
    render() {
        return (
            <Input.Group>
                <Input.Group.Button>
                    <Button>https://</Button>
                </Input.Group.Button>
                <Input type='text' />
                <Input.Group.Addon>.com</Input.Group.Addon>
            </Input.Group>
        )
    }
}

export default Demo8
