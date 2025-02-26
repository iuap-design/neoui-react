
import React, { ReactNode } from 'react'
import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'
import { NativeProps } from '@utils/NativeProps'

export interface ModalProps extends NativeProps {
    afterClose?: () => void
    afterShow?: () => void
    image?: string
    header?: ReactNode
    title?: ReactNode
    content?: ReactNode
    actions?: Action[]
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
    showCloseButton?: boolean
    fieldid?: string,
    clsPrefix?: string,
    footer?: ReactNode,
    destroyOnClose?: boolean,
    disableBodyScroll?: boolean,
    forceRender?: boolean
}

export interface ModalAlertProps extends Omit<
    ModalProps,
    'visible' | 'closeOnAction'
> {
    confirmText?: ReactNode
    onConfirm?: () => void | Promise<void>
}

export type ModalConfirmProps = Omit<
    ModalProps,
    'visible' | 'closeOnAction' | 'actions'
> & {
    confirmText?: ReactNode
    cancelText?: ReactNode
    onConfirm?: () => void | Promise<void>
    onCancel?: () => void | Promise<void>
}

export type Action = {
    key: string | number
    text: string
    disabled?: boolean
    primary?: boolean
    danger?: boolean
    onClick?: () => void | Promise<void>,
    fieldid?: string
} & NativeProps

export type ModalShowProps = Omit<ModalProps, 'visible'>

export type ModalShowRef = {
    close: () => void
}

export type ModalActionButtonProps = {
    action: Action
    onAction: () => void | Promise<void>,
    fieldid?: string,
    clsPrefix?: string
}
