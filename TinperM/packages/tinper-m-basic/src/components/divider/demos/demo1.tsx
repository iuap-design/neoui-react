/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react'
import { Divider } from '@tinper/m'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div className='wrapClass'>
        <Divider fieldid='divider1' />
      </div>

      <h3>带内容的分割线</h3>
      <div className='wrapClass'>
        <Divider fieldid='divider2'>默认内容在中间</Divider>
        <Divider contentPosition='left' fieldid='divider3'>左侧内容</Divider>
        <Divider contentPosition='right' fieldid='divider4'>右侧内容</Divider>
      </div>

      <h3>自定义样式</h3>
      <div className='wrapClass'>
        <Divider
          fieldid='divider5'
          style={{
            color: '#1677ff',
            borderColor: '#1677ff',
            borderStyle: 'dashed',
          }}
        >
          自定义样式
        </Divider>
      </div>

      <h3>竖向分割线</h3>
      <div className='wrapClass'>
      <>
          Text
          <Divider direction='vertical' />
          Text
          <Divider direction='vertical' />
          Text
        </>
      </div>
    </>
  )
}
