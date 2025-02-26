import { NativeProps } from '@utils/NativeProps'

export interface FloatingPanelProps extends NativeProps<'--border-radius' | '--z-index' | '--header-height'> {
  anchors: number[]
  children: React.ReactNode
  onHeightChange?: (height: number, animating: boolean) => void
  handleDraggingOfContent?: boolean
  fieldid?: string
  clsPrefix?: string
}

export type FloatingPanelRef = {
  setHeight: (
    height: number,
    options?: {
      immediate?: boolean
    }
  ) => void
}
