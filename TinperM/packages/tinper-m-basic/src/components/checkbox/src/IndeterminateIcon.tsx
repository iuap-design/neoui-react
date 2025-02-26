import React, { memo } from 'react'
import { NativeProps, withNativeProps } from '@utils/NativeProps'

export const IndeterminateIcon = memo<NativeProps>(props => withNativeProps(
  props,
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="3" fill="var(--mui-checkbox-color-bg-selector-selected)"/>
    <rect x="4" y="8" width="10" height="2" rx="1" fill="white"/>
  </svg>
))
