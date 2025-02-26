/** Badge.tsx */
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, mountTest, testCustomStyle, testCustomeText} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Badge from '../src/index';
import {Card} from "../../index";

const prefixBadge = `${prefix}-badge`;
const prefixRibbon = `${prefix}-ribbon`;

describe('Badge test', function() {
    mountTest(Badge);
    it('Badge should be exist', function() {
        let badge = shallow(<Badge/>);
        expect(badge.hasClass(`${prefixBadge}`)).toEqual(true);
    })
})

describe('component: Badge', () => {
    ['primary', 'info', 'dark', 'danger', 'warning'].forEach(item => {
        attrsTest({
            title: 'component: Badge, <test prop:: colors>',
            Component: Badge,
            attrs: {
                colors: item
            },
            selector: `.${prefixBadge}`,
            classnames: [`${prefixBadge}-${item}`]
        })
    });
    ['bottom', 'top'].forEach(item => {
        attrsTest({
            title: 'component: Badge, <test prop:: dataBadgePlacement>',
            Component: Badge,
            attrs: {
                dataBadgePlacement: item
            },
            selector: `.${prefixBadge}`,
            classnames: [`data-badge-${item}`]
        })
    });
    attrsTest({
        title: 'component: Badge, <test prop:: dot>',
        Component: Badge,
        attrs: {
            count: 10,
            dot: true
        },
        selector: `.data-icon`,
        classnames: [`${prefixBadge}-dot`]
    })
    testCustomeText({
        title: 'Comment: Badge, <test prop:: text>',
        Component: Badge,
        attrs: {
            status: 'error',
            text: 'success'
        },
        selector: `.${prefixBadge}-status-text`,
        text: 'success'
    })
    it('should offset style offect, <test prop:: offset>', () => {
        const wrapper = mount(<Badge dot offset={[5, 0]}/>);
        expect(wrapper.find('span.data-icon').props().style['margin-top']).toBe('0px');
        expect(wrapper.find('span.data-icon').props().style.right).toBe('-5px');
    });
    it('should have an overriden title attribute, <test prop:: title>', () => {
        const badge = mount(<Badge dot title="Custom title"/>);
        expect(badge.find('.data-icon').getDOMNode().attributes.getNamedItem('title').value).toEqual('');
        badge.setProps({count: 10, dot: false});
        expect(badge.find('.data-icon').getDOMNode().attributes.getNamedItem('title').value).toEqual('Custom title');
    });
})

Object.entries({10: '10', 100: '99+', 3.5: '3.5'}).forEach(item => {
    testCustomeText({
        title: 'Comment: Badge, <test prop:: count>',
        Component: Badge,
        attrs: {
            count: item[0]
        },
        selector: 'span.data-icon',
        text: item[1]
    })
})

Object.entries({99: '3.5+', 2: '2', 3.8: '3.5+'}).forEach(item => {
    testCustomeText({
        title: 'Comment: Badge, <test prop:: overflowCount>',
        Component: Badge,
        attrs: {
            overflowCount: 3.5,
            count: item[0]
        },
        selector: 'span.data-icon',
        text: item[1]
    })
})

describe('component: Badge, <test prop:: showZero>', () => {
    // const badge = mount(<Badge count={0}/>);
    it('badge should not show count == 0', () => {
        const badge = mount(<Badge count={0}/>);
        expect(badge.find('.data-icon').length).toBe(0);
        badge.setProps({dot: true})
        expect(badge.find('.data-icon').length).toBe(0);
    });
    it('badge should show count == 0', () => {
        const badge = mount(<Badge count={0}/>);
        badge.setProps({count: 0, showZero: true});
        expect(badge.find('.data-icon').text()).toBe("0");
        badge.setProps({count: 0, dot: true, showZero: true});
        expect(badge.find('.data-icon').text()).toBe("0");
    });
})

describe('component: Badge, <test prop:: size>', () => {
    it('should count show sm', () => {
        const wrapper = mount(<Badge count={2} size="small"/>);
        expect(wrapper.find(`span.${prefixBadge}-sm`).exists()).toBeTruthy();
    });
    it('should count show default', () => {
        const wrapper = mount(<Badge count={2}/>);
        expect(wrapper.find('span.data-icon').exists()).toBeTruthy();
    });
})

Object.entries({
    success: 'success',
    info: 'processing',
    primary: 'default',
    danger: 'error',
    warning: 'warning'
}).forEach(item => {
    attrsTest({
        title: 'component: Badge, <test prop:: status>',
        Component: Badge,
        attrs: {
            status: item[1]
        },
        selector: `.${prefixBadge}`,
        classnames: [`${prefixBadge}-${item[0]}`]
    })
});
attrsTest({
    title: 'component: Badge, <test prop:: className>',
    Component: Badge,
    attrs: {
        className: "my-badge"
    },
    selector: `.${prefixBadge}`,
    classnames: ["my-badge"]
})
testCustomStyle({
    title: 'component: Badge, <test prop:: color>',
    Component: Badge,
    attrs: {
        color: "red"
    },
    selector: `.${prefixBadge}-dot`,
    verifyStyle: {'background': "red"}
})

describe('fieldid', () => {
    it('fieldid, <test prop:: fieldid>', () => {
        const wrapper = mount(<Badge dot />);
        expect(wrapper.find(`.${prefixBadge}`).find('.data-icon').prop('fieldid')).toEqual(undefined);
        wrapper.setProps({ fieldid: 'fieldid-id' });
        expect(wrapper.find(`.${prefixBadge}`).find('.data-icon').prop('fieldid')).toEqual('fieldid-id_data_icon');
        wrapper.setProps({dot:true, colors: null});
        expect(wrapper.find(`.${prefixBadge}`).hasClass(`${prefixBadge}-primary`)).toEqual(true);
    })
})

describe('component: Badge.Ribbon, <test prop:: text>', () => {
    it('should be text', () => {
        const wrapper = mount(
            <Badge.Ribbon text="Hippies">
                <Card title="Pushes open the window">
                    and raises the spyglass.
                </Card>
            </Badge.Ribbon>
        );

        expect(wrapper.find(`.${prefixRibbon}`).find(`.${prefixRibbon}-text`).text()).toBe('Hippies');
    });
});

describe('component: Badge.Ribbon, <test prop:: placement>', () => {
    it('<test prop:: placement>', () => {
        const wrapper = shallow(
            <Badge.Ribbon text="Hippies" placement="start">
                <Card title="Pushes open the window">
                    and raises the spyglass.
                </Card>
            </Badge.Ribbon>
        );
    
        expect(wrapper.find(`.${prefixRibbon}`).hasClass(`${prefixRibbon}-placement-start`)).toBe(true);
    
        wrapper.setProps({placement: 'end', text: 'Hippies'});
        expect(wrapper.find(`.${prefixRibbon}`).hasClass(`${prefixRibbon}-placement-end`)).toBe(true);
    })
});

describe('component: Badge.Ribbon, <test prop:: color>', () => {
    it('<test prop:: color>', () => {
        const wrapper = mount(
            <Badge.Ribbon text="Hippies" color="success">
                <Card title="Pushes open the window">
                    and raises the spyglass.
                </Card>
            </Badge.Ribbon>
        );
        expect(wrapper.find(`.${prefixRibbon}`).hasClass(`${prefixRibbon}-color-success`)).toBe(true);
    
        wrapper.setProps({color: 'blue', text: 'Hippies'});
        expect(wrapper.find(`.${prefixRibbon}`).props().style.background).toBe('blue');
    })
});