import React, { isValidElement } from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { SafeArea } from '@tinper/m'
import Badge from '../../badge/src/Badge';
import { usePropsValue } from '@utils/UsePropsValue'
import { traverseReactNode } from '@utils/TraverseReactNode'
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs';
import { TabBarItemProps, TabBarProps } from './iTabBar'

/* istanbul ignore next */
export const TabBarItem: FC<TabBarItemProps> = () => null

const defaultProps = { safeArea: false, };

function TabBar (props: TabBarProps) {
  let firstActiveKey: string | null = null
  const {
    className,
    fieldid,
    style={},
    clsPrefix,
    itemList=[]
  } = props;

  const items: ReactElement<TabBarItemProps>[] = []

  itemList.length > 0 && itemList.forEach((item, index) => {
    items.push({
      key: item.key,
      props: { ...item, }
    })
  })

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<TabBarItemProps>(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    items.push(child)
  })

  const firstItemListKey = itemList.length > 0 ? itemList[0].key : undefined;
  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? (firstItemListKey ?? firstActiveKey),
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  const _clsPrefix = `${clsPrefix}-tab-bar`

  const cls = classnames(
    className,
    _clsPrefix,
  )

  return withNativeProps(
    props,
    <div className={cls} fieldid={fieldid} style={style}>
      <div className={`${_clsPrefix}-wrap`}>
        {items.map(item => {
          const active = item.key === activeKey

          function renderContent() {
            const iconElement = item.props.icon && (
              <div className={`${_clsPrefix}-item-icon`}>
                {typeof item.props.icon === 'function'
                  ? item.props.icon(active)
                  : item.props.icon}
              </div>
            )
            const titleElement = item.props.title && (
              <div
                className={classNames(
                  `${_clsPrefix}-item-title`,
                  Boolean(iconElement) && `${_clsPrefix}-item-title-with-icon`
                )}
                style={style && style.fontSize ? { fontSize: style.fontSize } : {}}
              >
                {typeof item.props.title === 'function'
                  ? item.props.title(active)
                  : item.props.title}
              </div>
            )
            if (iconElement) {
              return (
                <>
                  <Badge
                    content={item.props.badge}
                    className={`${_clsPrefix}-icon-badge`}
                  >
                    {iconElement}
                  </Badge>
                  {titleElement}
                </>
              )
            } else if (titleElement) {
              return (
                <Badge
                  content={item.props.badge}
                  className={`${_clsPrefix}-title-badge`}
                >
                  {titleElement}
                </Badge>
              )
            }
            return null
          }

          return withNativeProps(
            item.props,
            <div
              key={item.key}
              onClick={() => {
                const { key } = item
                if (key === undefined || key === null) return
                setActiveKey(key.toString())
              }}
              fieldid={active ? `${fieldid}-item-active` : `${fieldid}-item`}
              className={classNames(`${_clsPrefix}-item`, { [`${_clsPrefix}-item-active`]: active, })}
            >
              {renderContent()}
            </div>
          )
        })}
      </div>

      {props.safeArea && <SafeArea position='bottom' />}
    </div>
  )
}

export default WebUI({ name: 'tab-bar', defaultProps })(TabBar)
