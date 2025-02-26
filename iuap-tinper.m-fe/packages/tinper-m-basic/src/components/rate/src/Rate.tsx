import React, { useId, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Star } from './Star'
import { useDrag } from '@use-gesture/react'
import { withNativeProps } from '@utils/NativeProps';
import { mergeProps } from '@utils/WithDefaultProps';
import { usePropsValue } from '@hooks/UsePropsValue';
import { clamp } from 'lodash';
import { RateProps } from '@components/rate/src/iRate';


const defaultProps = {
  count: 5,
  allowHalf: false,
  character: <Star />,
  defaultValue: 0,
  readOnly: false,
  allowClear: false,
  clsPrefix: 'mui'
}

// function getStarWidth(style) {
//   // 获取根元素font-size大小
//   const htmlFontSize = window.getComputedStyle(
//     document.documentElement,
//   ).fontSize;

//   //默认375屏幕下fontSize=50px,且星星宽度为0.48rem时实际宽度25.2px，padding为3px
//   const fontSizeScale = parseFloat(htmlFontSize) / 50
//   let starW = 25.2 * fontSizeScale
//   let padding = 3 * fontSizeScale
//   if (style && style['--star-size']) {
//     const starWrem = 0.48
//     const customStarWrem = parseFloat(style['--star-size'])
//     const scale = customStarWrem / starWrem
//     starW = starW * scale
//     padding = padding * scale
//   }
//   return starW + padding * 2
// }

export function Rate(p: RateProps) {
  const props = mergeProps(defaultProps, p)
  const classPrefix = `${props.clsPrefix}-rate`
  const [value, setValue] = usePropsValue(props)

  const containerRef = useRef<HTMLDivElement>(null)
  const starList = Array.from({ length: props.count })

  // const id = useId()
  // const fieldId = props.fieldid ?? `${id}-star-rate`

  function renderStar(v: number, half: boolean) {
    return (
      <div
        className={classNames(`${classPrefix}-star`, {
          [`${classPrefix}-star-active`]: value >= v,
          [`${classPrefix}-star-half`]: half,
          [`${classPrefix}-star-readonly`]: props.readOnly,
          [`${classPrefix}-star-disabled`]: props.disabled,
        })}
        role='radio'
        aria-checked={value >= v}
        aria-label={'' + v}
      >
        {props.character}
      </div>
    )
  }

  const bind = useDrag(
    state => {
      if (props.readOnly || props.disabled) return
      const {
        xy: [clientX, clientY],
        tap,
      } = state
      const container = containerRef.current
      if (!container) return
      const starWidth = container.firstChild?.offsetWidth || 31.2 //|| getStarWidth(props.style)
      const rect = container.getBoundingClientRect()
      // const rawValue = ((clientX - rect.left) / rect.width) * props.count
      const countX = Math.floor(Math.ceil(rect.width) / starWidth)
      const countY = Math.ceil(props.count / countX)
      const rawValueX = ((clientX - rect.left) / (starWidth * countX)) * countX; // 对于x轴
      const rawValueY = ((clientY - rect.top) / rect.height) * countY; // 对于y轴
      const ceiledValue = props.allowHalf
        ? Math.ceil(rawValueX * 2) / 2 + Math.floor(rawValueY) * countX
        : Math.ceil(rawValueX) + Math.floor(rawValueY) * countX
      // const ceiledValue = props.allowHalf
      //   ? Math.ceil(rawValue * 2) / 2
      //   : Math.ceil(rawValue)

      const boundValue = clamp(ceiledValue, props.allowClear ? 0 : (props.allowHalf ? 0.5 : 1), props.count)

      if (tap) {
        if (props.allowClear && boundValue === value) {
          setValue(0)
          return
        }
      }


      setValue(boundValue)
    },
    {
      axis: 'x',
      pointer: { touch: true, },
      filterTaps: true,
    }
  )
  return withNativeProps(
    props,
    <div
      className={classNames(
        classPrefix,
        // { [`${classPrefix}-half`]: props.allowHalf, }
      )}
      role='radiogroup'
      aria-readonly={props.readOnly}
      ref={containerRef}
      fieldid={props.fieldid}
      {...bind()}
    >
      {starList.map((_, i) => (
        <div key={i} className={classNames(`${classPrefix}-box`)}>
          {props.allowHalf && renderStar(i + 0.5, true)}
          {renderStar(i + 1, false)}
        </div>
      ))}
    </div>
  )
}
