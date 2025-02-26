# 锚点 Anchor

网站导航可以使用

## API

<!--Anchor-->
|参数|说明|类型|默认值|版本|
|:---|:---:|:---:|----:|----:|
|selector|目标元素选择器|string|-|
|offset|向上偏移量,例如有固定header，则 offset=()=>return header.getBoundingClientRect().height|()=>{}|0|
|navClass|当前被激活锚点新增的类名|string|'active'|
|contentClass|当前被激活区域新增的类名|string|'active'|
|nested|是否有嵌套导航|bool|false|
|nestedClass|嵌套导航激活时父节点的类名|string|'active'|
|event|是否添加监听事件|bool|true|
|activeHandle|被激活的回调，三个参数,以基本示例为例，列表li、锚点a、激活区域p|func|()=>{})|
|deactiveHandle|激活后的回调|func|()=>{})|

## antd兼容API

在组件加上antd属性可兼容antd相应属性。

<!--AnchorAntd-->
|参数|说明|类型|默认值|版本|
|:---|:----:|:---:|------:|----:|
|affix|固定模式|bool|true|
|getContainer|指定滚动的容器|() => HTMLElement|() => window|
|offsetTop|距离窗口顶部达到指定偏移量后触发|number|-|
|showInkInFixed|affix={false} 时是否显示小圆点|bool|false|
|onChange|监听锚点链接改变|(currentActiveLink: string) => void|-|
|onClick|click 事件的 handler|function(e: Event, link: Object)|-|
|direction|指定锚点方向，当值为horizontal为横向锚点|string|-|
|activeIcon|active锚点项前面的图标（默认值为圆点）|ReactElement|-| 4.4.4 |
|items|数据化配置选项内容(接收一个数组形式为[{key: string, href: string, title: string}])|Array|-| 4.4.4 |
|collapsable|是否为可折叠类型锚点|Boolean|false| 4.5.0 |
|onDropDownChange|横向多锚点，点击拉下项回调函数|（href: string）=> void |-| 4.5.0 |
|onCollapsable|纵向折叠类型锚点，点击折叠固定按钮回调函数|（v: boolean）=> void |-| 4.5.2 |

## Link API

在组件加上antd属性可兼容antd相应属性。

<!--Anchor.Link-->
|参数|说明|类型|默认值|版本|
|:---|:----:|:---:|------:|---:|
|href|锚点链接|string|-|
|target|该属性指定在何处显示链接的资源|string|-|
|title|文字内容|ReactNode|-|

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieldid                      | 4.3.0 |
| 点击去a标签 | fieldid + "\-anchorLink\-${href}"    | 4.3.0 |