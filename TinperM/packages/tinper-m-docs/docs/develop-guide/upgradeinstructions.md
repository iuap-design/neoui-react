---
nav: basic-components
group:
  title: 开发指南
  order: 0
order: 6
title: ArcUI升级指南
toc: content
---
# ArcUI升级指南

## 升级指引

- TinperM[快速开始](/basic-components/quickstart)
- TinperM支持ArcUI，功能兼容
- 统一替换组件库名称，由 `arc-ui`替换为 `@tinper/m`
- 针对ArcUI，TinperM组件库做了部分调整，具体对照表如下
- 个别组件的适配，参照最后一部分组件升级

## TinperM与ArcUI组件对照表

| TinperM            | ArcUI                                                               |
| ------------------ | ------------------------------------------------------------------- |
| Button             | Button                                                              |
| Icon               | Icon                                                                |
| Image              | Image                                                               |
| Avatar             | Avatar                                                              |
| Input              | Input                                                               |
| TextArea           | TextArea                                                            |
| DatePicker         | DatePicker                                                          |
| FormItemWrapper    | FormItemWrapper                                                     |
| Calendar           | -                                                                   |
| CascaderView       | CascaderView                                                        |
| Slider             | Slider                                                              |
| Switch             | Switch                                                              |
| Radio              | [Radio](/basic-components/upgradeinstructions#radio)                   |
| Checkbox           | Checkbox                                                            |
| DateTimePicker     | DateTimePicker                                                      |
| TimePicker         | TimePicker                                                          |
| Popover            | Popover                                                             |
| Rate               | Rate                                                                |
| Hyperlinks         | Hyperlinks                                                          |
| TimeRangePicker    | TimeRangePicker                                                     |
| CalendarPickerView | -                                                                   |
| CheckList          | -                                                                   |
| Picker             | Picker                                                              |
| PickerView         | -                                                                   |
| Form               | -                                                                   |
| Selector           | -                                                                   |
| Dropdown           | -                                                                   |
| Stepper            | Stepper                                                             |
| InputNumber        | InputNumber                                                         |
| DatePickerView     | -                                                                   |
| CascadePicker      | CascadePicker                                                       |
| Empty              | Empty                                                               |
| Tag                | Tag                                                                 |
| ImageViewer        | ImageViewer                                                         |
| Swiper             | [Carousel](/basic-components/upgradeinstructions#carousel)             |
| ProgressBar        | ProgressBar                                                         |
| SafeArea           | -                                                                   |
| Space              | -                                                                   |
| Flex               | Flex                                                                |
| List               | List                                                                |
| Ellipsis           | Ellipsis                                                            |
| InfiniteScroll     | InfiniteScroll                                                      |
| PullToRefresh      | PullToRefresh                                                       |
| Accordion          | Accordion                                                           |
| Steps              | Steps                                                               |
| Divider            | Divider                                                             |
| Grid               | -                                                                   |
| FloatingPanel      | -                                                                   |
| FloatingBubble     | -                                                                   |
| Card               | CardBox                                                             |
| NavBar             | [NavBar](/basic-components/upgradeinstructions#navbar)                 |
| SearchBar          | [SearchBar](/basic-components/upgradeinstructions#searchbar)           |
| Popup              | Popup                                                               |
| ToolBar            | ToolBar                                                             |
| Tabs               | [Tab](/basic-components/upgradeinstructions#tab)                       |
| TabBar             | TabBar                                                              |
| IndexBar           | -                                                                   |
| Modal              | Modal                                                               |
| Dialog             | Dialog                                                              |
| Loading            | Loading                                                             |
| Toast              | Toast                                                               |
| Notice             | Notice                                                              |
| Badge              | -                                                                   |
| Skeleton           | Skeleton                                                            |
| SwipeAction        | -                                                                   |
| WaterMark          | -                                                                   |
| ErrorBlock         | -                                                                   |
| Mask               | -                                                                   |
| ActionSheet        | ActionSheet                                                         |
| ConfigProvider     | [ConfigProvider](/basic-components/upgradeinstructions#configprovider) |

## 组件升级

### NavBar

- autoShow属性（是否展示（微信/友空间/ios/android）平台自有头部），通过判断mtl.platform来决定是否显示导航栏。这个功能应由用户自行实现。
- NavBar左按钮，标题，右按钮，需要用户传入ReactNode。因此，需要默认的调用MTL扫码方法由用户来调用
- 保留：back / backArrow / onBackClick / left / right / children属性，删除了: rightIcon1  / rightIcon1Text / rightIcon1Click / rightIcon2 等属性，全部通过传入left / right节点来实现，可参考示例进行适配

### SearchBar

- onSubmit替换成onSearch
- 受控组件的使用方式需要同时传value与onChange

### Radio

- Radio 默认为单一选项模式, 原 arcui 中 Radio的列表实模式，现在应使用Radio.Control 设置mode='list' 详见 Radio 组件示例

### ConfigProvider

- getArcLocaleConfig方法改为getTinpermLocaleConfig

### Carousel

- autoplayInterval（自动切换间隔）单位改为毫秒
- 不再提供此组件，改为更原子的Swiper轮播图组件，下面由Swiper封装的Carousel组件代码，需要用户自行实现

```javascript
import React from 'react'
import { Swiper } from '@tinper/m
interface CarouselProps {
  defaultIndex?: number
  allowTouchMove?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  direction?: 'horizontal' | 'vertical'
  onIndexChange?: (index: number) => void
  indicatorProps?: object
  indicator?: (total: number, current: number) => any
  slideSize?: number
  trackOffset?: number
  stuckAtBoundary?: boolean
  rubberband?: boolean
  className?: string
  style?: React.CSSProperties
  fieldid?: string
}
export default class Carousel extends React.Component<CarouselProps> {
  render () {
    const { children, className, style, autoplayInterval = 3, fieldid = '', ...other } = this.props
    let child = []
    if (Array.isArray(children)) {
      child = [...children]
    } else {
      child = [children]
    }
    return (
      <Swiper
        autoplayInterval={autoplayInterval * 1000}
        className={className}
        style={{ height: '4rem', ...style }}
        fieldid={fieldid}
        {...other}
      >
        {child.map((item, index) => (<Swiper.Item key={index}>{item}</Swiper.Item>))}
      </Swiper>
    )
  }
}
```

### Tab

- Tab 名称替换成 Tabs，Tab.Tab 改为 Tabs.Tab
- 原来未设置 activeLineMode 属性的，为保持样式不变，需要设置该属性为 auto，这是因为该属性的默认值由原来的 none 改为 auto
- 原来未设置 stretch 属性的，为保持样式不变，需要设置该属性为 true，这是因为该属性的默认值由原来的 true 改为 false
- 不再提供TabPane组件，下面代码需要放到用户代码中实现

```javascript
import React, { Component } from 'react'
import classnames from 'classnames'
interface TabPaneProps {
  children?: any
  className?: string
  style?: object
  minHeight?: string
  width?: string
  backgroundColor?: string
  marginBottom?: string
  fieldid?: string
}

export default class MyComponent extends Component<TabPaneProps> {
  static defaultProps = {
    code: '',
    minHeight: 0
  }
  render () {
    const { children, className, style, minHeight, width, backgroundColor, marginBottom, fieldid = '', ...others } = this.props
    const cls = classnames(className, 'arc-tabpane')
    const sty = { width, minHeight, backgroundColor, marginBottom, ...style }
    return (
      <div className={cls} style={sty} fieldid={fieldid} {...others}>
        {children}
      </div>
    )
  }
}
```

## 技术支持

- 支持群: 点击右侧加群咨询，友空间扫码加入即可
