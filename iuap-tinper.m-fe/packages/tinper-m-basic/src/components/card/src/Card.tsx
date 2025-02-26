import React from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { CardProps } from './iCard'
import WebUI from '@utils/UpdatePrefixs'

const Card: React.FC<CardProps> = props => {
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-card`
  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null
    }
    return (
      <div
        className={classNames(`${classPrefix}-header`, props.headerClassName)}
        style={props.headerStyle}
        onClick={props.onHeaderClick}
        fieldid={props.fieldid ? `${props.fieldid}_header` : undefined}
      >
        <div className={`${classPrefix}-header-title`} fieldid={props.fieldid ? `${props.fieldid}_header_title` : undefined}>{props.title}</div>
        {props.extra}
      </div>
    )
  }

  const renderBody = () => {
    if (!props.children) {
      return null
    }
    return (
      <div
        className={classNames(`${classPrefix}-body`, props.bodyClassName)}
        style={props.bodyStyle}
        onClick={props.onBodyClick}
        fieldid={props.fieldid ? `${props.fieldid}_body` : undefined}
      >
        {props.children}
      </div>
    )
  }

  return withNativeProps(
    props,
    <div className={classPrefix} onClick={props.onClick} fieldid={fieldid}>
      {renderHeader()}
      {renderBody()}
    </div>
  )
}

export default WebUI({})(Card)
