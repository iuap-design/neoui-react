# 标签 Tag

标签组件是一种进行标记和分类的小标签。

## API

<!--Tag-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|color|包含语意色(dark/light/success/warning/info/danger/invalid/start) 预设色(half-blue/half-green/half-dark/half-yellow/half-red) 也支持自定义颜色值|string|light|4.0
|disabled|是否禁用|boolean|false|
|bordered|是否为边框类型|boolean|false|
|closable|是否可以删除|boolean|false|4.0
|visible|标签是否显示(`visible` 或 `true` `false`)|boolean|true|
|onClose|标签删除时的回调|(e) => void|-|
|select|是否可以选择|boolean|false|
|selected|标签选中状态，select为true时生效|boolean|false|
|className|增加额外的class|string|''|
|size|组件大小(lg,md,sm)|string|md|
|style|style 属性|object|''|
|onClick|标签被点击回调函数|(e) => void|''|4.0
|closeIcon|自定义关闭按钮(注意：closable为true的情况下起作用)|ReactNode|-|4.0
|icon|设置图标|ReactNode|-|4.0
|activeColor|设置选中态颜色包含(success/warning/info/danger) 预设色(half-blue/half-green/half-dark/half-yellow/half-red) 也支持自定义颜色值|string|''|4.4.4
|type|语意色图标的填充类型(default/filled/bordered)|string|default|4.6.6

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|colors|颜色(dark/light/success/warning/message/danger), 建议使用color属性|string|''|
|tagClick|标签被点击回调函数， 建议使用onClick属性|(e) => void|''|
|deleted|是否可以删除，建议使用closable属性|boolean|false|

## 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - 
| 关闭按钮 | fieldid_close  | - 