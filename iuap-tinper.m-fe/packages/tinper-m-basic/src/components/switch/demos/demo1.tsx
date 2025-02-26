/**
 * @title 基础用法
 * @description 基础用法
 */

import React from 'react'
import { Switch, Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'

import './demo.less'

export default function Demo1 () {

  return (
    <div className="switch-demos">
      <div className="title">基础开关</div>
      <div className="item">
        <div className="label">基础开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch1"
          defaultChecked={true}
          beforeChange={(checked: boolean) => {
            console.log('switch beforeChange', checked)}}
          onChange={(checked: boolean) => {
            console.log('switch change', checked)}}/>
      </div>
      <div className="item">
        <div className="label">基础开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch1"
          defaultChecked={false}
          beforeChange={(checked: boolean) => {
            console.log('switch beforeChange', checked)}}
          onChange={(checked: boolean) => {
            console.log('switch change', checked)}}/>
      </div>

      <div className="title">带描述开关</div>
      <div className="item">
        <div className="label">带文字开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch2"
          checkedText="开"
          uncheckedText="关"
          defaultChecked={true}
        />
      </div>
      <div className="item">
        <div className="label">带文字开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch2"
          checkedText="开"
          uncheckedText="关"
          defaultChecked={false}
        />
      </div>

      <div className="title">带图标开关</div>
      <div className="item">
        <div className="label">带图标开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch3"
          checkedText={<Icon fieldid='icon_1' type='arccheckmark' color='#ffffff' style={{ width: '0.2rem' }} />}
          uncheckedText={<Icon fieldid='icon_2' type='arcclose' color='#999999' style={{ width: '0.2rem' }} />}
          defaultChecked={true}
        />
      </div>
      <div className="item">
        <div className="label">带图标开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch3"
          checkedText={<Icon fieldid='icon_1' type='arccheckmark' color='#ffffff' style={{ width: '0.2rem' }} />}
          uncheckedText={<Icon fieldid='icon_2' type='arcclose' color='#999999' style={{ width: '0.2rem' }} />}
          defaultChecked={false}
        />
      </div>

      <div className="title">自定义颜色开关</div>
      <div className="item">
        <div className="label">自定义颜色开关</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch4"
          defaultChecked={true}
          style={{
            '--checked-color': '#18B681',
          }}
        />
      </div>

      <div className="title">加载状态</div>
      <div className="item">
        <div className="label">加载状态</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch7"
          defaultChecked={true}
          loading
        />
      </div>
      <div className="item">
        <div className="label">加载状态</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch8"
          loading
        />
      </div>

      <div className="title">禁用状态</div>
      <div className="item">
        <div className="label">禁用状态</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch5"
          defaultChecked={true}
          disabled
        />
      </div>
      <div className="item">
        <div className="label">禁用状态</div>
        <Switch
          className="test-switch"
          fieldid="testSwitch6"
          disabled
        />
      </div>
    </div>
  )
}
