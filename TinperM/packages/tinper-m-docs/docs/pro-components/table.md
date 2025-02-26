---
nav: pro-components
group:
  title: 视图 View
  order: 3
title: 表格 Table
order: 1
toc: content
---
# Table 表格

## 何时使用

用于呈现大量结构化的数据内容

## 示例

<code src="./table/demo0.tsx" title=" 基础用法" mobile="true" compact=true ></code>
<code src="./table/demo01.tsx" title=" 冻结列" mobile="true" compact=true ></code>
<code src="./table/demo02.tsx" title=" 小记合计" mobile="true" compact=true ></code>
<code src="./table/demo03.tsx" title=" 单行省略、截断显示" mobile="true" compact=true ></code>
<code src="./table/demo04.tsx" title=" 行数显示、分页" mobile="true" compact=true ></code>
<code src="./table/demo05.tsx" title=" 选中单元格" mobile="true" compact=true ></code>
<code src="./table/demo06.tsx" title=" 点表头选中列，显示列宽拖拽按钮" mobile="true" compact=true ></code>
<code src="./table/demo08.tsx" title=" 合并单元格" mobile="true" compact=true ></code>
<code src="./table/demo09.tsx" title=" 树型表" mobile="true" compact=true ></code>
<code src="./table/demo10.tsx" title=" 列数宽度和不足父级宽度，最后一列充满父容器" mobile="true" compact=true ></code>

## API

| 属性                  | 说明                                                                       | 类型                                                                                                               | 默认值               |
| --------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- |
| columns               | 表格列的配置描述，具体项见Column表格                                       | `Array<Column>`                                                                                                  | `[]`               |
| data                  | 数据源，其中的数据将会被渲染成表格的行                                     | `Array<{[key: string]: any}>`                                                                                    | `[]`               |
| paginationMode        | 分页模式( 无限滚动 / 分页器 )                                             | `'infiniteScroll'\| 'pagination'`                                                                                 | `'infiniteScroll'` |
| infiniteScrollOptions | 无限滚动配置                                                               | `{loadMore: () => Promise, hasMore: boolean}` 参考 [无限滚动](/basic-components/infinite-scroll#api)               | --                   |
| paginationOptions     | 分页器配置                                                                 | `{ pageSize: number }`                                                                                           | --                   |
| showRowNum            | 显示序号列                                                                 | `boolean \| { key: string, base: number, header: ReactNode }`                                                     | `false`            |
| showScrollBar         | 显示滚动条                                                                 | `boolean`                                                                                                        | `false`            |
| headerFixed           | 滚动时表头固定                                                             | `boolean`                                                                                                        | `true`             |
| showSum               | 显示小记合计                                                               | `boolean \| {showTotal: boolean, showSubTotal: boolean}`                                                          | `false`            |
| showRowCount          | 显示当前行数轻提示                                                         | `boolean ｜ ({currentRow, totalRow, isScrolling }) => React.ReactNode`                                           | `false`            |
| showTableOption       | 显示表格列配置按钮                                                         | `boolean`                                                                                                        | `false`            |
| expandable            | 树形表配置(指定初始展开状态 / 自定义展开收起按钮 / header显示展开收起按钮) | `{ expended: number \| boolean \| { path: boolean }, expandIcon: ({isExpanded, canExpanded}) => React.ReactNode }` | `--`               |
| grouping              | 数据分组(按照列数据分组，按照传入的先后顺序分组)                           | `Array<String>`                                                                                                  | `--`               |
| cellSelectionMode     | 单元格选中模式(选中单元/ 选中行/ 选中列 / 选中行列)                        | `'cell' \| 'row' \| 'column' \| 'all'`                                                                              | `'cell'`           |
| bordered              | 表格外边框                                                                 | `boolean`                                                                                                        | `false`            |
| verticalSplitline     | 表格垂直分割线                                                             | `boolean`                                                                                                        | `true`             |
| spacedRowColor        | 表格隔行换色                                                               | `boolean`                                                                                                        | `true`             |
| style                 | 自定义样式                                                                 | `React.CSSProperties`                                                                                            | -                    |
| className             | 样式类名                                                                   | `string`                                                                                                         | -                    |
| fieldid               | dom标识                                                                    | `string`                                                                                                         | -                    |
| clsPrefix             | class前缀                                                                  | `string`                                                                                                         | `'mui'`            |

## Column

| 属性                  | 说明                           | 类型                              | 默认值       |
| --------------------- | ------------------------------ | --------------------------------- | ------------ |
| key                   | 列标记                         | `String`                        | --           |
| accessorKey           | 数据下标, 不传取key            | `String`                        | --           |
| size                  | 列宽度                         | `Number(375宽度设计稿px值)`     | --           |
| header                | 自定义表头单元格               | `React.ReactNode`               | --           |
| cell                  | 自定义表体单元格               | `React.ReactNode`               | --           |
| fixed                 | 冻结列                         | `'left' \| 'right' \| false`      | `false`    |
| enableSorting         | 启用排序                       | `boolean`                       | `false`    |
| sortingFn             | 自定义排序函数                 | `(rowA, rowB) => -1 \| 0 \| 1 `   | --           |
| sortDescFirst         | 默认降序                       | `boolean`                       | --           |
| showExpandIcon        | 在本列显示展开收起按钮(树形表) | `boolean`                       | `false`    |
| visible               | 列显示                         | `boolean`                       | `true`     |
| enableDrag            | 启用拖动调整列宽               | `boolean`                       | `true`     |
| subTotalRender        | 本列小记栏渲染                 | `({sum, values}) => React.Node` | --           |
| totalRender           | 本列合计栏渲染                 | `() => React.Node`              | --           |
| flexGrow              | 列挤占(列宽挤占剩余空间)       | `boolean`                       | `false`    |
| textDisplayMode       | 文字展示方式                   | `'wrap'\| 'ellipsis'\| 'scale'`   | `'wrap'`   |
| horizontalAlign       | 单元格水平对齐                 | `'left' \| 'center' \| 'right'`   | `'left'`   |
| headerHorizontalAlign | 单独设置表头水平对齐方式       | `'left' \| 'center' \| 'right'`   | `'left'`   |
| verticalAlign         | 单元格垂直对齐                 | `'top' \| 'center' \| 'bottom'`   | `'center'` |
| headerVerticalAlign   | 单独设置表头垂直对齐方式       | `'top' \| 'center' \| 'bottom'`   | `'center'` |

### CSS 变量

#### 线条样式

| 属性                    | 说明           | 默认值                                         | 全局变量                                   |
| ----------------------- | -------------- | ---------------------------------------------- | ------------------------------------------ |
| --border-right-color    | 垂直分割线颜色 | `#E5E5E5`                                    | `--ynfm-color-border-right-column-table` |
| --border-bottom-color   | 水平分割线颜色 | `#E5E5E5`                                    | `--ynfm-color-border-bottom-row-table`   |
| --border-out-line-color | 外边框颜色     | `#E5E5E5`                                    | `--ynfm-color-border-outline-table`      |
| --split-line-horizontal | 水平分割线     | `0.02rem solid var(--border-bottom-color)`   | --                                         |
| --split-line-vertical   | 垂直分割线     | `0.02rem solid var(--border-right-color)`    | --                                         |
| --table-out-line        | 外边框         | `0.02rem solid var(--border-out-line-color)` | --                                         |
| --selected-border       | 选中边框       | `0.02rem solid #007AFF;`                     | --                                         |

#### 文字样式

| 属性                         | 说明             | 默认值      | 全局变量                                    |
| ---------------------------- | ---------------- | ----------- | ------------------------------------------- |
| --header-font-weight         | 表头字重         | `500`     | `--ynfm-font-weight-header-table`         |
| --header-text-color          | 表头文字颜色     | `#171717` | `--ynfm-color-text-header-table`          |
| --header-text-selected-color | 表头选中文字颜色 | `#FFFFFF` | `--ynfm-color-text-header-table-selected` |
| --cell-text-color            | 表体文字颜色     | `#404040` | `--ynfm-color-text-cell-table`            |
| --pagination-text-color      | 分页器文字颜色   | `#404040` | `--ynfm-color-text-pagination-table`      |
| --subtotal-text-color        | 小计文字颜色     | `#171717` | `--ynfm-color-text-subtotal-table`        |
| --subtotal-font-weight       | 小计文字字重     | `500`     | `--ynfm-font-weight-subtotal-table`       |
| --subtotal-font-size         | 小计文字大小     | `0.26rem` | `--ynfm-font-size-subtotal-table`         |
| --total-text-color           | 合计文字颜色     | `#171717` | `--ynfm-color-text-total-table`           |
| --total-font-weight          | 合计文字字重     | `500`     | `--ynfm-font-weight-total-table`          |
| --total-font-size            | 合计文字大小     | `0.26rem` | `--ynfm-font-size-total-table`            |

#### 颜色样式

| 属性                       | 说明             | 默认值      | 全局变量                                  |
| -------------------------- | ---------------- | ----------- | ----------------------------------------- |
| --header-bg-color          | 表头背景色       | `#F1F5F9` | `--ynfm-color-bg-header-table`          |
| --header-selected-bg-color | 表头选中背景色   | `#006FE6` | `--ynfm-color-bg-header-table-selected` |
| --column-selected-bg-color | 选中列背景色     | `#006FE6` | `--ynfm-color-bg-column-table-selected` |
| --cell-bg-color            | 单元格背景色     | `#FFFFFF` | `--ynfm-color-bg-cell-table`            |
| --cell-selected-bg-color   | 选中单元格背景色 | `#006FE6` | `--ynfm-color-bg-header-table-selected` |
| --row-odd-bg-color         | 奇数行背景色     | `#FFFFFF` | `--ynfm-color-bg-odd-row-table`         |
| --row-even-bg-color        | 偶数行背景色     | `#FAFAFA` | `--ynfm-color-bg-even-row-table`        |
| --row-selected-bg-color    | 选中行背景色     | `#006FE6` | `--ynfm-color-bg-row-table-selected`    |
| --subtotal-bg-color        | 小计背景颜色     | `#FFF7EB` | `--ynfm-color-bg-subtotal-row-table`    |
| --total-bg-color           | 合计背景颜色     | `#FFF0DB` | `--ynfm-color-bg-total-row-table`       |

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
