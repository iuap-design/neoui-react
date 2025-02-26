import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'

export interface ButtonProps extends BaseProps, NativeProps<
    | '--text-color-default'
    | '--text-color-primary'
    | '--border-color-replica'
    | '--color-primary'
    | '--border-radius'
    | '--border-style'
    | '--border-width'
> {
    size?: 'large' | 'middle' | 'small'
    mode?: 'default' | 'primary' | 'warning' | 'ghost' | 'text'
    block?: boolean
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
    onTouchStart?: React.TouchEventHandler<HTMLButtonElement>
    onTouchEnd?: React.TouchEventHandler<HTMLButtonElement>
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>
    visible?: boolean
    disabled?: boolean
    loading?: boolean
    loadingIcon?: React.ReactNode
    loadingText?: string
    icon?: React.ReactNode | string
    iconPosition?: 'top' | 'right' | 'bottom' | 'left'
    className?: string
    style?: React.CSSProperties
    fieldid?: string,
    clsPrefix?: string
    shape?: 'default' | 'rounded' | 'rectangular'
}

