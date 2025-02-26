import React from 'react'
import { Clipboard } from '../../../../packages'

describe('clipbioard', () => {
    it('clipboard init', () => {
        cy.mount((
            <>
                <div style={{height: '100px'}}></div>
                <Clipboard action="copy" text="默认复制-我将被复制到剪切板"></Clipboard>
            </>
        ))
        cy.wait(1000)
        cy.compareSnapshot('clipboard-init')
    })
    it('clipboard mouseenter', () => {
        cy.mount((
            <>
                <div style={{height: '100px'}}></div>
                <Clipboard action="copy" text="默认复制-我将被复制到剪切板"></Clipboard>
            </>
        ))
        cy.get('.wui-clipboard').trigger('mouseover')
        cy.wait(1000)
        cy.compareSnapshot('clipboard-mouseenter')
    })
    it('clipboard locale', () => {
        cy.mount((
            <>
                <div style={{height: '100px'}}></div>
                <Clipboard action="copy" locale={'zh-cn'} text="默认复制-我将被复制到剪切板"></Clipboard>
                <div style={{height: '100px'}}></div>
                <Clipboard action="copy" locale={'zh-tw'} text="默认复制-我将被复制到剪切板"></Clipboard>
                <div style={{height: '100px'}}></div>
                <Clipboard action="copy" locale={'en-us'} text="默认复制-我将被复制到剪切板"></Clipboard>
            </>
        ))
        cy.get('.wui-clipboard').eq(0).trigger('mouseover')
        cy.get('.wui-clipboard').eq(1).trigger('mouseover')
        cy.get('.wui-clipboard').eq(2).trigger('mouseover')
        cy.wait(1000)
        cy.viewport(300, 300)
        cy.compareSnapshot('clipboard-locale')
    })
})