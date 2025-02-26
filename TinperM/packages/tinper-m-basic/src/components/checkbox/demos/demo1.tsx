/**
 * @title 基础用法
 * @description 基础用法
 */

import React, { useState } from 'react'
import { Checkbox, Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'

import './demo1.less'

export default function Demo1() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className='checkbox-demos'>
      <h3>基础用法</h3>
      <div className="checkbox-item">
        <div>
          <Checkbox fieldid='checkbox1'>复选框</Checkbox>
        </div>
      </div>

      <h3>默认选中</h3>
      <div className="checkbox-item">
        <div>
          <Checkbox defaultChecked content="复选框" fieldid='checkbox2'></Checkbox>
        </div>
      </div>

      <h3>占满整行宽度</h3>
      <Checkbox.Group fieldid='checkboxgroup1'>
        <div className="checkbox-item margin-0">
          <Checkbox value='1' block className="blockIndicator" fieldid='checkbox3'>
            块级元素
          </Checkbox>
        </div>
        <div className="checkbox-item">
          <Checkbox value='2' className="blockIndicator" fieldid='checkbox4'>
            非块级元素
          </Checkbox>
        </div>
      </Checkbox.Group>

      <h3>全选和半选</h3>
      <div>
        <DemoIndeterminate />
      </div>

      <h3>自定义图标</h3>
      <div className="checkbox-item">
        <div>
          <Checkbox
            value='6'
            icon={checked =>
              checked ? (
                <Icon fieldid='icon_2' type='archeart' color='#EE2233' />
              ) : (
                <Icon fieldid='icon_2' type='archeart' color='#000000' />
              )
            }
            fieldid='checkbox5'
          >
            自定义图标
          </Checkbox>
        </div>
      </div>

      <h3>自定义大小</h3>
      <div className="space-vertical">
        <Checkbox.Group defaultValue={['middle']} fieldid='checkboxgroup2'>
          <Checkbox
            value='small'
            style={{
              '--icon-size': '14px',
              '--font-size': '15px',
              '--gap': '4px',
            }}
            fieldid='checkbox6'
          >
            小
          </Checkbox>
          <Checkbox
            value='middle'
            style={{
              '--icon-size': '18px',
              '--font-size': '15px',
              '--gap': '8px',
            }}
            fieldid='checkbox7'
          >
            中
          </Checkbox>
          <Checkbox
            value='large'
            style={{
              '--icon-size': '22px',
              '--font-size': '15px',
              '--gap': '8px',
            }}
            fieldid='checkbox8'
          >
            大
          </Checkbox>
        </Checkbox.Group>
      </div>

      <h3>禁用状态</h3>
      <div className="checkbox-item">
        <Checkbox defaultChecked disabled fieldid='checkbox9'>
          禁用状态
        </Checkbox>
      </div>

      <h3>复选框组禁用</h3>
      <div className="space-vertical">
        <Checkbox.Group fieldid='checkboxgroup3'
          disabled
          value={['1', '2']}
        >
          <Checkbox value='1' fieldid='checkbox10'>第一项</Checkbox>
          <Checkbox value='2' fieldid='checkbox11'>第二项</Checkbox>
          <Checkbox value='3' fieldid='checkbox12'>第三项</Checkbox>
        </Checkbox.Group>
      </div>

      <h3>方型全选和半选</h3>
      <div>
        <Demo2Indeterminate />
      </div>

      <h3>方型复选框组禁用</h3>
      <div className="space-vertical">
        <Checkbox.Group fieldid='checkboxgroup4'
          disabled
          value={['1', '2']}
        >
          <Checkbox type="square" value='1' fieldid='checkbox13'>第一项</Checkbox>
          <Checkbox type="square" value='2' fieldid='checkbox14'>第二项</Checkbox>
          <Checkbox type="square" value='3' fieldid='checkbox15'>第三项</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  )
}

const DemoIndeterminate = () => {
  const items = [
    {
      value: '1',
      label: '第一项',
    },
    {
      value: '2',
      label: '第二项',
    },
    {
      value: '3',
      label: '第三项',
    }
  ]
  const [value, setValue] = useState(['2'])
  return (
    <div className="space-vertical">
      <Checkbox
        indeterminate={value.length > 0 && value.length < items.length}
        checked={value.length === items.length}
        onChange={checked => {
          if (checked) {
            setValue(items.map(item => item.value))
          } else {
            setValue([])
          }
        }}
      >
        半选
      </Checkbox>
      <Checkbox.Group
        value={value}
        onChange={v => {
          setValue(v as string[])
        }}
      >
        {items.map(item => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )
}

const Demo2Indeterminate = () => {
  const items = [
    {
      value: '1',
      label: '第一项',
    },
    {
      value: '2',
      label: '第二项',
    },
    {
      value: '3',
      label: '第三项',
    }
  ]
  const [value, setValue] = useState(['2'])
  return (
    <div className="space-vertical">
      <Checkbox
        type="square"
        indeterminate={value.length > 0 && value.length < items.length}
        checked={value.length === items.length}
        onChange={checked => {
          if (checked) {
            setValue(items.map(item => item.value))
          } else {
            setValue([])
          }
        }}
      >
        半选
      </Checkbox>
      <Checkbox.Group
        value={value}
        onChange={v => {
          setValue(v as string[])
        }}
      >
        {items.map(item => (
          <Checkbox type="square" key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )
}
