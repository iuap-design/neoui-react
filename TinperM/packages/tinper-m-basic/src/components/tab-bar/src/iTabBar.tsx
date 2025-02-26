import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React, { ReactNode } from 'react';
import { BadgeProps } from '../../badge/src/iBadge';

export interface TabBarItemProps extends BaseProps, NativeProps<
  | '--fill-color'
  > {
  icon?: ReactNode | ((active: boolean) => ReactNode)
  title?: ReactNode | ((active: boolean) => ReactNode)
  badge?: BadgeProps['content']
}

interface TabBarItem {
  key: string
  title?: string
  icon?: React.ReactNode
  selectedIcon?: React.ReactNode
}

export interface TabBarProps extends BaseProps, NativeProps<
  | '--fill-color'
  > {
  className?: string
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  activeKey?: string | null
  defaultActiveKey?: string | null
  onChange?: (key: string) => void
  safeArea?: boolean
  children?: ReactNode
  itemList?: TabBarItem[]
}

