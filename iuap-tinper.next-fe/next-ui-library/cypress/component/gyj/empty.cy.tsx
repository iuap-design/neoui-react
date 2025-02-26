import React from 'react';

import {Empty, Button} from '../../../../packages';


describe('empty.cy.tsx', () => {
    
    it(`it should type`, () => {
        cy.mount(
            <div style={{display: 'flex'}}>
                <Empty fieldid='demo_1' />
                <Empty image="not-found" fieldid='demo_1' />
                <Empty image="no-visualize-data" fieldid='demo_1' />
                <Empty image="no-collect" fieldid='demo_1' />
                <Empty image="no-data" fieldid='demo_1' />
                <Empty image="no-search" fieldid='demo_1' />
                <Empty image="no-network" fieldid='demo_1' />
            </div>);
        cy.compareSnapshot(`empty1`)
    });
    it(`it should have children`, () => {
        cy.mount(
            <div style={{display: 'flex'}}>
                <Empty
                    fieldid="demo"
                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span fieldid="demo_span">
                            Customize <a href="#API">Description</a>
                        </span>
                    }
                >
                    <Button type="primary">Create Now</Button>
                </Empty>
            </div>);
        cy.viewport(200, 200);
        cy.compareSnapshot(`empty2`);
    });
    it(`it should be easy layout`, () => {
        cy.mount(
            <div>
                <Empty image="no-data-easy" />
            </div>);
        cy.viewport(200, 100);
        cy.compareSnapshot(`empty3`);
    });
})