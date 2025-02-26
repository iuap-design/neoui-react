import { withNativeProps } from '@utils/NativeProps'
import React, { useMemo, useRef, useState } from 'react'
import { useLockScroll, useUnmountedRef } from 'tne-fw-fe/hooks'
import { useSpring, animated } from '@react-spring/web'
import { renderToContainer } from '@utils/RenderToContainer'
import { mergeProps } from '@utils/WithDefaultProps'
import { useConfig } from '@components/config-provider/src'
import { withStopPropagation } from '@utils/WithStopPropagation'
import WebUI from '@utils/UpdatePrefixs'
import { ShouldRender } from '@utils/ShouldRender'
import { MaskProps } from './iMask'

const opacityRecord = {
  default: 0.5,
  thin: 0.3,
  thick: 0.8,
}
const colorRecord: Record<string, string> = {
  black: '17, 17, 17',
  white: '255, 255, 255',
}

const defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click'],
}

const Mask: React.FC<MaskProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { fieldid, clsPrefix } = props
  const { locale } = useConfig()
  const _clsPrefix = clsPrefix + '-mask'

  const ref = useRef<HTMLDivElement>(null)

  // 兼容 mdf 特殊场景，详见 QDJCJS-25447 ，mdf 沟通人员: 何艳阳
  if (!props.disableScrollLock) useLockScroll(ref, props.visible && props.disableBodyScroll)

  const background = useMemo(() => {
    const opacity = opacityRecord[props.opacity] ?? props.opacity
    const rgb = colorRecord[props.color]
    return rgb ? `rgba(${rgb}, ${opacity})` : props.color
  }, [props.color, props.opacity])

  const [active, setActive] = useState(props.visible)

  const unmountedRef = useUnmountedRef()
  const { opacity } = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 250,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow?.()
      } else {
        props.afterClose?.()
      }
    },
  })

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <animated.div
        className={_clsPrefix}
        ref={ref}
        aria-hidden
        style={{
          ...props.style,
          background,
          opacity,
          display: active ? undefined : 'none',
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (e.target === e.currentTarget) {
            props.onMaskClick?.(e)
          }
        }}
        fieldid={fieldid ? fieldid + '_mask' : undefined}
      >
        {props.onMaskClick && (
          <div
            className={`${_clsPrefix}-aria-button`}
            role='button'
            aria-label={locale.Mask.name}
            onClick={props.onMaskClick}
          />
        )}
        <div className={`${_clsPrefix}-content`} fieldid={fieldid ? fieldid + '_mask_content' : undefined}>
          {props.children}
        </div>
      </animated.div>
    )
  )

  return (
    <ShouldRender
      active={active}
      forceRender={props.forceRender}
      destroyOnClose={props.destroyOnClose}
    >
      {renderToContainer(props.getContainer, node)}
    </ShouldRender>
  )
}

export default WebUI({ defaultProps })(Mask)
