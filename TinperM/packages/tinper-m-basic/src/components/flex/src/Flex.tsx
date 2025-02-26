import React, { useRef } from 'react'
import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { FlexProps } from './iFlex'

const defaultProps = {
  visible: true,
  direction: 'row',
  justify: 'start',
  align: 'start',
  wrap: 'nowrap',
  style: {}
}

const propMap = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  center: 'center'
}

function Flex(props: FlexProps) {
  const { className, clsPrefix, style, visible, direction, justify, align, alignContent, wrap, fieldid = '', onClick, children } = props

  const timeOutEvent= useRef<null | number | NodeJS.Timeout>(0)

  const touchStart = () => {
    timeOutEvent.current = setTimeout(function () {
      timeOutEvent.current = 0;
      props.onLongPress?.()
    }, 500);
  }

  const touchMove = () => {
    if (timeOutEvent.current) {
      clearTimeout(timeOutEvent.current);
      timeOutEvent.current = 0;
    }
  }

  const touchEnd = () => {
    if (timeOutEvent.current) {
      clearTimeout(timeOutEvent.current);
    }
    return false
  }

  const prefixCls = `${clsPrefix}-flex`
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}-dir-row`]: direction === 'row',
    [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
    [`${prefixCls}-dir-column`]: direction === 'column',
    [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

    [`${prefixCls}-justify-start`]: justify === 'start',
    [`${prefixCls}-justify-end`]: justify === 'end',
    [`${prefixCls}-justify-center`]: justify === 'center',
    [`${prefixCls}-justify-between`]: justify === 'between',
    [`${prefixCls}-justify-around`]: justify === 'around',

    [`${prefixCls}-align-start`]: align === 'start',
    [`${prefixCls}-align-center`]: align === 'center',
    [`${prefixCls}-align-end`]: align === 'end',
    [`${prefixCls}-align-baseline`]: align === 'baseline',
    [`${prefixCls}-align-stretch`]: align === 'stretch',

    [`${prefixCls}-align-content-start`]: alignContent === 'start',
    [`${prefixCls}-align-content-end`]: alignContent === 'end',
    [`${prefixCls}-align-content-center`]: alignContent === 'center',
    [`${prefixCls}-align-content-between`]: alignContent === 'between',
    [`${prefixCls}-align-content-around`]: alignContent === 'around',
    [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch',
  });


  if (!visible) return null
  return (
    <div
      className={cls}
      style={style}
      onClick={onClick}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      fieldid={fieldid}
    >
      {children}
    </div>
  )
}

export default WebUI({ defaultProps })(Flex)
