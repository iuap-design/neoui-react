# 栅格布局 Layout
<!--Layout-->
协助进行页面级整体布局。

## API

### Row组件

<!--Row-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|align|垂直对齐方式|top &#124; middle &#124; bottom|top|
|componentClass|组件根元素|element/ReactElement|div|
|grid|栅格等分切换(12 或 24),可查看栅格等分切换示例|number|24|
|gutter|栅格间隔|number &#124; object({ xs: 8, sm: 16, md: 24}) &#124; array |0|
|justify|水平排列方式|start &#124; end &#124; center &#124; space-around &#124; space-between|start|
|wrap|是否自动换行|boolean|true|
|size|自定义响应式范围|object({xs: '(max-width: 600px)', sm: '(min-width: 600px)', md: '(min-width: 1000px)'...})|col组件默认响应式范围|

### Col组件

<!--Col-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|xs|响应式栅格，可为栅格数或一个包含其他属性的对象(<600px)|number&#124;object({ span: 8, offset: 2, order: 1,  pull: 2})|-|
|sm|响应式栅格，可为栅格数或一个包含其他属性的对象(≥600px)|number&#124;object(同上)|-|
|md|响应式栅格，可为栅格数或一个包含其他属性的对象(≥1000px)|number&#124;object(同上)|-|
|lg|响应式栅格，可为栅格数或一个包含其他属性的对象(≥1340px)|number&#124;object(同上)|-|
|xl|响应式栅格，可为栅格数或一个包含其他属性的对象(≥1900px)|number&#124;object(同上)|-|
|xxl|响应式栅格，可为栅格数或一个包含其他属性的对象(≥2500px)|number&#124;object(同上)|-|
|span|设备显示列数|number|-|
|flex|flex 布局属性|string &#124; number|-|
|offset|设备偏移列数|number|0|
|order|栅格顺序|number|0|
|pull|设备到右边距列数|number|-|
|push|设备到左边距列数|number|-|
|componentClass|组件根元素|element/ReactElement|div|

以上列数设置，只能设置1-24的数字。


### Layout

<!--Layout-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|容器 className|string|-|
|hasSider|表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动|boolean|-|
|style|指定样式|CSSProperties|-|
|fillSpace| 是否自填充父容器|boolean|false|4.5.2|

### Layout.Sider

<!--Layout.Sider-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|breakpoint|触发响应式布局的断点|string, 值为xs &#124; sm &#124; md &#124; lg &#124; xl &#124; xxl|-|
|className|容器 className|string|-|
|collapsedWidth|收缩宽度|number|80|
|collapsible|是否可收起|boolean|false|
|collapsed|是否收起|boolean|false|
|defaultCollapsed|是否默认收起|boolean|false|
|reverseArrow|翻转折叠提示箭头的方向，当 Sider 在右边时可以使用|boolean|false|
|style|指定样式|CSSProperties|-|
|theme|主题颜色|light &#124; dark|light|
|trigger|自定义 trigger，设置为 null 时隐藏 trigger|ReactNode|-|
|width|宽度|number &#124; string|200|
|zeroWidthTriggerStyle|指定当 collapsedWidth 为 0 时出现的特殊 trigger 的样式|object|-|
|onBreakpoint|触发响应式布局断点时的回调|(broken) => {}|-|
|onCollapse|展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发|(collapsed, type) => {}|-|

### Layout.Spliter
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|minSize|限制拖拽最小尺寸|number &#124; string|50|
|maxSize|限制拖拽最大尺寸|number &#124; string|-|
|defaultSize|默认尺寸（水平方向则为上面高度、垂直分割则为左侧宽度）|number &#124; string|-|
|size|拖拽尺寸(水平方向则为上面高度、垂直分割则为左侧宽度）|number &#124; string|-|
|direction|分割线方向：水平(上下)分割线、垂直(左右)分割线|vertical &#124; horizontal|vertical|
|primary|收起方向：上方左侧、下方右侧|first &#124; second|first|4.5.0
|onDragStarted|开始拖拽回调函数|() => void|-|
|onDragMove|拖拽进行中回调函数|(size) => void|-|
|onDragFinished|拖拽结束回调函数|(size) => void|-|
|onResizerClick|分割线点击事件|(e) => void|-|
|onResizerDoubleClick|分割线双击事件|(e) => void|-|
|resizerStyle|分割线 style|CSSProperties|-|
|resizerClassName|分割线 className|string|-|
|collapsible|是否可收起|boolean|false|
|collapsed|是否收起|boolean|false|
|defaultCollapsed|是否默认收起|boolean|false|
|trigger|自定义 trigger，设置为 null 时隐藏 trigger|ReactNode ｜ string|-|
|triggerStyle|自定义trigger的样式|CSSProperties|-|4.5.4
|onCollapse|展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发|(collapsed, type) => {}|-|
|mode|挤占悬浮模式；default：挤占模式；on：悬浮模式；mixed：混合模式|default&#124;on&#124;mixed|-|
|defaultMode|初始默认模式；当mode=mixed时，可以指定初试模式|default&#124;on|default|4.5.2
|resizerable|是否可以拖拽|boolean|true|

### Layout.Header Layout.Footer Layout.Content

相当于容器盒子，支持html标签属性事件

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| Layout, Header, Content, Footer, Sider| 各组件根元素可添加fieldid  | - 