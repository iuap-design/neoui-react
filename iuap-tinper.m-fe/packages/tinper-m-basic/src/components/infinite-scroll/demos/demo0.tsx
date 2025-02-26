/**
 * @title 基础用法
 * @description: 无限滚动-基础用法
 * @compact true
 */
import React, { useState } from 'react'
import { InfiniteScroll, List } from '@tinper/m'
import { mockRequest } from './mock-request'
import './demo.less'

export default function Demo0() {
  const [data, setData] = useState<String[]>([])
  const [hasMore, setHasMore] = useState(true)

  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <>
      <h3>基础用法</h3>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}
