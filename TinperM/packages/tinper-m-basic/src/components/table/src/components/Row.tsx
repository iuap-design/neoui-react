import React from "react";
import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'

function Row (props: any) {
  const { clsPrefix, style, measureNode, children, fieldid, key, rowIndex } = props
  const rowClsPrefix = `${clsPrefix}-table-tr`
  const rowCls = classnames(rowClsPrefix, {
    [`${rowClsPrefix}-odd`]: rowIndex % 2 === 1,
    [`${rowClsPrefix}-even`]: rowIndex % 2 === 0
  })
  return (
    <div
      className={rowCls}
      key={key}
      style={style}
      ref={measureNode}
      data-index={rowIndex}
      fieldid={fieldid}
    >
      {children}
    </div>
  )
}

export default WebUI({})(Row)
