import { mount } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import {waitFor} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import Menu from '../src';
import { prefix } from '../../wui-core/src/updatePrefix';
import { keyEvent } from '../../../next-ui-library/test/common/index';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import KeyCode from 'rc-util/lib/KeyCode';
const prefixMenu = `${prefix}-menu`;

const { SubMenu } = Menu;
const { Item } = Menu;
describe('Menu Keyboard Test', () => {
    function isActive(index, active = true) {
        const checker = expect(document.querySelectorAll(`li.${prefixMenu}-item`)[index].classList.contains(`${prefixMenu}-item-active`));
        if (active) {
            checker.toBeTruthy();
        } else {
            checker.toBeFalsy();
        }
    }

    function last(elements) {
        return elements[elements.length - 1];
    }

     function keyDown(keyCode) {
        let el = document.querySelector(`ul.${prefixMenu}-root`)
        keyEvent(el, 'keydown', keyCode, true)
        // // SubMenu raf need slow than accessibility
        // for (let i = 0; i < 20; i += 1) {
        //     act(() => {
        //         jest.advanceTimersByTime(10);
        //     });
        // }
    } 
    
    beforeAll(() => {
        // Mock to force make menu item visible
        spyElementPrototypes(HTMLElement, {
            offsetParent: {
                get() {
                    return this.parentElement;
                },
            },
        });
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    
    it('keydown works when children change',  async () => {
        const wrapper = mount(
            <Menu>
                <Item key='1'>1</Item>
                <Item key='2'>2</Item>
                <Item key='3'>3</Item>
            </Menu>, { attachTo: document.body }
        );
        wrapper.debug();
        console.log(222)
        // First item
        keyDown(KeyCode.DOWN);
        await waitFor(() => {
            isActive(0);
        })
        // Next item
        keyDown(KeyCode.DOWN);
        await waitFor(() => {
            isActive(1);
        })
        // Very first item
        keyDown(KeyCode.HOME);
        await waitFor(() => {
            isActive(0);
        })
        // Very last item
        keyDown(KeyCode.END);
        await waitFor(() => {
            isActive(2);
        })
    });

    // it('Skip disabled item', () => {
    //     const wrapper = mount(
    //         <Menu defaultActiveFirst>
    //             <Item disabled />
    //             <Item key="1">1</Item>
    //             <Item disabled />
    //             <Item key="2">2</Item>
    //             <Item disabled />
    //         </Menu>, { attachTo: document.body }
    //     );
    //
    //     // Next item
    //     keyDown(KeyCode.DOWN);
    //     keyDown(KeyCode.DOWN);
    //     isActive(3);
    //
    //     // Back to first item
    //     keyDown(KeyCode.UP);
    //     isActive(1);
    //
    //     // To the last available item
    //     keyDown(KeyCode.END);
    //     isActive(3);
    //
    //     // To the first available item
    //     keyDown(KeyCode.HOME);
    //     isActive(1);
    // });
    //
    // it('Enter to open menu and active first item', () => {
    //     const wrapper = mount(
    //         <Menu>
    //             <SubMenu key="s1" title="submenu1">
    //                 <Item key="s1-1">1</Item>
    //             </SubMenu>
    //         </Menu>, { attachTo: document.body }
    //     );
    //
    //     // Active first sub menu
    //     keyDown(KeyCode.DOWN);
    //
    //     // Open it
    //     keyDown(KeyCode.ENTER);
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     expect(document.querySelector(`.${prefixMenu}-submenu-open`)).toBeTruthy();
    // });
    //
    // describe('go to children & back of parent', () => {
    //     function testDirection(
    //         direction,
    //         subKey,
    //         parentKey,
    //     ) {
    //         it(`direction ${direction}`, async () => {
    //             const wrapper = mount(
    //                 <Menu mode="vertical" direction={direction}>
    //                     <SubMenu key="1" title="FirstLevel">
    //                         <SubMenu key="2" title="SecondLevel">
    //                             <Item key="3">ChildItem</Item>
    //                         </SubMenu>
    //                     </SubMenu>
    //                 </Menu>, { attachTo: document.body }
    //             );
    //
    //             // Active first
    //             keyDown(KeyCode.DOWN);
    //             // Open and active sub
    //             keyDown(subKey);
    //             expect(document.querySelector(`.${prefixMenu}-submenu-open`)).toBeTruthy();
    //             act(() => {
    //                 jest.runAllTimers();
    //             });
    //             expect(
    //                 last(
    //                     document.querySelectorAll(
    //                         `.${prefixMenu}-submenu-active > .${prefixMenu}-submenu-title`
    //                     ),
    //                 ).textContent
    //             ).toEqual('SecondLevel');
    //
    //             // Open and active sub
    //             keyDown(subKey);
    //             expect(
    //                 document.querySelectorAll(`.${prefixMenu}-submenu-open`)
    //             ).toHaveLength(2);
    //             act(() => {
    //                 jest.runAllTimers();
    //             });
    //             expect(
    //                 last(document.querySelectorAll(`.${prefixMenu}-item-active`)).textContent
    //             ).toEqual('ChildItem');
    //
    //             // Back to parent
    //             keyDown(parentKey);
    //             expect(
    //                 document.querySelectorAll(`.${prefixMenu}-submenu-open`)
    //             ).toHaveLength(1);
    //             expect(document.querySelector(`.${prefixMenu}-item-active`)).toBeFalsy();
    //
    //             // Back to parent
    //             keyDown(parentKey);
    //             expect(document.querySelector(`.${prefixMenu}-submenu-open`)).toBeFalsy();
    //             expect(
    //                 document.querySelectorAll(`.${prefixMenu}-submenu-active`)
    //             ).toHaveLength(1);
    //         });
    //     }
    //
    //     testDirection('ltr', KeyCode.RIGHT, KeyCode.LEFT);
    //     testDirection('rtl', KeyCode.LEFT, KeyCode.RIGHT);
    // });
    //
    // it('inline keyboard', () => {
    //     const wrapper = mount(
    //         <Menu mode="inline">
    //             <Item key="1">FirstLevel</Item>
    //             <SubMenu key="2" title="SecondLevel">
    //                 <Item key="3">ChildItem</Item>
    //             </SubMenu>
    //         </Menu>, { attachTo: document.body }
    //     );
    //
    //     // Nothing happen when no control key
    //     keyDown(KeyCode.P);
    //     expect(document.querySelector(`.${prefixMenu}-item-active`)).toBeFalsy();
    //
    //     // Active first
    //     keyDown(KeyCode.DOWN);
    //     isActive(0);
    //
    //     // Active next
    //     keyDown(KeyCode.DOWN);
    //
    //     // Right will not open
    //     keyDown(KeyCode.RIGHT);
    //     expect(document.querySelector(`.${prefixMenu}-submenu-open`)).toBeFalsy();
    //
    //     // Trigger open
    //     keyDown(KeyCode.ENTER);
    //     expect(document.querySelector(`.${prefixMenu}-submenu-open`)).toBeTruthy();
    //     expect(last(document.querySelectorAll(`.${prefixMenu}-submenu`)).classList.contains(
    //         `${prefixMenu}-submenu-active`,
    //     )).toBeTruthy;
    //     isActive(1, false);
    //
    //     // Active sub item
    //     keyDown(KeyCode.DOWN);
    //     isActive(1);
    // });
    //
    // it('Focus last one', () => {
    //     const wrapper = mount(
    //         <Menu mode="inline">
    //             <Item key="first">First</Item>
    //             <Item key="last">Last</Item>
    //         </Menu>, { attachTo: document.body }
    //     );
    //
    //     keyDown(KeyCode.UP);
    //     isActive(1);
    // });
    //
    // it('Focus to link direct', () => {
    //     const wrapper = mount(
    //         <Menu mode="inline">
    //             <Item key="test">
    //                 <a href="https://ant.design">Test</a>
    //             </Item>
    //         </Menu>, { attachTo: document.body }
    //     );
    //
    //     const focusSpy = jest.spyOn(document.querySelector('a'), 'focus');
    //
    //     keyDown(KeyCode.DOWN);
    //     expect(focusSpy).toHaveBeenCalled();
    // });
    //
    // it('no dead loop', async () => {
    //     const wrapper = mount(
    //         <Menu mode="vertical" openKeys={['Parent']}>
    //             <Item key="test">Child</Item>
    //         </Menu>, { attachTo: document.body }
    //     );
    //     keyDown(KeyCode.DOWN);
    //     keyDown(KeyCode.LEFT);
    //     keyDown(KeyCode.RIGHT);
    //     isActive(0);
    // });
});