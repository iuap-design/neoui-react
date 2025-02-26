/**
 * @title 拓展用法
 * @description 拓展对话框使用示例
 */
import React, { Component } from 'react'
import { Button, Dialog, Input } from '@tinper/m'
import './demo.less'
import CheckmarkCircleFill from '@tinper/m-icons/lib/cjs/CheckmarkCircleFill'
import demoImage from '../../image/demos/image-demo.png'

const onClick0 = () => {
  const temp = Dialog.show({
    fieldid: 'fieldid-dialog-7',
    header: (
      <CheckmarkCircleFill
        color='#18B681'
        style={{ width: '0.64rem', height: '0.64rem' }}
      />
    ),
    title: '标题区域',
    content: '确认要清空已选商品吗？',
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
    ]
  })
}
const onClick1 = () => {
  const temp = Dialog.show({
    fieldid: 'fieldid-dialog-8',
    image: demoImage,
    title: '标题区域',
    content: '确认要清空已选商品吗？',
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
    ]
  })
}
const onClick2 = () => {
  Dialog.confirm({
    fieldid: 'fieldid-dialog-9',
    title: '标题区域',
    closeOnMaskClick: true,
    content: <div style={{ textAlign: 'center' }}>{'这里是公告内容'.repeat(26)}</div>
  })
}
const onClick3 = () => {
  Dialog.alert({
    fieldid: 'fieldid-dialog-10',
    title: '新建文件夹',
    content: <Input defaultValue='培训文档' showClose onlyShowClearWhenFocus={false} className="dialog-demo10-input"/>,
    confirmText: '主操作'
  })
}
const onClick4 = async () => {
  await Dialog.alert({
    content: '查看console',
    fieldid: 'fieldid-dialog-11',
  })
  console.log('已关闭')
}
const onClick5 = async () => {
  const result = await Dialog.confirm({
    content: '查看console',
    fieldid: 'fieldid-dialog-12',
  })
  if (result) {
    console.log('点击了确认')
  } else {
    console.log('点击了取消')
  }
}

const onClick8 = () => {
  Dialog.alert({
    title: '标题区域',
    closeOnMaskClick: true
  })
}

export default class Demo1 extends Component<any, { visible: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { visible: false };
  }

  onClick6 = () => {
    this.setState({ visible: true })
  }

  onClick7 = () => {
    let a = 2;
    const temp = Dialog.show({
      fieldid: 'fieldid-dialog-13',
      content: '点击两次关闭对话框',
      actions: [
        {
          key: 'close',
          text: '关闭',
          primary: true,
          onClick: () => {
            if (a > 0) a = a - 1;
            if (a === 0) {
              temp?.close()
            }
          }
        }
      ]
    })
  }

  render() {
    const { visible } = this.state;
    return (
      <div className='dialog-demo'>
        <h3>内容区域</h3>
        <Button block mode="default" onClick={onClick0}>自定义内容区域</Button>
        <Button block mode="default" onClick={onClick1}>有标题和图片</Button>
        <Button block mode="default" onClick={onClick2}>超长文本</Button>
        <Button block mode="default" className='last-button' onClick={onClick3}>输入对话框</Button>

        <h3>只显示标题（无文本）</h3>
        <Button block mode="default" onClick={onClick8}>只显示标题</Button>

        <h3>获取点击结果</h3>
        <Button block mode="default" onClick={onClick4}>等待alert完成</Button>
        <Button block mode="default" className='last-button' onClick={onClick5}>等待confirm完成</Button>

        <h3>声明式</h3>
        <Button block mode="default" className='last-button' onClick={this.onClick6}>显示对话框</Button>
        <Dialog
          fieldid='fieldid-dialog-14'
          visible={visible}
          content='显示弹窗示例'
          closeOnMaskClick={true}
          onClose={() => {
            console.log('close--------')
            this.setState({ visible: false })
          }}
        />

        <h3>自定义关闭操作</h3>
        <Button block mode="default" className='last-button' onClick={this.onClick7}>显示对话框</Button>
      </div>
    )
  }
}
