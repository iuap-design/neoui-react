# 输入框 Input

用来代替原生 html 的 input, textarea

## API

### Input

<!--Input-->

| 参数           | 说明                                                                                                                   | 类型                      | 默认值                                                                                                            | 版本  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| className      | 类名                                                                                                                   | string                    | -                                                                                                                 | -     |
| id             | 输入框生成的 id 前缀(如 id_search)                                                                                     | string                    | -                                                                                                                 | -     |
| fieldid        | fieldid 前缀(如 fieldid_search)【自动化测试专用属性】                                                                  | string                    | -                                                                                                                 | 4.3.0 |
| innerClassName | 类名                                                                                                                   | string                    | style 与 className 默认加载到 input 组件的外层上 ，如果需要加到 input 元素上需要使用 innerStyle 及 innerClassName | v4.0  |
| innerStyle     | style                                                                                                                  | object                    | style 与 className 默认加载到 input 组件的外层上 ，如果需要加到 input 元素上需要使用 innerStyle 及 innerClassName | v4.0  |
| componentClass | 说明表单类型(`input`,`textarea`)                                                                                       | string                    | 'input'                                                                                                           | -     |
| type           | 类型(`search`, `password`,`textarea`,...)                                                                              | string                    | 'text'                                                                                                            | -     |
| onChange       | input 值发生改变触发的回调                                                                                             | func                      | -                                                                                                                 | -     |
| debounceDelay  | 函数防抖时间间隔                                                                                                       | number                    | -                                                                                                                 | -     |
| onKeyDown      | keydown 回调                                                                                                           | func                      | -                                                                                                                 | -     |
| value          | input 当前值                                                                                                           | string                    | -                                                                                                                 | -     |
| defaultValue   | input 默认值                                                                                                           | string                    | -                                                                                                                 | -     |
| onSearch       | input type="search" 回车和点击搜索按钮的回调                                                                           | func                      | -                                                                                                                 | -     |
| readOnly       | 只读                                                                                                                   | bool                      | -                                                                                                                 | -     |
| disabled       | 禁用                                                                                                                   | bool                      | -                                                                                                                 | -     |
| allowClear     | 是否显示清空按钮                                                                                                       | bool                      | -                                                                                                                 | -     |
| trim           | 是否失焦时清除多余空格                                                                                                 | bool \| `left` \| `right` | false                                                                                                             | -     |
| focusSelect    | 设置当 focus 的时候是否选择内容                                                                                        | bool                      | false                                                                                                             | -     |
| prefix         | 设置前缀。默认宽度 30px，可通过复写样式更改                                                                            | node/string               | -                                                                                                                 | -     |
| suffix         | 设置后缀。默认宽度 30px，可通过复写样式更改                                                                            | node/string               | -                                                                                                                 | -     |
| maxLength      | 设置最大长度；注：如果非首次渲染更新 input 的 value 的时候，不会自动截断 value，需在设置 value 之前将 value 值手动截断 | number                    | -                                                                                                                 | -     |
| onPressEnter   | 按下回车的回调                                                                                                         | function(e)               | -                                                                                                                 | -     |
| size           | 输入框大小，可选 xs sm nm md lg                                                                                        | string                    | `md`                                                                                                              | -     |
| bordered       | 设置边框，支持无边框、下划线模式                                                                                       | `boolean`\|`bottom`       | -                                                                                                                 | 4.5.0 |
| align          | 设置文本对齐方式                                                                                                       | `left`\|`center`\|`right` | -                                                                                                                 | 4.5.2 |
| requiredStyle  | 必填样式                                                                                                               | bool                      | false                                                                                                             | 4.6.6 |

> **Input** 默认包含以下子组件, 使用方法如下：

### Input.TextArea

<!--Input.TextArea-->

| 参数              | 说明                                                                      | 类型                        | 默认值 | 版本  |
| ----------------- | ------------------------------------------------------------------------- | --------------------------- | ------ | ----- |
| autoSize          | 自适应内容高度，可设置为 true \| false 或对象：{ minRows: 2, maxRows: 6 } | boolean \| object           | false  | -     |
| onResize          | resize 回调（配置 autoSize 时 onResize 无效）                             | function({ width, height }) | -      | -     |
| showMaxLabel      | 是否显示最大允许输入长度                                                  | boolean                     | false  | 4.4.1 |
| allowInputOverMax | 超出 maxlength 后是否允许继续输入                                         | boolean                     | true   | 4.4.1 |

### Input.Search

<!--Input.Search-->

| 参数        | 说明                                         | 类型                 | 默认值 | 版本  |
| ----------- | -------------------------------------------- | -------------------- | ------ | ----- |
| onSearch    | 点击搜索图标、清除图标，或按下回车键时的回调 | function(value, e)   | -      | -     |
| enterButton | 是否有确认按钮，可设为按钮文字。             | boolean \| ReactNode | false  | 4.4.4 |
| loading     | 搜索 loading                                 | boolean              | false  | 4.4.4 |

### Input.Password

<!--Input.Password-->

| 参数             | 说明                   | 类型                   | 默认值                                                                       | 版本  |
| ---------------- | ---------------------- | ---------------------- | ---------------------------------------------------------------------------- | ----- |
| trigger          | 触发切换行为           | 'click' \| 'hover'     | 'click'                                                                      | 4.3.2 |
| iconRender       | 自定义切换按钮         | (visible) => ReactNode | `(visible) => (visible ? <Icon type='uf-eye' /> : <Icon type='uf-eye-o' />)` | 4.3.2 |
| visibilityToggle | 是否显示切换按钮       | boolean                | true                                                                         | 4.3.2 |
| passwordVisible  | 密码是否可见           | boolean                | true                                                                         | 4.3.2 |
| onVisibleChange  | 密码可见状态切换的回调 | (visible) => void      |                                                                              | 4.3.2 |

### Input.Group

> InputGroup 是包装 Input,InputGroupAddon 的元素，实际应用中 InputGroupAddon 被集成到 InputGroup 中使用，格式如：InputGroup.Addon

<!--Input.Group-->

| 参数      | 说明             | 类型   | 默认值            | 版本 |
| --------- | ---------------- | ------ | ----------------- | ---- |
| className | 类名             | string | `wui-input-group` | -    |
| simple    | 是否`simple`模式 | bool   | false             | -    |

### fieldid 场景说明

| 场景      | 生成规则说明           | 版本  |
| --------- | ---------------------- | ----- |
| 根元素    | fieildid + "\_input"   | 4.3.0 |
| 输入框    | fieldid                | 4.3.0 |
| 前缀      | fieldid + "\_prefix"   | 4.3.0 |
| 后缀      | fieldid + "\_suffix"   | 4.3.0 |
| 搜索 icon | fieldid + "\_search"   | 4.3.0 |
| 清空 icon | fieldid + "\_clear"    | 4.3.0 |
| 密码 icon | fieldid + "\_password" | 4.3.2 |

### 已废弃

| 参数          | 类型    | 描述             |
| ------------- | ------- | ---------------- |
| ~~showClose~~ | Boolean | 是否显示清空按钮 |
