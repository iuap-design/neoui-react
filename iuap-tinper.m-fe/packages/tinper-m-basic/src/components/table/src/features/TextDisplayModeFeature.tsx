import {
  makeStateUpdater,
  TableFeature,
  Table,
  RowData,
  Updater,
  functionalUpdate,
  Column,
  Header
} from '@tanstack/react-table'

export type textDisplayMode = 'wrap' | 'ellipsis' | 'scale'

export const TextDisplayModeFeature: TableFeature<any> = {
  createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
  ): void => {
    column.textDisplayMode = column.columnDef.textDisplayMode
    column.horizontalAlign = column.columnDef.horizontalAlign
    column.verticalAlign = column.columnDef.verticalAlign
  },
}
