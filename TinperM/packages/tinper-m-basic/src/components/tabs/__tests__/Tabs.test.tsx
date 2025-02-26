/** Tabs.tsx */
import React from 'react'
import { mount } from '@tests/mount'
import { Tabs } from '@tinper/m'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixTabs = `${muiPrefix}-tabs`;

describe('Tabs test', () => {
    let wrapper;
    it('className test, <test prop:: className>', () => {
        wrapper = mount(
            <Tabs className="class-test">
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).hasClass('class-test')).toEqual(true);
    });
    it('fieldid test, <test prop:: fieldid>', () => {
        const fieldid = "fieldid-test";
        wrapper = mount(
            <Tabs fieldid={fieldid}>
                <Tabs.Tab title="tab1" key="0">content</Tabs.Tab>
                <Tabs.Tab title="tab2" key="1">content1</Tabs.Tab>
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).prop("fieldid")).toEqual(`${fieldid}_tabs`);
        expect(wrapper.find(`.${prefixTabs}-header`).prop("fieldid")).toEqual(`${fieldid}_tabs_header`);
        expect(wrapper.find(`.${prefixTabs}-header-mask-left`).prop("fieldid")).toEqual(`${fieldid}_tabs_header_mask_left`);
        expect(wrapper.find(`.${prefixTabs}-header-mask-right`).prop("fieldid")).toEqual(`${fieldid}_tabs_header_mask_right`);
        expect(wrapper.find(`.${prefixTabs}-tab-list`).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_list`);
        expect(wrapper.find(`.${prefixTabs}-tab-line`).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_line`);
        expect(wrapper.find(`.${prefixTabs}-tab-wrapper`).at(0).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_wrapper_0`);
        expect(wrapper.find(`.${prefixTabs}-tab-wrapper`).at(1).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_wrapper_1`);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_0`);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).prop("fieldid")).toEqual(`${fieldid}_tabs_tab_1`);
        expect(wrapper.find(`.${prefixTabs}-content`).prop("fieldid")).toEqual(`${fieldid}_tabs_content_0`);
    })
    it('should have correct class, <test prop:: clsPrefix>', () => {
        const clsPrefix = 'clsPrefix'
        wrapper = mount(
            <Tabs clsPrefix={clsPrefix}>
                <Tabs.Tab title="tab1" key="0">content</Tabs.Tab>
                <Tabs.Tab title="tab2" key="1">content1</Tabs.Tab>
            </Tabs>
        );
        wrapper.setProps({ clsPrefix: clsPrefix })
        expect(wrapper.exists(`.${prefixTabs}`)).toEqual(false);
        expect(wrapper.exists(`.${prefixTabs}-header-mask-left`)).toEqual(false);
        expect(wrapper.exists(`.${prefixTabs}-tab-list`)).toEqual(false);
        expect(wrapper.exists(`.${prefixTabs}-tab`)).toEqual(false);
        expect(wrapper.exists(`.${prefixTabs}-content`)).toEqual(false);

        expect(wrapper.exists(`.${clsPrefix}-tabs`)).toEqual(true);
        expect(wrapper.exists(`.${clsPrefix}-tabs-header-mask-left`)).toEqual(true);
        expect(wrapper.exists(`.${clsPrefix}-tabs-tab-list`)).toEqual(true);
        expect(wrapper.exists(`.${clsPrefix}-tabs-tab`)).toEqual(true);
        expect(wrapper.exists(`.${clsPrefix}-tabs-content`)).toEqual(true);
    });
    it('decoration test, <test prop:: decoration>', () => {
        wrapper = mount(
            <Tabs>
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}-tab-line`).hasClass(`${prefixTabs}-tab-line-dot`)).toEqual(false);

        wrapper.setProps({ decoration: 'dotLine' });
        expect(wrapper.find(`.${prefixTabs}-tab-line`).hasClass(`${prefixTabs}-tab-line-dot`)).toEqual(true);
    });
    it('stretch test, <test prop:: stretch>', () => {
        wrapper = mount(
            <Tabs>
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}-tab-wrapper`).hasClass(`${prefixTabs}-tab-wrapper-stretch`)).toEqual(false);

        wrapper.setProps({ stretch: true });
        expect(wrapper.find(`.${prefixTabs}-tab-wrapper`).hasClass(`${prefixTabs}-tab-wrapper-stretch`)).toEqual(true);
    });
    it('activeLineMode test, <test prop:: activeLineMode>', () => {
        wrapper = mount(
            <Tabs>
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}-tab-line`).hasClass(`${prefixTabs}-tab-line-fixed`)).toEqual(true);
        wrapper.setProps({ activeLineMode: 'auto' });
        expect(wrapper.find(`.${prefixTabs}-tab-line`).hasClass(`${prefixTabs}-tab-line-auto`)).toEqual(true);
        wrapper.setProps({ activeLineMode: 'full' });
        expect(wrapper.find(`.${prefixTabs}-tab-line`).hasClass(`${prefixTabs}-tab-line-full`)).toEqual(true);
    });
    it('renderTabBar test, <test prop:: renderTabBar>', () => {
        wrapper = mount(
            <Tabs>
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.exists(`.${prefixTabs}-header`)).toEqual(true);

        const renderHeader = (h) => { return <div className='rendertabbar-test'>{h}</div> }
        wrapper = mount(
            <Tabs renderTabBar={(h) => renderHeader(h)}>
                <Tabs.Tab title="tab1" key="0" />
            </Tabs>
        );
        expect(wrapper.find('.rendertabbar-test').exists(`.${prefixTabs}-header`)).toEqual(true);
    });
    it('activeKey && defaultActiveKey test, <test prop:: activeKey>, <test prop:: defaultActiveKey>', () => {
        wrapper = mount(
            <Tabs defaultActiveKey="1">
                <Tabs.Tab title="tab0" key="0" />
                <Tabs.Tab title="tab1" key="1" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).hasClass(`${prefixTabs}-tab-active`)).toEqual(false);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).hasClass(`${prefixTabs}-tab-active`)).toEqual(true);

        wrapper.setProps({ activeKey: '0' });
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).hasClass(`${prefixTabs}-tab-active`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).hasClass(`${prefixTabs}-tab-active`)).toEqual(false);
    });
    it('children test, <test prop:: children>', () => {
        wrapper = mount(
            <Tabs children={[<Tabs.Tab title="tab0" key="0" />, <Tabs.Tab title="tab1" key="1" />]}/>
        );
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).instance().innerHTML).toEqual("tab0");
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).instance().innerHTML).toEqual("tab1");
    });
    it('prerenderingSiblingsNumber test, <test prop:: prerenderingSiblingsNumber>', () => {
        wrapper = mount(
            <Tabs defaultActiveKey="1">
                <Tabs.Tab title="tab0" key="0"><div className="tabs-content-demo">内容区0</div></Tabs.Tab>
                <Tabs.Tab title="tab1" key="1"><div className="tabs-content-demo">内容区1</div></Tabs.Tab>
                <Tabs.Tab title="tab2" key="2"><div className="tabs-content-demo">内容区2</div></Tabs.Tab>
                <Tabs.Tab title="tab3" key="3"><div className="tabs-content-demo">内容区3</div></Tabs.Tab>
                <Tabs.Tab title="tab4" key="4"><div className="tabs-content-demo">内容区4</div></Tabs.Tab>
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).find('.tabs-content-demo').length).toEqual(3);

        wrapper = mount(
            <Tabs defaultActiveKey="1" prerenderingSiblingsNumber={2}>
                <Tabs.Tab title="tab0" key="0"><div className="tabs-content-demo">内容区0</div></Tabs.Tab>
                <Tabs.Tab title="tab1" key="1"><div className="tabs-content-demo">内容区1</div></Tabs.Tab>
                <Tabs.Tab title="tab2" key="2"><div className="tabs-content-demo">内容区2</div></Tabs.Tab>
                <Tabs.Tab title="tab3" key="3"><div className="tabs-content-demo">内容区3</div></Tabs.Tab>
                <Tabs.Tab title="tab4" key="4"><div className="tabs-content-demo">内容区4</div></Tabs.Tab>
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).find('.tabs-content-demo').length).toEqual(4);
    });
    it('tabBarPosition test, <test prop:: tabBarPosition>', () => {
        wrapper = mount(
            <Tabs defaultActiveKey="1">
                <Tabs.Tab title="tab0" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-h`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-top`)).toEqual(true);

        wrapper = mount(
            <Tabs defaultActiveKey="1" tabBarPosition='bottom'>
                <Tabs.Tab title="tab0" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-h`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-bottom`)).toEqual(true);

        wrapper = mount(
            <Tabs defaultActiveKey="1" tabBarPosition='left'>
                <Tabs.Tab title="tab0" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-v`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-left`)).toEqual(true);

        wrapper = mount(
            <Tabs defaultActiveKey="1" tabBarPosition='right'>
                <Tabs.Tab title="tab0" key="0" />
            </Tabs>
        );
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-v`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}`).hasClass(`${prefixTabs}-tabbar-position-right`)).toEqual(true);
    });
});

describe('Tabs function test', () => {
    let wrapper;
    it('onChange test, <test prop:: onChange>', () => {
        const onChange = jest.fn();
        wrapper = mount(
            <Tabs className="class-test" onChange={onChange}>
                <Tabs.Tab title="tab0" key="0" />
                <Tabs.Tab title="tab1" key="1" />
            </Tabs>
        );
        expect(onChange).toHaveBeenCalledTimes(0);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).hasClass(`${prefixTabs}-tab-active`)).toEqual(true);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).hasClass(`${prefixTabs}-tab-active`)).toEqual(false);

        wrapper.find(`.${prefixTabs}-tab`).at(1).simulate('click');
        expect(wrapper.find(`.${prefixTabs}-tab`).at(0).hasClass(`${prefixTabs}-tab-active`)).toEqual(false);
        expect(wrapper.find(`.${prefixTabs}-tab`).at(1).hasClass(`${prefixTabs}-tab-active`)).toEqual(true);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toBe('1');
    });
    it('onTabClick test, <test prop:: onTabClick>', () => {
        const onTabClick = jest.fn();
        wrapper = mount(
            <Tabs className="class-test" onTabClick={onTabClick}>
                <Tabs.Tab title="tab0" key="0" />
                <Tabs.Tab title="tab1" key="1" />
            </Tabs>
        );
        expect(onTabClick).toHaveBeenCalledTimes(0);
        wrapper.find(`.${prefixTabs}-tab`).at(1).simulate('click');
        expect(onTabClick).toHaveBeenCalledTimes(1);
        expect(onTabClick.mock.calls[0][0]).toBe('1');
    });
});
