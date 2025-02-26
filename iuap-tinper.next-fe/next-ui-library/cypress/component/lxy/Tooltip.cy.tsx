import React from 'react'
import {Button, Tooltip} from '@tinper/next-ui'
import TooltipDemo from './Tooltip_placement'

Cypress.config({
    viewportWidth: 600,
    viewportHeight: 500
})

const style = {marginLeft: 20, marginTop: 10, marginBottom: 20, width: '80%'}
let tip = <div>这是一个很强的提醒</div>
let tip2 = (
  <div>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
      <p>这是一个很强的提醒</p>
  </div>
)

describe('basic tooltip', () => {
    it('should mount basic tooltip placement', () => {
        cy.mount(<TooltipDemo />)
        cy.wait(200)
        cy.viewport(800, 400);
        cy.compareSnapshot('basic_tooltip')
    })

    // 反白
    it('should mount bg inverse', () => {
        cy.mount(
            <Tooltip arrowPointAtCenter inverse visible overlay={tip}>
                <Button colors='primary'>反白显示</Button>
            </Tooltip>
        )
        cy.compareSnapshot('tooltip_inverse')
    })

    // tooltip弹窗
    it('tooltip placement、color、autoAdjustOverflow、overlayInnerStyle', () => {
        cy.mount(
            <div style={style}>
                <Tooltip
                    autoAdjustOverflow
                    overlay={tip2}
                    overlayInnerStyle={{width: 300, height: 800, fontSize: 20}}
                    visible
                    color='#f0f'
                    placement='top'
                >
                    <Button shape='border' style={style}>我是button</Button>
                </Tooltip>
            </div>
        )
        cy.compareSnapshot('autoAdjustOverflow_position')
    })
})
