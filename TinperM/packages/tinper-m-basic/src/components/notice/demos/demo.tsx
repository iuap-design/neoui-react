/**
 * @title 基础用法
 * @description 通告栏
 * @compact true
 */
import React, { Component } from 'react'
import { Notice } from '@tinper/m'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import Bell from '@tinper/m-icons/lib/cjs/Bell'
import CloseCircle from '@tinper/m-icons/lib/cjs/CloseCircle'
import VolumeUp from '@tinper/m-icons/lib/cjs/VolumeUp'

export default class Demo1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeModalShow: false
    }
  }
  onClick = () => {
    this.setState({
      noticeModalShow: true
    })
  }
  onClose = () => {
    this.setState({
      noticeModalShow: false
    })
  }
  customExtra = () => {
    return (
      <div style={{ width: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>查看详情</span>
        <span>关闭</span>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h3>基础用法</h3>
        <Notice fieldid='notice1'>默认</Notice>
        <h3>通告栏语义</h3>
        <div style={{ height: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Notice fieldid='notice2' content='成功' color='success' />
          <Notice fieldid='notice3' content='警告' color='alert' />
          <Notice fieldid='notice4' content='错误' color='error' />
          <Notice fieldid='notice5' content='信息' color='info' />
        </div>
        <h3>可关闭</h3>
        <Notice icon='none' fieldid='notice6' closeable color='alert' onClose={() => console.log('NoticeClose')}>这条通知可以关闭</Notice>
        <h3>超长滚动</h3>
        <Notice fieldid='notice7' icon={<VolumeUp style={{ width: '0.4rem', height: '0.4rem' }}/>} color='alert'>这条通知是一个超长滚动的示例，这条通知是一个超长滚动的示例，这条通知是一个超长滚动的示例</Notice>
        <h3>多行展示</h3>
        <Notice fieldid='notice8' icon={<VolumeUp style={{ width: '0.4rem', height: '0.4rem' }}/>} color='alert' wrap>这条通知是一个多行展示的示例，这条通知是一个多行展示的示例，这条通知是一个多行展示的示例</Notice>
        <h3>弹框公告</h3>
        <Notice fieldid='notice9' onClick={this.onClick} extra={<ArrowIosRight style={{ width: '0.44rem', height: '0.44rem' }}/>}>弹框公告</Notice>
        <Notice fieldid='notice10' mode='modal' title={'弹框公告'} noticeModalShow={this.state.noticeModalShow} onClose={this.onClose} content='这是一条弹框公告'></Notice>
        <h3>自定义</h3>
        <div style={{ height: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Notice fieldid='notice12' icon={<Bell style={{ width: '0.4rem', height: '0.4rem' }}/>} extra={<CloseCircle style={{ width: '0.44rem', height: '0.44rem' }}/>} content='自定义图标' />
          <Notice fieldid='notice13' icon={<VolumeUp style={{ width: '0.4rem', height: '0.4rem' }}/>} content='自定义右侧功能区' extra={this.customExtra()} color='alert' />
        </div>
      </div>
    )
  }
}
