import React, { useState } from 'react'
import classNames from 'classnames'
import { SidebarProps } from './iIndexBar'

export const Sidebar: React.FC<SidebarProps> = props => {
  const [interacting, setInteracting] = useState(false)
  const { clsPrefix, fieldid } = props;

  return (
    <div
      className={classNames(`${clsPrefix}-sidebar`, { [`${clsPrefix}-sidebar-interacting`]: interacting, })}
      fieldid={fieldid ? fieldid + '_sidebar' : ''}
      onMouseDown={() => {
        setInteracting(true)
      }}
      onMouseUp={() => {
        setInteracting(false)
      }}
      onTouchStart={() => {
        setInteracting(true)
      }}
      onTouchEnd={() => {
        setInteracting(false)
      }}
      onTouchMove={e => {
        if (!interacting) return
        const { clientX, clientY } = e.touches[0]
        const target = document.elementFromPoint(
          clientX,
          clientY
        ) as HTMLElement
        if (!target) return
        const index = target.dataset['index']
        if (index) {
          props.onActive(index)
        }
      }}
    >
      {props.indexItems.map(({ index, brief }) => {
        const active = index === props.activeIndex
        return (
          <div
            className={`${clsPrefix}-sidebar-row`}
            fieldid={fieldid ? fieldid + '_sidebar_row_' + index : ''}
            onMouseDown={() => {
              props.onActive(index)
            }}
            onTouchStart={() => {
              props.onActive(index)
            }}
            onMouseEnter={() => {
              if (interacting) {
                props.onActive(index)
              }
            }}
            data-index={index}
            key={index}
          >
            {interacting && active && (
              <div
                className={`${clsPrefix}-sidebar-bubble`}
                fieldid={fieldid ? fieldid + '_sidebar_bubble' : ''}
              >{brief}</div>
            )}

            <div
              className={classNames(`${clsPrefix}-sidebar-item`, { [`${clsPrefix}-sidebar-item-active`]: active, })}
              fieldid={fieldid ? fieldid + '_sidebar_item_' + index : ''}
              data-index={index}
            >
              <div>{brief}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
