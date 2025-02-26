import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import WebUI from '@utils/UpdatePrefixs'
import classnames from 'classnames'
import { ListProps } from './iList'

const defaultProps = { mode: 'default' }

const List: React.FC<ListProps> = forwardRef((props, ref) =>  {
  const { fieldid, clsPrefix, children, header } = props
  const classPrefix = `${clsPrefix}-list`
  const listRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    get nativeElement() {
      return listRef.current
    }
  }))

  return withNativeProps(
    props,
    <div className={classnames(classPrefix, `${classPrefix}-${props.mode}`)} fieldid={fieldid} ref={listRef}>
      {props.header && (
        <div className={`${classPrefix}-header`}>{header}</div>
      )}
      <div className={`${classPrefix}-body`}>
        <div className={`${classPrefix}-body-inner`}>{children}</div>
      </div>
    </div>
  )
})

export default WebUI({ defaultProps })(List)
