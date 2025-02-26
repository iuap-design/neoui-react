import React, { forwardRef, useEffect, useRef, useState, useMemo  } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Empty } from '@tinper/m'
import WebUI from '@utils/UpdatePrefixs'
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table'
import { TextDisplayModeFeature } from './features/TextDisplayModeFeature'
import { FieldIdFeature } from './features/FieldIdFeature'
import { columnHelper } from './utils/columnHelper'
import { TableProps, PAGINATION_MODE } from './iTable'
import TableContext from './TableContext'
import Header from './components/Header'
import Body from './components/Body'
import Row from './components/Row'
import Cell from './components/Cell'
import Pagination from './components/Pagination'

const defaultProps = {
  columns: [],
  data: [],
  paginationMode: PAGINATION_MODE.INFINITE_SCROLL
}

/**
 * 创建table实例
 * @param props
 */
const useTableInstance = (props: TableProps) => {
  const {
    columns,
    showRowNum,
    data,
    fieldid
  } = props

  const reactTableColumns =  columnHelper(columns, { showRowNum })

  const [sorting, setSorting] = useState([])

  const tableOptions = {
    [PAGINATION_MODE.PAGINATION]: {
      getPaginationRowModel: getPaginationRowModel(),
    }
  }

  const initialState = useMemo(() => {
    const left: string[] = []
    const right: string[] = []
    const columnVisiblity: { [key: string]: boolean } = {}
    columns.forEach(column => {
      // 冻结列状态
      switch (column.fixed) {
        case 'left':
          left.push(column.accessorKey)
          break
        case 'right':
          right.push(column.accessorKey)
          break
        default:
      }
      // 显示隐藏状态
      columnVisiblity[column.key] = (column.ifshow !== false)
    })

    return {
      pagination: {
        pageIndex: 0,
        pageSize: 10
      },
      columnPinning: {
        'left': left,
        'right': right
      },
      columnVisibility: columnVisiblity
    }
  }, [])


  const tableInstance = useReactTable({
    initialState: initialState,
    _features: [TextDisplayModeFeature, FieldIdFeature],
    data,
    columns: reactTableColumns,
    fieldid: fieldid,
    getCoreRowModel: getCoreRowModel()
  })

  return tableInstance
}


/**
 * 渲染Table
 */
const Table: React.FC<TableProps> = forwardRef((props, ref) => {
  const {
    clsPrefix,
    className,
    bodyStyle,
    fieldid,
    paginationMode,
    infiniteScrollOptions,
    bordered,
    verticalSplitline,
    spacedRowColor,
  } = props

  const tableRef = useRef<any>()
  const bodyRef = useRef(null)
  const table = useTableInstance(props)

  const tableCls = classnames(`${clsPrefix}-table`, {
    [`${clsPrefix}-table-bordered`]: bordered,
    [`${clsPrefix}-table-vertical-splitline`]: verticalSplitline,
    [`${clsPrefix}-table-spaced-row-color`]: spacedRowColor
  })

  const tableContainerCls = classnames(`${clsPrefix}-table-basic-container`, className)

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 50,
    getScrollElement: () => bodyRef.current,
    overscan: 5,
  })

  const isEmpty = (table.getRowCount() === 0)
  const innerBodyStyle = isEmpty ? {} : { height: `${rowVirtualizer.getTotalSize()}px` }

  return (
    <>
      <TableContext.Provider
        value={{
          table,
          clsPrefix
        }}
      >
        <div className={tableContainerCls} fieldid={`${fieldid}_table_container`}>
          <div className={tableCls} ref={tableRef} fieldid={`${fieldid}_table`}>
            <Header
              key='table-header'
              fieldid={fieldid}
            >
              {table.getHeaderGroups().map(headerGroup => (
                <Row
                  key={headerGroup.id}
                  fieldid={`${fieldid}_table_header_group_${headerGroup.id}`}
                >
                  {
                    headerGroup.headers.map(header => {
                      const { column } = header
                      return <Cell key={header.id} column={column} fieldid={header.fieldid}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </Cell>
                    })
                  }
                </Row>
              ))}
            </Header>
            <Body
              key='table-body'
              style={bodyStyle}
              innerBodyStyle={innerBodyStyle}
              ref={bodyRef}
              fieldid={fieldid}
              enableInfiniteScroll={paginationMode === PAGINATION_MODE.INFINITE_SCROLL}
              infiniteScrollOptions={infiniteScrollOptions}
            >
              {
                isEmpty
                ? <Empty fieldid={`${fieldid}_table_empty`} className={`${clsPrefix}-table-empty`} />
                : rowVirtualizer.getVirtualItems().map(virtualRow => {
                  const rowStyle = {
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                    position: 'absolute'
                  }
                  const row = rows[virtualRow.index]
                  return <Row
                    measureNode={node => rowVirtualizer.measureElement(node)}
                    key={row.id}
                    rowIndex={row.index}
                    fieldid={row.fieldid}
                    style={rowStyle}
                  >
                    {
                      row.getVisibleCells().map(cell => (
                        <Cell
                          key={cell.id}
                          column={cell.column}
                          fieldid={cell.fieldid}
                        >
                          <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                        </Cell>
                      ))
                    }
                  </Row>
                })
              }
            </Body>
          </div>
        </div>
        {paginationMode === PAGINATION_MODE.PAGINATION ? <Pagination key='table-pagination'
          canNextPage={table.getCanNextPage()}
          nextPage={() => table.nextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          previousPage={() => table.previousPage()}
          pageCount={table.getPageCount()}
          pagination={table.getState().pagination}
        /> : null}
      </TableContext.Provider>
    </>

  )
})

export default WebUI({ defaultProps })(Table)
