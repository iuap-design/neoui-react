import React from 'react'
import classNames from 'classnames'
import type { StepProps } from './iSteps'
import { withNativeProps } from '@utils/NativeProps'
import { StepsProps } from './iSteps'
import WebUI from '@utils/UpdatePrefixs';
import IconError from './IconError';
import IconFinish from './IconFinish';
import IconWait from './IconWait';
import IconProcess from './IconProcess';

const defaultProps = {
  current: 0,
  direction: 'horizontal',
}

function Steps(props: StepsProps) {
  const {
    direction,
    current,
    className,
    fieldid,
    style = {},
    clsPrefix,
  } = props

  const _clsPrefix = `${clsPrefix}-steps`
  const stepClassPrefix = `${clsPrefix}-step`

  // let defaultIcon = <span className={`${stepClassPrefix}-icon-dot`} />
  const cls = classNames(_clsPrefix, `${_clsPrefix}-${direction}`, className)

  return withNativeProps(
    props,
    <div className={cls} fieldid={fieldid ? fieldid + '_steps' : undefined} style={style}>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement<StepProps>(child)) {
          child.props.clsPrefix = clsPrefix
          return child
        }
        const childProps = child.props
        let status = childProps.status || 'wait'
        let defaultIcon = <span className={`${stepClassPrefix}-icon-dot`} />;

        if (index < current) {
          status = childProps.status || 'finish'
        } else if (index === current) {
          status = childProps.status || 'process'
        }

        if (status === 'wait') {
          defaultIcon = <IconWait className={`${stepClassPrefix}-icon-default ${stepClassPrefix}-icon-default-wait`} />;
        } else if (status === 'finish') {
          defaultIcon = <IconFinish className={`${stepClassPrefix}-icon-default ${stepClassPrefix}-icon-default-finish`} />;
        } else if (status === 'process') {
          defaultIcon = <IconProcess className={`${stepClassPrefix}-icon-default ${stepClassPrefix}-icon-default-process`} />;
        } else if (status === 'error') {
          defaultIcon = <IconError className={`${stepClassPrefix}-icon-default ${stepClassPrefix}-icon-default-error`} />;
        }

        const icon = childProps.icon ?? defaultIcon

        return React.cloneElement(child, {
          status,
          icon,
          clsPrefix,
          fieldid: `${fieldid}_steps_icon_${index}`
        })
      })}
    </div>
  )
}

export default WebUI({ defaultProps })(Steps)
