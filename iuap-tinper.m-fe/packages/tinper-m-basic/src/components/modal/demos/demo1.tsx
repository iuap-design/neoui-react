/**
 * @title 拓展用法
 * @description 拓展弹窗使用示例
 */
import React, { Component } from 'react'
import { Button, Modal, Input } from '@tinper/m'
import './demo.less'
import CheckmarkCircleFill from '@tinper/m-icons/lib/cjs/CheckmarkCircleFill'
import demoImage from '../../image/demos/image-demo.png'

const onClick0 = () => {
  const temp = Modal.show({
    fieldid: 'fieldid-modal-8',
    header: (
      <CheckmarkCircleFill
        color='#18B681'
        style={{ width: '0.64rem', height: '0.64rem' }}
      />
    ),
    title: '标题区域',
    content: '确认要清空已选商品吗？',
    closeOnMaskClick: true,
    footer: <div>
      <Button size='middle' mode='default' style={{ width: '2rem', marginRight: '0.32rem' }} fieldid='fieldid-modal-8-button-0' onClick={() => {temp?.close()}}>辅助操作</Button>
      <Button size='middle' mode='primary' style={{ width: '2rem' }} fieldid='fieldid-modal-8-button-1' onClick={() => {temp?.close()}}>主操作</Button>
    </div>
  })
}
const onClick1 = () => {
  const temp = Modal.show({
    fieldid: 'fieldid-modal-9',
    image: demoImage,
    title: '标题区域',
    content: '确认要清空已选商品吗？',
    closeOnMaskClick: true,
    footer: <div>
      <Button size='middle' mode='default' style={{ width: '2rem', marginRight: '0.32rem' }} fieldid='fieldid-modal-9-button-0' onClick={() => {temp?.close()}}>辅助操作</Button>
      <Button size='middle' mode='primary' style={{ width: '2rem' }} fieldid='fieldid-modal-9-button-1' onClick={() => {temp?.close()}}>主操作</Button>
    </div>
  })
}
const onClick2 = () => {
  const temp = Modal.show({
    fieldid: 'fieldid-modal-10',
    title: '标题区域',
    closeOnMaskClick: true,
    content: <div style={{ textAlign: 'center' }}>{'这里是公告内容'.repeat(26)}</div>,
    footer: <div>
      <Button size='middle' mode='default' style={{ width: '2rem', marginRight: '0.32rem' }} fieldid='fieldid-modal-10-button-0' onClick={() => {temp?.close()}}>辅助操作</Button>
      <Button size='middle' mode='primary' style={{ width: '2rem' }} fieldid='fieldid-modal-10-button-1' onClick={() => {temp?.close()}}>主操作</Button>
    </div>
  })
}
const onClick3 = () => {
  Modal.alert({
    fieldid: 'fieldid-modal-11',
    title: '新建文件夹',
    content: <Input defaultValue='培训文档' showClose onlyShowClearWhenFocus={false} className="modal-demo11-input"/>,
    confirmText: '主操作'
  })
}
const onClick4 = async () => {
  await Modal.alert({ 
    content: '查看console',
    fieldid: 'fieldid-modal-12',
  })
  console.log('已关闭')
}
const onClick5 = async () => {
  const result = await Modal.confirm({ 
    content: '查看console',
    fieldid: 'fieldid-modal-13',
  })
  if (result) {
    console.log('点击了确认')
  } else {
    console.log('点击了取消')
  }
}

const onClick7 = () => {
  Modal.alert({
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

  render() {
    const { visible } = this.state;
    return (
      <div className='modal-demo'>
        <h3>内容区域</h3>
        <Button block mode="default" onClick={onClick0}>自定义内容区域</Button>
        <Button block mode="default" onClick={onClick1}>有标题和图片</Button>
        <Button block mode="default" onClick={onClick2}>超长文本</Button>
        <Button block mode="default" className='last-button' onClick={onClick3}>输入对话框</Button>

        <h3>只显示标题（无文本）</h3>
        <Button block mode="default" onClick={onClick7}>只显示标题</Button>

        <h3>获取点击结果</h3>
        <Button block mode="default" onClick={onClick4}>等待alert完成</Button>
        <Button block mode="default" className='last-button' onClick={onClick5}>等待confirm完成</Button>

        <h3>声明式</h3>
        <Button block mode="default" className='last-button' onClick={this.onClick6}>显示弹窗</Button>
        <Modal
          fieldid='fieldid-modal-14'
          visible={visible}
          content='显示弹窗示例'
          closeOnMaskClick={true}
          onClose={() => {
            console.log('close--------')
            this.setState({ visible: false })
          }}
        />
      </div>
    )
  }
}
