import { NativeProps, withNativeProps } from '@utils/NativeProps'
import PageIndicator, { PageIndicatorProps } from '../page-indicator'


const eventToPropRecord = {
  mousedown: 'onMouseDown',
  mousemove: 'onMouseMove',
  mouseup: 'onMouseUp',
} as const

type PropagationEvent = keyof typeof eventToPropRecord

export type SwiperRef = {
  swipeTo: (index: number) => void
  swipeNext: () => void
  swipePrev: () => void
}

export interface SwiperProps extends NativeProps {
  defaultIndex?: number
  allowTouchMove?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  direction?: 'horizontal' | 'vertical'
  onIndexChange?: (index: number) => void
  indicatorProps?: Pick<PageIndicatorProps, 'color' | 'style' | 'className'>
  indicator?: false | ((total: number, current: number) => React.ReactNode)
  slideSize?: number
  trackOffset?: number
  stuckAtBoundary?: boolean
  rubberband?: boolean
  stopPropagation?: PropagationEvent[]
  /**
   * Virtual scroll usage. Should work with renderProps `children`
   */
  total?: number
  /**
   * renderProps is only work when `total` used
   */
  children?: React.ReactElement | React.ReactElement[] | ((index: number) => React.ReactElement)
  className?: string
  style?: React.CSSProperties
  fieldid?: string
  clsPrefix?: string
}
