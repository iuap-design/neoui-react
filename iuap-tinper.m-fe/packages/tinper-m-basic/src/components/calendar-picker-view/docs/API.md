## CalendarPickerView 属性
### API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- |----|
| allowClear | 是否允许再次点击后清除 | `boolean` | `true` |
| defaultValue | 默认选择的日期 | 同 `value` 属性 | - |
| max | 可选择范围的最大值 | `Date` | - |
| min | 可选择范围的最小值 | `Date` | - |
| onChange | 选择日期变化时触发 | 单选模式下为 `(val: Date \| null) => void`，多选模式下为 `(val: [Date, Date] \| null) => void` | - |
| renderTop | 日期顶部信息的渲染函数 | `(date: Date) => ReactNode \| null \| undefined` | - |
| renderBottom | 日期底部信息的渲染函数 | `(date: Date) => ReactNode \| null \| undefined` | - |
| selectionMode | 选择模式，不设置的话表示不支持选择 | `'single' \| 'range'` | - |
| shouldDisableDate | 判断日期是否可选，使用后会忽略 min 和 max 设置 | `(date: Date) => boolean` | - |
| title | 日期选择器的标题 | `React.ReactNode` | `日期选择` |
| value | 选择的日期 | 单选模式下为 `Date \| null`，多选模式下为 `[Date, Date] \| null` | - |
| weekStartsOn | 每周以周几作为第一天 | `'Monday' \| 'Sunday'` | `'Sunday'` |
| renderDate | 自定义日期渲染 | `(date: Date) => ReactNode` | - | -  |

### CSS 变量

| 属性                                               | 说明         | 默认值       | 全局变量                                                          |
|----------------------------------------------------|------------|-----------|-------------------------------------------------------------------|
| --panel-bg-color                                   | 面板背景颜色     |`#FFFFFF` | --ynfm-color-bg-panel-calendar                                     |
| --header-btn-color                                 | 头部按钮颜色     | `#EE2233` | --ynfm-color-icon-arrow-header-calendar                           |
| --title-font-size                                   | 标题字号       | `0.34rem` | --ynfm-font-size-title-calendar                                   |
| --title-text-color                                  | 标题文本颜色     | `#171717` | --ynfm-color-text-title-calendar                                  |
| --title-font-weight                                | 标题字重       | `500`     | --ynfm-font-weight-title-calendar                                 |
| --mark-font-size                                    | 星期标识字号     | `0.26rem` | --ynfm-font-size-weekmark-cell-calendar                           |
| --mark-border-color                                 | 星期标识下边线颜色  | `#F5F5F5` | --ynfm-color-border-weekmark-calendar                             |
| --mark-border-width                                | 星期标识下边线粗细  | `1px`     | --ynfm-border-width-weekmark-calendar                             |
| --mark-border-style                                | 星期标识下边线样式  | `solid`   | --ynfm-border-style-weekmark-calendar                             |
| --mark-text-color                                  | 星期标识文本颜色   | `#BFBFBF` | --ynfm-color-text-weekmark-cell-calendar                          |
| --mark-font-weight                                 | 星期标识字重     | `400`     | --ynfm-font-weight-weekmark-cell-calendar                        |
| --cell-bottom-disabled-text-color                   | 禁用日期文本颜色   | `#BFBFBF` | --ynfm-color-text-cell-calendar-disabled                          |
| --cell-bottom-font-size                             | 辅助文字字号     | `0.2rem`  | --ynfm-font-size-hint-cell-calendar                               |
| --cell-bottom-text-color                            | 辅助文字颜色     | `#737373` | --ynfm-color-text-hint-cell-calendar                              |
| --cell-bottom-font-weight                           | 辅助文字字重     | `400`     | --ynfm-font-weight-hint-cell-calendar                             |
| --cell-top-font-size                                | 日期字号       | `0.34rem` | --ynfm-font-size-cell-calendar                                   |
| --cell-top-text-color                               | 日期文本颜色     | `#171717` | --ynfm-color-text-cell-calendar                                  |
| --cell-selected-color-text                          | 选中日期文本颜色   | `#FFFFFF` | --ynfm-color-text-cell-calendar-selected                          |
| --cell-font-weight                                  | 日期字重       | `500`     | --ynfm-font-weight-cell-calendar                                 |
| --cell-today-text-color                             | 当日日期文本颜色   | `#EE2233` | --ynfm-color-text-cell-calendar-today                            |
| --cell-selected-bg-color                            | 选中日期背景颜色   | `#EE2233` | --ynfm-color-bg-cell-calendar-selected                           |
| --cell-selected-bg-range-color                      | 选中日期范围背景颜色 | `#EE2233` | --ynfm-color-bg-range-cells-calendar-selected                    |
| --cell-selected-border-radius                      | 选中日期边线圆角   | `4px`     | --ynfm-border-radius-cell-calendar-selected                   |


### Ref

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| jumpTo | 跳转至指定日期的区间 | `(page: Page \| ((page: Page) => Page)) => void` |
| jumpToToday | 跳转至今日 | `() => void` |
| getDateRange | 获取日期 | `[Date, Date]` |

### 类型定义
```ts
type Page = { month: number; year: number }
```

你可以通过 Ref 手动控制日历的翻页，例如：

```ts
// 跳回当月
ref.current.jumpToToday()

// 跳转至指定年月
ref.current.jumpTo({ year: 2021, month: 1 })

// 跳转到三年之后
ref.current.jumpTo(page => ({
  year: page.year + 3,
  month: page.month,
}))
```

## fieldid 说明

| 场景     | 生成规则                         |
|--------|------------------------------|
| 根元素    | fieldid                      |
| 范围选中开始 | fieldid + "-selected-begin"  |
| 范围选中结束 | fieldid + "-selected-end"    |
| 单选选中   | fieldid + "-selected-single" |
