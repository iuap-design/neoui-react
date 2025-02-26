import { NativeProps } from '@utils/NativeProps'

export interface ColumnDef {
  key: string // 列标记
  accessorKey: string // 数据下标，未传时取key
  header: React.ReactNode | (() => React.ReactNode)
  cell: React.ReactNode | (() => React.ReactNode)
  footer: React.ReactNode | (() => React.ReactNode)
  columns: Array<ColumnDef>
  ifshow?: boolean // 列显示隐藏
  flexGrow?: boolean // 列挤占剩余空间
}

export enum PAGINATION_MODE {
  PAGINATION = 'pagination',
  INFINITE_SCROLL = 'infiniteScroll'
}
export type paginationMode = PAGINATION_MODE
export interface TableProps extends NativeProps {
  columns: Array<ColumnDef>
  data: Array<{ [key: string]: any }>
  paginationMode: PAGINATION_MODE
  infiniteScrollOptions: any
  showRowNum: boolean | { header: React.ReactNode, key: string, base: number }
  bordered: boolean
  verticalSplitline: boolean
  spacedRowColor: boolean
  children: React.ReactNode
  bodyStyle: React.CSSProperties
  fieldid?: string
  clsPrefix?: string
}
