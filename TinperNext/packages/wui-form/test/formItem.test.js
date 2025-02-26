/** FormItem.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';

import {attrsTest, eventsTest, testChildren, testStyle, sleep} from "../../../next-ui-library/test/common/index";
import Button from '../../wui-button/src'
import {prefix} from '../../wui-core/src/updatePrefix';
import Input from '../../wui-input/src';
import Switch from '../../wui-switch/src'
import Form from '../src/index';
import DemoForm from './formClass';
import DemoFormItem from './formItemClass';
import {fireEvent, render} from '@testing-library/react';

const prefixFormItem = `${prefix}-form-item`
/**
fieldKey: PropTypes.any,
 */
// let wrapper: ReactWrapper;
// beforeEach(() => {
//     wrapper = mount(<Form.Item><Input/></Form.Item>);
// })
// afterEach(() => {
//     if (wrapper && wrapper.length) {
//         wrapper.unmount();
//     }
// })
describe('component: FormItem, <test prop:: noStyle>', () => {
    it('it should have not style', () => {
        // expect(wrapper).toMatchSnapshot()
        let wrapper = mount(<Form.Item><Input/></Form.Item>);
        expect(wrapper.find(`div.${prefixFormItem}`)).toHaveLength(1);
        wrapper.setProps({
            noStyle: true
        })
        expect(wrapper.find(`div.${prefixFormItem}`)).toHaveLength(0);
    })
})
testStyle({
    title: 'component: FormItem, <test prop:: style>',
    selector: `div.${prefixFormItem}`,
    Component: DemoFormItem,
    style: {
        color: 'red'
    }
})
testChildren({
    title: 'component: FormItem, <test prop:: children>',
    Component: Form.Item,
    attrs: {
        children: <Input/>
    },
    selector: `.${prefix}-input`
})
describe('component: FormItem, <test prop:: label>', () => {
    it('it should have not style', () => {
        let wrapper = mount(<Form.Item><Input/></Form.Item>);
        wrapper.setProps({
            label: <div>name</div>
        })
        expect(wrapper.find(`label div`).text()).toBe('name');
    })
})
attrsTest({
    title: 'component: FormItem, <test prop:: required>, <test prop:: label>',
    Component: DemoFormItem,
    attrs: {
        required: true,
        label: "姓名:"
    },
    testAttr: {
        required: false
    },
    selector: 'label',
    classnames: [`${prefixFormItem}-required`],
})
attrsTest({
    title: 'component: FormItem, <test prop:: hidden>',
    Component: DemoFormItem,
    attrs: {
        hidden: true
    },
    testAttr: {
        hidden: false
    },
    selector: `.${prefixFormItem}`,
    classnames: [`${prefixFormItem}-hidden`],
})
attrsTest({
    title: 'component: FormItem, <test prop:: hidden>',
    Component: DemoFormItem,
    attrs: {
        hidden: 'hidden'
    },
    testAttr: {
        hidden: false
    },
    selector: `.${prefixFormItem}`,
    classnames: [`${prefixFormItem}-hidden`],
})
describe('component: FormItem, <test prop:: hidden>', () => {
    it('it should not render', () => {
        let wrapper = mount(<Form><Form.Item name="test" hidden={"destroy"}><Input/></Form.Item></Form>);
        expect(wrapper.exists(`.${prefixFormItem}`)).toBe(false);
    })
})
attrsTest({
    title: 'component: FormItem, <test prop:: labelAlign>',
    Component: DemoFormItem,
    attrs: {
        labelAlign: 'left',
        label: <div>name</div>
    },
    testAttr: {
        labelAlign: 'right'
    },
    selector: `.${prefixFormItem}-label`,
    classnames: [`${prefixFormItem}-label-left`],
})

attrsTest({
    title: 'component: FormItem, <test prop:: labelCol>',
    Component: DemoFormItem,
    attrs: {
        labelCol: {span: 3, offset: 6},
        label: <div>name</div>
    },
    testAttr: {
        labelCol: {},
    },
    selector: `div.${prefixFormItem}-label`,
    classnames: [`${prefix}-col-3`, `${prefix}-col-offset-6`],
})

describe('component: FormItem, <test prop:: name>', () => {
    it('it should have not style', () => {
        let wrapper = mount(<Form.Item><Input/></Form.Item>);
        wrapper.setProps({
            name: 'name1',
        })
        expect(wrapper.find('input').instance().id).toBe('name1');
    })
})
// waiting bug fix
xdescribe('component: FormItem, <test prop:: initialValue>', () => {
    it('it should have not style', () => {
        const wrapper1 = mount(
            <DemoFormItem initialValue='123'/>
        )
        expect(wrapper1.find('input').instance().value).toBe('123');
    })
})
describe('component: FormItem, <test prop:: htmlFor>', () => {
    it('it should have a attribute name for', () => {
        let wrapper = mount(<Form.Item><Input/></Form.Item>);
        wrapper.setProps({
            htmlFor: 'name1',
            label: 'label1',
            name: 'name1'
        })
        expect(wrapper.find('label').getDOMNode().getAttribute('for')).toBe('name1');
    })
})
describe('component: FormItem, <test prop:: help>', () => {
    it('it should have a class', () => {
        let wrapper = mount(<Form.Item><Input/></Form.Item>);
        const help = <div>wwwwwwwwwwww</div>
        wrapper.setProps({
            help
        })
        expect(wrapper.find(`div.${prefixFormItem}`).hasClass(`${prefixFormItem}-with-help`)).toBe(true);
    })
})
describe('component: FormItem, <test prop:: rules>, <test prop:: validateTrigger>', () => {
    it('it should have not style', async() => {
        const wrapper1 = mount(<DemoForm validateTrigger="onBlur" rules={[
            {
                required: true,
                message: (
                    <div>
                        <span>请输入用户名</span>
                    </div>
                )
            }
        ]}/>)

        wrapper1.find('input').at(0).simulate('blur');
        wrapper1.find('button').at(0).simulate('click');
        expect(wrapper1.find(`div.${prefixFormItem}`).at(0).hasClass(`${prefixFormItem}-is-validating`)).toBe(true);
    })
})
describe('component: FormItem, <test prop:: trigger>', () => {
    it('it should have not style', async() => {
        const mockonValuesChange = jest.fn();
        const wrapper1 = mount(<Form trigger="onFocus" initialValues={{username: '123'}}
									 onValuesChange={mockonValuesChange}>
            <Form.Item
                label="用户名"
                name="username"
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button colors="secondary" style={{marginRight: "8px"}}>
					取消
                </Button>
                <Button colors="primary" htmlType="submit" className="login">
					登录
                </Button>
            </Form.Item>
        </Form>)
        wrapper1.find('input').simulate('change', {target: {value: '567'}});
        expect(mockonValuesChange).toHaveBeenCalled();
        // expect(mockonValuesChange.mock.calls[0][0].username).toBe('123')
        expect(mockonValuesChange.mock.calls[0][0].username).toBe('567')

        // expect(wrapper1.find(`div.${prefixFormItem}`).at(0).hasClass(`${prefixFormItem}-is-validating`)).toBe(true);
    })
})
describe('component: FormItem, <test prop:: valuePropName>', () => {
    it('it should have not class name is-checked', async() => {
        const wrapper1 = mount(<Form
            name="validate_other"
            initialValues={{
                switch: true
            }}
        >
            <Form.Item name="switch" label="Switch">
                <Switch/>
            </Form.Item>
        </Form>)
        expect(wrapper1.find(`button`).hasClass(`is-checked`)).toBe(false);
    })
    it('it should have class name is-checked', async() => {
        const wrapper2 = mount(<Form
            name="validate_other"
            initialValues={{
                switch: true
            }}
        >
            <Form.Item name="switch" label="Switch" valuePropName="checked">
                <Switch/>
            </Form.Item>
        </Form>)
        expect(wrapper2.find(`button`).hasClass(`is-checked`)).toBe(true);
    })
})
eventsTest({
    title: 'component: FormItem, <test prop:: getValueFromEvent>',
    Component: DemoFormItem,
    propFuncName: 'getValueFromEvent',
    dependentProps: {name: 'name'},
    selector: 'input',
    eventName: 'change',
    eventArgs: [{target: {value: '123'}}],
    propFuncArgs: ['123', 'mockEvent']
});
eventsTest({
    title: 'component: FormItem, <test prop:: normalize>',
    Component: DemoFormItem,
    propFuncName: 'normalize',
    dependentProps: {name: 'name'},
    selector: 'input',
    eventName: 'change',
    eventArgs: [{target: {value: '123'}}]
});
const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
});
describe('component: FormItem, <test prop:: shouldUpdate><test prop:: dependencies>', () => {
    it('`shouldUpdate` should work with render props', () => {
        mount(
            <Form>
                <Form.Item>{() => null}</Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            'Warning: [tinper: Form.Item] `children` of render props only work with `shouldUpdate` or `dependencies`.',
        );
    });

    it("`shouldUpdate` shouldn't work with `dependencies`", () => {
        mount(
            <Form>
                <Form.Item shouldUpdate dependencies={[]}>
                    {() => null}
                </Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            "Warning: [tinper: Form.Item] `children` of render props only work with `shouldUpdate` or `dependencies`."
        );
    });

    it('`name` should not work with render props', () => {
        mount(
            <Form>
                <Form.Item name="test" shouldUpdate>
                    {() => null}
                </Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            "Warning: [tinper: Form.Item] Do not use `name` with `children` of render props since it's not a field.",
        );
    });

    it('children is array has name props', () => {
        mount(
            <Form>
                <Form.Item name="test">
                    <div>one</div>
                    <div>two</div>
                </Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            'Warning: [tinper: Form.Item] `children` is array of render props cannot have `name`.',
        );
    });

    it('warning when use `name` but children is not validate element', () => {
        mount(
            <Form>
                <Form.Item name="warning">text</Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            'Warning: [tinper: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
        );
    });
    it('warning when use `dependencies` but `name` is empty & children is not a render props', () => {
        mount(
            <Form>
                <Form.Item dependencies={[]}>text</Form.Item>
            </Form>,
        );
        expect(errorSpy).toHaveBeenCalledWith(
            'Warning: [tinper: Form.Item] Must set `name` or use render props when `dependencies` is set.',
        );
    });
})
describe('component: FormItem, <test prop:: required>,<test prop:: valuePropName><test prop:: dependencies>', () => {
    it('dynamic change required', async () => {
        const {container} = render(<Form>
                                        <Form.Item label="light" name="light" valuePropName="checked">
                                            <input type="checkbox"/>
                                        </Form.Item>
                                        <Form.Item
                                            label="bamboo"
                                            name="bamboo"
                                            dependencies={['light']}
                                            rules={[({getFieldValue}) => ({required: getFieldValue('light')})]}
                                        >
                                            <input/>
                                        </Form.Item>
                                    </Form>);

        expect(container.querySelector(`.${prefixFormItem}-required`)).toBe(null);
        // fireEvent.change(container.querySelector(`input[type="checkbox"]`), {target: {checked: true}})
        fireEvent.click(container.querySelector(`input[type="checkbox"]`))
        expect(container.querySelector(`.${prefixFormItem}-required`)).not.toBe(null);

        // wrapper.find('input[type="checkbox"]').simulate('change', {target: {checked: true}});
        // await sleep(500)
        // wrapper.update();
        // expect(wrapper.find(`.${prefixFormItem}-required`)).toHaveLength(1);
    });

})
describe('component: FormItem, <test prop:: validateStatus>,<test prop:: hasFeedback>', () => {
    [['success', 'uf-correct'], ['warning', 'uf-exc-t'], ['error', 'uf-exc-c'], ['validating', 'uf-i-c']].forEach(item => {
        it(`validateStatus: ${item[0]}`, () => {
            const wrapper = mount(
                <Form>
                    <Form.Item hasFeedback validateStatus={item[0]}
                        label='密码'
                        name='password'
                        rules={[{ required: true, }]}
                    >
                        <Input placeholder='请输入密码' type='password' />
                    </Form.Item>
                </Form >
            );
            expect(wrapper.find(`.${prefixFormItem}-children-icon i`).hasClass(item[1])).toBe(true);
        });
    })
    it(`automatically generates validateStatus`, async () => {
        const wrapper = mount(
            <Form>
                <Form.Item hasFeedback
                    label='密码'
                    name='password'
                    rules={[{ required: true, }]}
                >
                    <Input placeholder='请输入密码' type='password' />
                </Form.Item>
            </Form >
        );
        expect(wrapper.find(`.${prefixFormItem}-children-icon`)).toHaveLength(0);
        wrapper.find('input[type="password"]').simulate('blur');
        expect(wrapper.find(`.${prefixFormItem}-children-icon i`).hasClass('uf-i-c')).toBe(true);//validating状态
        await sleep(100)
        wrapper.update();
        expect(wrapper.find(`.${prefixFormItem}-children-icon i`).hasClass('uf-exc-c')).toBe(true);//error状态
    });
})
describe('component: FormItem, <test prop:: messageVariables>', () => {
    it('messageVariables` support validate', async () => {
        const wrapper = mount(
            <Form validateMessages={{ required: '${label} is wrong!' }}>
                <Form.Item name="test" messageVariables={{ label: 'password' }} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        );
        wrapper.find('input').first().simulate('blur');
        await sleep(100);
        wrapper.find('input').first().simulate('focus');
        expect(wrapper.find(`.${prefixFormItem}-explain`).first().text()).toEqual("'password' 是必填项");
    });
})
describe('component: FormItem, <test prop:: tooltip>', () => {
    it('ReactNode', async () => {
        const mockClick = jest.fn();
        const {container} = render(
          <Form>
            <Form.Item name={null} label="light" tooltip={{title: <span>Tooltip</span>, onVisibleChange: mockClick}}>
              <Input />
            </Form.Item>
          </Form>
        );
        let icon = container.querySelector(`.${prefix}-icon`);
        fireEvent.mouseEnter(icon)
        await sleep(500);
        expect(mockClick).toHaveBeenCalled();
        expect(document.querySelector(`.${prefix}-tooltip`).textContent).toEqual('Tooltip');
    });
    it('Object', async () => {
        const {container} = render(
          <Form>
            <Form.Item label="light" tooltip={{title: '123'}}>
              <Input />
            </Form.Item>
          </Form>
        );
        let icon = container.querySelector(`.${prefix}-icon`);
        fireEvent.mouseEnter(icon)
        await sleep(500);
        expect(document.querySelector(`.${prefix}-tooltip`).textContent).toEqual('123');
    });
})
describe('component: FormItem, <test prop:: name>', () => {
    it('name: null', async () => {
        const mockClick = jest.fn();
        const {container} = render(
          <Form>
            <Form.Item name={null} label="light" tooltip={{title: <span>Tooltip</span>, onVisibleChange: mockClick}}>
              <Input />
            </Form.Item>
          </Form>
        );
        let icon = container.querySelector(`.${prefix}-icon`);
        fireEvent.mouseEnter(icon)
        await sleep(500);
        expect(mockClick).toHaveBeenCalled();
        expect(document.querySelector(`.${prefix}-tooltip`).textContent).toEqual('Tooltip');
    });
})
describe('component: FormItem, <test prop:: required>', () => {
    it('data-__meta: required', () => {
        const wrapper = mount(
          <Form>
            <Form.Item name="light" label="light">
              <Input data-__meta={{validate: [{rules: [{required: true}]}]}} data-__field={{errors: ['errors msg', <Button icon="uf-reject-2" />, {message: <Button icon="uf-reject-2" />}]}} />
            </Form.Item>
          </Form>
        );
        expect(wrapper.find(`.${prefix}-form-item-row-required`).exists()).toEqual(true);
    });
    it('rules: required', () => {
        const wrapper = mount(
          <Form>
            <Form.Item rules={[{required: true}]}>
              <Input />
            </Form.Item>
          </Form>
        );
        expect(wrapper.find(`.${prefix}-form-item-row-required`).exists()).toEqual(true);
    });
    it('noStyle <test prop:: fieldKey><test prop:: onSubmit>', () => {
        const {container} = render(
          <Form>
            <Form.Item noStyle>
              <Input />
            </Form.Item>
          </Form>
        );
        expect(container.querySelector(`.${prefix}-form-item`)).toEqual(null);
    });
    it('data-__meta: required', () => {
        const wrapper = mount(
          <Form>
            <Form.Item name="light" label="light">
              <Input data-__meta={{validate: [{rules: [{required: true}]}]}} data-__field={{errors: ['errors msg', <Button icon="uf-reject-2" />, {message: <Button icon="uf-reject-2" />}]}} />
              <Input />
              <Form.Item>
                <Input />
              </Form.Item>
            </Form.Item>
          </Form>
        );
        expect(wrapper.find(`.${prefix}-form-item-row-required`).exists()).toEqual(true);
    });
})
    