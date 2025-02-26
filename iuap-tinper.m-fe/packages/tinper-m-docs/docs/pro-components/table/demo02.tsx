/**
 * @title 小记合计
 * @description: 表格-小记合计
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
    subTotalRender: () => '小计',
    totalRender: () => '合计',
  },
  {
    header: '订单编号',
    key: 'orderId',
    textDisplayMode: 'scale',
    enableSorting: true

  },
  {
    header: '供应商',
    key: 'providerName',
    enableSorting: true,
    size: 67,
  },
  {
    header: '交易类型',
    key: 'transactionType',
    cell: info => <Tag color='message' fill='solid' label={{0: '普通', 1: '紧急', 2: '超期'}[info.getValue()]} />,
    enableSorting: true,
    horizontalAlign: 'center',
  },
  {
    header: '金额',
    key: 'price',
    horizontalAlign: 'right',
    size: 78,
    subTotalRender: ({ sum }) => sum,
    totalRender: () => 4323232,
    enableSorting: true,
  },
]

export default () => {
  return (
    <>
      <h3>小记合计</h3>
      <div className='table-demo-container-no-bottom'>
        <Table
          columns={COLUMNS}
          data={makeOrderData()}
          paginationMode='pagination'
          paginationOptions={{ pageSize: 50 }}
          showRowCount
          showSum
        />
      </div>
    </>
  )
}
