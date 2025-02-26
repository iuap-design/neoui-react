import React from 'react'
import { Collapse } from '../../../../packages'

const {Panel} = Collapse;
class BaseDemo extends React.Component<any> {
    render() {
        return (
            <Collapse {...this.props}>
                <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
                <Panel header="Panel 2" key="2" showArrow={true}>Panel 2 content</Panel>
            </Collapse>
        )
    }
}

describe('Collapse View', () => {
    it('collapse arrowPosition', () => {
        cy.mount((
            <div>
                <BaseDemo expandIconPosition="right" />
                <br />
                <BaseDemo expandIconPosition="left" />
            </div>
        ))
        cy.compareSnapshot('collapse-arrowPosition')
    })
    it('collapse collapsible', () => {
        cy.mount((
            <div>
                <BaseDemo collapsible={'disabled'} />
                <br />
                <BaseDemo collapsible="header" />
            </div>
        ))
        cy.wait(1000)
        cy.compareSnapshot('collapse-collapsible')
    })
    it('collapse accordion', () => { // 待排查
        cy.mount((
            <BaseDemo accordion />
        ))
        cy.compareSnapshot('collapse-accordion')
    })
    it('collapse ghost', () => {
        cy.mount((
            <div style={{width: '400px', marginLeft: '100px'}}>
                <Collapse ghost={false} bordered>
                    <Panel header="Panel 1" key="1" showArrow={true} expanded>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true} expanded>Panel 2 content</Panel>
                </Collapse>
                <br />
                <Collapse ghost={true}>
                    <Panel header="Panel 1" key="1" showArrow={true} expanded>Panel 1 content</Panel>
                    <Panel header="Panel 2" key="2" showArrow={true} expanded>Panel 2 content</Panel>
                </Collapse>
            </div>
        ))
        cy.compareSnapshot('collapse-ghost')
    })
    it('panel headerFooter', () => {
        cy.mount((
            <Panel header="Panel 1" key="1" showArrow={true} expanded footer="Panel Footer">Panel 1 content</Panel>
        ))
        cy.compareSnapshot('panel-headerFooter')
    })
    it('panel showArrow', () => {
        cy.mount((
            <Collapse>
                <Panel header="Panel 1" key="1" showArrow={true}>Panel 1 content</Panel>
                <Panel header="Panel 2" key="2" showArrow={false}>Panel 2 content</Panel>
            </Collapse>
        ))
        cy.compareSnapshot('panel-showArrow')
    })
    it('panel defaultExpanded', () => {
        cy.mount((
            <Collapse>
                <Panel header="Panel 1" key="1" defaultExpanded={false}>Panel 1 content</Panel>
                <Panel header="Panel 2" key="2" defaultExpanded={true}>Panel 2 content</Panel>
            </Collapse>
        ))
        cy.compareSnapshot('panel-defaultExpanded')
    })
})