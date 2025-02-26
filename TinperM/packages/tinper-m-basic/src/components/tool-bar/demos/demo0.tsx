/**
 * @title 基础用法
 * @description 工具栏用法示例
 * @compact true
 */
import React, { Component } from 'react'
import ToolBar from '../src/index'
import { Button, Toast } from '@tinper/m'
import './demo.less'

export default class Demo0 extends Component {
  afterToast = (index) => {
    Toast.show({
      content: 'Click ' + index
    })
  }
  render() {
    return (
      <div className='toolbar-demo'>
        <h3>超出工具栏长度默认自适应</h3>
        <ToolBar className="toolbar-demo0" fieldid='fieldid-toolbar-0' >
          <Button mode='default' size='middle'>添加</Button>
          <Button mode='default' size='middle'>取消</Button>
          <Button mode='default' size='middle'>继续添加</Button>
          <Button mode='default' size='middle'>复制</Button>
          <Button mode='primary' size='middle'>保存</Button>
        </ToolBar>

        <h3>按钮收起样式 popover 模式</h3>
        <ToolBar
          placement="bottom"
          mode='popover'
          className="toolbar-demo1"
          fieldid='fieldid-toolbar-1'
          onSelect={(node, index) => {
            Toast.show({
              content: 'Click ' + index
            })
            console.log(node, index)
          }}
        >
          <Button mode='default' size='middle'>添加</Button>
          <Button mode='default' size='middle'>取消</Button>
          <Button mode='default' size='middle'>继续添加</Button>
          <Button mode='default' size='middle'>复制</Button>
          <Button mode='primary' size='middle'>保存</Button>
        </ToolBar>

        <h3>maxVisibleNum小于工具栏长度</h3>
        <ToolBar className="toolbar-demo0" maxVisibleNum={2}>
          <Button mode='default' size='middle'>添加</Button>
          <Button mode='default' size='middle'>取消</Button>
          <Button mode='default' size='middle'>继续添加</Button>
          <Button mode='default' size='middle'>复制</Button>
          <Button mode='primary' size='middle'>保存</Button>
        </ToolBar>

        <h3>maxVisibleNum超出工具栏长度</h3>
        <ToolBar className="toolbar-demo0" maxVisibleNum={4}>
          <Button mode='default' size='middle'>添加</Button>
          <Button mode='default' size='middle'>取消</Button>
          <Button mode='default' size='middle'>继续添加</Button>
          <Button mode='default' size='middle'>复制</Button>
          <Button mode='primary' size='middle'>保存</Button>
        </ToolBar>
      </div>
    )
  }
}
