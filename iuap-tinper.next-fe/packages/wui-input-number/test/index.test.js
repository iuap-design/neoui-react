/** InputNumber.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {
    actWait,
    sleep,
    attrsTest,
    eventsTest,
    focusTest,
    mouseEnterTest
} from '../../../next-ui-library/test/common/index'
import {prefix} from '../../wui-core/src/updatePrefix'
// import {mockCreate, mockDestroy} from '../../wui-message/src'
import InputNumber from '../src/index'
import Icon from '../../wui-icon/src/index'
import KeyCode from 'rc-util/lib/KeyCode';

const mockCreate = jest.fn()
const mockDestroy = jest.fn()

jest.mock('../../wui-message/src/index')
const mocEventTarget = {
    persist: () => {},
    nativeEvent: {
        stopPropagation: () => {},
        preventDefault: () => {}
    }
}

const inputs = [
    '',
    '  ',
    '0',
    '123',
    '.123',
    '-123',
    '+123',
    '2E3',
    '2e3',
    '2.e5',
    '1e12',
    '1e20',
    '11111222223333344444'
]
const changeExpected = [
    '',
    '',
    '0',
    123,
    0.123,
    -123,
    123,
    2000,
    2000,
    200000,
    1000000000000,
    100000000000000000000,
    11111222223333345000
]
const blurExpected = [
    '',
    '',
    0,
    123,
    0.123,
    -123,
    123,
    2000,
    2000,
    200000,
    1000000000000,
    9007199254740991,
    9007199254740991
]
inputs.forEach((input, index) => {
    if (![0, 2].includes(index)) {
        eventsTest({
            title: 'component: InputNumber, <test prop:: onChange>',
            Component: InputNumber,
            propFuncName: 'onChange',
            dependentProps: {id: 'input-number'},
            selector: '#input-number_input-number input',
            eventName: 'change',
            eventArgs: [{...mocEventTarget, target: {value: input}}],
            act: true,
            propFuncArgs: [changeExpected[index], 'mockEvent']
        })
        eventsTest({
            title: 'component: InputNumber, <test prop:: onChange>, <test prop:: antd>',
            Component: InputNumber,
            propFuncName: 'onChange',
            dependentProps: {id: 'input-number', antd: true},
            selector: '#input-number_input-number input',
            eventName: 'change',
            eventArgs: [{...mocEventTarget, target: {value: input}}],
            act: true,
            propFuncArgs: [changeExpected[index], 'mockEvent']
        })
    }
    eventsTest({
        title: 'component: InputNumber, <test prop:: onBlur>',
        Component: InputNumber,
        propFuncName: 'onBlur',
        dependentProps: {id: 'input-number', value: input},
        selector: '#input-number_input-number input',
        eventName: 'blur',
        eventArgs: [mocEventTarget],
        act: true,
        propFuncArgs: [blurExpected[index], 'mockEvent']
    })
})
const failedInputs = ['--123', '++123', '2e0.5', 'e5', '2e']
describe('component: InputNumber, <test prop:: iconStyle>', () => {
    it('on', () => {
        const onChange = jest.fn()
        const wrapper = mount(<InputNumber onChange={onChange} />)
    })
    it('', () => {
        const onBlur = jest.fn()
        const wrapper = mount(<InputNumber onChange={onBlur} />)
    })
})

focusTest({title: 'component: InputNumber, <test prop:: autoFocus>', Component: InputNumber})

attrsTest({
    title: 'component: InputNumber, <test prop:: autoWidth>',
    Component: InputNumber,
    attrs: {
        autoWidth: true
    },
    selector: `.${prefix}-input-number`,
    classnames: [`${prefix}-input-number-auto`]
})
attrsTest({
    title: 'component: InputNumber, <test prop:: rootClassName>',
    Component: InputNumber,
    attrs: {
        rootClassName: 'my-class'
    },
    selector: `.${prefix}-input-number-out`,
    act: true,
    classnames: [`my-class`]
})
attrsTest({
    title: 'component: InputNumber, <test prop:: align>',
    Component: InputNumber,
    attrs: {
        align: 'right'
    },
    selector: `.${prefix}-input-number-out`,
    classnames: [`${prefix}-input-number-align-right`]
})
describe('component: InputNumber, <test prop:: iconStyle>', () => {
    it('the addons button position should be at 0 / 2 ', () => {
        const mInputNumber = mount(<InputNumber iconStyle='double' />)
        expect(
            mInputNumber
                .find(`.${prefix}-input-number span.${prefix}-input-group-addon`)
                .length
        ).toBe(2)
    })
})
attrsTest({
    title: 'component: InputNumber, <test prop:: iconStyle>',
    Component: InputNumber,
    attrs: {
        iconStyle: 'one'
    },
    selector: `.${prefix}-input-group-btn span`,
    classnames: ['plus']
})
eventsTest({
    title: 'component: InputNumber, <test prop:: handleBtnClick>',
    Component: InputNumber,
    propFuncName: 'handleBtnClick',
    dependentProps: {id: 'input-number'},
    selector: `#input-number_input-number .${prefix}-input-group-addon`,
    eventName: 'mousedown',
    eventArgs: [mocEventTarget],
    propFuncArgs: ['down', -1]
})
eventsTest({
    title: 'component: InputNumber, <test prop:: onChange>',
    Component: InputNumber,
    propFuncName: 'onChange',
    dependentProps: {id: 'input-number'},
    selector: '#input-number_input-number input',
    eventName: 'change',
    eventArgs: [{...mocEventTarget, target: {value: '-6'}}],
    propFuncArgs: [-6, 'mockEvent']
})
eventsTest({
    title: 'component: InputNumber, <test prop:: onPressEnter>',
    Component: InputNumber,
    propFuncName: 'onPressEnter',
    dependentProps: {value: '123'},
    selector: 'input',
    eventName: 'keydown',
    eventArgs: [{keyCode: 13}]
})
eventsTest({
    title: 'component: InputNumber, <test prop:: onBlur>',
    Component: InputNumber,
    propFuncName: 'onBlur',
    dependentProps: {id: 'input-number', value: ''},
    selector: '#input-number_input-number input',
    eventName: 'blur',
    eventArgs: [{...mocEventTarget, target: {value: ''}}],
    propFuncArgs: ['', 'mockEvent']
})
eventsTest({
    title: 'component: InputNumber, <test prop:: onFocus>',
    Component: InputNumber,
    propFuncName: 'onFocus',
    dependentProps: {id: 'input-number', value: '9007199254740991543'},
    selector: '#input-number_input-number input',
    eventName: 'focus',
    eventArgs: [{...mocEventTarget, target: {value: '90071992547409915432'}}],
    propFuncArgs: [9007199254740991, 'mockEvent'] // 默认toNumber为true，应输出number
})

let inputNumber
beforeAll(() => {
    inputNumber = mount(<InputNumber />)
})
beforeAll(() => {
    inputNumber.unmount()
})

describe('component: InputNumber, <test prop:: max>, <test prop:: min>, <test prop:: autoFix>, <test prop:: displayCheckPrompt>, <test prop:: locale>', () => {
    beforeEach(() => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber locale='en-us' />)
        mockCreate.mockClear()
        mockDestroy.mockClear()
    })
    it('The maximum input value cannot exceed 1000', () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        inputNumber.setProps({
            autoFix: true,
            max: 1000,
            value: 1500,
            displayCheckPrompt: true,
            locale: 'en-us'
        })
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '2000'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('1000')
    })
    it('The maximum input value cannot exceed 0', () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        inputNumber.setProps({
            max: 0,
            value: 0,
            displayCheckPrompt: true,
            locale: 'en-us'
        })
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '1'
            }
        })
        input.simulate('blur')

        expect(input.instance().value).toBe('0')
    })
    it('The minimum input value cannot exceed 10', () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        const input = inputNumber.find('input')
        inputNumber.setProps({
            min: 10,
            value: 8,
            displayCheckPrompt: true,
            locale: 'zh-tw'
        })
        // input.simulate('focus');
        input.simulate('change', {
            target: {
                value: '7'
            }
        })
        inputNumber.update()
        input.simulate('blur')
        expect(input.instance().value).toBe('10')
    })
    it('when min and max is string, it calculate correctly', async () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        inputNumber.setProps({
            max: '1000',
            min: '1',
            displayCheckPrompt: true,
            locale: 'en-us'
        })
        const input = inputNumber.find('input')
        //1-1000正常输入
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '2'
            }
        })
        input.simulate('blur')
        expect(mockCreate).not.toHaveBeenCalled()
        expect(input.instance().value).toBe('2')
    })
    it('when min and max is string, it calculate correctly', async () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        inputNumber.setProps({
            max: '1000',
            min: '1',
            displayCheckPrompt: true,
            locale: 'en-us'
        })
        const input = inputNumber.find('input')
        //大于1000应该修正为1000
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '1001'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('1000')
    })
    it('when min and max is string, it calculate correctly', async () => {
        expect(mockCreate).not.toHaveBeenCalled()
        expect(mockDestroy).not.toHaveBeenCalled()
        inputNumber.setProps({
            max: '1000',
            min: '1',
            displayCheckPrompt: true,
            locale: 'en-us'
        })
        const input = inputNumber.find('input')
        //小于1应该修正为1
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '0'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('1')
    })
})

describe('component: InputNumber, <test prop:: step>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('The input value should be 19 when click up button', () => {
        inputNumber.setProps({step: 10})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(1) // plus
        eventDom.simulate('mousedown', mocEventTarget)
        expect(input.instance().value).toBe('19')
    })
    it('The input value should be -1 when click down button', () => {
        inputNumber.setProps({step: 10})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(0)
        eventDom.simulate('mousedown', mocEventTarget)
        expect(input.instance().value).toBe('-1')
    })
})
describe('component: InputNumber, <test prop:: format>,<test prop:: formatter>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('the input value should be 44444kg', () => {
        inputNumber.setProps({format: value => `${value}kg`})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '44444'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('44444kg')
    })
    it('the input value should be 44444kg', () => {
        inputNumber.setProps({formatter: value => `${value}kg`})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '44444'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('44444kg')
    })
})
describe('component: InputNumber, <test prop:: value>', () => {
    beforeEach(() => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber />)
    })
    it('the input value should be 123', () => {
        inputNumber.setProps({value: '123'})
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('123')
    })
    it('the input value should be 123, <test prop:: defaultValue>', () => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber defaultValue='123' />)
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('123')
    })
    it('the input value should be 123, <test prop:: round>', () => {
        inputNumber.setProps({value: 123.456, round: true, precision: 2})
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('123.46')
    })
    it('the input value undefined should be empty', () => {
        inputNumber.setProps({value: undefined})
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('')
    })
    it('the input value null should be empty', () => {
        inputNumber.setProps({value: null})
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('')
    })
    it('the input value Infinity should be max', async () => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber value={Infinity} max={100} />)
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('100')
    })
    it('the input value Infinity should be MAX_SAFE_INTEGER', async () => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber value={Infinity} />)
        const input = inputNumber.find('input')
        await actWait()
        expect(input.instance().value).toBe(`${Number.MAX_SAFE_INTEGER}`)
    })
    it('the input value -Infinity should be min', async () => {
        inputNumber.setProps({value: -Infinity, min: 100})
        const input = inputNumber.find('input')
        expect(input.instance().value).toBe('100')
    })
    it('the input value -Infinity should be MIN_SAFE_INTEGER', async () => {
        inputNumber?.unmount()
        inputNumber = mount(<InputNumber value={-Infinity} />)
        const input = inputNumber.find('input')
        await actWait()
        expect(input.instance().value).toBe(`${Number.MIN_SAFE_INTEGER}`)
    })
})
describe('component: InputNumber, <test prop:: precision>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('the input value should be 44444.000', () => {
        inputNumber.setProps({precision: 3})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '44444'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('44444.000')
    })
    it('the input value should be 4123.453', () => {
        inputNumber.setProps({precision: 3})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '4123.45'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('4123.450')
    })
    it('the input value should be 4123.456', () => {
        inputNumber.setProps({precision: 3})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '4123.45678'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('4123.456')
    })
    it('the input value should be 4123.457', () => {
        inputNumber.setProps({precision: 3, round: true})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '4123.45678'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('4123.457')
    })
})
describe('component: InputNumber, <test prop:: delay>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('the input value should be 12 after 4s', async () => {
        inputNumber.setProps({delay: 150})
        const input = inputNumber.find('input')
        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(1) // plus
        eventDom.simulate('mousedown', mocEventTarget)
        await actWait(400)
        eventDom.simulate('mouseup', mocEventTarget)
        expect(input.instance().value).toBe('11')
    })
})
describe('component: InputNumber, <test prop:: disabled>, <test prop:: readOnly>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })

    it('the input should be disabled', async () => {
        const input1 = inputNumber.find('input')

        expect(input1.instance().disabled).toBe(false)
        expect(input1.instance().readOnly).toBe(false)
        inputNumber.setProps({disabled: true, readOnly: true})
        const input = inputNumber.find('input')
        expect(input.instance().disabled).toBe(true)
        expect(input.instance().readOnly).toBe(true)
    })
})
describe('component: InputNumber, <test prop:: toNumber>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('toNumber can work:the onChang param should be 4123.45', async () => {
        const mokChang = jest.fn()
        inputNumber.setProps({toNumber: true, onChange: mokChang})
        const input = inputNumber.find('input')
        expect(mokChang).not.toHaveBeenCalled()

        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '4123.45'
            }
        })
        expect(mokChang.mock.calls.length).toBe(1)
        expect(mokChang.mock.calls[0][0]).toBe(4123.45)
    })
    it('toNumber cannot work:the onChang param should be 4123.', async () => {
        const mokChang = jest.fn()
        inputNumber.setProps({toNumber: true, onChange: mokChang})
        const input = inputNumber.find('input')
        expect(mokChang).not.toHaveBeenCalled()

        input.simulate('focus')
        input.simulate('change', {
            target: {
                value: '4123.'
            }
        })
        expect(mokChang.mock.calls.length).toBe(1)
        expect(mokChang.mock.calls[0][0]).toBe('4123.')
    })
})
describe('component: InputNumber, <test prop:: size>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('size can work:the input should be a large input', async () => {
        inputNumber.setProps({size: 'lg'})
        const lg = inputNumber.find(`${prefix}-input-number-lg`)
        expect(lg).toBeTruthy()
    })
})
describe('component: InputNumber, <test prop:: minusRight>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    // test contain update props value
    it('minusRight can work:the input value should 4-', async () => {
        const input = inputNumber.find('input')
        input.simulate('focus')
        inputNumber.setProps({minusRight: true, value: -4})
        input.simulate('blur')
        await sleep(100)
        expect(input.instance().value).toBe('4-')
    })

    it('minusRight can work:the input value should 5-', async () => {
        const input = inputNumber.find('input')
        inputNumber.setProps({minusRight: true, value: -5})
        input.simulate('focus')
        input.simulate('blur')
        await sleep(100)
        expect(input.instance().value).toBe('5-')
    })
    it('minusRight show correctly after change', async () => {
        const input = inputNumber.find('input')
        inputNumber.setProps({minusRight: true})
        input.simulate('change', {
            target: {
                value: '-10'
            }
        })
        await sleep(100)
        expect(input.instance().value).toBe('10-')
    })
    it('minusRight can calculate correctly', async () => {
        const input = inputNumber.find('input')
        inputNumber.setProps({minusRight: true, value: -5})
        inputNumber.find(`span .${prefix}-input-group-addon`).at(0).simulate('mousedown', mocEventTarget)
        await sleep(100)
        expect(input.instance().value).toBe('6-')
    })
    it('minusRight can calculate correctly', async () => {
        const input = inputNumber.find('input')
        inputNumber.setProps({minusRight: true, value: -5})
        inputNumber.find(`span .${prefix}-input-group-addon`).at(1).simulate('mousedown', mocEventTarget)
        await sleep(100)
        expect(input.instance().value).toBe('4-')
    })
})
describe('component: InputNumber, <test prop:: hideActionButton>, <test prop:: controls>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })
    it('hideActionButton can work:the addon button should be hidden', async () => {
        inputNumber.setProps({hideActionButton: true})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(1) // plus
        // eventDom.simulate('mousedown', mocEventTarget);
        expect(eventDom.length).toBe(0)
    })
    it('controls can work:the addon button should be hidden', async () => {
        inputNumber.setProps({controls: true})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(1) // plus
        // eventDom.simulate('mousedown', mocEventTarget);
        expect(eventDom.length).toBe(0)
    })
})
describe('component: InputNumber, <test prop:: onStep>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })

    it('onStep can work:the addon button should be call a function', async () => {
        const mocOnStep = jest.fn()
        inputNumber.setProps({onStep: mocOnStep})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9'
            }
        })
        const eventDom = inputNumber.find(`.${prefix}-input-group-addon`).at(1) // plus
        eventDom.simulate('mousedown', mocEventTarget)
        expect(mocOnStep).toHaveBeenCalled()
        expect(input.instance().value).toBe('10')
        const eventDom1 = inputNumber.find(`.${prefix}-input-group-addon`).at(0) // minus
        eventDom1.simulate('mousedown', mocEventTarget)
        expect(mocOnStep).toHaveBeenCalled()
        expect(input.instance().value).toBe('9')
    })
})
describe('component: InputNumber, <test prop:: toThousands>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })

    it('toThousands can work:the input value should be 9,000', async () => {
        inputNumber.setProps({toThousands: true})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9000'
            }
        })
        input.simulate('blur')
        await sleep(100)
        expect(input.instance().value).toBe('9,000')
    })
    it('toThousands can work:the input value should be 9000', async () => {
        inputNumber.setProps({toThousands: false})
        const input = inputNumber.find('input')
        input.simulate('change', {
            target: {
                value: '9000'
            }
        })
        input.simulate('blur')
        expect(input.instance().value).toBe('9000')
    })
})

describe('component: InputNumber, <test prop:: placeholder>', () => {
    beforeEach(() => {
        inputNumber = mount(<InputNumber />)
    })

    it('placeholder should be one', async () => {
        inputNumber.setProps({placeholder: 'one'})
        const input = inputNumber.find('input')
        input.simulate('focus')
        expect(input.props().placeholder).toEqual('one')
    })
})

describe('Jira Test', () => {
    // 修复用户传入超长字符串数字时，类型转换会丢失精度问题
    it('fix:【InputNumber】QDJCJS-10270超长超大string数据不改变类型,ZC-61843其他保持原Number逻辑', async () => {
        let wrapper = mount(<InputNumber value={'12345678901234.54663344'} />)
        expect(wrapper.find('input').instance().value).toEqual('12345678901234.54663344')
        wrapper.setProps({value: 12345678901234.54663344}) //非string数据
        expect(wrapper.find('input').instance().value).toEqual('12345678901234.547')
    })
    it('fix:【InputNumber】QDJCJS-9776,禁止中文输入,否则windows下change先于composition事件触发会导致额外删除数字问题', async () => {
        let wrapper = mount(<InputNumber value={123} />)
        wrapper.find('input').simulate('compositionstart', {target: {value: '一'}})
        wrapper.find('input').simulate('compositionend', {target: {value: '一'}})
        wrapper.find('input').simulate('change', {target: {value: '一'}})
        expect(wrapper.find('input').instance().value).toEqual('123')
    })
    it('fix:【InputNumber】QDJCJS-9919 修复用户Excel直接copy单元格数字时自带的尾部空格导致无法粘贴到输入框问题', async () => {
        let wrapper = mount(<InputNumber />)
        wrapper.find('input').simulate('change', {target: {value: '456 '}})
        expect(wrapper.find('input').instance().value).toEqual('456')
    })
    it('fix:【InputNumber】前后缀增加用户自定义className注入, <test prop:: addonBefore>, <test prop:: addonAfter>', async () => {
        let wrapper = mount(<InputNumber className='test' addonBefore={'长度'} addonAfter={'米'} />)
        expect(wrapper.find(`.${prefix}-input-number-addonBefore`).hasClass('test-addonBefore')).toEqual(true)
        expect(wrapper.find(`.${prefix}-input-number-addonAfter`).hasClass('test-addonAfter')).toEqual(true)
    })
    it('fix:【InputNumber】QDJCJS-9452禁止非法输入', async () => {
        let wrapper
        // inputNumber 不可以输入数字外的其它字符 及'+-.,Ee'外的其它符号
        let allChar = Array.from({length: 95}, (v, k) => String.fromCharCode(k + 32)) //全部字符
        allChar.forEach(v => {
            wrapper?.unmount()
            wrapper = mount(<InputNumber />)
            wrapper.find('input').simulate('change', {target: {value: v}})
            if ('+-.0123456789Ee'.indexOf(v) !== -1) {
                expect(wrapper.find('input').instance().value).toEqual(v)
            } else {
                expect(wrapper.find('input').instance().value).toEqual('')
            }
        })
    })
    it('fix:【InputNumber】step为undefined兼容', async () => {
        // step为undefined时，计算时按step=1算
        let wrapper = mount(<InputNumber step={undefined} value={0} min={0} max={999999} />)
        expect(wrapper.find(`.${prefix}-input-group-addon`).at(0).hasClass('disabled')).toEqual(true)
        wrapper.find(`.${prefix}-input-group-addon`).at(0).simulate('mousedown', mocEventTarget)
        expect(wrapper.find('input').instance().value).toEqual('0') //min为0,按下-号value不变
        wrapper.find(`.${prefix}-input-group-addon`).at(1).simulate('mousedown', mocEventTarget)
        expect(wrapper.find('input').instance().value).toEqual('1') //按下+号，value+1
    })
})

describe('keyboard arrow operate', () => {
    // xit('component: InputNumber, <test prop:: onKeyDown.up>', async () => {
    //     let wrapper = mount(<InputNumber />)
    //     wrapper.find('input').simulate('keydown', {...mocEventTarget, which: KeyCode.UP})
    //     wrapper.find('input').simulate('keyup', {...mocEventTarget, which: KeyCode.UP})
    //     await actWait()
    //     expect(wrapper.find('input').instance().value).toEqual('1')
    // })
    // xit('component: InputNumber, <test prop:: onKeyDown.down>', async () => {
    //     let wrapper = mount(<InputNumber />)
    //     wrapper.find('input').simulate('keydown', {...mocEventTarget, which: KeyCode.DOWN})
    //     wrapper.find('input').simulate('keyup', {...mocEventTarget, which: KeyCode.DOWN})
    //     await actWait()
    //     expect(wrapper.find('input').instance().value).toEqual('-1')
    // })
    it('component: InputNumber, <test prop:: keyboard>', async () => {
        let wrapper = mount(<InputNumber keyboard={false} />)
        wrapper.find('input').simulate('keydown', {...mocEventTarget, which: KeyCode.DOWN})
        wrapper.find('input').simulate('keyup', {...mocEventTarget, which: KeyCode.DOWN})
        await actWait()
        expect(wrapper.find('input').instance().value).toEqual('')
    })
})

describe('component: InputNumber, <test prop:: showMark>', () => {
    it('showMark will not work: the mark tag will not exist', async () => {
        const wrapper = mount(<InputNumber showMark value={12} />)
        expect(wrapper.find(`.${prefix}-input-number-mark`).length).toBe(0)
    })
    it('showMark will work: the mark tag should be 千', async () => {
        const wrapper = mount(<InputNumber showMark value={1234} />)
        expect(wrapper.find(`.${prefix}-input-number-mark`).at(0).text()).toBe('千')
    })
    it('showMark will be the custom value: the mark tag should be a heart', async () => {
        const wrapper = mount(<InputNumber showMark defaultValue={12345} integerMarks={[{
                len: 5,
                mark: <Icon type="uf-heart-o" />
            }]}
        />)
        expect(wrapper.find(`.${prefix}-input-number-mark .uf-heart-o`).length).toBe(1)
    })
})
