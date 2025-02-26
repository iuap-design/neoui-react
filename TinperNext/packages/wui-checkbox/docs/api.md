# 多选 Checkbox

代替原生checkbox，从选中选择多个值

## API

### Checkbox

<!--Checkbox-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|类名|string|-|
|colors|one of: `primary` `success` `info` `danger`  `warning` `dark`|string|''|
|disabled|是否可用|bool|false|
|readOnly|是否只读|bool|false|v4.3.1
|onChange|监听改变|function|-|
|defaultChecked|默认是否选中|bool|false|
|checked|是否选中|bool|-|
|antd|是否兼容antd的API参数|bool|-|
|indeterminate|部分选中|bool|-|
|onDoubleClick|双击事件|function|function(checked, event){}|
|onClick|单击事件|function|function(event){}|
|value|选中的值，需配合Checkbox.Group使用|string|-|
|style|组件外层容器行内样式|object|{}|
|inverse|设置选中为红色填充|bool|false|
|fieldid|自动化测试专用属性|string||v4.3.0

### Checkbox.Group

<!--Checkbox.Group-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|类名|string|-| |
|onChange|监听改变|function|-| |
|value|受控的value|array|[]| |
|disabled|所有子复选框是否可用|bool|false| |
|readOnly|所有子复选框是否只读|bool|false|v4.3.1
|options|指定可选项|string[] | []||
|defaultValue|默认选中的选项|string[] | []||
|name|Checkbox.Group下所有input[type="checkbox"]的name属性|string|-| |
|maxCount|是否超出父级剩余显示下拉|boolean | false||

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|space |选中/反选Checkbox|

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieldid                    | 4.3.0 |
| 内部input元素   | fieldid + "\_checkbox" | 4.3.0 |

