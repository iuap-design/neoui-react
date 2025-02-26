import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React, { ReactNode } from 'react';

export interface ImageProps extends BaseProps, NativeProps<
  | '--height'
  | '--width'
  > {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: ReactNode
  fallback?: ReactNode
  lazy?: boolean
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties
  draggable?: boolean
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onContainerClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

