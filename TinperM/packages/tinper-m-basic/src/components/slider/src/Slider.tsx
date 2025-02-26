import React, { useMemo, useRef } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import Ticks from './Ticks'
import Marks from './Marks'
// todo 直接使用源码
import getMiniDecimal, { toFixed } from '@rc-component/mini-decimal'
import Thumb from './Thumb'
import { nearest } from '@utils/Nearests'
import { usePropsValue } from '@hooks/UsePropsValue'
import { devWarning } from '@utils/DevLog'
import { SliderProps } from './iSlider'
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'


export type SliderValue = number | [number, number]

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  ticks: false,
  range: false,
  disabled: false,
  popover: false,
  residentPopover: false,
}

function Slider (props: SliderProps) {
  const {
    clsPrefix,
    style,
    className,
    fieldid,
    min,
    max,
    disabled,
    marks,
    ticks,
    step,
    icon,
    handleStyle,
    trackStyle,
    railStyle
  } = props

  function sortValue(val: [number, number]): [number, number] {
    return val.sort((a, b) => a - b)
  }

  function convertValue(value: SliderValue): [number, number] {
    return (props.range ? value : [props.min, value]) as any
  }

  function alignValue(value: number, decimalLen: number) {
    const decimal = getMiniDecimal(value)
    const fixedStr = toFixed(decimal.toString(), '.', decimalLen)

    return getMiniDecimal(fixedStr).toNumber()
  }

  function reverseValue(value: [number, number]): SliderValue {
    const mergedDecimalLen = Math.max(
      getDecimalLen(step),
      getDecimalLen(value[0]),
      getDecimalLen(value[1])
    )
    return props.range
      ? (value.map(v => alignValue(v, mergedDecimalLen)) as [number, number])
      : alignValue(value[1], mergedDecimalLen)
  }

  function getDecimalLen(n: number) {
    return (`${n}`.split('.')[1] || '').length
  }

  function onAfterChange(value: [number, number]) {
    props.onAfterChange?.(reverseValue(value))
  }

  let propsValue: SliderValue | undefined = props.value
  if (props.range && typeof props.value === 'number') {
    devWarning(
      'Slider',
      'When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]'
    )
    propsValue = [0, props.value]
  }
  const [rawValue, setRawValue] = usePropsValue<SliderValue>({
    value: propsValue,
    defaultValue: props.defaultValue ?? (props.range ? [min, min] : min),
    onChange: props.onChange,
  })

  const sliderValue = sortValue(convertValue(rawValue))

  function setSliderValue(value: [number, number]) {
    const next = sortValue(value)
    const current = sliderValue
    if (next[0] === current[0] && next[1] === current[1]) return
    setRawValue(reverseValue(next))
  }

  const trackRef = useRef<HTMLDivElement>(null)

  const fillSize = `${(100 * (sliderValue[1] - sliderValue[0])) / (max - min)}%`
  const fillStart = `${(100 * (sliderValue[0] - min)) / (max - min)}%`

  // 计算要显示的点
  const pointList = useMemo(() => {
    if (marks) {
      return Object.keys(marks)
        .map(parseFloat)
        .sort((a, b) => a - b)
    } else if (ticks) {
      const points: number[] = []
      for (
        let i = getMiniDecimal(min);
        i.lessEquals(getMiniDecimal(max));
        i = i.add(step)
      ) {
        points.push(i.toNumber())
      }
      return points
    }

    return []
  }, [marks, ticks, step, min, max])

  function getValueByPosition(position: number) {
    const newPosition = position < min ? min : position > max ? max : position

    let value = min

    // 显示了刻度点，就只能移动到点上
    if (pointList.length) {
      value = nearest(pointList, newPosition)
    } else {
      // 使用 MiniDecimal 避免精度问题
      const cell = Math.round((newPosition - min) / step)
      const nextVal = getMiniDecimal(cell).multi(step)
      value = getMiniDecimal(min).add(nextVal.toString()).toNumber()
    }
    return value
  }

  const dragLockRef = useRef(0)

  const onTrackClick = (event: React.MouseEvent) => {
    if (dragLockRef.current > 0) return
    event.stopPropagation()
    if (disabled) return
    const track = trackRef.current
    if (!track) return
    const sliderOffsetLeft = track.getBoundingClientRect().left
    const position =
      ((event.clientX - sliderOffsetLeft) / Math.ceil(track.offsetWidth)) *
      (max - min) +
      min

    const targetValue = getValueByPosition(position)
    let nextSliderValue: [number, number]
    if (props.range) {
      // 移动的滑块采用就近原则
      if (
        Math.abs(targetValue - sliderValue[0]) >
        Math.abs(targetValue - sliderValue[1])
      ) {
        nextSliderValue = [sliderValue[0], targetValue]
      } else {
        nextSliderValue = [targetValue, sliderValue[1]]
      }
    } else {
      nextSliderValue = [props.min, targetValue]
    }
    setSliderValue(nextSliderValue)
    onAfterChange(nextSliderValue)
  }

  const valueBeforeDragRef = useRef<[number, number]>()

  const renderThumb = (index: number) => (
    <Thumb
      fieldid={fieldid ? `${fieldid}_slider` : undefined}
      clsPrefix={_clsPrefix}
      style={handleStyle}
      key={index}
      value={sliderValue[index]}
      min={min}
      max={max}
      disabled={disabled}
      trackRef={trackRef}
      icon={icon}
      popover={props.popover}
      residentPopover={props.residentPopover}
      onDrag={(position, first, last) => {
        if (first) {
          dragLockRef.current += 1
          valueBeforeDragRef.current = sliderValue
        }
        const val = getValueByPosition(position)
        const valueBeforeDrag = valueBeforeDragRef.current
        if (!valueBeforeDrag) return
        const next = [...valueBeforeDrag] as [number, number]
        next[index] = val
        setSliderValue(next)
        if (last) {
          onAfterChange(next)
          window.setTimeout(() => {
            dragLockRef.current -= 1
          }, 100)
        }
      }}
      aria-label={props['aria-label']}
    />
  )

  const _clsPrefix = `${clsPrefix}-slider`

  const cls = classnames(
    _clsPrefix,
    { [`${_clsPrefix}-disabled`]: disabled, },
    className
  )

  return withNativeProps(
    props,
    <div
      className={cls}
      style={style}
      fieldid={fieldid ? `${fieldid}_slider` : undefined}
    >
      <div className={`${_clsPrefix}-track-container`}
        fieldid={fieldid ?  `${fieldid}_slider_track_container` : undefined }
        onClick={onTrackClick}>
        <div
          className={`${_clsPrefix}-track`}
          fieldid={fieldid ?  `${fieldid}_slider_track` : undefined}
          onClick={onTrackClick}
          ref={trackRef}
          style={railStyle}
        >
          <div
            className={`${_clsPrefix}-fill`}
            fieldid={fieldid ?  `${fieldid}_slider_fill` : undefined}
            style={{
              width: fillSize,
              left: fillStart,
              ...trackStyle
            }}
          />
          {props.ticks && (
            <Ticks
              fieldid={fieldid ? `${fieldid}_slider` : undefined}
              clsPrefix={_clsPrefix}
              trackStyle={trackStyle}
              railStyle={railStyle}
              points={pointList}
              min={min}
              max={max}
              lowerBound={sliderValue[0]}
              upperBound={sliderValue[1]}
            />
          )}
          {props.range && renderThumb(0)}
          {renderThumb(1)}
        </div>
      </div>
      {marks && (
        <Marks
          clsPrefix={_clsPrefix}
          min={min}
          max={max}
          marks={marks}
          lowerBound={sliderValue[0]}
          upperBound={sliderValue[1]}
          fieldid={fieldid ? `${fieldid}_slider` : undefined}
        />
      )}
    </div>
  )
}

export default WebUI({ defaultProps })(Slider)
