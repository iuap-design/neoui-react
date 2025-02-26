# 级联菜单 Cascader

级联选择框。

## API

<!--Cascader-->

| 参数                 | 说明                                                                                                                            | 类型                                                               | 默认值                 | 版本   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------- | ------ |
| placeholder          | input 提示信息                                                                                                                  | string                                                             | ""                     |
| allowClear           | 是否支持清除                                                                                                                    | boolean                                                            | true                   |
| requiredStyle        | 必填样式                                                                                                                        | boolean                                                            | false                  | 4.6.6  |
| bordered             | 设置边框，支持无边框、下划线模式                                                                                                | `boolean`\|`bottom`                                                | -                      | v4.5.2 |
| align                | 设置文本对齐方式                                                                                                                | `left`\|`center`\|`right`                                          | -                      | v4.5.2 |
| autoFocus            | 自动获取焦点                                                                                                                    | boolean                                                            | false                  |
| className            | 自定义 wui-cascader-picker 层类名                                                                                               | string                                                             | -                      |
| expandIcon           | 自定义次级菜单展开图标                                                                                                          | ReactNode                                                          | -                      |
| dropdownRender       | 自定义下拉框内容                                                                                                                | () => ReactNode                                                    | -                      |
| getPopupContainer    | 菜单渲染父节点                                                                                                                  | `HTMLElement` `() => HTMLElement` `Selectors`                      | `body`                 |
| loadData             | 用于动态加载选项，无法与 showSearch 一起使用                                                                                    | (selectedOptions) => void                                          | -                      |
| showSearch           | 在选择框中显示搜索框                                                                                                            | boolean                                                            | false                  |
| notFoundContent      | 当下拉列表为空时显示的内容                                                                                                      | string                                                             | -                      |
| suffixIcon           | 自定义选择框后缀图标                                                                                                            | ReactNode                                                          | -                      |
| options              | 下拉列表数据, 多选时可通过给数据项设置 disableCheckbox 为 true 实现具体某一项 checkbox 禁用                                     | json                                                               | 必填，无默认值         |
| defaultValue         | 默认的选中项格式为：[{lable:'xxx',value:'yyy'},....] 或者 ['key1','key3','key3',...]                                            | string[]                                                           | []                     |
| value                | 受控的值格式为：[{lable:'xxx',value:'yyy'},....] 或者 ['key1','key3','key3',...]                                                | string[]                                                           | []                     |
| changeOnSelect       | 当此项为 true 时，点选每级菜单选项值都会发生变化                                                                                | boolean                                                            | false                  |
| disabled             | 禁用                                                                                                                            | boolean                                                            | false                  |
| expandTrigger        | 次级菜单的展开方式，可选 'click' 和 'hover'                                                                                     | string                                                             | 'click'                |
| size                 | 输入框大小，可选 lg md sm                                                                                                       | string                                                             | 'md'                   |
| onChange             | 选择完成后的回调                                                                                                                | Function(value, selectedOptions)                                   | -                      |
| inputValue           | 自定义输入框展示内容                                                                                                            | string                                                             | -                      |
| separator            | 分隔符自定义                                                                                                                    | string                                                             | '/ '                   |
| onSearch             | 监听搜索，返回输入的值和匹配的值                                                                                                | Function(value, selectedOptions)                                   | -                      |
| fieldid              | 自动化测试专用属性                                                                                                              | string                                                             | -                      |
| locale               | 语言                                                                                                                            | string                                                             | zh-cn                  | -      |
| popupVisible         | 是否显示浮层                                                                                                                    | boolean                                                            | false                  | -      |
| popupClassName       | 自定义浮层类名                                                                                                                  | string                                                             | -                      | -      |
| onPopupVisibleChange | 显示/隐藏浮层的回调                                                                                                             | (value) => void                                                    | -                      | -      |
| multiple             | 支持多选节点                                                                                                                    | boolean                                                            | false                  | v4.5.2 |
| showCheckedStrategy  | 定义选中项回填凡是。Cascader.SHOW_CHILD: 只显示选中的子节点。Cascader.SHOW_PARENT: 只显示父节点（当父节点下所有子节点都选中时） | `Cascader.SHOW_PARENT`\|`Cascader.SHOW_CHILD`                      | `Cascader.SHOW_PARENT` | v4.5.2 |
| maxTagCount          | 最多显示多少个 tag，响应式模式会对性能产生损耗                                                                                  | `number`\|`responsive`                                             | -                      | v4.5.2 |
| maxTagPlaceholder    | 隐藏 tag 时显示的内容                                                                                                           | ReactNode                                                          | -                      | v4.5.2 |
| maxTagTextLength     | 最大显示的 tag 文本长度                                                                                                         | number                                                             | -                      | v4.5.2 |
| tagRender            | 自定义 tag 内容 render，仅在多选时生效                                                                                          | ({ label: string, onClose: function, value: string }) => ReactNode | -                      | v4.5.2 |
| displayRender        | 选择后展示的渲染函数                                                                                                            | (label, selectedOptions) => ReactNode                              | label => label.join(/) | v4.5.2 |
| dropdownType         | 级联下拉项展示为平铺模式，设置值为'tiled'                                                                                       | string                                                             | -                      | v4.5.2 |

### fieldid 场景说明

| 场景                 | 生成规则说明                   | 版本  |
| -------------------- | ------------------------------ | ----- |
| 根元素               | fieldid                        | 4.3.0 |
| 内部 input           | fieldid + "\-input"            | 4.3.0 |
| 清空按钮图标         | fieldid + "\_close"            | 4.3.1 |
| input 框右侧下拉图标 | fieldid + "\_down"             | 4.3.1 |
| 下拉内容展开图标     | fieldid + "\_expand\_${index}" | 4.3.1 |
