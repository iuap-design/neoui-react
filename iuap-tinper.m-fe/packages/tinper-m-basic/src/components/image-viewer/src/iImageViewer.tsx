import type { BaseProps } from '@utils/iCore';
import { NativeProps } from '@utils//NativeProps'
import React, { ReactNode } from 'react';

export interface ImageViewerProps extends BaseProps, NativeProps<
  | '--text-color-default'
  | '--border-width'
  > {
  // Props
  className?: string // 语义化 class { mask?:string,body?:string } todo
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  getContainer?: HTMLElement | (() => HTMLElement) | null // 指定挂载的 HTML 节点，默认为 body
  visible?: boolean // 隐藏/显示预览
  maxZoom?: number // 最大缩放比例
  // Events
  onClose?: () => void // 关闭时触发
  afterClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => void // 完全关闭后触发
  renderFooter?: (image: string, index: number) => ReactNode // 渲染底部额外内容
  // single
  image?: string // 图片资源的 url
}

