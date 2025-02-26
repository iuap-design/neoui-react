import React from 'react'
import {Alert, AlertProps} from '@tinper/next-ui'
import {prefix} from '../../../../packages/wui-core/src'

Cypress.config({
  viewportWidth: 600,
  viewportHeight: 200,
})

const colorsArr: Array<AlertProps['colors']> = ['success', 'info', 'warning', 'danger']
const style = {marginRight: 20, marginTop: 10}

describe('Alert', () => {
    it('should mount', () => {
        cy.mount(<Alert>Default Alert</Alert>)
        cy.compareSnapshot('default')
    })
})

const list = colorsArr.map(color => {
    return (
        <>
            <Alert style={style} colors={color}>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} showIcon={false}>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} dark>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} dark showIcon={false}>{`${color} Alert`}</Alert>

            <Alert style={style} colors={color} closable={false}>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} closable={false} showIcon={false}>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} closable={false} dark>{`${color} Alert`}</Alert>
            <Alert style={style} colors={color} closable={false} dark showIcon={false}>{`${color} Alert`}</Alert>
        </>
    )
})
describe('Alert', () => {
    // 默认状态
    it('should mount colors with dark, showIcon, closable', () => {
        cy.mount(<>{list}</>)
        cy.compareSnapshot('colors')
    })

    // hover态
    it('should mount colors with dark, showIcon, closable on hover', () => {
        cy.mount(<>{list}</>)
        list.map((_item, i) => {
            // cy.get(`.${prefix}-alert-close`).eq(i).trigger('mouseover')
            // cy.wait(200)
            // cy.compareSnapshot('hover')

        cy.get(`.${prefix}-alert-close`).eq(i).realHover()
        cy.compareWithOptions('hover' + i, {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 400, height: 200}
        })
        })
    })
})
