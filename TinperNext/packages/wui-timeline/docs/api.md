# 时间轴 Timeline

常用于当一系列的信息按时间排序的时候或者做个可视化的连接

## API

### Timeline

<!--Timeline-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|pending|设置最后一个虚线节点|(boolean,ReactNode)|-|
|fieldid|自动化测试专用属性|string|-|4.3.0
|mode|通过设置 mode 可以改变时间轴和内容的相对位置|`left` `right` `alternate`|-|4.4.3
|reverse|节点排序|boolean|false|4.4.3
|pendingDot|当最后一个幽灵节点存在時，指定其时间图点|ReactNode|-|4.4.4
|labelWidth|设置label标签的宽度(mode=left或者right时生效)值为数组时设置label最小宽度和最大宽度|`number`/[`minWidth`,`maxWidth`]|-|4.4.5

### Timeline.Item

<!--Timeline.item-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|color|设置圆环的颜色|(blue,blue,green)或者其他自定义颜色|-|
|dot|自定义的时间节点|string,ReactNode |-|
|label|设置标签	|ReactNode |-|v4.4.3

### Timeline.Group

<!--Timeline.Group-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|size|设置group间距大小|small、middle、large 或 number像素值 |small|v4.4.3


### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 子元素 | fieldid + "\_timeline_index" (index为当前元素索引),如果子元素自己有定义fieldid那么以自身的为准 | 4.3.0 |