# 折叠 Collapse

带有折叠效果的展示板。

## API

### Collapse

<!--Collapse-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|accordion|是否是手风琴效果|boolean|false|
|activeKey|当前展开的项|string[] &#124; string、number[] &#124; number|-|
|defaultActiveKey|默认展开的项|string[] &#124; string、number[] &#124; number|-|
|className|传入的class|any|-|
|style|传入的style|object|-|
|expandIconPosition|设置图标位置,可选值left、right|string|left|
|ghost|使折叠面板透明且无边框|boolean|false|
|onChange|切换面板的回调|function|-|
|collapsible|所有子面板是否可折叠或指定可折叠触发区域,值为header、icon 或 disabled|string|-| 4.4.4 |
|destroyInactivePanel|销毁折叠隐藏的面板|boolean|false|
|expandIcon|自定义切换图标|(panelProps) => ReactNode|-|
|bodyClassName|wui-collapse-body层增加自定义类名属性|string|-|
|type    |折叠面板类型，值为（list\card\default）| string |    default|
|fieldid    |自动化测试专用属性| string |    -|

### Panel

<!--Collapse.Panel-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|copyable|是否可复制内容|boolean|false|
|onSelect|有折叠效果时选中的效果|function|-|
|defaultExpanded|默认是否打开|boolean|false|
|expanded|折叠是否展开|boolean|false|
|header|头部|node|-|
|headerStyle|传递给头部的style|object|-|
|footer|尾部|node|-|
|footerStyle|传递给尾部的style|object|-|
|key|当多个panel存在时,每个panel的标记|any|-|
|showArrow|是否展示当前面板上的箭头|boolean|true|
|extra|自定义渲染每个面板右上角的内容|ReactNode|-|
|forceRender|被隐藏时是否渲染 DOM 结构|boolean|true|
|collapsible|是否可折叠或指定可折叠触发区域,值为header 或 disabled|string|-|
|fieldid    |自动化测试专用属性| string |    -|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|eventKey|当多个panel存在时,每个panel的标记,建议使用key属性|any|-|
|onSelect|PanelGroup组件选中的钩子函数,建议使用onChange|function|-|

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieldid                      | 4.3.0 |
| Panel头部 | fieldid + "\-panel\_${eventKey}"    | 4.3.0 |