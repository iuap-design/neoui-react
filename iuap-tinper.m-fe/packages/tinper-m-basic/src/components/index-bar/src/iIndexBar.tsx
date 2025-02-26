import type { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface IndexBarProps extends NativeProps<'--sticky-offset-top'> {
    sticky?: boolean
    onIndexChange?: (index: string) => void
    children?: ReactNode,
    clsPrefix?: string,
    fieldid?: string
}

export interface IndexBarRef {
    scrollTo: (index: string) => void
}

export interface IndexBarPanelProps extends NativeProps {
    index: string
    title?: ReactNode
    brief?: ReactNode
    children?: ReactNode
}

export interface SidebarProps {
    indexItems: {
        index: string
        brief: ReactNode
    }[]
    activeIndex: string | null
    onActive: (index: string) => void
    clsPrefix?: string
    fieldid?: string
}