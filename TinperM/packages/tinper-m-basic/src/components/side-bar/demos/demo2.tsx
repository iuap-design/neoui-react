/**
 * @title 特殊用法示例
 * @description 特殊用法示例
 * @compact true
 */
import React from 'react'
import { SideBar } from '@tinper/m'
import { tabs } from './tabs'
import './demo2.less'

export default () => {
  return (
    <>
      <h3>选项带数字</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar>
          <SideBar.Item
            key='key1'
            title={
              <div>
                选项一
                <span className='sidebar-demo-count'>(8)</span>
              </div>
            }
          />
          <SideBar.Item
            key='key2'
            title={
              <div>
                选项二它折行了
                <span className='sidebar-demo-count'>(5)</span>
              </div>
            }
          />
        </SideBar>
      </div>

      <h3>自定义列宽</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar style={{ '--width': '2.4rem' }}>
          {tabs.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>

      <h3>自定义选中项圆角</h3>
      <div style={{ background: 'var(--mui-color-background)' }}>
        <SideBar style={{ '--item-border-radius': '0px' }}>
          {tabs.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>
    </>
  )
}
