/**
 * @title 基础用法
 * @description  基础用法
 */
import React, { useState } from 'react'
import { Picker, Button, Toast } from '@tinper/m'
import { basicColumns } from './columns-data'
import {mockRequest} from "./mockRequest";

// 基础用法
function BasicDemo() {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<(string | null)[]>(['Mon'])
  return (
    <>
      <Button
        size='middle' mode="default"
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={value}
        onConfirm={v => {
          setValue(v)
        }}
      />
    </>
  )
}

// 渲染所选值
function RenderChildrenDemo() {
  const [value, setValue] = useState<(string | null)[]>([])
  return (
    <Picker
      columns={basicColumns}
      value={value}
      onConfirm={setValue}
      showClear
      onSelect={(val, extend) => {
        console.log('onSelect', val, extend.items)
      }}
    >
      {(items, { open }) => {
        return (
          <>
            <Button className="mr-2"  size='middle' mode="default" onClick={open}>选择</Button>
            {items.every(item => item === null)
              ? '未选择'
              : items.map(item => item?.label ?? '未选择').join(' - ')}
          </>
        )
      }}
    </Picker>
  )
}

function ActionsDemo() {
  const [value, setValue] = useState<string[]>([])
  return (
    <Picker
      columns={basicColumns}
      value={value}
      onConfirm={setValue}
    >
      {(_, actions) => <Button  size='middle' mode="default"  onClick={actions.open}>选择</Button>}
    </Picker>
  )
}

function PromptDemo() {
  return (
    <Button
      size='middle' mode="default"
      onClick={async () => {
        const value = await Picker.prompt({
          columns: basicColumns,
        })
        Toast.show(`你选择了 ${value}`)
      }}
    >
      弹出 Picker
    </Button>
  )
}



function StyleDemo() {
  const [visible, setVisible] = useState(false)
  return (
    <>

          <Button
            size='middle' mode="default"
            onClick={() => {
              setVisible(true)
            }}
          >
            选择
          </Button>

        <Picker
          style={{
            '--title-font-size': '13px',
            '--header-button-font-size': '13px',
            '--item-font-size': '13px',
            '--item-height': '30px',
          }}
          defaultValue={['Wed', 'pm']}
          columns={basicColumns}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        />

    </>
  )
}

function LazyLoadColumnsDemo() {
  const [visible, setVisible] = useState(false)
  const [columns, setColumns] = useState<PickerColumn[]>([])
  const [loading, setLoading] = useState(true)

  const handleClick = async () => {
    setVisible(true)
    if (!columns.length) {
      const data = await mockRequest({ delay: 2000 })
      setColumns(data)
      setLoading(false)
    }
  }

  return (
    <>
      <Button   size='middle' mode="default" onClick={handleClick}>懒加载数据</Button>
      <Picker
        loading={loading}
        columns={columns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
    </>
  )
}


export default () => {
  return (
    <>
     <h3>基础用法</h3>
        <BasicDemo />

      <h3>渲染所选值</h3>
        <RenderChildrenDemo />

      <h3>使用 actions 来控制显示/隐藏</h3>
          <ActionsDemo />


      <h3>指令式调用</h3>
      <PromptDemo />

      <h3>自定义样式</h3>
      <StyleDemo />

      <h3>懒加载数据</h3>
      <LazyLoadColumnsDemo />
    </>
  )
}
