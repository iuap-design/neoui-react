/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useRef } from 'react'
import { Button, Dropdown, Radio, Space } from '@tinper/m';
import './demo.less'


function RefDemo() {
  const ref = useRef(null)

  return (
    <Dropdown ref={ref}>
      <Dropdown.Item key="single" title="单选">
        <div className="dropdown-demos">
          <Radio.Group defaultValue="1">
            <Space direction="vertical" block style={{ '--gap-vertical': 0 }}>
              <Radio block value="1" >
                选项1
              </Radio>
              <Radio block value="2">
                选项2
              </Radio>
              <Radio block value="3" className="boundary">
                选项3
              </Radio>
            </Space>
          </Radio.Group>
          <div className="border flex justify-center items-center  py-1">
            <Button type="primary" className="w-full" onClick={() => ref.current?.close()}>确定</Button>
          </div>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}

function DisableCloseDemo() {
  return (
    <Dropdown closeOnMaskClick={false}>
      <Dropdown.Item key="single" title="单选">
        <div className="dropdown-demos">
          <Radio.Group defaultValue="1">
            <Space direction="vertical" block style={{ '--gap-vertical': 0 }}>
              <Radio block value="1" >
                选项1
              </Radio>
              <Radio block value="2">
                选项2
              </Radio>
              <Radio block value="3" className="boundary">
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
    <>

      <h3>避免自动关闭</h3>
      <DisableCloseDemo/>
      <h3>点击内部按钮隐藏</h3>
      <RefDemo/>


    </>
  )
}
