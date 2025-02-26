/**Clipboard.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {prefix} from '../../wui-core/src'
import Input from "../../../packages/wui-input/src/index";
import {sleep} from "../../../next-ui-library/test/common/index"
import Clipboard from '../src/index';
import copy from 'copy-to-clipboard';
import {render, screen, fireEvent} from "@testing-library/react";
const prefixClipboard = `${prefix}-clipboard`;

const {TextArea} = Input;
jest.mock('copy-to-clipboard')

describe('Component: Clipboard', () => {
    // ['copy', 'cut'].forEach(item => {
    //     it('Clipboard action, <test prop:: action>', function() {
    //         let wrapper = mount( <Clipboard text="复制文本"> </Clipboard> )
    //         expect(wrapper.props().action).toEqual('copy')
    //         wrapper.setProps({ action: item })
    //         expect(wrapper.props().action).toEqual(item)
    //     })
    // })
    it('Clipboard action is cut, <test prop:: action>', async () => {
        let wrapper = mount(<div>
            <TextArea id="cutContent" autoSize={{minRows: 3, maxRows: 5}} value={'我将被剪切到剪切板'}></TextArea>
            <Clipboard action="cut" target='#cutContent'>
            </Clipboard>
        </div>)
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(document.querySelector('#cutContent').value).toEqual('')
    })
    it('Clipboard action is copy, <test prop:: action is copy>', async () => {
        let wrapper = mount(<div>
            <TextArea id="cutContent" autoSize={{minRows: 3, maxRows: 5}} value={'我将被剪切到剪切板'}></TextArea>
            <Clipboard action="copy" target='#cutContent'>
            </Clipboard>
        </div>)
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(document.querySelector('#cutContent').value).toEqual('我将被剪切到剪切板')
    })
    it('text test, <test prop:: text>', () => {
        let wrapper = mount(
            <div>
                <div id="copyContent" role="test">我将被复制</div>
                <Clipboard text="我将被复制" target='#copyContent' action='copy'></Clipboard>
            </div>
        )
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        // expect(wrapper.state().html).toEqual('我将被复制')
        fireEvent.paste(screen.getByRole('test'), '我将被复制')
        expect(screen.getByRole('test').textContent).toEqual('我将被复制')
        // render(<Clipboard text="我将被复制" action='copy'></Clipboard>)
        // userEvent.paste(getByRole('textbox', {name: /paste your greeting/i}), "我将被复制")
        // expect(getByRole('textbox', {name: /paste your greeting/i})).toHaveValue(text)
    })
    Object.entries({ 'zh-tw': ' Ctrl+C 複製到剪切板 ', 'zh-cn': ' Ctrl+C 复制到剪切板 ', 
                     'en-us': ' Ctrl+C Copy to Clipboard ', 'vi-vn': ' Ctrl+C SAO chép vào bảng nháp '}).forEach((item) => {
        it('locale test, <test prop:: locale>', () => {
            const success = jest.fn()
            const error = jest.fn()
            let wrapper = mount(<Clipboard locale={item[0]} action="copy" text="我将被复制" success={success} error={error}></Clipboard>)
            wrapper.find(`.${prefixClipboard}`).simulate('click')
            expect(wrapper.find(`.${prefix}-modal-title`).text()).toEqual(item[1])
        })
    })
    it('click button can close modal', () => {
        let wrapper = mount(<Clipboard action="copy" text="我将被复制"></Clipboard>)
        expect(wrapper.exists(`.${prefix}-modal`)).toEqual(false)
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(wrapper.exists(`.${prefix}-modal`)).toEqual(true)
        wrapper.find(`.${prefix}-modal`).find('button').at(1).simulate('click')
        expect(wrapper.exists(`.${prefix}-modal`)).toEqual(false)
    })
    it('Clipboard error callback, <test prop:: error>', function() {
        const mockError = jest.fn()
        let wrapper = mount(<Clipboard text="默认复制-我将被复制到剪切板" error={() => {mockError()}}/>);
        wrapper.find('.uf-copy').simulate('click');
        expect(mockError).toHaveBeenCalled()
    })
    it(' success test, <test prop:: success>', () => {
        copy.mockReturnValue(true)
        const mockSuccess = jest.fn()
        let wrapper = mount(
            <div>
                <Input id="copyContent" value='点击之后复制该内容' />
                <Clipboard action="copy" target='#copyContent' success={() => {mockSuccess()}}></Clipboard>
            </div>, { attachTo: document.body })
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(wrapper.find(`.${prefixClipboard}`).find('i').hasClass('uf-correct')).toEqual(true)
        expect(mockSuccess).toHaveBeenCalled()

        wrapper.find(`.${prefixClipboard}`).simulate('mouseout')
        expect(wrapper.find(`.${prefixClipboard}`).find('i').hasClass('uf-correct')).toEqual(false)
        wrapper.unmount()
    })
    it('target test when target.tagName is INPUT, <test prop:: target>', () => {
        copy.mockReturnValue(false)
        let wrapper = mount(
            <div>
                <Input id="Content" value='点击之后复制该内容' />
                <Clipboard action="copy" target='#Content'></Clipboard>
            </div>, { attachTo: document.body })
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(wrapper.find(`.${prefix}-modal-body input`).prop('value')).toEqual('点击之后复制该内容')
        wrapper.unmount()
    })
    it('target test when target.tagName is TEXTAREA, <test prop:: target>', () => {
        copy.mockReturnValue(false)
        let wrapper = mount(
            <div>
                <TextArea id="Content" value='点击之后复制该内容' />
                <Clipboard action="cut" target='#Content'></Clipboard>
            </div>, { attachTo: document.body })
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(wrapper.find(`.${prefix}-modal-body input`).prop('value')).toEqual('点击之后复制该内容')
        wrapper.unmount()
    })
    it('target test when text and target is null, <test prop:: text is null>', () => {
        let wrapper = mount( <Clipboard text="" action='copy'></Clipboard> )
        expect(wrapper.find('.wui-modal')).toHaveLength(0)
        wrapper.find(`.${prefixClipboard}`).simulate('click')
        expect(wrapper.find('.wui-modal')).toHaveLength(1)
    })
    it('component test clipboard, <test prop:: className>', () => {
        let wrapper = mount( <Clipboard text="默认复制-我将被复制到剪切板" action='copy' className="test"></Clipboard> )
        expect(wrapper.find(`.${prefixClipboard}`).hasClass('test')).toEqual(true)
    })
})