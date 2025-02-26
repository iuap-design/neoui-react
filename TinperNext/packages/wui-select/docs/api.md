# 下拉框 Select

下拉弹出菜单，代替原生的选择器。当然 Select 扩展了其他功能：多选，级联，搜索过滤单选和搜索过滤多选与自动填充选择

## API

<!--Select-->

| 参数                     | 说明                                                                                                                                                                                                                            | 类型                                                                              | 默认值                                             | 版本  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | ----- |
| allowClear               | 支持清除                                                                                                                                                                                                                        | boolean                                                                           | false                                              |       |
| autoClearSearchValue     | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效                                                                                                                                                            | boolean                                                                           | true                                               |       |
| autoFocus                | 默认获取焦点                                                                                                                                                                                                                    | boolean                                                                           | false                                              |       |
| requiredStyle            | 必填样式                                                                                                                                                                                                                        | boolean                                                                           | false                                              | 4.6.6 |
| bordered                 | 设置边框，支持无边框、下划线模式                                                                                                                                                                                                | `boolean`\|`bottom`                                                               | -                                                  | 4.5.2 |
| align                    | 设置文本对齐方式                                                                                                                                                                                                                | `left`\|`center`\|`right`                                                         | -                                                  | 4.5.2 |
| clearIcon                | 自定义的多选框清空图标                                                                                                                                                                                                          | ReactNode                                                                         | -                                                  |       |
| defaultActiveFirstOption | 是否默认高亮第一个选项                                                                                                                                                                                                          | boolean                                                                           | true                                               |       |
| defaultOpen              | 是否默认展开下拉菜单                                                                                                                                                                                                            | boolean                                                                           | -                                                  |       |
| defaultValue             | 指定默认选中的条目                                                                                                                                                                                                              | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | -                                                  |       |
| disabled                 | 是否禁用                                                                                                                                                                                                                        | boolean                                                                           | false                                              |       |
| dropdownClassName        | 下拉菜单的 className 属性                                                                                                                                                                                                       | string                                                                            | -                                                  |       |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动                                                                                                                              | boolean \| number                                                                 | true                                               |       |
| dropdownRender           | 自定义下拉框内容                                                                                                                                                                                                                | (originNode: ReactNode) => ReactNode                                              | -                                                  |       |
| dropdownStyle            | 下拉菜单的 style 属性                                                                                                                                                                                                           | CSSProperties                                                                     | -                                                  |       |
| fieldNames               | 自定义节点 label、key、options 的字段。可查看 TreeSelect 组件的同类 demo，用法相同                                                                                                                                              | object                                                                            | { label: `label`, key: `key`, options: `options` } | 4.2.1 |
| filterOption             | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false                                                                                      | boolean \| function(inputValue, option)                                           | true                                               |       |
| filterSort               | 搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction                                                                 | (optionA: Option, optionB: Option) => number                                      | -                                                  |       |
| getPopupContainer        | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0)                                                                                 | function(triggerNode)                                                             | () => document.body                                |       |
| getSelectAttrs           | 自定义生成下拉框 wui-select-dropdown 层 dom 属性的方法。需要传递一个特殊的 dropdownClassName，可参考“基本使用”demo                                                                                                              | function()                                                                        | -                                                  |
| id                       | 下拉框的 id，传 options 属性生成的下拉选项的 id 前缀（id_item_index）。如果不传 options 属性，可以在构造 Select.Option 时手动传递 id。（非必须属性，如果不传 id 的话，下拉框会有默认 id，例如：rc_select_6，下拉选项不会有 id） | string                                                                            | -                                                  |       |
| fieldid                  | 自动化测试专用属性                                                                                                                                                                                                              | string                                                                            |                                                    | 4.3.0 |
| labelInValue             | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式                                                                                                    | boolean                                                                           | false                                              |       |
| listHeight               | 设置弹窗最大滚动高度                                                                                                                                                                                                            | number ｜ boolean                                                                 | 320                                                |       |
| loading                  | 加载中状态                                                                                                                                                                                                                      | boolean                                                                           | false                                              |       |
| locale                   | 语言(zh-cn/en-us/zh-tw)                                                                                                                                                                                                         | string                                                                            | zh-cn                                              |       |
| maxTagCount              | 最多显示多少个 tag，响应式模式会对性能产生损耗                                                                                                                                                                                  | number \| `responsive`, `auto`                                                    | -                                                  |       |
| maxTagPlaceholder        | 隐藏 tag 时显示的内容                                                                                                                                                                                                           | ReactNode \| function(omittedValues)                                              | -                                                  |       |
| maxTagTextLength         | 最大显示的 tag 文本长度                                                                                                                                                                                                         | number                                                                            | -                                                  |       |
| menuItemSelectedIcon     | 自定义多选时当前选中的条目图标                                                                                                                                                                                                  | ReactNode                                                                         | -                                                  |       |
| mode                     | 设置 Select 的模式为多选或标签                                                                                                                                                                                                  | `multiple` \| `tags` \| `combobox`                                                | -                                                  |       |
| notFoundContent          | 当下拉列表为空时显示的内容                                                                                                                                                                                                      | ReactNode                                                                         | `Not Found`                                        |       |
| open                     | 是否展开下拉菜单                                                                                                                                                                                                                | boolean                                                                           | -                                                  |       |
| optionFilterProp         | 搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。                                                           | string                                                                            | `value`                                            |       |
| optionLabelProp          | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。                                                                                                                      | string                                                                            | `children`                                         |       |
| options                  | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能                                                                                                                                                                           | { label, value }\[]                                                               | -                                                  |       |
| placeholder              | 选择框默认文本                                                                                                                                                                                                                  | string                                                                            | -                                                  |       |
| placement                | 选择框弹出的位置                                                                                                                                                                                                                | `bottomLeft` `bottomRight` `topLeft` `topRight`                                   | bottomLeft                                         | 4.2.1 |
| removeIcon               | 自定义的多选框清除图标                                                                                                                                                                                                          | ReactNode                                                                         | -                                                  |       |
| searchValue              | 控制搜索文本                                                                                                                                                                                                                    | string                                                                            | -                                                  |       |
| showArrow                | 是否显示下拉小箭头                                                                                                                                                                                                              | boolean                                                                           | true                                               |       |
| showSearch               | 使单选模式可搜索                                                                                                                                                                                                                | boolean                                                                           | false                                              |       |
| suffixIcon               | 自定义的选择框后缀图标                                                                                                                                                                                                          | ReactNode                                                                         | -                                                  |       |
| tagRender                | 自定义 tag 内容 render                                                                                                                                                                                                          | (props) => ReactNode                                                              | -                                                  |       |
| tokenSeparators          | 在 `tags` 和 `multiple` 模式下自动分词的分隔符。注意：这个分隔符的意义不是选定多个值以后，这个多选框值的字符串分隔符，而是粘贴过来的文本，可以通过这个分隔符分割成几个值，直接展示在框中                                        | string\[]                                                                         | -                                                  |       |
| value                    | 指定当前选中的条目                                                                                                                                                                                                              | string \| string\[]<br />number \| number\[]<br />LabeledValue \| LabeledValue\[] | -                                                  |       |
| virtual                  | 设置 false 时关闭虚拟滚动                                                                                                                                                                                                       | bool                                                                              | true                                               |
| onBlur                   | 失去焦点时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onChange                 | 选中 option，或 input 的 value 变化时，调用此函数                                                                                                                                                                               | function(value, option:Option \| Array&lt;Option>)                                | -                                                  |       |
| onClear                  | 清除内容时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onDeselect               | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效                                                                                                                                          | function(string \| number \| LabeledValue)                                        | -                                                  |       |
| onDropdownVisibleChange  | 展开下拉菜单的回调                                                                                                                                                                                                              | function(open)                                                                    | -                                                  |       |
| onFocus                  | 获得焦点时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onInputKeyDown           | 按键按下时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onMouseEnter             | 鼠标移入时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onMouseLeave             | 鼠标移出时回调                                                                                                                                                                                                                  | function                                                                          | -                                                  |       |
| onPopupScroll            | 下拉列表滚动时的回调                                                                                                                                                                                                            | function                                                                          | -                                                  |       |
| onSearch                 | 文本框值变化时回调                                                                                                                                                                                                              | function(value: string)                                                           | -                                                  |       |
| onSelect                 | 被选中时调用，参数为选中项的 value (或 key) 值                                                                                                                                                                                  | function(string \| number \| LabeledValue, option: Option)                        | -                                                  |       |
| resizable                | 设置下拉框是否可 resize,默认 resize 范围是 window,可以通过 getPopupContainer 设置父级容器范围内 resize                                                                                                                          | bool ｜"vertical" ｜ "horizontal"                                                 | false                                              | 4.5.0 |
| onResizeStart            | resize 开始时的回调                                                                                                                                                                                                             | function                                                                          | -                                                  | 4.5.0 |
| onResize                 | resize 时的回调                                                                                                                                                                                                                 | function                                                                          | -                                                  | 4.5.0 |
| onResizeStop             | resize 结束时的回调                                                                                                                                                                                                             | function                                                                          | -                                                  | 4.5.0 |
| ~~data~~                 | 请使用 options 代替，可以设置 data 属性来自动生成 option,可以参见 demo 中的示例。也可以设置是否禁用 disabled                                                                                                                    | Array                                                                             | -                                                  |
| ~~multiple~~             | 请使用 mode 代替，支持多选                                                                                                                                                                                                      | bool                                                                              | false                                              |
| ~~tags~~                 | 请使用 mode 代替，可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配                                                                                                                                                      | bool                                                                              | false                                              |
| ~~supportWrite~~         | 请使用 mode="combobox"代替，mode 设置为 combobox 的下拉框，可以输入字符串获得 Select 的值                                                                                                                                       | bool                                                                              | false                                              |

<!--
以下tinper-bee属性是否还需要待确认
|combobox|输入框自动提示模式|bool|false|
|supportWrite|输入搜索查询时是否支持自定义输入，需配合showSearch使用，否则无效|bool|false|
|popData|下拉框自定义属性,例如 `{"data-name":"lucian","data-sex":"man"}`，属性名不能和其它属性名重复，否则会被覆盖|Object|-|
|noWarp|多选不换行|bool|-|
-->

### Select Methods

| 名称    | 说明     | 版本 |
| ------- | -------- | ---- |
| blur()  | 取消焦点 |      |
| focus() | 获取焦点 |      |

### Option

<!--Select.Option-->

| 参数      | 说明                                                                        | 类型             | 默认值 | 版本 |
| --------- | --------------------------------------------------------------------------- | ---------------- | ------ | ---- |
| className | Option 器类名                                                               | string           | -      |      |
| disabled  | 是否禁用                                                                    | boolean          | false  |      |
| title     | 选中该 Option 后，Select 的 title                                           | string           | -      |      |
| value     | 默认根据此属性值进行筛选                                                    | string \| number | -      |      |
| ~~key~~   | 如果 react 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string           | -      |

### OptGroup

| 参数  | 说明 | 类型                    | 默认值 | 版本 |
| ----- | ---- | ----------------------- | ------ | ---- |
| key   | Key  | string                  | -      |      |
| label | 组名 | string \| React.Element | -      |      |

### 已支持的键盘操作

| 按键    | 功能         |
| ------- | ------------ |
| ↑(上箭) | 向上切换选项 |
| ↓(下箭) | 向下切换选项 |
| esc     | 关闭下拉项   |
| enter   | 选中下拉框   |

### fieldid 场景说明

| 场景                 | 生成规则说明                   | 版本  |
| -------------------- | ------------------------------ | ----- |
| 根元素               | fieldid                        | 4.3.0 |
| 输入框               | fieldid + "\_search_input      | 4.3.0 |
| 下拉箭头             | fieldid + "\_suffix"           | 4.3.0 |
| 多选已选选项         | fieldid + "\_tag\_${index}"    | 4.3.0 |
| 多选已选选项删除图标 | fieldid + "\_remove\_${index}" | 4.3.0 |
| 下拉选项             | fieldid + "\_option\_${index}" | 4.3.0 |
| 多选下拉选项已选图标 | fieldid + "\_item_selected"    | 4.3.0 |
| 清空图标             | fieldid + "\_clear"            | 4.3.0 |

### Q&A

#### 1.使用 options 属性需要注意什么？

如果传递 options 属性来生成 Option，之前的版本我们用 key 属性渲染文字，现在需要使用 label 属性来渲染文字，否则，将通过 value 渲染文字。

#### 2.使用 getPopupContainer 属性需要注意什么？

不要将 Select 渲染的父节点设置为 Modal 外层的 DOM 元素，如果设置到外层的元素(.wui-modal 或者.wui-modal-dialog)，会出现选项不可点击的情况。可以设置到 wui-modal-content 上。

#### 3.为什么在滚动过程中数据出现渲染异常（重复，错乱）？

1.检查一下 Option 组件的 key 是否有重复。 2.检查一下外层传入数据的组件两次 render 的数据是否一致。

#### 4.为什么 focus()方法不生效？

页面中有其他获得了焦点的元素。

