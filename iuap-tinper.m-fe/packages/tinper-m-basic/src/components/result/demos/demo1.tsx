/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react'
import { Result } from '@tinper/m'
import Shake from '@tinper/m-icons/lib/cjs/Shake'

export default () => {
  return (
    <>
      <h3>成功状态</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result1'
          status='success'
          title='操作成功'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
      <h3>等待状态</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result2'
          status='waiting'
          title='等待处理'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
      <h3>提示状态</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result3'
          status='info'
          title='信息提示'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
      <h3>警告状态</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result4'
          status='warning'
          title='警告提示'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
      <h3>失败状态</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result5'
          status='error'
          title='无法完成操作'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
      <h3>自定义图标</h3>
      <div className='wrapClass'>
        <Result
          fieldid='result6'
          icon={<Shake style={{ width: '1.04rem', height: '1.04rem' }} />}
          title='摇一摇'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
      </div>
    </>
  )
}
