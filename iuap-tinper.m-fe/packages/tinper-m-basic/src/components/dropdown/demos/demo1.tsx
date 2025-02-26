/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react'
import { Checkbox, Dropdown, Radio, Selector, Space } from '@tinper/m';

import ArrowDownSFill from '@tinper/m-icons/lib/cjs/ArrowDownSFill'
import './demo.less'

function OneColumnDemo() {
  return (
    <Dropdown>
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1'>
               选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3' className="boundary">
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}

function TwoColumnsDemo() {
  return (
    <Dropdown>
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1'>
                选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3' className="boundary">
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="multiple" title='多选'>
        <div className="dropdown-demos">
          <Checkbox.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Checkbox block value='1'>
                选项1
              </Checkbox>
              <Checkbox block value='2'>
                选项2
              </Checkbox>
              <Checkbox block value='3' className="boundary">
                选项3
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}


function ThreeColumnsDemo() {
  return (
    <Dropdown >
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1'>
                选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3' className="boundary" >
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="multiple" title='多选' >
        <div className="dropdown-demos">
          <Checkbox.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Checkbox block value='1'>
                选项1
              </Checkbox>
              <Checkbox block value='2'>
                选项2
              </Checkbox>
              <Checkbox block value='3' className="boundary">
                选项3
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="group" title='选项组'>
        <div className="dropdown-demos">
          <Selector
            className="demo-item"
            options={[
              {
                label: '选项1',
                value: '1',
              },
              {
                label: '选项2',
                value: '2',
              },
              {
                label: '选项3',
                value: '3',
              },
            ]}
            defaultValue={['1']}
          />
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}

function BottomPopupDemo() {
  return (
    <Dropdown position="bottom">
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1' className="boundary-top">
                选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3'>
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="multiple" title='多选'>
        <div className="dropdown-demos">
          <Checkbox.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Checkbox block value='1' className="boundary-top">
                选项1
              </Checkbox>
              <Checkbox block value='2'>
                选项2
              </Checkbox>
              <Checkbox block value='3'>
                选项3
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}

function LabelDemo() {
  return (
    <Dropdown label>
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1'>
                选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3' className="boundary">
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="multiple" title='多选' >
        <div className="dropdown-demos">
          <Checkbox.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Checkbox block value='1'>
                选项1
              </Checkbox>
              <Checkbox block value='2'>
                选项2
              </Checkbox>
              <Checkbox block value='3' className="boundary">
                选项3
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="group" title='选项组'>
        <div className="dropdown-demos">
          <Selector
            className="demo-item"
            options={[
              {
                label: '选项1',
                value: '1',
              },
              {
                label: '选项2',
                value: '2',
              },
              {
                label: '选项3',
                value: '3',
              },
            ]}
            defaultValue={['1']}
          />
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}

function ArrowDemo() {
  return (
    <Dropdown arrow={<ArrowDownSFill />}>
      <Dropdown.Item key="single" title='单选'>
        <div className="dropdown-demos">
          <Radio.Group defaultValue='1'>
            <Space direction='vertical' block style={{'--gap-vertical': 0}}>
              <Radio block value='1'>
                选项1
              </Radio>
              <Radio block value='2'>
                选项2
              </Radio>
              <Radio block value='3' className="boundary">
                选项3
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}



export default () => {
  return (
    <div className="dropdown-demo">
      <h3>一列</h3>
      <OneColumnDemo />
      <h3>两列</h3>
      <TwoColumnsDemo />
      <h3>三列</h3>
      <ThreeColumnsDemo />
      <h3>底部弹出</h3>
      <BottomPopupDemo />
      <h3>标签</h3>
      <LabelDemo />
      <h3>自定义arrow</h3>
      <ArrowDemo />




    </div>
  )
}
