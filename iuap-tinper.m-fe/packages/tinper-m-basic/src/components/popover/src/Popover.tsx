import React, { useEffect, useImperativeHandle, useRef, useState, } from 'react'
import classNames from 'classnames'

import { arrow, autoUpdate, computePosition, flip, hide, limitShift, offset, shift, } from '@floating-ui/dom'
import { Wrapper } from './Wrapper'
import { useIsomorphicLayoutEffect, useClickAway } from 'tne-fw-fe/hooks'
import { Placement, PopoverProps, PopoverRef } from './index'
import { normalizePlacement } from './NormalizePlacement'
import { withNativeProps } from '@utils/NativeProps';
import { withStopPropagation } from '@utils/WithStopPropagation';
import { mergeProps } from '@utils/WithDefaultProps';
import { usePropsValue } from '@hooks/UsePropsValue';
import { convertPx } from '@utils/ConvertPx';
import { useShouldRender } from '@utils/ShouldRender';
import { renderToContainer } from '@utils/RenderToContainer';
import WebUI from '@utils/UpdatePrefixs';


const defaultProps = {
  placement: 'top' as Placement,
  defaultVisible: false,
  stopPropagation: ['click'],
  getContainer: () => document.body,
  trigger: 'click',
  mode: 'light',
}

export const Popover = React.forwardRef<PopoverRef, PopoverProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const placement = normalizePlacement(props.placement)

  const { clsPrefix, fieldid } = props;

  const classPrefix = `${clsPrefix}-popover`;

  const [visible, setVisible] = usePropsValue<boolean>({
    value: props.visible,
    defaultValue: props.defaultVisible,
    onChange: props.onVisibleChange,
  })

  useImperativeHandle(
    ref,
    () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
      visible,
    }),
    [visible]
  )


  const targetRef = useRef< Wrapper>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const floating = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        className={classNames(classPrefix, `${classPrefix}-${props.mode}`, { [`${classPrefix}-hidden`]: !visible, })}
        ref={floatingRef}
        role="tooltip"
        fieldid={`${fieldid}-floating`}
      >
        <div className={`${classPrefix}-arrow`} ref={arrowRef}>
          {/*<Arrow className={`${classPrefix}-arrow-icon`} />*/}
        </div>
        <div className={`${classPrefix}-inner`}>
          <div className={`${classPrefix}-inner-content`}>{props.content}</div>
        </div>
      </div>
    )
  )

  const [targetElement, setTargetElement] = useState<Element | null>(null)

  async function update() {
    const target = targetRef.current?.element ?? null

    const floating = floatingRef.current
    const arrowElement = arrowRef.current

    setTargetElement(target)
    if (!target || !floating || !arrowElement) return

    const {
      x,
      y,
      placement: realPlacement,
      middlewareData,
    } = await computePosition(target, floating, {
      placement,
      middleware: [
        offset(convertPx(12)),
        shift({
          padding: convertPx(4),
          limiter: limitShift(),
        }),
        flip(),
        hide(),
        arrow({
          element: arrowElement,
          padding: convertPx(12),
        }),
      ],
    })

    Object.assign(floating.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    const side = realPlacement.split('-')[0]
    const arrowSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side]
    const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [arrowSide as string]: 'calc(var(--arrow-size) * -1 / 2 )',
    })
    const arrowRotate = {
      top: '0deg',
      bottom: '180deg',
      left: '270deg',
      right: '90deg',
    }[side]
    arrowRotate && arrowElement.style.setProperty('--arrow-icon-rotate', arrowRotate)
  }

  useEffect(() => {
    update()
  })

  useEffect(() => {
    if (!targetElement) return
    if (!props.trigger) return

    function handleClick() {
      setVisible(v => !v)
    }

    targetElement.addEventListener('click', handleClick)
    return () => {
      targetElement.removeEventListener('click', handleClick)
    }
  }, [targetElement, props.trigger])

  useEffect(() => {
    const floatingElement = floatingRef.current
    if (!targetElement || !floatingElement) return
    return  autoUpdate(targetElement, floatingElement, update)
  }, [targetElement])

  useClickAway(
    () => {
      if (!props.trigger) return
      setVisible(false)
    },
    [() => targetRef.current?.element, floatingRef],
    ['click', 'touchmove']
  )

  const shouldRender = useShouldRender(visible, false, props.destroyOnHide)

  return (
    <>
      <Wrapper ref={targetRef}>{props.children}</Wrapper>
      {shouldRender && renderToContainer(props.getContainer, floating)}
    </>
  )
})

export default WebUI({})(Popover)
