/**
 * @title 基础用法
 * @description: 表格-基础用法
 * @compact true
 */
import React, { useState, useRef, useEffect } from 'react'
import { Tag } from '@tinper/m'
import { Table } from 'ynf-tinper-m-pro'
import { mockRequest } from './mockData'
import './demo.less'
export const COLUMNS = [
  {
    header: '序号',
    key: 'order',
    cell: info => info.row.index + 1,
    subTotalRender: () => '小计',
    totalRender: () => '合计',
    horizontalAlign: 'center',
    size: 42,
  },
  {
    header: '订单编号',
    key: 'orderId',
    enableSorting: true,
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
    enableSorting: true,
  }
]

export default () => {
  const tableRef = useRef(null)
  const tableInstance = useRef(null)
  const [data, setData] = useState<String[]>([])
  const [hasMore, setHasMore] = useState(true)

  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  useEffect(() => {
    if (tableRef.current) {
      tableInstance.current = tableRef.current.tableInstance
    }
  }, [tableRef])

  return (
    <>
      <h3>基础用法</h3>
      <div className='table-demo-container'>
        <Table
          ref={tableRef}
          columns={COLUMNS}
          data={data}
          infiniteScrollOptions={{
            loadMore: loadMore,
            hasMore: hasMore
          }}
        />
      </div>
    </>
  )
}
