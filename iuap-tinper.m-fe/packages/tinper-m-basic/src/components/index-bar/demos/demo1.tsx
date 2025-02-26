/**
 * @title 基础用法
 * @description 序列基础用法示例
 * @compact true
 */
import React, { useEffect, useState } from 'react'
import { IndexBar, List } from '@tinper/m'
import { LoremIpsum } from 'lorem-ipsum'
import './demo.less'

const getRandomList = (min: number, max: number): string[] => {
  return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 3,
  },
  wordsPerSentence: {
    max: 14,
    min: 4,
  },
})
const charCodeOfA = 'A'.charCodeAt(0)
const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: getRandomList(3, 10).map(() => lorem.generateWords(2)),
  }))


export default () => {
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    setTimeout(() => {
      const title = document.getElementById('offsetTop-indexbar');
      title && setHeight(window.innerHeight - title.offsetHeight - title.offsetTop * 2)
    }, 0)
  }, [])

  return (
    <>
      <h3 id='offsetTop-indexbar'>基础用法</h3>
      <div style={{ height: height }}>
        <IndexBar fieldid='fieldid-indexbar-0'>
          {groups.map(group => {
            const { title, items } = group
            return (
              <IndexBar.Panel
                index={title}
                title={`${title}组`}
                key={`${title}组`}
              >
                <List style={{ '--border-inner': 'none' }} className="indexbar-demo-list">
                  {items.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </IndexBar.Panel>
            )
          })}
        </IndexBar>
      </div></>
  )
}
