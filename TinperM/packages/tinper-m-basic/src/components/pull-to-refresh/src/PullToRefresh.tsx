import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { getScrollParent } from '@utils/GetScrollParent'
import { supportsPassive } from '@utils/SupportsPassive'
import { convertPx } from '@utils/ConvertPx'
import { rubberbandIfOutOfBounds } from '@utils/Rubberbands'
import { sleep } from '@utils/Sleeps'
import WebUI from '@utils/UpdatePrefixs'
import { useConfig } from '@components/config-provider/src/index';
import { PullToRefreshProps, PullStatus } from './iPullToRefresh'



export const defaultProps = {
  headHeight: 40,
  threshold: 60,
  completeDelay: 500,
  disabled: false,
}

function getScrollTop(element: Window | Element) {
  return 'scrollTop' in element ? element.scrollTop : element.scrollY
}

function PullToRefresh(props: PullToRefreshProps) {
  const { locale } = useConfig()
  const {
    clsPrefix,
    className,
    fieldid,
    refreshingText = `${locale.Common.loading}...`,
    pullingText = locale.PullToRefresh.pulling,
    canReleaseText = locale.PullToRefresh.canRelease,
    completeText = locale.PullToRefresh.complete,
  } = props
  const classPrefix = `${clsPrefix}-pull-to-refresh`
  const headHeight = props.headHeight ?? convertPx(40)
  const threshold = props.threshold ?? convertPx(60)

  const [status, setStatus] = useState<PullStatus>('pulling')

  const [springStyles, api] = useSpring(() => ({
    from: { height: 0 },
    config: {
      tension: 300,
      friction: 30,
      round: true,
      clamp: true,
    },
  }))

  const elementRef = useRef<HTMLDivElement>(null)

  const pullingRef = useRef(false)

  //防止下拉时抖动
  useEffect(() => {
    elementRef.current?.addEventListener('touchmove', () => {})
  }, [])

  const reset = () => new Promise<void>(resolve => {
    api.start({
      to: { height: 0, },
      onResolve() {
        setStatus('pulling')
        resolve()
      },
    })
  })

  async function doRefresh() {
    api.start({ height: headHeight })
    setStatus('refreshing')
    try {
      await props.onRefresh()
      setStatus('complete')
    } catch (e) {
      reset()
      console.log(e)
    }
    if (props.completeDelay > 0) {
      await sleep(props.completeDelay)
    }
    reset()
  }

  useDrag(
    state => {
      if (status === 'refreshing' || status === 'complete') return

      const { event } = state

      if (state.last) {
        pullingRef.current = false
        if (status === 'canRelease') {
          doRefresh()
        } else {
          api.start({ height: 0 })
        }
        return
      }

      const [, y] = state.movement
      const parsedY = Math.ceil(y)

      if (state.first && parsedY > 0) {
        const target = state.event.target
        if (!target || !(target instanceof Element)) return
        let scrollParent = getScrollParent(target)
        while (true) {
          if (!scrollParent) return
          const scrollTop = getScrollTop(scrollParent)
          if (scrollTop > 0) {
            return
          }
          if (scrollParent instanceof Window) {
            break
          }
          scrollParent = getScrollParent(scrollParent.parentNode as Element)
        }
        pullingRef.current = true
      }

      if (!pullingRef.current) return

      if (event.cancelable) {
        event.preventDefault()
      }
      event.stopPropagation()
      const height = Math.max(
        rubberbandIfOutOfBounds(parsedY, 0, 0, headHeight * 5, 0.5),
        0
      )
      api.start({ height })
      setStatus(height > threshold ? 'canRelease' : 'pulling')
    },
    {
      pointer: { touch: true },
      axis: 'y',
      target: elementRef,
      enabled: !props.disabled,
      eventOptions: supportsPassive ? { passive: false } : undefined,
    }
  )

  const renderStatusText = () => {
    if (props.renderText) {
      return props.renderText?.(status)
    }

    if (status === 'pulling') return pullingText
    if (status === 'canRelease') return canReleaseText
    if (status === 'refreshing') return refreshingText
    if (status === 'complete') return completeText
  }

  const cls = classnames(classPrefix, className)

  return (
    <animated.div ref={elementRef} className={cls} fieldid={fieldid}>
      <animated.div style={springStyles} className={`${classPrefix}-head`}>
        <div
          className={`${classPrefix}-head-content`}
          style={{ height: headHeight }}
        >
          {renderStatusText()}
        </div>
      </animated.div>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </animated.div>
  )
}

export default WebUI({ defaultProps })(PullToRefresh)
