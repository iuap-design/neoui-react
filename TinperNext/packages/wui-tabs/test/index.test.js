/** Tabs.tsx */
import {mount} from '../../../next-ui-library/test/common/mount'
import React, {Component} from 'react';
import {attrsTest} from "../../../next-ui-library/test/common/index";
import { sleep } from '../../../next-ui-library/test/common/utils';
import {prefix} from '../../wui-core/src/updatePrefix';
import Icon from '../../wui-icon/src'
import Menu from '../../wui-menu/src';
import Tabs from '../src/index';
import ScrollableTabBarNode from '../src/ScrollableTabBarNode'
// import { keyEvent } from '../../../next-ui-library/test/common/index';
import KeyCode from '../../wui-core/src/keyCode';
import {render, screen, fireEvent} from "@testing-library/react";
// import TabPanel from '../src/TabPanel';
const {TabPane, SearchTabs} = Tabs;
describe('component: Tabs, <test prop:: onTabClickHandle>, <test prop:: children>', () => {
    it('tab click test', () => {
        let item = "1";
        const onTabClickHandle = (key) => {
            item = key
        }
        let tabs = mount(
            <Tabs defaultActiveKey="2" tabBarStyle="simple" onTabClick={onTabClickHandle}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        tabs.find(`.${prefix}-tabs-tab`).at(2).simulate('click');
        expect(item).toEqual('3');
    })
})
describe('component: Tabs, <test prop:: renderTabContent>', () => {
    it('tab click test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" renderTabContent={() => <Icon type="uf-dongjie"/>}>
            </Tabs>
        );
        const content = tabs.find(`.${prefix}-tabs i`).first();
        expect(content.hasClass('uf-dongjie')).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: defaultActiveKey>', () => {

    it('tabs type card', function() {
        let tabs = mount(
            <Tabs type="card" defaultActiveKey="2">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs`).hasClass(`${prefix}-tabs-upborder`)).toEqual(true)
    })
})
describe('component: Tabs, <test prop:: type>', () => {
    it('tabs type trangle', async function() {
        let tabs = mount(
            <Tabs type="trangle" defaultActiveKey="2">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        await sleep(100)
        expect(tabs.find(`.${prefix}-tabs`).hasClass(`${prefix}-tabs-trangle`)).toEqual(true)
    })
})
describe('component: Tabs, <test prop:: className>', () => {
    it('Tabs Add className test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" className="testTabsClass">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs`).hasClass('testTabsClass')).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: onEdit>, <test prop:: hideAdd>', () => {
    it('hideAdd is true and click hideAdd callback test', () => {
        let flag = ''
        let removeKey = ''
        const onEdit = (targetKey, action) => {
            flag = action;
            removeKey = targetKey;
        }
        let tabs = mount(
            <Tabs type="editable-card" hideAdd={false} defaultActiveKey="2" onEdit={onEdit}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-bar`).find('.uf').at(0).hasClass('uf-plus')).toEqual(true);
        tabs.find(`.${prefix}-tabs-bar`).find('.uf-plus').simulate('click')
        expect(flag).toEqual('add')
        tabs.find(`.${prefix}-tabs-tab`).at(0).simulate('click')
        expect(flag).toEqual('add')
        tabs.find('.uf-close').at(3).simulate('click')
        expect(removeKey).toEqual('4');
    })
})
describe('component: Tabs, <test prop:: activeKey>', () => {
    it('Tabs activeKey The activation active test', () => {
        let tabs = mount(
            <Tabs activeKey="2">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tab`).at(1).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: defaultActiveKey>', () => {
    it('Tabs defaultActiveKey The activation active test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tab`).at(1).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: renderTabBar>', () => {
    it('Tabs renderTabBar loading the tabs header test', () => {
        const renderTabBar = () => {
            return (
                <div className="customHead"><span>卡片一</span><span>卡片二</span></div>
            )
        }
        let tabs = mount(
            <Tabs defaultActiveKey="2" renderTabBar={renderTabBar}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        // expect(tabs.find('.customHead').text()).toMatchSnapshot()
        expect(tabs.find('.customHead').text()).toEqual('卡片一卡片二');
    })
})
describe('component: Tabs, <test prop:: onChange>', () => {
    it('Tabs onChange callback test', () => {
        let value = ''
        const onChange = (activeKey) => {
            value = activeKey
        }
        let tabs = mount(
            <Tabs defaultActiveKey="2" onChange={onChange}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        tabs.find(`.${prefix}-tabs-tab`).at(2).simulate('click');
        expect(value).toEqual('3');
    })
});
['left', 'right', 'top', 'bottom'].forEach(item => {
    attrsTest({
        title: 'component: Tabs, <test prop:: tabBarPosition>',
        Component: Tabs,
        attrs: {
            tabBarPosition: item,
            defaultActiveKey: '2',
        },
        selector: `.${prefix}-tabs`,
        classnames: [`${prefix}-tabs-${item}`]
    })
});

describe('component: Tabs, <test prop:: tabBarPosition>', () => {
    it('Tabs tabBarPosition setting position test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" tabBarPosition="left">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );

        expect(tabs.find(`.${prefix}-tabs`).hasClass(`${prefix}-tabs-left`)).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: tabBarExtraContent>', () => {
    it('Tabs tabBarExtraContent setting header other Dom test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2"
				  tabBarExtraContent={(<button className="customHead">tabBarExtraContent</button>)}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );

        expect(tabs.find(`.${prefix}-tabs-bar`).find('button').hasClass('customHead')).toEqual(true);
    })
})
describe('component: Tabs, <test prop:: tabBarStyle>', () => {
    it('Tabs tabBarStyle setting style test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" tabBarStyle={{height: '400px'}}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        const tabm = tabs.find(`.${prefix}-tabs-bar`)
        expect(tabm.props().style.height).toBe('400px');
    })
})
describe('component: Tabs, <test prop:: style>', () => {
    it('Tabs tabBarStyle setting style test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" style={{height: '300px'}}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        const tabm = tabs.find(`.${prefix}-tabs`)
        expect(tabm.props().style.height).toBe('300px');
    })
})
describe('component: Tabs, <test prop:: defaultActiveKey>, <test prop:: placeholder>', () => {
    it('TabPane tab tabs header container test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tab`).at(1).text()).toEqual('Tab 2')
    })
    it('TabPane placeholder not init container test', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane placeholder={(<button>not loading</button>)} tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tabpane`).at(2).text()).toBe('not loading')
    })
})
describe('component: Tabs, <test prop:: value>', () => {
    it('SearchTabs value active', () => {
        let tabs = mount(
            <SearchTabs value="1">
                <SearchTabs.Item value="1">待提交(9)</SearchTabs.Item>
                <SearchTabs.Item value="2">审批中(12)</SearchTabs.Item>
                <SearchTabs.Item value="3">执行中(5)</SearchTabs.Item>
                <SearchTabs.Item value="4">已完成(123)</SearchTabs.Item>
                <SearchTabs.Item value="5">已删除(0)</SearchTabs.Item>
            </SearchTabs>
        );
        expect(tabs.find(`.${prefix}-search-tabs-item`).at(0).hasClass('active')).toEqual(true);
    })
    it('SearchTabs onChange callback test', () => {
        let value = '';
        let handleChange = (v) => {
            value = v;
        }
        let tabs = mount(
            <SearchTabs value="1" onChange={handleChange}>
                <SearchTabs.Item value="1">待提交(9)</SearchTabs.Item>
                <SearchTabs.Item value="2">审批中(12)</SearchTabs.Item>
                <SearchTabs.Item value="3">执行中(5)</SearchTabs.Item>
                <SearchTabs.Item value="4">已完成(123)</SearchTabs.Item>
                <SearchTabs.Item value="5">已删除(0)</SearchTabs.Item>
            </SearchTabs>
        );
        tabs.find(`.${prefix}-search-tabs-item`).at(2).simulate('click');
        expect(value).toEqual('3');
        tabs.setProps({value: '5'});
    })
    it('SearchTabs only children', () => {
        let tabs = mount(
            <SearchTabs value="1">
                <SearchTabs.Item value="1">待提交(9)</SearchTabs.Item>
            </SearchTabs>
        );
        expect(tabs.find(`.${prefix}-search-tabs-item`).at(0).hasClass('active')).toEqual(true);
    })
})
//新增fieldid测试
describe('component: Tabs, <test prop:: fieldid>', () => {
    it('[contains(@fieldid,"***-tabs-area-")]', () => {
        let wrapper = mount(<Tabs>
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2" fieldid="childTest">Content of Tab Pane 2</TabPane>
        </Tabs>);
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(0).props().fieldid).toBe(undefined);
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(1).props().fieldid).toBe("childTest");
        wrapper.setProps({fieldid:'test'});
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(0).props().fieldid).toBe("test-tabs-area-0");
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(1).props().fieldid).toBe("childTest");
    });
});
describe('component: Tabs, <test prop:: popMenu>', () => {
    it('component: Tabs, <test prop:: onPopMenuClick>', async () => {
        const popMenu = () => { // 自定义下拉项
            let items = [
                {key: "refresh", text: "刷新"},
                {key: "closecur", text: "关闭当前"},
                {key: "closeall", text: "关闭全部"},
                {key: "closeoth", text: "关闭其他"},
                {key: 'closeRight', text: '关闭右侧'}
            ]
            return items
        };
        const onPopMenuClick = jest.fn();
        let wrapper = mount(
            <Tabs type="card" popMenu={popMenu}  onPopMenuClick={onPopMenuClick} >
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
            </Tabs>, { attachTo: document.body }
        );
        expect(document.getElementsByClassName(`${prefix}-menu`).length).toBe(0)
        // document.getElementById('mytab').dispatchEvent(new MouseEvent('contextmenu'))
        fireEvent.contextMenu(screen.getByText('Tab 1'))
        expect(document.getElementsByClassName(`${prefix}-menu`).length).toBe(1)

        document.getElementsByClassName(`${prefix}-menu-item`)[0].dispatchEvent(new MouseEvent('click', { 'bubbles': true }))
        expect(onPopMenuClick).toHaveBeenCalledWith({"tabKey": "1", "type": "refresh"})
        wrapper.unmount();
    })
})
describe('component: Tabs, <test prop:: popMenu>', () => {
    it('component: Tabs, <test prop:: trigger>', async () => {
        const popMenu = () => { // 自定义下拉项
            let items = [
                {key: "refresh", text: "刷新"},
                {key: "closecur", text: "关闭当前"},
                {key: "closeall", text: "关闭全部"},
                {key: "closeoth", text: "关闭其他"},
                {key: 'closeRight', text: '关闭右侧'}
            ]
            return items
        };
        const onPopMenuClick = jest.fn();
        let wrapper = mount(
            <Tabs type="card" popMenu={popMenu}  onPopMenuClick={onPopMenuClick} trigger={['hover', 'click']}>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
            </Tabs>, { attachTo: document.body }
        );
        expect(document.getElementsByClassName(`${prefix}-menu`).length).toBe(0)
    })
})
describe('component: Tabs, <test prop:: popMenu>', () => {
    it('right only hover context menu', async () => {
        const popMenu = () => { // 自定义下拉项
            let items = [
                {key: "refresh", text: "刷新"},
                {key: "closecur", text: "关闭当前"},
                {key: "closeall", text: "关闭全部"},
                {key: "closeoth", text: "关闭其他"},
                {key: 'closeRight', text: '关闭右侧'}
            ]
            return items
        };
        const onPopMenuClick = jest.fn();
        const onPopMenu = jest.fn();
        let wrapper = mount(
            <Tabs type="line" popMenu={popMenu}  onPopMenuClick={onPopMenuClick} trigger={['hover']} onPopMenu={onPopMenu}>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
            </Tabs>, { attachTo: document.body }
        );
        expect(document.getElementsByClassName(`${prefix}-menu`).length).toBe(0)
        // document.getElementById('mytab').dispatchEvent(new MouseEvent('mouseEnter'))
        fireEvent.mouseEnter(screen.getByText('Tab 1'))
        await sleep(1000)
        expect(document.getElementsByClassName(`${prefix}-menu`).length).toBe(1)

        document.getElementsByClassName(`${prefix}-menu-item`)[0].dispatchEvent(new MouseEvent('click', { 'bubbles': true }))
        expect(onPopMenuClick).toHaveBeenCalledWith({"tabKey": "1", "type": "refresh"})
        // wrapper.unmount();
    })
})
describe('component: Tabs, <test prop:: moreType>', () => {
    it('moreType moreTabsArrow', async () => {
        let wrapper = mount(
            <Tabs moreType="moreTabsArrow">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-next`)).toBe(true)
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        // wrapper.debug()
        expect(wrapper.find('.wui-tabs-nav-container').hasClass('wui-tabs-nav-container-scrolling')).toEqual(false) // 应根据state内部的prev状态添加此类名
    })
    it('moreType moreTabsSelect', async () => {
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        const {Item} = Menu
        let menuArr = [
            <Item key='6'>Tab 6</Item>,
            <Item key='7'>Tab 7</Item>,
            <Item key='8'>Tab 8</Item>
        ]
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true, menuArr: menuArr })
        // wrapper.find(`Dropdown`).simulate('mouseEnter')
        // expect(wrapper.exists(`.${prefix}-dropdown-menu`)).toBe(true)
        // expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 1")
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        // expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 6")
        expect(wrapper.find('.wui-tabs-nav-container').hasClass('wui-tabs-nav-more')).toEqual(false) // 应根据state内部的prev状态添加此类名
    })
    it('moreType moreTabsSelect Extreme', async () => {
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        const {Item} = Menu
        let menuArr = [
            <Item key='6'>Tab 6</Item>,
            <Item key='7'>Tab 7</Item>,
            <Item key='8'>Tab 8</Item>
        ]
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true, menuArr: menuArr })
        new Array(50).map((item, index) => {
            wrapper.find(`.${prefix}-tabs-tab`).at(index).simulate('click');
        })
    })
})
describe('component: Tabs, <test prop:: onPrevClick>, <test prop:: onNextClick>, <test prop:: onTabScroll>', () => {
    it('onPrevClick onPrevClick onTabScroll callback', async () => {
        const onPrevClick = jest.fn()
        const onNextClick = jest.fn()
        const onTabScroll = jest.fn()
        let wrapper = mount(
            <div style={{width: '100px'}}>
            <Tabs
                moreType="moreTabsArrow"
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                onTabScroll={onTabScroll}
            >
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
            </div>
        );
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        // wrapper.find(`span.${prefix}-tabs-tab-next`).simulate('click')
        // expect(onNextClick).toHaveBeenCalled()
        // wrapper.find(`span.${prefix}-tabs-tab-prev`).simulate('click')
        // expect(onPrevClick).toHaveBeenCalled()
        // expect(onTabScroll.mock.calls.length).toBe(2)
        // expect(onTabScroll.mock.calls[0][0]).toEqual({ "direction": "right" });
        // expect(onTabScroll.mock.calls[1][0]).toEqual({ "direction": "left" });

        // wrapper.setProps({ tabBarPosition: 'left' })
        // wrapper.find(`span.${prefix}-tabs-tab-next`).simulate('click')
        // expect(onNextClick).toHaveBeenCalled()
        // wrapper.find(`span.${prefix}-tabs-tab-prev`).simulate('click')
        // expect(onPrevClick).toHaveBeenCalled()
        // expect(onTabScroll.mock.calls.length).toBe(4)
        // expect(onTabScroll.mock.calls[2][0]).toEqual({ "direction": "bottom" });
        // expect(onTabScroll.mock.calls[3][0]).toEqual({ "direction": "top" });
        // fireEvent.scroll(screen.querySelector('.wui-tabs-nav'))
        expect(wrapper.find('.wui-tabs-nav-container').hasClass('wui-tabs-nav-container-scrolling')).toEqual(false) // 应根据state内部的prev状态添加此类名
    })
})
describe('component: Tabs, <test prop:: extraContent>', () => {
    it('right click context menu', () => {
        let wrapper = mount(
            <Tabs extraContent={<span>my extraContent</span>}>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
            </Tabs>
        );
        expect(wrapper.find(`.${prefix}-tabs-bar span`).text()).toBe('my extraContent')
        wrapper.unmount()
    })
})
// attrsTest({
//     title: 'component: Tabs, <test prop:: tabBarClassName>',
//     Component: Tabs,
//     attrs: {
//         tabBarClassName: 'myclassname'
//     },
//     testAttr: {
//         tabBarClassName: null
//     },
//     selector: `.${prefix}-tabs-bar`,
//     classnames: [`myclassname`],
//     act: true
// })
describe('component: Tabs, <test prop:: tabBarClassName>', () => {
    it('tabBarClassName', () => {
        let wrapper = mount(
            <Tabs tabBarClassName='myclassname'>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
                <TabPane id='mytab' tab="Tab 2" key="2">测试页签</TabPane>
            </Tabs>
        );
        expect(wrapper.find(`.${prefix}-tabs-bar`).hasClass('myclassname')).toBe(true)
    })
})
// attrsTest({
//     title: 'component: Tabs, <test prop:: tabContentClassName>',
//     Component: Tabs,
//     attrs: {
//         tabContentClassName: 'myclassname'
//     },
//     testAttr: {
//         tabContentClassName: null
//     },
//     selector: `.${prefix}-tabs-content`,
//     classnames: [`myclassname`],
//     act: true
// })
describe('component: Tabs, <test prop:: tabContentClassName>', () => {
    it('tabContentClassName', () => {
        let wrapper = mount(
            <Tabs tabContentClassName='myclassname'>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
                <TabPane id='mytab' tab="Tab 2" key="2">测试页签</TabPane>
            </Tabs>
        );
        expect(wrapper.find(`.${prefix}-tabs-content`).hasClass('myclassname')).toBe(true)
    })
})
describe('component: Tabs, <test prop:: dragable>, <test prop:: onDrag>', () => {
    it('onDrag callback', () => {
        const mockEvent = jest.fn()
        let wrapper = mount(
            <Tabs dragable onDrag={mockEvent}>
                <TabPane id='mytab' tab="Tab 1" key="1">测试页签</TabPane>
                <TabPane id='mytab' tab="Tab 2" key="2">测试页签</TabPane>
            </Tabs>
        );
        wrapper.find(`.${prefix}-tabs-tab`).at(0).simulate('drag')
        expect(mockEvent).toHaveBeenCalled()
        // wrapper.find('TabBarTabsNode').instance().onDragEnd({})
    })
})
describe('component: Tabs, <test prop:: destroyInactiveTabPane>', () => {
    it('destroy Inactive TabPane', () => {
        const wrapper = mount(
            <Tabs defaultActiveKey='light' destroyInactiveTabPane={true}>
                <TabPane tab="Tab 1" key="light">Light</TabPane>
                <TabPane tab="Tab 1" key="test">Test</TabPane>
            </Tabs>
        );
        expect(wrapper.find(`.${prefix}-tabs-tabpane`).at(0).text()).toEqual('Light');
        expect(wrapper.find(`.${prefix}-tabs-tabpane`).at(1).text()).toEqual('');
        wrapper.find(`.${prefix}-tabs-tab`).at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-tabs-tabpane`).at(0).text()).toEqual('');
        expect(wrapper.find(`.${prefix}-tabs-tabpane`).at(1).text()).toEqual('Test');
    });
})
// function mockRect(element) {
//     const mock = jest.spyOn(element, 'offsetWidth');
//     mock.mockReturnValue(32);
// }
describe('component: Tabs, <test prop:: changeHeightorWidth>', () => {
    it('inkTabBarNode', async () => {
        const container = document.createElement('div');
        container.setAttribute('id', 'container');
        document.body.appendChild(container);
        const wrapper = mount(
            <Tabs defaultActiveKey='light' type="line" dragable={false}>
                <TabPane tab="Tab 1" key="light">Light</TabPane>
                <TabPane tab="Tab 2" key="test">Test</TabPane>
            </Tabs>, {attachTo: container}
        );
        // wrapper.find('ScrollableTabBarNode').instance().prevTransitionEnd({})
        // wrapper.find('ScrollableTabBarNode').setState({ next: true })
        // wrapper.find('ScrollableTabBarNode').instance().setNext(false)

        await sleep(1000)
        jest.spyOn(document.querySelectorAll('.wui-tabs-tab')[0], 'offsetWidth', 'get').mockImplementation(() => 32);
        
        // mockRect(document.getElementsByClassName('wui-tabs-tab-active'))
    });
})
describe('component: Tabs, <test prop:: keyCode>', () => {
    it('keyCode right', () => {
        let wrapper = mount(<Tabs defaultActiveKey="2">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>);
        wrapper.find('.wui-tabs-tab-active').at(0).simulate('click')
        // keyUp(KeyCode.RIGHT, true);//
        document.querySelector('.wui-tabs-tab').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.RIGHT , bubbles: true}))
        // wrapper.find('Tabs').at(0).instance().onNavKeyDown({})
            
    });
});
describe('component: Tabs, <test prop:: keyCode>', () => {
    it('keyCode left', () => {
        let wrapper = mount(<Tabs defaultActiveKey="2">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>);
        wrapper.find('.wui-tabs-tab-active').at(0).simulate('click')
        // keyUp(KeyCode.RIGHT, true);//
        document.querySelector('.wui-tabs-tab').dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': KeyCode.LEFT , bubbles: true}))
        // wrapper.find('Tabs').at(0).instance().onNavKeyDown({})
            
    });
});
describe('component: Tabs, <test prop:: addIcon>', () => {
    it('addIcon', () => {
        let wrapper = mount(<Tabs defaultActiveKey="2" activeKey="2" addIcon={<Icon type="uf-book" />} type="editable-card">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>);
        const content = wrapper.find(`.${prefix}-tabs i`).first();
        expect(content.hasClass('uf-book')).toEqual(true);
        // wrapper.find('Tabs').at(1).setState({activeKey: '1'})
        // wrapper.find('Tabs').at(1).instance().unbindContextMenuEvents()
    });
});
// describe('component: Tabs, <test prop:: setOffset>', () => {
//     it('ScrollableTabBarNode setOffset', () => {
//         let wrapper = mount(<Tabs defaultActiveKey="2">
//             <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
//             <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
//         </Tabs>);
//         wrapper.find('ScrollableTabBarNode').instance().offset = 10
//         wrapper.find('ScrollableTabBarNode').instance().setOffset(0, true)
//     });
// });
describe('component: Tabs, <test prop:: setOffset tabBarPosition>', () => {
    it('ScrollableTabBarNode setOffset tabBarPosition', () => {
        const onEdit = jest.fn();
        let wrapper = mount(<Tabs defaultActiveKey="2" tabBarPosition="left" type="editable-card" onEdit={onEdit}>
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>);
        // wrapper.find('ScrollableTabBarNode').instance().offset = 10
        // wrapper.find('ScrollableTabBarNode').instance().setOffset(0, true)
        // wrapper.find('ScrollableTabBarNode').instance().upDataItem()
        expect(wrapper.find(`.${prefix}-tabs`).hasClass(`${prefix}-tabs-left`)).toEqual(true)
    });
});
function mockRect(element) {
    const mock = jest.spyOn(element, 'getBoundingClientRect');
    mock.mockReturnValue({
        top: 0,
        bottom: 100,
        left: -10,
        right: 100,
        width: 100,
        height: 100,
        y: 0
    });
}
describe('component: Tabs, <test props:: nesting Tabs>', () => {
    it('Tabs nesting Tabs', () => {
        const onEdit = jest.fn();
        let wrapper = mount(<Tabs defaultActiveKey="2" tabBarPosition="left" type="editable-card" onEdit={onEdit}>
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">
                <Tabs moreType="moreTabsSelect">
                    {[...new Array(50)].map((item, index) => (
                        <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`} type="editable-card" activeKey="19">
                            {`Content of Tab Pane ${index + 1}`}
                        </TabPane>
                    ))}
                </Tabs>
            </TabPane>
        </Tabs>);
        wrapper.find(`.${prefix}-tabs-tab`).at(1).simulate('click');
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(1).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
        wrapper.find(`.${prefix}-tabs-tab`).at(3).simulate('click');
    });
});
describe('component: Tabs, <test props:: upDataItem >', () => {
    it('Tabs upDataItem ', () => {
        let wrapper = mount(<Tabs moreType="moreTabsSelect">
            {[...new Array(50)].map((item, index) => (
                <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`} type="editable-card">
                    {`Content of Tab Pane ${index + 1}`}
                </TabPane>
            ))}
        </Tabs>);
        wrapper.find(`.${prefix}-tabs-tab`).at(18).simulate('click');
        mockRect(document.querySelector('.wui-tabs-tab-active'))
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(18).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
        wrapper.find(`.${prefix}-tabs-tab`).at(0).simulate('click');
    });
});
describe('component: Tabs, <test props:: more Tabs>', () => {
    it('moreType moreTabsSelect close', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`} type="editable-card">
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>, {attachTo: container}
        );
        const {Item} = Menu
        let menuArr = [
            <Item key='6'>Tab 6</Item>,
            <Item key='7'>Tab 7</Item>,
            <Item key='8'>Tab 8</Item>
        ]
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true, menuArr: menuArr })
        // wrapper.find(`Dropdown`).simulate('mouseEnter')
        // expect(wrapper.exists(`.${prefix}-dropdown-menu`)).toBe(true)
        expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 1")
        // expect(wrapper.find(`.${prefix}-dropdown-menu li`).at(0).find('i')).toBe()
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).find('i').simulate('click')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        // expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 6")
        // await sleep(500)
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).find('.uf-close').simulate('click')
        // wrapper.find('ScrollableTabBarNode').instance().getTabsItemKey(14)
        // wrapper.find('ScrollableTabBarNode').instance().getTabsItemKey(0)
        // wrapper.find('ScrollableTabBarNode').instance().menuItemClickHandle('8', {preventDefault: () => {}, stopPropagation: () => {}})
        // mockRect(document.querySelector('.wui-tabs-bar'))
        document.querySelector('.wui-tabs-bar').dispatchEvent(new Event('resize'))
        // document.querySelector(`.${prefix}-tabs-tab-active`)
        const content = document.querySelector(`.${prefix}-tabs-tab-active`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(100);
        wrapper.update()
        // wrapper.find('Tabs').at(0).instance().isEditNum = 52
        wrapper.setProps({moreType: 'moreTabsSelect', children: [<TabPane tab='Tab 2' key="51">Content of Tab Pane 2</TabPane>, <TabPane tab='Tab 2' key="52">Content of Tab Pane 2</TabPane>]})
        // wrapper.find('Tabs').at(0).instance().isEditNum = 51
        await sleep(600)
        wrapper.setProps({moreType: 'moreTabsSelect', children: <TabPane tab='Tab 3' key="52">Content of Tab Pane 52</TabPane>})
        wrapper.setProps({moreType: 'moreTabsSelect', children: [<TabPane tab='Tab 2' key="51">Content of Tab Pane 2</TabPane>]})
        await sleep(600)
    })
})
describe('tabBarPosition and line', () => {
    it('InktabBarNode', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs defaultActiveKey="2" tabBarPosition="left">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>, {attachTo: container});
        const content = document.querySelector(`.${prefix}-tabs-tab-active`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(100);
        wrapper.update()
        await sleep(600)
    })
})
describe('tabBarPosition is top and line', () => {
    it('InktabBarNode tabBarPosition is top', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs defaultActiveKey="2">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>, {attachTo: container});
        const content = document.querySelector(`.${prefix}-tabs-tab-active`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(50);
        wrapper.update()
        await sleep(600)
    })
    it('InktabBarNode tabBarPosition is top activeTab max', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs defaultActiveKey="2">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>, {attachTo: container});
        const content = document.querySelector(`.${prefix}-tabs-tab-active`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(200);
        wrapper.update()
        await sleep(600)
    })
    it('tabBarPosition is top and trangle', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs defaultActiveKey="2" type="trangle">
            <TabPane tab='Tab 1' key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab='Tab 2' key="2">Content of Tab Pane 2</TabPane>
        </Tabs>, {attachTo: container});
        const content = document.querySelector(`.${prefix}-tabs-tab-active`);
        jest.spyOn(content, 'offsetWidth', 'get').mockReturnValue(200);
        wrapper.update()
        await sleep(600)
    })
})
describe('component: Tabs, <test prop:: items>', () => {
    it('test props items', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
        let items = [
            {
                key: '1',
                tab: `Tab 1`,
                children: `Content of Tab Pane 1`,
                // disabled: true
                fieldid: "children1-fieldid",
                id: "children1-id",
                style: {background: 'red'}
            },
            {
                key: '2',
                tab: `Tab 2`,
                children: `Content of Tab Pane 2`,
                placeholder: <div>懒加载内容</div>
            },
            {
                key: '3',
                tab: `Tab 3`,
                children: `Content of Tab Pane 3`,
                forceRender: true
            }
        ]
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs items={items}>
        </Tabs>, {attachTo: container});
        wrapper.find(`.${prefix}-tabs-tab`).at(1).simulate('click')
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(1).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
    })
    it('test editable-card items', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
        let items = [
            {
                key: '1',
                tab: `Tab 1`,
                children: `Content of Tab Pane 1`,
                // disabled: true
                fieldid: "children1-fieldid",
                id: "children1-id",
                style: {background: 'red'}
            },
            {
                key: '2',
                tab: `Tab 2`,
                children: `Content of Tab Pane 2`,
                placeholder: <div>懒加载内容</div>
            },
            {
                key: '3',
                tab: `Tab 3`,
                children: `Content of Tab Pane 3`,
                forceRender: true
            }
        ]
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs items={items} type="editable-card">
        </Tabs>, {attachTo: container});
        wrapper.find(`.${prefix}-tabs-tab`).at(1).simulate('click')
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(1).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
    })
})
describe('Tabs Test', () => {
    it('component: Tabs, <test prop:: animated>', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" tabBarStyle="simple" animated={true}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-content`).hasClass(`${prefix}-tabs-content-no-animated`)).toEqual(true)   
    });
    it('component: Tabs, <test prop:: tabIndex>', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" tabBarStyle="simple" tabIndex={'1'}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-content`).hasClass(`${prefix}-tabs-content-no-animated`)).toEqual(true)
        tabs.unmount();
    });
    it('component: Tabs, <test prop:: closable>', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" type="editable-card">
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" closable={false} key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tab`).at(1).find(`div`).hasClass(`${prefix}-tabs-tab-unclosable`)).toEqual(true)
    });
    it('component: Tabs, <test prop:: closeIcon>', () => {
        let tabs = mount(
            <Tabs defaultActiveKey="2" type="editable-card">
                <TabPane tab="Tab 1" key="1" closeIcon={<Icon type="uf-qq" />}>测试测试 1</TabPane>
                <TabPane tab="Tab 2" closable={false} key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-tab`).at(0).find(`.uf-qq`).length).toEqual(1)
    });
    it('component: Tabs, <test prop:: moreIcon>', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect" moreIcon={<Icon type="uf-qq" />} style={{width: '400px'}}>
                {[...new Array(20)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>, {attachTo: container}
        );
        // const {Item} = Menu
        // let menuArr = [
        //     <Item key='6'>Tab 6</Item>,
        //     <Item key='7'>Tab 7</Item>,
        //     <Item key='8'>Tab 8</Item>
        // ]
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true, menuArr: menuArr })
        // screen.debug()
        document.querySelector('.wui-tabs-bar').dispatchEvent(new Event('resize'))
        mockRect(document.querySelector(`.${prefix}-tabs-bar`))
        await sleep(2000)
        // expect(wrapper.find(`.${prefix}-tabs-tab-more-select .uf-qq`).length).toBe(0) // 多页签场景根据容器宽度自动计算显示下拉图标，@testing-library不能模拟此场景
        // expect(wrapper.find(`.${prefix}-tabs-tab-more-select .uf-qq`).length).toBe(1)
    })
    it('component: Tabs, <test prop:: scrollAnimated>', async () => {
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect" scrollAnimated={true}>
                {[...new Array(500)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        // const {Item} = Menu
        // let menuArr = [
        //     <Item key='6'>Tab 6</Item>,
        //     <Item key='7'>Tab 7</Item>,
        //     <Item key='8'>Tab 8</Item>
        // ]
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true, menuArr: menuArr })
        // wrapper.find(`Dropdown`).simulate('mouseEnter')
        // wrapper.find(`.wui-tabs-tab-more-select`).simulate('mouseEnter')
        // expect(wrapper.exists(`.${prefix}-dropdown-menu`)).toBe(true)
        // expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 1")
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        // expect(wrapper.find(`.${prefix}-tabs-tab-active`).at(0).text()).toBe("Tab 6")
        expect(wrapper.find(`.${prefix}-tabs-nav`).hasClass(`${prefix}-tabs-nav-animated`)).toBe(true)
    })
    it('component: Tabs, <test prop:: inkBarAnimated>', function() {
        let tabs = mount(
            <Tabs type="line" defaultActiveKey="2" inkBarAnimated={true}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs-ink-bar`).hasClass(`${prefix}-tabs-ink-bar-animated`)).toEqual(true)
    })
    it('component: Tabs, <test prop:: centered>', function() {
        let tabs = mount(
            <Tabs type="line" defaultActiveKey="2" centered={true}>
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
            </Tabs>
        );
        expect(tabs.find(`.${prefix}-tabs`).hasClass(`${prefix}-tabs-centered`)).toEqual(true)
    })
    it('component: Tabs, <test:: moreTabsSelect tabs>', async () => {
        let tabsNode = 
            <Tabs style={{width: '750px'}} moreType="moreTabsArrow" type="editable-card" defaultActiveKey='28'>
                {/* {[...new Array(25)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))} */}
                <TabPane tab="Tab 1" key="1">测试测试 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">测试测试 3</TabPane>
                <TabPane tab="Tab 4" key="4">测试测试 4</TabPane>
                <TabPane tab="Tab 5" key="5">测试测试 5</TabPane>
                <TabPane tab="Tab 6" key="6">Content of Tab Pane 6</TabPane>
                <TabPane tab="Tab 7" key="7">测试测试 7</TabPane>
                <TabPane tab="Tab 8" key="8">测试测试 8</TabPane>
                <TabPane tab="Tab 9" key="9">测试测试 9</TabPane>
                <TabPane tab="Tab 10" key="10">Content of Tab Pane 10</TabPane>
                <TabPane tab="Tab 11" key="11">测试测试 11</TabPane>
                <TabPane tab="Tab 12" key="12">测试测试 12</TabPane>
                <TabPane tab="Tab 13" key="13">测试测试 13</TabPane>
                <TabPane tab="Tab 14" key="14">Content of Tab Pane 14</TabPane>
                <TabPane tab="Tab 15" key="15">测试测试 15</TabPane>
                <TabPane tab="Tab 16" key="16">测试测试 16</TabPane>
                <TabPane tab="Tab 17" key="17">测试测试 17</TabPane>
                <TabPane tab="Tab 18" key="18">Content of Tab Pane 18</TabPane>
                <TabPane tab="Tab 19" key="19">测试测试 19</TabPane>
                <TabPane tab="Tab 20" key="20">测试测试 20</TabPane>
                <TabPane tab="Tab 21" key="21">测试测试 21</TabPane>
                <TabPane tab="Tab 22" key="22">Content of Tab Pane 22</TabPane>
                <TabPane tab="Tab 23" key="23">测试测试 23</TabPane>
                <TabPane tab="Tab 24" key="24">测试测试 24</TabPane>
                <TabPane tab="Tab 25" key="25">测试测试 25</TabPane>
                <TabPane tab="Tab 26" key="26">Content of Tab Pane 26</TabPane>
                <TabPane tab="Tab 27" key="27">测试测试 27</TabPane>
                <TabPane tab="Tab 28" key="28">测试测试 28</TabPane>
                <TabPane tab="Tab 29" key="29">测试测试 29</TabPane>
                <TabPane tab="Tab 30" key="30">Content of Tab Pane 30</TabPane>
                <TabPane tab="Tab 31" key="31">测试测试 31</TabPane>
                <TabPane tab="Tab 32" key="32">测试测试 32</TabPane>
            </Tabs>;
        let {container, rerender} = render(tabsNode)
        await sleep(1000)
        // let moreContainer = container.querySelector('.uf-3dot-h')
        // // expect(scrollContainer).toEqual(true)
        // fireEvent.mouseEnter(moreContainer)
        // await sleep(1000)
        // fireEvent.mouseEnter(screen.getAllByRole('menuitem')[4])
        fireEvent.click(container.querySelector('.uf-plus'))
        fireEvent.click(container.querySelector('.uf-plus'))
        fireEvent.click(container.querySelector('.uf-plus'))
        await sleep(1000)
        fireEvent.click(container.querySelectorAll('.uf-close')[31])
        fireEvent.click(container.querySelectorAll('.uf-close')[30])
    })
    class DemoTabs extends Component {
        render () {
            return (
                <Tabs {...this.props}>
                </Tabs>
            )
        }
    }
    it('component: Tabs, <test:: state change>', async () => {
        let items1 = [
            {
                key: '1',
                tab: `Tab 1`,
                children: `Content of Tab Pane 1`,
                // disabled: true
                fieldid: "children1-fieldid",
                id: "children1-id",
                style: {background: 'red'}
            },
            {
                key: '2',
                tab: `Tab 2`,
                children: `Content of Tab Pane 2`,
                placeholder: <div>懒加载内容</div>
            },
            {
                key: '3',
                tab: `Tab 3`,
                children: `Content of Tab Pane 3`,
                forceRender: true
            }
        ]
        let items2 = [
            {
                key: '1',
                tab: `Tab 1`,
                children: `Content of Tab Pane 1`,
                // disabled: true
                fieldid: "children1-fieldid",
                id: "children1-id",
                style: {background: 'red'}
            },
            {
                key: '2',
                tab: `Tab 2`,
                children: `Content of Tab Pane 2`,
                placeholder: <div>懒加载内容</div>
            },
            {
                key: '3',
                tab: `Tab 3`,
                children: `Content of Tab Pane 3`,
                forceRender: true
            },
            {
                key: '4',
                tab: `Tab 4`,
                children: `Content of Tab Pane 4`,
                forceRender: true
            }
        ]
        let {container, rerender} = render(<DemoTabs style={{width: '750px'}} moreType="moreTabsArrow" tabPosition='top' items={items1}></DemoTabs>)
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[2])
        rerender(<DemoTabs style={{width: '750px'}} moreType="moreTabsArrow"  tabPosition='left' items={items2}></DemoTabs>)
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[3])
        // expect(screen.getAllByRole('tab')[5]).toHaveClass('.wui-tabs-tab-active')
        rerender(<DemoTabs style={{width: '750px'}} moreType="moreTabsArrow"  tabPosition='left' items={items1}></DemoTabs>)
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[2])
        // expect(screen.getAllByRole('tab')[4]).toHaveClass('.wui-tabs-tab-active')
    })
    it('component: Tabs, <test:: state change more tabs>', async () => {
        let items1 = [];
        [...new Array(23)].forEach((item, index) => {
            items1.push({
                key: index,
                tab: 'Tab' + index,
                children: 'Content of Tab Pane' + index
            })
        })
        let items2 = [];
        [...new Array(24)].forEach((item, index) => {
            items2.push({
                key: index,
                tab: 'Tab' + index,
                children: 'Content of Tab Pane' + index
            })
        })
        let {container, rerender} = render(<DemoTabs style={{width: '750px'}} moreType="moreTabsArrow" tabPosition='top' items={items1}></DemoTabs>)
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[2])
        rerender(<DemoTabs style={{width: '600px'}} moreType="moreTabsArrow"  tabPosition='left' items={items2}></DemoTabs>)
        fireEvent.scroll(container.querySelector('.wui-tabs-nav'), {target: {scrollX: 300}})
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[3])
        // expect(screen.getAllByRole('tab')[5]).toHaveClass('.wui-tabs-tab-active')
        rerender(<DemoTabs style={{width: '750px'}} moreType="moreTabsArrow"  tabPosition='left' items={items1}></DemoTabs>)
        await sleep(1000)
        fireEvent.click(screen.getAllByRole('tab')[2])
        // expect(screen.getAllByRole('tab')[4]).toHaveClass('.wui-tabs-tab-active')
    })
    it('component: Tabs, <test prop:: more other>', async () => {
        const container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        let wrapper = mount(
            <Tabs style={{width: '750px'}} moreType="moreTabsSelect">
                {[...new Array(32)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        // const {Item} = Menu
        // let menuArr = [
        //     <Item key='6'>Tab 6</Item>,
        //     <Item key='7'>Tab 7</Item>,
        //     <Item key='8'>Tab 8</Item>
        // ]
        const box = document.querySelector(`.wui-tabs-nav-container`);
        const box2 = document.querySelector(`.wui-tabs-nav>div:first-child`);
        // jest.spyOn(box, 'getBoundingClientRect').mockReturnValue({width: 600, height: 35});
        wrapper.find(`.${prefix}-tabs-tab`).at(4).simulate('click')
        jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        jest.spyOn(box2, 'offsetWidth', 'get').mockReturnValue(100)
        wrapper.find(`.${prefix}-tabs-tab`).at(6).simulate('click')
        await sleep(1000);
    })
    it('moreType moreTabsArrow', async () => {
        let methodCopy = ScrollableTabBarNode.prototype.componentDidMount;
        ScrollableTabBarNode.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ prev: true, next: true })
            return result;
        };
        let wrapper = mount(
            <Tabs moreType="moreTabsArrow">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        expect(wrapper.exists(`span.${prefix}-tabs-tab-next`)).toBe(true)
        expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        // wrapper.exists(`span.${prefix}-tabs-tab-next`).simulate('click')
        wrapper.find(`span.${prefix}-tabs-tab-next`).simulate('click')
        await sleep(1000)
        // wrapper.exists(`span.${prefix}-tabs-tab-prev`).simulate('click')
        wrapper.find(`span.${prefix}-tabs-tab-prev`).simulate('click')
        // wrapper.debug()
        ScrollableTabBarNode.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('moreType moreTabsArrow prev', async () => {
        let methodCopy = ScrollableTabBarNode.prototype.componentDidMount;
        ScrollableTabBarNode.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ prev: true, next: true })
            return result;
        };
        let wrapper = mount(
            <Tabs moreType="moreTabsArrow">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        expect(wrapper.exists(`span.${prefix}-tabs-tab-next`)).toBe(true)
        expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        // wrapper.exists(`span.${prefix}-tabs-tab-next`).simulate('click')
        // wrapper.find(`span.${prefix}-tabs-tab-next`).simulate('click')
        // await sleep(1000)
        // wrapper.exists(`span.${prefix}-tabs-tab-prev`).simulate('click')
        wrapper.find(`span.${prefix}-tabs-tab-prev`).simulate('click')
        await sleep(1000)
        // wrapper.debug()
        ScrollableTabBarNode.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('moreType moreTabsSelect', async () => {
        let methodCopy = ScrollableTabBarNode.prototype.componentDidMount;
        const {Item} = Menu
        let menuArr = [
            <Item key='6'>Tab 6</Item>,
            <Item key='7'>Tab 7</Item>,
            <Item key='8'>Tab 8</Item>
        ]
        ScrollableTabBarNode.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ prev: true, next: true, menuArr })
            this.offset = 200;
            return result;
        };
        const container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect">
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        const box = document.querySelector(`.wui-tabs-nav-container`);
        wrapper.find(`.${prefix}-tabs-tab`).at(4).simulate('click')
        jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        expect(wrapper.exists(`span.${prefix}-tabs-tab-more-select`)).toBe(true)
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        wrapper.find(`span.${prefix}-tabs-tab-more-select`).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        wrapper.find(`span.${prefix}-tabs-tab-more-select`).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(1).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(1).find('.uf-close').simulate('click')
        ScrollableTabBarNode.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('moreType moreTabsSelect tabBarPosition left or right', async () => {
        let methodCopy = ScrollableTabBarNode.prototype.componentDidMount;
        const {Item} = Menu
        let menuArr = [
            <Item key='6'>Tab 6</Item>,
            <Item key='7'>Tab 7</Item>,
            <Item key='8'>Tab 8</Item>
        ]
        ScrollableTabBarNode.prototype.componentDidMount = function (...methodArgs) {
            const result = methodCopy.bind(this)(...methodArgs);
            this.setState({ prev: true, next: true, menuArr })
            this.offset = 200;
            return result;
        };
        const container = document.createElement('div');
        document.body.innerHTML = '';
        document.body.appendChild(container);
        let wrapper = mount(
            <Tabs moreType="moreTabsSelect" tabPosition='left'>
                {[...new Array(50)].map((item, index) => (
                    <TabPane tab={`Tab ${index + 1}`} key={`${index + 1}`}>
                        {`Content of Tab Pane ${index + 1}`}
                    </TabPane>
                ))}
            </Tabs>
        );
        const box = document.querySelector(`.wui-tabs-nav-container`);
        wrapper.find(`.${prefix}-tabs-tab`).at(4).simulate('click')
        jest.spyOn(box, 'offsetWidth', 'get').mockReturnValue(200)
        // 此场景（多页签左右箭头）和多页签下拉同理，根据容器宽度计算超出显示，但是在@testing-library框架模拟不出来此场景
        // wrapper.find('ScrollableTabBarNode').setState({ prev: true, next: true })
        expect(wrapper.exists(`span.${prefix}-tabs-tab-more-select`)).toBe(true)
        // expect(wrapper.exists(`span.${prefix}-tabs-tab-prev`)).toBe(true)
        wrapper.find(`span.${prefix}-tabs-tab-more-select`).simulate('mouseEnter')
        // wrapper.find(`.${prefix}-dropdown-menu li`).at(0).simulate('click')
        ScrollableTabBarNode.prototype.componentDidMount = methodCopy; // 恢复方法原本的实现
    })
    it('test props items and dragable', async () => {
        document.body.innerHTML = ''
        const container = document.createElement('div');
        document.body.appendChild(container);
        let items = [
            {
                key: '1',
                tab: `Tab 1`,
                children: `Content of Tab Pane 1`,
                // disabled: true
                fieldid: "children1-fieldid",
                id: "children1-id",
                style: {background: 'red'}
            },
            {
                key: '2',
                tab: `Tab 2`,
                children: `Content of Tab Pane 2`,
                placeholder: <div>懒加载内容</div>
            },
            {
                key: '3',
                tab: `Tab 3`,
                children: `Content of Tab Pane 3`,
                forceRender: true
            }
        ]
//         mount(<Component/>, {attachTo: container})
        let wrapper = mount(<Tabs dragable items={items}>
        </Tabs>, {attachTo: container});
        wrapper.find(`.${prefix}-tabs-tab`).at(0).simulate('click')
        expect(wrapper.find(`.${prefix}-tabs-tab`).at(0).hasClass(`${prefix}-tabs-tab-active`)).toEqual(true);
    })
})
