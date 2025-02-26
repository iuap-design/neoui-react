import React from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { StepProps } from './iSteps'

export function Step (props: StepProps) {
  const { title, description, icon, status = 'wait', clsPrefix, fieldid, id, onClick } = props
  const _clsPrefix = `${clsPrefix}-step`

  return withNativeProps(
    props,
    <div
      className={classNames(
        `${_clsPrefix}`,
        `${_clsPrefix}-status-${status}`
      )}
      fieldid={fieldid}
      id={id}
      onClick={onClick}
    >
      <div className={`${_clsPrefix}-indicator`}>
        <div className={`${_clsPrefix}-icon-container`}>{icon}</div>
      </div>
      <div className={`${_clsPrefix}-content`}>
        <div className={`${_clsPrefix}-title`}>{title}</div>
        {!!description && (
          <div className={`${_clsPrefix}-description`}>{description}</div>
        )}
      </div>
    </div>
  )
}
