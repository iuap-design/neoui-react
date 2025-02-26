import React from 'react'
import {Input, InputGroup, Dropdown, Menu, Button, Icon, Tooltip, InputProps} from '@tinper/next-ui'
import {prefix} from '../../../../packages/wui-core/src'

Cypress.config({
    viewportWidth: 300,
    viewportHeight: 400
})

const style = {marginLeft: 20, marginTop: 10, marginBottom: 20, width: '80%'}

const Inputs = (props: InputProps) => (
    <>
        <Input placeholder='input' {...props} />
        <Input placeholder='search' type='search' {...props} />
        <Input placeholder='password' type='password' {...props} />
        <Input placeholder='textarea' type='textarea' {...props} />
    </>
)

const InputList = (props: InputProps) => (
    <>
        <Inputs value='abc123' style={style} size='sm' {...props} />
        <Inputs value='abc123' style={style} size='lg' {...props} />
        <Inputs value='abc123' showClose style={style} {...props} />
        <Inputs value='abc123' showClose style={style} disabled {...props} />
    </>
)

const MenuItem = Menu.Item
const menu1 = (
    <Menu multiple>
        <MenuItem key='1'>借款合同</MenuItem>
        <MenuItem key='2'>抵/质押合同</MenuItem>
    </Menu>
)

const sizeArr: any = ['xs', 'sm', 'md', 'nm', 'lg', 'default', 'small', 'middle', 'large'];
const InputSizeDemo = (props: any) => {
    let comps: JSX.Element[] = [];
    sizeArr.forEach((size: any) => {
        comps.push(
            <>
                <Input size={size} {...props} />
                <Input size={size} {...props} type='search' />
                <Input size={size} {...props} type='password' />
                <Input size={size} {...props} disabled />
                <Input size={size} {...props} disabled type='search' />
                <Input size={size} {...props} disabled type='password' />
                <Input size={size} {...props} disabled enterButton />
                <Input size={size} {...props} disabled prefix='前缀' suffix='后缀' />

                <InputGroup size={size} {...props} style={{marginBottom: '5px', width: '50%'}}>
                    <InputGroup.Button shape='border'>
                        <Dropdown overlay={menu1} visible>
                            <Button shape='border'>
                                带有分割线的下拉 <i className='uf uf-arrow-down'> </i>
                            </Button>
                        </Dropdown>
                    </InputGroup.Button>
                    <Input type='text' size={size} {...props} />
                    <InputGroup.Button>
                        <Button icon='uf-search'></Button>
                    </InputGroup.Button>
                </InputGroup>
            </>
        );
    });
    return <>{comps}</>;
};

describe('input', () => {
    // 默认态、禁用输入框，仅输入框/有值
    it('should mount basic picker input', () => {
        cy.mount(<InputList />)
        cy.wait(200)
        cy.compareSnapshot('basic_input')
        cy.mount(<InputSizeDemo placeholder='请输入' />)
        cy.wait(200)
        cy.compareSnapshot('basic_input_size')
        cy.mount(<InputSizeDemo value='abc' allowClear />)
        cy.wait(200)
        cy.compareSnapshot('basic_input_clear_size')
        cy.mount(<InputSizeDemo bordered='bottom' />)
        cy.compareSnapshot('basic_input_border_bottom')
        cy.mount(<InputSizeDemo bordered='bottom' value='abc' allowClear/>)
        cy.compareSnapshot('basic_input_clear_border_bottom')
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount clear icon', () => {
        cy.mount(<Inputs value='abc123' showClose />)
        cy.get(`.${prefix}-input`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
        cy.get(`.${prefix}-input-search`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_search_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
        cy.get(`.${prefix}-input-password`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_password_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
        cy.get(`.${prefix}-textarea`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_textarea_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount input clear icon', () => {
        cy.mount(<Input value='abc123' showClose />)
        cy.get(`.${prefix}-input`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount search clear icon', () => {
        cy.mount(<Input type='search' value='abc123' showClose />)
        cy.get(`.${prefix}-input-search`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_search_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount clear icon', () => {
        cy.mount(<Input type='password' value='abc123' showClose />)
        cy.get(`.${prefix}-input-password`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_password_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
    })

    // hover\disabled态，显示清空图标，且可正常清空
    it('should mount clear icon', () => {
        cy.mount(<Input type='textarea' value='abc123' showClose />)
        cy.get(`.${prefix}-textarea`).eq(0).realHover()
        cy.wait(300)
        cy.viewport(400, 200)
        cy.compareWithOptions('hover_input_textarea_clearIcon', {
            capture: 'runner',
            clip: {x: 900, y: 10, width: 500, height: 200}
        })
    })

    // 点击清空按钮
    it('should clear value and show placeholder', () => {
        cy.mount(<Inputs value='abc123' />)
        cy.get(`.${prefix}-input-suffix`).eq(0).click()
        cy.compareSnapshot('click_input_clearIcon')
    })

    // 前后缀
    it('should render suffix and prefix', () => {
        cy.mount(
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
        )
        cy.compareSnapshot('input_prefix_suffix')
    })

    // Input.Group
    it('should render Input.Group', () => {
        cy.mount(
            <Input.Group>
                <Input.Group.Button>
                    <Button>https://</Button>
                </Input.Group.Button>
                <Input type='text' />
                <Input.Group.Addon>.com</Input.Group.Addon>
            </Input.Group>
        )
        cy.compareSnapshot('input_group')
    })

    // password 小眼睛
    it('should render password', () => {
        cy.mount(
            <Input.Password
                placeholder='Password 默认click切换显示隐藏'
                showClose
                value={'abc123'}
                iconRender={(passwordVisible: boolean) =>
                    passwordVisible ? <Icon type='uf-eye' /> : <Icon type='uf-eye-o' />
                }
            />
        )
        cy.compareSnapshot('input_password')
        cy.get(`.${prefix}-input-password-icon`).eq(0).click()
        cy.compareSnapshot('input_password_visible')
    })

    // textarea 多行
    it('should render textarea', () => {
        cy.mount(
            <>
                <Input
                    type='textarea'
                    style={style}
                    autoSize={{minRows: 3, maxRows: 5}}
                    showClose
                    showMaxLabel
                    allowInputOverMax={false}
                    maxLength={20}
                    placeholder='超长后禁止输入,可清空'
                    value='多情自古伤离别，更那堪冷落清秋节。今宵酒醒何处，杨柳岸、晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说。'
                />
                <Input
                    type='textarea'
                    style={style}
                    autoSize={{minRows: 3, maxRows: 5}}
                    maxLength={20}
                    allowInputOverMax={false}
                    placeholder='超长后禁止输入，不显示数字角标'
                    value='多情自古伤离别，更那堪冷落清秋节。今宵酒醒何处，杨柳岸、晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说。'
                />
                <Input
                    type='textarea'
                    style={style}
                    maxLength={20}
                    placeholder='超长后可继续输入，不显示数字角标'
                    value='多情自古伤离别，更那堪冷落清秋节。今宵酒醒何处，杨柳岸、晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说。'
                />
            </>
        )
        cy.compareSnapshot('input_textarea')
    })
})
