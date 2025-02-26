import React from 'react'
import {Button, Popconfirm} from '@tinper/next-ui'
import PopconfirmDemo from './Popconfirm_demo'

Cypress.config({
    viewportWidth: 300,
    viewportHeight: 300
})

describe('basic popconfirm', () => {
    it('should mount basic Popconfirm', () => {
        cy.mount(<PopconfirmDemo />)
        cy.wait(400)
        cy.compareSnapshot('popconfirm_title')
    })

    it('should mount Popconfirm btn', () => {
        cy.mount(
            <Popconfirm
                rootClose
                placement='bottom'
                content='我是弹窗'
                visible
                close_btn={<Button>确认按钮</Button>}
                cancel_btn={<Button>取消按钮</Button>}
            >
                <Button colors='primary' style={{margin: 'auto 10px'}}>
                    按钮
                </Button>
            </Popconfirm>
        )
        cy.wait(200)
        cy.compareSnapshot('popconfirm_btn')
    })

    // 多语
    it('should mount Popconfirm locale', () => {
        cy.mount(
            <Popconfirm placement='bottom' content='我是弹窗' visible locale='en'>
                <Button colors='primary' style={{margin: 'auto 10px'}}>
                    按钮
                </Button>
            </Popconfirm>
        )
        cy.wait(200)
        cy.compareSnapshot('popconfirm_locale')
    })
})
