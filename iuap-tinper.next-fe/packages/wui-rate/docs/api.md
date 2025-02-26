# 评分 Rate

评分组件，对产品的评价评分

## API

<!--Rate-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|allowClear|是否允许再次点击后清除    |`boolean`|true|
|allowHalf|是否允许半选|`boolean`|false|
|autoFocus|自动获取焦点|`boolean`|false|
|character|自定义字符|`ReactNode`/`string`|<Icon type="uf-star" />|
|className|自定义样式类名|`string`|-|
|count|star总数|`number`|5|
|defaultValue|默认值|`number`|0|
|disabled|禁用，无法进行交互|`boolean`|false|
|style|    自定义样式对象|`CSSProperties`|-|
|value|当前数，受控值|`number`|-|
|onBlur|失去焦点时的回调|`function`|-|
|onFocus|获取焦点时的回调|`function`|-|
|onChange|选择时的回调|`function`|-|
|onHoverChange|鼠标经过时数值变化的回调|`function`|-|
|onKeyDown|按键回调|`function`|-|
|tooltips|提示文案|`Array<string>`|-|4.4.4
|fieldid|自动化测试专用属性|`string`|-|4.3.0


### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 子元素 | fieldid + "\_rate_index" (index为当前元素索引) | 4.3.0 |
