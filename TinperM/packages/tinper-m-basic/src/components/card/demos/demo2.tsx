/**
 * @title BIP典型示例
 * @description 组件示例
 * @compact true
 */
import React from 'react'
import { Card, Tag, ToolBar, Button, Space } from '@tinper/m'

import './demo2.less'

const demoData = [
  {
    title: '客户',
    desc: '鼓浪屿花卉种植有限公司'
  },
  {
    title: '负责人',
    desc: '小吱'
  },
  {
    title: '预计签单日期',
    desc: '2021-04-09'
  },
  {
    title: '预计签单金额',
    desc: '¥23827.59'
  }
]

export default () => {

  const bodyItem = (item) => {
    return (
      <div className='cardBodyItem'>
        <div className='cardBodyItem-title'>{item.title}</div>
        <div className='cardBodyItem-desc'>{item.desc}</div>
      </div>
    )
  }

  const body = () => {
    return (
      <div>
        <Space>
          <Tag color="primary" fill="solid" label="商机阶段标签" />
          <Tag color="success" fill="solid" label="赢单" />
          <Tag fill="solid" label="取消" />
          <Tag color="danger" fill="solid" label="丢单" />
        </Space>
        <div>
          {demoData.map((item) => { return bodyItem(item) })}
        </div>
      </div>
    )
  }

  const toolbar = () => {
    return (
      <ToolBar
        placement="bottom"
        mode='popover'
        direction='right'
        maxVisibleNum={3}
      >
        <Button mode='default' size='small'>添加</Button>
        <Button mode='default' size='small'>取消</Button>
        <Button mode='default' size='small'>分享</Button>
        <Button mode='default' size='small'>编辑</Button>
        <Button mode='default' size='small'>跟进</Button>
      </ToolBar>
    )
  }

  return (
    <>
      <h3>BIP典型示例</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card
          fieldid='card4'
          title='鼓浪屿花卉CRM商机阶段跟进'
          headerClassName='cardHeader2'
          bodyClassName='cardBody2'
          extra={<div className='cardExtra2'>进行中</div>}
        >
          <div className='cardBodyContent2'>
            {body()}
          </div>
          <div className='cardFooter2' onClick={e => e.stopPropagation()}>
            {toolbar()}
          </div>
        </Card>
      </div>
    </>
  )
}
