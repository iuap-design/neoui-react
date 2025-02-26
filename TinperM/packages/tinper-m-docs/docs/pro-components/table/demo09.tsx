/**
 * @title 树型表
 * @description: 表格-树型表
 * @compact true
 */
import React, { useState, useReducer } from 'react'
import { Tag } from '@tinper/m'
import { Table } from 'ynf-tinper-m-pro'
import { makeOrderData } from './mockData'
export const COLUMNS = [
  {
    header: '订单编号',
    key: 'orderId',
    textDisplayMode: 'ellipsis',
    showExpandIcon: true
  },
  {
    header: '供应商名称',
    key: 'providerName',
    size: 88,
  },
  {
    header: '交易类型',
    key: 'transactionType',
    cell: info => <Tag color='message' fill='solid' label={{0: '普通', 1: '紧急', 2: '超期'}[info.getValue()]} />,
    size: 88,
  },
  {
    header: '金额',
    key: 'price',
    horizontalAlign: 'right',
    size: 78,
  },
]

const expandableStates = {
  '1': true,
  '2': { expanded: true },
  '3': { expanded: {
    '0': true,
    '0.0': true
  }}
}

export default () => {
  const [expandable, setExpandable] = useState(expandableStates['3'])
  return (
    <>
      <h3>树型表</h3>
      <div className='table-demo-container' >
        <Table
          columns={COLUMNS}
          data={makeOrderData([100, 3, 2])}
          expandable={expandable}
          showRowCount
        />
      </div>
    </>
  )
}
