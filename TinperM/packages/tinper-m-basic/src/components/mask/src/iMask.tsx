import { NativeProps } from '@utils/NativeProps'
import { GetContainer } from '@utils/RenderToContainer'
import { PropagationEvent } from '@utils/WithStopPropagation'

export interface MaskProps extends NativeProps<'--z-index'> {
    visible?: boolean
    onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    destroyOnClose?: boolean
    forceRender?: boolean
    disableBodyScroll?: boolean
    color?: 'black' | 'white'
    opacity?: 'default' | 'thin' | 'thick' | number
    getContainer?: GetContainer
    afterShow?: () => void
    afterClose?: () => void
    stopPropagation?: PropagationEvent[]
    fieldid?: string,
    children?: any,
    clsPrefix?: string
    className?: string,
    style?: React.CSSProperties
}