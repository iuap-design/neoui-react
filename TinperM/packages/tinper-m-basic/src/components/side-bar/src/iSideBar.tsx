import React, { isValidElement } from 'react'
import type { FC, ReactNode } from 'react'
import { BadgeProps } from '../../badge/src/iBadge'
import { NativeProps } from '@utils/NativeProps'

export interface SideBarItemProps extends NativeProps {
    title?: ReactNode
    disabled?: boolean
    badge?: BadgeProps['content']
    className?: string
    style?: React.CSSProperties
}

export interface SideBarProps extends NativeProps<
    '--width' | '--height' | '--item-border-radius' | '--background-color'
> {
    activeKey?: string | null
    defaultActiveKey?: string | null
    onChange?: (key: string) => void
    children?: ReactNode
    className?: string
    style?: React.CSSProperties
    clsPrefix?: string
    fieldid?: string
}