# 按钮 Button

按钮组件通过点击执行一个具体的行为或动作。

## API

<!--Button-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|block|将按钮宽度调整为其父宽度的选项|boolean|false|v4.0.0
|danger|设置危险按钮|boolean|false|v4.0.0
|ghost|幽灵属性，使按钮背景透明|boolean|false|v4.0.0
|href|点击跳转的地址，指定此属性 button 的行为和 a 链接一致(type=link生效)|string|-|v4.0.0
|target|相当于 a 链接的 target 属性，href 存在时生效|string|-|v4.0.0
|type|设置按钮类型(primary/ghost/dashed/link/text/default)|string|-|v4.0.0
|icon|设置按钮的图标组件    |ReactNode|-|v4.0.0
|loading|设置按钮载入状态    |boolean|false|v4.0.0
|size|按钮大小(`lg`  `md` `sm` ~~xg~~)(也支持antd`large`  `middle` `small`属性)|string|lg|v4.0.0
|htmlType|html dom 的 type 属性(`submit` `button` `reset`)|string|button|
|disabled|是否禁用(`disabled` 或 `true` `false`)|boolean|false|
|shape|形状(block/round/squared/floating/pillRight/pillLeft/circle ~~icon~~)|string|''|
|colors|颜色(secondary/success/info/warning/danger/dark/light/~~primary/default~~)|string|''|
|bordered|是否是边框型(`bordered` 或 `true` `false`)|boolean|false|
|className|增加额外的class|string|''|
|style|style 属性|object|''|
|fieldid|自动化测试专用属性|string|-|4.3.0

### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 图标 | fieldid + "\_icon"                 | 4.3.0 |
| 加载中图标 | fieldid + "\_loading_icon"    | 4.3.0 |

### test
