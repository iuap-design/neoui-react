/**
 * @title ListView大数据渲染
 * @description: 长列表
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { List, PullToRefresh, InfiniteScroll } from '@tinper/m'
import { sleep } from '@utils/Sleeps'
import { useVirtualizer } from '@tanstack/react-virtual'
import { faker } from '@faker-js/faker';
import './listViewUpdate.less'

// 模拟数据请求
export async function mockRequest(pageIndex = 0) {
  if (pageIndex >= 5) {
    return []
  }
  await sleep(200)
  const res: string[] = []
  for (let i = 0; i < 100; i++) {
    res.push(faker.lorem.word({ length: { min: 4, max: 8}}))
  }
  return res
}

export default () => {
  const [data, setData] = useState<String[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // 滚动到底部加载
  const loadMore = async () => {
    const append = await mockRequest(pageIndex)
    setPageIndex(pageIndex + 1)
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  // 下拉刷新
  const onRefresh = async () => {
    const append = await mockRequest()
    setPageIndex(0)
    setData(append)
  }

  // 行渲染
  const renderRow = (row) => {
    const rowStyle = {
      transform: `translateY(${row.start}px)`,
      width: '100%',
      position: 'absolute'
    }
    const rowIndex = row.index
    const rowData = data[rowIndex]
    return (
      <List.Item
        style={rowStyle}
        ref={node => rowVirtualizer.measureElement(node)} // 动态获取行高
        data-index={rowIndex} // 数据下标
        key={rowIndex}
      >
        {rowData}
      </List.Item>
    )
  }

  const scrollContainerRef = useRef(null)

  // 虚拟列表
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    estimateSize: () => 50, // 默认行高
    getScrollElement: () => scrollContainerRef.current, // 滚动容器
    overscan: 5,
  })

  return (
    <>
      <h3>ListView虚拟列表</h3>
      <PullToRefresh
        onRefresh={onRefresh}
      >
        <div className='demo-list-view-container' ref={scrollContainerRef}>
          <List style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => renderRow(virtualRow))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      </PullToRefresh>
    </>
  )
}
