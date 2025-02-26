import React from 'react'
import { Drawer, Modal, Icon } from '../../../../packages'

describe('drawer view', () => {
    let prefix = 'wui-drawer'
    it('placement right', () => {
        cy.mount((<Drawer placement="right" title="Drawer" visible>
            <div>Drawer内容</div>
        </Drawer>));
        cy.compareSnapshot('placement-right')
    });
    it('placement top', () => {
        cy.mount((<Drawer placement="top" title="Drawer" visible>
            <div>Drawer内容</div>
        </Drawer>));
        cy.compareSnapshot('placement-top')
    });
    it('mask is hidden', () => {
        cy.mount((<Drawer placement="right" title="Drawer" closable={true} mask={false} visible>
            <div>Drawer内容</div>
        </Drawer>));
        cy.wait(1000)
        cy.compareSnapshot('mask-hidden')
    });
    it('mask click', () => {
        cy.mount((<Drawer placement="right" title="Drawer" closable mask visible>
            <div>Drawer内容</div>
        </Drawer>));
        cy.get(`.${prefix}-mask`).click()
        cy.get(`.${prefix}-mask`).should('have.css', 'width', '0px')
        cy.compareSnapshot('mask-click')
    });
    it('drawer widthHeight', () => {
        cy.mount((<Drawer placement="right" title="Drawer" width={400} height={400} mask={false} closable visible className="widthTest">
            <div>Drawer内容</div>
        </Drawer>));
        cy.get(`.widthTest .${prefix}`).should('have.css', 'width', '400px').and('have.css', 'height', '400px')
        cy.compareSnapshot('mask-widthHeight')
    });
    it('drawer push', () => {
        cy.mount((<Drawer placement="right" title="Drawer" width={500} push={true} closable mask visible>
            <div id="openSecondDrawer">一级抽屉</div>
            <Drawer placement="right" title="Drawer2" width={320} visible={true} zIndex={1000}>
            <div>二级抽屉</div>
            </Drawer>
        </Drawer>));
        cy.compareSnapshot('mask-push')
    });
    it('header and footer', () => {
        cy.mount((<Drawer placement="right" title="Drawer" hasHeader={false} footer={'Drawer的footer'} visible>
            <div>Drawer内容</div>
        </Drawer>));
        cy.compareSnapshot('placement-headerFooter')
    });
    it('drawer moreContent', () => {
        cy.mount((
            <Drawer placement="top" showClose title={'头部'} visible>
                <div style={{height: '1000px'}}>占位</div>
            </Drawer>
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('drawer-content-scroll')
    })
    it('drawer nested modal', () => {
        cy.mount((
            <Drawer placement="top" showClose title={'头部'} visible>
                <div style={{height: '600px', width: '600px'}}>
                    <Modal show>
                        <Modal.Header>
                            <Modal.Title>标题</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div>footer</div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Drawer>
        ))
        cy.viewport(600, 600)
        cy.wait(1000)
        cy.compareSnapshot('drawer-nested-modal')
    })
    it('drawer closeIcon', () => {
        cy.mount((
            <Drawer placement="top" showClose title={'头部'} visible closable closeIcon={<Icon type="uf-qq" />}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        ))
        cy.viewport(600, 600)
        cy.compareSnapshot('drawer-closeIcon')
    })
})