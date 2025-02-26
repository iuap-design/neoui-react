import { NativeProps } from '@utils//NativeProps'

export interface SkeletonProps extends NativeProps<'--width' | '--height' | '--border-radius'>{
  animated?: boolean
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
}

export interface SkeletonTitleProps extends NativeProps {
  animated?: boolean
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
}

export interface SkeletonParagraphProps extends NativeProps {
  animated?: boolean
  lineCount?: number
  fieldid?: string
  clsPrefix?: string
  className?: string
  style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
}
