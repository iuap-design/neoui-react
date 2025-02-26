/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import { basicColumns } from './columns-data'
import { PickerView } from '@tinper/m'
export default () => {
  const [value, setValue] = useState<(string | null)[]>(['Mon', 'am'])

  return (
    <>
      <h3>基础用法</h3>
      <PickerView columns={basicColumns} />

      <h3>自定义高度</h3>
      <PickerView
        columns={basicColumns}
        style={{ '--height': '500px', '--item-height': '1.4rem' }}
      />

      <h3>受控模式</h3>
      <PickerView
        columns={basicColumns}
        value={value}
        onChange={(val, extend) => {
          setValue(val)
          console.log('onChange', val, extend.items)
        }}
      />

      <h3>通过鼠标滚轮进行选择</h3>
      <PickerView columns={basicColumns} mouseWheel={true} />

    </>
  )
}
