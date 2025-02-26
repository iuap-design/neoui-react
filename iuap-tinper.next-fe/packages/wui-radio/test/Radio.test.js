/** Radio.tsx */
import {mount, render, shallow} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, eventsTest, sleep} from '../../../next-ui-library/test/common/index';
import {prefix} from '../../wui-core/src/updatePrefix'
import Radio from '../src';

describe('exist', () => {
    it('Radio', () => {
        const radio = <Radio value/>;
        expect(radio).toBeTruthy();
    });
    ['dark', 'success', 'info', 'warning', 'danger', 'primary'].forEach(color => {
        attrsTest({
            title: `component: Radio, <test prop:: color>`,
            Component: Radio,
            attrs: {
                color
            },
            selector: 'label',
            classnames: [`${prefix}-radio-${color}`]
        })
    });
    const sizeMap = {
        lg: 'lg',
        sm: 'sm',
        small: 'sm',
        default: 'sm',
        large: 'lg'
    };
    ['lg', 'sm', 'small', 'large', 'default'].forEach(size => {
        attrsTest({
            title: `component: Radio, <test prop:: size>`,
            Component: Radio,
            attrs: {
                size
            },
            selector: 'label',
            classnames: [`${prefix}-radio-${sizeMap[size]}`]
        })
    })
    attrsTest({
        title: `component: Radio, <test prop:: checked>`,
        Component: Radio,
        attrs: {
            checked: true
        },
        selector: 'label',
        classnames: [`is-checked`]
    })
    attrsTest({
        title: `component: Radio, <test prop:: defaultChecked>`,
        Component: Radio,
        attrs: {
            defaultChecked: true
        },
        selector: `.${prefix}-radio`,
        classnames: [`is-checked`]
    })

    it('Radio.Group', () => {
        const group = (
            <Radio.Group>
                <Radio value={1}/>
            </Radio.Group>
        );
        expect(group).toBeTruthy();
    });
    it('component: Radio, <test prop:: inverse>,<test prop:: disabled>;Radio disabled and inverse', () => {
        const radio = shallow(<Radio disabled inverse value={1}/>);
        expect(radio.find('input').props().disabled).toEqual(true);
        expect(radio.hasClass(`${prefix}-radio-inverse`)).toEqual(true);
    });
});

describe('Radio should be exist', function() {
    it('Radio should be exist', function() {
        let radio = shallow(<Radio/>);
        expect(radio.hasClass(`${prefix}-radio`)).toEqual(true);
    })
    // focusValue  没有任何的意义
    it('Trigger onChange when both of radio and radioGroup exists <test prop:: focusValue>, <test prop:: value>', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Radio.Group value="B">
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
                <Radio value="C">C</Radio>
            </Radio.Group>,
        );
        const radios = wrapper.find(`label.${prefix}-radio`);
        expect(radios.at(1).hasClass(`is-checked`)).toBe(true);
    });
})

describe('component: Radio, <test prop:: onChange>', function() {
    it('responses events', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Radio onChange={onChange} disabled/>);
        wrapper.find('input').simulate('click');
        expect(onChange).not.toHaveBeenCalled();
        wrapper.setProps({disabled: false})
        wrapper.find('input').simulate('click');
        expect(onChange).toHaveBeenCalled();

    });
});
describe('component: Radio, <test prop:: hover>', () => {
    it('responses events', async () => {
        const wrapper = mount(<Radio />);
        wrapper.find(`input`).simulate('mouseenter');
        wrapper.update()
        expect(wrapper.find(`label.${prefix}-radio`).hasClass(`${prefix}-radio-hovered`)).toBeTruthy();
        wrapper.find(`input`).simulate('mouseleave');
        wrapper.update()
        expect(wrapper.find(`label.${prefix}-radio`).hasClass(`${prefix}-radio-hovered`)).toBeFalsy();

    });
});
describe('component: Radio, <test prop:: handleFocus>', () => {
    it('responses events', async () => {
        const wrapper = mount(<Radio />);
        wrapper.find(`input`).simulate('focus');
        wrapper.update()
        expect(wrapper.find(`label.${prefix}-radio`).hasClass(`${prefix}-radio-focused`)).toBeTruthy();
    });
});
eventsTest({
    title: 'component: Radio, <test prop:: antd>',
    Component: Radio,
    propFuncName: 'onChange',
    dependentProps: {
        antd: true,
    },
    selector: `input`,
    eventName: 'click',
    propFuncArgs: ['mockEvent',true]
});
describe('component: Radio, <test prop:: style>', function() {
    it('responses events', () => {
        const wrapper = mount(<Radio style={{color: 'red'}}/>);
        const label = wrapper.find('label').first();
        expect(label.prop('style').color).toEqual('red');
    });
})
describe('component: Radio, <test prop:: value>,  <test prop:: radioGroup>', function() {
    it('responses events', () => {
        const wrapper = mount(
            <Radio.Group value="bamboo">
                <Radio value="rose">Rose</Radio>
                <Radio value="bamboo">Bamboo</Radio>
                <Radio value="garlic">Garlic</Radio>
            </Radio.Group>,
        );
        expect(wrapper.find('label').first().hasClass('is-checked')).toBe(false);
        expect(wrapper.find('label').at(1).hasClass('is-checked')).toBe(true);
        expect(wrapper.find('label').at(2).hasClass('is-checked')).toBe(false);
        wrapper.setProps({
            value: "rose"
        })
        expect(wrapper.find('label').first().hasClass('is-checked')).toBe(true);
        expect(wrapper.find('label').at(1).hasClass('is-checked')).toBe(false);
        expect(wrapper.find('label').at(2).hasClass('is-checked')).toBe(false);

    });
})
//新增fieldid测试
describe('component: Radio, <test prop:: fieldid>', () => {
    it('[@fieidid,"***_radio"]', () => {
        const wrapper = mount(<Radio />);
        expect(wrapper.find('label input').props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' });
        expect(wrapper.find('label input').props().fieldid).toBe('test_radio');
    });
});

