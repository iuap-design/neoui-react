/**
 * @title 基础用法
 * @description Steps 步骤条
 */

import React from 'react'
import { Button, Icon, Steps } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo1.less'

const { Step } = Steps

export default () => {
  return (
    <div className='steps-demos'>
      <h3>基础用法</h3>
      <div className="item">
        <Steps current={1} fieldid="steps0">
          <Step title='已完成' description='副标题' />
          <Step title='进行中' description='副标题' />
          <Step title='未开始' description='副标题' />
        </Steps>
      </div>

      <h3>横向失败</h3>
      <div className="item">
        <Steps current={1} fieldid="steps1">
          <Step title='已完成' />
          <Step title='状态异常' status='error' />
          <Step title='未开始' />
        </Steps>
      </div>

      <h3>纵向步骤条</h3>
      <div className="item">
        <Steps direction='vertical' current={2} fieldid="steps2">
          <Step
            title='第一步'
            status='finish'
            description='完成时间：2020-12-01 12:30'
          />
          <Step
            title='第二步'
            status='finish'
            description='完成时间：2020-12-01 12:30'
          />
          <Step
            title='内容标题内容标题内容'
            description='计划时间：2020-12-03 12:30'
          />
          <Step
            title='第四步'
            description='计划时间：2020-12-03 12:30'
          />
        </Steps>
      </div>

      <h3>纵向失败</h3>
      <div className="item">
        <Steps direction='vertical' current={2} fieldid="steps3">
          <Step
            title='第一步'
            status='finish'
            description='完成时间：2020-12-01 12:30'
          />
          <Step
            title='第二步'
            status='finish'
            description='完成时间：2020-12-01 12:30'
          />
          <Step
            title='状态异常'
            status='error'
            description='计划时间：2020-12-03 12:30'
          />
          <Step
            title='第四步'
            description='计划时间：2020-12-03 12:30'
          />
        </Steps>
      </div>

      <h3>自定义图标及大小</h3>
      <div className="item">
        <Steps
          fieldid="steps4"
          direction='vertical'
          current={1}
          style={{
            '--title-font-size': '0.32rem',
            '--description-font-size': '0.24rem',
            '--indicator-margin-right': '0.24rem',
            '--vertical-indicator-width': '0.4rem',
          }}
        >
          <Step
            title='转移申请'
            description='2022-03-10'
            icon={<Icon style={{ width: '0.4rem' }} type="arccheckmark-circle-Fill" />}
          />
          <Step
            title='维修申请'
            description={
              <div block direction='vertical'>
                <div>2022-03-12</div>
                <Button mode="default" size='middle' style={{ marginTop: '0.14rem' }}>查看</Button>
              </div>
            }
            icon={<Icon style={{ width: '0.4rem' }} type="arcclock-Fill" />}
          />
          <Step
            title='领用申请'
            description='2022-03-12'
            icon={<Icon style={{ width: '0.4rem' }} type="arcminus-circle" />}
          />
        </Steps>
      </div>

      <h3>数据显示</h3>
      <div className="item">
        <Steps current={1} fieldid="steps5">
          <Step title='已完成' />
          <Step title='进行中字数最过多折行' />
          <Step title='未开始' />
        </Steps>
      </div>
      <div className="item">
        <Steps current={1} fieldid="steps6">
          <Step title='已完成' description={'副标题'} />
          <Step title='进行中' description={'副标题文字超出折行显示'} />
          <Step title='未开始' description={'副标题'} />
        </Steps>
      </div>

      <h3>4项内平铺</h3>
      <div className="item">
        <Steps current={0} fieldid="steps7">
          <Step title='进行中' />
          <Step title='未开始' />
        </Steps>
      </div>
      <div className="item">
        <Steps current={1} fieldid="steps8">
          <Step title='已完成' />
          <Step title='状态异常' status='error' />
          <Step title='未开始' />
        </Steps>
      </div>
      <div className="item">
        <Steps current={1} fieldid="steps9">
          <Step title='已完成' />
          <Step title='进行中' />
          <Step title='未开始' />
          <Step title='未开始' />
        </Steps>
      </div>

      <h3>4项以上滑动扩展</h3>
      <div className="item" style={{ height: '1.54rem' }}>
        <Steps current={1} fieldid="steps10">
          <Step title='已完成' />
          <Step title='进行中' />
          <Step title='未开始' />
          <Step title='未开始' />
          <Step title='未开始' />
          <Step title='未开始' />
        </Steps>
      </div>

    </div>
  )
}
