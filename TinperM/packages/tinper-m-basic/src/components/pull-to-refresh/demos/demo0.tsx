/**
 * @title 基础用法
 * @description: 下拉刷新-基础用法
 * @compact true
 */
import React, { useState } from 'react'
import { PullToRefresh, List } from '@tinper/m'
import { sleep } from '@utils/Sleeps'

const pageSize = 4
function getNextData(start: number = 0) {
  const ret: string[] = []
  for (let i = start; i < start + pageSize; i++) {
    ret.unshift(`${i + 1}`)
  }
  return ret
}

export default () => {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(() => getNextData(index))
  return (
    <div className='demo-wrapper'>
      <h3>基础用法</h3>
      <PullToRefresh
      onRefresh={async () => {
        await sleep(1000)
        setData([...getNextData(index + pageSize), ...data])
        setIndex(index + pageSize)
      }}
    >
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
    </PullToRefresh>
    </div>
  )
}
