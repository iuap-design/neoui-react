/**
 * @title 卡片列表
 * @description: 列表-卡片列表
 * @compact true
 */
import React, { useState } from 'react'
import { List } from '@tinper/m'

export default () => {
  function handleClick() {
    // ...
  }
  return (
    <List mode='card' header='卡片列表'>
      <List.Item extra='食品' onClick={handleClick}>
        物料分类
      </List.Item>
      <List.Item onClick={handleClick}>帮助中心</List.Item>
      <List.Item onClick={handleClick}>关闭服务</List.Item>
    </List>
  )
}
