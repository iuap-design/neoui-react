import React, { isValidElement, useEffect, useRef } from 'react'
import type { FC, ReactElement } from 'react'
import classNames from 'classnames'
import { useSpring, animated } from '@react-spring/web'
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import { bound } from '@utils/Bounds'
import { useResizeEffect, useIsomorphicUpdateLayoutEffect, useMutationEffect, useThrottleFn, useIsomorphicLayoutEffect } from 'tne-fw-fe/hooks'
import { mergeProps } from '@utils/WithDefaultProps'
import { ShouldRender } from '@utils/ShouldRender'
import { traverseReactNode } from '@utils/TraverseReactNode'
import { TabProps, TabsProps } from './iTabs'
import WebUI from '@utils/UpdatePrefixs'

export const Tab: FC<TabProps> = () => null

const defaultProps = {
  activeLineMode: 'fixed',
  stretch: false,
  direction: 'ltr',
  tabBarPosition: 'top'
}

const Tabs: React.FC<TabsProps> = p => {
  const props = mergeProps(defaultProps, p)
  const tabListContainerRef = useRef<HTMLDivElement>(null)
  const activeLineRef = useRef<HTMLDivElement>(null)
  const keyToIndexRecord: Record<string, number> = {}
  let firstActiveKey: string | null = null
  const _clsPrefix = props.clsPrefix + '-tabs'

  const panes: ReactElement<TabProps>[] = []

  const isRTL = props.direction === 'rtl'

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<TabProps>(child)) return

    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    const length = panes.push(child)
    keyToIndexRecord[key] = length - 1
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: v => {
      if (v === null) return
      const prevChild = props.children && activeKey ? (props.children as any[])[keyToIndexRecord[activeKey]] : undefined;
      const nextChild = props.children ? (props.children as any[])[keyToIndexRecord[v]] : undefined;
      props.onChange?.(v, prevChild, nextChild)
    },
  })

  const [{ x, width }, inkApi] = useSpring(() => ({
    x: 0,
    width: 0,
    config: {
      tension: props.noTension ? 0 : 300,
      clamp: true,
    },
  }))

  const [{ y, height }, inkApi1] = useSpring(() => ({
    y: 0,
    height: 0,
    config: {
      tension: props.noTension ? 0 : 300,
      clamp: true,
    },
  }))

  const [{ scrollLeft }, scrollApi] = useSpring(() => ({
    scrollLeft: 0,
    config: {
      tension: props.noTension ? 0 : 300,
      clamp: true,
    },
  }))

  const [{ leftMaskOpacity, rightMaskOpacity }, maskApi] = useSpring(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: { clamp: true, },
  }))

  function animate(immediate = false, fromMutation = false) {
    const container = tabListContainerRef.current
    if (!container) return

    const activeIndex = keyToIndexRecord[activeKey as string]
    if (activeIndex === undefined) {
      inkApi.start({
        x: 0,
        width: 0,
        immediate: true,
      })
      return
    }
    const activeLine = activeLineRef.current
    if (!activeLine) return

    const activeTabWrapper = container.children.item(
      activeIndex + 1
    ) as HTMLDivElement
    const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement
    const activeTabLeft = activeTab.offsetLeft
    const activeTabWidth = activeTab.offsetWidth
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth

    const containerWidth = container.offsetWidth
    const containerScrollWidth = container.scrollWidth
    const containerScrollLeft = container.scrollLeft

    const activeLineWidth = activeLine.offsetWidth

    let x = 0
    let width = 0
    if (props.activeLineMode === 'auto') {
      x = activeTabLeft
      width = activeTabWidth
    } else if (props.activeLineMode === 'full') {
      x = activeTabWrapperLeft
      width = activeTabWrapperWidth
    } else {
      x = activeTabLeft + (activeTabWidth - activeLineWidth) / 2
    }

    if (isRTL) {
      const w = ['auto', 'full'].includes(props.activeLineMode)
        ? width
        : activeLineWidth
      x = -(containerWidth - x - w)
    }

    width = props.decoration === 'dotLine' ? width - 4 : width;

    inkApi.start({
      x,
      width,
      immediate,
    })

    const maxScrollDistance = containerScrollWidth - containerWidth
    if (maxScrollDistance <= 0) return

    let nextScrollLeft = 0

    if (isRTL) {
      /**
       * 位移距离等于：activeTab的中心坐标距离容器中心坐标的距离，然后RTL取负数
       * containerWidth / 2 - (activeTabLeft + (activeTabWidth - activeLineWidth) / 2) - activeLineWidth / 2,
       */
      nextScrollLeft = -bound(
        containerWidth / 2 -
        activeTabLeft +
        activeTabWidth / 2 -
        activeLineWidth,
        0,
        maxScrollDistance
      )
    } else {
      nextScrollLeft = bound(
        activeTabLeft - (containerWidth - activeTabWidth) / 2,
        0,
        maxScrollDistance
      )
    }

    if (!fromMutation || props.autoScroll !== false) {
      scrollApi.start({
        scrollLeft: nextScrollLeft,
        from: { scrollLeft: containerScrollLeft },
        immediate,
      })
    }
  }

  function animate1(immediate = false, fromMutation = false) {
    const container = tabListContainerRef.current
    if (!container) return

    const activeIndex = keyToIndexRecord[activeKey as string]
    if (activeIndex === undefined) {
      inkApi1.start({
        y: 0,
        height: 0,
        immediate: true,
      })
      return
    }
    const activeLine = activeLineRef.current
    if (!activeLine) return

    const activeTabWrapper = container.children.item(
      activeIndex + 1
    ) as HTMLDivElement
    const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement
    const activeTop = activeTab.offsetTop
    const activeTabHeight = activeTab.offsetHeight
    const activeTabWrapperTop = activeTabWrapper.offsetTop
    const activeTabWrapperHeight = activeTabWrapper.offsetHeight

    const containerHeight = container.offsetHeight
    const containerScrollHeight = container.scrollHeight

    const activeLineWidth = activeLine.offsetHeight

    let y = 0
    let height = 0
    if (props.activeLineMode === 'auto') {
      y = activeTop
      height = activeTabHeight
    } else if (props.activeLineMode === 'full') {
      y = activeTabWrapperTop
      height = activeTabWrapperHeight
    } else {
      y = activeTop + (activeTabHeight - activeLineWidth) / 2
    }

    if (isRTL) {
      const w = ['auto', 'full'].includes(props.activeLineMode)
        ? height
        : activeLineWidth
      y = -(containerHeight - y - w)
    }

    inkApi1.start({
      y,
      height,
      immediate,
    })

    const maxScrollDistance = containerScrollHeight - containerHeight
    if (maxScrollDistance <= 0) return

  }

  useIsomorphicLayoutEffect(() => {
    (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? animate1(!y.isAnimating) : animate(!x.isAnimating)
  }, [])

  useIsomorphicUpdateLayoutEffect(() => {
    (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? animate1() : animate()

  }, [activeKey, props.activeLineMode, props.stretch])

  useResizeEffect(() => {
    (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? animate1(!y.isAnimating) : animate(!x.isAnimating)
  }, tabListContainerRef)

  useMutationEffect(
    () => {
      (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? animate1(!y.isAnimating, true) : animate(!x.isAnimating, true)
    },
    tabListContainerRef,
    {
      subtree: true,
      childList: true,
      characterData: true,
    }
  )

  const { run: updateMask } = useThrottleFn(
    (immediate = false) => {
      const container = tabListContainerRef.current
      if (!container) return

      const scrollLeft = container.scrollLeft

      let showLeftMask = false
      let showRightMask = false

      if (isRTL) {
        /**
         * RTL模式下，只要滑动过，scrollLeft就再也回不到0（chrome是0.5）
         * 所以要加round才能终止触发条件
         * round(443.5) + 375 < 819
         */
        showLeftMask =
          Math.round(-scrollLeft) + container.offsetWidth <
          container.scrollWidth
        showRightMask = scrollLeft < 0
      } else {
        showLeftMask = scrollLeft > 0
        showRightMask =
          scrollLeft + container.offsetWidth < container.scrollWidth
      }

      maskApi.start({
        leftMaskOpacity: showLeftMask ? 1 : 0,
        rightMaskOpacity: showRightMask ? 1 : 0,
        immediate,
      })
    },
    {
      wait: 100,
      trailing: true,
      leading: true,
    }
  )

  useIsomorphicLayoutEffect(() => {
    updateMask(true)
  }, [])

  let lineWidth;
  if (props.decoration === 'dotLine') {
    lineWidth = (props.activeLineMode === 'fixed' || !props.activeLineMode)
      ? 'calc(var(--fixed-active-line-width, var(--ynfm-size-width-line-tab-selected, 0.32rem)) - 0.08rem)'
      : width
  } else {
    lineWidth = (props.activeLineMode === 'fixed' || !props.activeLineMode)
      ? 'var(--fixed-active-line-width, var(--ynfm-size-width-line-tab-selected, 0.32rem))'
      : width
  }

  const lineHeight = height;

  const tabbarStyle = (props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? { height: lineHeight, y } : { width: lineWidth, transform: x.to(v => `translateX(${v}px)`) };
  const renderHeader = () => {
    const { renderTabBar = false } = props;
    const header = (
      <div className={`${_clsPrefix}-header`} fieldid={props.fieldid ? props.fieldid + '_tabs_header' : undefined}>
        <animated.div
          className={classNames(
            `${_clsPrefix}-header-mask`,
            `${_clsPrefix}-header-mask-left`
          )}
          style={{ opacity: leftMaskOpacity, }}
          fieldid={props.fieldid ? props.fieldid + '_tabs_header_mask_left' : undefined}
        />
        <animated.div
          className={classNames(
            `${_clsPrefix}-header-mask`,
            `${_clsPrefix}-header-mask-right`
          )}
          style={{ opacity: rightMaskOpacity, }}
          fieldid={props.fieldid ? props.fieldid + '_tabs_header_mask_right' : undefined}
        />
        <animated.div
          className={`${_clsPrefix}-tab-list`}
          ref={tabListContainerRef}
          scrollLeft={scrollLeft}
          onScroll={updateMask}
          role='tablist'
          id="tabs-list"
          fieldid={props.fieldid ? props.fieldid + '_tabs_tab_list' : undefined}
        >
          <animated.div
            ref={activeLineRef}
            className={classNames(
              `${_clsPrefix}-tab-line`,
              `${_clsPrefix}-tab-line-${props.activeLineMode ? props.activeLineMode : 'fixed'}`,
              { [`${_clsPrefix}-tab-line-dot`]: props.decoration === 'dotLine' }
            )}
            fieldid={props.fieldid ? props.fieldid + '_tabs_tab_line' : undefined}
            style={tabbarStyle}
          />
          {panes.map((pane, index) =>
            withNativeProps(
              pane.props,
              <div
                key={pane.key}
                className={classNames(`${_clsPrefix}-tab-wrapper`, { [`${_clsPrefix}-tab-wrapper-stretch`]: props.stretch, })}
                fieldid={props.fieldid ? props.fieldid + '_tabs_tab_wrapper_' + index : undefined}
              >
                <div
                  onClick={(e) => {
                    e && e.stopPropagation();
                    const { key } = pane
                    if (pane.props.disabled) return
                    if (key === undefined || key === null) {
                      return
                    }
                    const clickTab = props.children ? (props.children as any[])[keyToIndexRecord[key]] : undefined;
                    props.onTabClick?.(key, clickTab, e)
                    setActiveKey(key.toString())
                  }}
                  className={classNames(`${_clsPrefix}-tab`, {
                    [`${_clsPrefix}-tab-active`]: pane.key === activeKey,
                    [`${_clsPrefix}-tab-disabled`]: pane.props.disabled,
                  })}
                  role='tab'
                  aria-selected={pane.key === activeKey}
                  fieldid={props.fieldid ? props.fieldid + '_tabs_tab_' + index : undefined}
                  style={{ maxWidth: props.tabMaxWidth || 'unset', overflow: props.tabMaxWidth ? 'hidden' : 'unset' }}
                >
                  {pane.props.title}
                </div>
              </div>
            )
          )}
        </animated.div>
      </div>
    );
    if (renderTabBar === false) {
      return header
    } else {
      return renderTabBar(header)
    }
  }

  return withNativeProps(
    props,
    <div
      className={classNames(
        `${_clsPrefix}`,
        `${_clsPrefix}-tabbar-position-${(props.tabBarPosition === 'left' || props.tabBarPosition === 'right') ? 'v' : 'h'}`,
        `${_clsPrefix}-tabbar-position-${(props.tabBarPosition === 'top' || !props.tabBarPosition) ? 'top' : props.tabBarPosition}`,
      )}
      fieldid={props.fieldid ? props.fieldid + '_tabs' : undefined}
      style={{ direction: props.direction, }}
    >
      <div className={classNames(`${_clsPrefix}-header-wrap`, props.headerWrapClass)} fieldid={props.fieldid ? props.fieldid + '_tabs_header_wrap' : undefined}>
        {renderHeader()}
      </div>
      {panes.map((pane, i) => {
        if (pane.props.children === undefined) {
          return null
        }
        const active = pane.key === activeKey
        let forceRender = pane.props.forceRender
        const { prerenderingSiblingsNumber = 1 } = props
        let activeNum = 0;
        panes.forEach((val, i) => {
          if (val.key === activeKey) activeNum = i
        })
        if (i <= activeNum + prerenderingSiblingsNumber && i >= activeNum - prerenderingSiblingsNumber) {
          forceRender = true
        }
        return (
          <div
            className={classNames(`${_clsPrefix}-content`, {
              [`${_clsPrefix}-content-active`]: active,
              [`${_clsPrefix}-content-inactive`]: !active,
            })}
            fieldid={props.fieldid ? props.fieldid + '_tabs_content_' + i : undefined}
            key={pane.key}
          >
            <ShouldRender
              active={active}
              forceRender={forceRender}
              destroyOnClose={pane.props.destroyOnClose}
            >
              {pane.props.children}
            </ShouldRender>
          </div>
        )
      })}
    </div>
  )
}

export default WebUI({ defaultProps })(Tabs)