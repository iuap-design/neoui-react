import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'

export const CheckIcon = memo<NativeProps>(props => withNativeProps(
  props,
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill={props.iconColor} d="M9 0C13.9705 0 18 4.02951 18 9C18 13.9705 13.9705 18 9 18C4.02951 18 0 13.9705 0 9C0 4.02951 4.02951 0 9 0ZM9 4.99998C7.93913 4.99998 6.92171 5.42141 6.17156 6.17156C5.42141 6.92171 4.99998 7.93913 4.99998 9C4.99998 10.0609 5.42141 11.0783 6.17156 11.8284C6.92171 12.5786 7.93913 13 9 13C10.0609 13 11.0783 12.5786 11.8284 11.8284C12.5786 11.0783 13 10.0609 13 9C13 7.93913 12.5786 6.92171 11.8284 6.17156C11.0783 5.42141 10.0609 4.99998 9 4.99998Z"  />
  </svg>
))
