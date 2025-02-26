/**index.tsx */
import React from 'react';
import Popconfirm from '../src/index'
import {mount} from '../../../next-ui-library/test/common/mount'
import {actWait} from '../../../next-ui-library/test/common/index'
import {prefix} from '../../wui-core/src/updatePrefix';
import KeyCode from 'rc-util/lib/KeyCode';
import Button from "../../wui-button/src";
import Icon from "../../../packages/wui-icon/src/index";

const prefixPopover = `${prefix}-popover`;
const prefixPopconfirm = `${prefix}-popconfirm`;

describe('Component: Popconfirm', () => {
    // ['top', 'right', 'bottom', 'left'].forEach(item => {
    //     it(`placement should be ${item}, <test prop:: placement>`, () => {
    //         let wrapper = mount(<Popconfirm trigger="click" placement={item}><Button/></Popconfirm>)
    //         wrapper.find('button').at(0).simulate('click');
    //         expect(wrapper.find('Trigger').prop('popupPlacement')).toEqual(`${item}`)
    //     })
    // })
    Object.entries({'zh-cn': '确定', 'zh-tw': '確定', 'en-us': 'ok', 'vi-vn': 'Chắc chắn'}).forEach(item => {
        it(`button should have different text, <test prop:: locale>`, () => {
            let locale = { lang: item[0] }
            let wrapper = mount(<Popconfirm trigger="click" locale={locale}><Button/></Popconfirm>)
            wrapper.find('button').at(0).simulate('click');
            expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().text()).toEqual(item[1])
        })
    });
    Object.entries({'zh-cn': '取消', 'zh-tw': '取消', 'en-us': 'cancel', 'vi-vn': 'Hủy bỏ'}).forEach(item => {
        it(`button should have different text, <test prop:: locale>`, () => {
            let locale = { lang: item[0] }
            let wrapper = mount(<Popconfirm trigger="click" locale={locale}><Button/></Popconfirm>)
            wrapper.find('button').at(0).simulate('click');
            expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().text()).toEqual(item[1])
        })
    });
    it('icon should have class uf-xiaoxi, <test prop:: icon>', () => {
        let wrapper = mount(<Popconfirm trigger="click" icon={<Icon type='uf-xiaoxi' />}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefix}-icon`).hasClass('uf-xiaoxi')).toEqual(true)
    })
    it('default prop, <test prop:: placement>, <test prop:: locale>, <test prop:: icon>', () => {
        let wrapper = mount(<Popconfirm trigger="click"><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().text()).toEqual('确定')
        expect(wrapper.find(`.${prefix}-icon`).hasClass('uf-i-c')).toEqual(true)
    })
    it('title test, <test prop:: title>', () => {
        let wrapper = mount(<Popconfirm trigger="click" title='title-of-wrapper'><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-message-title`).text()).toEqual('title-of-wrapper')

        wrapper.unmount()
        wrapper = mount(<Popconfirm trigger="click" title={<div>title-of-wrapper</div>}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-message-title div`).text()).toEqual('title-of-wrapper')
    })
    it('content test, <test prop:: content>', () => {
        let wrapper = mount(<Popconfirm trigger="click" content='content-of-wrapper'><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-message-content`).text()).toEqual('content-of-wrapper')

        wrapper.unmount()
        wrapper = mount(<Popconfirm trigger="click" content={<div>content-of-wrapper</div>}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-message-content div`).text()).toEqual('content-of-wrapper')
    })
    it('description should be show, <test prop:: title>, <test prop:: description>', () => {
        let wrapper = mount(<Popconfirm trigger="click" title='title-of-wrapper' description='description-of-wrapper'><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-message-title`).text()).toEqual('title-of-wrapper')
        expect(wrapper.find(`.${prefixPopover}-message-content`).text()).toEqual('description-of-wrapper')
    })
})

describe('Component: Popconfirm', () => {
    ['primary', 'success', 'info', 'warning', 'danger'].forEach(item => {
        it(`button should have different type, <test prop:: okType>`, () => {
            let wrapper = mount(<Popconfirm trigger="click" okType={item}><Button/></Popconfirm>)
            wrapper.find('button').at(0).simulate('click');
            expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().hasClass(`${prefix}-button-${item}`)).toEqual(true)
        })
    })
    it(`text should be text-of-button, <test prop:: okText>`, () => {
        let wrapper = mount(<Popconfirm trigger="click" okText='text-of-button'><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().find('span').text()).toEqual('text-of-button')
    })
    it(`text should be cancelText, <test prop:: cancelText>`, () => {
        let wrapper = mount(<Popconfirm trigger="click" cancelText='cancelText'><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().find('span').text()).toEqual('cancelText')
    })
    it('cancle button should not show, <test prop:: showCancel>', () => {
        let wrapper = mount(<Popconfirm content='content-of-wrapper' showCancel={false} ><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons .${prefix}-button`)).toHaveLength(1)
    })
    it(`popconfirm should be disabled, <test prop:: disabled>`, () => {
        let wrapper = mount(<Popconfirm trigger="click" ><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopover}`)).toEqual(true)
        wrapper.unmount()
        wrapper = mount(<Popconfirm trigger="click" disabled><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopover}`)).toEqual(false)
    })
    it('cancelButtonProps, <test prop:: cancelButtonProps>', () => {
        let wrapper = mount(<Popconfirm trigger="click" cancelButtonProps={{colors: 'info'}}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().hasClass(`${prefix}-button-info`)).toEqual(true)
    })
    it('okButtonProps, <test prop:: okButtonProps>', () => {
        let wrapper = mount(<Popconfirm trigger="click" okButtonProps={{colors: 'info'}}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().hasClass(`${prefix}-button-info`)).toEqual(true)
    })
    it('@fieldid, "***_cancel", "***ok", <test prop:: fieldid>', () => {
        let wrapper = mount(<Popconfirm trigger="click" fieldid='fieldid-id' ><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().prop('fieldid')).toEqual('fieldid-id_cancel')
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().prop('fieldid')).toEqual('fieldid-id_ok')
    })
    // 修复自定义确定、取消按钮传入fieldid被覆盖问题
    it('<test prop:: fieldid>, <test prop:: cancel_btn>, <test prop:: close_btn>', async () => {
        let wrapper = mount(
            <Popconfirm
	                trigger='click'
	                cancel_btn={<Button shape='border' colors='info' size='sm' fieldid='fieldid-cancel'>取消</Button>}
	                close_btn={<Button colors='info' size='sm' fieldid='fieldid-confirm'>确定</Button>}
	            >
	                <Button colors='primary'>Popconfirm</Button>
	            </Popconfirm>
        );
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button')).toHaveLength(2);
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().prop('fieldid')).toEqual('fieldid-cancel')
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().prop('fieldid')).toEqual('fieldid-confirm')

        wrapper.unmount()

        wrapper = mount(
            <Popconfirm
                trigger='click'
                fieldid="fieldid-id"
                content='aaa'
                cancel_btn={<Button shape='border' colors='info' size='sm' >取消</Button>}
                close_btn={<Button colors='info' size='sm' >确定</Button>}
            >
                <Button colors='primary'>Popconfirm</Button>
            </Popconfirm>
        );
        wrapper.find('button').at(0).simulate('click');
        await actWait()
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button')).toHaveLength(2);
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').first().prop('fieldid')).toEqual('fieldid-id_cancel')
        expect(wrapper.find(`.${prefixPopover}-buttons`).find('button').last().prop('fieldid')).toEqual('fieldid-id_ok')
    })
    it('oncancel should be called, <test prop:: onCancel>', () => {
        const oncancel = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" onCancel={oncancel}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(oncancel).toHaveBeenCalledTimes(0)
        wrapper.find(`.${prefixPopover}-buttons`).find('button').first().simulate('click')
        expect(oncancel).toHaveBeenCalledTimes(1)
    })
    it('onclose should be called, <test prop:: onClose>', () => {
        const onclose = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" onClose={onclose}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(onclose).toHaveBeenCalledTimes(0)
        wrapper.find(`.${prefixPopover}-buttons`).find('button').last().simulate('click')
        expect(onclose).toHaveBeenCalledTimes(1)
    })
    it('onconfirm should be called, <test prop:: onConfirm>', () => {
        const onconfirm = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" onConfirm={onconfirm}><Button/></Popconfirm>)
        wrapper.find('button').at(0).simulate('click');
        expect(onconfirm).toHaveBeenCalledTimes(0)
        wrapper.find(`.${prefixPopover}-buttons`).find('button').last().simulate('click')
        expect(onconfirm).toHaveBeenCalledTimes(1)
    })

    // xit('onRootClose should be called, <test prop:: onRootClose>', () => {
    //     const onRootClose = jest.fn()
    //     let wrapper = mount(<div><Popconfirm trigger="click" onRootClose={onRootClose}><Button/></Popconfirm><div id='otherBtn' style={{marginLeft: 300, marginTop: 300}}>按钮</div></div>)
    //     wrapper.find('button').at(0).simulate('click');
    //     expect(onRootClose).toHaveBeenCalledTimes(0)
    //     wrapper.find(`#otherBtn`).at(0).simulate('click')
    //     expect(onRootClose).toHaveBeenCalledTimes(1)
    // })
})

describe('keyboard, <test prop:: keyboard>', () => {
    it('esc should be work, <test prop:: onVisibleChange>',() => {
        const mockEvent = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" keyboard={true} onVisibleChange={mockEvent} ><Button/></Popconfirm>)
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(false)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(true)
        expect(mockEvent).toHaveBeenCalledTimes(1)
        expect(mockEvent.mock.calls[0][0]).toBe(true)
        
        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.ESC });
        expect(mockEvent).toHaveBeenCalledTimes(2)
        expect(mockEvent.mock.calls[1][0]).toBe(false)
    })
    it('alt+N should be work', () => {
        const mockEvent = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" keyboard={true} onCancel={mockEvent} ><Button/></Popconfirm>)
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(false)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(true)
        expect(mockEvent).toHaveBeenCalledTimes(0)

        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.N, altKey: true });
        expect(mockEvent).toHaveBeenCalledTimes(1)
        expect(mockEvent.mock.calls[0][0].keyCode).toBe(78)
        expect(mockEvent.mock.calls[0][0].altKey).toBe(true)
    })
    it('alt+Y should be work', () => {
        const mockEvent = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" keyboard={true} onConfirm={mockEvent} ><Button/></Popconfirm>)
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(false)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(true)
        expect(mockEvent).toHaveBeenCalledTimes(0)

        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.Y, altKey: true });
        expect(mockEvent).toHaveBeenCalledTimes(1)
        expect(mockEvent.mock.calls[0][0].keyCode).toBe(89)
        expect(mockEvent.mock.calls[0][0].altKey).toBe(true)
    })
    it('keyboard be false',() => {
        const mockEvent1 = jest.fn()
        const mockEvent2 = jest.fn()
        const mockEvent3 = jest.fn()
        let wrapper = mount(<Popconfirm trigger="click" keyboard={false} onVisibleChange={mockEvent1} onCancel={mockEvent2} onClose={mockEvent3} ><Button/></Popconfirm>)
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(false)
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.exists(`.${prefixPopconfirm}`)).toEqual(true)
        expect(mockEvent1).toHaveBeenCalledTimes(1)
        expect(mockEvent1.mock.calls[0][0]).toBe(true)
        
        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.ESC });
        expect(mockEvent1).toHaveBeenCalledTimes(1)
        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.N, altKey: true });
        expect(mockEvent2).toHaveBeenCalledTimes(0)
        wrapper.find('button').at(0).simulate('keydown', { 'keyCode': KeyCode.Y, altKey: true });
        expect(mockEvent3).toHaveBeenCalledTimes(0)
    })
})
