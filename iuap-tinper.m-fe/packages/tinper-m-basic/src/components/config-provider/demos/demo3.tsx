/**
 * @title 日期类组件多语
 * @description: ConfigProvider
 */
import React from 'react'
import { ConfigProvider, DateTimePicker, TimeRangePicker, Radio } from '@tinper/m';
import './demo.less';

const Demo = () => {

  const selectData = [
    { value: 'zh-CN', text: '中文简体' },
    { value: 'zh-TW', text: '中文繁体' },
    { value: 'en-US', text: '英语' },
    { value: 'id-ID', text: '印尼语' },
    { value: 'th-TH', text: '泰语' }
  ]

  const [value, setValue] = React.useState('zh-CN')

  const changeLocale = (locale) => {
    ConfigProvider.setTinpermLocaleConfig(locale)
    setValue(locale)
  }

  return (
    <div style={{ height: '100%' }} className="config-demo">
      <div className="demo-item">
        <div title='RadioControl'>
          <Radio.Control
            dataSource={selectData}
            mode='tag'
            className="radio-tag-demo2"
            value={value}
            onSelect={(data) => { changeLocale(data.value) }}
          >
          </Radio.Control>
        </div>
      </div>
      <ConfigProvider>
        <h3>24小时制</h3>
        <DateTimePicker
          className="demo-block"
          mode="second"
        />
        <h3>12小时制</h3>
        <DateTimePicker
          className="demo-block"
          use12Hours
          mode="second"
        />
        <h3>日期范围</h3>
        <TimeRangePicker />
      </ConfigProvider>
    </div>
  )
}

export default Demo;
