# 自动完成 AutoComplete

根据用户的输入，进行自动匹配显示列表，用户可以进行按需选择自己需要的内容

## API

<!--AutoComplete-->

| 参数                     | 说明                                                                                                                                            | 类型                                                                         | 默认值              | 版本  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------- | ----- |
| allowClear               | 支持清除                                                                                                                                        | boolean                                                                      | false               | 4.4.4 |
| autoFocus                | 自动获取焦点                                                                                                                                    | boolean                                                                      | false               | 4.4.4 |
| children                 | 自定义输入框                                                                                                                                    | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement&lt;InputProps> | &lt;Input />        | 4.4.4 |
| defaultActiveFirstOption | 是否默认高亮第一个选项                                                                                                                          | boolean                                                                      | true                | 4.4.4 |
| defaultOpen              | 是否默认展开下拉菜单                                                                                                                            | boolean                                                                      | -                   | 4.4.4 |
| defaultValue             | 指定默认选中的条目                                                                                                                              | string                                                                       | -                   | 4.4.4 |
| disabled                 | 是否禁用                                                                                                                                        | boolean                                                                      | false               |       |
| bordered                 | 设置边框，支持无边框、下划线模式                                                                                                                | `boolean`\|`bottom`                                                          | -                   | 4.5.2 |
| align                    | 设置文本对齐方式                                                                                                                                | `left`\|`center`\|`right`                                                    | -                   | 4.5.2 |
| requiredStyle            | 必填样式                                                                                                                                        | boolean                                                                      | false               | 4.6.6 |
| dropdownClassName        | 下拉菜单的 className 属性                                                                                                                       | string                                                                       | -                   | 4.4.4 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动                                              | boolean \| number                                                            | true                | 4.4.4 |
| filterOption             | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false      | boolean \| function(inputValue, option)                                      | true                | 4.4.4 |
| getPopupContainer        | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode)                                                        | () => document.body | 4.4.4 |
| notFoundContent          | 当下拉列表为空时显示的内容                                                                                                                      | ReactNode                                                                    | -                   | 4.4.4 |
| open                     | 是否展开下拉菜单                                                                                                                                | boolean                                                                      | -                   |       |
| options                  | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能                                                                                           | { label, value }\[]                                                          | -                   |       |
| placeholder              | 输入框提示                                                                                                                                      | string                                                                       | -                   |       |
| value                    | 指定当前选中的条目                                                                                                                              | string                                                                       | -                   |       |
| onBlur                   | 失去焦点时的回调                                                                                                                                | function(e)                                                                  | -                   |       |
| onChange                 | 选中 option，或 input 的 value 变化时，调用此函数                                                                                               | function(value)                                                              | -                   |       |
| onDropdownVisibleChange  | 展开下拉菜单的回调                                                                                                                              | function(open)                                                               | -                   | 4.4.4 |
| onFocus                  | 获得焦点时的回调                                                                                                                                | function(e)                                                                  | -                   | 4.4.4 |
| onSearch                 | 搜索补全项的时候调用                                                                                                                            | function(value)                                                              | -                   | 4.4.4 |
| onSelect                 | 被选中时调用，参数为选中项的 value 值                                                                                                           | function(value, option)                                                      | -                   | 4.4.4 |
| onClear                  | 清除内容时的回调                                                                                                                                | function                                                                     | -                   | 4.4.4 |
| onKeyDown                | 监听 input 的键盘事件，调用此函数                                                                                                               | handleKeyDown()                                                              | -                   |
| fieldid                  | 自动化测试专用属性                                                                                                                              | string                                                                       | -                   | 4.3.0 |

## 以后将废除的 api

| 参数           | 说明                                                          | 类型     | 默认值 | 版本 |
| -------------- | ------------------------------------------------------------- | -------- | ------ | ---- |
| show           | 是否展开下拉菜单, 建议使用 show 属性                          | boolean  | -      |
| onSelectOption | 被选中时调用，参数为选中项的 value 值，建议使用 onSelect 属性 | function | -      |

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ------------------------------ | ----- |
| 根元素   | fieldid                        | 4.3.0 |
| 选项节点 | fieldid + "\_option\_${index}" | 4.3.0 |
| 输入框   | fieldid +"\_search"+"\_input"  | 4.4.4 |
