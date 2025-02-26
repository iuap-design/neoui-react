import React from 'react';
import Breadcrumb from '../../../../packages/wui-breadcrumb/src';
import Icon from '../../../../packages/wui-icon/src';
import Menu from '../../../../packages/wui-menu/src';


describe('breadcrumb.cy.test', {
    viewportWidth: 600,
    viewportHeight: 200
}, () => {
    it('test base demo', () => {
        cy.mount(
            <Breadcrumb>
                <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                    <Icon type="uf-home"></Icon>
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item href="https://yondesign.yonyou.com/homepage/#/" active>
                    Data
                </Breadcrumb.Item>
            </Breadcrumb>
        );
        cy.compareSnapshot('base');
        // cy.get('a').eq(0).trigger('mouseover');
        // cy.compareSnapshot('base-hover');
        cy.get('a').eq(0).realHover();
        cy.compareWithOptions('base-hover', {
            capture: 'runner',
            clip: {x: 860, y: 80, width: 1200, height: 800 }
        })
    });

    it('test <fillSpace>', () => {
        const menu = (<Menu>
            <Menu.Item key="1">借款合同</Menu.Item>
            <Menu.Item key="2">抵/质押合同</Menu.Item>
            <Menu.Item key="3">担保合同</Menu.Item>
        </Menu>);
        cy.mount(
            <div style={{ width: '450px' }}>
                 <Breadcrumb fillSpace style={{ height: 100 }}>
                     <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
                        Home
                     </Breadcrumb.Item>
                     <Breadcrumb.Item overlay={menu}>
                        Library
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        Library_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        Library_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        data_3
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_1
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_2
                     </Breadcrumb.Item>
                     <Breadcrumb.Item>
                        page_3
                     </Breadcrumb.Item>
                     <Breadcrumb.Item active>
                        page_4
                     </Breadcrumb.Item>
                 </Breadcrumb>
             </div>
        );
        cy.viewport(800, 400);
        cy.get('.wui-breadcrumb-overflow span').eq(0).trigger('mouseover');
        cy.wait(800);
        cy.compareSnapshot('fillSpace');
    })
})