/**
 * @title 锚点定位
 * @description 锚点定位示例
 * @compact true
 */
import React, { useEffect, useRef, useState } from 'react'
import { SideBar } from '@tinper/m'
import { useThrottleFn } from 'tne-fw-fe/hooks'
import './demo4.less'

const items = [
  { key: '1', title: '第一项', text: "First paragraph. " + "React lets you build user interfaces out of individual pieces called components. ".repeat(30) },
  { key: '2', title: '第二项', text: "Second paragraph. " + "Then combine them into entire screens, pages, and apps. ".repeat(35) },
  { key: '3', title: '第三项', text: "Third paragraph. " + "React lets you build user interfaces out of individual pieces called components. ".repeat(30) },
  { key: '4', title: '第四项', text: "Fourth paragraph. " + "Then combine them into entire screens, pages, and apps. ".repeat(44) },
]

export default () => {
  const [activeKey, setActiveKey] = useState('1')

  const { run: handleScroll } = useThrottleFn(
    () => {
      let currentKey = items[0].key
      for (const item of items) {
        const element = document.getElementById(`anchor-${item.key}`)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (rect.top <= document.getElementsByClassName('sidebar-demo-main-f')[0]?.offsetTop) {
          currentKey = item.key
        } else {
          break
        }
      }
      setActiveKey(currentKey)
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  )

  const mainElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mainElement = mainElementRef.current
    if (!mainElement) return
    mainElement.addEventListener('scroll', handleScroll)
    return () => {
      mainElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='sidebar-demo-container-f'>
      <div className='sidebar-demo-side-f'>
        <SideBar
          activeKey={activeKey}
          onChange={(key) => {
            let firstEle = document.getElementById('anchor-1')?.getBoundingClientRect();
            let secondEle = document.getElementById('anchor-2')?.getBoundingClientRect();
            let thirdEle = document.getElementById('anchor-3')?.getBoundingClientRect();
            if (firstEle && secondEle && thirdEle) {
              const obj = {
                  '1': 0,
                  '2': firstEle.height,
                  '3': firstEle.height + secondEle.height,
                  '4': firstEle.height + secondEle.height + thirdEle.height
              }
              document.getElementsByClassName('sidebar-demo-main-f')[0].scrollTop = obj[key];
          }
          }}
        >
          {items.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>
      <div className='sidebar-demo-main-f' ref={mainElementRef}>
        {items.map(item => (
          <div key={item.key} id={`anchor-${item.key}`}>
            <h2>{item.title}</h2>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
