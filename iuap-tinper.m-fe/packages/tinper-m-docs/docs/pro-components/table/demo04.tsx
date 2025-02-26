/**
 * @title 行数显示、分页
 * @description: 表格-行数显示、分页
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
      <h3>行数显示、分页</h3>
      <div className='table-demo-container-no-bottom' >
        <Table
          columns={COLUMNS}
          data={makeOrderData()}
          paginationMode='pagination'
          paginationOptions={{ pageSize: 30}}
          showRowCount
        />
      </div>
    </>
  )
}
