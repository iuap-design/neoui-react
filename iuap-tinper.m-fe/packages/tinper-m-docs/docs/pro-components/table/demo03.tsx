/**
 * @title 单行省略、截断显示
 * @description: 表格-单行省略、截断显示
 * @compact true
 */
import React, { useState, useReducer } from 'react'
import { Table } from 'ynf-tinper-m-pro'
import { makeOrderData } from './mockData'
export const COLUMNS = [
  {
    header: '序号',
    key: 'order',
    horizontalAlign: 'center',
    cell: info => info.row.index + 1,
    size: 42
  },
  {
    header: '文字超出换行撑高',
    key: 'org1',
    accessorKey: 'org'
  },
  {
    header: '文字超出省略',
    key: 'org2',
    accessorKey: 'org',
    textDisplayMode: 'ellipsis',
  },
  {
    header: '文字超出缩小字号适应宽度',
    key: 'org3',
    accessorKey: 'org',
    textDisplayMode: 'scale',
    size: 80,
    
  },
  {
    header: '文字超出溢出截断',
    key: 'price',
    horizontalAlign: 'right',
    textDisplayMode: 'clip',
  },
]

export default () => {
  return (
    <>
      <h3>单行省略、截断显示</h3>
      <div className='table-demo-container' >
        <Table
          columns={COLUMNS}
          data={makeOrderData([6]).concat({org: '--', price: '999999999.00'})}
        />
      </div>
    </>
  )
}
