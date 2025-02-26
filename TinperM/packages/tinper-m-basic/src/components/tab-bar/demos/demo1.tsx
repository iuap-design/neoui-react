/**
 * @title 基础用法
 * @description 基础用法
 */

import React, { useState } from 'react'
import { Checkbox, Icon, TabBar, Badge } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo1.less'

export default () => {
  const tabs = [
    {
      key: 'home',
      title: '工作台',
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
      icon: <Icon fieldid="icon_2" type="arcmessage-circle"/>,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
      active: true
    },
  ]
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
      icon: <Icon fieldid="icon_2" type="arcmessage-circle"/>,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
      active: true
    },
  ]
  const tabsCol2 = [
    {
      key: 'home',
      title: '工作台',
      icon: <Icon fieldid="icon_2" type="archard-drive"/>
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
    },
  ]
  const tabsCol3 = [
    {
      key: 'home',
      title: '工作台',
      icon: <Icon fieldid="icon_2" type="archard-drive"/>
    },
    {
      key: 'message',
      title: '消息',
      icon: <Icon fieldid="icon_2" type="arcmessage-circle"/>
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
    },
  ]
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
      icon: <Icon fieldid="icon_2" type="arcmessage-circle"/>
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
    },
  ]
  const tabsCol5 = [
    {
      key: 'home',
      title: '工作台',
      icon: <Icon fieldid="icon_2" type="archard-drive"/>
    },
    {
      key: 'todo',
      title: '待办',
      icon: <Icon fieldid="icon_2" type="arclist"/>
    },
    {
      key: 'resource',
      title: '资料',
      icon: <Icon fieldid="icon_2" type="arcbook-open"/>
    },
    {
      key: 'message',
      title: '消息',
      icon: <Icon fieldid="icon_2" type="arcmessage-circle"/>
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <Icon fieldid="icon_2" type="arcperson"/>,
    },
  ]


  const [activeKey, setActiveKey] = useState('home')

  return (
      <div className='tabbar-demos'>
        <div className="title">基础用法</div>
        <div className="item">
          <TabBar>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">徽标</div>
        <div className="item">
          <TabBar>
            {tabs.map(item => (
              <TabBar.Item
                key={item.key}
                icon={item.icon}
                title={item.title}
                badge={item.badge}
              />
            ))}
          </TabBar>
        </div>

        <div className="title">仅图标</div>
        <div className="item">
          <TabBar>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon}/>
            ))}
          </TabBar>
        </div>

        <div className="title">仅标题</div>
        <div className="item">
          <TabBar style={{ fontSize: '0.28rem' }}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">文字超出</div>
        <div className="item">
          <TabBar>
            {tabs2.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">列数扩展</div>
        <div className="item">
          <TabBar>
            {tabsCol2.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="item">
          <TabBar>
            {tabsCol3.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="item">
          <TabBar>
            {tabsCol4.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="item">
          <TabBar>
            {tabsCol5.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">受控组件</div>
        <div className="item">
          <TabBar activeKey={activeKey} onChange={setActiveKey}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">开启安全区</div>
        <div className="item">
          <TabBar safeArea>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
          </TabBar>
        </div>

        <div className="title">使用itemList</div>
        <div className="item">
          <TabBar safeArea itemList={tabsCol4}>
          </TabBar>
        </div>
      </div>
  )
}
