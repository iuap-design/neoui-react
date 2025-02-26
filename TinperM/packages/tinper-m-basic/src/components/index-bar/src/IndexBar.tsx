import React, { useRef, useState, useImperativeHandle } from 'react'
import type { ReactNode, ReactElement } from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { useThrottleFn } from 'tne-fw-fe/hooks'
import { mergeProps } from '@utils/WithDefaultProps'
import { Sidebar } from './Sidebar'
import { convertPx } from '@utils/ConvertPx'
import { Panel } from './Panel'
import { devWarning } from '@utils/DevLog'
import { traverseReactNode } from '@utils/TraverseReactNode'
import { IndexBarRef, IndexBarProps } from './iIndexBar'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = { sticky: true }

const IndexBar = React.forwardRef<IndexBarRef, IndexBarProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const titleHeight = convertPx(35)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { clsPrefix, fieldid } = props;
  const _clsPrefix = `${clsPrefix}-index-bar`

  const indexItems: {
    index: string
    brief: ReactNode
  }[] = []
  const panels: ReactElement[] = []

  traverseReactNode(props.children, child => {
    if (!React.isValidElement(child)) return
    if (child.type !== Panel) {
      devWarning(
        'IndexBar',
        'The children of `IndexBar` must be `IndexBar.Panel` components.'
      )
      return
    }
    indexItems.push({
      index: child.props.index,
      brief: child.props.brief ?? child.props.index.charAt(0),
    })
    panels.push(
      withNativeProps(
        child.props,
        <div
          key={child.props.index}
          data-index={child.props.index}
          className={`${_clsPrefix}-anchor`}
          fieldid={fieldid ? fieldid + '_index_bar_anchor_' + child.props.index : undefined}
        >
          <div 
            className={`${_clsPrefix}-anchor-title`}
            fieldid={fieldid ? fieldid + '_index_bar_anchor_title_' + child.props.index : undefined}
          >
            {child.props.title || child.props.index}
          </div>
          {child.props.children}
        </div>
      )
    )
  })

  const [activeIndex, setActiveIndex] = useState(() => {
    const firstItem = indexItems[0]
    return firstItem ? firstItem.index : null
  })

  useImperativeHandle(ref, () => ({ scrollTo }))

  function scrollTo(index: string) {
    const body = bodyRef.current
    if (!body) return

    const children = body.children
    for (let i = 0; i < children.length; i++) {
      const panel = children.item(i) as HTMLElement
      if (!panel) continue
      const panelIndex = panel.dataset['index']
      if (panelIndex === index) {
        body.scrollTop = panel.offsetTop
        setActiveIndex(index)
        activeIndex !== index && props.onIndexChange?.(index)
        return
      }
    }
  }

  const { run: checkActiveIndex } = useThrottleFn(
    () => {
      const body = bodyRef.current
      if (!body) return
      const scrollTop = body.scrollTop

      const elements = body.getElementsByClassName(`${_clsPrefix}-anchor`)
      for (let i = 0; i < elements.length; i++) {
        const panel = elements.item(i) as HTMLElement
        if (!panel) continue
        const panelIndex = panel.dataset['index']
        if (!panelIndex) continue
        if (panel.offsetTop + panel.clientHeight - titleHeight > scrollTop) {
          setActiveIndex(panelIndex)
          activeIndex !== panelIndex && props.onIndexChange?.(panelIndex)
          return
        }
      }
    },
    { wait: 50, trailing: true, leading: true }
  )

  return withNativeProps(
    props,
    <div
      className={classNames(`${_clsPrefix}`, { [`${_clsPrefix}-sticky`]: props.sticky, })}
      fieldid={fieldid ? fieldid + '_index_bar' : undefined}
    >
      <Sidebar
        indexItems={indexItems}
        activeIndex={activeIndex}
        clsPrefix={_clsPrefix}
        onActive={index => {
          scrollTo(index)
        }}
        fieldid={fieldid ? fieldid + '_index_bar' : undefined}
      />

      <div
        className={`${_clsPrefix}-body`}
        fieldid={fieldid ? fieldid + '_index_bar_body' : undefined}
        ref={bodyRef}
        onScroll={checkActiveIndex}
      >
        {panels}
      </div>
    </div>
  )
})

export default WebUI({ defaultProps })(IndexBar)