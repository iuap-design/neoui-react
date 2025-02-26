# 表格 Table

提供基本的表格功能展示数据

## API

### Table props

<!--Table-->
| 参数                     | 说明                                       | 类型                                     | 默认值             |
| :--------------------- | :--------------------------------------- | :------------------------------------- | :-------------- |
| data                   | 传入的表格数据（key值必需，否则会导致部分功能出现问题。建议使用唯一的值，如id）   | array                                  | []              |
| columns                | 列的配置表，具体配置见下表                            | array                                  | -               |
| columnKey    |    如果columnKey是字符串，`column [columnKey]`将被作为主键。    | string                                  | 'key'               |
| bordered                | 是否展示外边框和列边框                            | boolean                                  | false               |
| rowRef                 | 获取行的ref                                  | Function(record, index, indent):string | () => null      |
| rowKey                 | 如果rowKey是字符串，`record [rowKey]`将被用作键。如果rowKey是function，`rowKey（record, index）`的返回值将被用作键。表格时作为每条数据的唯一标示，如果唯一标示不是"key"键的值，**则必须传入**，例如 `rowKey='id'` | string or Function(record, index):string      | 'key'           |
| expandable | 展开属性配置 | expandable | - |
| rowSelection | 表格行是否可选择 | rowSelection | - |
| rowClassName | 获取行的classname | Function(record, index, indent):string | () => '' |
| rowDraggAble  | 是否增加行交换顺序功能 | boolean| false |
| useDragHandle  | 只能通过行手柄进行拖拽排序，在 `rowDraggAble` 为 `true` 时有效 | boolean| false |
| showHeader             | 是否显示表头                                   | bool                                   | true            |
| title                  | 表格标题                                     | Function                               | -               |
| footer                 | 表格尾部                                     | Function                               | -               |
| footerClassName        | 添加到footer上的自定义类名                    | string                                 | -              |
| emptyText              | 无数据时显示的内容                                | Function                               | () => 'No Data' |
| emptyClassName         | 无数据时自定义类名                               | string                               | - |
| loading       | 表格是否加载中 | bool|object(详情可以参考上面示例)                                   | false           |
| getBodyWrapper         | 添加对table body的包装                         | Function(body)                         | body => body    |
| bodyStyle              | 添加到tablebody上的style                      | object                                 | {}              |
| bodyClassName          | 添加到tablebody上的自定义类名                  | string                                 | -              |
| style                  | 添加到table上的style                          | object                                 | {}              |
| scroll                 | 横向或纵向支持滚动，也可用于指定滚动区域的宽高度 | `{ x: number / 百分比 , y: number }` | {}     |
| resetScroll       | 将表格横向滚动条位置还原 | bool| false
| filterable       | 是否开启根据条件来过滤数据 | bool | false
| filterDelay       | 触发过滤输入的时候的ms延迟时间 | number | 300
| sort       | 排序的属性 | object| { mode:'single'//单列排序, backSource:false //默认是前端排序，值为true为后端排序 } mode:multiple-多列排序
| syncHover       | 是否显示hover状态背景色 | bool| true
| loadBuffer       | 使用BigData高阶组件实现大数据加载时，上下加载的缓存 | number| 50
| hoverContent       | hover某行时，动态渲染行菜单元素，此方法需返回行菜单元素的内容 | Function|
| height | 自定义表格行高 | number | 35px |
| headerHeight | 自定义表头行高 | number | - |
| headerDisplayInRow | 设置表头的内容显示一行，超出显示省略号 | bool | true |
| bodyDisplayInRow |  设置表体的内容显示一行，超出显示省略号，**注意：不要和 height 属性一起使用，该属性优先级高于 height** | bool | true |
| showSum |  显示小计/合计，**注意：可选值['subtotal']`显示小计`/ ['total'] `显示合计`/ ['subtotal', 'total']`显示小计和合计`/ []`都不显示`** | Array | ['subtotal'] |
| sumPrecision | 小计显示精度，**注意：优先级低于column配置的sumPrecision** | number | 2 |
| showRowNum | 展示序号功能，false时不展示，true时展示默认情况，可传入自定义配置信息 | bool / obj:{name: '序号', key: '_index', // 在数据中存储的key值width: 50,base: 0,// 排序的基准值,为数字或者字母type:'number', // 排序类型,默认为number类型,支持单字母排序(type='ascii')} | false |
| autoCheckedByClickRows | 设置为 false 时，表格行点击事件，不会自动勾选复选框 | bool | true |
| getCellClassName|自定义单元格样式| func(record,index,column) record：当前行数据，index:行索引，column：当前列索引|-|
| onPaste | 粘贴的回调函数 | func(event,positon) | - |
| onCopy | 复制列的回调函数 | func(data,event) | - |
| onBodyScroll | table body 滚动的回调 | func(scrollTop) | - |
| onBodyMouseLeave| 移除表体的回调事件| func() |-|
| popMenu | 右键自定义传入列表 | func(rowKeys,colKeys) => Array | - |
| onPopMenuClick | 点击右键弹出框列表中某一项的回调 | func(type, rowKeys, colKeys) => void | - |
| onPopMenu | 右键弹框出显示隐藏回调 | func(open, rowKeys, colKeys) | - |
| onRow | 设置行属性 | function(record, index) | - |
| scrollType | 表格滚动模式 | `single`/ `multiple` | `single` |
| onHeaderRow | 设置头部行属性 | function(record, index) | - |
| sortDirections | 支持的排序方式，取值为 ascend descend | Array | ['ascend', 'descend']
| showSorterTooltip | 表头是否显示下一次排序的 tooltip 提示,(当参数类型为对象时，将被设置为 Tooltip 的属性) | boolean / object | false | 4.4.5 |
| stripeLine | 斑马线 | bool | false |
| fieldid | 自动化测试专属属性 | string | - |
| fillSpace | 表格自动填满父级剩余空间 | bool | false |
| sumClassName | 自定义合计部分类名 | string | - |
| scrollMode | 表格模式选择（'table'或'sticky'）, table则生成旧版表格/sticky则生成新版表格,若浏览器不支持css的sticky黏性布局，则自动降级生成旧版表格 | string | sticky |
| bigColumns | 是否开启大数据列 | bool | false |
| rowActiveKey | 是否开启行点击状态记录 | bool | false |
| columnsLoadBuffer | 大数据列加载时，左右加载的缓存 | number| 5
| currentScrollColumn | 大数据列加载时，滚动到指定列（对应列配置对应的key属性, 多表头只支持顶级的列对应的key） | string| -
| cacheId | 缓存列对应表格的唯一标识, `表头分组的情况每一级表头配置必须配置唯一的dataIndex和key属性` | string| -
| pagination | 分页器，参考配置项或 [pagination](/website/#/detail/component/wui-pagination/bip?tab=api) 文档，设为 false 时不展示和进行分页） | object / false | false
| onRowClick | 行的点击事件钩子函数 | Function(record, index, event) | `record` : 当前行的数据<br> `index` : 当前行的index<br> `event` : 事件对象 |
| onRowDoubleClick | 行的双击事件钩子函数 | Function(record, index, event) | `record` : 当前行的数据<br> `index` : 当前行的index<br> `event` : 事件对象 |
| onFilterChange | 触发过滤输入操作以及下拉条件的回调 | function(field,value,condition) | `field` : 字段名称 <br> `value` : 字段值 <br> `condition` : 判断条件 |
| onFilterClear | 清除过滤条件的回调函数，回调参数为清空的字段 | function(field) | `field` : 字段名称 |
| onRowHover | 行hover时的回调函数`慎用在此回调函数中进行setState等引发重绘的操作，会频繁触发重绘，可能影响性能` | function(index,record, hoverStatus) | `index` : 当前行的index<br> `record` : 当前行的数据<br> `hoverStatus` : 当前行的hover状态 |
| onDragRowStart | 行拖拽开始时的回调函数 | function(record,index) | `record` : 当前行的数据 <br> `index` : 当前行的index|
| onDropRow | 行拖拽结束后的回调函数 | function(data,record, index, dropRecord, dropIndex, event) | `data` : 拖拽后的新data数组<br> `record` : 拖拽行的数据<br> `index` : 拖拽行的下标<br> `dropRecord` : 放置行的数据<br> `dropIndex` : 放置行的下标<br> `event` : 事件对象 |
| rowActiveKeys | 行是否处于点击状态 | Array/boolean | false|
| addEmptyColumn | 是否表格空白列`表格内部填充空白列以占据剩余宽度` | boolean | false|
| onSetColumnReset | 列重置回调函数 | function(columns) => columns | `columns` : 当前表格的列配置 |
| onSetColumnVisibleChange | 列设置弹框隐藏回调函数 | function(visible) | - |
| columnSetPopover | 是否显示列设置弹框 `受控属性` | boolean | false|

> 快捷键部分参考示例 (快捷键在table中的简单使用应用)

*注意: data参数中的key值必需，否则会导致部分功能出现问题！建议使用唯一的值，如id*


### Data

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| style | 该行的样式，严格按照react的样式书写规则，即对象内每一个属性的键为小写驼峰式，值为字符串 | object | - |

### fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid="***_table"  | - |
| 表头区域 | table-header   | - |
| 表体区域 | table-body   | - |
| 列标记 | 优先取column中配置的fieldid的值，没有则取column中dataIndex或者key   | - |
| 合计行 | total-row   | - |
| 展开行 | expanded-row(与class标记片段（expanded-row）同级)   | - |
| 展开收起按钮 | switch_icon   | - |

### Column

<!--Table.Column-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|key|列的键|string|-|
|className|传入列的classname|String    |-|
|colSpan|表头列合并,设置为 0 时，不渲染|Number|-|
|title|列的标题|node|-|
|columnType|列的标识(rowdrag标识拖拽列)|string|-|
|dataIndex|    显示数据记录的字段|String|-|
|width|宽度的特定比例根据列的宽度计算|String/Number|-|
|fixed|    当表水平滚动时，此列将被固定：true或'left'或'right'| true/'left'/'right'|-|
|sorter|前端列排序方法，只要列上有此属性就说明这列可排序。**注：默认是前端排序,排序方法书写时注意有些字段的值可能是undefined的情况，需要转换成0**| function/'string'/'number'/'date'|-|
|getMultiSorterValue| 多列排序的时候，可以使用此方法得到单元格中显示的值，用来进行排序中的判断|Function(data, currentCol)|-|
|sorterClick|排序的回调函数|function|-|
|render|cell的render函数有三个参数：这个单元格的文本，这行的记录，这行的索引，它返回一个对象：{children：value，props：{colSpan：1，rowSpan：1}} ==>'children'是这个单元格的文本，props是这个单元格的一些设置，可以设置单元格行/列合并。2.2.48及以后版本新增第四个参数options为column设置的属性|-|
|onCellClick|单击列的单元格时调用|Function(row, event)|-|
|onHeadCellClick|单击表头的单元格时调用|Function(row, event)|row 当前行的数据|
| order | 设置排序 | string（"descend"、"ascend"） | -|
| orderNum | 多列排序时，用来设置排序优先级（1的优先级最高） | number | -|
| notRowDrag | 当rowDraggAble启用时，设置为true则控制本列不允许拖拽行 | boolean | -|
| filterType | 过滤下拉的类型.可选`text(文本框)`,`dropdown(下拉)`,`date(日期)`,`dateyear(日期-年)`,`datemonth(日期-月)`,`dateweek(日期-周)`,`daterange(日期范围)`,`number(数值)`,`time(时间)` | string | text |
| filterDropdown | 是否显示过滤下拉.可选`show`,`hide` | string | show |
| format | 针对过滤下拉设置日期类的格式 | string | YYYY-MM-DD |
| filterDropdownAuto | 设置下拉条件是否自动设置选项，`auto`自动根据当前数据生成，`manual`手动传入，可以使用`filterDropdownData`来传入自定义数据 | string | auto |
| filterDropdownData | 下拉条件自定义数据，filterDropdownAuto=manual生效，传入格式：[{ key : "自定义", value : "自定义" }] | array | [] |
| filterDropdownFocus | 触发点击下拉条件的回调，一般用于异步点击请求数据使用 | function | () => () |
| filterDropdownType | 下拉条件类型，分为 string 和 number 条件类型 | string | string
| filterDropdownIncludeKeys | 能够设置指定的下拉条件项，通过设置keys 其中string条件可设置:LIKE,ULIKE,EQ,UEQ,START,END.number条件可设置:GT,GTEQ,LT,LTEQ,EQ,UEQ | array | [] 不设置此属性为显示所有
| filterDropdownOptions | 筛选接收的props，具体属性参考各个筛选所需组件 | object | null
| filterInputNumberOptions | 数值框接收的props，具体属性参考InputNumber组件 | object | null
| mergeEndIndex | 大数据量滚动加载场景，合并表格行时，设置合并结束位置的行 index 值，设置在列 render 函数中的 props 属性上 | Number |
| sortEnable | 开启默认排序,根据fieldType属性确定排序规则，默认按字符串排序;优先级低于sorter属性;需配合高阶函数`multiSelect`使用 | bool | false |
| fieldType | 列类型，可选`string`,`number`,`currency`,`bool`,`link` | string | 'string' |
| fontColor | 列文本颜色 | string | - |
| bgColor | 列背景颜色 | string | - |
| titleAlign | 标题对齐方式 | 'left'\|'center'\|'right' | 'left' |
| contentAlign | 内容对齐方式 | 'left'\|'center'\|'right' | 'left' |
| ~~textAlign~~ | 表头和内容文字对齐方式，默认是左对齐（'left、right、center'），请使用titleAlign、contentAlign代替 | string |
| required | 必填项的列标题展示红色星号 | bool | false |
| ~̶~̶i̶s̶S̶h̶o̶w̶~̶~ | 是否展示该列数据(推荐ifshow) | bool | true |
| ifshow | 是否展示该列数据 | bool | true |
| cellMenu | 渲染单元格内操作按钮 | object | - |
| style | 该列的样式，严格按照react的样式书写规则，即对象内每一个属性的键为小写驼峰式，值为字符串 | object | - |
| sumRender | 自定义小计render函数 | func(value) | - |
| totalRender | 自定义合计render函数 | func(column, data) / string / number | - |
| onCell | 设置单元格属性 | function(record, rowIndex) | - |
| onHeaderCell | 设置头部单元格属性 | function(column) | - |
| sortDirections | 支持的排序方式，覆盖 Table 中 sortDirections，取值为 ascend descend | Array | ['ascend', 'descend']
| fieldid | 自动化测试专属属性, 设置此值则列fieldid属性优先取此值，否则取dataIndex或者key | string | - |
| showSorterTooltip | 表头是否显示下一次排序的 tooltip 提示, 优先级高于Table上的showSorterTooltip属性，(当参数类型为对象时，将被设置为 Tooltip 的属性) | boolean / object | - | 4.4.5 |
| sortOrder | 设置排序（兼容order属性，但是此属性是受控属性） | string（"descend"、"ascend"） | - | 4.5.0 |
| shouldCellUpdate | 自定义单元格渲染时机 | (record, prevRecord) => boolean | - | 4.5.0 |
| sumPrecision | 小计显示精度，**注意：优先级高于Table配置的sumPrecision** | number | 2 | 4.6.1 |
| tip | 表头提示图标 | string / () => React.ReactNode | - | 4.6.1 |
| searchCondition | 自定义查找行信息的匹配条件 | (record, column, value) => Boolean | - | 4.6.7 |


### pagination
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|position|列指定分页显示的位置， 取值为topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight|Array|[`bottomRight`]|

### expandable
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| columnTitle | 自定义展开列表头 | ReactNode | - | 4.4.5 |
| showHeaderExpandIcon | 是否显示表头的展开/收起图标 | boolean | false | 4.4.5 | 
| onExpandAll | 全部展开收起的回调,(第一个参数为是否全部展开状态，第二个参数为展开的所有行的key) | (expanded: boolean, innerExpandedRowKeys: any[]) => void| - | 4.4.5 | 
| defaultExpandAllRows   | 默认是否展开所有行  | bool   | false   | 
| defaultExpandedRowKeys | 初始扩展行键    | array   | []     | 
| expandedRowKeys        | 展开的行，控制属性   | array  | -   | 
| expandedRowClassName | 获取展开行的className | Function(recode, index, indent):string | () => '' | 
| indentSize | indentSize为每个级别的data.i.children，更好地使用column.width指定 | number | 15 | 
| expandIconAsCell       | 展开按钮是否单独作为一个单元格  | bool  | false | 
| expandIconAsCell       | 展开按钮是否单独作为一个单元格  | bool  | false | 
| expandIconColumnIndex  | expandIcon的索引，当expandIconAsCell为false时，将插入哪个列 | number | 0  | 
| expandedRowRender      | 额外的展开行  | Function(record, index, indent):node | -   | 
| onExpand | 展开行时的钩子函数 | Function(expanded, record) | `expanded` : 当前的状态<br>`record` :  当前行的数据 | 
| onExpandedRowsChange | 函数在扩展行更改时调用 | Function(expandedRowKeys) | `expandedRowKeys` : 展开行的keys数组 |  
| showExpandIcon       | 控制是否显示行展开icon(优先级高于haveExpandIcon) | bool/Function(record, index):bool   | - | 
| expandRowByClick       | 设置展开行是否通过点击行触发，此参数需要与上面参数搭配使用（默认是通过点击行前面的加号展开行 | bool  | false | 
| expandIcon | 自定义展开图标 | function(props): ReactNode(优先级高于expandedIcon和collapsedIcon) | - | 
| expandIconCellWidth | 自定义展开列宽度 | number | 43 | 
| fixed | 自定义展开列是否固定 | true/false/'left' | false | 
| childrenColumnName | 指定树形结构的列名 | string | children | 

### rowSelection
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 多选/单选 | 'checkbox'/'radio' | 'checkbox' | 4.4.5 |
| checkStrictly | 父子节点是否受控 | boolean | true | 4.4.5 |
| columnWidth | 自定义列表选择框宽度 | string/number | 40 | - |
| fixed | 选择框是否固定在左侧 | boolean/'left' | 'left' | - |
| getCheckboxProps | 选择框的默认属性配置 | function(record, index) | - | - |
| hideSelectAll | 隐藏全选勾选框与自定义选择项 | boolean | false | - |
| renderCell | 渲染勾选框 | function(text, record, index) | - | - |
| selectedRowKeys | 受控属性,指定选择项 | string[] / number[] | - | - |
| defaultSelectedRowKeys | 默认选择项 | string[] / number[] | - | - |
| selections | 自定义选择配置项 | true / object[] | - | - |
| onChange | 选中项发生变化时的回调 | function(selectedRowKeys, selectedRows) | 无 |
| onSelect | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows, nativeEvent) | 无 |
| onSelectAll | 用户手动选择/取消选择所有行的回调 | function(selected, selectedRows, changeRows) | 无 |
| onSelectInvert | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows, nativeEvent) | 无 |
| onSelectNone | 用户手动选择/取消选择所有行的回调 | function(selected, selectedRows, changeRows) | 无 |

#### [v2.2.x新增] cellMenu

属性的参数说明如下:

|名称|说明|类型|必填|默认值|
|---|---|---|---|---|
|menu|自定义的操作列表|array|是|[]|
|icon|自定义图标|string/element|否|三圆点图标`<Icon type='uf-3dot-h'/>`|
|iconSize|自定义图标时可能会出现右侧对齐的问题,需要手动调整图标大小|number|否|21|
|trigger|控制下拉菜单的出现方式|'hover'\|'click'|否|'hover'|
|className|下拉菜单的类名|string|否|-|

其中,menu的配置如下:

|名称|说明|类型|必填|默认值|
|---|---|---|---|---|
|key|每一项需要的唯一的key值|string|true|-|
|text|每一项的标题|string|false|-|
|icon|每一项的图标信息|string/element|false|-|
|callback|点击行后的回调函数|Function(text,record,index)|false|-|

#### [v2.2.2新增]fieldType

fieldType属性控制了不同类型数据的渲染方式,其优先级低于render属性。目前，已有`string`,`number`,`currency`,`bool`,`link`,`date`,`select`,`stringChinese`
类型，支持自定义配置(`string`类型为默认类型)。

- stringChinese类型的渲染同string,在配合高阶组件sort使用时,可支持中文拼音排序

- numberConfig

|具体属性|说明|类型|默认值| 
|:--|:---|:--|:---| 
|thousand|是否展示千分符号|bool|true|
|preSymbol|数值的前缀|string|null|
|nextSymbol|数值的后缀|string|null|

- currencyConfig

|具体属性|说明|类型|默认值| 
|:--|:---|:--|:---| 
|thousand|是否展示千分符号|bool|true| 
|preSymbol|数值的前缀|string|null|
|nextSymbol|数值的后缀|string|null| 
|precision|精度|number|2| 
|makeUp|末位是否补零|bool|true|

- boolConfig

|具体属性|说明|类型|默认值| 
|:--|:---|:--|:---| 
|trueText|数值为true时的展示文本|string|'是'| 
|falseText|数值为false时的展示文本|string|'否'|

- linkConfig

|具体属性|说明|类型|默认值| 
|:--|:---|:--|:---| 
|url|获取url的函数|function(text,record,index)|null|
|urlIndex|数据内url字段的key值|string|null| 
|desc|鼠标hover时展示的title值，为false时不展示，true时展示链接的url，为字符串时展示字符串，为函数时展示返回值,如(text,record,index)=>'text'|bool\|string\|func|true| 
|descIndex|数据内desc字段的key值|string|null| 
|linkType|打开窗口的方式|'_self'\|'_blank'|'_blank'| 
|linkColor|链接的字体颜色|string|'#0073E1'| 
|underline|hover时是否展示下划线|bool|false|
|className|链接的className|string|null|

*url和urlIndex属性至少有一个，均存在时url优先级更高*

*desc和descIndex属性相比，desc优先级更高*

- dateConfig

|具体属性|说明|类型|默认值| 
|:--|:---|:--|:---| 
|moment|传入的moment对象,必需|object|-| 
|format|渲染的时间格式|string|'YYYY-MM-DD'|

*需要单独安装[moment.js](http://momentjs.cn/),并将moment对象传入*

- selectConfig

|名称|说明|类型|必填项|默认值|
|---|---|---|---|---|
|options|下拉的key/value对应关系|object|是|-|
|defaultShow|找不到对应关系时的展示值|string|否|''|

*无options时按string类型渲染*


## 以后将废除的 api(不推荐使用)
### Table props

| 参数      | 说明    | 类型    | 默认值   | 推荐使用方式
| --------------------- | --------------------- | --------------------- | --------------------- |  ---------------------
| childrenColumnName | 指定树形结构的列名 | string | children | 详见expandable属性使用方式
| defaultExpandAllRows   | 默认是否展开所有行  | bool   | false   | 详见expandable属性使用方式
| defaultExpandedRowKeys | 初始扩展行键    | array   | []     | 详见expandable属性使用方式
| expandedRowKeys        | 展开的行，控制属性   | array  | -   | 详见expandable属性使用方式
| expandedRowClassName | 获取展开行的className | Function(recode, index, indent):string | () => '' | 详见expandable属性使用方式
| indentSize | indentSize为每个级别的data.i.children，更好地使用column.width指定 | number | 15 | 详见expandable属性使用方式
| expandIconAsCell       | 展开按钮是否单独作为一个单元格  | bool  | false | 详见expandable属性使用方式
| expandIconColumnIndex  | expandIcon的索引，当expandIconAsCell为false时，将插入哪个列 | number | 0  | 详见expandable属性使用方式
| expandedRowRender      | 额外的展开行  | Function(record, index, indent):node | -   | 详见expandable属性使用方式
| onExpand | 展开行时的钩子函数 | Function(expanded, record) | `expanded` : 当前的状态<br>`record` :  当前行的数据 | 详见expandable属性使用方式
| onExpandedRowsChange | 函数在扩展行更改时调用 | Function(expandedRowKeys) | `expandedRowKeys` : 展开行的keys数组 | 详见expandable属性使用方式
| haveExpandIcon       | 控制是否显示行展开icon.**注：该参数只有在和expandedRowRender同时使用才生效** | Function(record, index):bool   | () =>false | 详见expandable(showExpandIcon)属性使用方式
| showExpandIcon       | 控制是否显示行展开icon(优先级高于haveExpandIcon) | bool/Function(record, index):bool   | - | 详见expandable属性使用方式
| expandedIcon | 嵌套表格场景中展开子表时的展开图标| - | - | 详见expandable(expandIcon)属性使用方式
| collapsedIcon |嵌套表格场景中关闭子表时的关闭图标| - | - | 详见expandable(expandIcon)属性使用方式
| expandRowByClick       | 设置展开行是否通过点击行触发，此参数需要与上面参数搭配使用（默认是通过点击行前面的加号展开行 | bool  | false | 详见expandable属性使用方式
| expandIcon | 自定义展开图标 | function(props): ReactNode(优先级高于expandedIcon和collapsedIcon) | - | 详见expandable属性使用方式
| expandIconCellWidth | 自定义展开列宽度 | number | 43 | 详见expandable属性使用方式
| headerScroll       | 表头下是否显示滚动条 | bool| false | 已废除 |
| footerScroll       | 表尾和body是否公用同一个横向滚动条。（ 如果footer中也是一个table组件，并且也具有滚动条，那么也需要加入footerScroll参数，内层表格的footerScroll设置成false。 ） | bool                                   | false           |
| heightConsistent       | 当固定列内容高度超出非固定列时，内容互错行，当此属性为true会将高度同步，当行过多时会有性能影响，所以建议非固定高度如果过高时，超出内容可以显示成省略号 | bool|false | 已废除 |
| size | 表格大小 | `sm / md / lg` | 'md' | 推荐使用height属性 |
| hideHeaderScroll | 表体无数据时，表头下是否显示滚动条，默认显示 | bool | false | 已废除 |
| syncRowHeight | 滚动是否同步高度,关闭此功能有利于提高性能，注：树表和主子表不允许关闭 | true | - | 已废除 |
| expandIconClassName | 展开图标的classname | Function(record, index, indent):string | () => '' | 已废除 |

### 高阶函数

Table内部封装了七个高阶组件，接收基础 Table 组件作为输入，输出一个新的复杂 Table 组件。高阶组件让代码更具有复用性、逻辑性与抽象特征。

![image](https://user-images.githubusercontent.com/33412781/58004582-29a9c680-7b16-11e9-8608-192bde91a9f5.png)

> 注：不要在render方法内部使用高阶组件。这样不仅会有性能问题 – 重新挂载一个组件还会导致这个组件的状态和他所有的子节点的状态丢失。

使用时需要单独引用相应的js文件，目录在lib文件夹，以多选功能（multiSelect）为例：

```js
import {Table} from "@tinper/next-ui";
const {multiSelect} = Table;
```

### singleSelect 单选功能 (推荐使用Table.rowSelection方式实现)

#### 如何使用

```js
import { Table, Radio } from '@tinper/next-ui';
const {singleSelect} = Table;
const SingleSelectTable = singleSelect(Table, Radio);

```

### API

Table 组件参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| getSelectedDataFunc | 返回当前选中的数据数组 | Function | 无    |
| selectedRowIndex | 指定当前选中数据的 index（推荐使用rowSelection中的selectedRowKeys） | number | 无    |
| rowSelection | 表格行是否可选择 | object | 无 | 

rowSelection 参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| columnTitle | 自定义列表选择框标题 | ReactNode | 无 |
| columnWidth | 自定义列表选择框宽度 | string/number | 40 |
| fixed | 把选择框列固定在左边 | boolean | 无 |
| renderCell | 渲染勾选框，用法与 Column 的 render 相同 | function(text, record, index) | 无 |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[] | number[] | [] |
| defaultSelectedRowKeys | 默认选中项的 key 数组 | string[] | number[] | [] |
| getCheckboxProps | 选择框的默认属性配置 | function(record) | 无 |
| onChange | 选中项发生变化时的回调 | function(selectedRowKeys, selectedRows) | 无 |
| onSelect | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows, nativeEvent) | 无 |

<!--
#### singleSelect 使用示例
- [单选功能](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%8D%95%E9%80%89%E5%8A%9F%E8%83%BD)
-->

### multiSelect 多选功能 (推荐使用Table.rowSelection方式实现)

#### 如何使用

```js
import { Table, Checkbox } from '@tinper/next-ui';
const {multiSelect} = Table;
const MultiSelectTable = multiSelect(Table, Checkbox);

```

### API

Table 组件参数：

| 参数     | 说明         | 类型       | 返回值  |
| ------ | ---------- | -------- | ---- |
| getSelectedDataFunc | 返回当前选中的数据数组 | Function | `selectedList` : 当前选中的行数据集合<br>`record` :  当前操作行数据<br>`index` : 当前操作行索引   |
| multiSelectConfig | 自定义 Checkbox 属性，如设置复选框为红色填充 | Object | - |
| autoSelect | 树型表格勾选时，是否开启子节点的联动 | bool | false |
| rowSelection | 表格行是否可选择 | object | 无 | 

Data 数组参数(以后将废除)：

| 参数                  | 说明                         | 类型       | 默认值      |
| ------------------- | -------------------------- | -------- | -------- |
| _checked         | 设置是否选中当前数据           |  boolean      | true/false       |
| _disabled   | 设置是否禁用当前数据     |  boolean      | true/false     |

rowSelection 参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| columnTitle | 自定义列表选择框标题 | ReactNode | 无 |
| columnWidth | 自定义列表选择框宽度 | string/number | 40 |
| fixed | 把选择框列固定在左边 | boolean | 无 |
| renderCell | 渲染勾选框，用法与 Column 的 render 相同 | function(text, record, index) | 无 |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[] | number[] | [] |
| defaultSelectedRowKeys | 默认选中项的 key 数组 | string[] | number[] | [] |
| getCheckboxProps | 选择框的默认属性配置 | function(record) | 无 |
| hideSelectAll | 隐藏全选勾选框与自定义选择项 | boolean | false |
| selections | 自定义选择项 | object[] | 无 |
| onChange | 选中项发生变化时的回调 | function(selectedRowKeys, selectedRows) | 无 |
| onSelect | 用户手动选择/取消选择某行的回调 | function(record, selected, selectedRows, nativeEvent) | 无 |
| onSelectAll | 用户手动选择/取消选择所有行的回调 | function(selected, selectedRows, changeRows) | 无 |

selections 参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| key | React 需要的 key，建议设置 | string | 无 |
| text | 选择项显示的文字 | ReactNode | 无 |
| onSelect | 选择项点击回调 | function(changeableRowKeys) | 无 |

<!--
#### multiSelect 使用示例
- [多选功能](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%A4%9A%E9%80%89%E5%8A%9F%E8%83%BD)
-->

### sort 排序功能

#### 如何使用

```js
import { Table, Icon } from '@tinper/next-ui';
const {sort} = Table;
const SortTable = sort(Table, Icon);

```

### API

column 数组参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sorter | 排序函数，可以自定义 | Function | 无    |
| sorterClick | 排序钩子函数| Function | (coloum,type)    |

<!--
#### sort 使用示例
- [列排序](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%88%97%E6%8E%92%E5%BA%8F)
- [后端列排序](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%90%8E%E7%AB%AF%E5%88%97%E6%8E%92%E5%BA%8F)
- [多列排序](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%A4%9A%E5%88%97%E6%8E%92%E5%BA%8F)
-->

### Antd兼容(4.x版本)

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const { AntdTable } = Table

```

### API

无

### sum 合计功能

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const {sum} = Table;
const SumTable = sum(Table);

//precision为精度值，默认为2
const SumTable = sum(Table,precision);

```

### API

column 数组参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| sumCol | 该列设置为合计列，合计行中会显示合计数据 | boolean | false |

<!--
#### sum 使用示例
- [列合计（总计）](http://bee.tinper.org/tinper-bee/bee-table#%E5%88%97%E5%90%88%E8%AE%A1%EF%BC%88%E6%80%BB%E8%AE%A1%EF%BC%89)
-->

### dragColumn 拖拽列功能

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const {dragColumn} = Table;
const DragColumnTable = dragColumn(Table);

```

### API

Table 组件参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| dragborder | 是否启用表格拖拽调整列宽度 | true('default') / 'fixed' / false | false |
| draggable | 拖拽交换列 | boolean | false |
| minColumnWidth | 拖拽列宽度的最小限制 | number | 80 |
| maxColumnWidth | 拖拽列宽度的最大限制 | number | - |
| onDrop | 拖拽释放回调函数(交换列) | function | () => {} |
| onDropBorder | 拖拽释放回调函数(调整列宽) | function | (e,width,column,columns) => {} |
| onDraggingBorder | 调整列宽过程中触发的回调函数 | function | (e,width) => {} |

<!--
#### dragColumn 使用示例
- [拖拽改变列顺序](http://design.yonyoucloud.com/tinper-bee/bee-table#%E6%8B%96%E6%8B%BD%E6%94%B9%E5%8F%98%E5%88%97%E9%A1%BA%E5%BA%8F)
- [拖拽改变列宽度](http://design.yonyoucloud.com/tinper-bee/bee-table#%E6%8B%96%E6%8B%BD%E6%94%B9%E5%8F%98%E5%88%97%E5%AE%BD%E5%BA%A6)
-->
column 数组参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| dragborder | 该列是否启用支持列调整宽度，当Table.props.dragborder启用时才生效，可设置column.dragborder=false则禁止此列拖拽功能 | bool | true |
| minWidth |  列拖拽的最小宽度, 优先级大于minColumnWidth | number | - |
| maxWidth | 列拖拽的最大宽度, 优先级大于maxColumnWidth | number | - |

### filterColumn 过滤功能

#### 如何使用

```js
import { Table, Checkbox, Popover, Icon } from '@tinper/next-ui';
const {filterColumn} = Table;
const FilterColumnTable = filterColumn(Table, Checkbox, Popover, Icon);

```

### API


Table 数组参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| lockable | 是否开启锁定列功能 | 'enable'(true)全部支持锁定/'disable'(false)全部禁用锁定/'onlyHeader'仅头部支持锁定/'onlyPop'仅弹出层支持锁定 | 'enable'(true) |
| afterFilter | 表头锁定及过滤弹框确定时的回调函数 | function | - |
| filterCheckboxProps | 过滤框配置的checkbox属性 | function | (column) => {} |
| filterColumnRender | 过滤框配置的列显示内容 | function | (column) => {} |
| onFilterColumnRender | 自定义渲染过滤列弹框, 逻辑交互需要自行处理 | function(columns) | - |
<!--
#### filterColumn 示例
- [按条件、值过滤](http://design.yonyoucloud.com/tinper-bee/bee-table#%E6%8C%89%E6%9D%A1%E4%BB%B6%E3%80%81%E5%80%BC%E8%BF%87%E6%BB%A4)
- [复杂表格中行过滤](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%A4%8D%E6%9D%82%E8%A1%A8%E6%A0%BC%E4%B8%AD%E8%A1%8C%E8%BF%87%E6%BB%A4)
-->

### bigData 大数据渲染

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const {bigData} = Table;
const BigDataTable = bigData(Table);

```

### API

Table 组件参数：

| 参数     | 说明         | 类型       | 返回值  |
| ------ | ---------- | -------- | ---- |
| onBodyScroll | 表体滚动加载时触发的回调函数 | function(endIndex) | `endIndex` : 可视区最后一条数据的 index 序号 |
| isTree | 显示标记为树型表格 | boolean | undefined |

<!--
#### bigData 使用示例
- [万行以上数据渲染](http://design.yonyoucloud.com/tinper-bee/bee-table#%E4%B8%87%E8%A1%8C%E4%BB%A5%E4%B8%8A%E6%95%B0%E6%8D%AE%E6%B8%B2%E6%9F%93)
- [嵌套子表格滚动加载](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%B5%8C%E5%A5%97%E5%AD%90%E8%A1%A8%E6%A0%BC%E6%BB%9A%E5%8A%A8%E5%8A%A0%E8%BD%BD)
- [多功能表格滚动加载](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%A4%9A%E5%8A%9F%E8%83%BD%E8%A1%A8%E6%A0%BC%E6%BB%9A%E5%8A%A8%E5%8A%A0%E8%BD%BD)
- [层级树大数据场景](http://design.yonyoucloud.com/tinper-bee/bee-table#%E5%B1%82%E7%BA%A7%E6%A0%91%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%9C%BA%E6%99%AF)
-->

### singleFind 单列查找定位

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const {singleFind} = Table;
const SingleFindTable = singleFind(Table);

```

### API

column 数组参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| singleFind | 该列是否启用查找定位 | bool | false |

Data 数组参数：

| 参数                  | 说明                         | 类型       | 默认值      |
| ------------------- | -------------------------- | -------- | -------- |
| _findChecked         | 标识查找匹配上当前数据           |  boolean      | true/false       |

### singleFilter 单列过滤数据

#### 如何使用

```js
import { Table } from '@tinper/next-ui';
const {singleFilter} = Table;
const SingleFilterTable = singleFilter(Table);

```

### API

Column 组件参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| onFilter | 本地模式下，确定筛选的运行函数 | function(value, record) | - |

Table 组件参数：

| 参数     | 说明         | 类型       | 默认值  |
| ------ | ---------- | -------- | ---- |
| filterMode | 过滤模式 | 'single'/'multiple' | 'single' |
| onSingleFilterRender | 自定义渲染单列筛选dom, 逻辑交互需要自行处理 | function(column) | - |
| clearFilter | 数据改变时是否重制过滤条件 | boolean | true |


### rendertype

在表格中提供了多种rendertype可以供选择，比如下拉框，输入框，日期等

需要单独的去引用相应的js文件，目录在render文件夹，示例如下：

```js
import renderInput from "@tinper/next-ui/lib/wui-table/src/render/InputRender.js";

```

### InputRender

输入框类型render

#### 依赖的组件

该render依赖于`Icon`,`Input`,`Form`,`Tooltip`。

#### 配置

| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| name              | 该输入框获取数据时的key值，该值不能设置重复且必填               | string     | -      |
| placeholder       | 输入框的提示信息                                 | string     | -      |
| value             | 输入框中的显示值                                 | string     | 无      |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false  |
| onChange          | 当值发生改变的时候触发的方法                           | Function   | 无      |
| format            | 浏览态格式化类型，Currency:货币数字;                  | string     | 无      |
| formItemClassName | FormItem的class                           | string     | -      |
| mesClassName      | 校验错误信息的class                             | string     | -      |
| isRequire         | 是否必填                                     | bool       | false  |
| check             | 验证的回调函数，参数两个，第一个为校验是否成功`true/false` 第二个为验证结果对象`{name: "", verify: false, value: ""}` | function   | -      |
| method            | 校验方式，change/blur                         | string     | -      |
| errorMessage      | 错误提示信息                                   | dom/string | "校验失败" |
| htmlType          | 数值类型，目前支持 email/tel/IDCard/chinese/password'类型 | string     | -      |
| reg               | 校验正则，注：设置 htmlType 后 reg 无效              | regExp     | -      |

#### 使用

```js
import renderInput from "@tinper/next-ui/lib/wui-table/src/render/InputRender.js";
import { Icon, Form , Input } from '@tinper/next-ui';
const InputRender = renderInput(Form, Input, Icon);

```

### DateRender

日期类型render

#### 依赖的组件

该render依赖于`moment`, `Datepicker`, `Icon`

#### 配置

| 参数                | 说明                                       | 类型         | 默认值    |
| ----------------- | ---------------------------------------- | ---------- | ------ |
| isclickTrigger    | 是否使用点击触发编辑状态                             | boolean    | false |
| type  | 控制日期的显示格式，DatePicker、MonthPicker或者WeekPicker，暂时不支持RangePicker | string | "DatePicker" |

注:其他参数参见Datepicker组件参数配置

#### 使用

```js
import renderDate from "@tinper/next-ui/lib/wui-table/src/render/DateRender.js";
import { DatePicker,Icon } from '@tinper/next-ui';
const DateRender = renderDate(DatePicker, Icon);

```

### SelectRender

下拉框类型render

#### 依赖的组件

该render依赖于`Icon`,`Select`

#### 配置

| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| isclickTrigger | 是否使用点击触发编辑状态                             | boolean | false |
| dataSource     | 数据的键值对，在表格浏览态的时候能显示真实的key值。比如`[{key:"张三",value:"01"}]` | array   | -     |

注:其他参数参见Select组件参数配置

#### 使用

```js
import renderSelect from "@tinper/next-ui/lib/wui-table/src/render/SelectRender.js";
import { Icon, Select } from '@tinper/next-ui';
const SelectRender = renderSelect(Select, Icon);

```

### CheckboxRender

复选框类型render

#### 依赖的组件

该render依赖于`Icon`,`Checkbox`

#### 配置

| 参数             | 说明                                       | 类型      | 默认值   |
| -------------- | ---------------------------------------- | ------- | ----- |
| onChange | 修改后触发回调函数 | function | () => {} |
| value    | 设置是否选中值 | boolean   | false   |

注:其他参数参见Checkbox组件参数配置

#### 使用

```js
import renderCheckbox from "@tinper/next-ui/lib/wui-table/src/render/CheckboxRender.js";
import { Icon, Checkbox } from '@tinper/next-ui';
const CheckboxRender = renderCheckbox(Checkbox, Icon);

```

### 快捷键API

| 快捷键  | 快捷键说明 | 类型 | 默认值 | 
| --- | :--- | --- |--- |
| focusable       | 是否开启快捷键功能 | bool | false
| onKeyTab       | tab快捷键，可以处理默认选中第一条数据 | function| () => {}
| onKeyUp       |  ↑(上箭) 快捷键，可以处理table的上一条数据 | function| () => {}
| onKeyDown       | ↓(下箭)快捷键，可以处理table的下一条数据 | function| () => {}
| onTableKeyDown       | 触发table的所有快捷键 | function| () => {}
| tabIndex       | 设置焦点顺序 | number | 0


## 注意事项

- 如果使用了固定列，请给固定的列设定固定宽度既width属性。

- 在使用expandedRowRender属性扩展表格时，如果同时使用了固定列。 需要给expandedRowRender中返回的对象添加`style=\{{height: xxx}\}`,来使扩展后的固定列扩展成一样高度。

<!--
> 当表格场景比较复杂时，可以使用[复杂表格ComplexGrid](http://bee.tinper.org/bee-complex-grid#bee-complex-grid)。ComplexGrid将常用的过滤、多选、分页、列交换、列拖拽等功能集成在一起。使用起来超级方便。
-->
