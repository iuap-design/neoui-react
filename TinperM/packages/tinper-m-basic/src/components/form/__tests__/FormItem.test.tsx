/** FormItem.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { Form, Input, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixForm = `${muiPrefix}-form`;
const prefixFormItem = `${muiPrefix}-form-item`;
const prefixList = `${muiPrefix}-list`;
const prefixInput = `${muiPrefix}-input`;

describe(('FormItem Component'), () => {
    let wrapper;
    it('fieldid test, <test prop:: fieldid>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' fieldid="test">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).prop('fieldid')).toEqual('test_form_item')
        expect(wrapper.find(`.${prefixFormItem}-label`).prop('fieldid')).toEqual('test_form_item_label')
        expect(wrapper.find(`.${prefixFormItem}-child`).prop('fieldid')).toEqual('test_form_item_child')
    });
    it('className test, <test prop:: className>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' className="class-test">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).hasClass('class-test')).toEqual(true)
    });
    it('clsPrefix test, <test prop:: clsPrefix>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' clsPrefix="clsPrefix-test">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixList}-item`).hasClass('clsPrefix-test-form-item')).toEqual(true)
        expect(wrapper.find(`.${prefixList}-item`).hasClass('clsPrefix-test-form-item-vertical')).toEqual(true)
    });
    it('childElementPosition test, <test prop:: childElementPosition>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' childElementPosition="right">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}-child`).hasClass(`${prefixFormItem}-child-position-right`)).toEqual(true)
        expect(wrapper.find(`.${prefixFormItem}-child`).hasClass(`${prefixFormItem}-child-position-normal`)).toEqual(false)

        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' childElementPosition="normal">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}-child`).hasClass(`${prefixFormItem}-child-position-right`)).toEqual(false)
        expect(wrapper.find(`.${prefixFormItem}-child`).hasClass(`${prefixFormItem}-child-position-normal`)).toEqual(true)
        // expect(wrapper.getDOMNode()).toEqual(1)
    });
    it('name && label test, <test prop:: name>, <test prop:: label>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称'>
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}-label`).prop('for')).toEqual('a')
        expect(wrapper.find(`.${prefixFormItem}-label`).instance().innerHTML).toEqual('客户名称')
    });
    it('help test, <test prop:: help>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' help="help-test">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.exists(`.${prefixFormItem}-label-help`)).toEqual(true)
    });
    it('layout test, <test prop:: layout>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' layout="horizontal">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).hasClass(`${prefixFormItem}-horizontal`)).toEqual(true)

        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' layout="vertical">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).hasClass(`${prefixFormItem}-vertical`)).toEqual(true)
    });
    it('disabled test, <test prop:: disabled>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' disabled>
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).hasClass(`${prefixList}-item-disabled`)).toEqual(true)
    });
    it('initialValue test, <test prop:: initialValue>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' initialValue="aaa">
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find('input').prop('value')).toEqual('aaa')
    });
    it('requiredPosition test, <test prop:: requiredPosition>', () => {
        const onClick = jest.fn();
        wrapper = mount(
            <Form requiredMarkStyle='asterisk'>
                <Form.Item name={'a'} label='客户名称' onClick={onClick} rules={[{ required: true }]} requiredPosition="left" >
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}-label`).hasClass(`${prefixFormItem}-label-left`)).toEqual(true)
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
    it('required test, <test prop:: required>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' required>
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixForm}-item-required-asterisk`).instance().innerHTML).toEqual("*")
    });
    it('children test, <test prop:: children>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' children={<Input />}>
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}-child-inner`).exists(`.${prefixInput}`)).toEqual(true)
    });
    it('noStyle && hidden test, <test prop:: noStyle>, <test prop:: hidden>', () => {
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' noStyle>
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixList}-body-inner`).exists(`.${prefixFormItem}`)).toEqual(false)
        wrapper.unmount()

        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' hidden>
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixFormItem}`).hasClass(`${prefixFormItem}-hidden`)).toEqual(true)
        wrapper.unmount()

        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' hidden noStyle>
                </Form.Item>
            </Form>
        )
        expect(wrapper.find(`.${prefixList}-body-inner`).exists(`.${prefixFormItem}`)).toEqual(true)
    });
    it('rightIcon test, <test prop:: rightIcon>, <test prop:: showErrorIcon>, <test prop:: rightErrorIconStyle>', async () => {
        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]}>
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error-icon`)).toEqual(false)
        wrapper.unmount()

        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} showErrorIcon rightErrorIconStyle={{ right: '10px' }}>
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error-icon`)).toEqual(true)
        expect(wrapper.find(`.${prefixForm}-item-feedback-error-icon`).prop('style').right).toEqual('10px')
        wrapper.unmount()

        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} showErrorIcon rightIcon={<div className="aaa">1</div>}>
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error-icon`)).toEqual(true)
        expect(wrapper.find(`.${prefixForm}-item-feedback-error-icon`).exists('.aaa')).toEqual(true)
        wrapper.unmount()
    });
    it('showFeedbackError test, <test prop:: showFeedbackError>', async () => {
        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} >
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error`)).toEqual(true)
        wrapper.unmount()

        wrapper = mount(<Form footer={<Button type='submit' >提交</Button>}>
            <Form.Item name={'b'} label='姓名' rules={[{ required: true, message: '姓名不能为空!' }]} showFeedbackError={false}>
                <Input />
            </Form.Item>
        </Form>)
        wrapper.find('button').simulate('click')
        await sleep(500)
        expect(wrapper.exists(`.${prefixForm}-item-feedback-error`)).toEqual(false)
        wrapper.unmount()
    });

    // function test
    it('onClick test, <test prop:: onClick>', () => {
        const onClick = jest.fn();
        wrapper = mount(
            <Form >
                <Form.Item name={'a'} label='客户名称' onClick={onClick}>
                    <Input />
                </Form.Item>
            </Form>
        )
        expect(onClick).toHaveBeenCalledTimes(0);
        wrapper.find(`.${prefixInput}`).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
})
