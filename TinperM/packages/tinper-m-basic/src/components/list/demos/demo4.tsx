/**
 * @title 拖拽排序
 * @description: 列表-拖拽排序
 * @compact true
 */
import React, { useState } from 'react'
import { List, Avatar, Tag } from '@tinper/m'
import { DesComponent, users } from './users'

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

type IUser = {
  id: string
  avatar?: string
  name: string
  phone: string
}

const reorder = (
  list: Iterable<IUser> | ArrayLike<IUser>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default () => {
  const [list, setList] = useState<IUser[]>(users)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const newList = reorder(list, result.source.index, result.destination.index)
    setList([...newList])
  }

  return (
    <List header='结合 react-beautiful-dnd 实现拖拽排序'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {droppableProvided => (
            <div ref={droppableProvided.innerRef}>
              {list.map((item, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        background: 'var(--mui-color-background)'
                      }}
                    >
                      <List.Item
                        key={item.id}
                        arrow
                        prefix={<Avatar style={{ height: '0.94rem', width: '0.94rem' }} />}
                        description={<DesComponent id={item.id} phone={item.phone} />}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem'}}>
                          <div style={{ fontSize: '0.4rem', lineHeight: 1.5 }}>{item.name}</div>
                          <Tag style={{ marginLeft: '0.16rem', height: '0.36rem', width: '0.86rem', fontSize: '0.24rem', padding: '0.08rem', boxSizing: 'border-box' }} color="primary" fill="solid" label="审批中"></Tag>
                        </div>
                      </List.Item>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  )
}
