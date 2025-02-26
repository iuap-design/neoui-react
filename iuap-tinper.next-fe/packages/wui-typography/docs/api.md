# 排版 Typography
用于展示标题、段落、文本内容

## API

### Typography

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|


### Typography.Paragraph

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|禁用状态|boolean |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|boolean \| [EllipsisConfig](typography#ellipsisconfig) |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|fieldid|fieldid 前缀|string |`-`|-|

### EllipsisConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|cssEllipsis|自动溢出省略（只支持字符串），在大量使用情况下建议开启提高性能。|boolean |false|-|
|defaultExpanded|默认展开|boolean |`-`|-|
|expandable|显示展开/折叠按钮|boolean |`-`|-|
|expanded|是否展开|boolean |`-`|-|
|rows|显示省略的行数|number |`3`|-|
|ellipsisStr|省略号|string |`...`|-|
|direction|省略位置|string |`end`|-|
|suffix|后缀|string |`-`|-|
|showPopover|配置省略时的弹出框|boolean \| tooltipsConfig |false|-|
|expandNodes|配置 折叠 / 展开 的元素|ReactNode[] |`-`|-|
|onEllipsis|在省略发生改变的时候触发，通常是窗口resize情况会触发。|(isEllipsis: boolean) => void |`-`|-|
|onExpand|在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。|(isExpand: boolean, e) => void |`-`|-|

## 关于超出省略

超出省略目前通过两种方式实现分别是 **js二分法计算截断值** 和 **CSS超出省略** 两种优缺点如下：

|指标|js二分法|CSS省略|
|---|---|---|
|性能|差(二分法多次操作dom计算)|好|
|功能|好|差（只支持字符串)|

- 默认使用 **js二分法** 不断进行截断计算从而得到省略临界值，同时 `resize` 时还会多次触发重新计算。所以在大量使用对性能影响较大，但此方法不会在排版组件下插入额外样式dom。

- 开启 `ellipsis.cssEllipsis` 将通过 **CSS样式** 进行省略展示，对于大量使用场景下会有显著性能提高。但因为需要添加 `text-overflow` 样式，`.arco-typography` 节点下将会新增两个 `<span/>` dom.
