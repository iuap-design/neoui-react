import React from 'react';
import Tag from '../../../../packages/wui-tag/src';


describe('tag.cy.tsx', {
    viewportWidth: 300,
    viewportHeight: 300
}, () => {
    it('test <color> <bordered>', () => {
        cy.mount(
            <div>
                <Tag>default</Tag>
                <Tag color="success">success</Tag>
                <Tag color="warning">warning</Tag>
                <Tag color="danger">danger</Tag>
                <Tag color="info">info</Tag>
                <Tag color="dark">dark</Tag>
                <br />
                <Tag bordered>default</Tag>
                <Tag bordered color="success">success</Tag>
                <Tag bordered color="warning">warning</Tag>
                <Tag bordered color="danger">danger</Tag>
                <Tag bordered color="info">info</Tag>
                <br />
                <Tag size="sm" color="half-blue">待审核</Tag>
                <Tag size="sm" color="half-green">已审核</Tag>
                <Tag size="sm" color="half-dark">已作废</Tag>
                <Tag size="sm" color="half-yellow">已暂存</Tag>
                <Tag size="sm" color="half-red">已标错</Tag>
            </div>
        );
        cy.compareSnapshot('color')
    });

    it('test <disabled>', () => {
        cy.mount(
            <div>
                <Tag disabled>default</Tag>
                <Tag disabled bordered>default</Tag>
            </div>
        );
        cy.compareSnapshot('disabled')
    })
    it('test <closable>', () => {
        cy.mount(
            <>
                <Tag closable>default</Tag>
                <Tag closable>default</Tag>
            </>
        );
        // cy.get('.wui-tag').eq(1).trigger('mouseover');
        // cy.compareSnapshot('closable-hover')
        cy.get('.wui-tag').eq(1).realHover();
        cy.compareWithOptions('closable-hover', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 1200, height: 600 }
        })
    });

    it('test <selected>', () => {
        cy.mount(
            <>
                <Tag select selected>年份</Tag>
                <Tag select selected={false}>月份</Tag>
                <Tag select selected={false}>日期</Tag>
            </>
        );
        // cy.get('.wui-tag').eq(1).trigger('mouseover');
        // cy.compareSnapshot('selected')

        cy.get('.wui-tag').eq(1).realHover();
        cy.compareWithOptions('selected', {
            capture: 'runner',
            clip: {x: 800, y: 80, width: 1200, height: 600 }
        })
    });

    it('test <size>', () => {
        cy.mount(
            <>
                <Tag size="lg">default</Tag>
                <Tag size="md">default</Tag>
                <Tag size="sm">default</Tag>
            </>
        );
        cy.compareSnapshot('size')
    })

    it('test <activeColor>', () => {
        cy.mount(
            <>
                <Tag select>年份</Tag>
                <Tag select selected>年份</Tag>
                <Tag select selected activeColor='success'>月份</Tag>
                <Tag select selected activeColor='info'>月份</Tag>
                <Tag select selected activeColor='warning'>月份</Tag>
                <Tag select selected activeColor='danger'>月份</Tag>
                <Tag select selected activeColor='pink'>日期</Tag>
                <Tag select selected activeColor="half-blue">待审核</Tag>
                <Tag select selected activeColor="half-green">已审核</Tag>
                <Tag select selected activeColor="half-dark">已作废</Tag>
                <Tag select selected activeColor="half-yellow">已暂存</Tag>
                <Tag select selected activeColor="half-red">已标错</Tag>
            </>
        );
        cy.compareSnapshot('activeColor')
    });

})