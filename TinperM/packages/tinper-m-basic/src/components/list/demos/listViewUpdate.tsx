/**
 * @title ListView
 * @description: 长列表
 * @compact true
 */
import React, { useEffect, useState } from 'react'
import { List, PullToRefresh, InfiniteScroll } from '@tinper/m'
import { sleep } from '@utils/Sleeps'
import './listViewUpdate.less'

// 模拟数据请求
export async function mockRequest(pageIndex = 0) {
  if (pageIndex >= 5) {
    return []
  }
  await sleep(2000)
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}

export default () => {
  const [data, setData] = useState<String[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  /* 加载更多事件, 需要返回Promise对象
  无法获取加载数据状态，也可以传给无限滚动组件的onEndReached事件, 然后在组件挂载时执行一次loadMore */
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
  const renderRow = (item, index) => {
    return <List.Item key={index}>{item}</List.Item>
  }

  return (
    <>
      <h3>ListView</h3>
      <PullToRefresh
        onRefresh={onRefresh}
      >
        <div className='demo-list-view-container'>
          <List>
            {data.map((item, index) => renderRow(item, index))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      </PullToRefresh>
    </>
  )
}
