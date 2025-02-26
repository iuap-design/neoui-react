/**
 * @title 基础用法
 * @description 组件示例
 * @compact true
 */
import React from 'react'
import { Card, Toast, Button } from '@tinper/m'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import List from '@tinper/m-icons/lib/cjs/List'

import './demo1.less'

export default () => {
  const onClick = () => {
    Toast.show('点击了卡片')
  }

  const onHeaderClick = () => {
    Toast.show('点击了卡片Header区域')
  }

  const onBodyClick = () => {
    Toast.show('点击了卡片Body区域')
  }
  return (
    <>
      <h3>基础用法</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card title='卡片标题' onClick={onClick} fieldid='card1'>
          卡片内容
        </Card>
      </div>
      <h3>没有卡片内容</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card title='卡片标题' onClick={onClick} fieldid='card2'/>
      </div>
      <h3>没有卡片标题</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card onClick={onClick} fieldid='card3'>卡片内容</Card>
      </div>
      <h3>自定义卡片内容</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card
          fieldid='card4'
          title={
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
              <List style={{ width: '0.44rem', height: '0.44rem', marginRight: '4px', color: '#555555' }} />
              卡片标题
            </div>
          }
          extra={<ArrowIosRight style={{ width: '0.44rem', height: '0.44rem', color: '#D8D8D8' }}/>}
          onBodyClick={onBodyClick}
          onHeaderClick={onHeaderClick}
        >
          <div className='cardContent'>卡片内容</div>
          <div className='cardFooter' onClick={e => e.stopPropagation()}>
            <Button
              mode='primary'
              onClick={() => {
                Toast.show('点击了底部按钮')
              }}
            >
              底部按钮
            </Button>
          </div>
        </Card>
      </div>
      <h3>自定义卡片样式</h3>
      <div className='wrapClass' style={{ background: 'var(--mui-color-light)', padding: '0.16rem' }}>
        <Card
          fieldid='card5'
          headerStyle={{
            color: '#005CF4',
          }}
          bodyClassName='customBody'
          title='卡片标题'
        >
          卡片内容
        </Card>
      </div>
    </>
  )
}
