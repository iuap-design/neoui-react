# 树选择 TreeSelect

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等

## API

### Tree props

<!--TreeSelect-->

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className                | 根节点元素下添加自定义样式名                                                                                                                                                                | string                                                                                  | -                                                        |
| allowClear               | 显示清除按钮                                                                                                                                                                                | boolean                                                                                 | false                                                    |       |
| autoClearSearchValue     | 当多选模式下值被选择，自动清空搜索框                                                                                                                                                        | boolean                                                                                 | true                                                     |       |
| requiredStyle            | 必填样式                                                                                                                                                                                    | Boolean                                                                                 | false                                                    | 4.6.6 |
| bordered                 | 设置边框，支持无边框、下划线模式                                                                                                                                                            | `boolean`\|`bottom`                                                                     | -                                                        | 4.5.2 |
| align                    | 设置文本对齐方式                                                                                                                                                                            | `left`\|`center`\|`right`                                                               | -                                                        | 4.5.2 |
| defaultValue             | 指定默认选中的条目                                                                                                                                                                          | string \| string\[]                                                                     | -                                                        |       |
| disabled                 | 是否禁用                                                                                                                                                                                    | boolean                                                                                 | false                                                    |       |
| popupClassName           | 下拉菜单的 className 属性                                                                                                                                                                   | string                                                                                  | -                                                        |       |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动                                                                                          | boolean \| number                                                                       | true                                                     |       |
| dropdownRender           | 自定义下拉框内容                                                                                                                                                                            | (originNode: ReactNode, Footer) => ReactNode                                            | -                                                        |       |
| dropdownStyle            | 下拉菜单的样式                                                                                                                                                                              | object                                                                                  | -                                                        |       |
| fieldNames               | 自定义节点 label、value、children 的字段                                                                                                                                                    | object                                                                                  | { label: `label`, value: `value`, children: `children` } | 4.2.1 |
| filterTreeNode           | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值                                                                                                        | boolean \| function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值)      | function                                                 |       |
| getPopupContainer        | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。                                                                                        | function(triggerNode)                                                                   | () => document.body                                      |       |
| labelInValue             | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string\[] } 的格式                         | boolean                                                                                 | false                                                    |       |
| listHeight               | 设置弹窗滚动高度                                                                                                                                                                            | number                                                                                  | 200                                                      |       |
| loadData                 | 异步加载数据                                                                                                                                                                                | function(node)                                                                          | -                                                        |       |
| maxTagCount              | 最多显示多少个 tag，响应式模式会对性能产生损耗                                                                                                                                              | number \| `responsive`                                                                  | -                                                        |       |
| maxTagPlaceholder        | 隐藏 tag 时显示的内容                                                                                                                                                                       | ReactNode \| function(omittedValues)                                                    | -                                                        |       |
| multiple                 | 支持多选（当设置 treeCheckable 时自动变为 true）                                                                                                                                            | boolean                                                                                 | false                                                    |       |
| notFoundContent          | 设定搜索不到数据显示的内容                                                                                                                                                                  | String                                                                                  | '无匹配结果'                                             |
| placeholder              | 选择框默认文字                                                                                                                                                                              | string                                                                                  | -                                                        |       |
| placement                | 选择框弹出的位置                                                                                                                                                                            | `bottomLeft` `bottomRight` `topLeft` `topRight`                                         | bottomLeft                                               | 4.2.1 |
| searchValue              | 搜索框的值，可以通过 `onSearch` 获取用户输入                                                                                                                                                | string                                                                                  | -                                                        |       |
| showArrow                | 是否显示 `suffixIcon`，单选模式下默认 `true`                                                                                                                                                | boolean                                                                                 | -                                                        |       |
| showCheckedStrategy      | 配置 `treeCheckable` 时，定义选中项回填的方式。`TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点)。`TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点 | `TreeSelect.SHOW_ALL` \| `TreeSelect.SHOW_PARENT` \| `TreeSelect.SHOW_CHILD`            | `TreeSelect.SHOW_CHILD`                                  |       |
| showSearch               | 是否支持搜索框                                                                                                                                                                              | boolean                                                                                 | 单选：false \| 多选：true                                |       |
| size                     | 选择框大小                                                                                                                                                                                  | string                                                                                  | large / middle / small                                   | -     |     |
| suffixIcon               | 自定义的选择框后缀图标, 多选模式下必须同时设置 `showArrow` 为 true                                                                                                                          | ReactNode                                                                               | -                                                        |       |
| switcherIcon             | 自定义树节点的展开/折叠图标                                                                                                                                                                 | ReactNode                                                                               | -                                                        |       |
| tagRender                | 自定义 tag 内容，多选时生效                                                                                                                                                                 | (props) => ReactNode                                                                    | -                                                        | 4.2.1 |
| treeCheckable            | 显示 Checkbox                                                                                                                                                                               | boolean                                                                                 | false                                                    |       |
| treeCheckStrictly        | `checkable` 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 true                                                                                           | boolean                                                                                 | false                                                    |       |
| treeData                 | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一）                                                                                                          | array&lt;{value, title, children, \[disabled, disableCheckbox, selectable, checkable]}> | \[]                                                      |       |
| treeDataSimpleMode       | 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: \[{id:1, pId:0, value:'1', title:"test1",...},...]， `pId` 是父节点的 id)                            | boolean \| object&lt;{ id: string, pId: string, rootPId: string }>                      | false                                                    |       |
| treeDefaultExpandAll     | 默认展开所有树节点                                                                                                                                                                          | boolean                                                                                 | false                                                    |       |
| treeDefaultExpandedKeys  | 默认展开的树节点                                                                                                                                                                            | string\[]                                                                               | -                                                        |       |
| treeExpandedKeys         | 设置展开的树节点                                                                                                                                                                            | string\[]                                                                               | -                                                        |       |
| treeIcon                 | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式                                                                                                     | boolean                                                                                 | false                                                    |       |
| treeNodeFilterProp       | 输入项过滤对应的 treeNode 属性                                                                                                                                                              | string                                                                                  | `value`                                                  |       |
| treeNodeLabelProp        | 作为显示的 prop 设置                                                                                                                                                                        | string                                                                                  | `title`                                                  |       |
| value                    | 指定当前选中的条目                                                                                                                                                                          | string \| string\[]                                                                     | -                                                        |       |
| virtual                  | 设置 false 时关闭虚拟滚动                                                                                                                                                                   | boolean                                                                                 | true                                                     |       |
| onChange                 | 选中树节点时调用此函数                                                                                                                                                                      | function(value, label, extra)                                                           | -                                                        |       |
| onDropdownVisibleChange  | 展开下拉菜单的回调                                                                                                                                                                          | function(open)                                                                          | -                                                        |       |
| onSearch                 | 文本框值变化时回调                                                                                                                                                                          | function(value: string)                                                                 | -                                                        |       |
| onSelect                 | 被选中时调用                                                                                                                                                                                | function(value, option)                                                                 | -                                                        |       |
| onTreeExpand             | 展示节点时调用                                                                                                                                                                              | function(expandedKeys)                                                                  | -                                                        |       |
| open                     | 是否展开下拉树菜单                                                                                                                                                                          | boolean                                                                                 | false                                                    |       |
| fieldid                  | 自动化测试专用属性                                                                                                                                                                          | string                                                                                  |                                                          | 4.3.0 |
| resizable                | 设置下拉框是否可 resize,默认 resize 范围是 window,可以通过 getPopupContainer 设置父级容器范围内 resize                                                                                      | bool ｜"vertical" ｜ "horizontal"                                                       | false                                                    |
| onResizeStart            | resize 开始时的回调                                                                                                                                                                         | function                                                                                | -                                                        |
| onResize                 | resize 时的回调                                                                                                                                                                             | function                                                                                | -                                                        |
| onResizeStop             | resize 结束时的回调                                                                                                                                                                         | function                                                                                | -                                                        |

### Tree 以后将废除的 api

| 参数              | 说明                      | 类型   | 默认值 | 版本 |
| ----------------- | ------------------------- | ------ | ------ | ---- |
| dropdownClassName | 下拉菜单的 className 属性 | string | -      |      |

### Tree methods

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

<!--TreeSelect.TreeNode-->

| 参数            | 说明                                               | 类型      | 默认值 | 版本 |
| --------------- | -------------------------------------------------- | --------- | ------ | ---- |
| checkable       | 当树为 Checkbox 时，设置独立节点是否展示 Checkbox  | boolean   | -      |      |
| disableCheckbox | 禁掉 Checkbox                                      | boolean   | false  |      |
| disabled        | 是否禁用                                           | boolean   | false  |      |
| isLeaf          | 是否是叶子节点                                     | boolean   | false  |      |
| key             | 此项必须设置（其值在整个树范围内唯一）             | string    | -      |      |
| selectable      | 是否可选                                           | boolean   | true   |      |
| title           | 树节点显示的内容                                   | ReactNode | `---`  |      |
| value           | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string    | -      |      |

### fieldid 场景说明

| 场景         | 生成规则说明                      | 版本  |
| ------------ | --------------------------------- | ----- |
| 根元素       | fieldid                           | 4.3.0 |
| 树节点       | fieldid + "\_option\_${index}"    | 4.3.0 |
| 展开折叠按钮 | fieldid + "\_treeselect_switcher" | 4.3.0 |
| 下拉箭头     | fieldid + "\_suffix_icon"         | 4.3.0 |

### Q&A

#### 1.为什么渲染树的层级会发生错乱，比如数组中同一级别的数据渲染出了缩进效果？

检查一下数据中的 value，保证唯一性，同样的 value 出现在不同的父级子级中会渲染出错误的树结构。

