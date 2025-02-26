## ToolBar 属性

### API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
children | 子项 | `JSX.Element[]` / `JSX.Element` | - 
className | `class`类名 | `string` | - 
style | 样式style | `React.CSSProperties` | - 
clsPrefix | `class`前缀 | `string` | `mui` 
fieldid | `dom`标识 | `string` | - 
onSelect | 超出最大显示数时点击弹出层时触发的事件 | `(node, index) => void` | -
maxVisibleNum | 最大显示数，设置`mode`为`popover popup`或设置`onDotClick`时可生效，`buttonWidthAuto`为`true`时默认值为2 | `number` | -
mode | 超出元素显示模式，`popup`仅在子元素均为`Button`时生效 | `popover` / `popup` | `popup`
direction | 对齐方式，`buttonWidthAuto`为`true`时默认值变为`left` | `left` / `right` | `right`
placement | 气泡框位置 | `top` / `top-start` / `top-end` / `right` / `right-start` / `right-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` | `'top'` 
onDotClick | 超出最大显示数时点击图标触发事件，设置该属性时，`mode`失效，`maxVisibleNum`生效。需要自定义超出显示形式时使用该属性 | `(moreNode, children, e) => void` | -
cancelText | 设置`mode`为`popup`时，弹出框底部取消按钮文字，如果设置为空则不显示取消按钮 | `string` | -
buttonWidthAuto | 设置为`true`自适应失效，开启均分模式，只有在子元素为`TinperM Button`时生效 | `boolean` | `false`

注意：  
* 不用设置任何元素，默认内容会自适应。当子元素包含非`Button`时，需要设置`mode`为`popover`或使用`onDotClick`实现其他多余按钮展示方式，也可以触发自适应展示。  
* 当设置`maxVisibleNum`，如果显示按钮未超出宽度，不会触发自适应，超出宽度则会触发自适应显示。  
* 当设置`buttonWidthAuto`为`true`时，子元素必须为`TinperM Button`，且自适应自动失效，按照均分形式显示。  

### CSS 变量

属性|说明|默认值|全局变量
----|----|----|----
--background-color | 工具栏背景色 | `#FFFFFF` | `--ynfm-color-bg-toolbar`
--item-padding-left | 工具栏子项左内边距 | `0.12rem` | `--ynfm-spacing-padding-left-item-toolbar`
--item-padding-right | 工具栏子项右内边距 | `0.12rem` | `--ynfm-spacing-padding-right-item-toolbar`
-item-auto-button-background-color | `buttonWidthAuto`模式下按钮背景色 | `#F5F5F5` | `--mui-color-background-lower`
--item-auto-button-text-color | `buttonWidthAuto`模式下按钮文字颜色 | `#404040` | `--mui-color-text`

## fieldid 说明

| 场景             | 生成规则          |
| --------------- | ---------------- |
| 根元素           | fieldid + `"_toolbar"`          |
| 更多            | fieldid + `"_toolbar_item_more"`  |
| 子元素         | fieldid + `"_toolbar_item_${index}"`  |
