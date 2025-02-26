# 菜单 Menu

菜单对于网站来说很重要，它帮助用户快速地从一个站点跳转到另一个站点。侧导航提供网站的多层次结构

## API

### Menu

<!--Menu-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|theme|主题颜色|String: light dark|light|
|className|自定义类名|string|-|
|style|根节点样式|Object|-|
|mode|菜单类型，现在支持垂直、水平、内嵌模式和下拉模式四种    |String: vertical horizontal inline dropdown|vertical|dropdown(4.4.5)
|items|支持使用数组对象渲染菜单内容，详情见示例    |ItemType[]|-|4.4.5
|position|子菜单呼出位置，在vertical模式下使用|String: leftTop rightTop|rightTop|
|multiple|是否允许多选|boolean|false
|selectedKeys|当前选中的菜单项 key 数组|Array|-|
|defaultSelectedKeys|初始选中的菜单项 key 数组|Array|-|
|openKeys|当前展开的 SubMenu 菜单项 key 数组|Array|-|
|defaultOpenKeys|初始展开的 SubMenu 菜单项 key 数组|Array|
|expandIcon|自定义展开图标|-|
|forceSubMenuRender|在子菜单展示之前就渲染进 DOM|boolean|false
|inlineCollapsed|inline 时菜单是否收起状态|boolean|
|subMenuCloseDelay|用户鼠标离开子菜单后关闭延时，mode="inline" 时无效，单位：秒|number|0.1
|subMenuOpenDelay|用户鼠标进入子菜单后开启延时，mode="inline" 时无效，单位：秒|number|0
|triggerSubMenuAction|SubMenu 展开/关闭的触发行为, mode="inline" 时无效|String: hover&#124;click|hover|
|overflowedIndicator|自定义 Menu 折叠时的图标(horizontal 条件下menu发生折叠时使用)|ReactNode|
|onOpenChange|SubMenu 展开/关闭的回调 Function(openKeys: string[])|noop|
|onSelect|被选中时调用|    Function({ item, key, selectedKeys })|-|
|onDeselect|取消选中时调用，仅在 multiple 生效|    Function({ item, key, selectedKeys })|-|
|onClick|点击 menuitem 调用此函数，参数为 {item, key, keyPath}|    function|-|
|keyboard|是否使用键盘操作|bool|false|
|onKeyDown|键盘操作回调函数|function|-|4
|tabIndex|设置tabIndex|string|'0'|
|arrowdown|是否显示下拉按钮，仅在mode=horizontal时有效|bool|-|4.4.5
|children|MenuItem组件/SubMenu组件/MenuItemGroup组件|node|-|4
|onSubMenuClick|开启分割选项，点击 SubMenu左边部分调用此函数|Function({ key, title, children})|-|4.5.5

### Menu.Item

<!--Menu.Item-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|disabled|是否禁用|Boolean|false|
|icon|菜单图标|ReactNode|4|
|key|item 的唯一标志|String|-|
|title|设置收缩时展示的悬浮标题|ReactNode|-|4
|attribute|添加到dom上的属性|Object|-|

### Menu.SubMenu

<!--Menu.SubMenu-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|children|MenuItem组件/SubMenu组件/MenuItemGroup组件|node|-|4
|disabled|是否禁用|Boolean|false|
|icon|菜单图标|ReactNode|-|4
|key|唯一标志|String|
|popupClassName|子菜单样式，mode="inline" 时无效|String|
|popupOffset|子菜单偏移量，mode="inline" 时无效|[-1, 5]|
|title|子菜单项标题    |ReactNode|
|onTitleClick|点击子菜单标题|Function({ eventKey, domEvent })|

### Menu.ItemGroup

<!--Menu.ItemGroup-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|children|分组的菜单项|MenuItem[]|node|4|
|title|分组标题|ReactNode|-|
|key|item 的唯一标志|String|-|

### Menu.Divider

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| menu父子组件根元素 | fieldid  | - 

&nbsp;

### 已支持的键盘操作

注意：目前支持两种写法，参考示例7和示例8

|按键|功能|
| --- | --- |
|Tab+↓(下箭)|切换焦点|
|↑(上箭)|切换选项|
|↓(下箭) |切换选项|
|←(左箭) |关闭下级菜单|
|→(右箭) |打开下级菜单|
|enter | 选中|

## 注意事项

使用全键盘操作切换焦点的时候，同时按Tab+↓(下箭)即可切换。
