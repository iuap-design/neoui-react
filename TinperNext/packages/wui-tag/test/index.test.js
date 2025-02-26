/** Tag.tsx */
import exp from 'constants';
import {mount, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, eventsTest, testStyle} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src/index';
import Tag from '../src/index';

const prefixTag = `${prefix}-tag`;
describe('Tag Test', () => {
    it('component: Tag, <test prop:: disabled>tag is disabled', () => {
        const wrapper = shallow(<Tag disabled>标签</Tag>);
        expect('disabled' in wrapper.props()).toBe(true);
    });
    it('component: Tag, <test prop:: closable>tag is closable', () => {
        const wrapper = mount(<Tag closable>标签</Tag>);
        expect(wrapper.hasClass(`${prefixTag}-delete`)).toBe(true);
        expect(wrapper.find('i').hasClass('uf-close')).toBe(true);
    });
    it('component: Tag, <test prop:: closeIcon>tag add closeIcon', () => {
        const wrapper = mount(<Tag closable closeIcon={<Icon type="uf-gengduo"/>}>标签</Tag>);
        expect(wrapper.hasClass(`${prefixTag}-delete`)).toBe(true);
        expect(wrapper.find('i').hasClass('uf-gengduo')).toBe(true);
    });
    it('component: Tag, <test prop:: visible>it should be hidden', () => {
        const wrapper = mount(<Tag>标签</Tag>);
        expect(wrapper.find(`.${prefixTag}`)).toHaveLength(1);
        // visible属性props传入不生效问题
        wrapper.setProps({ visible: false });
        expect(wrapper.find(`.${prefixTag}`)).toHaveLength(0);
    });
})
testStyle({
    title: 'component: Tag, <test prop:: style>',
    Component: Tag,
    selector: `.${prefixTag}`,
    style: {'color': "red"}
});
const colorsMap = {
    dark: 'dark',
    light: 'light',
    // primary: 'primary',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    info: 'info',
    'half-blue': 'half-blue',
    'half-green': 'half-green',
    'half-dark': 'half-dark',
    'half-yellow': 'half-yellow',
    'half-red': 'half-red'
};
['sm', 'md', 'lg'].forEach(item => {
    attrsTest({
        title: 'component: Tag, <test prop:: size>',
        Component: Tag,
        attrs: {
            size: item
        },
        selector: `.${prefixTag}`,
        classnames: [`${prefixTag}-${item}`],
    })
})
Object.values(colorsMap).forEach(color => {
    attrsTest({
        title: 'component: Tag, <test prop:: colors>, <test prop:: color>',
        Component: Tag,
        attrs: {
            color
        },
        selector: `.${prefixTag}`,
        classnames: [`${prefixTag}-${color}`],
    })
})
Object.values(colorsMap).forEach(color => {
    attrsTest({
        title: 'component: Tag, <test prop:: activeColor>',
        Component: Tag,
        attrs: {
            select: true,
            checked: true,
            activeColor: color
        },
        selector: `.${prefixTag}`,
        classnames: [`${prefixTag}-active-${color}`],
    })
})
attrsTest({
    title: 'component: Tag, <test prop:: deleted>, <test prop:: closable>',
    Component: Tag,
    attrs: {
        closable: true
    },
    testAttr: {
        closable: false
    },
    selector: `.${prefixTag} i`,
    classnames: [`uf-close`],
})
attrsTest({
    title: 'component: Tag, <test prop:: select>',
    Component: Tag,
    attrs: {
        select: true
    },
    testAttr: {
        select: false
    },
    selector: `.${prefixTag}`,
    classnames: [`${prefixTag}-select`],
})
attrsTest({
    title: 'component: Tag, <test prop:: selected>',
    Component: Tag,
    attrs: {
        select: true,
        selected: true
    },
    testAttr: {
        selected: false
    },
    selector: `.${prefixTag}`,
    classnames: [`${prefixTag}-selected`],
})
attrsTest({
    title: 'component: Tag, <test prop:: checked>',
    Component: Tag,
    attrs: {
        select: true,
        checked: true
    },
    testAttr: {
        checked: false
    },
    selector: `.${prefixTag}`,
    classnames: [`${prefixTag}-selected`],
})
attrsTest({
    title: 'component: Tag, <test prop:: bordered>',
    Component: Tag,
    attrs: {
        bordered: true
    },
    selector: `.${prefixTag}`,
    classnames: [`${prefixTag}-border`],
})
attrsTest({
    title: 'component: Tag, <test prop:: icon>',
    Component: Tag,
    attrs: {
        icon: <Icon type="uf-exc-c-2"/>
    },
    selector: 'i',
    classnames: ['uf-exc-c-2'],
})
// 以后将被废除，替换为onClick
eventsTest({
    title: 'component: Tag, <test prop:: tagClick>',
    Component: Tag,
    propFuncName: 'onClick',
    dependentProps: {},
    selector: `.${prefixTag}`,
    eventName: 'click',
    eventArgs: []
});
eventsTest({
    title: 'component: Tag, <test prop:: onClick>',
    Component: Tag,
    propFuncName: 'onClick',
    dependentProps: {},
    selector: `.${prefixTag}`,
    eventName: 'click',
    eventArgs: []
});
eventsTest({
    title: 'component: Tag, <test prop:: onChange>',
    Component: Tag,
    propFuncName: 'onChange',
    dependentProps: {},
    selector: `.${prefixTag}`,
    eventName: 'click',
    eventArgs: []
});
eventsTest({
    title: 'component: Tag, <test prop:: onClose>',
    Component: Tag,
    propFuncName: 'onClose',
    dependentProps: {
        closable: true
    },
    selector: `.${prefixTag} .uf-close`,
    eventName: 'click',
    eventArgs: []
});
// 关闭按钮支持filedid属性
describe('fieldid, <test prop:: fieldid>', () => {
    it('@fieldid,"***_close"', () => {
        let wrapper = mount(<Tag closable>标签</Tag>);
        expect(wrapper.find(`.${prefixTag} span`).prop('fieldid')).toEqual(undefined);
        wrapper.unmount();
        wrapper = mount(<Tag closable fieldid="fieldid-id">标签</Tag>);
        expect(wrapper.find(`.${prefixTag} span`).prop('fieldid')).toEqual('fieldid-id_close');
    })
})

describe('custom activeColor, <test prop:: activeColor>', () => {
    it('custom activeColor"', () => {
        let wrapper = mount(<Tag select checked activeColor="blue">标签</Tag>);
        expect(wrapper.find(`.${prefixTag}`).props().style['background-color']).toEqual('blue');
    })
})
