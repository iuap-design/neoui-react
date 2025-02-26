# 取色器 ColorPicker

提供预制色块的取色板

## API

<!--ColorPicker-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|类名|string|-|
|value|input当前值|string|-|
|required|是否是必输项|bool|false|
|disabled|是否禁用|bool|false|
|bordered|设置边框，支持无边框、下划线模式|`boolean`\|`bottom`| -|4.5.2|
|align|设置文本对齐方式|`left`\|`center`\|`right`|  -|4.5.2|
|disabledAlpha|是否禁用透明度|bool|false|
|disabledModal|是否禁用弹框|bool|false|
|isParameterArea|是否显示参数区域|bool|true|
|placeholder|input中的提示信息|string|-|
|onChange|input值发生改变触发的回调|func|-|
|autoCalculate|根据选中的颜色自动计算比其 浅一色度/深一色度 的色值|({color,darker,lighter})=> {}|-|
|title|自定义标题|string|-|
|cacelBtn|自定义取消按钮文字|string|-|
|confirmBtn|自定义确认按钮提示|string|-|
|modalProps|传给内部modal子组件的属性|object|-|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
