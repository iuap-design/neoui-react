# 头像 Avatar

用来代表用户或事物，支持图片、图标或字符展示

## API

<!--Avatar-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|alt|图像无法显示时的替代文本|string|-|
|className|容器类名|string|-|
|gap|字符类型距离左右两侧边界单位像素|number|4|
|icon|设置头像的自定义图标|ReactNode|-|
|shape|指定头像的形状|circle &#124; square|circle|
|size|设置头像的大小|number &#124; (large &#124; small &#124; default) &#124; { xs: number, sm: number, ...}|default|
|src|图片类头像的资源地址或者图片元素|string &#124; ReactNode|-|
|srcSet|设置图片类头像响应式资源地址|string|-|
|draggable|图片是否允许拖动|bool|false|
|style|定义容器的样式|CSSProperties|-|
|onError|图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为|() => boolean|

- Tip: 你可以设置 icon 或 children 作为图片加载失败的默认 fallback 行为，优先级为 icon > children)

### Avatar.Group

<!--Avatar.Group-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|maxCount|显示的最大头像个数|number|-|
|maxPopoverPlacement|多余头像气泡弹出位置|top &#124; bottom|top|
|maxStyle|多余头像样式|CSSProperties|-|
|size|设置头像的大小|number &#124; (large &#124; small &#124; default) &#124; { xs: number, sm: number, ...}|default|
|maxPopoverTrigger|设置多余头像Popover的触发方式|hover/focus/click|hover|4.4.5|
|reverse|反向叠加头像，具体参考示例|boolean|false| 4.5.2|

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| 根元素 | fieldid  | - |
