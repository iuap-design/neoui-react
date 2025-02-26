/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, testCustomStyle} from '../../../next-ui-library/test/common/index';
import {prefix} from '../../wui-core/src/updatePrefix'
import Icon from '../../wui-icon/src';
import Card from '../src/index';

const prefixCard = `${prefix}-card`;

describe('component: Card', () => {
    ['small', 'default'].forEach(item => {
        it(`Card should be size ${item}, <test prop:: size>`, () => {
            const card = mount(<Card/>);
            card.setProps({size: item});
            expect(card.find(`.${prefixCard}`).hasClass(`${prefixCard}-${item}`)).toEqual(true);
        })
    });
    it('Card title should be title-of-card, <test prop:: title>', () => {
        const card = mount(<Card/>);
        card.setProps({title: 'title-of-card'});
        expect(card.find(`.${prefixCard}-head-title`).text()).toBe('title-of-card');
        card.setProps({title: <div>title-of-card</div>});
        expect(card.find(`.${prefixCard}-head-title div`).text()).toBe('title-of-card');
    });
    it('it show content when extra exit, <test prop:: extra>', () => {
        const card = mount(<Card/>);
        card.setProps({extra: <a>More</a>});
        expect(card.find(`.${prefixCard}-extra a`).text()).toEqual('More');
        card.setProps({extra: 'right'});
        expect(card.find(`.${prefixCard}-extra`).text()).toEqual('right');
        card.setProps({extra: null});
        expect(card.find(`.${prefixCard}-extra`)).toHaveLength(0);
    });
    it('Card should be this children , <test prop:: children>', () => {
        const card = mount(<Card/>);
        card.setProps({children: 'children-of-card'});
        expect(card.find(`.${prefixCard}-body`).text()).toEqual('children-of-card');
        card.setProps({children: <p>children</p>});
        expect(card.find(`.${prefixCard}-body p`).text()).toEqual('children');
    });
    it('Card should be children children-of-card, <test prop:: children>', () => {
        let card = mount(
            <Card children={<p>children</p>}>
                <p>Card content</p>
            </Card>);
        expect(card.find(`.${prefixCard}-body p`).text()).toEqual('Card content');
    });
    it('it show content when extra exit, <test prop:: actions>', () => {
        let mcard = mount(
            <Card actions={[<Icon type="uf-pencil-s"/>,
                <Icon type="uf-del"/>,
                <Icon type="uf-repeat"/>
            ]}
            />)
        expect(mcard.find(`.${prefixCard}-actions li`).length).toBe(3);
        expect(mcard.find(`.${prefixCard}-actions li`).at(0).find(`.${prefix}-icon`).hasClass(`uf-pencil-s`)).toEqual(true);
        expect(mcard.find(`.${prefixCard}-actions li`).at(1).find(`.${prefix}-icon`).hasClass(`uf-del`)).toEqual(true);
        expect(mcard.find(`.${prefixCard}-actions li`).at(2).find(`.${prefix}-icon`).hasClass(`uf-repeat`)).toEqual(true);
    });
})
testCustomStyle({
    title: 'component: Card, <test prop:: style>',
    Component: Card,
    attrs: {
        style: {'width': 300}
    },
    selector: `.${prefixCard}`,
    verifyStyle: {'width': "300px"}
})
testCustomStyle({
    title: 'component: Card, <test prop:: bodyStyle>',
    Component: Card,
    attrs: {
        bodyStyle: {'padding': 14}
    },
    selector: `.${prefixCard}-body`,
    verifyStyle: {'padding': "14px"}
})
testCustomStyle({
    title: 'component: Card, <test prop:: headStyle>',
    Component: Card,
    attrs: {
        title: "card title",
        headStyle: {'color': "red"}
    },
    selector: `.${prefixCard}-head`,
    verifyStyle: {'color': "red"}
})
attrsTest({
    title: 'component: Card, <test prop:: type>',
    Component: Card,
    attrs: {
        type: 'inner'
    },
    selector: `.${prefixCard}`,
    classnames: [`${prefixCard}-type-inner`]
})
attrsTest({
    title: 'component: Card, <test prop:: bordered>',
    Component: Card,
    attrs: {
        bordered: true
    },
    selector: `.${prefixCard}`,
    classnames: [`${prefixCard}-bordered`]
})
attrsTest({
    title: 'component: Card, <test prop:: hoverable>',
    Component: Card,
    attrs: {
        hoverable: true
    },
    selector: `.${prefixCard}`,
    classnames: [`${prefixCard}-hoverable`]
})
attrsTest({
    title: 'component: Card, <test prop:: loading>',
    Component: Card,
    attrs: {
        loading: true
    },
    selector: `.${prefixCard}`,
    classnames: [`${prefixCard}-loading`]
})
