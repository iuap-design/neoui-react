import { BaseProps } from '../../wui-core/src/iCore';


export interface SkeletonElementProps extends BaseProps {
    prefixCls?: string;
    size?: 'large' | 'small' | 'default' | number;
    shape?: 'circle' | 'square' | 'round' | 'default';
    active?: boolean;
}

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
    shape?: 'circle' | 'square';
}

export interface SkeletonTitleProps extends BaseProps {
    prefixCls?: string;
    width?: number | string;
}

type WidthUnit = number | string;
export interface SkeletonParagraphProps extends BaseProps {
    prefixCls?: string;
    width?: WidthUnit | Array<WidthUnit>;
    rows?: number;
}

type ButtonSize = 'large' | 'small' | 'default'
type ButtonShape ='circle' | 'square' | 'default';
export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
    size?: ButtonSize;
    block?: boolean;
    shape?: ButtonShape;
}

export interface SkeletonImageProps
  extends Omit<SkeletonElementProps, 'size' | 'shape' | 'active'> {}

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
    size?: 'large' | 'small' | 'default';
}

export interface SkeletonAvatarProps extends Omit<AvatarProps, 'active'> {}
export interface SkeletonProps extends BaseProps {
    active?: boolean;
    loading?: boolean;
    prefixCls?: string;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
    round?: boolean;
}