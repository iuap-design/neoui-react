/**
 * @title 基础用法
 * @description 组件类型
 */

import React, { Component, useState } from 'react';
import { Tag, Icon } from '@tinper/m';
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import { styles } from './demoStyles'

export default function Demo0() {
  const [selected1, setSelected1] = useState(false)
  const [selected2, setSelected2] = useState(true)
  const [selected3, setSelected3] = useState(true)
  const [selected4, setSelected4] = useState(true)
  const [selected5, setSelected5] = useState(true)
  const [selected6, setSelected6] = useState(true)

  return (
    <>
      <h3 style={styles.title}>基础标签</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo11" color="default" fill="solid" label="标签"/>
        <Tag fieldid="tagDemo12" color="default" fill="outline" label="标签"/>
        <Tag fieldid="tagDemo13" color="default" fill="none" label="标签"/>
      </div>

      <h3 style={styles.title}>小号标签</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo21" color="default" small fill="solid" label="标签"/>
        <Tag fieldid="tagDemo22" color="default" small fill="outline" label="标签"/>
        <Tag fieldid="tagDemo23" color="default" small fill="none" label="标签"/>

      </div>

      <h3 style={styles.title}>圆弧标签</h3>
      <div style={styles.block}>
        <Tag fieldid="tagDemo31" color="default" fill="solid" round label="标签"/>
        <Tag fieldid="tagDemo32" color="default" fill="outline" round label="标签"/>
        <Tag fieldid="tagDemo33" color="default" fill="outline" style={{ borderRadius: '2px 25px 25px 2px' }} label="标签"/>
      </div>

      <h3 style={styles.title}>带图标的标签</h3>
      <div style={{ ...styles.block, display: 'flex' }}>
        <Tag fieldid="tagDemo41" color="default" fill="solid" leftIcon="archeart" label="标签"/>
        <Tag fieldid="tagDemo42" color="default" fill="outline" rightIcon="arclink-2" label="标签"/>
      </div>
      <div style={{ ...styles.block, display: 'flex' }}>
        <Tag fieldid="tagDemo51" color="default" small fill="solid" leftIcon="archeart" label="标签"/>
        <Tag fieldid="tagDemo52" color="default" small fill="outline" rightIcon="arclink-2" label="标签"/>
      </div>

      <h3 style={styles.title}>超长文本省略标签</h3>
      <div style={{ ...styles.block }}>
        <Tag fieldid="tagDemo61" color="default" fill="solid" textLength={10} label="我是超长可以省略标签我是超长可以省略标签"/>
        <Tag fieldid="tagDemo62" color="default" fill="solid" lineNum={2} label="我是超长可以省略标签我是超长可以省略标签我是超长可以省略标签我是超长可以省略标签"/>
      </div>

      <h3 style={styles.title}>可以关闭标签</h3>
      <div style={styles.block}>
        <Tag fieldid="tagDemo71" color="default" fill="solid" closable label="标签"/>
        <Tag fieldid="tagDemo72" color="default" fill="outline" closable label="标签"/>
      </div>

      <h3 style={styles.title}>标签前后缀</h3>
      <div style={styles.block}>
        <Tag fieldid="tagDemo81" color="default" fill="solid" prefix="$" label="15万元"/>
        <Tag fieldid="tagDemo82" color="default" fill="outline" suffix="RMB" label="15万元"/>
      </div>

      <h3 style={styles.title}>可选中的标签</h3>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo81" readOnly={false} fill="solid" onChange={(selected) => {
          setSelected1(selected)
        }} label={selected1 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo82" readOnly={false} fill="solid" selected onChange={(selected) => {
          setSelected2(selected)
        }} label={selected2 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo83" readOnly={false} fill="solid" disabled label="禁用状态"/>

      </div>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo91" readOnly={false} fill="outline" onChange={(selected) => {
          setSelected3(selected)
        }} label={selected3 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo92" readOnly={false} fill="outline" selected onChange={(selected) => {
          setSelected4(selected)
        }} label={selected4 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo93" readOnly={false} fill="outline" disabled label="禁用状态"/>

      </div>
      <div style={{ ...styles.block, flexWrap: 'wrap' }}>
        <Tag fieldid="tagDemo101" readOnly={false} fill="none" onChange={(selected) => {
          setSelected5(selected)
        }} label={selected5 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo102" readOnly={false} fill="none" selected onChange={(selected) => {
          setSelected6(selected)
        }} label={selected6 ? '已选中状态' : '未选中状态'}/>
        <Tag fieldid="tagDemo103" readOnly={false} fill="none" disabled label="禁用状态"/>

      </div>
    </>
  )
}
