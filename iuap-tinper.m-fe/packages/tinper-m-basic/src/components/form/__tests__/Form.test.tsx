/** Form.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { Form, Input, Button, Radio } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixForm = `${muiPrefix}-form`;
const prefixList = `${muiPrefix}-list`;

describe(('Form Component'), () => {
    let wrapper = mount(<Form />)
    it('fieldid test, <test prop:: fieldid>', () => {
        expect(wrapper.find(`.${prefixForm}`).prop('fieldid')).toEqual(undefined)
        wrapper.setProps({ fieldid: 'test' })
        expect(wrapper.find(`.${prefixForm}`).prop('fieldid')).toEqual('test_form')
    });
    it('footer test, <test prop:: footer>, <test prop:: fieldid>', () => {
        expect(wrapper.exists(`.${prefixForm}-footer`)).toEqual(false)
        wrapper = mount(<Form fieldid="test" footer={<div className="footer-test">foo</div>}></Form>)
        expect(wrapper.find(`.${prefixForm}-footer`).instance().innerHTML).toEqual('<div class=\"footer-test\">foo</div>')
        expect(wrapper.find(`.${prefixForm}-footer`).prop('fieldid')).toEqual('test_form_footer')
    });
    it('clsPrefix test, <test prop:: clsPrefix>', () => {
        const clsPrefix = 'test-cls'
        expect(wrapper.hasClass(`${prefixForm}`)).toEqual(true)
        expect(wrapper.hasClass(`${clsPrefix}-form`)).toEqual(false)
        wrapper = mount(<Form clsPrefix={clsPrefix}></Form>)
        expect(wrapper.hasClass(`${prefixForm}`)).toEqual(false)
        expect(wrapper.hasClass(`${clsPrefix}-form`)).toEqual(true)
    });
    it('mode test, <test prop:: mode>', () => {
        wrapper = mount(<Form mode='default'>
            <Form.Item name={'name'} label='客户名称'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find(`.${prefixList}`).hasClass(`${prefixList}-default`)).toEqual(true)
        wrapper.setProps({ mode: 'card' })
        expect(wrapper.find(`.${prefixList}`).hasClass(`${prefixList}-card`)).toEqual(true)
    });
    it('disabled test, <test prop:: disabled>', () => {
        wrapper = mount(<Form disabled>
            <Form.Item name={'name'} label='客户名称'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find(`.${prefixList}-item`).hasClass(`${prefixList}-item-disabled`)).toEqual(true)
    });
    it('className test, <test prop:: className>', () => {
        wrapper = mount(<Form className='test'></Form>)
        expect(wrapper.find(`.${prefixForm}`).hasClass('test')).toEqual(true)
    });
    it('initialValues test, <test prop:: initialValues>', () => {
        wrapper = mount(<Form initialValues={{ a: 'aaa' }}>
            <Form.Item name={'a'} label='客户名称'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find('input').prop('value')).toEqual('aaa')
    });
    it('name test, <test prop:: name>', () => {
        wrapper = mount(<Form >
            <Form.Item name={'a'} label='客户名称'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find(`.${prefixForm}-item-label`).prop('for')).toEqual('a')

        wrapper.setProps({ name: 'test' })
        expect(wrapper.find(`.${prefixForm}-item-label`).prop('for')).toEqual('test_a')
    });
    it('layout test, <test prop:: layout>', () => {
        wrapper = mount(<Form>
            <Form.Item name={'a'} label='客户名称'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find(`.${prefixList}-item`).hasClass(`${prefixForm}-item-vertical`)).toEqual(true)

        wrapper.setProps({ layout: 'horizontal' })
        expect(wrapper.find(`.${prefixList}-item`).hasClass(`${prefixForm}-item-horizontal`)).toEqual(true)
    });
    it('requiredMarkStyle test, <test prop:: requiredMarkStyle>', () => {
        wrapper = mount(<Form>
            <Form.Item name={'a'} label='客户名称' required>
                <Input />
            </Form.Item>
            <Form.Item name={'b'} label='客户名称1'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find(`.${prefixForm}-item-required-asterisk`).instance().innerHTML).toEqual("*")
        wrapper.setProps({ requiredMarkStyle: 'asterisk' })
        expect(wrapper.find(`.${prefixForm}-item-required-asterisk`).instance().innerHTML).toEqual("*")

        wrapper.setProps({ requiredMarkStyle: 'text-required' })
        expect(wrapper.find(`.${prefixForm}-item-required-text`).instance().innerHTML).toEqual("(必填)")

        wrapper.setProps({ requiredMarkStyle: 'text-optional' })
        expect(wrapper.find(`.${prefixForm}-item-required-text`).instance().innerHTML).toEqual("(选填)")

        wrapper.setProps({ requiredMarkStyle: 'none' })
        expect(wrapper.exists(`.${prefixForm}-item-required-asterisk`)).toEqual(false)
        expect(wrapper.exists(`.${prefixForm}-item-required-text`)).toEqual(false)
    });
    it('hasFeedback test, <test prop:: hasFeedback>', async () => {
        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} >
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error`)).toEqual(true)
        wrapper.unmount()

        wrapper = mount(<Form hasFeedback={false} footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} >
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error`)).toEqual(false)
    });
    it('validateMessages test, <test prop:: validateMessages>', async () => {
        wrapper = mount(
            <Form footer={<Button block type='submit' >提交</Button>} >
                <Form.Item label='姓名' name='name' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        )
        wrapper.find('button').simulate('click');
        await sleep(100);
        expect(wrapper.find(`.${prefixForm}-item-feedback-error`).instance().innerHTML).toEqual('请输入姓名')

        const validateMessages = {
            required: "name必选字段",
        }
        wrapper.setProps({ validateMessages: validateMessages })
        wrapper.find('button').simulate('click');
        await sleep(100);
        expect(wrapper.find(`.${prefixForm}-item-feedback-error`).instance().innerHTML).toEqual('name必选字段')
    });
    it('validateTrigger test, <test prop:: validateTrigger>', async () => {
        wrapper = mount(
            <Form footer={<Button block type='submit' >提交</Button>} >
                <Form.Item label='姓名' name='name' rules={[{ required: true }]}>
                    <Input defaultValue="11" />
                </Form.Item>
            </Form>
        )
        wrapper.find('input').simulate('change', { target: { value: null } });
        await sleep(100)
        expect(wrapper.find(`.${prefixForm}-item-feedback-error`).instance().innerHTML).toEqual('请输入姓名')
        wrapper.unmount()

        wrapper = mount(
            <Form footer={<Button block type='submit' >提交</Button>} validateTrigger="onFocus">
                <Form.Item label='姓名' name='name' rules={[{ required: true }]} validateTrigger="onFocus">
                    <Input defaultValue="11" />
                </Form.Item>
            </Form>
        )
        wrapper.find('input').simulate('change', { target: { value: null } });
        await sleep(100)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error`)).toEqual(false)
        wrapper.find('input').simulate('blur');
        wrapper.find('input').simulate('focus');
        await sleep(100)
        expect(wrapper.find(`.${prefixForm}-item-feedback-error`).instance().innerHTML).toEqual('请输入姓名')
    });
});

// preserve
describe('Form Component', () => {
    function fun0() {
        return (
            <div className="form-demo">
                <Form initialValues={{ loginMethod: 'mobile', account: '1961234123' }}>
                    <Form.Item name='loginMethod' label='登录方式'>
                        <Radio.Group>
                            <Radio value='mobile'>手机号</Radio>
                            <Radio value='email'>邮箱</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Subscribe to={['loginMethod']}>
                        {({ loginMethod }) => (
                            <>
                                {loginMethod === 'mobile' && (
                                    <Form.Item name='account' label='手机号'>
                                        <Input placeholder='请输入手机号' />
                                    </Form.Item>
                                )}
                                {loginMethod === 'email' && (
                                    <Form.Item name='account' label='邮箱'>
                                        <Input placeholder='请输入邮箱' />
                                    </Form.Item>
                                )}
                            </>
                        )}
                    </Form.Subscribe>
                </Form>
            </div>
        )
    }
    function fun1() {
        return (
            <div className="form-demo">
                <Form preserve={false} initialValues={{ loginMethod: 'mobile', account: '1961234123' }}>
                    <Form.Item name='loginMethod' label='登录方式'>
                        <Radio.Group>
                            <Radio value='mobile'>手机号</Radio>
                            <Radio value='email'>邮箱</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Subscribe to={['loginMethod']}>
                        {({ loginMethod }) => (
                            <>
                                {loginMethod === 'mobile' && (
                                    <Form.Item name='account' label='手机号'>
                                        <Input placeholder='请输入手机号' />
                                    </Form.Item>
                                )}
                                {loginMethod === 'email' && (
                                    <Form.Item name='account' label='邮箱'>
                                        <Input placeholder='请输入邮箱' />
                                    </Form.Item>
                                )}
                            </>
                        )}
                    </Form.Subscribe>
                </Form>
            </div>
        )
    }

    it('preserve be true, <test prop:: preserve>', () => {
        const wrapper = mount(fun0());
        wrapper.find('.mui-input-box').simulate('change', { target: { value: '123' } })
        wrapper.find('.mui-radio').at(1).simulate('click')
        wrapper.find('.mui-radio').at(0).simulate('click')
        expect(wrapper.find('.mui-input-box').prop('value')).toEqual('123')
    });
    it('preserve be false, <test prop:: preserve>', () => {
        const wrapper = mount(fun1());
        wrapper.find('.mui-input-box').simulate('change', { target: { value: '123' } })
        wrapper.find('.mui-radio').at(1).simulate('click')
        wrapper.find('.mui-radio').at(0).simulate('click')
        expect(wrapper.find('.mui-input-box').prop('value')).toEqual('1961234123')
    });
});

// function
describe('Form Component', () => {
    let wrapper = mount(<Form></Form>)
    it('onValuesChange test, <test prop:: onValuesChange>', () => {
        const onValuesChange = jest.fn();
        wrapper = mount(<Form initialValues={{ a: 'aaa' }} onValuesChange={onValuesChange} >
            <Form.Item name={'a'} label='客户名称'>
                <Input />
            </Form.Item>
            <Form.Item name={'c'} label='客户名称1'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find('input').prop('value')).toEqual('aaa')
        expect(onValuesChange).toHaveBeenCalledTimes(0);

        wrapper.find('input').simulate('change', { target: { value: 'bbb' } })
        expect(wrapper.find('input').prop('value')).toEqual('bbb')
        expect(onValuesChange).toHaveBeenCalledTimes(2);
        expect(onValuesChange.mock.calls[0][0]).toEqual({ "a": "bbb" });
        expect(onValuesChange.mock.calls[0][1]).toEqual({ "a": "bbb", "c": undefined });
    });
    it('onFieldsChange test, <test prop:: onFieldsChange>', () => {
        const onFieldsChange = jest.fn();
        wrapper = mount(<Form initialValues={{ a: 'aaa' }} onFieldsChange={onFieldsChange} >
            <Form.Item name={'a'} label='客户名称'>
                <Input />
            </Form.Item>
            <Form.Item name={'c'} label='客户名称1'>
                <Input />
            </Form.Item>
        </Form>)
        expect(wrapper.find('input').prop('value')).toEqual('aaa')
        expect(onFieldsChange).toHaveBeenCalledTimes(0);

        wrapper.find('input').simulate('change', { target: { value: 'bbb' } })
        expect(wrapper.find('input').prop('value')).toEqual('bbb')
        expect(onFieldsChange).toHaveBeenCalledTimes(2);
        expect(onFieldsChange.mock.calls[0][0][0].value).toEqual("bbb");
        expect(onFieldsChange.mock.calls[0][1][0].value).toEqual("bbb");
        expect(onFieldsChange.mock.calls[0][1][1].value).toEqual(undefined);
    });
    it('onFinish && onFinishFailed test, <test prop:: onFinish>, <test prop:: onFinishFailed>', async () => {
        const onFinish = jest.fn();
        const onFinishFailed = jest.fn();
        wrapper = mount(
            <Form footer={<Button block type='submit' >提交</Button>} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label='姓名' name='name' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        )
        wrapper.find('button').simulate('click');
        await sleep(100);
        expect(onFinish).toHaveBeenCalledTimes(0);
        expect(onFinishFailed).toHaveBeenCalledTimes(1);
    });
    it('onFinish && onFinishFailed test, <test prop:: onFinish>, <test prop:: onFinishFailed>', async () => {
        const onFinish = jest.fn();
        const onFinishFailed = jest.fn();
        wrapper = mount(
            <Form footer={<Button block type='submit' >提交</Button>} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label='姓名' name='name'>
                    <Input />
                </Form.Item>
            </Form>
        )
        wrapper.find('button').simulate('click');
        await sleep(100);
        expect(onFinish).toHaveBeenCalledTimes(1);
        expect(onFinishFailed).toHaveBeenCalledTimes(0);
    });
})
