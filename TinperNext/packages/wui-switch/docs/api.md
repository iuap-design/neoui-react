# 开关 Switch

切换开关交互来源于表示用户用于打开或关闭选项的物理开关。

## API

<!--Switch-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|checked    |指定当前是否选中|    Boolean    |false|
|~~defaultValue~~ defaultChecked    |初始是否选中    |Boolean|    false |
|disabled|设置是否禁用|Boolean|false|
|checkedChildren    |选中时的内容    |React| Node |
|unCheckedChildren    |非选中时的内容    |React| Node|
|size|    大小设置，oneOf：`sm`, `lg`(也支持antd`default`, `small`属性)|string|''|
|colors| 颜色设置，oneOf：`primary`,`success`,`info`,`dark`,`warning`''|    string    |-|
|className| Switch 器类名|    string    |-|
|onKeyDown| 键盘回调 |    Function    | - |
|enterKeyDown| 是否启用 enter 和 space 键 | Boolean | true |
|onChange    |变化时回调函数,自定义参照demo    |Function(checked:Boolean) | - |
|onClick    |点击时回调函数    |Function(checked:Boolean) | - |
|loading    |加载中的开关|    Boolean    |false|4.0.0
|autoFocus    |组件自动获取焦点|    Boolean    |false|4.0.0
|fieldid|自动化测试专用属性|String|-|4.3.0

### 已支持的键盘操作

|按键|功能|
| --- | --- |
|←(左箭)    |关闭开关|
|→(右箭)    |打开开关|
|enter        |选中|
|space    |选中|


### fieldid 场景说明

| 场景     | 生成规则说明                   | 版本  |
| -------- | ----------------------------- | ----- |
| 根元素   | fieildid                      | 4.3.0 |
| 加载中图标 | fieldid + "\_loading_switch" | 4.3.0 |