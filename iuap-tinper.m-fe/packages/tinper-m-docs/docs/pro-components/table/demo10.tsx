/**
 * @title 列数宽度和不足父级宽度，最后一列充满父容器
 * @description: 表格-最后一列充满父容器
 * @compact true
 */
import React from 'react'
import { Table } from 'ynf-tinper-m-pro'
import { makeOrderData } from './mockData'
export const COLUMNS = [
  {
    header: '序号',
    key: 'order',
    horizontalAlign: 'center',
    cell: info => info.row.index + 1,
    size: 52,
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
  }
]

export default () => {
  return (
    <>
      <h3>列数宽度和不足父级宽度，最后一列充满父容器</h3>
      <div className='table-demo-container' >
        <Table
          columns={COLUMNS}
          data={makeOrderData()}
        />
      </div>
    </>
  )
}
