# 面包屑 Breadcrumb

`Breadcrumb` 常用来指定当前页面位置，添加类`active`类激活Breadcrumb.Item.

## API

### Breadcrumb

<!--Breadcrumb-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|className|自定义类名|string|-|
|onClick|点击回调函数|(e，key) => {}|-|
|separator|自定义分隔符，作用于所有Breadcrumb.Item|ReactNode|'/'|v4.0.0
|fillSpace|是否自适应区域空间，超出则隐藏下拉展示|bool &#124; number |false|
|activeKey|设置当前激活的Breadcrumb.Item项|string|-|v4.5.3|

### Breadcrumb.Item

<!--Breadcrumb.Item-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|active|设为true,会高亮当前的item,一般会设置在最后一个元素|bool|false|
|className|自定义类名|string|-|
|dropdownProps|弹出下拉菜单的自定义配置|同[Dropdown](#/detail/component/wui-dropdown/bip)|-|v4.0.0|
|href|跳转地址|string|''|
|title|给内部设置的title属性|string|''|
|separator|自定义分隔符|ReactNode|'/'|v4.0.0
|onClick|点击回调函数|(e) => {}|-|
|menu|下拉菜单的内容|Menu &#124; () => Menu|-|v4.4.6|
|key|item的唯一标识|string|-|v4.5.3|
|~~overlay~~|下拉菜单的内容，建议使用`menu`|Menu &#124; () => Menu|-|v4.0.0|

### 自动化测试fieldid
| 场景 | 生成规则说明 | 版本 |
| --- | --- | --- |
| Breadcrumb 根元素 | fieldid  | - |
| Breadcrumb.Item 文本元素 | fieldid  | - |



