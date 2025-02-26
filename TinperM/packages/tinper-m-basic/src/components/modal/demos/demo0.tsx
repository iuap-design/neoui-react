/**
 * @title 基础用法
 * @description 基础弹窗用法示例
 */
import React, { Component } from 'react'
import { Button, Modal } from '@tinper/m'
import './demo.less'
import { sleep } from '@utils/Sleeps'

const onClick0 = () => {
  Modal.alert({
    fieldid: 'fieldid-modal-0',
    content: '确定要清空已选商品吗？',
    confirmText: '主操作',
    onConfirm: () => {
      console.log('Confirmed')
    },
  })
}
const onClick1 = () => {
  Modal.alert({
    fieldid: 'fieldid-modal-1',
    content: '确定要清空已选商品吗？',
    confirmText: '主操作',
    closeOnMaskClick: true
  })
}
const onClick2 = () => {
  Modal.alert({
    fieldid: 'fieldid-modal-2',
    title: '标题区域',
    confirmText: '主操作',
    content: '确定要清空已选商品吗？',
    showCloseButton: true
  })
}
const onClick3 = () => {
  const temp = Modal.show({
    fieldid: 'fieldid-modal-3',
    content: '确定要清空已选商品吗？',
    closeOnMaskClick: true,
    footer: <div>
      <Button size='middle' mode='default' style={{ minWidth: '2rem', marginRight: '0.32rem' }} fieldid='fieldid-modal-3-button-0' onClick={() => {temp?.close()}}>辅助操作</Button>
      <Button size='middle' mode='primary'style={{ minWidth: '2rem' }} fieldid='fieldid-modal-3-button-1' onClick={() => {temp?.close()}}>主操作</Button>
    </div>
  })
}
const onClick4 = () => {
  const temp = Modal.show({
    fieldid: 'fieldid-modal-4',
    content: '确定要清空已选商品吗？',
    closeOnMaskClick: true,
    actions: [
      {
        key: 'action0',
        text: '操作一',
        primary: true,
        onClick: () => {
          temp?.close()
        }
      },
      {
        key: 'action1',
        text: '操作二',
        onClick: () => {
          temp?.close()
        }
      },
      {
        key: 'action2',
        text: '操作三',
        onClick: () => {
          temp?.close()
        }
      }
    ]
  })
}
const onClick5 = () => {
  Modal.confirm({
    fieldid: 'fieldid-modal-5',
    content: '是否提交申请-查看console',
    onConfirm: async () => {
      await sleep(3000)
      console.log('success 提交成功')
    },
  })
}
const onClick6 = () => {
  Modal.confirm({
    fieldid: 'fieldid-modal-6',
    content: '是否提交申请-查看console',
    onConfirm: async () => {
      await sleep(3000)
      console.log('fail 提交失败')
    },
  })
}
const onClick7 = () => {
  Modal.show({
    fieldid: 'fieldid-modal-7',
    content: '点击遮罩关闭',
    closeOnMaskClick: true
  })
}
export default class Demo0 extends Component {

  render() {
    return (
      <div className='modal-demo'>
        <h3>基础用法</h3>
        <Button block mode="default" onClick={onClick0}>简单弹窗</Button>
        <Button block mode="default" onClick={onClick1}>点击遮罩关闭</Button>
        <Button block mode="default" className='last-button' onClick={onClick2}>显示关闭图标</Button>

        <h3>操作按钮</h3>
        <Button block mode="default" onClick={onClick3}>自定义按钮（0）</Button>
        <Button block mode="default" onClick={onClick4}>自定义按钮（1）</Button>
        <Button block mode="default" onClick={onClick5}>异步操作执行成功</Button>
        <Button block mode="default" onClick={onClick6}>异步操作执行失败</Button>
        <Button block mode="default" className='last-button' onClick={onClick7}>无操作按钮</Button>
      </div>
    )
  }
}
