/** Checkbox.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTest, eventsTest} from '../../../next-ui-library/test/common'
import {prefix} from '../../wui-core/src/updatePrefix';
import Checkbox from '../src/index';

const prefixCheckBox = `${prefix}-checkbox`;

['info', 'danger', 'waring', 'success', 'dark'].forEach(item => {
    attrsTest({
        title: 'component: Checkbox, <test prop:: colors>',
        Component: Checkbox,
        attrs: {
            colors: item
        },
        selector: `label`,
        classnames: [`${prefixCheckBox}-${item}`],
    })
})
eventsTest({
    title: 'component: Checkbox, <test prop:: onDoubleClick>',
    Component: Checkbox,
    propFuncName: 'onDoubleClick', 
    dependentProps: {},
    selector: 'label',
    eventName: 'dblclick',
    eventArgs: [],
    propFuncArgs: [false, 'mockEvent'],
});
eventsTest({
    title: 'component: Checkbox, <test prop:: onChange>',
    Component: Checkbox,
    propFuncName: 'onChange',
    dependentProps: {},
    selector: 'input',
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: [true, 'mockEvent'],
}); 
eventsTest({
    title: 'component: Checkbox, <test prop:: onChange>, <test prop:: antd>',
    Component: Checkbox,
    propFuncName: 'onChange',
    dependentProps: {antd:true},
    selector: 'input',
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: ['mockEvent', true],
}); 
eventsTest({
    title: 'component: Checkbox, <test prop:: onClick>',
    Component: Checkbox,
    propFuncName: 'onClick',
    dependentProps: {},
    selector: `input`,
    eventName: 'click',
    eventArgs: []
});
attrsTest({
    title: 'component: Checkbox, <test prop:: inverse>',
    Component: Checkbox,
    attrs: {
        inverse: true
    },
    selector: 'label',
    classnames: [`${prefixCheckBox}-inverse`],
})
// todo:  props size  has not been developed
attrsTest({
    title: 'component: Checkbox, <test prop:: size>',
    Component: Checkbox,
    attrs: {
        size: 'lg'
    },
    selector: 'label',
    classnames: [`${prefixCheckBox}`],
})
attrsTest({
    title: 'component: Checkbox, <test prop:: checked>',
    Component: Checkbox,
    attrs: {
        checked: true
    },
    selector: 'label',
    classnames: ['is-checked'],
})
attrsTest({
    title: 'component: Checkbox, <test prop:: indeterminate>',
    Component: Checkbox,
    attrs: {
        indeterminate: true
    },
    selector: 'label',
    classnames: [`${prefixCheckBox}-indeterminate`],
})
attrsTest({
    title: 'component: Checkbox, <test prop:: style>',
    Component: Checkbox,
    attrs: {
        style: {
            color: 'red'
        }
    }
})
attrsTest({
    title: 'component: Checkbox, <test prop:: className>',
    Component: Checkbox,
    attrs: {
        className: 'customized'
    },
    selector: `.${prefixCheckBox}`,
    classnames: ['customized'],
})
attrsTest({
    title: 'component: Checkbox, <test prop:: readOnly>',
    Component: Checkbox,
    attrs: {
        readOnly: true
    },
    selector: `.${prefixCheckBox}`,
    classnames: [ `${prefixCheckBox}-read-only`],
})
describe('component: Checkbox', () => {
    it('component: Checkbox, <test prop:: defaultChecked>, <test prop:: disabled> ', () => {
        const wrapper = mount(<Checkbox defaultChecked={true} disabled={true}/>);
        expect(wrapper.find('input').instance().checked).toBeTruthy();
        expect(wrapper.find('input').instance().disabled).toBeTruthy();
    });
    it('component: Checkbox, <test prop:: title> ', () => {
        const wrapper = mount(<Checkbox title={'1'}/>);
        expect(wrapper.find(`.${prefixCheckBox}-label`).instance().title).toBe('1');
    });
    it('onChange should filter removed value <test prop:: value>', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Checkbox.Group defaultValue={['1']} onChange={onChange}>
                <Checkbox key={1} value={'1'}/>
                <Checkbox key={2} value={'2'}/>
            </Checkbox.Group>,
        );
        wrapper.setProps({
            children: <Checkbox key={3} value={'3'}/>
        });
        wrapper.update();
        wrapper.find('input').at(0).simulate('click');
        expect(onChange).toHaveBeenCalledWith(['3']);
    });
    it('is-checked should exist when click', () => {
        let wrapper = mount(<Checkbox />)
        expect(wrapper.find(`.${prefixCheckBox}`).hasClass('is-checked')).toEqual(false)
        wrapper.find('input').simulate('focus')
        wrapper.find('input').simulate('click')
        expect(wrapper.find(`.${prefixCheckBox}`).hasClass('is-checked')).toEqual(true)
    });
});
//新增fieldid测试
describe('component: Checkbox, <test prop:: fieldid>', () => {
    it('[@fieldid,"***_checkbox"]', () => {
        const wrapper = mount(<Checkbox />);
        expect(wrapper.find('label input').props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' });
        expect(wrapper.find('label input').props().fieldid).toBe('test_checkbox');
    });
});
