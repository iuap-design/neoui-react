# 卡片 Card

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面

## API

<!--Card-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|actions|卡片操作组，位置在卡片底部|Array[ReactNode]|-|
|bodyStyle|内容区域自定义样式|CSSProperties|-|
|bordered|是否有边框|boolean|true|
|className|容器类名|string|-|
|extra|卡片右上角的操作区域|ReactNode|-|
|headStyle|自定义标题区域样式|CSSProperties|-|
|hoverable|鼠标移过时可浮起|boolean|false|
|loading|当卡片内容还在加载中时，可以用 loading 展示一个占位|boolean|false|
|size|card 的尺寸|default &#124; small|default|
|style|定义容器的样式|CSSProperties|-|
|title|卡片标题|ReactNode|-|
|type|卡片类型，可设置为 inner 或 不设置|string|-|

### Card.Grid

<!--Card.Grid-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|网格容器类名|string|-|
|hoverable|鼠标移过时可浮起|boolean|false|
|style|定义网格容器的样式|CSSProperties|-|


### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - |