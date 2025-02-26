import React, { isValidElement } from 'react'
import type { ReactElement } from 'react'
import classNames from 'classnames'
import Badge from '../../badge/src/index'
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import { Corner } from './Corner'
import { traverseReactNode } from '@utils/TraverseReactNode'
import { SideBarProps, SideBarItemProps } from './iSideBar'
import WebUI from '@utils/UpdatePrefixs'

const SideBar: React.FC<SideBarProps> = props => {
  let firstActiveKey: string | null = null

  const items: ReactElement<SideBarItemProps>[] = []
  const { clsPrefix, fieldid } = props;
  const _clsPrefix = clsPrefix + '-side-bar';

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<SideBarItemProps>(child)) return
    const key = child.key
    if (typeof key !== 'string') return

    if (index === 0) {
      firstActiveKey = key
    }
    items.push(child)
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  const lastItem = items[items.length - 1]
  const isLastItemActive = lastItem && lastItem.key === activeKey

  return withNativeProps(
    props,
    <div className={_clsPrefix} fieldid={fieldid ? fieldid + '_side_bar' : undefined}>
      <div className={`${_clsPrefix}-items`} fieldid={fieldid ? fieldid + '_side_bar_items' : undefined} id="sidebar-items">
        {items.map((item, index) => {
          const active = item.key === activeKey
          const isActiveNextSibling =
            items[index - 1] && items[index - 1].key === activeKey
          const isActivePreviousSibling =
            items[index + 1] && items[index + 1].key === activeKey
          return withNativeProps(
            item.props,
            <div
              key={item.key}
              onClick={() => {
                const { key } = item
                if (key === undefined || key === null || item.props.disabled)
                  return
                setActiveKey(key.toString())
              }}
              className={classNames(`${_clsPrefix}-item`, {
                [`${_clsPrefix}-item-active`]: active,
                [`${_clsPrefix}-item-disabled`]: item.props.disabled,
              })}
              fieldid={fieldid ? fieldid + '_side_bar_item_' + index : undefined}
            >
              <>
                {isActiveNextSibling && (
                  <Corner
                    className={`${_clsPrefix}-item-corner ${_clsPrefix}-item-corner-top`}
                  />
                )}
                {isActivePreviousSibling && (
                  <Corner
                    className={`${_clsPrefix}-item-corner ${_clsPrefix}-item-corner-bottom`}
                  />
                )}
              </>
              <Badge
                content={item.props.badge}
                className={`${_clsPrefix}-badge`}
                fieldid={fieldid ? fieldid + '_side_bar_badge' : undefined}
              >
                <div className={`${_clsPrefix}-item-title`}>
                  {active && (
                    <div className={`${_clsPrefix}-item-highlight`} />
                  )}
                  {item.props.title}
                </div>
              </Badge>
            </div>
          )
        })}
      </div>
      <div
        className={classNames(
          `${_clsPrefix}-extra-space`,
          isLastItemActive && `${_clsPrefix}-item-active-next-sibling`
        )}
      >
        {isLastItemActive && (
          <Corner
            className={`${_clsPrefix}-item-corner ${_clsPrefix}-item-corner-top`}
          />
        )}
      </div>
    </div>
  )
}

export default WebUI({ })(SideBar)
