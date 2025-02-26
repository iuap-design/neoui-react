/**
 * @title 点表头选中列，显示列宽拖拽按钮
 * @description: 表格-点表头选中列，显示列宽拖拽按钮
 * @compact true
 */
import React, { useState, useReducer } from 'react'
import { Tag } from '@tinper/m'
import { Table } from 'ynf-tinper-m-pro'
import { makeOrderData } from './mockData'
export const COLUMNS = [
  {
    header: '序号',
    key: 'order',
    horizontalAlign: 'center',
    cell: info => info.row.index + 1,
    size: 42,
    fixed: 'left'
  },
  {
    header: '订单编号',
    key: 'orderId',
    enableSorting: true,
  },
  {
    header: '供应商',
    key: 'providerName',
    size: 67,
    enableSorting: true,
  },
  {
    header: '交易类型',
    key: 'transactionType',
    cell: info => <Tag color='message' fill='solid' label={{0: '普通', 1: '紧急', 2: '超期'}[info.getValue()]} />,
    horizontalAlign: 'center',
    enableSorting: true,
  },
  {
    header: '金额',
    key: 'price',
    horizontalAlign: 'right',
    enableSorting: true,
  },
]

export default () => {
  return (
    <>
      <h3>点表头选中列，显示列宽拖拽按钮</h3>
      <div className='table-demo-container' >
        <Table
          columns={COLUMNS}
          data={makeOrderData([7])}
        />
      </div>
    </>
  )
}
