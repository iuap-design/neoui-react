/**
 * @title 均分用法
 * @description 工具栏用法示例
 * @compact true
 */
import React, { Component } from 'react'
import ToolBar from '../src/index'
import { Button } from '@tinper/m'
import './demo.less'
import { PlusCircle, IconScanning } from '@tinper/m-icons'
import '@tinper/m-icons/lib/iconfont/iconfont.js'

export default class Demo2 extends Component {

  render() {
    return (
      <div className='toolbar-demo'>
        <h3>均分默认最大显示数量</h3>
        <ToolBar className="toolbar-demo0" buttonWidthAuto >
          <Button icon={<PlusCircle style={{ width: "0.44rem", height: "0.44rem", color: "#EE2233" }} />}>添加物料</Button>
          <Button icon={<IconScanning style={{ width: "0.44rem", height: "0.44rem", color: "#EE2233" }} />}>扫码添加</Button>
          <Button >确认</Button>
          <Button >复制</Button>
          <Button >保存</Button>
        </ToolBar>

        <h3>只有一个子元素</h3>
        <ToolBar className="toolbar-demo0" buttonWidthAuto>
          <Button >添加</Button>
        </ToolBar>

        <h3>子元素数量小于最大显示数</h3>
        <ToolBar className="toolbar-demo0" buttonWidthAuto maxVisibleNum={4}>
          <Button >继续添加</Button>
          <Button >复制</Button>
          <Button >保存</Button>
        </ToolBar>

        <h3>mode 设置为 popover</h3>
        <ToolBar className="toolbar-demo0" buttonWidthAuto maxVisibleNum={3} mode="popover">
          <Button >确认</Button>
          <Button >取消</Button>
          <Button >继续添加</Button>
          <Button >复制</Button>
          <Button >保存</Button>
        </ToolBar>
      </div>
    )
  }
}
