import React from 'react';
import { Select } from '../../../../packages';
import "cypress-real-events/support";
const Option = Select.Option
describe('select.cy.tsx', () => {
    it('select allowclear hover', () => {
        cy.mount(<Select defaultValue="svetlana" allowClear style={{ width: 200 }}>
            <Option value="svetlana">Svetlana</Option>
            <Option value={[1, 2]}>Array</Option>
        </Select>)
        cy.compareSnapshot('before-hover')
        cy.get('.uf-close-c').realHover() //hover 操作
        // cy.compareSnapshot截图不到hover效果，要用下面的方法
        cy.compareWithOptions('compare-clear-hover', {
            capture: 'runner',
            clip: { x: 460, y: 80, width: 800, height: 600 }
        })
    });
})