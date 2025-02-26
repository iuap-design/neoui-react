/** TabBar.tsx */
import React from 'react'
import { screen, fireEvent } from '@testing-library/react';
import { mount } from '@tests/mount'
import { TabBar, Icon, Badge } from '@tinper/m';
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import { muiPrefix } from '@utils/UpdatePrefixs'

const prefixTabBar = `${muiPrefix}-tab-bar`;

const tabs2 = [
  {
    key: 'home',
    title: '标签文字过长超出宽度需要展示...',
    icon: <Icon fieldid="icon_2" type="archard-drive"/>
    ,
    badge: Badge.dot,
  },
  {
    key: 'resource',
    title: '资料',
    icon: <Icon fieldid="icon_2" type="arcbook-open"/>
    ,
    badge: '5',
  },
  {
    key: 'message',
    title: '消息',
    icon: (active: boolean) =>
      active ? <Icon fieldid="icon_2" type="arcmessage-circle-Fill"/>
        : <Icon fieldid="icon_2" type="arcmessage-circle"/>
    ,
    badge: '99+',
  },
  {
    key: 'personalCenter',
    title: '我的',
    icon: <Icon fieldid="icon_2" type="arcperson"/>,
    active: true
  },
];
const tabsCol4 = [
  {
    key: 'home',
    title: '工作台',
    icon: <Icon fieldid="icon_2" type="archard-drive"/>
  },
  {
    key: 'resource',
    title: '资料',
    icon: <Icon fieldid="icon_2" type="arcbook-open"/>
  },
  {
    key: 'message',
    title: '消息',
    icon: (active: boolean) =>
      active ? <Icon fieldid="icon_2" type="arcmessage-circle-Fill"/>
        : <Icon fieldid="icon_2" type="arcmessage-circle"/>
  },
  {
    key: 'personalCenter',
    title: '我的',
    icon: <Icon fieldid="icon_2" type="arcperson"/>,
  },
];

describe('TabBar Component', () => {
  it('render, <test prop:: fieldid>', () => {
    const fieldid = 'TabBar_test'
    const wrapper = mount(
      <TabBar fieldid={fieldid}>
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>)
    const element = wrapper.find(`[fieldid="${fieldid}"]`);
    expect(element.getDOMNode()).toBeInTheDocument();
  });

  it('style test, <test prop:: style>', () => {
    const wrapper = mount(
      <TabBar style={{display: 'flex'}}>
      {tabs2.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
      ))}
    </TabBar>);
    expect(wrapper.find(`.${prefixTabBar}`).props().style.display).toBe('flex');
  })

  it('clsPrefix test, <test prop:: clsPrefix>', () => {
    const clsPrefix = 'testClassPre';
    const wrapper = mount(
      <TabBar clsPrefix={clsPrefix}>
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    expect(wrapper.find('.testClassPre-tab-bar').getDOMNode()).toBeInTheDocument();
  })

  it('className test, <test prop:: className>', () => {
    const className = 'test-classname';
    const wrapper = mount(
      <TabBar className={className}>
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    expect(wrapper.find(`.${prefixTabBar}`).hasClass('test-classname')).toBeTruthy();
  })

  it('activeKey test, <test prop:: activeKey>', () => {
    const wrapper = mount(
      <TabBar activeKey="resource">
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    const tab = wrapper.find(`.${prefixTabBar}-item-active`);
    expect(tab.find(`.${prefixTabBar}-item-title`).text()).toBe('资料');
  })

  it('defaultActiveKey test, <test prop:: defaultActiveKey>', () => {
    const wrapper = mount(
      <TabBar  defaultActiveKey="resource">
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    const tab = wrapper.find(`.${prefixTabBar}-item-active`);
    expect(tab.find(`.${prefixTabBar}-item-title`).text()).toBe('资料');
  })

  it('children test, <test prop:: children>', () => {
    const wrapper = mount(
      <TabBar  defaultActiveKey="resource">
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    const tab = wrapper.find(`.${prefixTabBar}-item`);
    expect(tab.length).toBe(4);
  })

  it('itemList test, <test prop:: itemList>', () => {
    const wrapper = mount(
      <TabBar itemList={tabsCol4}>
      </TabBar>
    );
    const tab = wrapper.find(`.${prefixTabBar}-item`);
    expect(tab.length).toBe(4);
  })

  it('safeArea test, <test prop:: safeArea>', () => {
    const wrapper = mount(
      <TabBar safeArea itemList={tabsCol4}>
      </TabBar>
    );

    const area = wrapper.find(`.mui-safe-area`);
    expect(area.getDOMNode()).toBeInTheDocument();
  })

  it('onChange test, <test prop:: onChange>', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <TabBar defaultActiveKey="resource" onChange={onChange}>
        {tabs2.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
        ))}
      </TabBar>
    );
    const tab = wrapper.find(`.${prefixTabBar}-item`).last();
    tab.simulate('click');
    expect(onChange).toHaveBeenCalled();
  })
})
