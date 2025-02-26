/**
 * @title 头像组
 * @description 头像组
 */
import React from 'react'
import { Avatar, List, Tag } from '@tinper/m'
import demo3 from './demo3.svg'
import demo4 from './demo4.png'
import PersonAdd from '@tinper/m-icons/lib/cjs/PersonAdd'
export default () => {
  const wrapStyle = { width: '100%', background: "var(--mui-color-background)" }

  return (
    <>
      <h3>基础用法</h3>
      <div style={wrapStyle}>
        <Avatar.Group>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <h3>头像间距</h3>
      <div style={wrapStyle}>
        <Avatar.Group gap={-4}>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <h3>更多操作样式</h3>
      <div style={wrapStyle}>
        <Avatar.Group maxContentType='text'>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <br></br>
      <div style={wrapStyle}>
        <Avatar.Group maxContentType='textAvatar'>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <br></br>
      <div style={wrapStyle}>
        <Avatar.Group maxContent={<PersonAdd style={{height: '0.48rem', width: '0.48rem'}} />}>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <h3>头像形状</h3>
      <div style={wrapStyle}>
        <Avatar.Group style={{ '--avatar-border-radius': '0.08rem' }}>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <h3>头像大小</h3>
      <div style={wrapStyle}>
        <Avatar.Group style={{ '--avatar-size': '0.72rem' }}>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
      <h3>反向叠加</h3>
      <div style={wrapStyle}>
        <Avatar.Group level='right'>
          <Avatar fieldid='avatar1' src={demo4} />
          <Avatar fieldid='avatar1'>友</Avatar>
          <Avatar fieldid='avatar2'>P</Avatar>
          <Avatar fieldid='avatar3' src={demo3} />
        </Avatar.Group>
      </div>
    </>
  )
}
