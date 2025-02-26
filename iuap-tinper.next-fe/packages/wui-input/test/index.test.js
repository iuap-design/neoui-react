/** Input.tsx */
import React from 'react'
import { attrsTest, eventsTest, focusTest, mountTest } from '../../../next-ui-library/test/common/index'
import { mount } from '../../../next-ui-library/test/common/mount'
import Button from '../../wui-button/src'
import { prefix } from '../../wui-core/src/updatePrefix'
import Form from '../../wui-form/src'
import Icon from '../../wui-icon/src'
import Input from '../src'
const prefixInput = `${prefix}-input`

const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

describe('Input', () => {
    afterEach(() => {
        errorSpy.mockReset()
    })

    afterAll(() => {
        errorSpy.mockRestore()
    })

    focusTest({title: 'component: Input, <test prop:: autoFocus>', Component: Input})

    mountTest(Input)
    mountTest(Input.Group)
    attrsTest({title: 'component: Input, <test prop:: maxLength>', Component: Input, attrs: {maxLength: 3}})
    xit('select()', () => {
        const wrapper = mount(<Input />)
        wrapper.instance().input.focus()
    })
    attrsTest({
        title: 'component: Input, <test prop:: size>',
        Component: Input,
        attrs: {size: 'lg'},
        selector: 'input',
        classnames: ['lg']
    })
    attrsTest({
        title: 'component: Input, <test prop:: align>',
        Component: Input,
        attrs: {
            align: 'center'
        },
        selector: `.${prefixInput}`,
        classnames: [`${prefixInput}-align-center`]
    })
    eventsTest({
        title: 'component: Input, <test prop:: onSearch>,  <test prop:: type>',
        Component: Input,
        propFuncName: 'onSearch',
        dependentProps: {
            type: 'search',
            value: '111'
        },
        selector: `.${prefixInput}-suffix .uf-search-light-2`,
        eventName: 'click',
        eventArgs: [],
        propFuncArgs: ['111']
    })
    eventsTest({
        title: 'component: Input, <test prop:: onClick>',
        Component: Input,
        propFuncName: 'onClick',
        dependentProps: {
            type: 'search',
            prefix: 'demo'
        },
        selector: `.${prefixInput}-affix-wrapper`,
        eventName: 'click',
        eventArgs: [],
        propFuncArgs: ['mockEvent']
    })
    eventsTest({
        title: 'component: Input, <test prop:: onPressEnter>',
        Component: Input,
        propFuncName: 'onPressEnter',
        dependentProps: {value: '123'},
        selector: 'input',
        eventName: 'keydown',
        eventArgs: [{keyCode: 13}]
    })
    eventsTest({
        title: 'component: Input, <test prop:: onKeyDown>',
        Component: Input,
        propFuncName: 'onKeyDown',
        dependentProps: {value: '123'},
        selector: 'input',
        eventName: 'keydown',
        eventArgs: [{keyCode: 97}]
    })
    eventsTest({
        title: 'component: Input, <test prop:: onFocus>',
        Component: Input,
        propFuncName: 'onFocus',
        dependentProps: {value: '13'},
        selector: 'input',
        eventName: 'focus',
        propFuncArgs: ['13', 'mockEvent']
    })
    eventsTest({
        title: 'component: Input, <test prop:: onBlur>',
        Component: Input,
        propFuncName: 'onBlur',
        dependentProps: {value: '123'},
        selector: 'input',
        eventName: 'blur',
        propFuncArgs: ['123', 'mockEvent']
    })
    describe('component: Input, <test prop:: suffix>, <test prop:: defaultValue>', () => {
        it('not trigger', () => {
            const wrapper = mount(<Input suffix='bamboo' />)
            wrapper.setProps({
                suffix: 'light'
            })
            expect(errorSpy).not.toHaveBeenCalled()
        })
    })

    it('set mouse cursor position', () => {
        const defaultValue = '11111'
        const valLength = defaultValue.length
        const wrapper = mount(<Input autoFocus defaultValue={defaultValue} />)

        wrapper.find('input').instance().setSelectionRange(valLength, valLength)
        expect(wrapper.find('input').instance().selectionStart).toEqual(5)
        expect(wrapper.find('input').instance().selectionEnd).toEqual(5)
    })
})

describe('component: Input.Search, <test prop:: onSearch>, <test prop:: loading>', () => {
    it('not trigger', () => {
        const wrapper = mount(<Input type='search' loading value='111' onSearch={errorSpy} />)
        wrapper.find(`.${prefixInput}-suffix`).simulate('click')
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        expect(errorSpy).not.toHaveBeenCalled()
    })
    it('change value & onSearch should be called', () => {
        const wrapper = mount(<Input type='search' onChange={errorSpy} />)
        wrapper.find(`.${prefixInput}-search input`).simulate('change', {target: {value: '222'}})
        expect(errorSpy).toHaveBeenCalled()
    })
})

describe('component: Input.Password, <test prop:: onVisibleChange>', () => {
    const iconRender = passwordVisible => (passwordVisible ? <Icon type='uf-eye' /> : <Icon type='uf-eye-o' />)
    afterEach(() => {
        errorSpy.mockReset()
    })
    afterAll(() => {
        errorSpy.mockRestore()
    })
    it('should support prefix and called onVisibleChange, <test prop:: trigger>, <test prop:: iconRender>, <test prop:: visibilityToggle>', () => {
        const wrapper = mount(
            <Input
                type='password'
                value='111'
                trigger='click'
                showClose
                onVisibleChange={errorSpy}
                iconRender={iconRender}
            />
        )
        expect(wrapper.find(`.${prefixInput}-affix-wrapper`).at(0).getDOMNode().className.includes(`${prefixInput}-password`)).toBe(
            true
        )
        wrapper.find(`.${prefixInput}-suffix`).at(1).simulate('click')
        expect(errorSpy).toHaveBeenCalled()
        wrapper.setProps({prefix: <Icon type='uf-security-2' />})
        expect(wrapper.find(`.${prefixInput}-simple-prefix .uf-security-2`).length).toBe(1)
        wrapper.setProps({visibilityToggle: false})
        expect(wrapper.find(`.${prefixInput}-password-icon`).length).toBe(0)
    })
    it('should support prefix and suffix, <test prop:: prefix>, <test prop:: suffix>', () => {
        const wrapper = mount(
            <Input
                type='password'
                value='111'
                trigger='click'
                allowClear
                iconRender={iconRender}
                prefix={<Icon type='uf-security-2' />}
                suffix={<Icon type="uf-star" />}
            />
        )
        expect(wrapper.find(`.${prefixInput}-simple-prefix`).length).toBe(1)
        expect(wrapper.find(`.${prefixInput}-simple-suffix`).length).toBe(1)
    })
    it('should called onVisibleChange', () => {
        const wrapper = mount(
            <Input
                type='password'
                value='111'
                trigger='click'
                onVisibleChange={errorSpy}
                iconRender={iconRender}
            />
        )
        expect(wrapper.find(`.${prefixInput}-affix-wrapper`).at(0).getDOMNode().className.includes(`${prefixInput}-password`)).toBe(
            true
        )
        wrapper.find(`.${prefixInput}-suffix .${prefixInput}-password-icon`).at(0).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(1)
        wrapper.setProps({disabled: true})
        wrapper.find(`.${prefixInput}-suffix .${prefixInput}-password-icon`).at(0).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })
})

describe('component: Input.Search, <test prop:: onSearch>, <test prop:: enterButton>', () => {
    afterEach(() => {
        errorSpy.mockReset()
    })

    afterAll(() => {
        errorSpy.mockRestore()
    })
    it('should support className when has enterButton', () => {
        const wrapper = mount(<Input type='search' enterButton value='111' onSearch={errorSpy} />)
        wrapper.find(`.wui-button`).simulate('click')
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        expect(errorSpy).toHaveBeenCalled()
    })
    it('should support className when has enterButton RectNode', () => {
        const wrapper = mount(
            <Input type='search' enterButton={<Button>搜索</Button>} value='111' onSearch={errorSpy} />
        )
        wrapper.find(`.wui-button`).simulate('click')
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        expect(errorSpy).toHaveBeenCalled()
    })
})

describe('component: Input.Search, <test prop:: enterButton>, <test prop:: icon>', () => {
    let icon = <Icon type='uf-star' />
    afterEach(() => {
        errorSpy.mockReset()
    })

    afterAll(() => {
        errorSpy.mockRestore()
    })
    it('onClick trigger once with enterButton & icon', () => {
        const wrapper = mount(<Input type='search' enterButton icon={icon} value='111' onSearch={errorSpy} />)
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        wrapper.find(`.wui-button`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(1)
        wrapper.find(`.uf-star`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(2)
    })
    it('onClick trigger once with enterButton string & icon', () => {
        const wrapper = mount(<Input type='search' enterButton='Search' icon={icon} value='111' onSearch={errorSpy} />)
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        wrapper.find(`.wui-button`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(1)
        wrapper.find(`.uf-star`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(2)
    })
    it('onClick trigger once with enterButton element & icon', () => {
        const wrapper = mount(
            <Input type='search' enterButton={<Button>搜索</Button>} icon={icon} value='111' onSearch={errorSpy} />
        )
        expect(
            wrapper.find(`.${prefixInput}-search`).at(0).getDOMNode().className.includes(`${prefixInput}-with-button`)
        ).toBe(true)
        wrapper.find(`.wui-button`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(1)
        wrapper.find(`.uf-star`).simulate('click')
        expect(errorSpy).toHaveBeenCalledTimes(2)
    })
})

describe('component: Input, <test prop:: className>, <test prop:: suffix>, <test prop:: prefix>', () => {
    it('should support className when has suffix', () => {
        const wrapper = mount(<Input suffix='suffix' className='my-class-name' />)
        expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(true)
        expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(false)
    })

    it('should support className when has prefix', () => {
        const wrapper = mount(<Input prefix='prefix' className='my-class-name' />)
        expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(true)
        expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(false)
    })
})

describe('As Form Control', () => {
    it('should be reset when wrapped in form.getFieldDecorator without initialValue', () => {
        const Demo = () => {
            const [form] = Form.useForm()
            const reset = () => {
                form.resetFields()
            }

            return (
                <Form form={form}>
                    <Form.Item name='input'>
                        <Input />
                    </Form.Item>
                    <Form.Item name='textarea'>
                        <Input.TextArea />
                    </Form.Item>
                    <button type='button' onClick={reset}>
                        reset
                    </button>
                </Form>
            )
        }

        const wrapper = mount(<Demo />)
        wrapper.find('input').simulate('change', {target: {value: '111'}})
        wrapper.find('textarea').simulate('change', {target: {value: '222'}})
        expect(wrapper.find('input').prop('value')).toBe('111')
        expect(wrapper.find('textarea').prop('value')).toBe('222')
        wrapper.find('button').simulate('click')
        expect(wrapper.find('input').prop('value')).toBe('')
        expect(wrapper.find('textarea').prop('value')).toBe(undefined)
    })
})

describe('component: Input, <test prop:: onChange>, <test prop:: antd> ', () => {
    it('test has antd  trigger event correctly', () => {
        let argumentEventObject
        let argumentEventObjectValue
        const onChange = e => {
            argumentEventObject = e
            argumentEventObjectValue = e.target.value
        }
        const wrapper = mount(<Input antd defaultValue='111' onChange={onChange} />)
        wrapper.find('input').simulate('change', {target: {value: '222'}})
        expect(argumentEventObjectValue).toBe('222')
    })
    it('test dont has antd  trigger event correctly', () => {
        let argumentEventObjectValue
        const onChange = e => {
            argumentEventObjectValue = e
        }
        const wrapper = mount(<Input onChange={onChange} />)
        wrapper.find('input').simulate('change', {target: {value: '222'}})
        expect(argumentEventObjectValue).toBe('222')
    })
})
describe('component: Input, <test prop:: showClose>, <test prop:: allowClear>, <test prop:: value>, <test prop:: defaultValue>', () => {
    it('should change type when click', () => {
        const wrapper = mount(<Input showClose />)
        wrapper.find('input').simulate('change', {target: {value: '111'}})
        expect(wrapper.find('input').getDOMNode().value).toEqual('111')
        wrapper.find('.uf-close-c').at(0).simulate('click')
        expect(wrapper.find('input').getDOMNode().value).toEqual('')
    })

    it('should change type when click', () => {
        const wrapper = mount(<Input allowClear />)
        wrapper.find('input').simulate('change', {target: {value: '111'}})
        expect(wrapper.find('input').getDOMNode().value).toEqual('111')
        wrapper.find('.uf-close-c').at(0).simulate('click')
        expect(wrapper.find('input').getDOMNode().value).toEqual('')
    })

    it('should not show icon if value is undefined, null or empty string', () => {
        const wrappers = [null, undefined, ''].map(val => mount(<Input showClose value={val} />))
        wrappers.forEach(wrapper => {
            expect(wrapper.find('input').getDOMNode().value).toEqual('')
            expect(wrapper.find('.has-close').exists()).not.toBeTruthy()
        })
    })

    it('should not show icon if defaultValue is undefined, null or empty string', () => {
        const wrappers = [null, undefined, ''].map(val => mount(<Input showClose defaultValue={val} />))
        wrappers.forEach(wrapper => {
            expect(wrapper.find('input').getDOMNode().value).toEqual('')
            expect(wrapper.find('.has-close').exists()).not.toBeTruthy()
        })
    })

    it('should trigger event correctly on controlled mode', () => {
        let argumentEventObjectValue
        const onChange = val => {
            argumentEventObjectValue = val
        }
        const wrapper = mount(<Input showClose value='111' onChange={onChange} />)
        wrapper.find('.uf-close-c').at(0).simulate('click')
        expect(argumentEventObjectValue).toBe('')
        expect(wrapper.find('input').at(0).getDOMNode().value).toBe('111')
    })
})
describe('component: Input, <test prop:: disabled>, <test prop:: readOnly>', () => {
    ;['disabled', 'readOnly'].forEach(prop => {
        it(`should not support showClose when it is ${prop}`, () => {
            const wrapper = mount(<Input showClose defaultValue='111' {...{[prop]: true}} />)
            expect(wrapper.find('.uf-close-c').exists()).toBeTruthy()
        })
    })
})
describe('component: Input, <test prop:: innerClassName>', () => {
    // // https://github.com/ant-design/ant-design/issues/27444
    it('should support innerClassName', () => {
        const wrapper = mount(<Input.Search showClose innerClassName='my-class-name' />)
        expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(false)
        expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(true)
    })
})
// todo wrapperClassName has not been developed
xdescribe('component: Input, <test prop:: wrapperClassName>', () => {
    // // https://github.com/ant-design/ant-design/issues/27444
    it('should support innerClassName', () => {
        const wrapper = mount(<Input.Search showClose wrapperClassName='my-class-name' />)
        expect(wrapper.getDOMNode().className.includes('my-class-name')).toBe(false)
        expect(wrapper.find('input').getDOMNode().className.includes('my-class-name')).toBe(true)
    })
})
describe('component: Input, <test prop:: innerStyle>', () => {
    it('should support innerStyle', () => {
        const wrapper = mount(<Input.Search showClose innerStyle={{color: 'red'}} />)
        expect(wrapper.find('input').prop('style').color).toEqual('red')
    })
})
describe('component: Input, <test prop:: componentClass>', () => {
    it('it should have textarea', () => {
        const wrapper = mount(<Input componentClass='textarea' />)
        expect(wrapper.find('textarea')).toBeTruthy()
    })
    it('it should have input', () => {
        const wrapper = mount(<Input componentClass='input' />)
        expect(wrapper.find('input')).toBeTruthy()
    })
})
xdescribe('Input.TextArea: props', () => {
    it('autoSize: value should be "123456789"', () => {
        const wrapper = mount(<Input maxLength={9} />)
        const input = wrapper.find('input').first()
        input.simulate('focus')
        const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        arr.forEach((_, index) => {
            wrapper.find('input').simulate('keypress', {
                keyCode: index + 96,
                bubbles: true
            })
        })
        // input.simulate('change', { target: { value: 'abcdefgggggttttt'} });
        input.simulate('keydown', {keyCode: 13})
        input.update()
        console.log('ppppppppppppppppppppp')
        expect(input.instance().value).toBe('123456789')
    })
    // it('it should have input', () => {
    //   const wrapper = mount(<Input componentClass='input' />);
    //   expect(wrapper.find('input')).toBeTruthy();
    // });
})

describe('component: Input, <test prop:: style>', function () {
    it('div should be has style', function () {
        let styleCss = {
            color: 'red',
            background: 'yellow'
        }
        let wrapper = mount(<Input style={styleCss} showClose={true} />)
        const div = wrapper.find(`.${prefixInput}-affix-wrapper`)
        expect(div.prop('style').color).toEqual('red')
        expect(div.prop('style').color).toEqual(styleCss.color)
        expect(div.prop('style').background).toEqual(styleCss.background)
    })
})
//新增fieldid测试
describe('component:  Input, <test prop:: fieldid>', () => {
    it('[contains(@fieldid,"***_clear")]', () => {
        let wrapper = mount(<Input showClose value='test' />)
        expect(wrapper.find(`.${prefixInput}-suffix`).at(0).props().fieldid).toBe(undefined)
        wrapper.setProps({fieldid: 'test'})
        // wrapper.update();
        expect(wrapper.find(`.${prefixInput}-suffix`).at(0).props().fieldid).toBe('test_clear')
    })
    it('[contains(@fieldid,"***_search,"***_clear")]', () => {
        let wrapper = mount(<Input showClose value='test' type='search' />)
        expect(wrapper.find(`.${prefixInput}-suffix`).at(0).props().fieldid).toBe(undefined)
        expect(wrapper.find(`.${prefixInput}-suffix`).at(1).props().fieldid).toBe(undefined)
        wrapper.setProps({fieldid: 'test'})
        // wrapper.update();
        expect(wrapper.find(`.${prefixInput}-suffix`).at(0).props().fieldid).toBe('test_clear')
        expect(wrapper.find(`.${prefixInput}-suffix`).at(1).props().fieldid).toBe('test_search')
    })
    it('[contains(@fieldid,"***_prefix","***_suffix")]', () => {
        let wrapper = mount(<Input showClose prefix='前缀' suffix='后缀' />)
        expect(wrapper.find(`.${prefixInput}-simple-prefix`).at(0).props().fieldid).toBe(undefined)
        expect(wrapper.find(`.${prefixInput}-simple-suffix`).at(0).props().fieldid).toBe(undefined)
        wrapper.setProps({fieldid: 'test'})
        // wrapper.update();
        expect(wrapper.find(`.${prefixInput}-simple-prefix`).at(0).props().fieldid).toBe('test_prefix')
        expect(wrapper.find(`.${prefixInput}-simple-suffix`).at(0).props().fieldid).toBe('test_suffix')
    })
})
describe('Jira Test', () => {
    // ============ feature QDJCJS-15137 换行符计入总计算长度，以便于前后端规则统一 ============
    // fix:【Textarea】换行符\n不计算字符长度 【无效】
    // feat:【Textarea】输入文本等于最大长度时角标显示为红色；
    // fix:【Textarea】QDJCJS-9829修复结尾字符为回车\n时超长无法继续输入问题【无效】
    // fix:【Textarea】QDJCJS-9920，修复角标忽略了换行符，但value未忽略问题 【无效】
    // fix:【Textarea】增加showMaxLabel属性，并移除Input的中文输入处理
    it('textarea showMaxLabel allowInputOverMax maxLength, <test prop:: allowInputOverMax>', () => {
        const onChange = jest.fn()
        let wrapper = mount(
            <Input type='textarea' showMaxLabel allowInputOverMax={false} maxLength={20} onChange={onChange} />
        )
        wrapper.find('textarea').simulate('change', {target: {value: 'aaaaa\nbbbbb\nccccc\nddddd\neeeee'}})
        // expect(wrapper.find('textarea').instance().value).toEqual('aaaaa\nbbbbb\nccccc\ndd') //textarea的值
        // expect(wrapper.find(`.${prefix}-textarea-limit`).text()).toBe('20/20') //数字角标
        // expect(wrapper.find(`.${prefix}-textarea-limit-current`).text()).toBe('20')
        // expect(onChange.mock.calls[0][0]).toEqual('aaaaa\nbbbbb\nccccc\ndd') //回调值
    })
    it('textarea showCount allowInputOverMax maxLength', () => {
        const onChange = jest.fn()
        let wrapper = mount(
            <Input type='textarea' showCount allowInputOverMax={false} maxLength={20} onChange={onChange} />
        )
        wrapper.find('textarea').simulate('change', {target: {value: 'aaaaa\nbbbbb\nccccc\nddddd\neeeee'}})
        // expect(wrapper.find('textarea').instance().value).toEqual('aaaaa\nbbbbb\nccccc\ndd') //textarea的值
        // expect(wrapper.find(`.${prefix}-textarea-limit`).text()).toBe('20/20') //数字角标
        // expect(wrapper.find(`.${prefix}-textarea-limit-current`).text()).toBe('20')
        // expect(onChange.mock.calls[0][0]).toEqual('aaaaa\nbbbbb\nccccc\ndd') //回调值
    })
    it('中文输入: textarea', () => {
        const onChange = jest.fn()
        let wrapper = mount(
            <Input type='textarea' showMaxLabel allowInputOverMax={false} maxLength={20} onChange={onChange} />
        )
        wrapper.find('textarea').simulate('compositionStart', {target: {value: ' '}})
        wrapper.find('textarea').simulate('change', {target: {value: '一二三'}})
        wrapper.find('textarea').simulate('compositionend', {target: {value: '一二三'}})
        expect(wrapper.find('textarea').instance().value).toEqual('一二三') //textarea的值
        expect(wrapper.find(`.${prefix}-textarea-limit`).text()).toBe('3/20') //数字角标
        expect(
            wrapper.find(`.${prefix}-textarea-limit-current`).hasClass(`${prefix}-textarea-limit-current-warning`)
        ).toBe(false) //没有超长，不警告
        expect(onChange.mock.calls[0][0]).toEqual('一二三') //回调值

        wrapper.find('textarea').simulate('compositionStart', {target: {value: ' '}})
        wrapper
            .find('textarea')
            .simulate('change', {target: {value: '一一一一一二二二二二三三三三三四四四四四五五五五五'}})
        wrapper
            .find('textarea')
            .simulate('compositionend', {target: {value: '一一一一一二二二二二三三三三三四四四四四五五五五五'}})
        // expect(wrapper.find('textarea').instance().value).toEqual('一一一一一二二二二二三三三三三四四四四四') //textarea的值
        // expect(wrapper.find(`.${prefix}-textarea-limit`).text()).toBe('20/20') //数字角标
        // expect(onChange.mock.calls[1][0]).toEqual('一一一一一二二二二二三三三三三四四四四四') //回调值
    })
    it('fix:【Textarea】移除rc-textarea，并增加wui-textarea样式；', () => {
        let wrapper = mount(<Input type='textarea' />)
        expect(wrapper.find('textarea').hasClass(`rc-textarea`)).toEqual(false)
        expect(wrapper.find('textarea').hasClass(`${prefix}-textarea`)).toEqual(true)
    })
})
