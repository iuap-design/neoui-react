/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react'
import { Selector, Space } from '@tinper/m'
import './demo.less'
import { fieldNamesOptions, options, options2, options3, options4, options5 } from './options'

export default () => {
  return (
    <div className="selector-demo">
      <h3>单选</h3>
      <Selector
        className="demo-item"
          options={options}
          defaultValue={['1']}
          onChange={(arr, extend) => console.log(arr, extend.items)}
        />

      <h3>多选</h3>
      <Selector
        className="demo-item"

          options={options5}
          defaultValue={['2', '3']}
        multiple

          onChange={(arr, extend) => console.log(arr, extend.items)}
      />

      <h3>固定宽度</h3>
      <Selector
        className="demo-item"

        options={options2}
        defaultValue={['2']}
        widthAdjustment="fixed"

        onChange={(arr, extend) => console.log(arr, extend.items)}
      />

      <h3>宽度跟随内容</h3>
      <Selector
        className="demo-item"
        widthAdjustment="auto"
        options={[
          {
            label: '选项选项',
            value: '1',
          },
          {
            label: '选项选项选项',
            value: '2',
          },
          {
            label: '选项选项选项选项',
            value: '3',
          }

        ]}
        defaultValue={['1']}
        onChange={(arr, extend) => console.log(arr, extend.items)}
      />

      <h3>两列布局</h3>
      <Selector
        className="demo-item"

          columns={2}
          options={options}
          defaultValue={['2', '3']}
          multiple
        />

      <h3>三列布局</h3>
      <Selector
        className="demo-item"

          columns={3}
          options={options}
          defaultValue={['2', '3']}
          multiple
        />

      <h3>禁用状态</h3>
        <Space block direction='vertical'>
        <Selector className="demo-item"
 options={options3} defaultValue={['1']} disabled />
        <Selector
          className="demo-item"

            options={options4}
            defaultValue={['edit']}
          />
        </Space>

      <h3>自定义FieldName</h3>
      <Selector
        className="demo-item"

          options={fieldNamesOptions}
          fieldNames={{
            label: 'labelT',
            value: 'valueT',
            disabled: 'disabledT',
          }}
          defaultValue={['1']}
          multiple
          onChange={(arr, extend) => console.log(arr, extend.items)}
        />
    </div>
  )
}
