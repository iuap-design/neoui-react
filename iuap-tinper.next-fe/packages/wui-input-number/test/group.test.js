/** InputNumberGroup.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {eventsTest} from '../../../next-ui-library/test/common/index';
import { prefix } from '../../wui-core/src';

import InputNumber from '../src/index';

const inputPrefix = prefix + '-input'
const inputNumberPrefix = prefix + '-input-number'

const childAcceptProp = ({
							 title, // string
							 ParentComponent, // Component
							 childComponentName, // string
							 propName, // string
							 propValue, // any
						 }) => {
    describe(title, () => {
        it(`${childComponentName} should accept prop ${propName} and the value should be ${propValue}`, async() => {
            let parentComponent = mount(<ParentComponent/>)
            parentComponent.setProps({[propName]: propValue})
            const child = parentComponent.find(childComponentName).at(0);
            expect(child.props()[propName]).toBe(propValue);
        })

    })
}
const mocEventTarget = {
    persist: () => {
    },
    nativeEvent: {
        stopPropagation: () => {
        },
        preventDefault: () => {
        },
    }
}

eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onChange>',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onChange',
    dependentProps: {id: "input-number"},
    selector: '#input-number input',
    eventName: 'change',
    eventArgs: [{...mocEventTarget, target: {value: '-6'}}],
    propFuncArgs: [[-6], 'mockEvent']
});
eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onBlur>',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onBlur',
    dependentProps: {id: "input-number", value: ['', '']},
    selector: '#input-number input',
    eventName: 'blur',
    eventArgs: [{...mocEventTarget, target: {value: ['', '']}}],
    propFuncArgs: [['', ''], 'mockEvent']
});
eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onFocus>',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onFocus',
    dependentProps: {value: [19007199, 40343444]},
    selector: `.${prefix}-input-number-group input`,
    eventName: 'focus',
    eventArgs: [{...mocEventTarget, target: {value: [19007199, 40343444]}}],
    propFuncArgs: [[19007199, 40343444], 'mockEvent']
});
eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onBlur>, second input',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onBlur',
    dependentProps: {id: "input-number", value: ['', '']},
    selector: '#input-number input',
    eventName: 'blur',
    eventArgs: [{...mocEventTarget, target: {value: ['', '']}}],
    propFuncArgs: [['', ''], 'mockEvent'],
    selectorIndex: 1
});

eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onBlur>, second input',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onBlur',
    dependentProps: {value: [40343444, 19007199]},
    selector: `.${prefix}-input-number-group input`,
    eventName: 'blur',
    eventArgs: [{...mocEventTarget, target: {value: [40343444, 19007199]}}],
    propFuncArgs: [[40343444, 19007199], 'mockEvent'],
    selectorIndex: 1
});
eventsTest({
    title: 'component: InputNumberGroup, <test prop:: onFocus>, second input',
    Component: InputNumber.InputNumberGroup,
    propFuncName: 'onFocus',
    dependentProps: {value: [19007199, 40343444]},
    selector: `.${prefix}-input-number-group input`,
    eventName: 'focus',
    eventArgs: [{...mocEventTarget, target: {value: [19007199, 40343444]}}],
    propFuncArgs: [[19007199, 40343444], 'mockEvent'],
    selectorIndex: 1
});

describe('component: InputNumberGroup, <test prop:: split>', () => {
    it('the input value should be 44444kg', () => {
        let inputNumberGroup = mount(<InputNumber.InputNumberGroup split='*' placeholder={['请输入最小值', '请输入最大值']}/>)
        const span = inputNumberGroup.find(`.${prefix}-input-number-group`).first();
        expect(span.text()).toContain('*');
    })
})

childAcceptProp({
    title: 'component: InputNumberGroup, <test prop:: max>',
    ParentComponent: InputNumber.InputNumberGroup,
    childComponentName: `.${inputNumberPrefix} input`,
    propName: 'max',
    propValue: '1000'
})
childAcceptProp({
    title: 'component: InputNumberGroup, <test prop:: min>',
    ParentComponent: InputNumber.InputNumberGroup,
    childComponentName: `.${inputNumberPrefix} input`,
    propName: 'min',
    propValue: '10'
})

childAcceptProp({
    title: 'component: InputNumberGroup, <test prop:: disabled>',
    ParentComponent: InputNumber.InputNumberGroup,
    childComponentName: `.${inputNumberPrefix} input`,
    propName: 'disabled',
    propValue: undefined
})
describe('component: InputNumberGroup, <test prop:: value>', () => {
    let changeFn = jest.fn(), blurFn = jest.fn(), focusFn = jest.fn();
    it(`input should accept prop value`, async() => {
        let parentComponent = mount(<InputNumber.InputNumberGroup value={[1, 2]} onChange={changeFn} onBlur={blurFn} onFocus={focusFn} />)
        const child = parentComponent.find(`.${inputNumberPrefix} input`).at(0);
        expect(child.props().value).toBe('1');
        const child2 = parentComponent.find(`.${inputNumberPrefix} input`).at(1);
        expect(child2.props().value).toBe('2');
    })
})
describe('component: InputNumberGroup, <test prop:: placeholder>', () => {
    it(`input should accept prop value`, async() => {
        let parentComponent = mount(<InputNumber.InputNumberGroup placeholder={['请输入最小值', '请输入最大值']} />)
        const child = parentComponent.find(`.${inputNumberPrefix} input`).at(0);
        expect(child.props().placeholder).toBe('请输入最小值');
        const child2 = parentComponent.find(`.${inputNumberPrefix} input`).at(1);
        expect(child2.props().placeholder).toBe('请输入最大值');
    })
})
describe('component: InputNumberGroup, <test prop:: onChange>, callback param', () => {
    let changeFn = jest.fn(), blurFn = jest.fn(), focusFn = jest.fn();
    it(`input should accept prop value`, async() => {
        let parentComponent = mount(<InputNumber.InputNumberGroup onChange={changeFn} />)
        const child2 = parentComponent.find(`.${inputNumberPrefix} input`).at(1).simulate('change', {target: {value: '-6'}});
        expect(changeFn.mock.calls[0][0][1]).toBe(-6);
    })
})