# 日期 DatePicker

日期选择框

## API

### DatePicker

<!--DatePicker-->

| 参数              | 类型                                                                 | 默认值                                                                                                         | 描述                                                                                             | 版本                  |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------- |
| id                | String                                                               |                                                                                                                | 日期框的 id 前缀(如 id_clear)                                                                    |                       |
| fieldid           | String                                                               |                                                                                                                | fieldid 前缀(如 fieldid_clear)【自动化测试专用属性】                                             | 4.3.0                 |
| className         | String                                                               |                                                                                                                | 根节点添加类名                                                                                   |                       |
| style             | Object<React. CSSProperties>                                         |                                                                                                                | 根节点添加内联样式                                                                               |                       |
| popupClassName    | String                                                               |                                                                                                                | 弹窗添加类名                                                                                     |                       |
| dropdownAlign     | enum('bottomLeft', 'bottomRight', 'topLeft', 'topRight')             | 'bottomLeft'                                                                                                   | 弹窗对齐方式                                                                                     | 4.2.0                 |
| popupStyle        | Object<React. CSSProperties>                                         |                                                                                                                | 弹窗添加内联样式                                                                                 | 4.2.0                 |
| transitionName    | String                                                               | 'slide-up'                                                                                                     | css animation 类                                                                                 | 4.2.0                 |
| locale            | String                                                               | 'zh-cn'                                                                                                        | 语言标识/语言包                                                                                  |                       |
| timzone           | String                                                               | 'Asia/Shanghai'                                                                                                | 设置用于展示的 IANA 标准时区,仅在 showTime 时生效,默认接收工作台首选项;注意:不支持`utc+0800`格式 | 4.5.3                 |
| serverTimzone     | String                                                               | 'Asia/Shanghai'                                                                                                | 设置回调函数的 IANA 标准时区,仅在 showTime 时生效,默认接收工作台首选项;注意:不支持`utc+0800`格式 | 4.5.3                 |
| enableTimzone     | Boolean                                                              | false                                                                                                          | 启用时区功能                                                                                     | 4.5.3                 |
| weekStartsOn      | `0`\|`1`\|`6`\|`7`                                                   |                                                                                                                | 设置每周第一天,默认接收工作台首选项                                                              | 4.5.2                 |
| inputReadOnly     | Boolean                                                              | false                                                                                                          | 输入框只读                                                                                       |                       |
| allowClear        | Boolean                                                              | true                                                                                                           | 是否显示 clearIcon                                                                               | 4.2.0                 |
| autoFocus         | Boolean                                                              | false                                                                                                          | 是否自动获取焦点                                                                                 |                       |
| autoFix           | Boolean                                                              | true                                                                                                           | 是否自动校正日期（仅用于 format='YYYY-MM-DD'）                                                   | 4.2.0                 |
| disabledDateValid | Boolean                                                              | true                                                                                                           | 被禁用的日期是否作为有效输入                                                                     | 4.4.3                 |
| showTime          | Boolean \| Object                                                    | false                                                                                                          | 时间，参见[showTime options](#showTime-options)                                                  |                       |
| picker            | enum('time', 'date', 'week', 'month', 'quarter', 'halfYear', 'year') | 'date'                                                                                                         | 展示的面板类型                                                                                   | 4.4.3 新增 `halfYear` |
| format            | String                                                               | 视 timePicker 和 locale 变化                                                                                   | 设置日期格式。参考[moment.js](https://momentjs.com/)                                             |                       |
| use12Hours        | Boolean                                                              | false                                                                                                          | 是否采用 12 小时制                                                                               | 4.2.0                 |
| value             | moment                                                               |                                                                                                                | 当前值                                                                                           |                       |
| defaultValue      | moment                                                               |                                                                                                                | 默认值                                                                                           |                       |
| open              | Boolean                                                              | false                                                                                                          | 弹窗打开状态。该值为受控 prop                                                                    |                       |
| enterKeyDown      | Boolean                                                              | true                                                                                                           | enter 键是否打开日期面板                                                                         |                       |
| suffixIcon        | ReactNode                                                            | `<Icon type='uf-calendar' />`                                                                                  | 自定义后缀图标                                                                                   |                       |
| clearIcon         | ReactNode                                                            | `<Icon type='uf-close-c' />`                                                                                   | 自定义清除图标                                                                                   | 4.2.0                 |
| prevIcon          | ReactNode                                                            |                                                                                                                | 自定义向前图标                                                                                   | 4.2.0                 |
| nextIcon          | ReactNode                                                            |                                                                                                                | 自定义向后图标                                                                                   | 4.2.0                 |
| superPrevIcon     | ReactNode                                                            |                                                                                                                | 自定义高级向前图标                                                                               | 4.2.0                 |
| superNextIcon     | ReactNode                                                            |                                                                                                                | 自定义高级向后图标                                                                               | 4.2.0                 |
| disabled          | Boolean                                                              | false                                                                                                          | 是否禁用                                                                                         |                       |
| requiredStyle     | Boolean                                                              | false                                                                                                          | 必填样式                                                                                         | 4.6.6                 |
| bordered          | `boolean`\|`bottom`                                                  | -                                                                                                              | 设置边框，支持无边框、下划线模式                                                                 | 4.5.2                 |
| align             | `left`\|`center`\|`right`                                            | -                                                                                                              | 设置文本对齐方式                                                                                 | 4.5.2                 |
| placeholder       | String                                                               |                                                                                                                | 输入框 placeholder                                                                               |                       |
| getPopupContainer | function(trigger)                                                    |                                                                                                                | 定义弹层容器，默认在 body 内新建 div                                                             | 4.2.0                 |
| presets           | boolean \| [{ label: string, key: string, value: moment[] }]         | `today`\|`yesterday`\|`tomorrow`\\<br>\|`oneWeekLater`\|`oneMonthLater`\\<br>\|`halfYearLater`\|`oneYearLater` | 预置的日期范围快捷选项                                                                           | 15.3.x                |
| onPresetChange    | Function(label, value, item)                                         |                                                                                                                | 点击预置日期快捷键的回调                                                                         | 15.3.x                |
| onChange          | Function(date: moment, dateString: string, halfYearArr: Array)       |                                                                                                                | 选中日期变化时的回调（第三个参数仅 halfYear 类型有,4.4.3 新增）                                  | 4.2.0                 |
| onOk              | Function(date: moment, dateString: string)                           |                                                                                                                | 点击确认的回调                                                                                   | 4.2.0                 |
| onOpenChange      | Function(open: boolean, date: moment, dateString: string)            |                                                                                                                | open/close 面板切换时回调                                                                        |                       |
| onFocus           | (event: React. FocusEvent) => void                                   |                                                                                                                | 输入框 focus 时回调                                                                              | 4.2.0                 |
| onBlur            | (event: React. FocusEvent) => void                                   |                                                                                                                | 输入框 blur 时回调                                                                               | 4.2.0                 |
| onKeyDown         | (event: React. FocusEvent) => void                                   |                                                                                                                | 键盘按键回调                                                                                     | 4.2.0                 |
| iconClick         | (event: React. FocusEvent) => void                                   |                                                                                                                | 点击日期图标回调                                                                                 |                       |
| direction         | enum('ltr', 'rtl')                                                   |                                                                                                                | 组件布局方向                                                                                     | 4.2.0                 |

### PickerPanel

<!--PickerPanel-->

| 参数               | 类型                                                                           | 默认值 | 描述                                 | 版本  |
| ------------------ | ------------------------------------------------------------------------------ | ------ | ------------------------------------ | ----- |
| defaultPickerValue | moment                                                                         |        | DatePicker 面板展开时默认可视的日期  | 4.2.0 |
| mode               | enum('time', 'date', 'week', 'month', 'quarter', 'halfYear', 'year', 'decade') |        | 面板类型，优先级高于 picker 默认面板 | 4.2.0 |
| showToday          | Boolean                                                                        | false  | 是否显示'今天'按钮                   |       |
| disabledDate       | Function(date: moment) => Boolean                                              |        | 是否禁止选择该日期                   |       |
| dateRender         | Function(currentDate: moment, today: moment) => React. Node                    |        | 自定义 date cells 渲染函数           | 4.2.0 |
| monthCellRender    | Function(currentDate: moment, locale: Locale) => React. Node                   |        | 自定义 month cells 渲染函数          | 4.2.0 |
| renderExtraHeader  | () => React. Node                                                              |        | 额外头部                             | 4.5.2 |
| renderExtraFooter  | () => React. Node                                                              |        | 额外页脚                             | 4.2.0 |
| onSelect           | Function(date: moment)                                                         |        | 选中日期时的回调                     |       |
| onPanelChange      | Function(value: moment, mode)                                                  |        | picker 面板切换时回调                | 4.2.0 |
| onMouseDown        | (event: React. MouseEvent) => void                                             |        | 鼠标按键回调                         |       |

### showTime-options

<!--showTime-options-->

| 参数                | 类型    | 默认值 | 描述                                     | 版本  |
| ------------------- | ------- | ------ | ---------------------------------------- | ----- |
| defaultValue        | String  |        | 时分秒默认值，须与 format 一致，否则无效 | 4.3.1 |
| format              | String  |        | moment 格式，仅包含时分秒部分            | 4.2.0 |
| showHour            | Boolean | true   | 是否显示小时                             | 4.2.0 |
| showMinute          | Boolean | true   | 是否显示分钟                             | 4.2.0 |
| showSecond          | Boolean | true   | 是否显示秒                               | 4.2.0 |
| use12Hours          | Boolean | false  | 是否采用 12 小时制                       | 4.2.0 |
| hourStep            | Number  | 1      | time picker 面板小时间隔                 | 4.2.0 |
| minuteStep          | Number  | 1      | time picker 面板分钟间隔                 | 4.2.0 |
| secondStep          | Number  | 1      | time picker 面板秒间隔                   | 4.2.0 |
| hideDisabledOptions | Boolean | false  | 是否隐藏禁用选项                         | 4.2.0 |

### RangePicker

<!--DatePicker. RangePicker-->

| 参数               | 类型                                                                                                             | 默认值                       | 描述                                                                                                      | 版本                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------- |
| antd               | Boolean                                                                                                          | false                        | 是否兼容 antd 的 API 参数                                                                                 |                       |
| className          | String                                                                                                           |                              | 根节点添加类名                                                                                            |                       |
| style              | Object<React. CSSProperties>                                                                                     |                              | 根节点添加内联样式                                                                                        |                       |
| dateRender         | Function(currentDate: moment, today: moment, info: { range: start \| end }) => React. ReactNode                  |                              | 自定义 date cells 渲染函数                                                                                | 4.2.0                 |
| locale             | String                                                                                                           | 'zh-cn'                      | 语言标识/语言包                                                                                           |                       |
| value              | moment[]                                                                                                         |                              | 当前值                                                                                                    |                       |
| defaultValue       | moment[]                                                                                                         |                              | 默认值                                                                                                    |                       |
| defaultPickerValue | moment[]                                                                                                         |                              | 默认显示的日期面板                                                                                        | 4.2.0                 |
| linkedPanels       | boolean                                                                                                          | true                         | 是否联动左右面板                                                                                          | 4.4.4                 |
| separator          | String                                                                                                           | '~'                          | 两个输入框间的分隔符                                                                                      | 4.2.0                 |
| picker             | enum('time', 'date', 'week', 'month', 'quarter', 'halfYear', 'year')                                             | 'date'                       | 展示的面板类型                                                                                            | 4.4.3 新增 `halfYear` |
| placeholder        | [string, string]                                                                                                 |                              | 输入框 placeholder                                                                                        | 4.2.0                 |
| allowEmpty         | [boolean, boolean]                                                                                               |                              | 是否允许开始或结束日期为空                                                                                | 4.2.0                 |
| showToday          | Boolean                                                                                                          | false                        | 是否显示今天                                                                                              |                       |
| showTime           | Boolean \| Object                                                                                                | false                        | 是否显示时间，参见[showTime options](#showTime-options)                                                   |                       |
| use12Hours         | Boolean                                                                                                          | false                        | 是否采用 12 小时制                                                                                        | 4.2.0                 |
| disabledDateValid  | Boolean                                                                                                          | true                         | 被禁用的日期是否作为有效输入                                                                              | 4.4.3                 |
| disabled           | [boolean, boolean]                                                                                               |                              | 禁用起止项                                                                                                |                       |
| disabledTime       | Function(date, type:'start'\|'end')                                                                              |                              | 禁止选择的时间                                                                                            |                       |
| ranges             | { String: moment[] } \| { [range: string]: () => moment[] } \| [{ label: string, key: string, value: moment[] }] |                              | 预置的日期范围快捷选项                                                                                    | 4.2.0                 |
| showRangeLabel     | Boolean                                                                                                          | false                        | 快捷键选中的日期，输入框中显示为 文本+日期                                                                | 4.3.1                 |
| activePresetKey    | String                                                                                                           |                              | 激活态的快捷选项，值为 ranges 的 label 或 key                                                             | 4.2.0                 |
| format             | String \| string[]                                                                                               | 视 timePicker 和 locale 变化 | 设置日期格式，展示第一个。参考 [moment.js](https://momentjs.com/)                                         |                       |
| onChange           | Function(value, formatString, formatStringArr)                                                                   |                              | 选中日期变化时的回调                                                                                      |                       |
| onCalendarChange   | Function(value, formatString, info: { range:'start'\|'end' })                                                    |                              | 开始或结束日期变化时的回调                                                                                | 4.2.0                 |
| onSelect           | Function(date: moment)                                                                                           |                              | 选中日期的回调                                                                                            |                       |
| onOk               | Function(dates: moment[])                                                                                        |                              | 点击 `确认` 的回调                                                                                        |                       |
| onStartInputBlur   | Function(e, startValue, value)                                                                                   |                              | 日期面板中 左输入框失去焦点的回调                                                                         |                       |
| onEndInputBlur     | Function(e, endValue, value)                                                                                     |                              | 日期面板中 右输入框失去焦点的回调                                                                         |                       |
| onPresetChange     | Function(label, value, item, lastSelectDate)                                                                     |                              | 点击预置的日期范围按钮的回调                                                                              | 4.2.0                 |
| order              | Boolean                                                                                                          | true                         | `false` 禁用自动排序(仅适用于 TimeRangePicker )                                                           | 4.2.0                 |
| atOnceFinish       | Boolean                                                                                                          | false                        | showTime 为 true 时生效，当开始结束时间都存在时，只改变结束时间并且改变后的值大于开始时间，则直接收起面板 | 4.5.4                 |

### 已废弃

| 参数                       | 类型                                                        | 描述                                 |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------ |
| ~~defaultOpen~~            | Boolean                                                     | 设置日期组件显示/隐藏的默认状态      |
| ~~inputTabKeyOpen~~        | Boolean                                                     | 开启 Tab 键切换                      |
| ~~showDateInput~~          | Boolean                                                     | 显示日期输入框                       |
| ~~showWeekNumber~~         | Boolean                                                     | 显示周                               |
| ~~showOk~~                 | Boolean                                                     | 显示确认                             |
| ~~keyboardInput~~          | Boolean                                                     | 开启键盘输入                         |
| ~~dateInputPlaceholder~~   | String                                                      | 键盘输入框占位符                     |
| ~~inputShowValue~~         | moment                                                      | 键盘输入框显示值                     |
| ~~autoTriggerChange~~      | Boolean                                                     | 切换面板时是否调用 change 事件       |
| ~~dropdownClassName~~      | String                                                      | 额外的弹出日历 className             |
| ~~placement~~              | String                                                      | 弹窗对齐方式                         |
| ~~showClear~~              | Boolean                                                     | 是否显示 clearIcon                   |
| ~~showClose~~              | Boolean                                                     | 是否显示 clearIcon                   |
| ~~closeIcon~~              | ReactNode                                                   | 自定义清除图标                       |
| ~~getCalendarContainer~~   | function(trigger)                                           | 定义弹层容器，默认在 body 内新建 div |
| ~~outInputFocus~~          | (event: React. FocusEvent) => void                          | 输入框 focus 时回调                  |
| ~~onDateInputBlur~~        | (event: React. FocusEvent) => void                          | 输入框 blur 时回调                   |
| ~~outInputKeydown~~        | (event: React. FocusEvent) => void                          | 键盘按键回调                         |
| ~~onHoverChange~~          | Function(date: moment)                                      | 日期被选中的回调                     |
| ~~dateCellRender~~         | Function(currentDate: moment, today: moment) => React. Node | 自定义 date cells 渲染函数           |
| ~~monthCellContentRender~~ | Function(currentDate: moment, today: moment) => React. Node | 自定义 month cells 渲染函数          |
| ~~renderFooter~~           | Function(currentDate: moment, today: moment) => React. Node | 额外页脚                             |
| ~~renderError~~            | () => React. Node                                           | 错误提示                             |
| ~~renderSidebar~~          | () => React. Node                                           | 侧边栏                               |

### fieldid 场景说明

| 场景                          | 生成规则说明              | 版本  |
| ----------------------------- | ------------------------- | ----- |
| 根元素                        | fieildid                  | 4.3.0 |
| 清空 icon                     | fieldid + "\_clear"       | 4.3.0 |
| 日历 icon                     | fieldid + "\_suffix"      | 4.3.0 |
| DatePiker 日期 input 框       | fieldid + "\_input"       | 4.3.0 |
| RangePicker 开始日期 input 框 | fieldid + "\_start_input" | 4.3.0 |
| RangePicker 结束日期 input 框 | fieldid + "\_end_input"   | 4.3.0 |
| 弹出面板                      | fieldid + "\_panel"       | 4.3.0 |

### Moment.js

相关的文档地址 [http://momentjs.cn/docs/](http://momentjs.cn/docs/)

---

##### 以下整理了一些常见问题和答复

---

### 格式化

```javascript
var moment = require('moment');
moment().format(); // "2014-09-08T08:02:17-05:00" (ISO 8601)
moment().format('YYYY-MM-DD'); // "2018-08-08"
moment().format('dddd, MMMM Do YYYY, h:mm:ss a'); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format('ddd, hA'); // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD'); // "Invalid date"
```

### 设置语言 (全局)

```javascript
moment.locale('en'); // 英文
moment.locale('zh-cn'); // 中文
```

### 设置语言 (局部)

```javascript
moment().locale('en'); // 英文
```

### 设置每周第一天 4.5.2+

```javascript
moment.locale('zh-cn', {week: {dow: 1}}); // 周一为第一天
```

### 设置时区 4.5.3+

1.使用时区时间，传值的时候建议使用 Moment 对象，使用字符串不能表示唯一时间，会造成困扰；<br/> 2.对于传入的字符串时间，我们默认为用户选择时区而非系统时区的时间。

### 国际化

DatePicker 国际化时，部分 locale 是从 moment 中读取，所以需要先设置 moment 的 locale

```js
import moment from 'moment';
moment.locale('en'); // 设置为英文
```

### 已支持的键盘操作

| 按键               | 功能                     |
| ------------------ | ------------------------ |
| esc                | 关闭面板                 |
| Tab                | 切换 active 的面板       |
| ↓(下箭头)          | 打开面板                 |
| ←↑↓→(上下左右箭头) | 面板键盘操作时切换选中项 |

### 指定了 DatePicker/RangePicker 的 mode 属性后，点击后无法选择年份/月份？

在业务开发中，你可能有年份、月份、周范围选择等需求，此时你给现有组件增加了 `mode` 属性，却发现无法进行点击选择行为，面板也不会关闭。如果给面板添加 `disabledDate` 也不会禁用对应的年、月、周。
这是因为 `<DatePicker mode="year" />` 不等于 `YearPicker` ， `<RangePicker mode="month" />` 不等于 `MonthRangePicker` 。 `mode`

属性是为控制面板展现状态而添加的属性，以支持时间面板等需求而添加的。 `mode` 只会简单改变当前显示的面板，不会修改默认交互行为（如 DatePicker 依然是点击日期才会完成选择并关闭面板）。 同样的， `disabledDate`

对于任何 `<DatePicker />` 也只会针对**日面板**生效，并不会对 `<DatePicker mode="year/month" />` 上的年/月面板生效。
**解决办法**
你可以利用 `mode` 和 `onPanelChange` 等方法自行封装一个 `YearPicker` 等组件。

### 指定了 RangePicker 的 locale 属性，ranges 预设快捷选项未切换多语？

在业务开发中，你可能希望 ranges 的快捷选项语言随 locale 变化。实际上，你可能已经发现，快捷按钮展示的内容即 ranges 对象的 key，如需切换多语，你只需在**locale**切换时修改**ranges**属性的 key
为对应多语。
**解决办法**
你可以在 `locale` 切换时传入对应多语的 `ranges` 属性。
