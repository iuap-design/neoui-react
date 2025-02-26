import React from 'react';

import {Message, Button} from '../../../../packages';

const onClick = function (props = {}) {
    Message.destroy();
    Message.create({ content: '单据提交成功。', color: "light", ...props});
};
const Demo1 = (props: any) => {
    return (<div className="paddingDemo">
            <Button shape="border" onClick={() => onClick(props)}>
                消息
            </Button>
        </div>)
}

describe('Message.cy.tsx', () => {
    const colors = ['success', 'info', 'error', 'warning', 'dark', 'light', 'danger'];
    colors.forEach(color => {
        it(`it should has a color named ${color}`, () => {
            cy.mount((<Demo1 color={color} />));
            cy.get('.wui-button').eq(0).click();
            cy.wait(800)
            cy.compareSnapshot(`${color}_message`)

        })
    });
    // beforeEach(()=> {
    //     Notification.destroy()
    // })
    it(`it should has init message`, () => {
        cy.mount((<Demo1 />));
        cy.get('.wui-button').eq(0).click();
        cy.wait(500)
        cy.compareSnapshot(`init_message`)
    })
    it(`it should has no icon `, () => {
        cy.mount((<Demo1 showIcon={false} />));
        cy.get('.wui-button').eq(0).click();
        cy.wait(500)
        cy.compareSnapshot(`no_icon_message`)
    })
    it(`it should has custom_icon `, () => {
        cy.mount((<Demo1 icon='uf uf-tinperzc-col' />));
        cy.get('.wui-button').eq(0).click();
        cy.wait(500)
        cy.compareSnapshot(`custom_icon`)
    })
    it(`it should has style `, () => {
        cy.mount((<Demo1 innerStyle={{with: '400px',background: '#00f'}} wrapperStyle={{with: '600px',background: '#0f0'}}/>));
        cy.get('.wui-button').eq(0).click();
        cy.wait(500)
        cy.compareSnapshot(`style`)
    })
})