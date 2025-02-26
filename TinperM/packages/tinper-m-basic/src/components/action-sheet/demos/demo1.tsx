/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState, useRef } from 'react'
import { ActionSheet, Button, Dialog, Toast, ActionSheetShowHandler } from '@tinper/m'
import './demo.less'
import frame from './Frame.png'

const actions = [
  { text: '复制', key: 'copy' },
  { text: '修改', key: 'edit' },
  { text: '保存', key: 'save' },
]

// 基础用法
function Basic() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle' style={{ marginRight: '0.2rem' }}>最简单的用法</Button>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        fieldid='action-sheet1'
      />
    </>
  )
}

function WithCancelButtonAndDescription() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle'>取消按钮和额外描述</Button>
      <ActionSheet fieldid='action-sheet2'
        extra={
          <div className="action-sheet-demo-extra">
            <img style={{ width: '0.44rem', height: '0.44rem', objectFit: 'fill' }} src={frame} />
            <span style={{ marginLeft: '0.16rem', display: 'inline-block' }}>零售移动端应用设计文档.docx</span>
          </div>
        }
        cancelText='取消'
        visible={visible}
        actions={[
          { text: '下载', key: 'load' },
          { text: '编辑', key: 'edit' },
        ]}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

// 选项状态
function ConfigActions() {
  const actions = [
    { text: '下载', key: 'load' },
    { text: '修改', key: 'edit', disabled: true },
    { text: '删除', key: 'delete', danger: true },
  ]

  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle' style={{ marginRight: '0.2rem' }}>禁用和危险的选项</Button>
      <ActionSheet fieldid='action-sheet3'
        extra={
          <div className="action-sheet-demo-extra">
            <img style={{ width: '0.44rem', height: '0.44rem', objectFit: 'fill' }} src={frame} />
            <span style={{ marginLeft: '0.16rem', display: 'inline-block' }}>零售移动端应用设计文档.docx</span>
          </div>
        }
        visible={visible}
        actions={actions}
        cancelText='取消'
        onClose={() => setVisible(false)}
      />
    </>
  )
}

function ConfigActions1() {
  const actions = [
    { text: '下载', key: 'load' },
    { text: '修改', key: 'edit', disabled: true },
    {
      text: '删除',
      key: 'delete',
      description: '删除后数据不可恢复',
      danger: true,
    },
  ]

  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle'>危险选项带说明</Button>
      <ActionSheet fieldid='action-sheet4'
        extra={
          <div className="action-sheet-demo-extra">
            <img style={{ width: '0.44rem', height: '0.44rem', objectFit: 'fill' }} src={frame} />
            <span style={{ marginLeft: '0.16rem', display: 'inline-block' }}>零售移动端应用设计文档.docx</span>
          </div>
        }
        visible={visible}
        actions={actions}
        cancelText='取消'
        onClose={() => setVisible(false)}
      />
    </>
  )
}

// 事件处理
function Events() {
  const actions = [
    { text: '复制', key: 'copy' },
    { text: '修改', key: 'edit' },
    {
      text: '保存',
      key: 'save',
      onClick: async () => {
        const result = await Dialog.confirm({ content: '确定要保存吗？' })
        if (result) {
          Toast.show('执行了保存操作')
        }
      },
    },
  ]

  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle'>事件处理</Button>
      <ActionSheet fieldid='action-sheet5'
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={action => {
          if (action.key === 'edit' || action.key === 'copy') {
            Toast.show(`点击了${action.text}`)
          }
        }}
        afterClose={() => {
          Toast.show('动作面板已关闭')
        }}
      />
    </>
  )
}

// 指令式
function Imperative() {
  const handler = useRef<ActionSheetShowHandler>()
  const actions = [
    {
      text: '复制',
      key: 'copy',
    },
    {
      text: '修改',
      key: 'edit',
      onClick: () => {
        handler.current?.close()
      },
    },
  ]

  return (
    <Button
      mode='default'
      size='middle'
      onClick={() => {
        handler.current = ActionSheet.show({
          actions,
          onClose: () => {
            Toast.show('动作面板关闭')
          },
        })
      }}
    >
      显示
    </Button>
  )
}

// 自适应规则
function MaxHeight() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)} mode='default' size='middle'>容器最大高度</Button>
      <ActionSheet fieldid='action-sheet6'
        cancelText='取消'
        visible={visible}
        actions={[
          { text: '选项0', key: 'select0' },
          { text: '选项1', key: 'select1' },
          { text: '选项2', key: 'select2' },
          { text: '选项3', key: 'select3' },
          { text: '选项4', key: 'select4' },
          { text: '选项5', key: 'select5' },
          { text: '选项6', key: 'select6' },
          { text: '选项7', key: 'select7' },
          { text: '选项8', key: 'select8' },
          { text: '选项9', key: 'select9' },
          { text: '选项10', key: 'select10' },
          { text: '选项11', key: 'select11' },
        ]}
        onClose={() => setVisible(false)}
      />
    </>
  )
}

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <Basic />
      <WithCancelButtonAndDescription />

      <h3>自适应规则</h3>
      <MaxHeight />

      <h3>选项状态</h3>
      <ConfigActions />
      <ConfigActions1 />

      <h3>事件处理</h3>
      <Events />

      <h3>指令式</h3>
      <Imperative />
    </>
  )
}
