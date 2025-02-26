/**
 * @title 刷新失败
 * @description: 下拉刷新-刷新失败
 * @compact true
 */
import React, { useState } from 'react'
import { PullToRefresh, List, Toast } from '@tinper/m'
import { sleep } from '@utils/Sleeps'

const pageSize = 4
function getNextData(start: number = 0) {
  if (start > 0) throw new Error('request error')
  const ret: string[] = []
  for (let i = start; i < start + pageSize; i++) {
    ret.unshift(`${i + 1}`)
  }
  return ret
}

export default () => {
  const [data, setData] = useState(() => getNextData())
  return (
    <div className='demo-wrapper'>
      <h3>刷新失败</h3>
      <PullToRefresh
      onRefresh={async () => {
          await sleep(1000)
          Toast.show({
            fieldid: 'Toast3',
            icon: 'fail',
            content: '刷新失败',
          })
          throw new Error('刷新失败')
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
