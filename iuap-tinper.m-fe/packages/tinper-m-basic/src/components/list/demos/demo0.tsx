/**
 * @title 基础用法
 * @description: 列表-基础用法
 * @compact true
 */
import React, { useState } from 'react'
import { List, Switch } from '@tinper/m'
import ListIcon from '@tinper/m-icons/lib/cjs/List'
import CreditCard from '@tinper/m-icons/lib/cjs/CreditCard'
import Options2 from '@tinper/m-icons/lib/cjs/Options2'

export default () => {
  return (
    <>
      <List header='基础用法'>
        <List.Item>1</List.Item>
        <List.Item>2</List.Item>
        <List.Item>3</List.Item>
      </List>

      <List header='可点击列表'>
        <List.Item prefix={<ListIcon />} onClick={() => {}}>
          账单
        </List.Item>
        <List.Item prefix={<CreditCard />} onClick={() => {}}>
          总资产
        </List.Item>
        <List.Item prefix={<Options2 />} onClick={() => {}}>
          设置
        </List.Item>
      </List>

      <List header='复杂列表'>
        <List.Item extra={<Switch defaultChecked />}>新消息通知</List.Item>
        <List.Item extra='未开启' clickable>
          大字号模式
        </List.Item>
        <List.Item description='管理已授权的产品和设备' clickable>
          授权管理
        </List.Item>
        <List.Item title='副标题信息A' description='副标题信息B' clickable>
          这里是主信息
        </List.Item>
      </List>

      <List header='禁用状态'>
        <List.Item disabled clickable prefix={<ListIcon />}>
          账单
        </List.Item>
        <List.Item disabled prefix={<CreditCard />}>
          总资产
        </List.Item>
        <List.Item disabled prefix={<Options2 />}>
          设置
        </List.Item>
      </List>
    </>
  )
}
