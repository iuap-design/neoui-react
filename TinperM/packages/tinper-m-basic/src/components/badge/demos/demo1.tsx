/**
 * @title 基础用法
 * @description 组件示例
 */
import React from 'react'
import { Badge, List } from '@tinper/m'

import './demo1.less'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div className='wrapper'>
        <div className='content' style={{ width: '80%' }}>
          <Badge fieldid='badge11' content={Badge.dot}>
            <div className='box' />
          </Badge>
          <Badge fieldid='badge1' content='3'>
            <div className='box' />
          </Badge>
          <Badge fieldid='badge2' content='NEW'>
            <div className='box' />
          </Badge>
          <Badge fieldid='badge3' content='···'>
            <div className='box' />
          </Badge>
          <Badge fieldid='badge12' content='限时'>
            <div className='box' />
          </Badge>
        </div>
      </div>

      <h3>无边框</h3>
      <div className='wrapper'>
        <div className='content'>
          <Badge fieldid='badge4' content='有更新' bordered={false}>
            <div className='box dark' />
          </Badge>
        </div>
      </div>

      <h3>自定义颜色和偏移量</h3>
      <div className='wrapper'>
        <div className='content' style={{ width: '80%' }}>
          <Badge fieldid='badge7'
            color='#18B681'
            content={Badge.dot}
            style={{ '--right': '100%', '--top': '100%' }}
          >
            <div className='box' />
          </Badge>
          <Badge fieldid='badge8'
            color='#588CE9'
            content={Badge.dot}
            style={{ '--right': '100%' }}
          >
            <div className='box' />
          </Badge>
          <Badge fieldid='badge9'
            color='#FF5735'
            content={Badge.dot}
          >
            <div className='box' />
          </Badge>
          <Badge fieldid='badge10'
            color='#FFA600'
            content={Badge.dot}
            style={{ '--top': '100%' }}
          >
            <div className='box' />
          </Badge>
        </div>
      </div>

      <h3>独立使用</h3>
      <div className='wrapper'>
        <div className='content' style={{ width: '20%', height:'0.48rem', display: 'flex', alignItems: 'center' }}>
          <Badge fieldid='badge5' content='3' />
          <Badge fieldid='badge6' content='NEW'/>
        </div>
      </div>

      <h3>配合列表使用</h3>
      <div>
        <List>
          <List.Item
            arrow
            prefix={<div style={{ fontSize: '0.26rem', color: '#555555' }}>标题示意</div>}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Badge fieldid='badge5' content='3' />
            </div>
          </List.Item>
        </List>
      </div>
    </>
  )
}
