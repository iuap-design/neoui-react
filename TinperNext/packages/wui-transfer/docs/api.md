# 穿梭框 Transfer

两框之间的元素迁移，非常直观且有效，一个或多个元素选择后点击方向按钮转到另一列框中。左栏是“源”，右边是“目标”

## API

<!--Transfer-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|dataSource|设置数据源。当有targetKey props存在时，dataSource的数据刨去targetKey数据,剩下的都放在左边列表|[]|[]|
|render|每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title|(record) => record.title |-|
|targetKeys|展示在右边列表的数据集|[]|[]|
|selectedKeys|所有选中的item的keys|[]|[]|
|onChange|当item在穿梭成功后的回调 参数(targetKeys, direction, moveKeys)|func|-|
|onSelectChange| 当选中的item发生改变时的回调 参数(sourceSelectedKeys, targetSelectedKeys)|fun|-|
|onScroll| 当滑动可选的item列表的回调 参数(direction, event)|func|-|
|listStyle|自定义的columns的样式表|object    |-|
|className|class|string|''|''|
|titles|两columns的title|[]|-|
|selectAllLabels|自定义顶部数据展示合集|(info: { checkedCount: number, totalCount: number }) => ReactNode)[]|-|4.4.4
|operations|自定义按钮操作, 内置选项包含rightAll, rightOne, leftAll, leftOne，可以设置为object{rightOne: {text: '向右', index: 1}, leftOne: {text: '向左', index: 2}}|[] ｜ {}|['rightAll', 'rightOne', 'leftAll', 'leftOne']|
|showSearch|是否显示搜索框|boolean    |false|
|filterOption|搜索过滤方法 参数(inputValue, option)|func或者boolean    |-|
|searchPlaceholder|搜索框的默认显示文字|string|'Search'|
|notFoundContent|当没有相关内容的显示内容|string或ReactNode|    'Not Found'|
|footer|渲染底部的dom|ReactNode|-|
|lazy|懒加载dom|object|当tranfer放在bee-modal里 添加参数 lazy={container:"modal"}|
|onSearchChange|当搜索域变化的回调函数 参数(direction: 'left'&#124;'right', value)|func|-|
|showCheckbox|是否显示Checkbox复选框|bool|true|
|draggable|是否可以通过拖拽进行穿梭和排序|bool|false|
|appendToBottom|是否将已选项追加到右侧列表末尾|bool|false|
|renderOperation|自定义扩展操作栏|() => React.Node|`()=>''`|
|disabled|是否禁用|boolean|false|4.4.4
| locale | 语言 | string | zh-cn |4.4.3
|fieldid|自动化测试专用属性|string||4.3.0

### Render Children
Transfer 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|direction|渲染列表的方向|left &#124; right|-|4.4.4
|disabled|是否禁用|boolean|false|4.4.4
|dataSource|当前列表数据|record[]||4.4.4
|checkedKeys|选中的条目|string[]||4.4.4
|onItemSelect|勾选条目|func||4.4.4
|onItemSelectAll|选中全部的条目|func||4.4.4

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieldid                    | 4.3.0 |
| 向左移动按钮   | fieldid + "\_transfer\-operation\_left`" | 4.3.0 |
| 向右移动按钮   | fieldid + "\_transfer\-operation\_right`" | 4.3.0 |
| 左侧列表头部输入框   | fieldid + "\_transfer\-input\-search\_left" | 4.3.0 |
| 右侧列表头部输入框   | fieldid + "\_transfer\-input\-search\_right" | 4.3.0 |


## 注意事项

按照 React 的规范，所有的组件数组必须绑定 key。在 Transfer 中，dataSource里的数据值需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 rowKey 来指定数据列的主键。

```
// 比如你的数据主键是 uid
return <Transfer rowKey={record => record.uid} />;
```
