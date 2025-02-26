# 标记 Badge

用来醒目的展示新的或未读的信息条目

## API

<!--Badge-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|colors|one of: `primary` `success` `info` `error`  `warning` `dark`|string|''|
|dot|不展示数字，只有一个小红点|boolean|false|v4.0.0
|color|自定义小圆点的颜色|string|-|v4.0.0
|offset|设置状态点的位置偏移|[number, number]|-|v4.0.0
|overflowCount|展示封顶的数字值    |number|99|v4.0.0
|showZero|当数值为 0 时，是否展示 Badge|boolean|false|v4.0.0
|size|在设置了 count 的前提下有效，设置小圆点的大小|string|default/sm|v4.0.0
|status|设置 Badge 为状态点|success/processing/default/error/warning/dark|-|v4.0.0
|text|在设置了 status 的前提下有效，设置状态点的文本|ReactNode|-|v4.0.0
|title|设置鼠标放在状态点上时显示的文字|string|-|v4.0.0
|count|展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏|ReactNode|-|v4.0.0
|dataBadgePlacement|数字显示位置 oneOf:top,bottom|string|top|
|className|增加额外的class|string|''|
|fieldid|自动化测试专用属性|string|-|4.3.0

### Badge.Ribbon(4.4.4+)

<!--Badge.Ribbon-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|color|自定义缎带的颜色|string|-|
|placement|缎带的位置，`start` 和 `end`|`start`、`end`|`end`|
|text|缎带中填入的内容|`ReactNode`|-|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|dataBadge|图标右上角的数字, 建议使用count|obj/string/node|-|


### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 角标 | fieldid + "\_data_icon" | 4.3.0 |

