import React from 'react';
import Carousel from '../../../../packages/wui-carousel/src';
import './carousel-demo.scss';

const BaseDemo = (props: any) => {

    return(
        <Carousel style={{margin: '20px 40px'}} {...props}>
            <div>
                
            </div>
            <div>
                
            </div>
            <div>

            </div>
            <div>
                
            </div>
        </Carousel>
    )
}

describe('carousel.cy.tsx', () => {
    it('test dotPosition', () => {
        const dotPositionArr = ['top', 'bottom', 'left', 'right'];
        cy.mount(
            <>
                {dotPositionArr.map(dp => <BaseDemo dotPosition={dp} />)}
            </>
        );
        cy.wait(1000);
        cy.viewport(800, 600);
        cy.compareSnapshot('dotPosition');
    });
    it('test dots', () => {
        cy.mount(
            <BaseDemo dots={false} />
        );
        cy.wait(1000);
        cy.viewport(800, 400);
        cy.compareSnapshot('dots');
    })
})