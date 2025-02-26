/**
 * @title 合并单元格
 * @description: 合并单元格
 * @compact true
 */
import React, { useState, useReducer } from 'react'
import { Tag } from '@tinper/m'
import { Table } from 'ynf-tinper-m-pro'
import { makeOrderData } from './mockData'
export const COLUMNS = [
  /* { 
    header: '序号',
    key: 'order',
    horizontalAlign: 'center',
    cell: info => info.row.index + 1,
    size: 42,
    fixed: 'left'
  }, */
  {
    header: '供应商',
    key: 'providerGroup',
    columns: [
      {
        header: '编号',
        key: 'orderId',
        textDisplayMode: 'ellipsis',
        enableSorting: true,
        size: 100,
      },
      {
        header: '名称',
        key: 'providerNameGroup',
        enableSorting: true,
        size: 80
      },
    ]
  },
  {
    header: '交易单',
    key: 'transactionGroup',
    columns: [
      {
        header: '类型',
        key: 'transactionType',
        horizontalAlign: 'center',
        cell: info => <Tag color='message' fill='solid' label={{0: '普通', 1: '紧急', 2: '超期'}[info.getValue()]} />,
        aggregationFn: () => '',
        enableSorting: true,
        size: 67
      },
      {
        header: '金额',
        key: 'price',
        horizontalAlign: 'right',
        subTotalRender: ({ sum }) => sum,
        totalRender: () => '--',
        enableSorting: true,
        aggregationFn: (key, rows) => {
          return rows.map(row => Number(row.getValue(key))).reduce((a, b) => (a + b))
        },
        size: 100
      },
    ]
  },
]

export default () => {
  return (
    <>
      <h3>合并单元格</h3>
      <div className='table-demo-container' >
        <Table
          columns={COLUMNS}
          data={makeOrderData([15])}
          grouping={['providerNameGroup']}
        />
      </div>
    </>
  )
}
