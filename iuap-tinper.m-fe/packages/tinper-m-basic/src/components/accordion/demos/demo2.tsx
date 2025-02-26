/**
 * @title 进阶用法
 * @description 组件示例
 */
import React, { useState, useEffect } from 'react'
import { Accordion, Loading } from '@tinper/m'
import { sleep } from '@utils/Sleeps'
import {
  CheckmarkCircle,
  CloseCircle,
  ArrowCircleDown,
  Plus,
  Minus,
} from '@tinper/m-icons'

const DynamicContent = () => {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      await sleep(1000)
      setFinished(true)
    }
    loadData()
  }, [])

  return finished ? (
    <>处理成功</>
  ) : (
    <Loading type='dotloading' />
  )
}

export default () => {
  return (
    <>
      <h3>禁用</h3>
      <Accordion>
        <Accordion.Panel key='1' title='第一项'>
          这里是第一项的内容
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项' disabled>
          这里是第二项的内容
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项' disabled>
          这里是第三项的内容
        </Accordion.Panel>
      </Accordion>

      <h3>自定义折叠图标</h3>
      <Accordion
        defaultActiveKey={['1']}
        arrow={active => (active ? <Minus /> : <Plus />)}
      >
        <Accordion.Panel key='1' title='第一项'>
          你可以通过 Accordion 的 arrow 属性来控制全部面板的箭头
        </Accordion.Panel>
        <Accordion.Panel
          key='2'
          title='第二项'
          arrow={<ArrowCircleDown />}
        >
          也可以通过 Accordion.Panel 的 arrow 属性来自定义单个面板的箭头
        </Accordion.Panel>
        <Accordion.Panel
          key='3'
          title='第三项'
          arrow={active =>
            active ? <CheckmarkCircle /> : <CloseCircle />
          }
        >
          如果你给 arrow 属性传入的是是一个渲染函数，那么 TinperM
          不会为你增加动画，arrow 属性的效果就完全交由你自己来控制了
        </Accordion.Panel>
      </Accordion>

      <h3>动态内容</h3>
      <Accordion accordion>
        <Accordion.Panel key='1' title='第一项'>
          <DynamicContent />
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          <DynamicContent />
        </Accordion.Panel>
      </Accordion>
    </>
  )
}
