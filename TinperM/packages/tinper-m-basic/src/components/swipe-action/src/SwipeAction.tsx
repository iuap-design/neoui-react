import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { mergeProps } from '@utils/WithDefaultProps'
import WebUI from '@utils/UpdatePrefixs'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import Button from '../../button/src/index'
import { nearest } from '@utils/Nearests'
import { withNativeProps } from '@utils/NativeProps'
import { withStopPropagation } from '@utils/WithStopPropagation'
import { Action, SwipeActionRef, SwipeActionProps } from './iSwipeAction'
import classNames from 'classnames'

const defaultProps = {
  rightActions: [] as Action[],
  leftActions: [] as Action[],
  closeOnTouchOutside: true,
  closeOnAction: true,
  stopPropagation: [],
  disabled: false
}

type SideType = 'left' | 'right'

const SwipeAction = React.forwardRef<SwipeActionRef, SwipeActionProps>(
  (p, ref) => {
    const props = mergeProps(defaultProps, p)
    const { clsPrefix, fieldid } = props;
    const _clsPrefix = `${clsPrefix}-swipe-action`


    const rootRef = useRef<HTMLDivElement>(null)

    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

    function getWidth(ref: RefObject<HTMLDivElement>) {
      const element = ref.current
      if (!element) return 0
      return element.offsetWidth
    }

    function getLeftWidth() {
      return getWidth(leftRef)
    }

    function getRightWidth() {
      return getWidth(rightRef)
    }

    const [{ x }, api] = useSpring(
      () => ({
        x: 0,
        config: { tension: 200, friction: 30 },
      }),
      []
    )

    const draggingRef = useRef(false)

    const dragCancelRef = useRef<(() => void) | null>(null)

    function forceCancelDrag() {
      dragCancelRef.current?.()
      draggingRef.current = false
    }

    const bind = useDrag(
      state => {
        dragCancelRef.current = state.cancel
        if (!state.intentional) return
        if (state.down) {
          draggingRef.current = true
        }
        if (!draggingRef.current) return
        const [offsetX] = state.offset
        if (state.last) {
          const leftWidth = getLeftWidth()
          const rightWidth = getRightWidth()
          let position = offsetX + state.velocity[0] * state.direction[0] * 50
          if (offsetX > 0) {
            position = Math.max(0, position)
          } else if (offsetX < 0) {
            position = Math.min(0, position)
          } else {
            position = 0
          }
          const targetX = nearest([-rightWidth, 0, leftWidth], position)
          api.start({ x: targetX, })
          if (targetX !== 0) {
            p.onActionsReveal?.(targetX > 0 ? 'left' : 'right')
          }
          window.setTimeout(() => {
            draggingRef.current = false
          })
        } else {
          api.start({
            x: offsetX,
            immediate: true,
          })
        }
      },
      {
        from: () => [x.get(), 0],
        bounds: () => {
          const leftWidth = getLeftWidth()
          const rightWidth = getRightWidth()
          return {
            left: -rightWidth,
            right: leftWidth,
          }
        },
        axis: 'x',
        preventScroll: true,
        pointer: { touch: true },
        triggerAllEvents: true,
      }
    )

    function close() {
      api.start({ x: 0, })
      forceCancelDrag()
    }

    useImperativeHandle(ref, () => ({
      show: (side: SideType = 'right') => {
        if (side === 'right') {
          api.start({ x: -getRightWidth(), })
        } else if (side === 'left') {
          api.start({ x: getLeftWidth(), })
        }
        p.onActionsReveal?.(side)
      },
      close,
    }))

    useEffect(() => {
      if (!props.closeOnTouchOutside) return

      function handle(e: Event) {
        if (x.get() === 0) {
          return
        }
        const root = rootRef.current
        if (root && !root.contains(e.target as Node)) {
          close()
        }
      }

      document.addEventListener('touchstart', handle)
      return () => {
        document.removeEventListener('touchstart', handle)
      }
    }, [props.closeOnTouchOutside])

    function renderAction(action: Action) {
      const color = action.color ?? 'light'
      return (
        <Button
          mode='primary'
          key={action.key}
          icon={action.icon}
          iconPosition={action.iconPosition}
          className={classNames(
            `${_clsPrefix}-action-button`,
            action.className && action.className
          )}
          fieldid={fieldid ? fieldid + '_swipe_action_button_' + action.key : undefined}
          style={{ background: colorRecord[color] ?? color, ...action.style }}
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
            if (props.closeOnAction) {
              close()
            }
            action.onClick?.(e)
            props.onAction?.(action, e)
          }}
        >
          {action.text}
        </Button>
      )
    }

    return withNativeProps(
      props,
      <div
        className={_clsPrefix}
        fieldid={fieldid ? fieldid + '_swipe_action' : undefined}
        {...(props.disabled ? {} : bind())}
        ref={rootRef}
        onClickCapture={e => {
          if (!props.disabled && draggingRef.current) {
            e.stopPropagation()
            e.preventDefault()
          }
        }}
      >
        <animated.div className={`${_clsPrefix}-track`} style={{ x }} fieldid={fieldid ? fieldid + '_swipe_action_track' : undefined}>
          {withStopPropagation(
            props.stopPropagation,
            <div
              className={`${_clsPrefix}-actions ${_clsPrefix}-actions-left`}
              fieldid={fieldid ? fieldid + '_swipe_action_actions_left' : undefined}
              ref={leftRef}
            >
              {props.leftActions.map(renderAction)}
            </div>
          )}
          <div
            className={`${_clsPrefix}-content`}
            fieldid={fieldid ? fieldid + '_swipe_action_content' : undefined}
            onClickCapture={e => {
              if (!props.disabled && x.goal !== 0) {
                e.preventDefault()
                e.stopPropagation()
                close()
              }
            }}
          >
            <animated.div
              style={{
                pointerEvents: x.to(v =>
                  v !== 0 && x.goal !== 0 ? 'none' : 'auto'
                ),
              }}
            >
              {props.children}
            </animated.div>
          </div>
          {withStopPropagation(
            props.stopPropagation,
            <div
              className={`${_clsPrefix}-actions ${_clsPrefix}-actions-right`}
              fieldid={fieldid ? fieldid + '_swipe_action_actions_right' : undefined}
              ref={rightRef}
            >
              {props.rightActions.map(renderAction)}
            </div>
          )}
        </animated.div>
      </div>
    )
  }
)

const colorRecord: Record<string, string> = {
  light: 'var(--mui-color-light)',
  weak: 'var(--mui-color-weak)',
  primary: 'var(--mui-color-primary)',
  success: 'var(--mui-color-success)',
  warning: 'var(--mui-color-warning)',
  danger: 'var(--mui-color-danger)',
}

export default WebUI({ defaultProps })(SwipeAction)