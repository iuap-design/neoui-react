/** ErrorMessage.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import ErrorMessage from '../src';
import Button from '@/components/button/src';
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';

const prefixErrorMessage = `${muiPrefix}-error-message`;
const prefixMask = `${muiPrefix}-mask`;
const prefixdialog = `${muiPrefix}-dialog`;

describe('ErrorMessage test', () => {
    it('className <test prop:: className>', () => {
        const wrapper = mount(<ErrorMessage className="test" visible />);
        expect(wrapper.find(`.${prefixErrorMessage}`).hasClass('test')).toEqual(true);
    });
    it('style, <test prop:: style>', () => {
        const wrapper = mount(<ErrorMessage style={{ color: 'red' }} visible />);
        expect(wrapper.find(`.${prefixErrorMessage}`).prop('style').color).toEqual('red');
    });
    it('clsPrefix, <test prop:: clsPrefix>', () => {
        const wrapper = mount(<ErrorMessage clsPrefix="cls" visible />);
        expect(wrapper.exists(`.${prefixErrorMessage}`)).toEqual(false);
        expect(wrapper.exists(`.cls-error-message`)).toEqual(true);
    });
    it('fieldid, <test prop:: fieldid>', () => {
        const wrapper = mount(<ErrorMessage fieldid="field" visible />);
        expect(wrapper.find(`.${prefixErrorMessage}`).prop('fieldid')).toEqual('field_error_message');
        expect(wrapper.find(`.${prefixErrorMessage}-dialog`).prop('fieldid')).toEqual('field_error_message_dialog_center_popup');
    });
    it('visible, <test prop:: visible>', () => {
        let wrapper = mount(<ErrorMessage fieldid="field" visible={false} />);
        expect(wrapper.find(`.${prefixErrorMessage}-dialog`).prop('style').display).toEqual('none');
        wrapper = mount(<ErrorMessage fieldid="field" visible />);
        expect(wrapper.find(`.${prefixErrorMessage}-dialog`).prop('style').display).toEqual('unset');
    });
    it('closeOnMaskClick, onClose, <test prop:: onClose>, <test prop:: closeOnMaskClick>', async () => {
        const onClose = jest.fn();
        const ErrorMessage0 = (options: any) => (
            <div id="root">
                <Button>
                    打开对话框
                </Button>
                <ErrorMessage
                    getContainer={() => document.getElementById('root')}
                    visible={true}
                    closeOnMaskClick
                    onClose={onClose}
                    {...options}
                >
                </ErrorMessage>
            </div>
        )
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        let wrapper = mount(
            <ErrorMessage0 />, { attachTo: document.getElementById('container') }
        );
        wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
        await sleep(100);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
    it('message, <test prop:: message>', () => {
        const wrapper = mount(<ErrorMessage fieldid="field" visible message="12345" />);
        expect(wrapper.find(`.${prefixErrorMessage}-msg`).instance().innerHTML).toEqual("<pre>12345</pre>");
    });
    it('errorInfo, <test prop:: errorInfo>', () => {
        let wrapper = mount(<ErrorMessage fieldid="field" visible />);
        expect(wrapper.find(`.${prefixErrorMessage}-code-right`).instance().innerHTML).toEqual('999-999-999');
        wrapper = mount(<ErrorMessage fieldid="field" visible errorInfo="888-000-999" />);
        expect(wrapper.find(`.${prefixErrorMessage}-code-right`).instance().innerHTML).toEqual('888-000-999');
    });
    it('traceId, <test prop:: traceId>', () => {
        const wrapper = mount(<ErrorMessage fieldid="field" visible traceId="1111" />);
        expect(wrapper.find(`.${prefixErrorMessage}-id-right`).instance().innerHTML).toEqual('1111');
    });
    it('onUploadClick, uploadable, <test prop:: onUploadClick>, <test prop:: uploadable>', () => {
        const onUploadClick = jest.fn();
        let wrapper = mount(<ErrorMessage fieldid="field" visible onUploadClick={onUploadClick} />);
        expect(wrapper.find(`.${prefixErrorMessage}-actions`).at(0).find('span').instance().innerHTML).toEqual('关闭');
        wrapper = mount(<ErrorMessage fieldid="field" visible uploadable onUploadClick={onUploadClick} />);
        expect(wrapper.find(`.${prefixErrorMessage}-actions`).at(0).find('span').instance().innerHTML).toEqual('上报');
        expect(onUploadClick).toHaveBeenCalledTimes(0);
        wrapper.find(`.${prefixErrorMessage}-actions`).at(0).simulate('click');
        expect(onUploadClick).toHaveBeenCalledTimes(1);
    });
    it('onCodeClick, <test prop:: onCodeClick>', () => {
        const onCodeClick = jest.fn();
        let wrapper = mount(<ErrorMessage fieldid="field" visible onCodeClick={onCodeClick} errorInfo="000-000-000"/>);
        expect(onCodeClick).toHaveBeenCalledTimes(0);
        wrapper.find(`.${prefixErrorMessage}-code-right`).simulate('click');
        expect(onCodeClick).toHaveBeenCalledTimes(1);
    });
    it('detailMsg, getContainer, <test prop:: detailMsg>, <test prop:: getContainer>', () => {
        let wrapper = mount(<ErrorMessage fieldid="field" visible detailMsg='1111111' />);
        expect(wrapper.find(`.${prefixErrorMessage}-actions`).at(0).find('span').instance().innerHTML).toEqual('异常详情');
        wrapper.find(`.${prefixErrorMessage}-actions`).at(0).simulate('click');
        expect(document.getElementsByClassName(`${prefixErrorMessage}-popup`)[0].getElementsByClassName(`${prefixErrorMessage}-detail-msg`)[0].innerHTML).toEqual("<pre>1111111</pre>");
        wrapper = mount(<ErrorMessage fieldid="field" visible detailMsg='1111111' getContainer={() => document.getElementById('0')}/>);
        expect(wrapper.find(`.${prefixErrorMessage}`).exists(`.${prefixdialog}`)).toEqual(false)
    });
})
