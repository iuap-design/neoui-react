/**
 * @title InputGroup 两边是可选Addon、Button
 * @description
 */
import {Button, Input, InputGroup} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component {
    render() {
        return (
            <div className='demo-input-group'>
                <InputGroup style={{marginBottom: '5px', width: '50%'}}>
                    <InputGroup.Button>
                        <Button>https://</Button>
                    </InputGroup.Button>
                    <Input type='text'/>
                    <InputGroup.Addon>.com</InputGroup.Addon>
                </InputGroup>
                <InputGroup style={{marginBottom: '5px', width: '50%'}}>
                    <InputGroup.Addon>http://</InputGroup.Addon>
                    <Input type='text'/>
                </InputGroup>
                <InputGroup style={{marginBottom: '5px', width: '50%'}}>
                    <Input type='text'/>
                    <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
            </div>
        )
    }
}

export default Demo1
