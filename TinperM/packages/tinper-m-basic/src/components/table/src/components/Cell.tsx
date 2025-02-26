import React from "react";
import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { getCommonPinningStyles } from '../utils/getCommonPinningStyles'

function Cell (props) {
  const { key, column, style, children, fieldid } = props
  const textDisplayMode = column.textDisplayMode
  const horizontalAlign = column.horizontalAlign
  const verticalAlign = column.verticalAlign
  const flexGrow = column.columnDef.flexGrow
  const cellCls = classnames('cell', {
    'cell-flex-grow': flexGrow,
    [`text-${textDisplayMode}`]: textDisplayMode,
    [`text-horizontal-align-${horizontalAlign}`]: horizontalAlign,
    [`text-horizontal-vertical-${verticalAlign}`]: verticalAlign
  })
  const cellStyle = {
    width: `${column.getSize() / 50}rem`,
    ...getCommonPinningStyles(column),
    ...style
  }

  return <div
    className={cellCls}
    key={key}
    style={cellStyle}
    fieldid={fieldid}
  >
    {children}
  </div>
}

export default WebUI({})(Cell)
