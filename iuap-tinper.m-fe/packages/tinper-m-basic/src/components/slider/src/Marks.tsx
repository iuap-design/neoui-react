import React from 'react'
import type { FC } from 'react'
import classNames from 'classnames'
import { MarksProps } from './iSlider'

const Marks: FC<MarksProps> = ({
  marks,
  upperBound,
  lowerBound,
  max,
  min,
  clsPrefix,
  fieldid
}) => {
  const _clsPrefix = `${clsPrefix}-mark`

  const marksKeys = Object.keys(marks)

  const range = max - min
  const elements = marksKeys
    .map(parseFloat)
    .sort((a, b) => a - b)
    .filter(point => point >= min && point <= max)
    .map((point, index) => {
      const markPoint = marks[point]
      if (!markPoint && markPoint !== 0) {
        return null
      }

      const isActive = point <= upperBound && point >= lowerBound
      const markClassName = classNames({
        [`${_clsPrefix}-text`]: true,
        [`${_clsPrefix}-text-active`]: isActive,
      })

      const style = { left: `${((point - min) / range) * 100}%`, }
      return (
        <span className={markClassName} style={style} key={point} fieldid={fieldid ? `${fieldid}_marks_${index}` : undefined}>
          {markPoint}
        </span>
      )
    })

  return <div className={_clsPrefix} fieldid={fieldid ? `${fieldid}_marks` : undefined}>{elements}</div>
}

export default Marks
