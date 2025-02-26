## API

| 属性                  | 说明                                   | 类型                                                                                                 | 默认值    |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------- |
| columns               | 表格列的配置描述，具体项见Column表格   | `Array<Column>`                                                                                    | `[]`    |
| data                  | 数据源，其中的数据将会被渲染成表格的行 | `Array<{[key: string]: any}>`                                                                      | `[]`    |
| showRowNum            | 显示序号列                             | `boolean \| { key: string, base: number, header: ReactNode }`                                       | `false` |
| infiniteScrollOptions | 无限滚动配置                           | `{loadMore: () => Promise, hasMore: boolean}` 参考 [无限滚动](/basic-components/infinite-scroll#api) | --        |
| style                 | 自定义样式                             | `React.CSSProperties`                                                                              | -         |
| className             | 样式类名                               | `string`                                                                                           | -         |
| fieldid               | dom标识                                | `string`                                                                                           | -         |
| clsPrefix             | class前缀                              | `string`                                                                                           | `'mui'` |

## Column

| 属性            | 说明                | 类型                            | 默认值       |
| --------------- | ------------------- | ------------------------------- | ------------ |
| key             | 列标记              | `String`                      | --           |
| accessorKey     | 数据下标, 不传取key | `String`                      | --           |
| size            | 列宽度              | `Number(375宽度设计稿px值)`   | --           |
| header          | 表头单元格          | `React.ReactNode`             | --           |
| cell            | 标题单元格          | `React.ReactNode`             | --           |
| textDisplayMode | 文字展示方式        | `'wrap'\| 'ellipsis'`          | `'wrap'`   |
| horizontalAlign | 文字水平对齐        | `'left' \| 'center' \| 'right'` | `'left'`   |
| verticalAlign   | 文字垂直对齐        | `'top' \| 'center' \| 'bottom'` | `'center'` |

## fieldid说明

| 场景              | 生成规则                                                 |
| ----------------- | -------------------------------------------------------- |
| 根结点(table容器) | `fieldid + '_table_container'`                         |
| 表格              | `fieldid + '_table'`                                   |
| 表头              | `fieldid + '_table_header'`                            |
| 表头单元格        | `fieldid + '_table_header'+ column.key`                |
| 表体              | `fieldid + '_table_body'`                              |
| 表体行            | `fieldid + '_table_row'`                               |
| 表体单元格        | `fieldid + '_table_body_cell' + rowIndex + column.key` |
