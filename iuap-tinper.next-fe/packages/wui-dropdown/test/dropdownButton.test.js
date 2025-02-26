/** DropdownButton.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {waitFor} from "@testing-library/react";
import {attrsTestByLength, eventsTest, mountTest, testStyle} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src'
import Dropdown from '../src/index';

const prefixDropdown = `${prefix}-dropdown`;
mountTest(Dropdown.Button);

describe('Dropdown.Button', () => {
    const myMock = jest.spyOn(
        window,
        'requestAnimationFrame',
    );
    myMock.mockImplementation(function() {
        const dom = document.querySelector(`.${prefixDropdown}`)
        if(dom) {
            dom.style.minWidth = '50px';
            dom.style.maxHeight = '200px';
        }
    });
    // Dropdown 属性
    it('component: DropdownButton, <test prop:: minOverlayWidthMatchTrigger>, <test prop:: trigger>, <test prop:: visible>, <test prop:: disabled>, <test prop:: overlayClassName>, <test prop:: transitionName>should support attrs about minOverlayWidthMatchTrigger, transitionName, overlayClassName, trigger, visible, disabled, ', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={() => <div id="function">menu</div>}
                trigger={['click']}
                overlayClassName="overlayClassName"
                transitionName="slide-up"
                disabled
            >
				Button
            </Dropdown.Button>
        );
        // disabled为true时，即使visible为true，下拉也不存在
        wrapper.setProps({visible: true});
        expect(wrapper.exists(`.${prefixDropdown}-menu-match-trigger`)).toEqual(false);
        expect(wrapper.exists(`.${prefixDropdown}.overlayClassName`)).toEqual(false);
        wrapper.setProps({disabled: false});
        //使用click触发
        wrapper.find('button').simulate('click');
        expect(wrapper.exists(`.${prefixDropdown}-menu-match-trigger`)).toEqual(true);
        // expect(triggerWrapper.props().popupTransitionName).toEqual('slide-up');
        expect(wrapper.exists(`.${prefixDropdown}.overlayClassName`)).toEqual(true);
    });

    it('component: DropdownButton, <test prop:: overlayMaxHeight>', async () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={() => <div id="function">menu</div>}
                overlayMaxHeight={200}
            >
        		Button
            </Dropdown.Button>
        );
        wrapper.setProps({visible: true})
        await waitFor(() => expect(wrapper.find(`.${prefixDropdown}`).prop('style').maxHeight).toEqual('200px'));
    })

    // Button 属性
    it('component: DropdownButton, <test prop:: overlay>, <test prop:: type>, <test prop:: size>, <test prop:: href>should support attrs about type, size, disabled, htmlType, href', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={() => <div id="function">menu</div>}
                visible
                type="primary"
                size="lg"
                href="https://www.baidu.com/"
                disabled
            >
				Button
            </Dropdown.Button>
        );
        const buttonNode = wrapper.find('button').getDOMNode();
        expect(buttonNode.disabled).toBe(true);
        expect(buttonNode.className.includes(`${prefix}-button-primary`)).toBe(true);
        expect(buttonNode.className.includes(`${prefix}-button-lg`)).toBe(true);
        wrapper.setProps({type: 'link'});
        expect(wrapper.find('a').getDOMNode().href).toBe("https://www.baidu.com/");
    })

    it('component: DropdownButton, <test prop:: overlay>, <test prop:: triggerType>should support triggerType is icon', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={() => <div id="function">menu</div>}
                triggerType="icon"
            >
				Button
            </Dropdown.Button>
        );
        expect(wrapper.find(`.${prefixDropdown}-button-right`).length).toBe(1);
        expect(wrapper.find(`.${prefixDropdown}`).length).toBe(0);
        wrapper.find(`.${prefixDropdown}-button-right`).simulate('mouseEnter');
        expect(wrapper.find(`.${prefixDropdown}-trigger`).length).toBe(1);      
    })
    it('component: DropdownButton, <test prop:: children> children should be exised', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
                children={<div className="aaa">123</div>}
            >
            </Dropdown.Button>
        );
        expect(wrapper.find('.aaa').length).toBe(1);
    })
    it('component: DropdownButton, <test prop:: title> title aaabbb should be exised', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
                title="aaabbb"
                children={<div className="aaa">123</div>}
            >
            </Dropdown.Button>
        );
        expect(wrapper.find(`button.${prefixDropdown}-button`).getDOMNode().title).toBe('aaabbb');
    })

    it('component: DropdownButton, <test prop:: htmlType> button type should be submit', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
                htmlType="submit"
                children={<div className="aaa">123</div>}
            >
            </Dropdown.Button>
        );
        expect(wrapper.find(`button.${prefixDropdown}-button`).props().type).toBe('submit');
    })

    it('component: DropdownButton, <test prop:: icon> htmlType should be submit', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
                icon={<Icon type="uf-triangle-down" />}
                children={<div className="aaa">123</div>}
            >
            </Dropdown.Button>
        );
        expect(wrapper.find(`button.${prefixDropdown}-button .wui-icon`).hasClass('uf-triangle-down')).toBe(true);
    })

})
testStyle({
    title: 'component: Dropdown.Button, <test prop:: style>',
    Component: Dropdown.Button,
    selector: `.${prefixDropdown}-button`,
    style: {'color': "red"}
});
attrsTestByLength({
    title: 'component: Dropdown.Button, <test prop:: buttonsRender>',
    Component: Dropdown.Button,
    attrs: {
        overlay: <div id="function">menu</div>,
        visible: true,
        triggerType: "3",
        buttonsRender: (buttons) => {
            return [buttons[0], buttons[1]]
        },
        children: <div className="aaa">123</div>
    },
    selector: `.${prefix}-button-default`,
    nodeCount: 2
})
eventsTest({
    title: 'component: Dropdown.Button, <test prop:: onClick>',
    Component: Dropdown.Button,
    propFuncName: 'onClick',
    dependentProps: {},
    selector: `.${prefixDropdown}-button`,
    eventName: 'click',
    eventArgs: []
});
//新增fieldid测试
describe('component: DropdownButton, <test prop:: fieldid>', () => {
    it('button[@fieldid="***_btn"]', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
            >
            </Dropdown.Button>
        );
        expect(wrapper.find(`button.${prefixDropdown}-button`).prop('fieldid')).toBe(undefined);
        wrapper.setProps({fieldid:'test'})
        expect(wrapper.find(`button.${prefixDropdown}-button`).prop('fieldid')).toBe('test_btn');
    })
    it('下拉按钮-下拉窗口//*[contains(@fieldid="***_sub-btn")]', () => {
        const wrapper = mount(
            <Dropdown.Button
                overlay={<div id="function">menu</div>}
                visible
            >
            </Dropdown.Button>
        );
        wrapper.setProps({ triggerType: "icon", fieldid:'test' })
        expect(wrapper.find(`button.${prefixDropdown}-button-right`).prop('fieldid')).toBe('test_sub_btn');
    })
    // it('*[@fieldid="***_btn_list" and not(contains(@class,"hidden"))]', async () => {
    //     wrapper.find(`button.${prefixDropdown}-button-right`).simulate('mouseEnter')
    //     expect(wrapper.find(`.${prefix}-dropdown`).props().fieldid).toBe('test_btn_list')
    // })
})