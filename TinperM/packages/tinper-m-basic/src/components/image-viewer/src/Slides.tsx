import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import { Slide } from './Slide'
import { convertPx } from '@utils/ConvertPx'
import { bound } from '@utils/Bounds'

export type SlidesType = {
  clsPrefix: string,
  images: string[]
  onTap?: () => void
  maxZoom: number
  defaultIndex: number
  onIndexChange?: (index: number) => void
  fieldid: string
}
export type SlidesRef = {
  swipeTo: (index: number, immediate?: boolean) => void
}

// eslint-disable-next-line react/display-name
export const Slides = forwardRef<SlidesRef, SlidesType>((props, ref) => {
  const slideWidth = window.innerWidth + convertPx(16)
  console.log('slideWidth', slideWidth)
  const [{ x }, api] = useSpring(() => ({
    x: props.defaultIndex * slideWidth,
    config: { tension: 250, clamp: true },
  }))

  const count = props.images.length

  function swipeTo(index: number, immediate = false) {
    const i = bound(index, 0, count - 1)
    props.onIndexChange?.(i)
    api.start({
      x: i * slideWidth,
      immediate,
    })
  }

  useImperativeHandle(ref, () => ({ swipeTo, }))

  const dragLockRef = useRef(false)
  const bind = useDrag(
    state => {
      if (dragLockRef.current) return
      const [offsetX] = state.offset
      if (state.last) {
        const minIndex = Math.floor(offsetX / slideWidth)
        const maxIndex = minIndex + 1
        const velocityOffset =
          Math.min(state.velocity[0] * 2000, slideWidth) * state.direction[0]
        swipeTo(
          bound(
            Math.round((offsetX + velocityOffset) / slideWidth),
            minIndex,
            maxIndex
          )
        )
      } else {
        api.start({
          x: offsetX,
          immediate: true,
        })
      }
    },
    {
      transform: ([x, y]) => [-x, y],
      from: () => [x.get(), 0],
      bounds: () => ({
        left: 0,
        right: (count - 1) * slideWidth,
      }),
      rubberband: true,
      axis: 'x',
      pointer: { touch: true },
    }
  )

  const { clsPrefix, fieldid } = props;
  const _clsPrefix = `${clsPrefix}-slides`

  return (
    <div className={_clsPrefix} {...bind()} fieldid={fieldid}>
      <animated.div className={`${_clsPrefix}-indicator`}>
        {x.to(v => {
          const index: number = bound(Math.round(v / slideWidth), 0, count - 1)
          return `${index + 1}/${count}`
        })}
      </animated.div>
      <animated.div
        className={`${_clsPrefix}-inner`}
        style={{ x: x.to(x => -x) }}
      >
        {props.images.map((image, index) => (
          <Slide
            fieldid={`${fieldid}_slide_${index}`}
            clsPrefix={clsPrefix}
            key={index}
            image={image}
            onTap={props.onTap}
            maxZoom={props.maxZoom}
            onZoomChange={zoom => {
              if (zoom !== 1) {
                const index: number = Math.round(x.get() / slideWidth)
                api.start({ x: index * slideWidth, })
              }
            }}
            dragLockRef={dragLockRef}
          />
        ))}
      </animated.div>
    </div>
  )
})
