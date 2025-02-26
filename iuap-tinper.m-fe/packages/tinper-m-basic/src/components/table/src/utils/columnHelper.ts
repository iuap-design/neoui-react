/**
 * 1. column适配, 用columnHelper创建columns, 需要转换column属性加这里
 * 2. 追加columns(序号列 / 树形表的展开收起列)
 */
import {
  createColumnHelper
} from '@tanstack/react-table'
import { ColumnDef } from '../iTable'
import { mergeProps } from '@utils/WithDefaultProps'

const helper = createColumnHelper()
// export const orderColumn = columnHelper.accessor('')
const createOrderColumn = (showRowNum: any) => {
  const orderDef = {
    key: 'orderNum',
    id: 'orderNum',
    header: '序号',
    cell: info => info.row.index + 1,
    size: 50
  }
  if (typeof showRowNum === 'boolean' && showRowNum) {
    return helper.accessor(orderDef.key, orderDef)
  } else if(typeof showRowNum === 'object') {
    return helper.accessor((showRowNum.accessorKey || showRowNum.key), mergeProps(orderDef, showRowNum))
  }
}

export function columnHelper (columns: ColumnDef[], options: any) {
  const { showRowNum = false } = options
  const columnObjs = columns.map((column: any) => {
    const columnId = (column.accessorKey || column.key)
    return helper.accessor(columnId, mergeProps({
      id: columnId,
      size: column.width || 50
    }, column))
  })

  const orderColumn = createOrderColumn(showRowNum)
  if (orderColumn) return [orderColumn, ...columnObjs]
  return columnObjs
}
