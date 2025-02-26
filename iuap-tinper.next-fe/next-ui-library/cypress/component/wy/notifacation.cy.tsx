import React from 'react';

import {Notification, Button} from '../../../../packages';
import Demo1 from './notificationDemo';

Notification.newInstance({position: 'bottomRight'}, _n => {});
const ColorPickerDemo = (props: any) => {
    const simpleFn = (color: any) => {
        Notification![color]({
            title: '通知',
            content: <span>这是一个提示{color}</span>,
            onClose() {
                console.log('simple close');
            },
            ...props
        });
    }
    return  <div className="demoPadding">
    <Button colors="secondary" onClick={()=>simpleFn(props.colors)}>simple show</Button>
</div>
}

describe('notification.cy.tsx', () => {
    const colors = ['success', 'info', 'error', 'warning'];
    colors.forEach(color => {
        it(`it should has a color named ${color}`, () => {
            cy.mount((<ColorPickerDemo colors={color} />));
            cy.get('.wui-button').eq(0).click();
            cy.wait(500)
            cy.compareSnapshot(`${color}_notification`)

        })
    });
    beforeEach(()=> {
        Notification.destroy()
    })
    it(`it should has different position`, () => {
        cy.mount((<Demo1 />));
        cy.get('.wui-button').eq(0).click();
        cy.wait(500)
        cy.compareSnapshot(`top_right_notification`)

    })
})