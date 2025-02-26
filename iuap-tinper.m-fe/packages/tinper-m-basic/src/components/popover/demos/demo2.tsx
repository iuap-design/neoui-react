/**
 * @title PopoverMenu 组件用法
 * @description PopoverMenu 组件用法
 */
import './demo.less';
import React from 'react'
import { Popover, Toast, Button } from '@tinper/m';
import type { Action } from '@tinper/m';
import { actionList } from "./actionList";

function LightPopoverMenu() {
  return (
    <Popover.Menu
      actions={actionList}
      placement='right-start'
      onAction={(node: Action) => Toast.show(`选择了 ${node.text}`)}
      trigger='click'
    >
      <Button>Open Popover</Button>
    </Popover.Menu>
  )
}

function DarkPopoverMenu() {
  return (
    <Popover.Menu
      mode='dark'
      actions={actionList}
      placement='right-start'
      onAction={(node: Action) => Toast.show(`选择了 ${node.text}`)}
      trigger='click'
    >
      <Button>Open Popover</Button>
    </Popover.Menu>
  )
}

function PopoverMenuWithoutIcon() {
  return (
    <Popover.Menu
      actions={actionList.map(action => ({
        ...action,
        icon: null,
      }))}
      onAction={(node: Action) => Toast.show(`选择了 ${node.text}`)}
      placement='right-start'
      trigger='click'
    >
      <Button>Open Popover</Button>
    </Popover.Menu>
  )
}

function PopoverMenuHiddenScroll() {
  return (
    <Popover.Menu
      actions={actionList}
      maxCount={2}
      onAction={(node: Action) => Toast.show(`选择了 ${node.text}`)}
      placement='bottom-start'
      trigger='click'
    >
      <Button>Open Popover</Button>
    </Popover.Menu>
  )
}


const Demo = () => (
  <div className="popover-demo">
    <>
      <h3>浅色气泡菜单</h3>
      <LightPopoverMenu />
    </>
    <>
      <h3>深色气泡菜单</h3>
      <DarkPopoverMenu />
    </>
    <>
      <h3>无图标气泡菜单</h3>
      <PopoverMenuWithoutIcon />
    </>
    <>
      <h3>超过最大数量，隐藏滚动</h3>
      <PopoverMenuHiddenScroll />
    </>

  </div>
)

export default Demo
