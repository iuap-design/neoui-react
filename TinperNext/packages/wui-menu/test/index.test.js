/** index.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {useState} from 'react';
import {waitFor} from "@testing-library/react";
import {act} from 'react-dom/test-utils';
// import { sleep } from '../../../tests/utils';
import {
    actWait,
    attrsTest,
    attrsTestByLength,
    eventsTest,
    mountTest,
    testCustomStyle
} from "../../../next-ui-library/test/common/index"
import {prefix, getClsPrefix} from '../../wui-core/src';
import Icon from '../../wui-icon/src';
import Menu from '../src';
// import collapseMotion from '../src/_util/motion';

const prefixMenu = getClsPrefix('menu')
const dropdownClsPrefix = getClsPrefix('dropdown')

const {SubMenu} = Menu;

const noop = () => {
};
const MenuC = (props) => (
    <div id="root">
        <Menu getPopupContainer={node => node?.parentNode} {...props}>
            <SubMenu key="1" title="submenu1">
                <Menu.Item key="submenu1">Option 1</Menu.Item>
                <Menu.Item key="submenu2">Option 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
    </div>
)
const expectSubMenuBehavior = async(menu, enter = noop, leave = noop) => {
    expect(menu.find(`.${prefixMenu}-submenu-open`).length).toBe(0);
    enter();
    await waitFor(()=>{});
    function getSubMenu() {
        return menu.find(`.${prefixMenu}-submenu`).at(0);
    }

    // expect(menu.render()).toMatchSnapshot();
    // expect(getSubMenu().getDOMNode()).toMatchSnapshot();
    expect(
        getSubMenu().hasClass(`${prefixMenu}-submenu-open`)
    ).toBe(true);
    leave();
    // expect(
    //     getSubMenu().hasClass(`${prefixMenu}-submenu-open`)
    // ).toBe(false);
};

describe('Menu', () => {
    window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
    window.cancelAnimationFrame = window.clearTimeout;

    mountTest(() => (
        <Menu>
            <Menu.Item key={'1'}/>
            <Menu.ItemGroup/>
            <Menu.SubMenu key={'2'}/>
        </Menu>
    ));

    mountTest(() => (
        <Menu>
            <Menu.Item key={'1'}/>

            <Menu.ItemGroup/>
            <Menu.SubMenu key={'2'}/>
            {null}

            <Menu.Item key={'3'}/>

            {undefined}
            <>
                <>
                    <Menu.Item key={'4'}/>
                </>
            </>
        </Menu>
    ));

    // 可以使用假函数
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('component: Menu, <test prop:: defaultSelectedKeys>If has select nested submenu item ,the menu items on the grandfather level should be highlight', () => {
        const wrapper = mount(
            <Menu defaultSelectedKeys={['1-3-2']} mode="vertical">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="1-1">Option 1</Menu.Item>
                    <Menu.Item key="1-2">Option 2</Menu.Item>
                    <SubMenu key="1-3" title="submenu1-3">
                        <Menu.Item key="1-3-1">Option 3</Menu.Item>
                        <Menu.Item key="1-3-2">Option 4</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.find(`li.${prefixMenu}-submenu-selected`).length).toBe(1);
    });
    it('component: Menu, <test prop:: selectedKeys>If has select nested submenu item ,the menu items on the grandfather level should be highlight', () => {
        const wrapper = mount(
            <Menu selectedKeys={['1-3-2']} mode="vertical">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="1-1">Option 1</Menu.Item>
                    <Menu.Item key="1-2">Option 2</Menu.Item>
                    <SubMenu key="1-3" title="submenu1-3">
                        <Menu.Item key="1-3-1">Option 3</Menu.Item>
                        <Menu.Item key="1-3-2">Option 4</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.find(`li.${prefixMenu}-submenu-selected`).length).toBe(1);
    });

    it('component: Menu, <test prop:: forceSubMenuRender>forceSubMenuRender', () => {
        const wrapper = mount(
            <Menu mode="horizontal">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="1-1">
                        <span className="bamboo"/>
                    </Menu.Item>
                </SubMenu>
            </Menu>,
        );

        expect(wrapper.find('.bamboo').length).toBe(0);

        wrapper.setProps({forceSubMenuRender: true});
        expect(wrapper.find('.bamboo').length).toBe(1);
    });

    it('component: Menu, <test prop:: mode>, <test prop:: defaultOpenKeys>should accept defaultOpenKeys in mode horizontal', async () => {
        const wrapper = mount(
            <Menu defaultOpenKeys={['1']} mode="horizontal">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-horizontal`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: mode>should accept defaultOpenKeys in mode inline', () => {
        const wrapper = mount(
            <Menu defaultOpenKeys={['1']} mode="inline">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-inline`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: mode>should accept defaultOpenKeys in mode vertical', () => {
        const wrapper = mount(
            <Menu defaultOpenKeys={['1']} mode="vertical">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-vertical`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: mode>, <test prop:: openKeys>should accept openKeys in mode horizontal', () => {
        const wrapper = mount(
            <Menu openKeys={['1']} mode="horizontal">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-horizontal`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: mode>, <test prop:: openKeys>should accept openKeys in mode inline', () => {
        const wrapper = mount(
            <Menu openKeys={['1']} mode="inline">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-inline`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: mode>, <test prop:: openKeys>should accept openKeys in mode vertical', () => {
        const wrapper = mount(
            <Menu openKeys={['1']} mode="vertical">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expect(wrapper.exists(`.${prefixMenu}-vertical`)).toBe(true);
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
    });

    it('component: Menu, <test prop:: openKeys>test update submenu in mode horizontal', () => {
        const wrapper = mount(
            <Menu mode="horizontal">
                <SubMenu key="1" title="submenu">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>
        );
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(false);
        wrapper.setProps({openKeys: ['1']})
        expect(wrapper.find(`.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);
        wrapper.setProps({openKeys: []})
        expect(wrapper.exists(`.${prefixMenu}-submenu .${prefixMenu}-submenu-open`)).toBe(false);
    });

    it('component: Menu, <test prop:: openKeys>test update submenu in mode inline', async () => {
        const wrapper = mount(
            <Menu mode="inline">
                <SubMenu key="1" title="submenu">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>
        );
        await expectSubMenuBehavior(
            wrapper,
            () => wrapper.setProps({openKeys: ['1']}),
            () => wrapper.setProps({openKeys: []}),
        );
    });

    it('component: Menu, <test prop:: openKeys>test update submenu in mode vertical', () => {
        const wrapper = mount(
            <Menu mode="vertical">
                <SubMenu key="1" title="submenu">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>
        );
        expectSubMenuBehavior(
            wrapper,
            () => wrapper.setProps({openKeys: ['1']}),
            () => wrapper.setProps({openKeys: []}),
        );
    });
    it('component: Menu, <test prop:: inlineCollapsed>should always follow openKeys when inlineCollapsed is switched', () => {
        const wrapper = mount(
            <Menu defaultOpenKeys={['1']} mode="inline">
                <Menu.Item key="menu1" icon={<Icon type="uf-dongjie"/>}>
					Option
                </Menu.Item>
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option</Menu.Item>
                    <Menu.Item key="submenu2">Option</Menu.Item>
                </SubMenu>
            </Menu>,
        );
        expect(wrapper.find(`li.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);

        // inlineCollapsed
        wrapper.setProps({inlineCollapsed: true});
        act(() => {
            jest.runAllTimers();
            wrapper.update();
        });

        expect(wrapper.find(`ul.${prefix}-menu-root`).hasClass(`${prefixMenu}-inline-collapsed`)).toBeTruthy();

        // !inlineCollapsed
        wrapper.setProps({inlineCollapsed: false});
        act(() => {
            jest.runAllTimers();
        });

        expect(wrapper.find(`ul.${prefix}-menu-root`).hasClass(`${prefixMenu}-inline`)).toBeTruthy();
        // expect(wrapper.find(`li.${prefixMenu}-submenu`).at(0).hasClass(`${prefixMenu}-submenu-open`)).toBe(true);

        expect(wrapper.find('i').first().hasClass('uf-dongjie')).toBeTruthy();
    });

});
describe('open submenu when click submenu title', () => {
    const toggleMenu = (wrapper, index, event) => {
        wrapper.find(`.${prefixMenu}-submenu-title`).at(index).simulate(event);
        jest.runAllTimers();
        wrapper.update();
    };
    // 可以使用假函数
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });
    it('inline', () => {
        jest.useFakeTimers();
        const wrapper = mount(
            <Menu mode="inline">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        expectSubMenuBehavior(
            wrapper,
            () => toggleMenu(wrapper, 0, 'click'),
            () => toggleMenu(wrapper, 0, 'click'),
        );
    });
    // it('component: Menu, <test prop:: onOpenChange>, <test prop:: motion> inline menu collapseMotion should be triggered', async() => {
    //     jest.useFakeTimers();
    //     const cloneMotion = {
    //         ...collapseMotion,
    //         motionDeadline: 1,
    //     };

    //     const onOpenChange = jest.fn();

    //     const wrapper = mount(
    //         <Menu mode="inline" motion={cloneMotion} onOpenChange={onOpenChange}>
    //             <SubMenu key="1" title="submenu1">
    //                 <Menu.Item key="submenu1">Option 1</Menu.Item>
    //                 <Menu.Item key="submenu2">Option 2</Menu.Item>
    //             </SubMenu>
    //             <Menu.Item key="2">menu2</Menu.Item>
    //         </Menu>,
    //     );
    //     wrapper.find(`div.${prefixMenu}-submenu-title`).simulate('click');
    //     act(() => {
    //         jest.runAllTimers();
    //         wrapper.update();
    //     });
    //     expect(onOpenChange).toHaveBeenCalled();
    // });
    it('component: Menu, <test prop:: triggerSubMenuAction>,vertical with click', () => {
        jest.useFakeTimers();
        const wrapper = mount(
            <Menu mode="vertical" triggerSubMenuAction="click">
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        jest.runAllTimers();
        expectSubMenuBehavior(
            wrapper,
            () => toggleMenu(wrapper, 0, 'click'),
            () => toggleMenu(wrapper, 0, 'click'),
        );
    });
    it('component: Menu, <test prop:: onmouseEnter>,onmouseEnter should work', async () => {
        const onMouseEnter = jest.fn();
        const wrapper = mount(
            <Menu onMouseEnter={onMouseEnter} defaultSelectedKeys={['test1']}>
                <Menu.Item key="test1">Navigation One</Menu.Item>
                <Menu.Item key="test2">Navigation Two</Menu.Item>
            </Menu>,
        );
        wrapper.find(`ul.${prefix}-menu-root`).simulate('mouseEnter');
        expect(onMouseEnter).toHaveBeenCalled();
    });
    it('component: Menu, <test prop:: onOpen>, <test prop:: onClose>props#onOpen and props#onClose do not warn anymore', async () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });

        const onOpen = jest.fn();
        const onClose = jest.fn();
        const wrapper = mount(
            <Menu defaultOpenKeys={['1']} mode="inline" onOpen={onOpen} onClose={onClose}>
                <SubMenu key="1" title="submenu1">
                    <Menu.Item key="submenu1">Option 1</Menu.Item>
                    <Menu.Item key="submenu2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">menu2</Menu.Item>
            </Menu>,
        );
        await waitFor(()=>{
            expect(errorSpy.mock.calls.length).toBe(1);
            expect(errorSpy.mock.calls[0][0]).not.toContain(
                '`onOpen` and `onClose` are removed, please use `onOpenChange` instead',
            );
            expect(onOpen).not.toHaveBeenCalled();
            expect(onClose).not.toHaveBeenCalled();
        })
    });
    // onOpenChange 只有submenu 展开收起才会触发，rc-menu 版本修复了问题，这个场景失效了。。。
    // it('should trigger onOpenChange when collapse inline menu', () => {
    //     const onOpenChange = jest.fn();

    //     function App() {
    //         const [inlineCollapsed, setInlineCollapsed] = useState(false);
    //         return (
    //             <div>
    //                 <button
    //                     type="button"
    //                     onClick={() => {
    //                         setInlineCollapsed(!inlineCollapsed);
    //                     }}
    //                 >
	// 					collapse menu
    //                 </button>
    //                 <Menu mode="inline" onOpenChange={onOpenChange} inlineCollapsed={inlineCollapsed}>
    //                     <Menu.SubMenu key="1" title="menu">
    //                         <Menu.Item key="1-1">menu</Menu.Item>
    //                         <Menu.Item key="1-2">menu</Menu.Item>
    //                     </Menu.SubMenu>
    //                 </Menu>
    //             </div>
    //         );
    //     }

    //     const wrapper = mount(<App/>);
    //     wrapper.find('button').simulate('click');
    //     act(() => {
    //         jest.runAllTimers();
    //         wrapper.update();
    //     });
    //     expect(onOpenChange).toHaveBeenCalled();
    // });
    it('Use first char as Icon when collapsed', () => {
        const wrapper = mount(
            <Menu mode="inline" inlineCollapsed>
                <Menu.SubMenu title="Light"/>
                <Menu.Item>Bamboo</Menu.Item>
            </Menu>
        );
        expect(wrapper.find(`.${prefixMenu}-inline-collapsed-noicon`).first().text()).toEqual('Light');
        expect(wrapper.find(`.${prefixMenu}-inline-collapsed-noicon`).last().text()).toEqual('B');
    });
    it('divider should show', () => {
        const wrapper = mount(
            <Menu mode="vertical">
                <SubMenu key="sub1" title="Navigation One">
                    <Menu.Item key="1">Option 1</Menu.Item>
                </SubMenu>
                <Menu.Divider/>
                <SubMenu key="sub2" title="Navigation Two">
                    <Menu.Item key="2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Divider dashed/>
                <SubMenu key="sub4" title="Navigation Three">
                    <Menu.Item key="3">Option 3</Menu.Item>
                </SubMenu>
            </Menu>,
        );
        expect(wrapper.find(`li.${prefixMenu}-item-divider`).length).toBe(2);
        expect(wrapper.find(`li.${prefixMenu}-item-divider-dashed`).length).toBe(1);
    });

    it('all types must be available in the "items" syntax， <test prop:: items>', () => {
        const wrapper = mount(
            <Menu
                mode="inline"
                defaultOpenKeys={['submenu', 'group-submenu']}
                items={[
                    {
                        key: 'submenu',
                        label: 'Submenu',
                        children: [
                            { key: 'submenu-item1', label: 'SubmenuItem 1' },
                            { key: 'submenu-item2', label: 'SubmenuItem 2' },
                        ],
                    },
                    { key: 'divider', type: 'divider' },
                    {
                        key: 'group',
                        type: 'group',
                        label: 'Group',
                        children: [
                            { key: 'group-item', label: 'GroupItem' },
                            { key: 'group-divider', type: 'divider' },
                            {
                                key: 'group-submenu',
                                label: 'GroupSubmenu',
                                children: [
                                    { key: 'group-submenu-item1', label: 'GroupSubmenuItem 1' },
                                    { key: 'group-submenu-item2', label: 'GroupSubmenuItem 2' },
                                ],
                            },
                        ],
                    },
                ]}
            />,
        );
        const h = wrapper.html().replace(/date-for-wui-tooltip=".+"/g, 'date-for-wui-tooltip=123');
        expect(h).toMatchSnapshot();
    });

    it('in the "items" syntax should be equal normal', () => {
        const wrapper1 = mount(
            <Menu mode="inline">
                <SubMenu key="submenu" title="Submenu">
                    <Menu.Item key="submenu-item1">SubmenuItem 1</Menu.Item>
                    <Menu.Item key="submenu-item2">SubmenuItem 2</Menu.Item>
                </SubMenu>
                <Menu.Divider key='divider'/>
                <Menu.ItemGroup key='group' title="Group">
                    <Menu.Item key="group-item">GroupItem</Menu.Item>
                    <Menu.Divider key='group-divider'/>
                    <SubMenu key="group-submenu" title="GroupSubmenu">
                        <Menu.Item key="group-submenu-item1">GroupSubmenuItem 1</Menu.Item>
                        <Menu.Item key="group-submenu-item2">GroupSubmenuItem 2</Menu.Item>
                    </SubMenu>
                </Menu.ItemGroup>
            </Menu>,
        );
        const wrapper2 = mount(
            <Menu
                mode="inline"
                items={[
                    {
                        key: 'submenu',
                        label: 'Submenu',
                        children: [
                            { key: 'submenu-item1', label: 'SubmenuItem 1' },
                            { key: 'submenu-item2', label: 'SubmenuItem 2' },
                        ],
                    },
                    { key: 'divider', type: 'divider' },
                    {
                        key: 'group',
                        type: 'group',
                        label: 'Group',
                        children: [
                            { key: 'group-item', label: 'GroupItem' },
                            { key: 'group-divider', type: 'divider' },
                            {
                                key: 'group-submenu',
                                label: 'GroupSubmenu',
                                children: [
                                    { key: 'group-submenu-item1', label: 'GroupSubmenuItem 1' },
                                    { key: 'group-submenu-item2', label: 'GroupSubmenuItem 2' },
                                ],
                            },
                        ],
                    },
                ]}
            />
        );
        const h1 = wrapper1.html().replace(/date-for-wui-tooltip=".+"/g, 'date-for-wui-tooltip=123');
        const h2 = wrapper2.html().replace(/date-for-wui-tooltip=".+"/g, 'date-for-wui-tooltip=123');
        expect(h1).toEqual(h2);
    });

    it('mode is dropdown', () => {
        const wrapper = mount(
            <Menu mode="dropdown">
                <SubMenu key="sub1" title="Navigation One">
                    <Menu.Item key="1">Option 1</Menu.Item>
                </SubMenu>
                <Menu.Divider/>
                <SubMenu key="sub2" title="Navigation Two">
                    <Menu.Item key="2">Option 2</Menu.Item>
                </SubMenu>
                <Menu.Divider dashed/>
                <SubMenu key="sub4" title="Navigation Three">
                    <Menu.Item key="3">Option 3</Menu.Item>
                </SubMenu>
            </Menu>,
        );
        expect(wrapper.find(`.${dropdownClsPrefix}-menu`).length).toBe(1);
        expect(wrapper.find(`.${dropdownClsPrefix}-menu-vertical`).length).toBe(1);
    })

    it('component: Menu, <test prop:: arrowdown>, arrowdown is work when mode = "horizontal"', () => {
        const wrapper = mount(
            <Menu mode="horizontal">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <SubMenu key="sub4" title="Navigation Three1">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <SubMenu key="sub5" title="Navigation Three2">
                        <Menu.Item key="4">Option 4</Menu.Item>
                        <Menu.Item key="5">Option 5</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>,
        );
        expect(wrapper.find(`.${prefixMenu}-submenu-arrowdown`).length).toBe(0);
        wrapper.setProps({arrowdown: true});
        expect(wrapper.find(`.${prefixMenu}-horizontal`).length).toBe(1);
        expect(wrapper.find(`.${prefixMenu}-submenu-horizontal.${prefixMenu}-submenu-arrowdown`).length).toBe(1);
    })

    it('component: Menu, <test prop:: position>', () => {
        const wrapper = mount(
            <Menu mode="horizontal">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <SubMenu key="sub4" title="Navigation Three1">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <SubMenu key="sub5" title="Navigation Three2">
                        <Menu.Item key="4">Option 4</Menu.Item>
                        <Menu.Item key="5">Option 5</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        );
        wrapper.setProps({position: 'rightTop'});
        wrapper.update();
        expect(wrapper.find(`.${prefixMenu}-root.${prefixMenu}-vertical-left`).length).toBe(1);
    })

    // todo 原生rc-menu内未找到此属性，此属性或许无效
    // xit('component: Menu, <test prop:: tabIndex>', () => {
    //     const wrapper = mount(
    //         <Menu mode="horizontal">
    //             <Menu.Item key="1">Option 1</Menu.Item>
    //             <Menu.Item key="2">Option 2</Menu.Item>
    //             <SubMenu key="sub4" title="Navigation Three1">
    //                 <Menu.Item key="3">Option 3</Menu.Item>
    //                 <SubMenu key="sub5" title="Navigation Three2">
    //                     <Menu.Item key="4">Option 4</Menu.Item>
    //                     <Menu.Item key="5">Option 5</Menu.Item>
    //                 </SubMenu>
    //             </SubMenu>
    //         </Menu>
    //     );
    //     // expect(wrapper.find('ForwardRef').props().tabIndex).toBe(-1);
    //     // wrapper.setProps({keyboard: true});
    //     // wrapper.update();
    //     // expect(wrapper.find('ForwardRef').props().tabIndex).toBe(0);
    //     // wrapper.setProps({tabIndex: 1});
    //     // wrapper.update();
    //     // expect(wrapper.find('ForwardRef').props().tabIndex).toBe(1);
    // })

    it('component: Menu, <test prop:: selectIcon>', () => {
        const wrapper = mount(
            <Menu mode="dropdown" multiple={true} selectedKeys={['1','2']}>
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <SubMenu key="sub4" title="Navigation Three1">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <SubMenu key="sub5" title="Navigation Three2">
                        <Menu.Item key="4">Option 4</Menu.Item>
                        <Menu.Item key="5">Option 5</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        );
        expect(wrapper.find(`i.${dropdownClsPrefix}-menu-item-selected-icon`).first().hasClass(`uf-correct-2`)).toBe(true);
        wrapper.setProps({selectIcon: <Icon type="uf-correct" />});
        expect(wrapper.find(`i.${dropdownClsPrefix}-menu-item-selected-icon`).first().hasClass(`uf-correct-2`)).toBe(false);
        expect(wrapper.find(`i.${dropdownClsPrefix}-menu-item-selected-icon`).first().hasClass(`uf-correct`)).toBe(true);
    })

    attrsTest({
        title: 'component: Menu, <test prop:: theme>',
        Component: MenuC,
        attrs: {
            theme: 'dark'
        },
        testAttr: {
            theme: 'light'
        },
        selector: `.${prefixMenu}`,
        classnames: [`${prefixMenu}-dark`],
    })

    testCustomStyle({
        title: 'component: Menu, <test prop:: inlineIndent>',
        Component: MenuC,
        attrs: {
            inlineIndent: 20,
            mode: "inline"
        },
        selector: `.${prefixMenu}-item-only-child`,
        verifyStyle: {'padding-left': '20px'}
    });
    attrsTest({
        title: 'component: Menu, <test prop:: expandIcon>',
        Component: MenuC,
        attrs: {
            expandIcon: <Icon type="uf-dongjie"/>
        },
        selector: `i.${prefixMenu}-submenu-expand-icon`,
        classnames: [`uf-dongjie`],
    })
    eventsTest({
        title: 'component: Menu, <test prop:: onSelect>',
        Component: MenuC,
        propFuncName: 'onSelect',
        dependentProps: {
            mode: "inline"
        },
        selector: `li.${prefixMenu}-item-only-child`,
        eventName: 'click',
        eventArgs: [],
        afterTest: (ev) => {
            expect(ev.mock.calls[0][0].key).toBe('2')
        }
    });
    eventsTest({
        title: 'component: Menu, <test prop:: onClick>',
        Component: MenuC,
        propFuncName: 'onClick',
        dependentProps: {
            mode: "inline"
        },
        selector: `li.${prefixMenu}-item-only-child`,
        eventName: 'click',
        eventArgs: [],
        afterTest: (ev) => {
            expect(ev.mock.calls[0][0].key).toBe('2')
        }
    });
    eventsTest({
        title: 'component: Menu, <test prop:: multiple>, <test prop:: onDeselect>',
        Component: MenuC,
        propFuncName: 'onDeselect',
        dependentProps: {
            mode: "inline",
            openKeys: ['1'],
            multiple: true,
            defaultSelectedKeys: ['submenu1', '2'],
        },
        selector: `li.${prefixMenu}-item-only-child`,
        eventName: 'click',
        eventArgs: [],
        afterTest: (ev) => {
            expect(ev.mock.calls[0][0].key).toBe('submenu1')
        }
    });
    // eventsTest({
    //   title: 'component: Menu, <test prop:: keyboard>, <test prop:: onKeyDown>, <test prop:: focusable>',
    //   Component: MenuC,
    //   propFuncName: 'onKeyDown',
    //   dependentProps: {
    //     mode: "inline",
    //     openKeys: ['1'],
    //     keyboard: true,
    //     focusable: true,
    //   },
    //   selector: `.${prefixMenu}-root`,
    //   eventName: 'keydown',
    //   eventArgs: [{keyCode: 27}]
    // });
})
//新增fieldid测试
describe('component: Menu, <test prop:: fieldid>', () => {
    it('[@fieldid="***_menu-item"]', () => {
        const wrapper = mount(
            <Menu mode="horizontal">
                <Menu.Item key="mail">
                    组织 1
                </Menu.Item>
                <Menu.Item key="app" disabled>
                    组织 2
                </Menu.Item>
            </Menu>
        );
        expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe(undefined);
        wrapper.setProps({ fieldid: 'test' })
        expect(wrapper.find(`ul li`).at(0).props().fieldid).toBe("test_menu-item");
    })
})
