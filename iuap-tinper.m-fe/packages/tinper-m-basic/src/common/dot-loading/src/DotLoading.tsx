import React from 'react';
import { DotLoadingProps } from './iDotLoading';

function DotLoading (props: DotLoadingProps) {
  const { fieldid, fontSize, style } = props
  return <div className="mui-dot-loader" fieldid={fieldid} style={{ fontSize: fontSize, ...style }}>
    <div className="mui-dot"></div>
    <div className="mui-dot"></div>
    <div className="mui-dot"></div>
  </div>
}

export default DotLoading
