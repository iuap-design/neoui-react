import React from 'react'
import { TabPaneProps } from './iTabPane'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  code: '',
  minHeight: 0
}
function TabPane (props: TabPaneProps) {
    const { children, className, style, minHeight, width, backgroundColor, marginBottom, fieldid, clsPrefix,  ...others } = props
    const _clsPrefix = `${clsPrefix}-tabpane`
    const sty = { width, minHeight, backgroundColor, marginBottom, ...style }
    return (
      <div className={`${_clsPrefix} ${className}`} style={sty} fieldid={fieldid ? fieldid + '_tabpane' : undefined} {...others}>
        {children}
      </div>
    )
}

export default WebUI({ defaultProps })(TabPane)
