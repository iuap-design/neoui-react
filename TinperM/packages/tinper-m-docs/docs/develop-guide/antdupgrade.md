---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 7
title: Antd Mobile V5 升级指南
toc: content
---
# Antd Mobile V5 升级指南

## 升级指引

- TinperM[快速开始](/basic-components/quickstart)
- TinperM支持Antd Mobile V5版本，功能兼容
- 统一替换组件库名称，由 `antd-mobile`替换为 `@tinper/m`
- 针对Antd Mobile V5版本，TinperM组件库做了部分调整，具体对照表如下
- 个别组件的适配，参照最后一部分组件升级

## TinperM与Antd Mobile V5 组件对照表

| TinperM            | Antd Mobile V5                                                              |
| ------------------ | --------------------------------------------------------------------------- |
| Button             | [Button](/basic-components/antdupgrade#button)                                 |
| Icon               | Icon                                                                        |
| Image              | Image                                                                       |
| Avatar             | Avatar                                                                      |
| Input              | Input                                                                       |
| TextArea           | TextArea                                                                    |
| DatePicker         | DatePicker                                                                  |
| FormItemWrapper    | -                                                                           |
| Calendar           | Calendar                                                                    |
| CascaderView       | CascaderView                                                                |
| Slider             | Slider                                                                      |
| Switch             | Switch                                                                      |
| Radio              | Radio                                                                       |
| Checkbox           | Checkbox                                                                    |
| DateTimePicker     | -                                                                           |
| TimePicker         | -                                                                           |
| Popover            | Popover                                                                     |
| Rate               | Rate                                                                        |
| Hyperlinks         | -                                                                           |
| TimeRangePicker    | -                                                                           |
| CalendarPickerView | CalendarPickerView                                                          |
| CheckList          | CheckList                                                                   |
| Picker             | Picker                                                                      |
| PickerView         | PickerView                                                                  |
| Form               | Form                                                                        |
| Selector           | Selector                                                                    |
| Dropdown           | Dropdown                                                                    |
| Stepper            | Stepper                                                                     |
| InputNumber        | -                                                                           |
| DatePickerView     | DatePickerView                                                              |
| CascadePicker      | CascadePicker                                                               |
| Empty              | Empty                                                                       |
| Tag                | Tag                                                                         |
| ImageViewer        | ImageViewer                                                                 |
| Swiper             | Swiper                                                                      |
| ProgressBar        | ProgressBar                                                                 |
| SafeArea           | SafeArea                                                                    |
| Space              | Space                                                                       |
| Flex               | -                                                                           |
| List               | List                                                                        |
| Ellipsis           | Ellipsis                                                                    |
| InfiniteScroll     | InfiniteScroll                                                              |
| PullToRefresh      | PullToRefresh                                                               |
| Accordion          | Collapse                                                                    |
| Steps              | Steps                                                                       |
| Divider            | Divider                                                                     |
| Grid               | Grid                                                                        |
| FloatingPanel      | [FloatingPanel](/basic-components/antdupgrade#floatingpanel)                   |
| FloatingBubble     | FloatingBubble                                                              |
| Card               | Card                                                                        |
| NavBar             | [NavBar](/basic-components/antdupgrade#navbar)                                 |
| SearchBar          | [SearchBar](/basic-components/antdupgrade#searchbar)                           |
| Popup              | Popup                                                                       |
| ToolBar            | -                                                                           |
| Tabs               | [Tabs](/basic-components/antdupgrade#tabs)                                     |
| TabBar             | TabBar                                                                      |
| IndexBar           | IndexBar                                                                    |
| Modal              | Modal                                                                       |
| Dialog             | Dialog                                                                      |
| Loading            | [SpinLoading、DotLoading](/basic-components/antdupgrade#spinloadingdotloading) |
| Toast              | Toast                                                                       |
| Notice             | NoticeBar                                                                   |
| Badge              | Badge                                                                       |
| Skeleton           | Skeleton                                                                    |
| SwipeAction        | SwipeAction                                                                 |
| WaterMark          | WaterMark                                                                   |
| ErrorBlock         | ErrorBlock                                                                  |
| Mask               | Mask                                                                        |
| ActionSheet        | ActionSheet                                                                 |
| ConfigProvider     | ConfigProvider                                                              |

## 组件升级

### Button

- color属性改为现在的mode

### NavBar

类名变化:

- adm-nav-bar => mui-navbar（所有涉及到adm-nav-bar都要改成mui-navbar)
- adm-nav-bar-back-arrow => mui-navbar-back

### SearchBar

类名变化：

- adm-search-bar => mui-search
- adm-search-bar-suffix去掉，直接是里面的button，例如mui-search-cancel-btn
- adm-search-bar-input-box => mui-search-input-area
- adm-search-bar-input => mui-search-input
- adm-search-bar-input-box-icon => mui-search-left
- adm-input-element => mui-input-box
- adm-search-bar-active => mui-search-active

属性变化：

- icon属性变为leftIcon
- rightIcon={null}要手动传

其他：

- 由于结构不同，如果需要与原来相同白色背景，需要在最外层为SearchBar加白色背景色
- 原来获取value方法由searchRef.current.nativeElement.value改为searchRef.current.value

### SpinLoading&DotLoading

- 改名为 Loading
- 现组件没有默认颜色，如有需要自己设置
- 原组件默认是spinloading模式，现在需要手动设置 type='spinloading'

### FloatingPanel

- mui-floating-panel-bar样式由原来的横杠变为现在的箭头，因此不能用background设置样式，需要使用color

### Tabs

- activeLineMode默认值由auto变为fixed

### Toast

- duration属性单位由毫秒改为秒

## 技术支持

- 支持群: 点击右侧加群咨询，友空间扫码加入即可
