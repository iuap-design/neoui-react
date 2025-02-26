/**
 * @title 组件样式
 * @description 组件样式
 */
import React, { useState } from 'react'
import { Selector } from '@tinper/m'
import { options, options5 } from './options'
import './demo.less'

export default () => {
  return (
    <div className="selector-demo">
      <h3>必须选择一项</h3>
        <RadioMode />

      <h3>选项带描述</h3>
      <Selector
        className="demo-item"

          columns={2}
          options={[
            {
              label: '选项1',
              description: '描述信息',
              value: '1',
            },
            {
              label: '选项2',
              description: '描述信息',
              value: '2',
            },
          ]}
          defaultValue={['1']}
        />

      <h3>无角标</h3>
      <Selector
        className="demo-item"

          showCheckMark={false}
          options={options5}
          defaultValue={['1']}
        />
      <Selector
        className="demo-item"

        showCheckMark={false}
        options={options}
        defaultValue={['1']}
      />

    </div>
  )
}

const RadioMode = () => {
  const [value, setValue] = useState('1')
  return (
    <Selector
      className="demo-item"

      options={options}
      value={[value]}
      onChange={v => {
        if (v.length) {
          setValue(v[0])
        }
      }}
    />
  )
}
