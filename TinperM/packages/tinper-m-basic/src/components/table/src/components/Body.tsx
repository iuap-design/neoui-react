import React, { forwardRef } from 'react'
import { InfiniteScroll } from '@tinper/m'
import WebUI from '@utils/UpdatePrefixs'
const Body = forwardRef((props: any, ref: any) => {
  const {
    clsPrefix,
    style,
    innerBodyStyle,
    fieldid,
    children,
    enableInfiniteScroll,
    infiniteScrollOptions = {}
  } = props
  // 虚拟行渲染
  return (
    <div
      className={`${clsPrefix}-table-tbody-container`}
      ref={ref}
      style={style}
      fieldid={fieldid}
    >
      <div
        className={`${clsPrefix}-table-tbody`}
        style={innerBodyStyle}
      >
        {children}
      </div>
      {enableInfiniteScroll && <InfiniteScroll children={() => null} {...infiniteScrollOptions} style={{ width: '100vw' }} />}
    </div>
  )
})

export default WebUI({})(Body)
