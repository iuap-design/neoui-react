/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react'
import { Skeleton } from '@tinper/m'
import './demo1.less'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <div className='wrapClass'>
        <Skeleton.Title fieldid='skeleton1' />
        <Skeleton.Paragraph fieldid='skeleton1' />
      </div>
      <h3>有动画的骨架屏</h3>
      <div className='wrapClass'>
        <Skeleton.Title animated fieldid='skeleton2' />
        <Skeleton.Paragraph lineCount={5} animated fieldid='skeleton2' />
      </div>
      <h3>自定义</h3>
      <div className='wrapClass'>
        <Skeleton.Title animated fieldid='skeleton3' />
        <Skeleton.Paragraph style={{ width: '55.4%' }} lineCount={2} animated fieldid='skeleton3' />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton className='customSkeleton' animated fieldid='skeleton4' />
          <Skeleton className='customSkeleton' style={{ marginLeft: '0.2rem' }} animated fieldid='skeleton5' />
        </div>
      </div>
    </>
  )
}
