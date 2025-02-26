/**
 * @title 基础用法
 * @description: 基础用法
 */
import React, { useState } from 'react'
import { Button, WaterMark } from '@tinper/m'
import tinperm from './tinperm.png'

import './demo1.less'

const textProps = {
  content: 'Tinper-M',
}

const rowsTextProps = {
  content: ['Tinper-M', 'Tinper-M Pro'],
}

const imageProps = {
  image: tinperm,
  imageWidth: 115,
  imageHeight: 36,
  width: 140,
  height: 80,
}

export default () => {
  const [props, setProps] = useState<{ [key: string]: any }>(textProps)

  return (
    <div className='water-mark-overlay'>
      <Button onClick={() => setProps(textProps)}>普通水印</Button>
      <br />
      <Button onClick={() => setProps(rowsTextProps)}>多行文字水印</Button>
      <br />
      <Button onClick={() => setProps(imageProps)}>图片水印</Button>
      <WaterMark {...props} fieldid='water-mark1'/>
    </div>
  )
}
