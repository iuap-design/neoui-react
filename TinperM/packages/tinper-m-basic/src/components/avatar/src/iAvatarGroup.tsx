import React from 'react'
import { NativeProps } from '@utils//NativeProps'
export interface AvatarGroupProps extends NativeProps {
  maxContent: (overCounts: number) => React.ReactNode | string
  maxContentType: 'avatarText' | 'text'
  onMaxContentClick: (e: any, ref: any, avatars: any) => React.ReactNode
  max: string | number
  gap: string
  level: 'left' | 'right'
  className?: string
  style?: React.CSSProperties
  fieldid?: string,
  clsPrefix?: string
  children?: string | React.ReactNode
}
