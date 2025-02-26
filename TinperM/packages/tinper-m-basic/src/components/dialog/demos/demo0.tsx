/**
 * @title 基础用法
 * @description 基础对话框用法示例
 */
import React, { Component } from 'react'
import { Button, Dialog } from '@tinper/m'
import './demo.less'
import { sleep } from '@utils/Sleeps'

const onClick0 = () => {
  Dialog.alert({
    fieldid: 'fieldid-dialog-0',
    content: '确定要清空已选商品吗？',
    confirmText: '主操作',
    onConfirm: () => {
      console.log('Confirmed')
    }
  })
}
const onClick1 = () => {
  Dialog.alert({
    fieldid: 'fieldid-dialog-1',
    content: '确定要清空已选商品吗？',
    confirmText: '主操作',
    closeOnMaskClick: true
  })
}
const onClick2 = () => {
  const temp = Dialog.show({
    fieldid: 'fieldid-dialog-2',
    content: '确定要清空已选商品吗？',
    closeOnMaskClick: true,
    actions: [
      [
        {
          key: '0',
          text: '辅助操作',
          onClick: () => {
            temp?.close()
          }
        },
        {
          key: '1',
          text: '主操作',
          primary: true,
          onClick: () => {
            temp?.close()
          }
        }
      ],
    ],
  })
}
const onClick3 = () => {
  const temp = Dialog.show({
    fieldid: 'fieldid-dialog-3',
    content: '确定要清空已选商品吗？',
    closeOnMaskClick: true,
    actions: [
      {
        key: 'online',
        text: '在线阅读',
        onClick: () => {
          temp?.close()
        }
      },
      {
        key: 'download',
        text: '下载文件',
        onClick: () => {
          temp?.close()
        }
      },
      [
        {
          key: 'cancel',
          text: '取消',
          onClick: () => {
            temp?.close()
          }
        },
        {
          key: 'delete',
          text: '删除',
          danger: true,
          onClick: () => {
            temp?.close()
          }
        }
      ],
    ],
  })
}
const onClick4 = () => {
  Dialog.confirm({
    fieldid: 'fieldid-dialog-4',
    content: '是否提交申请-查看console',
    onConfirm: async () => {
      await sleep(3000)
      console.log('success 提交成功')
    },
  })
}
const onClick5 = () => {
  Dialog.confirm({
    fieldid: 'fieldid-dialog-5',
    content: '是否提交申请-查看console',
    onConfirm: async () => {
      await sleep(3000)
      console.log('fail 提交失败')
    },
  })
}
const onClick6 = () => {
  Dialog.show({
    fieldid: 'fieldid-dialog-6',
    content: '点击遮罩关闭',
    closeOnMaskClick: true,
  })
}
export default class Demo0 extends Component {

  render() {
    return (
      <div className='dialog-demo'>
        <h3>基础用法</h3>
        <Button block mode="default" onClick={onClick0}>简单对话框</Button>
        <Button block mode="default" onClick={onClick1}>点击遮罩关闭</Button>

        <h3>操作按钮</h3>
        <Button block mode="default" onClick={onClick2}>自定义按钮（0）</Button>
        <Button block mode="default" onClick={onClick3}>自定义按钮（1）</Button>
        <Button block mode="default" onClick={onClick4}>异步操作执行成功</Button>
        <Button block mode="default" onClick={onClick5}>异步操作执行失败</Button>
        <Button block mode="default" className='last-button' onClick={onClick6}>无操作按钮</Button>
      </div>
    )
  }
}
