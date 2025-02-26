import type { ReactNode, CSSProperties } from 'react'
import { NativeProps } from '@utils/NativeProps'
import { PopupProps } from '../../popup/src/index'

export interface Action {
    key: string | number
    text: ReactNode
    disabled?: boolean
    description?: ReactNode
    danger?: boolean
    bold?: boolean
    onClick?: () => void,
    className?: string,
    style?: React.CSSProperties,
    fieldid?: string
}

export interface ActionSheetProps extends Pick<
    PopupProps,
    'afterClose' | 'getContainer' | 'destroyOnClose' | 'forceRender'
>, NativeProps {
    visible?: boolean
    actions: Action[]
    extra?: ReactNode
    cancelText?: ReactNode
    onAction?: (action: Action, index: number) => void
    onClose?: () => void
    onMaskClick?: () => void
    closeOnAction?: boolean
    closeOnMaskClick?: boolean
    safeArea?: boolean
    popupClassName?: string
    /** @deprecated use `styles` instead */
    popupStyle?: CSSProperties
    styles?: Partial<Record<'body' | 'mask', CSSProperties>>
    fieldid?: string
    clsPrefix?: string
    className?: string
}
    