# 树形控件 Tree

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能

## API

### Tree

<!--Tree-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|multiple|是否允许选择多个树节点|bool|false
|checkable|节点前添加 Checkbox 复选框|bool|false
|defaultExpandAll|默认展开所有树节点|bool|false
|defaultExpandedKeys|默认展开指定的树节点|String[]|[]
|expandedKeys|（受控）展开指定的树节点|String[]|[]
|autoExpandParent|是否自动展开父节点|bool|true
|defaultCheckedKeys|默认选中复选框的树节点|String[]|[]
|checkedKeys|（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联|String[]/{checked:Array,halfChecked:Array}|[]
|checkStrictly|checkable 状态下节点选择完全受控（父子节点选中状态不再关联）|bool|false
|defaultSelectedKeys|默认选中的树节点|String[]|[]
|selectedKeys|（受控）设置选中的树节点|String[]|-
|cancelUnSelect|选中的节点第二次点击时还是选中，不自动取消选中|bool|false
|showLine|是否显示连接线|bool|false
|openIcon|自定义展开节点图标的名称[参考这里](https://yondesign.yonyou.com/website/#/detail/component/wui-icon/bip)|String[]|-
|closeIcon|自定义关闭节点图标的名称[参考这里](https://yondesign.yonyou.com/website/#/detail/component/wui-icon/bip)|String[]|-
|onExpand|展开/收起节点时触发的回调函数|function(expandedKeys, {expanded: bool, node}, event)|-
|onCheck|点击复选框触发的回调方法|function(checkedKeys, e:{checked: bool, checkedNodes, node, event, checkedChildrenKeys?:[所有被勾选的子节点,checkStrictly为false生效]})|-
|onSelect|点击树节点触发的回调函数|function(selectedKeys, e:{selected: bool, selectedNodes, node, event})|-
|filterTreeNode|按需筛选树节点（高亮）,当返回true,相关联的节点会高亮|function(node)|-
|filterValue|筛选关键字，根据关键字筛选treeData 数据|string| - |4.6.5
|optionFilterProp|指定node过滤属性，默认为title|title| - |4.6.5
|loadData|异步加载数据|(treeNode) => Promise<any>|-
|onRightClick|当用户点击右键触发的回调函数|function({event,node})|-
|draggable|树是否可拖拽（IE>8| bool|false | |
|onDragStart|当树节点刚开始拖拽所触发的放方法|function({event,node})|-
|onDragEnter|当拖拽进入触发的方法|function({event,node,expandedKeys})|-
|onDragOver|当拖拽经过触发的方法 第三个返回参数表示拖拽到目标元素的状态，通过onDragOver的返回值能够自行决定 在树节点下蓝色标志线的显示|function({event,node, extension}): boolean|-
|onDragLeave|当拖拽离开触发的方法|function({event,node})|-
|onDragEnd|当拖拽结束触发的方法|function({event,node})|-
|onDrop|当节点放下触发方法|function({event, node, dragNode, dragNodesKeys})|-
|dragInitialState|拖拽过程中是否保持展开收起状态，为true不自动展开收起父级节点|boolean|-|4.6.5|
|onDoubleClick|当双击发生触发的方法|function(checkedKeys, e:{node, event})|-
|openAnimation|动画配置，一般不需要自定义|object|内置动画配置|-
|focusable|是否开启快捷键功能，使用Tab 键导航获取焦点↓↑选中下、上一个节点，→←展开或者收起一个节点,enter键为节点双击事件|bool|-
|tabIndexValue|节点获取焦点时，自定义tabIndex的值|Number|0
|children|必填，TreeNode组件|node|-
|mustExpandable|支持disabled的节点可以自定义展开收起，默认disabled的节点不可以展开收起。|bool|false
|autoSelectWhenFocus|使用“↑、↓”快捷键切换焦点时，是否自动选中树节点|bool|false
|treeData|treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）|array\<{key, title, children, [disabled, selectable]}>|-
|lazyLoad|是否使用懒加载（适用于大数据场景），可参考滚动加载树节点demo|bool|false
|debounceDuration|懒加载时可以传入一个防抖的时长|number|150
|renderTitle|使用 treeData 渲染树时使用，可通过此函数自定义树节点内容|Function(nodeData,nodeProps)|-
|renderTreeNodes|使用 treeData 渲染树节点时，可使用该函数自定义节点显示内容（非必须）|Function(data)|-
|fieldNames|使用 treeData 渲染树节点时自定义节点 title、key、children 的字段效果同renderTreeNodes（非必须）|{ title: title, key: key, children: children }|{ title: title, key: key, children: children }|4.4.5
|getScrollContainer|用于滚动加载场景，自定义滚动事件监听的容器|Function(data)|-
|getCheckboxAttrs|自定义生成勾选框的dom属性的方法，可参考“Tree基本使用示例”demo|Function(treeNodeProps)|-
|fieldid|自动化测试专用属性 前缀|string||4.3.0
|showIcon|是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式|boolean||-
|blockNode|是否节点占据一行|boolean|true|4.4.5
|syncCheckedAndSelectedStatus|点击checkbox或者文字时，另一部分(文字或者checkbox)是否高亮或者被选择|bool|false||4.3.0
|disabled|树是否禁用|bool|false|4.3.0
|icon|节点图标，优先级低于TreeNode的icon|node/function(props) {}||4.3.0
|inverse|树的复选框是否是实心填充样式|bool|false|4.3.1
|dragDelayExpandTime|拖拽treeNode移动至其他包含子节点的treeNode上方时使其展开的延迟毫秒时间|number|500|4.4.3
|onLoad|异步节点加载完毕时触发|(loadedKeys, {event, node}) => void|-|4.4.5
|loadedKeys|（受控）已经加载的节点，需要配合 loadData 使用|string[]|-|4.4.5
|height|大数据虚拟时设置滚动父元素高度，使用tree 内部滚动，无需外层组件提供 滚动容器|number|-|4.4.5
|expandOnClickNode|是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点|boolean|true|4.6.3

### TreeNode

<!--Tree.TreeNode-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|disabled|节点是否不可用|bool|false
|disableCheckbox|节点的checkbox是否不可用|bool|false
|visibleCheckbox|checkbox是否展示|bool|true|4.3.0
|selectable|设置节点是否可被选中|bool|true
|title|名称标题|String/element  |--
|key|节点key,和(default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys一起用，必须是唯一的|String|-
|icon|节点图标|node|-
|isLeaf|是否是叶子节点|bool|false
|titleClass|名称类名|String|-
|contentCls|title 外层元素的自定义类名|String|4.4.4
|titleStyle|名称样式|Object|-
|switcherClass|switcher类名|String|-
|switcherStyle|switcher样式|Object|-
|children|TreeNode组件/无|node|-
|fieldid|自动化测试专用属性 传入唯一数据|string||4.3.0

### 支持的快捷键

| 快捷键 | 类型 |快捷键说明 | 
|  --- | --- | --- |
| tab | - |  tab 进入焦点，且选中第一行。|
| ↑、↓ | - | ↑(上箭)、↓(下箭) 选中上一行、选中下一行。 |
| ←、→ | - |  ←(左箭)、→(右箭) 收起、展开。 |

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| 根元素   | fieldid                    | 4.3.0 |
| 树节点   | fieldid + "\_option\_${position}" | 4.3.0 |
| 展开折叠按钮   | fieldid + "\_tree\_switcher\_${position}" | 4.3.0 |

### Q&A

#### 1.如果没有开启懒加载，树的数据量又很多并且结构复杂层级很深，如何避免展开折叠卡顿的状况？

可以传入openAnimation = {{}} 给树组件，取消动画效果。
