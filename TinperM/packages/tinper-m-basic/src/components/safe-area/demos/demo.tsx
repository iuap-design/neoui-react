/**
 * @title 基础用法
 * @description: 安全区-基础用法
 * @compact true
 */
import React from 'react'
import { SafeArea } from '@tinper/m'
import { contentText } from './text'

export default () => {
  return (
    <div>
      <div style={{ background: '#BFBFBF' }}>
        <SafeArea position='top' />
      </div>
      <div>{contentText}</div>
      <div style={{ background: '#BFBFBF' }}>
        <SafeArea position='bottom' />
      </div>
    </div>
  )
}

