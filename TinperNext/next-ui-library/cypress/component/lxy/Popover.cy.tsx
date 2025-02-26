import React from 'react'
import PopoverDemo from './Popover_demo'

Cypress.config({
    viewportWidth: 300,
    viewportHeight: 300
})

describe('basic popover', () => {
    it('should mount basic popover title', () => {
        cy.mount(<PopoverDemo />)
        cy.wait(200)
        cy.compareSnapshot('popover_title')
    })
})
