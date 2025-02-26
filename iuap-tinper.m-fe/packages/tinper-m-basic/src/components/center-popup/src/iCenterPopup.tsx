import { NativeProps } from '@utils/NativeProps'
import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'
import { ReactElement } from 'react';

export interface CenterPopupProps extends NativeProps<
    | '--z-index'
    | '--background-color'
    | '--border-radius'
    | '--max-width'
    | '--min-width'
    > {
    visible?: boolean
    mask?: boolean
    onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    destroyOnClose?: boolean
    forceRender?: boolean
    getContainer?: GetContainer
    afterShow?: () => void
    afterClose?: () => void
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
    children?: ReactElement,
    role?: string,
    disableBodyScroll?: boolean
}