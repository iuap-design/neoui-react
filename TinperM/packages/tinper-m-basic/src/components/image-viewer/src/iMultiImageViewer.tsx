import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import { ImageViewerProps } from './iImageViewer'

export interface MultiImageViewerProps extends BaseProps, ImageViewerProps, NativeProps<
  | '--text-color-default'
  | '--border-width'
  > {
  // Multi
  images?: string[] // 图片资源的 url 列表
  showIndex?: boolean // 是否显示页码
  index?: number // 当前预览图片所在的下标
  defaultIndex?: number // 当前预览图片所在的下标
  onIndexChange?: (index: number) => void // 预览图片切换时触发
  swipeTo?: (index: number, immediate: boolean) => void // 切换到指定索引
}

