/**
 * @title 用户列表
 * @description: 列表-用户列表
 * @compact true
 */
import React, { useState } from 'react'
import { List, Avatar, Tag } from '@tinper/m'
import { DesComponent, users } from './users'


export default () => {
  return (
    <List header='用户列表'>
      {users.map(item => <List.Item
        key={item.id}
        arrow
        prefix={<Avatar style={{ height: '0.94rem', width: '0.94rem' }} />}
        description={<DesComponent id={item.id} phone={item.phone} />}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem' }}>
          <div style={{ fontSize: '0.4rem', lineHeight: 1.5 }}>{item.name}</div>
          <Tag style={{ marginLeft: '0.16rem', height: '0.36rem', width: '0.86rem', fontSize: '0.24rem', padding: '0.08rem', boxSizing: 'border-box' }} color="primary" fill="solid" label="审批中"></Tag>
        </div>
      </List.Item>)
      }
    </List>
  )
}
