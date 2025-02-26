import { NativeProps } from '@utils/NativeProps'
import React, { ReactNode } from 'react'
import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'

export type DialogAlertProps = Omit<
    DialogProps,
    'visible' | 'closeOnAction' | 'actions'
> & {
    confirmText?: ReactNode
    onConfirm?: () => void | Promise<void>
}

export type DialogConfirmProps = Omit<
    DialogProps,
    'visible' | 'closeOnAction' | 'actions'
> & {
    confirmText?: ReactNode
    cancelText?: ReactNode
    onConfirm?: () => void | Promise<void>
    onCancel?: () => void | Promise<void>
}

export interface DialogProps extends NativeProps {
    afterClose?: () => void
    afterShow?: () => void
    image?: string
    header?: ReactNode
    title?: ReactNode
    content?: ReactNode
    footer?: ReactNode
    actions?: (Action | Action[])[]
    onAction?: (action: Action, index: number) => void | Promise<void>
    closeOnAction?: boolean
    onClose?: () => void
    closeOnMaskClick?: boolean
    visible?: boolean
    getContainer?: GetContainer
    bodyStyle?: React.CSSProperties
    bodyClassName?: string
    maskStyle?: React.CSSProperties
    maskClassName?: string
    stopPropagation?: PropagationEvent[]
    fieldid?: string,
    clsPrefix?: string,
    destroyOnClose?: boolean,
    disableBodyScroll?: boolean,
    forceRender?: boolean
}

export type Action = {
    key: string | number
    text: string
    disabled?: boolean
    danger?: boolean
    primary?: boolean
    bold?: boolean
    onClick?: () => void | Promise<void>
} & NativeProps

export type DialogShowProps = Omit<DialogProps, 'visible'>

export type DialogShowRef = {
    close: () => void
}

export type DialogActionButtonProps = {
    action: Action
    onAction: () => void | Promise<void>,
    clsPrefix?: string,
    fieldid?: string
}
