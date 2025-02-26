/**
 * @title 放置非 Button 元素
 * @description 工具栏用法示例
 * @compact true
 */
import React, { Component } from 'react'
import ToolBar from '../src/index'
import { Toast, ActionSheet } from '@tinper/m'
import './demo.less'

export default class Demo0 extends Component<{}, { actions: any, visible: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            actions: []
        }
    }

    afterToast = (index: any) => {
        Toast.show({
            content: 'Click ' + index
        })
    }

    handleClick = (a: any, b: any) => {
        let temp: any = [];
        b.forEach((item: any, index: number) => {
            temp.push({ text: item.props.children, key: index })
        })
        this.setState({ actions: temp, visible: true });
    }
    render() {
        return (
            <div className='toolbar-demo'>
                <h3>非按钮自适应方案：mode=popover</h3>
                <ToolBar className="toolbar-demo3" mode="popover">
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(0)}>演示样例</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(1)}>添加内容</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(2)}>取消编辑</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(3)}>继续添加</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(4)}>复制文字</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(5)}>保存</div>
                </ToolBar>

                <h3>非按钮自适应方案：onDotClick</h3>
                <ToolBar className="toolbar-demo3" onDotClick={(a, b) => this.handleClick(a, b)}>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(0)}>演示样例</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(1)}>添加内容</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(2)}>取消编辑</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(3)}>继续添加</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(4)}>复制文字</div>
                    <div className="toolbar-demo3-div" onClick={() => this.afterToast(5)}>保存</div>
                </ToolBar>
                <ActionSheet
                    actions={this.state.actions}
                    cancelText={'取消'}
                    visible={this.state.visible}
                    onClose={() => this.setState({ visible: false })}
                    onAction={(action: any, index: number) => {
                        console.log("点击了某项", action, index)
                        Toast.show({
                            content: 'Click ' + index
                        })
                        this.setState({ visible: false })
                    }}
                >
                </ActionSheet>
            </div>
        )
    }
}
