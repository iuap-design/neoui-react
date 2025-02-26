import classNames from 'classnames'
import React, { useState, useRef } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import Mask from '../../mask/src/index'
import Button from '../../button/src/index'
import SafeArea from '../../safe-area/src/index'
import { useLockScroll, useIsomorphicLayoutEffect, useUnmountedRef } from 'tne-fw-fe/hooks'
import { renderToContainer } from '@utils/RenderToContainer'
import { useSpring, animated } from '@react-spring/web'
import { ShouldRender } from '@utils/ShouldRender'
import { withStopPropagation } from '@utils/WithStopPropagation'
import { PopupProps } from './iPopup'
import WebUI from '@utils/UpdatePrefixs'
import Close from '@tinper/m-icons/lib/cjs/Close'
import { useInnerVisible } from '@hooks/UseInnerVisible'
import { useDrag } from '@use-gesture/react'

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ['click'],
}

function Popup(props: PopupProps) {
  const {
    fieldid,
    position = 'bottom',
    bodyClassName,
    visible = false,
    afterShow,
    afterClose,
    stopPropagation = ['click'],
    onClick,
    mask,
    onMaskClick,
    maskClassName,
    maskStyle,
    bodyStyle,
    getContainer = null,
    clsPrefix,
    showCloseButton,
    onClose,
    closeOnMaskClick,
    closeOnSwipe,
    hideTitleOnNoClose
  } = props

  const _clsPrefix = clsPrefix + '-popup';
  const bodyCls = classNames(
    `${_clsPrefix}-body`,
    bodyClassName,
    props.safeAreaBottom && `${_clsPrefix}-body-safearea`,
    `${_clsPrefix}-body-position-${position}`
  )
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(visible)

  useLockScroll(ref, props.disableBodyScroll && active ? 'strict' : false)

  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true)
    }
  }, [props.visible])
  const unmountedRef = useUnmountedRef()

  // 使用 useSpring 创建动画效果
  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1, // 控制动画的精度
      mass: 0.4, // 质量，影响动画的惯性
      tension: 300, // 张力，影响动画的速度和弹性
      friction: 30, // 摩擦力，影响动画的减速过程
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => { // 当动画静止（完成）时会被调用
      if (unmountedRef.current) return
      setActive(visible)
      if (visible) {
        afterShow?.()
      } else {
        afterClose?.()
      }
    },
  })

  // 使用 useDrag 创建拖拽效果，根据位置和滑动方向判断是否关闭弹窗
  const bind = useDrag(
    ({ swipe: [, swipeY] }) => {
      if (!closeOnSwipe) return
      if (
        (swipeY === 1 && position === 'bottom') ||
        (swipeY === -1 && position === 'top')
      ) {
        onClose?.()
      }
    },
    {
      axis: 'y',
      enabled: ['top', 'bottom'].includes(position),
    }
  )
  const maskVisible = useInnerVisible(active && visible);

  const node = withStopPropagation(
    stopPropagation,
    withNativeProps(
      props,
      <div
        className={_clsPrefix}
        onClick={onClick}
        style={{
          display: active ? undefined : 'none',
          touchAction: ['top', 'bottom'].includes(position) ? 'none' : 'auto'
        }}
        fieldid={fieldid ? fieldid + '_popup' : undefined}
        role="tooltip"
        {...bind()}
      >
        {mask && (
          <Mask
            visible={maskVisible}
            onMaskClick={e => {
              onMaskClick?.(e)
              if (closeOnMaskClick) {
                onClose?.()
              }
            }}
            forceRender={props.forceRender}
            destroyOnClose={props.destroyOnClose}
            className={classNames(`${_clsPrefix}-mask`, maskClassName)}
            style={maskStyle}
            disableBodyScroll={false}
            stopPropagation={stopPropagation}
            fieldid={fieldid ? fieldid + '_popup' : undefined}
          />
        )}
        <animated.div
          className={bodyCls}
          fieldid={fieldid ? fieldid + '_popup_body' : undefined}
          style={{
            ...bodyStyle,
            pointerEvents: percent.to(v => (v === 0 ? 'unset' : 'none')),
            transform: percent.to(v => {
              if (position === 'bottom') {
                return `translate(0, ${v}%)`
              }
              if (position === 'top') {
                return `translate(0, -${v}%)`
              }
              if (position === 'left') {
                return `translate(-${v}%, 0)`
              }
              if (position === 'right') {
                return `translate(${v}%, 0)`
              }
              return 'none'
            }),
          }}
          ref={ref}
        >
          {showCloseButton && (
            <a
              className={classNames(`${_clsPrefix}-close-icon`, `${clsPrefix}-plain-anchor`)}
              onClick={() => {
                onClose?.()
              }}
              fieldid={fieldid ? fieldid + '_popup_close_icon' : undefined}
            >
              <Close width="0.44rem" height="0.44rem" />
            </a>
          )}
          <div
            className={`${_clsPrefix}-title`}
            fieldid={fieldid ? fieldid + '_popup_title' : undefined}
            style={{ display: (((position === 'bottom' || !position) && props.popupTitle ) || (!hideTitleOnNoClose && showCloseButton) )? 'flex' : 'none' }}>
            {props.popupTitle}
          </div>
          {props.children}
          {
            (position === 'bottom' || !position) ? (
              <div
                className={`${_clsPrefix}-footer`}
                fieldid={fieldid ? fieldid + '_popup_footer' : undefined}>
                {
                  Array.isArray(props.footer) ? (
                    <div className={`${_clsPrefix}-button-group-${props.footer.length === 2  ? 'h' : 'v'}`} role="group">
                      {props.footer.map((button, i) =>
                        <Button
                          key={i}
                          className={classNames(
                            `${_clsPrefix}-button`,
                            button.className && button.className,
                            button.bold && `${clsPrefix}-popup-button-bold`,
                            button.danger && `${clsPrefix}-popup-button-danger`,
                            button.primary && `${clsPrefix}-popup-button-primary`
                          )}
                          style={{ ...button.style }}
                          fieldid={fieldid ? fieldid + '_popup_button_group_' + i : undefined}
                          block
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            button.onPress?.()
                          }}
                          disabled={button.disabled}
                        >
                          {button.text}
                        </Button>
                      )}
                    </div>
                  ) : props.footer
                }
              </div>
            ) : null
          }
        </animated.div>
      </div>
    )
  )

  return (
    <ShouldRender
      active={active}
      forceRender={props.forceRender}
      destroyOnClose={props.destroyOnClose}
    >
      {renderToContainer(getContainer, node)}
    </ShouldRender>
  )
}

export default WebUI({ defaultProps })(Popup)
