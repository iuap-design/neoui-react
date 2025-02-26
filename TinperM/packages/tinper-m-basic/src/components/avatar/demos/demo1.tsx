/**
 * @title 基础用法
 * @description 组件示例
 */
import React from 'react'
import { Avatar, List, Tag } from '@tinper/m'
import demo3 from './demo3.svg'
import demo4 from './demo4.png'
import { Person, Phone } from '@tinper/m-icons'

export default () => {
  const wrapStyle = { width: '100%', background: "var(--mui-color-background)" }
  const spaceStyle = { display: 'flex', justifyContent: 'space-between', padding: '16px 12px', width: '55%' }

  const desComponent = (
    <div style={{ display: 'flex', alignItems: 'center', color: '#888888' }}>
      <Person />
      <div style={{ marginLeft: '0.1rem' }}>1000001234</div>
      <div style={{ width: '0.01rem', height: '0.2rem', background: '#888888', margin: '0 0.24rem' }}/>
      <Phone />
      <div style={{ marginLeft: '0.1rem' }}>12123456789</div>
    </div>
  )

  return (
    <>
      <h3>基础用法</h3>
      <div style={wrapStyle}>
        <div style={spaceStyle}>
          <Avatar fieldid='avatar1' src={demo4} />
        </div>
      </div>

      <h3>头像样式</h3>
      <div style={wrapStyle}>
        <div style={spaceStyle}>
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </div>
      </div>

      <h3>头像空状态</h3>
      <div style={wrapStyle}>
        <div style={spaceStyle}>
          <Avatar fieldid='avatar5' src={errorImage} />
        </div>
      </div>

      <h3>自定义尺寸</h3>
      <div style={wrapStyle}>
        <div style={spaceStyle}>
          <Avatar fieldid='avatar6' src={demo4} style={{ '--size': '0.72rem' }} />
          <Avatar fieldid='avatar7' src={demo4} style={{ '--size': '0.96rem' }} />
          <Avatar fieldid='avatar8' src={demo4} style={{ '--size': '1.44rem' }} />
        </div>
      </div>

      <h3>头像形状</h3>
      <div style={wrapStyle}>
        <div style={spaceStyle}>
          <Avatar fieldid='avatar6' src={demo4} />
          <Avatar fieldid='avatar7' src={demo4} style={{ '--border-radius': '0.08rem' }} />
          <Avatar fieldid='avatar8' src={demo4} style={{ '--border-radius': '0' }} />
        </div>
      </div>

      <h3>配合列表使用</h3>
      <div>
        <List>
          <List.Item
            arrow
            prefix={<Avatar fieldid='avatar9' src={demo4} style={{ '--size': '1.12rem' }}/>}
            description={desComponent}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>员工</div>
              <Tag style={{ marginLeft: '12px' }} color="primary" fill="solid" label="审批中"></Tag>
            </div>
          </List.Item>
        </List>
      </div>
    </>
  )
}

const errorImage = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.svg'

