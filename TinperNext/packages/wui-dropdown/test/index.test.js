/** Dropdown.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {waitFor, screen} from "@testing-library/react";
import {attrsTest, mountTest, testCustomStyle} from "../../../next-ui-library/test/common/index"
import {prefix} from '../../wui-core/src/updatePrefix';
import Menu from '../../wui-menu/src/index';

import Dropdown from '../src/index';
import {placements}  from '../src/placement'

const prefixDropdown = `${prefix}-dropdown`;
mountTest(Dropdown);

describe('Dropdown', () => {

    it('component: Dropdown, <test prop:: overlay>overlay is string', () => {
        const wrapper = mount(
            <Dropdown overlay="string">
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({visible: true});
        expect(wrapper.find(`.${prefixDropdown}-menu-match-trigger`).text()).toBe('string')
    });
    it('component: Dropdown, <test prop:: children>it should have a button', () => {
        const wrapper = mount(
            <Dropdown overlay="string" children={<button type="button">button</button>}/>
        );
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('overlay is function', () => {
        const wrapper = mount(
            <Dropdown overlay={() => <div id="function">menu</div>}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({visible: true});
        expect(wrapper.find(`.${prefixDropdown}-menu-match-trigger`).text()).toBe('menu');
        expect(wrapper.find(`.${prefixDropdown}-menu-match-trigger`).prop('id')).toBe('function');
    });
    it('overlay is Menu', () => {
        const overlay = (
            <Menu expandIcon={<span id="customExpandIcon"/>}>
                <Menu.Item key={'foo'}>foo</Menu.Item>
                <Menu.SubMenu title="SubMenu" key={'foo_sub'}>
                    <Menu.Item>foo</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
        const wrapper = mount(
            <Dropdown overlay={overlay}>
                <button type="button">button</button>
            </Dropdown>
        );
        const wrapperMenu = mount(
            overlay
        );
        expect(wrapperMenu.find(`.${prefix}-menu #customExpandIcon`).length).toBe(1);
        expect(wrapper.find(`.${prefixDropdown}-menu #customExpandIcon`).length).toBe(0);
        wrapper.setProps({visible: true});
        expect(wrapper.find(`.${prefixDropdown}-menu #customExpandIcon`).length).toBe(1);
    });

    it('test overlay event is click', () => {
        const clickEvent = jest.fn();
        const overlay = (
            <Menu onClick={clickEvent}>
                <Menu.Item key={'foo'}>foo</Menu.Item>
                <Menu.SubMenu title="SubMenu" key={'foo_sub'}>
                    <Menu.Item key={'foo_sub_foo'}>foo</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
        const wrapper = mount(
            <Dropdown overlay={overlay}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({visible: true});
        wrapper.find(`.${prefixDropdown}-menu-item`).at(0).simulate('click', {bubbles: true});
        expect(clickEvent).toHaveBeenCalled();
    });


    it('component: Dropdown, test <test prop:: placement>, <test prop:: overlayClassName>, pop should support placement, overlayClassName', () => {
        const wrapper = mount(
            <Dropdown overlay={() => <div id="function">menu</div>} overlayClassName="overlayClassName"
					  placement="topLeft">
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({visible: true})
        expect(document.querySelector('.overlayClassName')).not.toBe(null);
    });

    it('component: Dropdown, <test prop:: trigger>, <test prop:: visible>, <test prop:: defaultVisible>, <test prop:: transitionName>, <test prop:: minOverlayWidthMatchTrigger>, <test prop:: disabled>, <test prop:: overlayClassName> trigger should support attrs about minOverlayWidthMatchTrigger, transitionName, trigger, visible, disabled, ', () => {
        const wrapper = mount(
            <Dropdown
                overlay={() => <div id="function">menu</div>}
                trigger={['click']}
                transitionName="slide-up"
                overlayClassName={'overlayClassName'}
                defaultVisible
                disabled
            >
                <button type="button">button</button>
            </Dropdown>
        );
        expect(wrapper.exists(`.${prefixDropdown}-menu-match-trigger`)).toEqual(false);
        expect(wrapper.exists(`.${prefixDropdown}.overlayClassName`)).toEqual(false);
        wrapper.find('button').simulate('click');
        expect(wrapper.exists(`.${prefixDropdown}.overlayClassName`)).toEqual(false);
        expect(wrapper.exists(`.${prefixDropdown}-menu-match-trigger`)).toEqual(false);
        wrapper.setProps({disabled: false});
        wrapper.find('button').simulate('click');
        expect(wrapper.exists(`.${prefixDropdown}.overlayClassName`)).toEqual(true);
        expect(wrapper.exists(`.${prefixDropdown}-menu-match-trigger`)).toEqual(true);
    });

    it('component: Dropdown, <test prop:: onVisibleChange>simulate onVisibleChange event', () => {

        const Demo = () => {

            const onVisibleChange = (visible) => {
                console.log('onVisibleChange', visible);
            }

            return (
                <Dropdown overlay={() => <div id="function">menu</div>} trigger={['click']}
						  onVisibleChange={onVisibleChange}>
                    <button type="button">button</button>
                </Dropdown>
            )
        }

        const wrapper = mount(<Demo/>);
        expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        wrapper.find('button').simulate('click');
        expect(wrapper.exists(`.${prefixDropdown}-trigger`)).toEqual(true);
    });


});

describe('component: Dropdown, <test prop:: delayShow>, <test prop:: delayHide>, <test prop:: delay>', () => {
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
    it('it should be show when click ', async() => {
        const wrapper = mount(
            <Dropdown overlay={<div id="function">menu</div>}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({
            delay: 2000
        })
        wrapper.find('button').simulate('mouseEnter');
        expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        // await waitFor(() => expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true),{timeout: 2500})
        // expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true);
        // wrapper.find('button').simulate('mouseLeave');
        // expect(wrapper.exists(`.${prefixDropdown}.${prefixDropdown}-hidden`)).toEqual(false);
        // await waitFor(() => expect(wrapper.exists(`.${prefixDropdown}.${prefixDropdown}-hidden`)).toEqual(true),{timeout: 2500})
    })
    it('it should be show when click ', async() => {
        const wrapper = mount(
            <Dropdown overlay={<div id="function">menu</div>}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({
            mouseLeaveDelay: 2000,
            mouseEnterDelay: 3000,
        })
        wrapper.find('button').simulate('mouseEnter');
        expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        // await waitFor(() => expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true),{timeout: 3500})
        // wrapper.find('button').simulate('mouseLeave');
        // expect(wrapper.exists(`.${prefixDropdown}.${prefixDropdown}-hidden`)).toEqual(false);
        // await waitFor(() => expect(wrapper.exists(`.${prefixDropdown}.${prefixDropdown}-hidden`)).toEqual(true),{timeout: 2500})
    })
})
describe('component: Dropdown, <test prop:: showAction>, <test prop:: hideAction>', () => {
    it('it should be show when click ', () => {
        const wrapper = mount(
            <Dropdown overlay={<div id="function">menu</div>}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({
            showAction: ['click'],
            hideAction: ['click'],
        })
        wrapper.find('button').simulate('click')
        expect(wrapper.find(`#function`)).toHaveLength(1);
        expect(wrapper.find(`.${prefixDropdown}-hidden`)).toHaveLength(0);
        wrapper.find('button').simulate('click')
        expect(wrapper.find(`.${prefixDropdown}-hidden`)).toHaveLength(1);
    })
})

describe('component: Dropdown, <test prop:: overlayStyle>', () => {
    it('dropdown style.color is red', () => {
        const wrapper = mount(
            <Dropdown
                overlay="string1"
                overlayStyle={{color: 'red'}}
            >
                <button type="button">button</button>
            </Dropdown>
        )
        wrapper.setProps({
            visible: true
        })
        expect(wrapper.find(`.${prefixDropdown}`).prop('style').color).toBe('red')

    })
})

describe('component: Dropdown, <test prop:: getPopupContainer>', () => {
    it('drop should be in root ', () => {
        const wrapper = mount(
            <div id={'root'}>
                <Dropdown
                    getPopupContainer={() => document.getElementById('root')}
                    trigger={['click']}
                    overlay="string1"
                >
                    <button type="button">button</button>
                </Dropdown>
            </div>
        );
        wrapper.find('button').simulate('click');
        // expect(wrapper.exists(`#root .${prefixDropdown}`)).toBe(true)

    })
})

// describe('component: Dropdown, <test prop:: getDocument>', () => {
//     //此属性原生rc-trigger有bug
//     xit('close should by trigger click', () => {
//         const wrapper = mount(
//             <div id="root">
//                 <div id={'trigger'}/>
//                 <Dropdown
//                     getDocument={() => document}
//                     overlay="string1"
//                     visible={true}
//                     trigger={['click']}
//                 >
//                     <button type="button">button</button>
//                 </Dropdown>
//             </div>
//         )
//         // expect(wrapper.find('Trigger').props().popupVisible).toEqual(false);
//         // expect(wrapper.find(`.${prefixDropdown}`)).toHaveLength(0);
//         // wrapper.find('Trigger').simulate('click');
//         // expect(wrapper.find('Trigger').props().popupVisible).toEqual(true);
//         // expect(wrapper.find(`.${prefixDropdown}`)).toHaveLength(1);
//         // wrapper.find(`#trigger`).simulate('click');
//         // expect(wrapper.find('Trigger').props().popupVisible).toEqual(false);
//         // expect(wrapper.find(`.${prefixDropdown}`)).toHaveLength(0);
//     })
// })

describe('component: Dropdown, <test prop:: matchNode>', () => {
    it('when has matchNode, the align offsetX will be preOffsetX + (rootNode.width - matchNode.width)', () => {
        const wrapper = mount(
            <div style={{width: 120, height: 120}}>
                <Dropdown
                    overlay="string1"
                    trigger={['click']}
                    style={{width: 120, height: 120}}
                    matchNode={{
                        offsetWidth: 100
                    }}
                >
                    <button type="button" style={{width: 120}}>button</button>
                </Dropdown>
            </div>
        );
        // 此处获取宽度会有问题,没有什么变化，后续处理
        wrapper.find('button').simulate('click');
        // expect(wrapper.find('Trigger').props().popupAlign.offset[0]).toEqual(0);
    })
})

describe('component: Dropdown, <test prop:: destroyPopupOnHide>', () => {
    it('the popup should be not destroy on hide', () => {
        const wrapper = mount(
            <Dropdown overlay={<div id="function">menu</div>}>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({
            trigger: ['click']
        });
        expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        wrapper.find('button').simulate('click');
        // expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true);
        // expect(wrapper.find(`.${prefixDropdown}:not(.${prefixDropdown}-hidden)`)).toHaveLength(1);
        // wrapper.find('button').simulate('click')
        // expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true);
        // expect(wrapper.find(`.${prefixDropdown}-hidden`)).toHaveLength(1);
    })

    it('the popup should be destroy on hide', () => {
        const wrapper = mount(
            <Dropdown overlay={<div id="function">menu</div>} destroyPopupOnHide>
                <button type="button">button</button>
            </Dropdown>
        );
        wrapper.setProps({
            trigger: ['click']
        });
        expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        wrapper.find('button').simulate('click');
        // expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(true);
        // expect(wrapper.find(`.${prefixDropdown}:not(.${prefixDropdown}-hidden)`)).toHaveLength(1);
        // wrapper.find('button').simulate('click')
        // expect(wrapper.exists(`.${prefixDropdown}`)).toEqual(false);
        // expect(wrapper.find(`.${prefixDropdown}-hidden`)).toHaveLength(0);
    })
})

// xdescribe('component: Dropdown, <test prop:: animation>，  <test prop:: align>', () => {
//     xit('animation unused', () => {
//     })
//     xit('align unused', () => {
//     })
// })

// 和 visible 同时使用 存在bug
// todo 增加 和visible的case
// requestAnimationFrame 失败
xdescribe('component: Dropdown, <test prop:: overlayMaxHeight>', () => {
    it('drop should be in root ', () => {
        const wrapper = mount(
            <div id="root" style={{height: '250px'}}>
                <Dropdown
                    getPopupContainer={() => document.getElementById('root')}
                    trigger={['click']}
                    // visible={true}
                    overlay="string1"
                    overlayMaxHeight={250}
                >
                    <button type="button">button</button>
                </Dropdown>
            </div>
        )
        wrapper.find('button').simulate('click');
        expect(wrapper.find(`#root .${prefixDropdown}`).getDOMNode().style['max-height']).toBe('250px');
    })
})

// animation: PropTypes.any, // 暂不抛出使用， 将动画名称前添加 clsPrefix- 前缀
// align: PropTypes.object, // 暂不抛出使用， 由placement 接受 转换使用
// placement: PropTypes.oneOfType([PropTypes.string , PropTypes.object]),
// getDocument: PropTypes.func,
