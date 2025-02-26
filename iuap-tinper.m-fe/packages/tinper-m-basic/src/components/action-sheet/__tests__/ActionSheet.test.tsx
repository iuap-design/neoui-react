/** ActionSheet.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { ActionSheet, Button } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'
import { sleep } from '@utils/Sleeps';
import { cleanup, render, screen } from '@testing-library/react'

const prefixActionSheet = `${muiPrefix}-action-sheet`;
const prefixPopup = `${muiPrefix}-popup`;
const prefixMask = `${muiPrefix}-mask`;
const prefixSafeArea = `${muiPrefix}-safe-area`;

const ActionSheet0 = (options: any) => (
    <div id="root">
        <Button>
            打开对话框
        </Button>
        <ActionSheet
            getContainer={() => document.getElementById('root')}
            visible={true}
            {...options}
        >
        </ActionSheet>
    </div>
)
afterEach(() => {
    cleanup()
})
describe('ActionSheet Component', () => {
    let wrapper: any;
    beforeEach(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(
            <ActionSheet0 />, { attachTo: document.getElementById('container') }
        );

    })
    afterEach(() => {
        const div = document.getElementById('container');
        if (div) {
            document.body.removeChild(div);
        }
        if (wrapper) {
            wrapper.unmount();
            wrapper = null;
        }
    })
    it('className test, <test prop:: className>', () => {
        wrapper.setProps({
            className: 'test-action-sheet-class',
        });
        expect(wrapper.find(`.${prefixActionSheet}`).hasClass('test-action-sheet-class')).toEqual(true);
    });
    it('popupStyle test, <test prop:: popupStyle>', () => {
        wrapper.setProps({
            popupStyle: { color: 'red', },
        });
        expect(wrapper.find(`.${prefixPopup}`).prop('style').color).toEqual('red');
    });
    it('styles test, <test prop:: styles>', () => {
        wrapper.setProps({
            popupStyle: { color: 'red', },
            styles: { body: { color: 'yellow' }, mask: { color: 'black' } }
        });
        expect(wrapper.find(`.${prefixPopup}`).prop('style').color).toEqual('red');
        expect(wrapper.find(`.${prefixPopup}-body`).prop('style').color).toEqual('yellow');
        expect(wrapper.find(`.${prefixPopup}-mask`).prop('style').color).toEqual('black');
    });
    it('popupClassName test, <test prop:: popupClassName>', () => {
        wrapper.setProps({
            popupClassName: 'test-action-sheet-popup-class'
        });
        expect(wrapper.find(`.${prefixPopup}`).hasClass('test-action-sheet-popup-class')).toEqual(true);
    });
    it('extra test, <test prop:: extra>', () => {
        wrapper.setProps({
            extra: 'test-action-sheet-extra'
        });
        expect(wrapper.find(`.${prefixPopup}`).find(`.${prefixActionSheet}-extra`).instance().innerHTML).toEqual('test-action-sheet-extra');
        wrapper.setProps({
            extra: <div className="n">m</div>
        });
        expect(wrapper.find(`.${prefixPopup}`).find(`.${prefixActionSheet}-extra`).find('.n').instance().innerHTML).toEqual('m');
    });
    it('cancelText test, <test prop:: cancelText>', () => {
        wrapper.setProps({
            cancelText: 'test-action-sheet-cancelText'
        });
        expect(wrapper.find(`.${prefixActionSheet}-cancel`).find(`.${prefixActionSheet}-button-item-name`).instance().innerHTML).toEqual('test-action-sheet-cancelText');
    });
    it('safeArea test, <test prop:: safeArea>', () => {
        expect(wrapper.find(`.${prefixPopup}`).find(`.${prefixSafeArea}`).hasClass(`${prefixSafeArea}-position-bottom`)).toEqual(true);
        wrapper.setProps({
            safeArea: false
        });
        expect(wrapper.find(`.${prefixPopup}`).exists(`.${prefixSafeArea}`)).toEqual(false);
    });
    it('fieldid test, <test prop:: fieldid>', () => {
        const fieldid = 'fieldid-test';
        wrapper.setProps({
            fieldid: fieldid,
            extra: 'extra-content',
            cancelText: 'cancelText-test'
        });
        expect(wrapper.find(`.${prefixPopup}`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_popup`);
        expect(wrapper.find(`.${prefixPopup}-body`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_popup_body`);
        expect(wrapper.find(`.${prefixPopup}-title`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_popup_title`);
        expect(wrapper.find(`.${prefixMask}`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_popup_mask`);
        expect(wrapper.find(`.${prefixMask}-content`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_popup_mask_content`);
        expect(wrapper.find(`.${prefixActionSheet}`).prop('fieldid')).toEqual(`${fieldid}_action_sheet`);
        expect(wrapper.find(`.${prefixActionSheet}-extra`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_extra`);
        expect(wrapper.find(`.${prefixActionSheet}-cancel`).prop('fieldid')).toEqual(`${fieldid}_action_sheet_cancel`);
    });
    it('clsPrefix test, <test prop:: clsPrefix>', () => {
        wrapper.setProps({
            clsPrefix: 'clsPrefix-test'
        });
        expect(wrapper.find(`.${prefixPopup}`).hasClass('clsPrefix-test-action-sheet-popup')).toEqual(true);
        expect(wrapper.exists('.clsPrefix-test-action-sheet')).toEqual(true);
    });
    it('actions test, <test prop:: actions>', () => {
        wrapper.setProps({
            actions: [
                { text: '下载', key: 'load' },
                { text: '修改', key: 'edit', disabled: true },
                { text: '删除', key: 'delete', danger: true, bold: true },
            ]
        });
        expect(wrapper.find(`.${prefixActionSheet}-button-item-name`).at(0).instance().innerHTML).toEqual('下载');
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(0).find('a').hasClass(`${prefixActionSheet}-button-item-disabled`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(0).find('a').hasClass(`${prefixActionSheet}-button-item-danger`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(0).find('a').hasClass(`${prefixActionSheet}-button-item-bold`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-name`).at(1).instance().innerHTML).toEqual('修改');
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(1).find('a').hasClass(`${prefixActionSheet}-button-item-disabled`)).toEqual(true);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(1).find('a').hasClass(`${prefixActionSheet}-button-item-danger`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(1).find('a').hasClass(`${prefixActionSheet}-button-item-bold`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-name`).at(2).instance().innerHTML).toEqual('删除');
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(2).find('a').hasClass(`${prefixActionSheet}-button-item-disabled`)).toEqual(false);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(2).find('a').hasClass(`${prefixActionSheet}-button-item-danger`)).toEqual(true);
        expect(wrapper.find(`.${prefixActionSheet}-button-item-wrapper`).at(2).find('a').hasClass(`${prefixActionSheet}-button-item-bold`)).toEqual(true);
    });
    it('visible test, <test prop:: visible>', async () => {
        wrapper.setProps({ className: 'class' });
        expect(wrapper.find(`.${prefixPopup}`).prop('style').display).toEqual('')

        wrapper.setProps({ visible: false, className: 'class' });
        await sleep(1000)
        expect(wrapper.find(`.${prefixPopup}`).prop('style').display).toEqual('none')
    });

    // function test
    it('onAction && closeOnAction test, <test prop:: onAction>, <test prop:: closeOnAction>', async () => {
        const onAction = jest.fn();
        const onClose = jest.fn();
        wrapper.setProps({
            onAction: onAction,
            onClose: onClose,
            closeOnAction: true,
            actions: [
                { text: '下载', key: 'load' },
                { text: '修改', key: 'edit', disabled: true },
                { text: '删除', key: 'delete', danger: true, bold: true },
            ],
        });
        expect(onAction).toHaveBeenCalledTimes(0);
        expect(onClose).toHaveBeenCalledTimes(0);

        wrapper.find(`.${prefixActionSheet}-button-item`).at(1).simulate('click');
        await sleep(100);
        expect(onAction).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onAction.mock.calls[0][0].key).toEqual('edit');
        expect(onAction.mock.calls[0][0].text).toEqual('修改');
    });
    it('closeOnMaskClick && onClose test, <test prop:: closeOnMaskClick>, <test prop:: onClose>', async () => {
        const onClose = jest.fn();
        wrapper.setProps({
            className: 'class',
            closeOnMaskClick: false,
            onClose: onClose
        });
        wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
        await sleep(100);
        expect(onClose).toHaveBeenCalledTimes(0);

        wrapper.setProps({ className: 'class', closeOnMaskClick: true, onClose: onClose });
        expect(onClose).toHaveBeenCalledTimes(0);

        wrapper.find(`.${prefixMask}-aria-button`).simulate('click');
        await sleep(100);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
    it('onMaskClick, <test prop:: onMaskClick>', async () => {
        const onMaskClick = jest.fn();
        wrapper.setProps({
            onMaskClick: onMaskClick
        });
        wrapper.find(`.${prefixMask}`).simulate('click');
        await sleep(100);
        expect(onMaskClick).toHaveBeenCalledTimes(1);
    });
})
