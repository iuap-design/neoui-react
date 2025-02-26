/**
 * @title 默认位置
 * @description 序列默认位置示例
 * @compact true
 */
import React, { useEffect, useRef, useState } from 'react'
import { IndexBar, List } from '@tinper/m'
import { LoremIpsum } from 'lorem-ipsum'
import { IndexBarRef } from '../src/iIndexBar'
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
  const indexBarRef = useRef<IndexBarRef>(null)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    setTimeout(() => {
      indexBarRef.current?.scrollTo(groups[4].title)
    }, 0)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const title = document.getElementById('offsetTop-indexbar');
      title && setHeight(window.innerHeight - title.offsetHeight - title.offsetTop * 2)
      console.log(111, document.getElementById('offsetTop-indexbar')?.offsetTop);
    }, 100)
  }, [])

  return (
    <>
      <h3 id='offsetTop-indexbar'>默认位置</h3>
      <div style={{ height: height }}>
        <IndexBar ref={indexBarRef} fieldid='fieldid-indexbar-1'>
          {groups.map(group => {
            const { title, items } = group
            return (
              <IndexBar.Panel
                index={title}
                title={`标题${title}`}
                key={`标题${title}`}
              >
                <List style={{ '--padding-left': '0.24rem', '--border-inner': 'none' }} className="indexbar-demo-list">
                  {items.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </IndexBar.Panel>
            )
          })}
        </IndexBar>
      </div>
    </>

  )
}
