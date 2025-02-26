import React from 'react';
import { SpinLoadingProps } from './iSpinLoading';
import classNames from 'classnames';
import Loading from '@tinper/m-icons/lib/cjs/Loading'

function SpinLoading (props: SpinLoadingProps) {
  const { fieldid, fontSize, style, className } = props
  return <div className={classNames('circle-loader', className)} fieldid={fieldid} style={{ fontSize: fontSize, ...style }}>
    <Loading style={{ height: '100%', width: '100%' }} />
  </div>
}

export default SpinLoading
