# 抽屉 Drawer

抽屉组件，可以从上下左右这些侧面弹出一个层，显示特定的内容

## API

<!--Drawer-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placement| 抽屉的位置。有四个预置的选项: `left`,`right`,`top`,`bottom` | `string` | `right` |
| hasHeader| 是否显示抽屉的头部 | `boolean` | `true` |
| title|  抽屉的头部的标题 | `string` `ReactNode` | - |
| className| 抽屉容器的class, 用来自定义组件样式 | `string` |
| maskClosable|  点击遮罩是否可以关闭抽屉 | `boolean` | `true` |
| zIndex| 抽屉容器的层级，可以修改层级 | `number` | `100` |
| closeIcon| 自定义关闭图标 | `ReactNode` | `<Icon type="uf-close"/>` |
| width | 抽屉的宽度| `number` `string` | - |
| height| 抽屉的高度 | `number` `string` | - |
| destroyOnClose| 关闭时候是否销毁抽屉的内容 | `boolean` |
| visible| Drawer 是否可见 | `boolean` |  `false` |
| closable| 是否显示右上角的关闭按钮 | `boolean` |  `false` |
| onClose| 关闭抽屉的回调 | function |  - |
| mask| 是否展示遮罩 | `boolean` |  `true` |
| getPopupContainer| 指定 Drawer 挂载的 HTML 节点 | `HTMLElement` `() => HTMLElement`  `Selectors` | `body` |v4.0.0
| style| 可用于设置 Drawer 最外层容器的样式，和 drawerStyle 的区别是作用节点包括 mask | Object | - |
| drawerStyle| 用于设置 Drawer 弹出层的样式 | Object | - |
| maskStyle| 遮罩样式 | Object | - |
| headerStyle| 用于设置 Drawer 头部的样式 | Object | - |
| bodyStyle| 可用于设置 Drawer 内容部分的样式 | Object | - |
| footer| 抽屉的页脚 | ReactNode | - |
| footerStyle| 抽屉页脚部件的样式 | Object | - |
| forceRender| 预渲染 Drawer 内元素 | boolean | false |
| keyboard| 是否支持键盘 esc 关闭 | boolean | false |
| push| 用于设置多层 Drawer 的推动行为 | boolean { distance: string或number } | { distance: 50 } |
|fieldid    |自动化测试专用属性| string |    -|
|extra|	抽屉右上角的操作区域 | ReactNode | - | 4.4.5 |
## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|show|是否显示抽屉组件，建议使用visible属性|string|-|
|showMask| 是否显示遮罩，建议使用mask属性 | `boolean` | `true` |
|showClose| 是否显示关闭按钮，建议使用closable属性 | `boolean`  | `false` |
|container| 指定 Drawer 挂载的 HTML 节点, 建议使用getContainer属性 | `HTMLElement` `() => HTMLElement`  `Selectors` | `body` |
|getContainer| 指定 Drawer 挂载的 HTML 节点, 建议使用getPopupContainer属性 | `HTMLElement` `() => HTMLElement`  `Selectors` | `body` |

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieldid                      | 4.3.0 |
| 关闭图标 | fieldid + "\-close"    | 4.3.0 |
