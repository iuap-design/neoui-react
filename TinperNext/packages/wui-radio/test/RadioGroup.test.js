/** RadioGroup.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {attrsTestByLength} from "../../../next-ui-library/test/common/index";

import {prefix} from '../../wui-core/src/updatePrefix'
import Radio from '../src/Radio';
import RadioButton from '../src/RadioButton';
import RadioGroup from '../src/RadioGroup';

describe('Radio Group', () => {
    it('both of radio and radioGroup will trigger onchange event when they exists', () => {
        const onChange = jest.fn();
        const onChangeRadioGroup = jest.fn();

        const wrapper = mount(
            <RadioGroup onChange={onChangeRadioGroup}>
                <Radio value="A" onChange={onChange}>
					A
                </Radio>
                <Radio value="B" onChange={onChange}>
					B
                </Radio>
                <Radio value="C" onChange={onChange}>
					C
                </Radio>
            </RadioGroup>,
        );
        const radios = wrapper.find('input');

        // controlled component
        wrapper.setProps({value: 'A'});
        radios.at(1).simulate('change');
        expect(onChange.mock.calls.length).toBe(0); // 外层onChange会覆盖内层的onChange
    });

    it('Trigger onChange when both of radioButton and radioGroup exists <test prop:: radioGroup>, <test prop:: children>', () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <RadioGroup onChange={onChange}>
                <RadioButton value="A">A</RadioButton>
                <RadioButton value="B">B</RadioButton>
                <RadioButton value="C">C</RadioButton>
            </RadioGroup>,
        );
        const radios = wrapper.find('input');
        // controlled component
        wrapper.setProps({value: 'A'});
        radios.at(1).simulate('click');
        expect(onChange.mock.calls.length).toBe(1);
    });
})

describe('component: RadioGroup, <test prop:: value>', () => {
    it('disabled', () => {
        const wrapper = mount(<RadioGroup value="B" disabled>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>);
        expect(wrapper.find(`.${prefix}-radio`).at(1).hasClass('is-checked')).toEqual(true)
        wrapper.find('input[type="radio"]').forEach(el => {
            expect(el.props().disabled).toEqual(true);
        });
    });
})
describe('component: RadioGroup, <test prop:: selectedValue>, <test prop:: disabled>', () => {
    it('disabled', () => {
        const wrapper = mount(<RadioGroup selectedValue="B" disabled>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>);
        expect(wrapper.find(`.${prefix}-radio`).at(1).hasClass('is-checked')).toEqual(true)
        wrapper.find('input[type="radio"]').forEach(el => {
            expect(el.props().disabled).toEqual(true);
        });
    });
})
describe('component: RadioGroup, <test prop:: size>', () => {
    const sizeMap = {
        lg: 'lg',
        sm: 'sm',
        md: 'md',
        small: 'sm',
        default: 'sm',
        large: 'lg'
    };
    ['lg', 'sm', 'small',  'md', 'large', 'default'].forEach(size => {
        const wrapper = mount(<RadioGroup size={size}>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>);
        wrapper.find('Radio').forEach(Radio => {
            expect(Radio.find('label').first().hasClass(`${prefix}-radio-${sizeMap[size]}`)).toBeTruthy()
        });
    })

})
describe('component: RadioGroup, <test prop:: onChange>', () => {
    it('"onchange" should be called', () => {
        const onChange = jest.fn();
        const wrapper = mount(<RadioGroup onChange={onChange}>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>)
        const radios = wrapper.find('input');
        // controlled component
        wrapper.setProps({value: 'A'});
        radios.at(1).simulate('click');
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toBe('B')
    });
})
describe('component: RadioGroup, <test prop:: antd>', () => {
    it('"onchange" should be called', () => {
        const onChange = jest.fn();
        const wrapper = mount(<RadioGroup onChange={onChange}>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>)
        const radios = wrapper.find('input');
        // controlled component
        wrapper.setProps({value: 'A'});
        radios.at(1).simulate('click');
        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toBe('B')
    });
})
describe('component: RadioGroup, <test prop:: Component>', () => {
    it('root dom should be div when component is  div ', () => {
        const wrapper = mount(<RadioGroup >
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>)
        expect(wrapper.find(`.${prefix}-radio-group`).at(0).name()).toBe('div')
    });
    it('root dom should be p when component is  p ', () => {
        const wrapper = mount(<RadioGroup Component="p">
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>)
        expect(wrapper.find(`.${prefix}-radio-group`).at(0).name()).toBe('p')
    });
})
describe('component: RadioGroup, <test prop:: onClick>', () => {
    it('"onClick" should be called', () => {
        const onClick = jest.fn();
        const wrapper = mount(<RadioGroup onClick={onClick}>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>)
        const radios = wrapper.find('input');
        // controlled component
        wrapper.setProps({value: 'A'});
        radios.at(1).simulate('click');
        expect(onClick.mock.calls.length).toBe(1);
        expect(onClick.mock.calls[0][0]).toBe('B')
    });
})
describe('component: RadioGroup, <test prop:: name>', () => {
    it('all children should have a name property', () => {
        const wrapper = mount(<RadioGroup name='radiogroup'>
            <Radio value="A">A</Radio>
            <Radio value="B">B</Radio>
            <Radio value="C">C</Radio>
        </RadioGroup>);
        wrapper.find('input[type="radio"]').forEach(el => {
            expect(el.props().name).toEqual('radiogroup');
        });
    });
})
const CompA = (props) => <RadioGroup {...props}>
<Radio value="A">A</Radio>
<Radio value="B">B</Radio>
<Radio value="C">C</Radio>
</RadioGroup>
attrsTestByLength({
    title: 'component: RadioGroup, <test prop:: readOnly>',
    Component: CompA,
    attrs: {
        readOnly: true,
    },
    selector: `.${prefix}-radio`,
    nodeCount: 3
});
describe('component: RadioGroup, <test prop:: defaultValue>, <test prop:: value>', () => {
    it('use `defaultValue` when `value` is not undefined', () => {
        const wrapper = mount(
            <RadioGroup defaultValue="bamboo">
                <Radio value="rose">Rose</Radio>
                <Radio value="bamboo">Bamboo</Radio>
                <Radio value="garlic">Garlic</Radio>
            </RadioGroup>,
        );
        expect(wrapper.find(`.${prefix}-radio`).at(1).hasClass('is-checked')).toBe(true);
    });

    [undefined, null].forEach(newValue => {
        it(`should set value back when value change back to ${newValue}`, () => {
            const wrapper = mount(<RadioGroup value="bamboo">
                <Radio value="bamboo">Bamboo</Radio>
            </RadioGroup>);
            expect(wrapper.find(`.${prefix}-radio`).at(0).hasClass('is-checked')).toBe(
                true,
            );
            wrapper.setProps({value: newValue});
            wrapper.update();
            expect(wrapper.find(`.${prefix}-radio`).at(0).hasClass('is-checked')).toBe(
                false,
            );
        });
    });
});

describe('component: RadioGroup, <test prop:: options>', () => {
    it('should be displayed normally in string[] ', () => {
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const wrapper = mount(<RadioGroup defaultValue="Apple" options={plainOptions}>
        </RadioGroup>);
        expect(wrapper.find(`.${prefix}-radio`)).toHaveLength(3)

        expect(wrapper.find(`label.${prefix}-radio`).at(0).hasClass('is-checked')).toBeTruthy()
        expect(wrapper.find(`label.is-checked`)).toHaveLength(1)
        plainOptions.forEach((el, index) =>{
            expect(wrapper.find(`span.${prefix}-radio-label`).at(index).text()).toEqual(el);
        })
        wrapper.find('input').at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-radio`).at(0).hasClass('is-checked')).toBeFalsy()
        expect(wrapper.find(`.${prefix}-radio`).at(1).hasClass('is-checked')).toBeTruthy()
    });
    it('should be buttons in  Group ', () => {
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const wrapper = mount(<RadioGroup defaultValue="Apple" options={plainOptions} optionType="button">
        </RadioGroup>);
        expect(wrapper.find(`.${prefix}-radio-button`)).toHaveLength(3)

        expect(wrapper.find(`label.${prefix}-radio-button`).at(0).hasClass('is-checked')).toBeTruthy()
        expect(wrapper.find(`label.is-checked`)).toHaveLength(1)
        plainOptions.forEach((el, index) =>{
            expect(wrapper.find(`span.${prefix}-radio-button-label`).at(index).text()).toEqual(el);
        })
        wrapper.find('input').at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-radio-button`).at(0).hasClass('is-checked')).toBeFalsy()
        expect(wrapper.find(`.${prefix}-radio-button`).at(1).hasClass('is-checked')).toBeTruthy()
    });
    
})
describe('component: RadioGroup, <test prop:: options>, <test prop:: optionType>', () => {
    it('should be displayed normally in {}[] ', () => {
        const optionsWithDisabled = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: true },
          ];
        const wrapper = mount(<RadioGroup defaultValue="Apple" options={optionsWithDisabled}>
        </RadioGroup>);
        expect(wrapper.find(`.${prefix}-radio`)).toHaveLength(3)
        expect(wrapper.find(`.${prefix}-radio`).at(0).hasClass('is-checked')).toBeTruthy()
        expect(wrapper.find(`label.is-checked`)).toHaveLength(1)
        expect(wrapper.find(`.${prefix}-radio`).at(2).hasClass('disabled')).toBeTruthy()
        optionsWithDisabled.forEach((el, index) =>{
            expect(wrapper.find(`.${prefix}-radio-label`).at(index).text()).toEqual(el.label);
        })
        wrapper.find('input').at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-radio`).at(0).hasClass('is-checked')).toBeFalsy()
        expect(wrapper.find(`.${prefix}-radio`).at(1).hasClass('is-checked')).toBeTruthy()
    });
    it('should be buttons in  Group', () => {
        const optionsWithDisabled = [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: true },
          ];
        const wrapper = mount(<RadioGroup defaultValue="Apple" options={optionsWithDisabled} optionType="button">
        </RadioGroup>);
         expect(wrapper.find(`.${prefix}-radio-button`)).toHaveLength(3)
         expect(wrapper.find(`.${prefix}-radio-button`).at(0).hasClass('is-checked')).toBeTruthy()
         expect(wrapper.find(`label.is-checked`)).toHaveLength(1)
         expect(wrapper.find(`.${prefix}-radio-button`).at(2).hasClass('disabled')).toBeTruthy()
         optionsWithDisabled.forEach((el, index) =>{
             expect(wrapper.find(`.${prefix}-radio-button-label`).at(index).text()).toEqual(el.label);
         })
         wrapper.find('input').at(1).simulate('click');
         expect(wrapper.find(`.${prefix}-radio-button`).at(0).hasClass('is-checked')).toBeFalsy()
         expect(wrapper.find(`.${prefix}-radio-button`).at(1).hasClass('is-checked')).toBeTruthy()
        
    });

})
