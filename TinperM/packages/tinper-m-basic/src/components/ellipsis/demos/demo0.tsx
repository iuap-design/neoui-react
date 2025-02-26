/**
 * @title 基础用法
 * @description: 文本省略-基础用法
 */
import React from 'react'
import { Ellipsis } from '@tinper/m'
import ArrowIosDown from '@tinper/m-icons/lib/cjs/ArrowIosDown'
import ArrowIosUp from '@tinper/m-icons/lib/cjs/ArrowIosUp'
import './demo.less'

const content =
  'YonDesign是一套企业级设计系统。基于用友多年企业级产品的成功经验并结合业内最新技术及设计趋势，以B端各类角色、场景、业务为基础，沉淀出一整套设计语言、方法、规范及模式，包括：设计原则与方法、基础视觉规范、基础组件、业务组件、布局、界面模式及应用案例等，并沉淀不同领域、行业的的设计规范和案例。'

const demoBlockCls = 'ellipsis-demo-block'
export default () => {
  return (
    <>
      <h3>尾部省略</h3>
      <div className={demoBlockCls}>
        <Ellipsis direction='end' content={content} />
      </div>

      <h3>头部省略</h3>
      <div className={demoBlockCls}>
        <Ellipsis direction='start' content={content} />
      </div>

      <h3>中间省略</h3>
      <div className={demoBlockCls}>
        <Ellipsis direction='middle' content={content} />
      </div>

      <h3>多行省略</h3>
      <div className={demoBlockCls}>
        <Ellipsis direction='end' rows={3} content={content} />
      </div>

      <h3>展开收起</h3>
      <div className={demoBlockCls}>
        <Ellipsis
          direction='end'
          content={content}
          expandText='展开'
          collapseText='收起'
        />
      </div>

      <h3>仅展开</h3>
      <div className={demoBlockCls}>
          <Ellipsis direction='end' content={content} expandText='展开' />
          <Ellipsis direction='start' content={content} expandText='展开' />
          <Ellipsis direction='middle' content={content} expandText='展开' />
      </div>

      <h3>默认展开</h3>
      <div className={demoBlockCls}>
        <Ellipsis
          content={content}
          defaultExpanded={true}
          expandText='展开'
          collapseText='收起'
        />
      </div>

      <h3>展开收起</h3>
      <div className={demoBlockCls}>
        <Ellipsis
          direction='end'
          content={
            '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥'
          }
          expandText='展开'
          collapseText='收起'
        />
      </div>

      <h3>带图标</h3>
      <div className={demoBlockCls}>
        <Ellipsis
          direction='end'
          content={content}
          expandText={
            <>
              展开
              <ArrowIosDown />
            </>
          }
          collapseText={
            <>
              收起
              <ArrowIosUp />
            </>
          }
        />
      </div>
    </>
  )
}
