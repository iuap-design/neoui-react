/**
 * @title 虚拟列表
 * @description: 列表-虚拟列表
 * @compact true
 */
import React, { useState } from 'react'
import { List, Avatar, Tag } from '@tinper/m'
import { List as VirtualizedList, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { DesComponent, users } from './users'
import './demo.less'

const rowCount = 1000

const data = Array(rowCount).fill(users[0])

const cache = new CellMeasurerCache({
  defaultHeight: 80, // 默认行高
  fixedWidth: true, // 行宽是否固定
});

export default () => {
  function rowRenderer({
    index,
    key,
    style,
  }) {
    const item = data[index]
    return <CellMeasurer
      cache={cache}
      parent={parent}
      columnIndex={0}
      key={key}
      rowIndex={index}
    >
      {({ measure }) => (
        <List.Item
          style={style}
          key={item.id}
          arrow
          prefix={<Avatar style={{ height: '0.94rem', width: '0.94rem' }} />}
          description={<DesComponent id={item.id} phone={item.phone} />}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem'}} onLoad={measure}>
            <div style={{ fontSize: '0.4rem', lineHeight: 1.5 }}>{item.name}</div>
            <Tag style={{ marginLeft: '0.16rem', height: '0.36rem', width: '0.86rem', fontSize: '0.24rem', padding: '0.08rem', boxSizing: 'border-box' }} color="primary" fill="solid" label="审批中"></Tag>
          </div>
        </List.Item>
      )}
    </CellMeasurer>
  }

  return (
    <List header='结合 react-virtualized 实现长列表'>
      <AutoSizer disableHeight>
        {({ width }: { width: number }) => (
          <VirtualizedList
            className='demo-virtualized-list'
            rowCount={rowCount}
            rowRenderer={rowRenderer}
            width={width}
            height={590}
            rowHeight={cache.rowHeight}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </List>
  )
}
