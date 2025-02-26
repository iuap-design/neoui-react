/**
 * @title 基础用法
 * @description 基础的浮动面板。
 */
import React from 'react'
import { FloatingPanel, List } from '@tinper/m'

const data = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
]

const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8]

export default () => {
  return (
    <>
      <FloatingPanel anchors={anchors} fieldid='floating-panel'>
        <List>
          {data.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      </FloatingPanel>
    </>
  )
}
