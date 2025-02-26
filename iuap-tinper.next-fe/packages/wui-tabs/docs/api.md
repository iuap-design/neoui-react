# 页签 Tabs

分隔内容上有关联但属于不同类别的数据集合。

## API

### Tabs

<!--Tabs-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey              | 设置当前激活的tabPanel的key                      | String            | -       |
| defaultActiveKey       | 如果activeKey没有设置的时候，当初始化的时候设置当前激活的tabPanel的key | String            | 默认激活第一个 |
| renderTabBar           | 自定义渲染tab的头部                              | ():React.Node     | -       |
| renderTabContent       | 自定义渲染tab的内容区域                            | ():React.Node     | -       |
| onChange               | tabPanel改变的时候的回调函数                       | (key:string):void | -       |
| destroyInactiveTabPane | 是否在更改选项卡时销毁无效标签                          | Boolean           | false   |
| onTabClick             | tab 被点击的回调                               | fun               | -       |
| className              | 在tab组件上添加className                       | String               | -       |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action): void | - |
| tabPosition            | 页签位置，可以是['left','right','top','bottom']中选择 | String               | top       |
| tabBarExtraContent     | tab bar 上额外的元素                      | ():React.Node               | -       |
| type                   | 页签的基本样式,可以是['line','card','primary','upborder','simple','editable-card','fill','trangle','fade','downborder','trapezoid']中选择 | String    | 'line'  |
| tabBarStyle            | tab bar 的样式对象                        | Object | - |
| onTabScroll            | tab 滚动时触发,通过参数direction: left 、 right 、top 、 bottom 区分,只有在moreType属性值为moreTabsArrow时有效 | Function | -    |
| moreType               | 当页签比较多超出容器时，Tabs的展示形式，可以是['moreTabsSelect','moreTabsArrow']中选择 | String | moreTabsSelect |
| tabContentClassName    | 传递给wui-tabs-content层的自定义类名 | String | - |
| tabBarClassName        | 传递给wui-tabs-bar层的自定义类名 | String | - |
| fieldid                |自动化测试专用属性| string |    -|
| dragable               | 可拖拽tabs页签 | boolean | false |
| onDrag                 | 当dragable为true时，页签拖拽后的回调（返回拖拽信息） | fun | - |
| trigger                | 触发关闭当前、全部、其他 拉下内容显示的行为, popMenu存在并定义了下拉项时生效 可以是['hover', 'click'] | Array | ['click'] |
| popMenu                | popMenu存在时支持右键点击或者hover呼出下拉项操作,popMenu为函数类型自定义下拉项内容| (key)=>[{text: '关闭当前', key: 'closecur'}, {text: '关闭其他', key: 'closeoth'}, {text: '关闭全部', key: 'closeall'}, ...] | -       |
| onPopMenuClick            | 右键点击或hover呼出下拉菜单项时，点击下拉项的回调，当popMenu存在时才生效 （返回的type值为popMenu自定义下拉项的key值）      | fun({type:'closecur\closeoth\closeall',tabKey})        | -       |
| onpopMenu              | 下拉项显示/隐藏的回调,返回当前页签下拉显隐的状态和触发下拉项的页签的key | (open:boolean, tab: string)=>{} | - |
| addIcon                | 自定义添加按钮图标（在 type="editable-card"类型页签时有效） | ReactElement | - | 4.4.4 |
| moreIcon               | 自定义折叠icon(多页签时触发下拉的图标) | ReactElement | - | 4.4.4 |
| items                  | 配置选项卡内容(类型为对象数组，对象的属性可以是TabPane的任何参数，但是key、tab、children为必须项) | [{key: '1', tab: 'tab 1', children: '内容区 1'}, {key: '2', tab: 'tab 2', children: '内容区 2'}, ...] | - | 4.4.5 |
| centered               | 标签居中展示 | boolean | false | 4.4.5 |
| dropdownClassName      | 自定义多页签下拉弹层类名 | string | - | - |
| moreTypeAllShow        | 翻页功能和全部下拉功能并存 | boolean | false | - |
| isTruncationShow       | 翻页功能左右箭头是否悬停显示截断内容 | boolean | false | - |

### TabPane

<!--Tabs.TabPane-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key         | 对应 activeKey                | string            | -     |
| tab         | 选项卡头显示文字                    | string\|ReactNode | -     |
| style       | 选项卡样式                       | Object            | -     |
| disabled    | 是否禁用页签                       | Boolean            | false     |
| forceRender | 在选项卡中强制渲染内容，而不是在单击选项卡后呈现延迟。 | Boolean           | false |
| placeholder | 懒加载时显示的内容 | ReactNode | - |
| closeIcon | 自定义关闭图标，在 type="editable-card"时有效 | ReactNode | - |
| closable  | 是否显示关闭图标，在 type="editable-card"时有效 | Boolean | true |
| fieldid     |自动化测试专用属性| string |    -|

### SearchTabs

<!--Tabs.SearchTabs-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|onChange|数据改变的回调|func|-|
|value|被选中的值|string|-|

### SearchTabs.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|value|Item的标示|string|-|

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|tabBarPosition| tab头的定位，可以是['left','right','top','bottom']中选择 | String | - |
|extraContent| 在导航上添加扩展元素 |():React.Node | - |
|onPrevClick| 当出现滚动时，点击上一个时的回调函数 | Function | - |
|onNextClick| 当出现滚动时，点击下一个时的回调函数 | Function | - |
|style| 添加到tab上的style(Tabs组件上的Style) | String            | u-tabs  |

### fieldid 场景说明

| 场景     | 生成规则说明                | 版本  |
| -------- | --------------------------- | ----- |
| wui-tabs-tab层   | fieldid + "\-tabs-area\-${index}"           | 4.3.0 |
| 多页签右翻页按钮  | fieldid + "_next_btn"                       | 4.4.0 |
| 多页签左翻页按钮  | fieldid + "_prev_btn"                       | 4.4.0 |
| 多页签下拉按钮    | fieldid + "_select_btn"                     | 4.4.0 |
| editable-card页签关闭图标  | fieldid + "_edit_close_${index}"     | 4.4.0 |
