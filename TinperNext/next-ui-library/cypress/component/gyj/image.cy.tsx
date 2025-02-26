import React from 'react';

import {Image} from '../../../../packages';


describe('image.cy.tsx', () => {
    
    xit(`it should init image`, () => {
        cy.mount(
            <div >
                <Image>
	                <div>
	                    <img style={{width: '100px'}} className='aaa' data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg" src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
	                </div>
	            </Image>

            </div>);
        cy.wait(500)
        cy.compareSnapshot(`init`)
        cy.get('.aaa').eq(0).click({force: true})
        cy.wait(1000)
        cy.compareSnapshot(`big`)
        cy.get('.viewer-rotate-left').eq(0).click({force: true})
        cy.wait(500)
        cy.compareSnapshot(`rotatabble`)
        cy.get('.viewer-zoom-in').eq(0).click({force: true})
        cy.wait(500)
        cy.compareSnapshot(`scalable`)
        cy.get('.viewer-move').eq(0).type('{uparrow}')
        cy.wait(500)

        cy.compareSnapshot(`scalable_big`)

    })
    it(`it should type inline`, () => {
        cy.mount(
            <div >
                <Image inline>
	                <div>
	                    <img style={{width: '100px'}} className='aaa' data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg" src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
	                </div>
	            </Image>

            </div>);
        cy.wait(500)
        cy.get('.aaa').eq(0).click({force: true})
        cy.wait(1000)
        cy.compareSnapshot(`inline_big`)
    })
    it(`it should toogle some button`, () => {
        cy.mount(
            <div >
                <Image button={false} title={false}
                navbar={false}
                toolbar={false}
                tooltip={false}
                >
	                <div>
	                    <img style={{width: '100px'}} className='aaa' data-original="http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-5-min.jpg" src='http://design.yonyoucloud.com/static/bee.tinper.org-demo/swiper-demo-1-min.jpg' alt="Picture"/>
	                </div>
	            </Image>

            </div>);
        cy.wait(500)
        cy.get('.aaa').eq(0).click({force: true})
        cy.wait(1000)
        cy.compareSnapshot(`hidden_some_button`)
    })
})