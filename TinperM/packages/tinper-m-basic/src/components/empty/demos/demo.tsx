/**
 * @title 基础用法
 * @description: 空状态
 */
import React, { Component } from 'react'
import { Empty } from '@tinper/m'
import customImage from './noData.svg'

export default class Demo extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <h3>基础用法</h3>
        <Empty style={{ background: 'var(--mui-color-background)', height: '3.36rem' }} message='' fieldid='empty_1'/>
        <h3>描述文字</h3>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_2'/>
        <Empty mode='noCollect' style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_2'/>
        <Empty mode='noResult' style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_2'/>
        <h3>自定义样式</h3>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} imageStyle={{ width: '1.88rem' }} image={customImage} fieldid='empty_3'/>
        <h3>自定义图片</h3>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} image={customImage} fieldid='empty_4'/>
      </div>
    )
  }
}
