import React from "react";
import Skeleton from '../../../../packages/wui-skeleton/src';


describe('skeleton.cy.tsx', () => {
    it('test baseDemo round active avatar title paragraph', () => {
        cy.mount(
            <>
                <Skeleton/>
                <br />
                <br />
                <Skeleton round/>
                <br />
                <br />
                <Skeleton active avatar title paragraph={{ rows: 4, width: ['50%', '60%'] }}/>
                <br />
                <br />
                <Skeleton.Image />
            </>
        );
        cy.viewport(800, 600);
        cy.compareSnapshot('boolean-api');
    });

    it('test skeleton.avatar', () => {
        const shapeArr: any = ['circle', 'square', 'default'];
        const sizeArr: any = ['large', 'small', 'default']
        cy.mount(
            <>
                {
                    shapeArr.reduce((domArr: any, shape: any) => {
                        return [...domArr, <div>{sizeArr.map((size: any) => {
                            return <Skeleton.Avatar size={size} shape={shape} style={{ margin: '20px' }} />
                        })}</div>]
                    }, [])
                }
            </>
        )
        cy.viewport(600, 200)
        cy.compareSnapshot('avatar');
    })

    it('test Skeleton.Button', () => {
        const shapeArr: any = ['circle', 'round', 'default'];
        const sizeArr: any = ['large', 'small', 'default']
        cy.mount(
            <>
                {
                    shapeArr.reduce((domArr: any, shape: any) => {
                        return [...domArr, <div>{sizeArr.map((size: any) => {
                            return <Skeleton.Button size={size} shape={shape} style={{ margin: '20px' }} />
                        })}</div>]
                    }, [])
                }
                <Skeleton.Button block />
            </>
        )
        cy.viewport(600, 300)
        cy.compareSnapshot('button');
    })

    it('test Skeleton.Input', () => {
        const sizeArr: any = ['large', 'small', 'default']
        cy.mount(
            <>
                {
                    sizeArr.map((size: any) => <Skeleton.Input style={{ width: 200, margin: '20px' }} size={size}/>)
                }
            </>
        )
        cy.viewport(600, 300)
        cy.compareSnapshot('input');
    })
})