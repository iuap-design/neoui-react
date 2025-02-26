import classNames from 'classnames'
import React, { useState, useRef } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import Mask from '../../mask/src/index'
import { useLockScroll, useIsomorphicLayoutEffect, useUnmountedRef } from 'tne-fw-fe/hooks'
import { renderToContainer } from '@utils/RenderToContainer'
import { useSpring, animated } from '@react-spring/web'
import { useShouldRender } from '@utils/ShouldRender'
import { withStopPropagation } from '@utils/WithStopPropagation'
import { CenterPopupProps } from './iCenterPopup'
import WebUI from '@utils/UpdatePrefixs'
import Close from '@tinper/m-icons/lib/cjs/Close'
import { useInnerVisible } from '@hooks/UseInnerVisible'

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ['click'],
}

function CenterPopup(props: CenterPopupProps) {
  const {
    fieldid,
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
    disableBodyScroll = true,
    forceRender,
    destroyOnClose
  } = props

  const _clsPrefix = clsPrefix + '-center-popup';

  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(visible)

  useIsomorphicLayoutEffect(() => {
    if (visible) {
      setActive(true)
    }
  }, [visible])

  useLockScroll(ref, disableBodyScroll && active)

  // 判断是否需要渲染组件
  const shouldRender = useShouldRender(
    active,
    forceRender,
    destroyOnClose
  )
  const unmountedRef = useUnmountedRef()

  // 使用 useSpring 创建动画效果
  const style = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2, // 质量，影响动画的惯性
      tension: 200, // 张力，影响动画的速度和弹性
      friction: 25, // 摩擦力，影响动画的减速过程
      clamp: true, // 达到终点时，动画效果会立即停止
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

  const maskVisible = useInnerVisible(active && visible)

  const node = withStopPropagation(
    stopPropagation,
    withNativeProps(
      props,
      <div
        className={_clsPrefix}
        onClick={onClick}
        style={{
          display: active ? 'unset' : 'none',
          pointerEvents: active ? undefined : 'none'
        }}
        role='tooltip'
        fieldid={fieldid ? fieldid + '_center_popup' : undefined}
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
            forceRender={forceRender}
            destroyOnClose={destroyOnClose}
            className={classNames(`${_clsPrefix}-mask`, maskClassName)}
            style={maskStyle}
            disableBodyScroll={false}
            stopPropagation={stopPropagation}
            fieldid={fieldid ? fieldid + '_center_popup' : undefined}
          />
        )}
        <div
          className={`${_clsPrefix}-wrap`}
          role={props.role}
        >
          <animated.div
            style={{
              ...style,
              pointerEvents: style.opacity.to(v =>
                v === 1 ? 'unset' : 'none'
              ),
            }}
            ref={ref}
          >
            {showCloseButton && (
              <a
                className={classNames(`${_clsPrefix}-close-icon`, `${clsPrefix}-plain-anchor`)}
                onClick={() => {
                  onClose?.()
                }}
                fieldid={fieldid ? fieldid + '_center_popup_close_icon' : undefined}
              >
                <Close width="0.5rem" height="0.5rem" />
              </a>
            )}
            <div
              className={classNames(`${_clsPrefix}-body`, bodyClassName)}
              fieldid={fieldid ? fieldid + '_center_popup_body' : undefined}
              style={bodyStyle}
            >
              {shouldRender && props.children}
            </div>
          </animated.div>
        </div>
      </div >
    )
  )

  return renderToContainer(getContainer, node)
}

export default WebUI({ defaultProps })(CenterPopup)
