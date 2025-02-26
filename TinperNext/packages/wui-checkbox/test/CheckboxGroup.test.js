/** CheckboxGroup.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {eventsTest} from '../../../next-ui-library/test/common'
import {prefix} from '../../wui-core/src/updatePrefix';
import Checkbox from '../src/index';

const prefixCheckBox = `${prefix}-checkbox`
describe('component: CheckboxGroup, <test prop:: disabled>', () => {
    it('group onchange and checkbox disabled test', () => {
        const onChangeGroup = jest.fn();
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Orange', value: 'Orange', disabled: true},
        ];
        const groupWrapper = mount(<Checkbox.Group options={options} onChange={onChangeGroup}/>);
        groupWrapper.find('input').at(0).simulate('click');
        expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
        groupWrapper.find('input').at(1).simulate('click');
        expect(groupWrapper.find('input').at(1).props().disabled).toEqual(true);
        expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
    });
});
describe('component: CheckboxGroup, <test prop:: readOnly>', () => {
    it('group onchange and checkbox readOnly test', () => {
        const onChangeGroup = jest.fn();
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Orange', value: 'Orange'},
        ];
        const groupWrapper = mount(<Checkbox.Group options={options} readOnly={true} onChange={onChangeGroup}/>);
        expect(groupWrapper.find(`.${prefixCheckBox}`).at(0).hasClass(`${prefixCheckBox}-read-only`)).toBe(true);
    });
});
describe('component: CheckboxGroup, <test prop:: name>', () => {

    it('all children should have a name property', () => {
        const wrapper = mount(<Checkbox.Group name="checkboxgroup" options={['Yes', 'No']}/>);
        wrapper.find('input[type="checkbox"]').forEach(el => {
            expect(el.props().name).toEqual('checkboxgroup');
        });
    });
})
describe('component: CheckboxGroup, <test prop:: options>', () => {

    it('should be controlled by value', () => {
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Orange', value: 'Orange'},
        ];
        const wrapper = mount(<Checkbox.Group options={options}/>);
        expect(wrapper.find('.is-checked').length).toBe(0);
        wrapper.setProps({value: ['Apple']});
        wrapper.update();
        expect(wrapper.find('.is-checked').length).toBe(1);
    });
});
describe('component: CheckboxGroup, <test prop:: defaultValue>', () => {
    it('checkbox should register value again after value changed', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <Checkbox.Group defaultValue={['1']} onChange={onChange}>
                <Checkbox key={1} value={'1'}/>
            </Checkbox.Group>,
        );
        wrapper.setProps({
            children: [<Checkbox key={1} value={'2'}/>],
        });
        expect(wrapper.find('is-checked').length).toBe(0);
    });
})
describe('component: CheckboxGroup, <test prop:: value>', () => {

    it('onChange should filter removed value', () => {
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


    it('onChange should keep the order of the original values', () => {
        const mokOnChange = jest.fn();
        const wrapper = mount(
            <Checkbox.Group value={[]} onChange={mokOnChange}>
                <Checkbox key={5} value={'5'}/>
                <Checkbox key={6} value={'6'}/>
                <Checkbox key={7} value={'7'}/>
                <Checkbox key={8} value={'8'}/>
            </Checkbox.Group>,
        );
        wrapper.find('input').at(0).simulate('click');
        expect(mokOnChange).toHaveBeenCalledWith(['5']);
        wrapper.find('input').at(1).simulate('click');
        expect(mokOnChange).toHaveBeenCalledWith(['6']);
        wrapper.find('input').at(0).simulate('click');
        expect(mokOnChange).toHaveBeenCalledWith(['5']);
        wrapper.find('input').at(0).simulate('click');
        expect(mokOnChange).toHaveBeenCalledWith(['5']);
    });
})
eventsTest({
    title: 'component: CheckboxGroup, <test prop:: onChange>',
    Component: Checkbox.Group,
    propFuncName: 'onChange',
    dependentProps: {
        options: [
            {label: 'Apple', value: 'Apple'},
            {label: 'Orange', value: 'Orange'},
        ],
        value: ['Orange']
    },
    selector: 'input',
    eventName: 'click',
    eventArgs: [],
    propFuncArgs: [["Apple", "Orange"]],
});

//新增fieldid测试 支持checkboxgroup组件的fieldid功能
describe('component: CheckboxGroup, <test prop:: fieldid>', () => {
    it('fieldid test', () => {
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const wrapper = mount(<Checkbox.Group options={plainOptions} defaultValue={['Apple']} fieldid='field'/>)
        expect(wrapper.find(`.${prefixCheckBox}`).at(0).prop('fieldid')).toEqual('field-Apple-0')
        expect(wrapper.find(`.${prefixCheckBox}`).at(1).prop('fieldid')).toEqual('field-Pear-1')
        expect(wrapper.find(`.${prefixCheckBox}`).at(2).prop('fieldid')).toEqual('field-Orange-2')
        expect(wrapper.find(`.${prefixCheckBox}`).at(0).find('input').prop('fieldid')).toEqual('field-Apple-0_checkbox')
        expect(wrapper.find(`.${prefixCheckBox}`).at(1).find('input').prop('fieldid')).toEqual('field-Pear-1_checkbox')
        expect(wrapper.find(`.${prefixCheckBox}`).at(2).find('input').prop('fieldid')).toEqual('field-Orange-2_checkbox')
    })
});