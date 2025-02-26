/**
 * @title Popover 带关闭按钮
 * @description Popover 带关闭按钮
 */
import './demo.less';
import React, { useState } from 'react'
import { Popover, Button } from '@tinper/m';
import Close from '@tinper/m-icons/lib/cjs/Close'
function SingleLine() {
  const [visible, setVisible] = useState(true)

  return (
    <Popover
      content={
        <div className='popover-demo singleLineContent'>
          <div>单行文字推荐关闭按钮居中</div>
          <div
            className='closeIcon'
            onClick={() => {
              setVisible(false)
            }}
          >
            <Close />
          </div>
        </div>
      }
      placement='bottom-start'
      mode='dark'
      visible={visible}
    >
      <Button onClick={() => {
        setVisible(v => !v)
      }}>Open Popover</Button>
    </Popover>
  )
}

function MultipleLine() {
  const [visible, setVisible] = useState(true)

  return (
    <Popover
      content={
        <div className="popover-demo multiLineContent">
          <div>
            多行文字推荐关闭按钮
            <br />
            竖直方向上居中
          </div>
          <div
            className="closeIcon"
            onClick={() => {
              setVisible(false)
            }}
          >
            <Close />
          </div>
        </div>
      }
      placement='bottom-start'
      mode='dark'
      visible={visible}
    >
      <Button onClick={() => {
        setVisible(v => !v)
      }}>Open Popover</Button>

    </Popover>
  )
}


const Demo = () => (
  <div className="popover-demo">
    <>
      <h3>单行文字推荐关闭按钮居中</h3>
      <SingleLine />
    </>
    <>
      <h3>多行文字推荐关闭按钮竖直方向上居中</h3>
      <MultipleLine />
    </>


  </div>
)

export default Demo
