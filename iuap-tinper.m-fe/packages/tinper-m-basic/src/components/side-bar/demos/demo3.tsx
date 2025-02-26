/**
 * @title 带内容示例
 * @description 带内容示例
 * @compact true
 */
import React, { useState } from 'react'
import { SideBar } from '@tinper/m'
import { tabs } from './tabs'
import './demo3.less'
import classNames from 'classnames'

export default () => {
  const [activeKey, setActiveKey] = useState('key1')

  return (
    <div className='sidebar-demo-container'>
      <div className='sidebar-demo-side'>
        <SideBar activeKey={activeKey} onChange={setActiveKey}>
          {tabs.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>
      <div className='sidebar-demo-main'>
        <div
          className={classNames(
            'sidebar-demo-content',
            activeKey === 'key1' && 'sidebar-demo-active'
          )}
        >
          页面 1
        </div>
        <div
          className={classNames(
            'sidebar-demo-content',
            activeKey === 'key2' && 'sidebar-demo-active'
          )}
        >
          页面 2
        </div>
        <div
          className={classNames(
            'sidebar-demo-content',
            activeKey === 'key3' && 'sidebar-demo-active'
          )}
        >
          页面 3
        </div>
      </div>
    </div>
  )
}
