/** index.tsx */
import {mount, ReactWrapper} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {actWait} from "../../../next-ui-library/test/common/index";
import {prefix} from '../../wui-core/src/updatePrefix';
import PopoverDemo from './popoverClass';

const prefixPopover = `${prefix}-popover`;
let wrapper: ReactWrapper;

beforeEach(async() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
    wrapper = mount(
        <PopoverDemo/>, {attachTo: document.getElementById('container')}
    );
    await actWait();
})
afterEach(async() => {
    const div = document.getElementById('container');
    if (div) {
        document.body.removeChild(div);
    }
    if (wrapper && wrapper.length) {
        wrapper.unmount();
    }
})
describe('component: Popover, <test prop:: content>', () => {
    it('Popover content should be aaaaaaaaa', () => {
        wrapper.setProps({
            content: <div className="aaa">aaaaaaaaaa</div>,
            visible: true
        })
        expect(wrapper.find('.aaa').text()).toBe('aaaaaaaaaa');
    });
});
describe('component: Popover, <test prop:: title>', () => {
    it('Popover title content should be aaaaaaaaaa', () => {
        wrapper.setProps({
            title: 'aaaaaaaaaa',
            visible: true
        })
        expect(wrapper.find(`div.${prefixPopover}-title`).first().text()).toBe('aaaaaaaaaa');
    });
});
describe('component: Popover, <test prop:: 嵌套>', () => {
    it('Tooltip should be exist', () => {
        wrapper.setProps({
            visible: true
        })
        wrapper.find(`button.button1`).simulate('click');
        expect(wrapper.find(`button.button2`).text()).toBe('确定按钮2');
        wrapper.find(`button.button2`).simulate('click');
        expect(wrapper.find('.bbb').text()).toBe('aaaaaaaaaa');

    });
});
