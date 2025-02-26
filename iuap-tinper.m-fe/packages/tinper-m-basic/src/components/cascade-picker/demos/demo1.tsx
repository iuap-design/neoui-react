/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import { Button, CascadePicker } from '@tinper/m'

import { AsyncDemo } from './async-demo'

const options = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
      },
      {
        label: '宁波',
        value: '宁波',
        children: [
          {
            label: '街道',
            value: '街道',
            children: [
              {
                label: '小区1',
                value: '小区1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '江苏',
    value: '江苏',
    children: [
      {
        label: '南京',
        value: '南京',
      },
      {
        label: '苏州',
        value: '苏州',
        children: [
          {
            label: '街道',
            value: '街道',
            children: [
              {
                label: '小区2',
                value: '小区2',
              },
            ],
          },
        ],
      },
    ],
  },
]

// 级联选择
function CascadePickerDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <CascadePicker
        title='级联选择'
        options={options}
        visible={visible}
        fieldid="cascadePickerFieldid"
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={(val, extend) => {
          console.log('onConfirm', val, extend.items)
        }}
        onSelect={val => {
          console.log('onSelect', val)
        }}
      />
    </>
  )
}

export default () => {
  return (
    <>
     <h3>级联选择</h3>
        <CascadePickerDemo />

     <h3>异步获取选项</h3>
        <AsyncDemo />
    </>
  )
}
