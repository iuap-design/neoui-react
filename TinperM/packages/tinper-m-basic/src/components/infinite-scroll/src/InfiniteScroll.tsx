import React, { useEffect, useRef, useState } from 'react'
import WebUI from '@utils/UpdatePrefixs'
import { InfiniteScrollProps } from './iInfiniteScroll'
import { useLockFn, useThrottleFn } from 'tne-fw-fe/hooks'
import { getScrollParent } from '@utils/GetScrollParent'
import { withNativeProps } from '@utils/NativeProps'
import DotLoading from '@common/dot-loading/src'
import { useConfig } from '@components/config-provider/src/index';


const defaultProps = {
  threshold: 250,
  hasMore: false,
  children: (hasMore: boolean, failed: boolean, retry: () => void, clsPrefix: string) => (
    <InfiniteScrollContent hasMore={hasMore} failed={failed} retry={retry} clsPrefix={clsPrefix} />
  )
}

function isWindow(element: any | Window): element is Window {
  return element === window
}

const InfiniteScrollContent = (props: {
  hasMore: boolean
  failed: boolean
  clsPrefix: string
  retry: () => void
}) => {
  const { locale } = useConfig()
  const { hasMore, clsPrefix, failed, retry } = props
  if (!hasMore) {
    return <span>{locale.InfiniteScroll.noMore}</span>
  }

  if (failed) {
    return (
      <span>
        <span className={`${clsPrefix}-infinite-scroll-failed-text`}>
          {locale.InfiniteScroll.failedToLoad}
        </span>
        <a className={`${clsPrefix}-infinite-scroll-failed-retry`}
          onClick={() => {
            retry()
          }}
        >
          {locale.InfiniteScroll.retry}
        </a>
      </span>
    )
  }

  return (
    <>
      <span>{locale.Common.loading}...</span>
    </>
  )
}

function InfiniteScroll(props: InfiniteScrollProps) {
  const { fieldid, hasMore, loadMore, clsPrefix, className } = props
  const [failed, setFailed] = useState(false)
  const doLoadMore = useLockFn(async (isRetry: boolean) => {
    try {
      await loadMore(isRetry)
    } catch (e) {
      setFailed(true)
      throw e
    }
  })

  const elementRef = useRef<HTMLDivElement>(null)

  const [flag, setFlag] = useState({})
  const nextFlagRef = useRef(flag)
  const thresholdRef = useRef(false)

  const [scrollParent, setScrollParent] = useState<
    Window | Element | null | undefined
  >()

  const isReachBottom = () => {
    const element = elementRef.current
    if (!element) return
    if (!element.offsetParent) return
    const parent = getScrollParent(element)
    setScrollParent(parent)
    if (!parent) return
    const rect = element.getBoundingClientRect()
    const elementTop = rect.top
    const current = isWindow(parent)
      ? window.innerHeight
      : parent.getBoundingClientRect().bottom
    const reachBottom = current >= elementTop - props.threshold
    return reachBottom
  }

  const { run: check } = useThrottleFn(
    async () => {
      if (nextFlagRef.current !== flag) return
      if (!props.hasMore) return
      const reachBottom = isReachBottom()
      if (reachBottom) {
        const nextFlag = {}
        nextFlagRef.current = nextFlag
        try {
          await doLoadMore(false)
          setFlag(nextFlag)
        } catch (e) {
          console.error(e)
        }
      }
    },
    {
      wait: 100,
      leading: true,
      trailing: true,
    }
  )

  const { run: checkScroll } = useThrottleFn(() => {
    const reachBottom = isReachBottom()
    if (reachBottom && !thresholdRef.current) {
      thresholdRef.current = true
      try {
        props.onEndReached?.()
      } catch (e) {
        console.error(e)
      }
    } else if (!reachBottom) {
      thresholdRef.current = false
    }
  }, {
    wait: 100,
    leading: true,
    trailing: true,
  })

  // Make sure to trigger `loadMore` when content changes
  useEffect(() => {
    check()
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    if (!scrollParent) return

    function onScroll() {
      check()
      checkScroll()
    }

    scrollParent.addEventListener('scroll', onScroll)
    return () => {
      scrollParent.removeEventListener('scroll', onScroll)
    }
  }, [scrollParent])

  async function retry() {
    setFailed(false)
    try {
      await doLoadMore(true)
      setFlag(nextFlagRef.current)
    } catch (e) {
      console.log(e)
    }
  }

  return withNativeProps(
    props,
    <div className={`${clsPrefix}-infinite-scroll`} ref={elementRef} fieldid={fieldid}>
      {typeof props.children === 'function'
        ? props.children(hasMore, failed, retry, clsPrefix)
        : props.children}
    </div>
  )
}

export default WebUI({ defaultProps })(InfiniteScroll)
