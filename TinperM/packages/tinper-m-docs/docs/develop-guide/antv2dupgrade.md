---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 8
title: Antd Mobile V2 升级指南
toc: content
---
# Antd Mobile V2 升级指南

## 升级指引

- TinperM[快速开始](/basic-components/quickstart)
- TinperM支持Antd Mobile V2版本，功能兼容
- 统一替换组件库名称，由 `antd-mobile`替换为 `@tinper/m`
- 针对Antd Mobile V2版本，TinperM组件库做了部分调整，具体对照表如下
- 个别组件的适配，参照最后一部分组件升级

## TinperM与Antd Mobile V2 组件对照表

| TinperM            | Antd Mobile V2                                                |
| ------------------ | ------------------------------------------------------------- |
| Button             | Button                                                        |
| Icon               | Icon                                                          |
| Image              | -                                                             |
| Avatar             | -                                                             |
| Input              | InputItem                                                     |
| TextArea           | [TextAreaItem](/basic-components/antv2dupgrade#textarea)         |
| DatePicker         | [DatePicker](/basic-components/antv2dupgrade#datepicker)         |
| FormItemWrapper    | -                                                             |
| Calendar           | Calendar                                                      |
| CascaderView       | -                                                             |
| Slider             | Slider                                                        |
| Switch             | Switch                                                        |
| Radio              | Radio                                                         |
| Checkbox           | Checkbox                                                      |
| DateTimePicker     | -                                                             |
| TimePicker         | -                                                             |
| Popover            | Popover                                                       |
| Rate               | -                                                             |
| Hyperlinks         | -                                                             |
| TimeRangePicker    | -                                                             |
| CalendarPickerView | -                                                             |
| CheckList          | -                                                             |
| Picker             | Picker                                                        |
| PickerView         | PickerView                                                    |
| Form               | -                                                             |
| Selector           | -                                                             |
| Dropdown           | -                                                             |
| Stepper            | Stepper                                                       |
| InputNumber        | -                                                             |
| DatePickerView     | DatePickerView                                                |
| CascadePicker      | -                                                             |
| Empty              | -                                                             |
| Tag                | Tag                                                           |
| ImageViewer        | -                                                             |
| Swiper             | -                                                             |
| ProgressBar        | -                                                             |
| SafeArea           | -                                                             |
| Space              | WhiteSpace                                                    |
| Flex               | Flex                                                          |
| List               | List                                                          |
| Ellipsis           | -                                                             |
| InfiniteScroll     | -                                                             |
| PullToRefresh      | PullToRefresh                                                 |
| Accordion          | Accordion                                                     |
| Steps              | Steps                                                         |
| Divider            | -                                                             |
| Grid               | Grid                                                          |
| FloatingPanel      | -                                                             |
| FloatingBubble     | -                                                             |
| Card               | Card                                                          |
| NavBar             | [NavBar](/basic-components/antv2dupgrade#navbar)                 |
| SearchBar          | [SearchBar](/basic-components/antv2dupgrade#searchbar)           |
| Popup              | -                                                             |
| ToolBar            | -                                                             |
| Tabs               | Tabs                                                          |
| TabBar             | TabBar                                                        |
| IndexBar           | -                                                             |
| Modal              | Modal                                                         |
| Dialog             | -                                                             |
| Loading            | -                                                             |
| Toast              | Toast                                                         |
| Notice             | [NoticeBar](/basic-components/antv2dupgrade#noticebar)           |
| Badge              | Badge                                                         |
| Skeleton           | -                                                             |
| SwipeAction        | SwipeAction                                                   |
| WaterMark          | -                                                             |
| ErrorBlock         | -                                                             |
| Mask               | -                                                             |
| ActionSheet        | ActionSheet                                                   |
| ConfigProvider     | [LocaleProvider](/basic-components/antv2dupgrade#localeprovider) |

## 组件升级

### NoticeBar

- 使用TinperM的Notice组件

### LocaleProvider

- 使用TinperM的ConfigProvider组件

### DatePicker

- extra 属性变更为 placeholder
- onChange 事件变更为 onOK

### TextArea

- count 属性在旧版本中功能为控制最大输入长度，并显示字数比例在右下角。在升级后，需要综合使用 showCount、maxLength 实现功能
- autoHeight 属性变更为 autoSize

### SearchBar

- 新增属性 rightIcon
- 新增属性 isRightIn

### NavBar

- 移除属性 mode

### ListView

* ListView组件拆分为( [列表(List)](/basic-components/list) / [下拉刷新(PullToRefresh)](/basic-components/pull-to-refresh) / [无限滚动(InfiniteScroll)](/basic-components/infinite-scroll) ), 组合使用方式如下:

<code src="@components/list/demos/listViewUpdate.tsx" title="ListView升级示例" mobile="true" compact=true ></code>

* 大数据渲染时的性能优化, 可引入三方库实现, 以 `@tanstack/react-virtual`为例, 示例如下:

<code src="@components/list/demos/listViewUpdateVirtual.tsx" title="ListView虚拟列表示例" mobile="true" compact=true ></code>

| antd-mobile属性       | tinper-m支持情况            | 说明                                      |
| --------------------- | --------------------------- | ----------------------------------------- |
| dataSource            | --                          | data由组件使用者自行维护                  |
| renderRow             | --                          | 提供List.Item作为容器组件                 |
| renderBodyComponent   | --                          | 组合使用时自行控制                        |
| onEndReached          | InfiniteScroll-onEndReached | 无限滚动组件-滚动到距离底部的临界值时触发 |
| onEndReachedThreshold | InfiniteScroll-threshold    | 无限滚动组件-滚动到底部触发事件的阈值     |
| pullToRefresh         | PullToRefresh               | 下拉刷新组件                              |

## 技术支持

- 支持群: 点击右侧加群咨询，友空间扫码加入即可
