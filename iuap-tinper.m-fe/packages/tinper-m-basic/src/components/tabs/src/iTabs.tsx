import type { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'

export interface TabProps extends NativeProps {
    title: ReactNode
    disabled?: boolean
    forceRender?: boolean
    destroyOnClose?: boolean
    children?: ReactNode
}

export interface TabsProps extends NativeProps<
| '--fixed-active-line-width'
| '--active-line-height'
| '--active-line-border-radius'
| '--title-font-size'
| '--content-padding'
| '--active-title-color'
| '--active-line-color'
> {
    activeKey?: string | null
    defaultActiveKey?: string | null
    activeLineMode?: 'auto' | 'full' | 'fixed'
    stretch?: boolean
    onChange?: (key: string, prevTab: any, currentTab: any) => void
    onTabClick?: (key: string, clickTab: any, e: any) => void
    children?: ReactNode
    autoScroll?: boolean,
    clsPrefix?: string,
    fieldid?: string,
    className?: string,
    decoration?: 'line' | 'dotLine',
    prerenderingSiblingsNumber?: number,
    renderTabBar?: any,
    tabBarPosition?: 'top' | 'right' | 'bottom' | 'left',
    headerWrapClass?: string
}