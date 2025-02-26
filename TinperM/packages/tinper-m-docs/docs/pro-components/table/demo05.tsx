/**
 * @title 选中单元格
 * @description: 表格-选中单元格
 * @compact true
 */
import React, { useState, useEffect, useRef } from 'react'
import { Tag, Radio } from '@tinper/m'
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
  const [cellSelectionMode, setCellSelectionMode] = useState('cell')
  const tableRef = useRef(null)
  const tableInstance = useRef(null)
  useEffect(() => {
    if (tableRef.current) {
      tableInstance.current = tableRef.current.tableInstance
    }
  }, [tableRef])
  return (
    <>
      <h3>选中单元格</h3>
      <div style={{ padding: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
      <Radio.Group
        defaultValue='cell'
        onChange={val => {
          tableInstance.current?.reset()
          setCellSelectionMode(val)
        }}
      >
        <Radio value='cell'>选中单元</Radio>
        <Radio value='row'>选中行</Radio>
        <Radio value='column'>选中列</Radio>
        <Radio value='all'>选中行列</Radio>
      </Radio.Group>
      </div>
      <div className='table-demo-container' >
        <Table
          ref={tableRef}
          columns={COLUMNS}
          cellSelectionMode={cellSelectionMode}
          data={makeOrderData([7])}
        />
      </div>
    </>
  )
}
