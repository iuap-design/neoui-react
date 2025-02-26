# 剪贴板 Clipboard

剪贴页面内容

## API

<!--Clipboard-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|action|方法，可以传`copy`或者`cut`,`cut`只支持`textarea`|`string`|`copy`|
|text|要复制的文本内容|`string`|-|
|target|要复制内容的目标元素，可传选择器，如果选择器得出多个，会取第一个|`string`/dom选择器|-|
|success|复制成功之后的回调函数|`function`|-|
|error|复制失败之后的回调函数|`function`|-|
|locale|设置默认文字语言|object|中文|
|fieldid    |自动化测试专用属性| string |-|
|className  |自定义添加类名| string |-|4.5.0|
|asyncCopy  |异步复制，点击事件的回调，返回callback实现复制功能| `function` |-|

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieldid                      | 4.3.0 |
