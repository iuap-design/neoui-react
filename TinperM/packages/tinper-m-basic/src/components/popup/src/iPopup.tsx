import { ReactNode } from 'react'
import { NativeProps } from '@utils/NativeProps'
import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'
import { ReactElement } from 'react';

export interface PopupProps extends NativeProps<'--z-index'> {
    visible?: boolean
    mask?: boolean
    onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    destroyOnClose?: boolean
    forceRender?: boolean
    getContainer?: GetContainer
    afterShow?: () => void
    afterClose?: () => void
    position?: 'bottom' | 'top' | 'left' | 'right'
    bodyClassName?: string
    bodyStyle?: React.CSSProperties
    maskClassName?: string
    maskStyle?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    stopPropagation?: PropagationEvent[]
    fieldid?: string,
    clsPrefix?: string,
    showCloseButton?: boolean,
    onClose?: () => void,
    closeOnMaskClick?: boolean,
    closeOnSwipe?: boolean,
    children?: ReactElement,
    popupTitle?: ReactNode
    disableBodyScroll?: boolean,
    footer?: any
    hideTitleOnNoClose?: boolean
}