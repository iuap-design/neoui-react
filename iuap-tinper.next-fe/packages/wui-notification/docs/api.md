# 通知 Notification

Notification通知不同于操作类型的信息反馈，是一种主动推送的信息，悬浮面上的提醒，一般用于多个消息同时呈现。

## API

### Notice

<!--Notice-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|duration|显示时间|number|4.5|
|onClose|关闭时触发的钩子函数|function|-|
|closable|是否可手动关闭|boolean|true|
|color|显示颜色|success/info/danger/warning/dark|-|
|className|类名|string|-|
|style|样式|object|-|
|key|当前通知唯一标志|string/number|-|-|
|icon|自定义图标|ReactNode|-|4.4.5|
|closeIcon|自定义关闭图标|ReactNode|-|4.4.5|
|btn|自定义关闭按钮|ReactNode|-|4.4.5|
|onClick|点击通知时触发的回调函数|function|-|4.4.5|

### Notification

<!--Notification-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|description|通知提醒内容，必选|reactNode|-|
|message|通知提醒标题，必选|reactNode|-|
|show|是否显示|boolean|true|
|transition|动画|element|Fade|
|placement|显示位置|topRight/BottomRight|topRight|
|timeout|延迟时间|number|-|
|className|类名|string|-|
|style|样式|object|-|
|keyboard|esc触发关闭|boolean|true|
|onEscapeKeyUp|响应ESC键时的钩子函数|function|-|
|getPopupContainer|设置容器，需要在`newInstance`设置，参考第四个示例|function/node| document.body |

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|esc |关闭Notification|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|container|设置容器，需要在`newInstance`设置|function/node| document.body |
|position|显示位置|topRight/BottomRight|topRight|
|content|通知提醒内容|reactNode|-|
|title|通知提醒标题，必选|reactNode|-|
