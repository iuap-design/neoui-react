import React, { useImperativeHandle, useRef, useState } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import { supportsPassive } from '@utils/SupportsPassive'
import { nearest } from '@utils/Nearests'
import { mergeProps } from '@utils/WithDefaultProps'
import { useLockScroll, useMemoizedFn } from 'tne-fw-fe/hooks'
import { FloatingPanelProps, FloatingPanelRef } from './iFloatingPanel'
import WebUI from '@utils/UpdatePrefixs'
import FloatingArrow from '@tinper/m-icons/lib/cjs/FloatingArrow'


const defaultProps = { handleDraggingOfContent: true }

const FloatingPanel = React.forwardRef<FloatingPanelRef, FloatingPanelProps>(
  (p, ref) => {
    const props = mergeProps(defaultProps, p)
    const { anchors, fieldid, clsPrefix } = props
    const classPrefix = `${clsPrefix}-floating-panel`
    const maxHeight = anchors[anchors.length - 1] ?? window.innerHeight

    const possibles = anchors.map(x => -x)

    const elementRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [pulling, setPulling] = useState(false)
    const pullingRef = useRef(false)

    const bounds = {
      top: possibles[possibles.length - 1],
      bottom: possibles[0],
    }

    const onHeightChange = useMemoizedFn(props.onHeightChange ?? (() => {}))

    const [{ y }, api] = useSpring(() => ({
      y: bounds.bottom,
      config: { tension: 300 },
      onChange: result => {
        onHeightChange(-result.value.y, y.isAnimating)
      },
    }))

    useDrag(
      state => {
        const [, offsetY] = state.offset
        if (state.first) {
          const target = state.event.target as Element
          const header = headerRef.current
          if (header === target || header?.contains(target)) {
            pullingRef.current = true
          } else {
            if (!props.handleDraggingOfContent) return
            const reachedTop = y.goal <= bounds.top
            const content = contentRef.current
            if (!content) return
            if (reachedTop) {
              if (content.scrollTop <= 0 && state.direction[1] > 0) {
                pullingRef.current = true
              }
            } else {
              pullingRef.current = true
            }
          }
        }
        setPulling(pullingRef.current)
        if (!pullingRef.current) return
        const { event } = state
        if (event.cancelable && supportsPassive) {
          event.preventDefault()
        }
        event.stopPropagation()
        let nextY = offsetY
        if (state.last) {
          pullingRef.current = false
          setPulling(false)
          nextY = nearest(possibles, offsetY)
        }
        api.start({ y: nextY })
      },
      {
        axis: 'y',
        bounds,
        rubberband: true,
        from: () => [0, y.get()],
        pointer: { touch: true },
        target: elementRef,
        eventOptions: supportsPassive ? { passive: false } : undefined,
      }
    )

    useImperativeHandle(
      ref,
      () => ({
        setHeight: (
          height: number,
          options?: {
            immediate?: boolean
          }
        ) => {
          api.start({
            y: -height,
            immediate: options?.immediate,
          })
        },
      }),
      [api]
    )

    useLockScroll(elementRef, true)

    return withNativeProps(
      props,
      <animated.div
        ref={elementRef}
        className={classPrefix}
        style={{
          height: Math.round(maxHeight),
          translateY: y.to(y => `calc(100% + (${Math.round(y)}px))`),
        }}
        fieldid={fieldid ? fieldid + '_floating_panel' : undefined}
      >
        <div
          className={`${classPrefix}-mask`}
          style={{ display: pulling ? 'block' : 'none' }}
          fieldid={fieldid ? fieldid + '_floating_panel_mask' : undefined}
        />
        <div className={`${classPrefix}-header`} ref={headerRef} fieldid={fieldid ? fieldid + '_floating_panel_header' : undefined}>
          {/* <div className={`${classPrefix}-bar`} fieldid={`${fieldid}-bar`}/> */}
          <FloatingArrow className={`${classPrefix}-bar`} fieldid={fieldid ? fieldid + '_floating_panel_bar' : undefined}/>
        </div>
        <div className={`${classPrefix}-content`} ref={contentRef} fieldid={fieldid ? fieldid + '_floating_panel_content' : undefined}>
          {props.children}
        </div>
      </animated.div>
    )
  }
)

export default WebUI({ defaultProps })(FloatingPanel)
