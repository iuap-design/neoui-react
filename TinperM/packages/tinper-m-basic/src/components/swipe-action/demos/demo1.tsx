/**
 * @title 基础用法
 * @description 滑动操作用法示例
 * @compact true
 */
import React, { useRef } from 'react'
import type { FC } from 'react'
import { Dialog, List, SwipeAction, Toast, Image, SwipeActionRef } from '@tinper/m'
import demoImage from './swipe-action-image.png'

export default () => {
  return (
    <>
      
      <h3>基础用法</h3>
        <WithList />

      <h3>搭配图片使用</h3>
        <CustomContent />

      <h3>自定义归位逻辑</h3>
        <Manual />
    </>
  )
}

// 配合列表使用
const WithList: FC = () => {
  const leftActions = [
    {
      key: 'pin',
      text: '置顶',
      color: 'primary',
    },
  ]
  const rightActions = [
    {
      key: 'unsubscribe',
      text: '取消关注',
      color: 'light',
    },
    {
      key: 'mute',
      text: '免打扰',
      color: 'warning',
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
    },
  ]
  const items = ['A', 'B', 'C']
  return (
    <List>
      {items.map((item, index) => (
        <SwipeAction
          closeOnTouchOutside={false}
          fieldid={'fieldid-swipe-action-0-' + index}
          key={item}
          leftActions={leftActions}
          rightActions={rightActions}
        >
          <List.Item>{item}</List.Item>
        </SwipeAction>
      ))}
    </List>
  )
}

// 自定义内容
const CustomContent: FC = () => {
  return (
    <SwipeAction
      fieldid='fieldid-swipe-action-1'
      rightActions={[
        {
          key: 'delete',
          text: '删除',
          color: 'danger',
        },
      ]}
    >
      <Image src={demoImage} height={212}/>
    </SwipeAction>
  )
}

// 手动控制归位逻辑
const Manual: FC = () => {
  const ref = useRef<SwipeActionRef>(null)
  return (
    <List>
      <SwipeAction
        ref={ref}
        closeOnAction={false}
        closeOnTouchOutside={false}
        fieldid='fieldid-swipe-action-2'
        rightActions={[
          {
            key: 'delete',
            text: '删除',
            color: 'danger',
            onClick: async () => {
              await Dialog.confirm({
                content: '确定要删除吗？',
              })
              ref.current?.close()
            },
          },
        ]}
      >
        <List.Item
          onClick={() => {
            Toast.show('你点击了列表项')
          }}
        >
          A
        </List.Item>
      </SwipeAction>
    </List>
  )
}
