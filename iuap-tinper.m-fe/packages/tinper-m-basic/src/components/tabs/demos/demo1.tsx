/**
 * @title 基础用法
 * @description 多页签基础示例
 * @compact true
 */
import React from 'react'
import { Tabs, Badge, TabPane } from '@tinper/m'
import './demo.less'

export default () => {
  return (
    <div className='tabs-demo'>
      <h3>基础用法</h3>
      <Tabs fieldid='fieldid-tabs-0'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
      </Tabs>

      <h3>均分</h3>
      <Tabs stretch fieldid='fieldid-tabs-1'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
      </Tabs>

      <h3>下划线跟随文字长度</h3>
      <Tabs activeLineMode='auto' fieldid='fieldid-tabs-2'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
      </Tabs>

      <h3>自定义字号大小</h3>
      <Tabs style={{ '--active-title-font-size': '0.26rem' }} fieldid='fieldid-tabs-3'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
      </Tabs>

      <h3>自定义样式</h3>
      <Tabs decoration='dotLine' fieldid='fieldid-tabs-4'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
      </Tabs>

      <h3>禁用状态</h3>
      <Tabs fieldid='fieldid-tabs-5'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' disabled />
      </Tabs>

      <h3>搭配 Badge</h3>
      <Tabs fieldid='fieldid-tabs-6'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab
          title={
            <Badge content="3" style={{ '--right': '-0.2rem', '--top': '0.16rem' }}>页签选项</Badge>
          }
          key='2'
        />
      </Tabs>

      <h3>超长自然滚动</h3>
      <Tabs fieldid='fieldid-tabs-7'>
        <Tabs.Tab title='页签选项' key='0' />
        <Tabs.Tab title='页签选项' key='1' />
        <Tabs.Tab title='页签选项' key='2' />
        <Tabs.Tab title='页签选项' key='3' />
        <Tabs.Tab title='页签选项' key='4' />
        <Tabs.Tab title='页签选项' key='5' />
      </Tabs>

      <h3>带内容区</h3>
      <Tabs fieldid='fieldid-tabs-8' style={{ '--content-padding': '0.32rem' }}>
        <Tabs.Tab title='页签选项' key='0'>
          <div className="tabs-content-demo">
            内容区0
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='页签选项' key='1'>
          <div className="tabs-content-demo">
            内容区1
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='页签选项' key='2'>
          <div className="tabs-content-demo">
            内容区2
          </div>
        </Tabs.Tab>
      </Tabs>

      <h3>带分割线</h3>
      <Tabs className='tabs-border-demo' fieldid='fieldid-tabs-9' style={{ '--content-padding': '0.32rem' }}>
        <Tabs.Tab title='页签选项' key='0'>
          <div className="tabs-content-demo">
            内容区0
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='页签选项' key='1'>
          <div className="tabs-content-demo">
            内容区1
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='页签选项' key='2'>
          <div className="tabs-content-demo">
            内容区2
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
