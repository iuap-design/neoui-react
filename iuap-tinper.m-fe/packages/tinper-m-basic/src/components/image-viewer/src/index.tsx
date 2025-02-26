import './ImageViewer.less'
import { attachPropertiesToComponent } from '@utils/AttachPropertiesToComponent'
import { ImageViewer, MultiImageViewer } from './ImageViewer'
import {
  showMultiImageViewer,
  showImageViewer,
  clearImageViewer,
} from './Methods'


export type { ImageViewerProps } from './iImageViewer'
export type { MultiImageViewerProps } from './iMultiImageViewer'
export type { MultiImageViewerRef } from './ImageViewer'
export type { ImageViewerShowHandler } from './Methods'

const Multi = attachPropertiesToComponent(MultiImageViewer, { show: showMultiImageViewer, })

export default attachPropertiesToComponent(ImageViewer, {
  Multi,
  show: showImageViewer,
  clear: clearImageViewer,
})
