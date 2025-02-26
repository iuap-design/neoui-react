import React from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { ResultProps } from './iResult'
import WebUI from '@utils/UpdatePrefixs'
import CheckmarkCircleFill from '@tinper/m-icons/lib/cjs/CheckmarkCircleFill'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import ClockFill from '@tinper/m-icons/lib/cjs/ClockFill'
import InfoFill from '@tinper/m-icons/lib/cjs/InfoFill'
import AlertCircleFill from '@tinper/m-icons/lib/cjs/AlertCircleFill'

const iconRecord = (classPrefix: string, status: string) => {
  switch (status) {
  case 'success':
    return <CheckmarkCircleFill className={`${classPrefix}-icon-${status}`} />
  case 'error':
    return <CloseCircleFill className={`${classPrefix}-icon-${status}`} />
  case 'info':
    return <InfoFill className={`${classPrefix}-icon-${status}`} />
  case 'waiting':
    return <ClockFill className={`${classPrefix}-icon-${status}`} />
  case 'warning':
    return <AlertCircleFill className={`${classPrefix}-icon-${status}`} />
  default:
    return <CheckmarkCircleFill className={`${classPrefix}-icon-success`} />
  }
}

const defaultProps = { status: 'info', }

const Result: React.FC<ResultProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { status, title, description, icon, clsPrefix, fieldid = '' } = props
  const classPrefix = `${clsPrefix}-result`
  if (!status) return null
  const resultIcon = icon || iconRecord(classPrefix, status)

  return withNativeProps(
    props,
    <div className={classNames(classPrefix, `${classPrefix}-${status}`)} fieldid={fieldid}>
      <div className={`${classPrefix}-icon`} fieldid={`${fieldid}_icon`}>{resultIcon}</div>
      <div className={`${classPrefix}-title`} fieldid={`${fieldid}_title`}>{title}</div>
      {!!description && (
        <div className={`${classPrefix}-description`} fieldid={`${fieldid}_description`}>{description}</div>
      )}
    </div>
  )
}

export default WebUI({ defaultProps })(Result)

