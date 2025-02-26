/**
 * 元素添加fieldid供自动化测试使用
 */

import {
  makeStateUpdater,
  TableFeature,
  Table,
  RowData,
  Row,
  Cell,
  Updater,
  functionalUpdate,
  Column,
  Header
} from '@tanstack/react-table'


export const FieldIdFeature: TableFeature<any> = {
  // 表头fieldid
  createHeader: <TData extends RowData, TValue>(
    header: Header<TData, TValue>,
    table: Table<TData>
  ): void => {
    const fieldid = table.options.fieldid
    header.fieldid = `${fieldid}_table_header_${header.id}`
  },
  // 表体行fieldid
  createRow: <TData extends RowData>(
    row: Row<TData>,
    table: Table<TData>
  ): void => {
    const fieldid = table.options.fieldid
    row.fieldid = `${fieldid}_table_row_${row.id}`
  },
  // 单元格fieldid
  createCell: <TData extends RowData, TValue>(
    cell: Cell<TData, TValue>,
    column: Column<TData, TValue>,
    row: Row<TData>,
    table: Table<TData>
  ): void => {
    const fieldid = table.options.fieldid
    cell.fieldid = `${fieldid}_table_body_cell_${cell.id}`
  }
}
