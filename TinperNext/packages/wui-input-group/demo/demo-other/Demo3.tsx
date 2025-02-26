/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import {Button, Dropdown, Input, InputGroup, Menu} from '@tinper/next-ui'
import React, {Component} from 'react'

let MenuItem = Menu.Item
let Divider = Menu.Divider

function onSelect({key}: {key: string}) {
    console.log(`${key} selected`)
}

function onVisibleChange(visible: boolean) {
    console.log(visible)
}

const menu1 = (
    <Menu multiple onSelect={onSelect}>
        <MenuItem key='1'>借款合同</MenuItem>
        <MenuItem key='2'>抵/质押合同</MenuItem>
        <MenuItem key='3'>担保合同</MenuItem>
        <MenuItem key='4'>联保合同</MenuItem>
        <Divider/>
        <MenuItem key='5'>合同审批</MenuItem>
        <MenuItem key='6'>抵/质押合同跟踪</MenuItem>
    </Menu>
)

class Demo3 extends Component {
    render() {
        return (
            <div className='demo-input-group'>
                <InputGroup style={{marginBottom: '5px', width: '50%'}} bordered={false} >
                    <InputGroup.Button>
                        <Button>http://</Button>
                    </InputGroup.Button>
                    <Input type='text' bordered={false} placeholder='无边框' requiredStyle/>
                </InputGroup>

                <InputGroup style={{marginBottom: '5px', width: '50%'}} bordered='bottom' >
                    <InputGroup.Button>
                        <Button>http://</Button>
                    </InputGroup.Button>
                    <Input type='text' bordered='bottom' requiredStyle/>
                </InputGroup>

                <InputGroup style={{marginBottom: '5px', width: '50%'}} bordered='bottom'>
                    <InputGroup.Button shape='border'>
                        <Dropdown
                            trigger={['click']}
                            overlay={menu1}
                            animation='slide-up'
                            onVisibleChange={onVisibleChange}
                        >
                            <Button shape='border'>
								带有分割线的下拉 <i className='uf uf-arrow-down'> </i>
                            </Button>
                        </Dropdown>
                    </InputGroup.Button>
                    <Input type='text' bordered='bottom' requiredStyle/>
                    <InputGroup.Button>
                        <Button icon='uf-search'></Button>
                    </InputGroup.Button>
                </InputGroup>
                <InputGroup style={{marginBottom: '5px', width: '50%'}} bordered='bottom'>
                    <Input type='text' bordered='bottom' requiredStyle disabled value={12345}/>
                    <InputGroup.Button>
                        <Button icon='uf-search'></Button>
                    </InputGroup.Button>
                </InputGroup>
            </div>
        )
    }
}

export default Demo3
