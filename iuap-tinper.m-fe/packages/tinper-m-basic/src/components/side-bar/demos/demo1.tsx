/**
 * @title 基础用法
 * @description 基础用法示例
 * @compact true
 */
import React from 'react'
import { SideBar } from '@tinper/m'
import { tabs } from './tabs'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar fieldid="sidebar-demo1">
          {tabs.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>

      <h3>搭配 Badge 使用</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar fieldid="sidebar-demo2" >
          {tabs.map(item => (
            <SideBar.Item
              key={item.key}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </SideBar>
      </div>

      <h3>禁用状态</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar fieldid="sidebar-demo3" >
          {tabs.map(item => (
            <SideBar.Item
              key={item.key}
              title={item.title}
              disabled={item.disabled}
            />
          ))}
        </SideBar>
      </div>
    </>
  )
}
