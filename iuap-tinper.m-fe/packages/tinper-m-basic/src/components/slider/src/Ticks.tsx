import React from 'react'
import type { FC } from 'react'
import classNames from 'classnames'
import { TicksProps } from './iSlider'

const Ticks: FC<TicksProps> = ({
  points,
  max,
  min,
  upperBound,
  lowerBound,
  clsPrefix,
  trackStyle={},
  railStyle={},
  fieldid
}) => {
  const _clsPrefix = `${clsPrefix}-tick`

  const range = max - min
  const elements = points.map((point, index) => {
    const offset = `${(Math.abs(point - min) / range) * 100}%`

    const isActived = point <= upperBound && point >= lowerBound
    const style = {
      left: offset,
      ...(isActived ? trackStyle : railStyle)
    }

    const pointClassName = classNames({
      [`${_clsPrefix}`]: true,
      [`${_clsPrefix}-active`]: isActived,
    })

    return <span className={pointClassName} style={style} key={point} fieldid={fieldid ? `${fieldid}_ticks_${index}` : undefined}/>
  })

  return <div className={`${_clsPrefix}-ticks`} fieldid={fieldid ? `${fieldid}_ticks` : undefined}>{elements}</div>
}

export default Ticks
