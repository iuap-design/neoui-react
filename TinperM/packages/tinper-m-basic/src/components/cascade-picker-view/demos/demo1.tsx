/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import { CascadePickerView } from '@tinper/m'
import { options } from './OptionsData'
import { AsyncDemo } from './AsyncDemo'

export default () => {
  const [value, setValue] = useState<(string | null)[]>(['16', '16:0'])

  return (
    <>
      <h3>基础用法</h3>
      <CascadePickerView options={options} />

      <h3>自定义高度</h3>
      <CascadePickerView options={options} style={{ '--height': '500px' }} />

      <h3>受控模式</h3>
      <CascadePickerView
        options={options}
        value={value}
        onChange={val => {
          setValue(val)
          console.log('onChange', val)
        }}
      />

      <h3>异步获取选项</h3>
      <AsyncDemo />

    </>
  )
}
