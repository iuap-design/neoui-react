import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'

export const SelectedIcon = memo<NativeProps>(props => withNativeProps(
  props,
  <svg viewBox="0 0 18 18" fill="none" >
    <circle cx="9" cy="9" r="9" fill='currentColor' />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.54524 8.49498C4.85766 8.18256 5.36419 8.18256 5.67661 8.49498L7.93935 10.7577L12.3234 6.37366C12.6358 6.06124 13.1424 6.06124 13.4548 6.37366C13.7672 6.68608 13.7672 7.19261 13.4548 7.50503L8.50504 12.4548C8.19262 12.7672 7.68609 12.7672 7.37367 12.4548L4.54524 9.62635C4.23282 9.31393 4.23282 8.8074 4.54524 8.49498Z" fill="white"/>
  </svg>
))
