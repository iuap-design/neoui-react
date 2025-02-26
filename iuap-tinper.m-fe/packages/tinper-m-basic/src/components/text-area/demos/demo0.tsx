/**
 * @title 基础用法
 * @description 多行文本框用法示例
 */
import React, { useState, Component } from 'react'
import { TextArea } from '@tinper/m'
import './demo.less'

interface TextAreaState {
  value0: string
}
export default class Demo0 extends Component<any, TextAreaState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value0: ''
    };
  }

  render() {
    const { value0 } = this.state;
    return (
      <div className='text-area-demo'>
        <h3>基础用法</h3>
        <div className="textarea-demos-wrapper">
          <TextArea
            placeholder='请输入文字'
            value={value0}
            onChange={val => this.setState({ value0: val })}
            fieldid='fieldid-text-area-0'
          />
        </div>

        <h3>指定行数</h3>
        <div className="textarea-demos-wrapper">
          <TextArea placeholder='请输入文字' rows={5} fieldid='fieldid-text-area-1' />
        </div>

        <h3>根据内容自动调整高度</h3>
        <div className="textarea-demos-wrapper">
          <TextArea
            placeholder='根据内容自动调整高度'
            autoSize={{ minRows: 3, maxRows: 5 }}
            fieldid='fieldid-text-area-2'
          />
        </div>

        <h3>字数统计</h3>
        <div className="textarea-demos-wrapper">
          <TextArea defaultValue={'疏影横斜水清浅，暗香浮动月黄昏'} showCount fieldid='fieldid-text-area-3' />
        </div>

        <h3>字数限制</h3>
        <div className="textarea-demos-wrapper">
          <TextArea
            defaultValue={'疏影横斜水清浅，暗香浮动月黄昏'}
            showCount
            maxLength={30}
            fieldid='fieldid-text-area-4'
            showClose
          />
        </div>

        <h3>禁用状态</h3>
        <div className="textarea-demos-wrapper">
          <TextArea
            placeholder='请输入内容'
            defaultValue={'疏影横斜水清浅，暗香浮动月黄昏'}
            disabled
            fieldid='fieldid-text-area-5'
          />
        </div>

        <h3>只读状态</h3>
        <div className="textarea-demos-wrapper">
          <TextArea
            placeholder='请输入内容'
            value={'疏影横斜水清浅，暗香浮动月黄昏'}
            readOnly
            fieldid='fieldid-text-area-6'
          />
        </div>
      </div>
    )
  }
}
