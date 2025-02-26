/**
 * @title 基础用法
 * @description: 表格-基础用法
 * @compact true
 */
import React, { useState, useReducer } from 'react'
import { Table, Switch, Radio, Tag } from '@tinper/m'
import { mockRequest, makeOrderData } from './mockData'
export const COLUMNS = [
  {
    header: '序号',
    key: 'order',
    horizontalAlign: 'left',
    cell: info => info.row.index + 1,
    size: 52
  },
  {
    header: '订单编号',
    key: 'orderId',
    textDisplayMode: 'ellipsis',
    size: 78,
  },
  {
    header: '供应商名称',
    key: 'providerName',
    size: 88,
  },
  {
    header: '交易类型',
    key: 'transactionType',
    cell: info => <Tag color='primary' fill='solid' label={{0: '普通', 1: '紧急', 2: '超期'}[info.getValue()]} />,
    size: 80,
  },
  {
    header: '金额',
    key: 'price',
    horizontalAlign: 'right',
    size: 78,
  },
  {
    header: '组织名称',
    key: 'org',
    size: 78,
  },
]

export default () => {
  const [columns, setColumns] = useState(COLUMNS)
  // const [data, setData] = useState(defaultData)
  const [data, setData] = useState<String[]>([])
  const [cacheData, setCacheData] = useState<String[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [verticalSplitline, setVerticalSplitline] = useState(false)
  const [spacedRowColor, setSpacedRowColor] = useState(false)

  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <>
      <h3>基础用法</h3>
      <div style={{ padding: '0.16rem 0', background: 'var(--mui-color-background)'}} >
        <div className='table-control'>
          <Switch onChange={checked => setVerticalSplitline(checked)}/>显示竖线
          <Switch onChange={checked => setSpacedRowColor(checked)}/>斑马线
          <Switch onChange={
            checked => {
              if (checked) {
                setCacheData(data)
                setData([])
                setHasMore(false)
              } else {
                setData(cacheData)
                setHasMore(true)
              }
            }
          }/>空状态
          <br />
        </div>
        <Table
          columns={columns}
          data={data}
          infiniteScrollOptions={{
            loadMore: loadMore,
            hasMore: hasMore
          }}
          verticalSplitline={verticalSplitline}
          spacedRowColor={spacedRowColor}
        />
      </div>
    </>
  )
}
