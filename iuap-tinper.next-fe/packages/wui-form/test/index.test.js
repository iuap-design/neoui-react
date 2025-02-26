/** Form.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import {attrsTest, eventsTest, mountTest, sleep} from "../../../next-ui-library/test/common/index"
import Button from '../../wui-button/src';
import {prefix} from '../../wui-core/src/updatePrefix';
import Input from '../../wui-input/src';
import Form from '../src/index';
import DemoForm from './formClass';
import Checkbox from '../../wui-checkbox/src';
import { useEffect, useState } from 'react'
import {fireEvent, render} from '@testing-library/react';
jest.mock('scroll-into-view-if-needed');
const prefixForm = `${prefix}-form`;

const prefixFormItem = `${prefix}-form-item`;

describe('Form', () => {
    // let wrapper: ReactWrapper;
    // beforeEach(() => {
    //     wrapper = mount(
    //         <DemoForm/>
    //     );
    // })
    // afterEach(() => {
    //     if (wrapper && wrapper.length) {
    //         wrapper.unmount();
    //     }
    // })

    // async function change(wrapper, index, value) {
    //     wrapper.find(Input).at(index).simulate('change', {target: {value}});
    //     await sleep(200);
    //     wrapper.update();
    // }

    mountTest(Form);
    mountTest(Form.Item);

    // it('not repeat render when Form.Item is not a real Field', async() => {
    //     const shouldNotRender = jest.fn();
    //     const StaticInput = () => {
    //         shouldNotRender();
    //         return <Input/>;
    //     };

    //     const shouldRender = jest.fn();
    //     const DynamicInput = () => {
    //         shouldRender();
    //         return <Input/>;
    //     };

    //     const formRef = React.createRef();

    //     mount(
    //         <div>
    //             <Form ref={formRef}>
    //                 <Form.Item>
    //                     <StaticInput/>
    //                 </Form.Item>
    //                 <Form.Item name="light">
    //                     <DynamicInput/>
    //                 </Form.Item>
    //             </Form>
    //         </div>,
    //     );

    //     expect(shouldNotRender).toHaveBeenCalledTimes(1);
    //     expect(shouldRender).toHaveBeenCalledTimes(1);

    //     formRef.current.setFieldsValue({light: 'bamboo'});
    //     await Promise.resolve();
    //     expect(shouldNotRender).toHaveBeenCalledTimes(1);
    //     expect(shouldRender).toHaveBeenCalledTimes(1);
    //     // expect(shouldRender).toHaveBeenCalledTimes(2);
    // });
    attrsTest({
        title: 'component: Form, <test prop:: layout>',
        Component: DemoForm,
        attrs: {
            layout: 'horizontal'
        },
        testAttr: {
            layout: 'vertical'
        },
        selector: `form.${prefixForm}`,
        classnames: [`${prefixForm}-horizontal`],
    });
    ['small', 'md', 'large'].forEach(size => {
        attrsTest({
            title: 'component: Form, <test prop:: size>',
            Component: DemoForm,
            attrs: {
                size
            },
            selector: `form.${prefixForm}`,
            classnames: [`${prefixForm}-${size}`],
        })
    })
    attrsTest({
        title: 'component: Form, <test prop:: labelAlign>',
        Component: DemoForm,
        attrs: {
            labelAlign: 'left'
        },
        testAttr: {
            labelAlign: 'right'
        },
        selector: `.${prefixFormItem}-label`,
        classnames: [`${prefixFormItem}-label-left`],
    })
    attrsTest({
        title: 'component: Form, <test prop:: labelCol>',
        Component: DemoForm,
        attrs: {
            labelCol: {span: 3, offset: 6},
        },
        testAttr: {
            labelCol: {},
        },
        selector: `div.${prefixFormItem}-label`,
        classnames: [`${prefix}-col-3`, `${prefix}-col-offset-6`],
    })
    attrsTest({
        title: 'component: Form, <test prop:: wrapperCol>',
        Component: DemoForm,
        attrs: {
            wrapperCol: {span: 3, offset: 6},
        },
        testAttr: {
            wrapperCol: {},
        },
        selector: `div.${prefixFormItem}-control`,
        classnames: [`${prefix}-col-3`, `${prefix}-col-offset-6`],
    })
    attrsTest({
        title: 'component: Form, <test prop:: requiredMark>',
        Component: DemoForm,
        attrs: {
            requiredMark: false,
        },
        testAttr: {
            requiredMark: true,
        },
        selector: `form.${prefixForm}`,
        classnames: [`${prefixForm}-hide-required-mark`],
    })
    attrsTest({
        title: 'component: Form, <test prop:: hideRequiredMark>',
        Component: DemoForm,
        attrs: {
            hideRequiredMark: true,
        },
        testAttr: {
            hideRequiredMark: false,
        },
        selector: `form.${prefixForm}`,
        classnames: [`${prefixForm}-hide-required-mark`],
    })
    // jest cannot test ::after
    describe('component: FormItem, <test prop:: colon>', () => {
        // tooltip动态id，不能使用快照测试
        xit('it should have :', () => {
            const wrapper = mount(
                <Form layout='horizontal' colon={true}>
                    <Form.Item
                        label="用户名"
                        name="username"
                        colon={true}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button colors="primary" htmlType="submit" className="login">
							登录
                        </Button>
                    </Form.Item>
                </Form>)
            // const wrapper = mount(<DemoForm layout='horizontal' />)
            // wrapper.update();
            // expect(() => wrapper.find('label::after')).to.throw('Enzyme::Selector does not support the "after" pseudo-element or pseudo-class selectors.')
        })
    })
    describe('component: FormItem, <test prop:: name>', () => {
        it('it should have :', () => {
            const wrapper = mount(
                <Form name="yogi">
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input/>
                    </Form.Item>
                </Form>)
            expect(wrapper.find('form').instance().id).toBe('yogi')
            expect(wrapper.find('input').instance().id).toBe('yogi_username')
        })
    })
    describe('component: FormItem, <test prop:: initialValues>', () => {
        it('it should have :', () => {
            const wrapper = mount(
                <Form initialValues={{username: '456'}}>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input/>
                    </Form.Item>
                </Form>)
            // expect(wrapper.find('form').instance().id).toBe('yogi')
            expect(wrapper.find('input').instance().value).toBe('456')
        })
    })

    eventsTest({
        title: 'component: Form, <test prop:: onValuesChange>',
        Component: DemoForm,
        propFuncName: 'onValuesChange',
        dependentProps: {},
        selector: 'input',
        eventName: 'change',
        eventArgs: [{target: {value: '456'}}],
        propFuncArgs: [{"username": "456"}]
    });
    eventsTest({
        title: 'component: Form, <test prop:: onFieldsChange>',
        Component: DemoForm,
        propFuncName: 'onFieldsChange',
        dependentProps: {initialValues: {username: '678'}},
        selector: 'input',
        eventName: 'change',
        eventArgs: [{target: {value: '456'}}]
    });
    describe('component: Form, <test prop:: onFinishFailed>', () => {
        it('submit failed callback', async () => {
            const mockEvent = jest.fn();
            const wrapper = mount(<Form onFinishFailed={mockEvent}>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button colors="primary" htmlType="submit" id="login">
                        登录
                    </Button>
                </Form.Item>
            </Form>, { attachTo: document.body })
            document.getElementById('login').dispatchEvent(new MouseEvent('click'));
            await sleep(100)
            expect(mockEvent).toHaveBeenCalled()
        })
    })
    describe('component: Form, <test prop:: labelWrap>', () => {
        it('labelWrap false', async () => {
            const wrapper = mount(<DemoForm labelWrap={false} />)
            expect(wrapper.find(`.${prefixFormItem}-label`).at(0).hasClass(`${prefixFormItem}-label-wrap`)).toBe(false)
        })
        it('labelWrap true', async () => {
            const wrapper = mount(<DemoForm labelWrap={true} />)
            expect(wrapper.find(`.${prefixFormItem}-label`).at(0).hasClass(`${prefixFormItem}-label-wrap`)).toBe(true)
        })
    })
    describe('component: Form, <test prop:: form>', () => {
        function HookDemo(props) {
            const [form] = Form.useForm()
            const [checkNick, setCheckNick] = useState(false)
            useEffect(() => {
                form.validateFields(['nickname'])
            }, [checkNick])
            const onCheckboxChange = checked => {
                setCheckNick(checked)
            }
            const onCheck = async () => {
                try {
                    const values = await form.validateFields()
                    console.log('Success:', values)
                } catch (errorInfo) {
                    console.log('Failed:', errorInfo)
                }
            }
            return (
                <Form form={form} {...props}>
                    <Form.Item
                        name='demo9-username'
                        label='用户名'
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名'
                            }
                        ]}
                    >
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        name='nickname'
                        label='昵称'
                        rules={[
                            {
                                required: checkNick,
                                message: '请输入昵称'
                            }
                        ]}
                    >
                        <Input placeholder='请输入昵称' />
                    </Form.Item>
                    <Form.Item label=' '>
                        <Checkbox checked={checkNick} onChange={onCheckboxChange}>
                            昵称是必填项
                        </Checkbox>
                    </Form.Item>
                    <Form.Item label=' '>
                        <Button type='primary' id='login' onClick={onCheck}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
        it('use hook form', async () => {
            const wrapper = mount(<HookDemo />)
            const checkSpy = jest.spyOn(console, 'log');
            wrapper.find('button').at(0).simulate('click')
            await sleep(100)
            expect(checkSpy).toHaveBeenCalledWith(
                "Failed:", { "errorFields": [{ "errors": ["请输入用户名"], "name": ["demo9-username"], "warnings": [] }], "outOfDate": false, "values": { "demo9-username": undefined, "nickname": undefined } }
            )
        })
    })
    describe('component: Form, <test prop:: scrollToFirstError>', () => {
        it('automatically scroll to the first error fields', async () => {
            const mockEvent = jest.fn();
            scrollIntoView.mockImplementation(() => { });
            const wrapper = mount(<Form scrollToFirstError={{ block: 'center' }} onFinishFailed={mockEvent}>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button colors="primary" htmlType="submit" id="login">
                        登录
                    </Button>
                </Form.Item>
            </Form>, { attachTo: document.body })
            expect(scrollIntoView).not.toHaveBeenCalled();
            document.getElementById('login').dispatchEvent(new MouseEvent('click'));
            await sleep(100)
            expect(mockEvent).toHaveBeenCalled()
            const inputNode = document.getElementById('username');
            expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
                block: 'center',
                scrollMode: 'if-needed',
            });
        })
    })

    describe('component: Form.create, <test prop:: create>', () => {
        it('labelWrap false', async () => {
            const CreateForm = Form.create()(DemoForm)
            // const wrapper = mount(<CreateForm />)
            console.log(CreateForm)
            //expect(wrapper.find(`.${prefixFormItem}-label`).at(0).hasClass(`${prefixFormItem}-label-wrap`)).toBe(false)
        })
    })
    describe('component: requiredMark, <test prop:: requiredMark>', () => {
        it('requiredMark', async () => {
            const wrapper = mount(<Form requiredMark={'optional'}>
                <Form.Item
                    label="用户名"
                    name="username"
                    colon
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button colors="primary" htmlType="submit" id="login">
                        登录
                    </Button>
                </Form.Item>
            </Form>)
            expect(wrapper.find(`.${prefixFormItem}-required-mark-optional`).exists()).toBe(true)
        })
    })
    describe('component: Form,<test prop:: List> <test prop:: ErrorList>', () => {
        it('List ErrorList', async () => {
            const mockEvent = jest.fn();
            const {container} = render(
            <Form name="dynamic_form_item" onFinishFailed={mockEvent}>
                <Form.List
                    name="names"
                    rules={[
                        {
                            validator: async(_, names) => {
                                if (!names || names.length < 2) {
                                    return Promise.reject(new Error('At least 2 passengers'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Passengers' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            placeholder="passenger name"
                                            style={{
                                                width: '60%',
                                            }}
                                        />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <Icon
                                            type="uf-reduce-c-o"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button onClick={() => add()} id="addlist">Add field</Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" id="errlist">Submit</Button>
                </Form.Item>
            </Form>)
            // document.getElementById('addlist').dispatchEvent(new MouseEvent('click'));
            // document.getElementById('errlist').dispatchEvent(new MouseEvent('click'));
            expect(container.querySelector(`.${prefix}-input`)).toBe(null)
            fireEvent.click(container.querySelector('#addlist'))
            fireEvent.click(container.querySelector('#errlist'))
            await sleep(100)
            expect(mockEvent).toHaveBeenCalled()
            expect(container.querySelector(`.${prefix}-input`)).not.toBe(null)
            // expect(container.querySelector(`.${prefixFormItem}-explain-error`).textContent).toBe('At least 2 passengers');
        })
    })

    describe('component: Form,<test prop:: Provider>', () => {
        it('Provider', async () => {
            const wrapper = mount(
            <Form.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === 'userForm') {
                        const { basicForm } = forms;
                        const users = basicForm.getFieldValue('users') || [];
                        basicForm.setFieldsValue({ users: [...users, values] });
                        setOpen(false);
                    }
                }}
            >
                <Form name="basicForm">
                    <Form.Item name="group" label="Group Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="User List"
                        shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
                    >
                        {({ getFieldValue }) => {
                            const users = getFieldValue('users') || [];
                            return users.length ? (
                                <ul>
                                    {users.map((user) => (
                                        <li key={user.name} className="user">
                                            <Avatar icon={<Icon type="uf-caven"/>} />
                                            {user.name} - {user.age}
                                        </li>
                                    ))}
                                </ul>
                            ) : ('No user yet');
                        }}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" id="provider_submit1"> Submit </Button>
                    </Form.Item>
                </Form>

                {/* 子表单 */}
                <Form layout="vertical" name="userForm" initialValues={{name: 'jomn', age: 26}}>
                    <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" id="provider_submit2">Submit</Button>
                    </Form.Item>
                </Form>
            </Form.Provider>)
            // document.getElementById('provider_submit2').dispatchEvent(new MouseEvent('click'));
            wrapper.find('button').at(1).simulate('click');
            // await sleep(100)
            // expect(wrapper.find(`.user`).text()).toBe('jomn-26')
        })
    })
})

describe('component: Form, <test prop:: disabled>', () => {
    it('submit failed disabled', () => {
        const wrapper = mount(<Form disabled>
                                <Form.Item>
                                    <Button colors="primary" htmlType="submit" id="login">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>)
        expect(wrapper.find('button').props().disabled).toBe(true)
    })
})

describe('component: Form, <test prop:: hidden>', () => {
    it('form should hidden', () => {
        const wrapper = mount(<Form hidden>
                                <Form.Item name="item">
                                    <Input></Input>
                                </Form.Item>
                            </Form>)
        expect(wrapper.find(`form.${prefixForm}`).props().hidden).toBe(true)
    })
    it('form should not render', () => {
        const wrapper = mount(<Form hidden={"destroy"}>
                                <Form.Item name="item">
                                    <Input></Input>
                                </Form.Item>
                            </Form>)
        expect(wrapper.length).toBe(0)
    })
})