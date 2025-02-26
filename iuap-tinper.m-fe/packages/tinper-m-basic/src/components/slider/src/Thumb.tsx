import React, { useRef, useState } from 'react'
import type { FC } from 'react'
import { useDrag } from '@use-gesture/react'
import { ThumbIcon } from './Thumb-icon'
import { Popover } from '@tinper/m'
import { ThumbProps } from './iSlider'

const Thumb: FC<ThumbProps> = props => {
  const {
    value,
    min,
    max,
    disabled,
    icon,
    residentPopover,
    onDrag,
    clsPrefix,
    style={},
    fieldid
  } = props
  const _clsPrefix = `${clsPrefix}-thumb`

  const prevValue = useRef(value)

  const currentPosition = () => ({
    left: `${((value - min) / (max - min)) * 100}%`,
    right: 'auto',
  })

  const [dragging, setDragging] = useState(false)

  const bind = useDrag(
    state => {
      if (disabled) return
      if (state.first) {
        prevValue.current = value
      }
      const x = state.xy[0] - state.initial[0]
      const sliderOffsetWith = props.trackRef.current?.offsetWidth
      if (!sliderOffsetWith) return
      const diff = (x / Math.ceil(sliderOffsetWith)) * (max - min)
      onDrag(prevValue.current + diff, state.first, state.last)
      setDragging(!state.last)
    },
    {
      axis: 'x',
      pointer: { touch: true },
    }
  )

  const renderPopoverContent =
    typeof props.popover === 'function'
      ? props.popover
      : props.popover
        ? (value: number) => value.toString()
        : null

  const thumbElement = (
    <div className={`${_clsPrefix}`} fieldid={fieldid ? `${fieldid}_thumb` : undefined}>
      {icon ? React.cloneElement(icon, { className: `${_clsPrefix}-icon` })
        : <ThumbIcon className={`${_clsPrefix}-icon`} />}
    </div>
  )

  return (
    <div
      className={`${_clsPrefix}-container`}
      fieldid={fieldid ? `${fieldid}_thumb_container` : undefined}
      style={{ ...currentPosition(), ...style }}
      {...bind()}
      role='slider'
      aria-label={props['aria-label']}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-disabled={disabled}
    >
      {renderPopoverContent ? (
        <Popover
          content={renderPopoverContent(value)}
          placement='top'
          visible={residentPopover || dragging}
          getContainer={null}
          mode='dark'
          fieldid={fieldid ? `${fieldid}_thumb_popover` : undefined}
        >
          {thumbElement}
        </Popover>
      ) : (
        thumbElement
      )}
    </div>
  )
}

export default Thumb
