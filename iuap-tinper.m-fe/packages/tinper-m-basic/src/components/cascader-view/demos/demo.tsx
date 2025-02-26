/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import './demo.less'
import Eye from '@tinper/m-icons/lib/cjs/Eye'

import { customFileNameOptions, options, sameValueOptions } from './data'
import { CascaderView } from '@tinper/m';

/**
 * @title CascaderView
 * @description cascader-view-组件类型
 */
function BasicStyle() {

  return (
    <CascaderView options={options} />
  )

}



function ControlMode() {
  const [value, setValue] = useState<(string | number)[]>([])
  return (
    <CascaderView
      options={options}
      value={value}
      onChange={(val, extend) => {
        setValue(val)
        console.log('onChange', val, extend.items, extend.isLeaf)
      }}
    />

  )
}

function CustomHeight() {

  return <CascaderView options={options} style={{ '--height': '320px' }} onTabsChange={(index) => console.log(index)} />
}

//custom field names
function CustomFieldNames() {

  return <CascaderView options={customFileNameOptions} fieldNames={{ label: '属性', value: '值', children: '子节点' }} />
}


function DuplicateValueOption() {
  return (
    <CascaderView
      options={sameValueOptions}
      placeholder={(index) => `请选择第${index}层级`}
      onChange={(val, ext) => {
        console.log(val, ext.items)
      }}
    />
  )
}


//自定义选中图标
function CustomSelectedIcon() {
  return (
    <CascaderView
      options={sameValueOptions}
      activeIcon={ <Eye  />}
      onChange={(val, ext) => {
        console.log(val, ext.items)
      }}
    />
  )
}


function EnableSketlon() {
  return (
    <CascaderView options={options} loading />

  )
}


export default () => (
  <div className="cascader-view-demo">
    <>
      <h3>基础样式</h3>
      <BasicStyle/>
      <h3>受控模式</h3>
      <ControlMode/>
      <h3>自定义高度</h3>
      <CustomHeight/>
      <h3>自定义fieldNames</h3>
      <CustomFieldNames/>
      <h3>不同层级中存在 value 重复的选项</h3>
      <DuplicateValueOption/>
      <h3>自定义选中图标</h3>
      <CustomSelectedIcon/>
      <h3>开启骨架屏</h3>
      <EnableSketlon/>


    </>


  </div>
)
