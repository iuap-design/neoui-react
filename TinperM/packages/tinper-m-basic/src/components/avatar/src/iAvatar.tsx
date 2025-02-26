
import React from 'react'
import { NativeProps } from '@utils//NativeProps'
import { ImageProps } from '@/components/image/src/iImage'

export interface AvatarProps extends
  Pick<
    ImageProps,
    'alt'
    | 'lazy'
    | 'onClick'
    | 'onError'
    | 'onLoad'>,
  NativeProps<
    '--size'
    | '--border-radius'
  > {
  src: string
  fallback?: React.ReactNode
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  className?: string
  style?: React.CSSProperties
  fieldid?: string,
  clsPrefix?: string
  children?: string | React.ReactNode
}
