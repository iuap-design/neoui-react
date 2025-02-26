import React, { forwardRef } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import WebUI from '@utils/UpdatePrefixs'
import ArrowIosRight from '@tinper/m-icons/lib/cjs/ArrowIosRight'
import classNames from 'classnames'
import { ListItemProps } from './iList'

const ListItem: React.FC<ListItemProps> = forwardRef((props, ref) => {
  const clickable = props.clickable ?? !!props.onClick
  const arrow = props.arrow === undefined ? clickable : props.arrow
  const { fieldid, clsPrefix, className } = props
  const classPrefix = `${clsPrefix}-list-item`
  const content = (
    <div className={`${classPrefix}-content`}>
      {props.prefix && (
        <div className={`${classPrefix}-content-prefix`}>{props.prefix}</div>
      )}
      <div className={`${classPrefix}-content-main`}>
        {props.title && (
          <div className={`${classPrefix}-title`}>{props.title}</div>
        )}
        {props.children}
        {props.description && (
          <div className={`${classPrefix}-description`}>
            {props.description}
          </div>
        )}
      </div>
      {props.extra && (
        <div className={`${classPrefix}-content-extra`}>{props.extra}</div>
      )}
      {arrow && (
        <div className={`${classPrefix}-content-arrow`}>
          {arrow === true ? <ArrowIosRight style={{ width: '0.44rem', height: '0.44rem' }} /> : arrow}
        </div>
      )}
    </div>
  )

  return withNativeProps(
    props,
    React.createElement(
      clickable ? 'a' : 'div',
      {
        className: classNames(
          `${classPrefix}`,
          className,
          clickable ? ['mui-plain-anchor'] : [],
          props.disabled && `${classPrefix}-disabled`
        ),
        onClick: props.disabled ? undefined : props.onClick,
        ref: ref,
        fieldid: fieldid
      },
      content
    )
  )
})

export default WebUI({})(ListItem)
