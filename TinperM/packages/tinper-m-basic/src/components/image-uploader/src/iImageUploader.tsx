import type {
  ReactNode,
  InputHTMLAttributes,
  ReactElement,
} from 'react'
import { NativeProps } from '@utils/NativeProps'
import type { ImageProps } from '@components/image/src/iImage'
import { GridProps } from '@components/grid/src/iGrid'

export type TaskStatus = 'pending' | 'fail' | 'success'

export interface ImageUploadItem {
  key?: string | number
  url: string
  thumbnailUrl?: string
  extra?: any
}

export interface Task {
  id: number
  url?: string
  file: File
  status: TaskStatus
}

export type UploadTask = Pick<Task, 'id' | 'status'>

export interface ImageUploaderProps extends NativeProps<'--cell-size' | '--gap' | '--gap-vertical' | '--gap-horizontal'> {
  defaultValue?: ImageUploadItem[]
  value?: ImageUploadItem[]
  columns?: GridProps['columns']
  onChange?: (items: ImageUploadItem[]) => void
  onUploadQueueChange?: (tasks: UploadTask[]) => void
  accept?: string
  multiple?: boolean
  maxCount?: number
  onCountExceed?: (exceed: number) => void
  disableUpload?: boolean
  showUpload?: boolean
  deletable?: boolean
  deleteIcon?: ReactNode
  capture?: InputHTMLAttributes<unknown>['capture']
  onPreview?: (index: number, item: ImageUploadItem) => void
  beforeUpload?: (
    file: File,
    files: File[]
  ) => Promise<File | null> | File | null
  upload: (file: File) => Promise<ImageUploadItem>
  onDelete?: (item: ImageUploadItem) => boolean | Promise<boolean> | void
  preview?: boolean
  showFailed?: boolean
  imageFit?: ImageProps['fit']
  children?: ReactNode
  renderItem?: (
    originNode: ReactElement,
    file: ImageUploadItem,
    fileList: ImageUploadItem[]
  ) => ReactNode
  clsPrefix?: string
  fieldid?: string
  style?: React.CSSProperties
  className?: string
}

export interface ImageUploaderRef {
  nativeElement: HTMLInputElement | null
}

export interface PreviewItemProps {
    onClick?: () => void
    onDelete?: () => void
    deletable: boolean
    deleteIcon: ReactNode
    url?: string
    file?: File
    status?: TaskStatus
    imageFit: ImageProps['fit']
    preCls?: string
    fieldid?: string
  }