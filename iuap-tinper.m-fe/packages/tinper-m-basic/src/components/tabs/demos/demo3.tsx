/**
 * @title 锚点定位
 * @description 锚点定位示例
 * @compact true
 */
import React, { useEffect, useState } from 'react'
import { Tabs } from '@tinper/m'
import { useThrottleFn } from 'tne-fw-fe/hooks'
import './demo.less'

const tabItems = [
    { key: '1', title: '第一项', text: "First paragraph. " + "React lets you build user interfaces out of individual pieces called components. ".repeat(30) },
    { key: '2', title: '第二项', text: "Second paragraph. " + "Then combine them into entire screens, pages, and apps. ".repeat(35) },
    { key: '3', title: '第三项', text: "Third paragraph. " + "React lets you build user interfaces out of individual pieces called components. ".repeat(30) },
    { key: '4', title: '第四项', text: "Fourth paragraph. " + "Then combine them into entire screens, pages, and apps. ".repeat(44) },
]

export default () => {
    const [activeKey, setActiveKey] = useState('1')
    const [tabHeight, setTabHeight] = useState(38)

    const { run: handleScroll } = useThrottleFn(
        () => {
            let currentKey = tabItems[0].key
            for (const item of tabItems) {
                const element = document.getElementById(`anchor-${item.key}`)
                const eleList = document.getElementById(`tabs-list`);
                if (!element || !eleList) continue
                const rect = element.getBoundingClientRect()
                const rectList = eleList.getBoundingClientRect().height;
                setTabHeight(rectList)
                if (rect.top <= (rectList + 2)) {
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className='tabs-demo tabs-demo3'>
            <h3>锚点定位</h3>
            <div className='tabs-anchor-tabsContainer'>
                <Tabs
                    fieldid='fieldid-tabs-11'
                    activeKey={activeKey}
                    onChange={key => {
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
                            const padding = secondEle.top - firstEle.top - firstEle.height;
                            const _offsetHeight = document.getElementsByClassName("tabs-anchor-tabsContainer")[0] as HTMLElement;
                            const offsetHeight = _offsetHeight.offsetHeight;
                            const _offsetTop = document.getElementsByClassName("tabs-anchor-content")[0] as HTMLElement;
                            const offsetTop = _offsetTop.offsetTop
                            document.getElementsByTagName('html')[0].scrollTop = obj[key] + padding * Number(key) + offsetTop - offsetHeight;
                        }
                    }}
                >
                    {tabItems.map(item => (
                        <Tabs.Tab title={item.title} key={item.key} />
                    ))}
                </Tabs>
            </div>
            <div className='tabs-anchor-content'>
                {tabItems.map(item => (
                    <div key={item.key} className="bg" id={`anchor-${item.key}`}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
}