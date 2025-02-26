import React from 'react'
import BaseDemo from './anchorDemo1'

describe('Anchor View', () => {
    it('anchor vertical', () => {
        cy.mount((
            <BaseDemo offsetTop={150} />
        ))
        // cy.wait(2000)
        cy.compareSnapshot('anchor-vertical')
    })
    it('anchor horizontal', () => {
        cy.mount((
            <BaseDemo direction="horizontal" />
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('anchor-horizontal')
    })
})