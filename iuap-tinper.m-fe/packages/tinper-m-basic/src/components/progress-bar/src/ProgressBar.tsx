import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import classNames from 'classnames'
import { isNodeWithContent } from '@utils/IsNodeWithContent'
import { ProgressBarProps } from './iProgressBar'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  percent: 0,
  rounded: true,
  text: false,
}

function ProgressBar(props: ProgressBarProps) {
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-progress-bar`
  const fillStyle = { width: `${props.percent}%` }

  const textElement = (function () {
    if (props.text === true) {
      return `${props.percent}%`
    }
    if (typeof props.text === 'function') {
      return (props.text as (percent: number) => React.ReactNode)(props.percent)
    }
    return props.text
  })()

  return withNativeProps(
    props,
    <div
      className={classNames(
        classPrefix,
        props.rounded && `${classPrefix}-rounded`
      )}
      fieldid={fieldid}
    >
      <div className={`${classPrefix}-trail`}>
        <div className={`${classPrefix}-fill`} style={fillStyle} />
      </div>
      {isNodeWithContent(textElement) && (
        <div className={`${classPrefix}-text`}>{textElement}</div>
      )}
    </div>
  )
}

export default WebUI({ defaultProps })(ProgressBar)
