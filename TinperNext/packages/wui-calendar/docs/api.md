# 日历 Calendar

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。可以选择日历

## API

### Calendar

<!--Calendar-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|value|输入框当前的值|moment||
|defaultValue|输入框默认的值|moment||
|defaultType|默认渲染类型：小时显示／日期／月份（hour/date/month）|string|date|
|type|面板的类型：小时显示／日期／月份（hour/date/month), hour仅在多选下适用|string||
|onPanelChange|面板切换的回调函数|function(type)||
|fullscreen|铺满显示|bool|false|
|monthCellRender|月份显示回调函数|function||
|locale|多语|string|en_us|
|dateCellRender|日期显示回调函数|function||
|disabledDate|不可选择的日期,目前支持预制一种string类型beforeCurrentDate|string/(currentDate: moment) => boolean||
|monthFullCellRender|月份内容渲染回调函数|function||
|dateFullCellRender|日期内容渲染回调函数|function||
|mutiple|是否多选|boolean|false|
|dateCellHeaderReader|mutiple=true生效，日期内容header部分渲染回调函数|function||
|onSelect|日期选中回调函数|Function(date: moment)||
|onChange|日期更改回调函数|Function(date: moment)||
|headerRender|自定义头部内容。mutiple=false时将覆盖整个头部区域；mutiple=true时，结合operations属性在头部特定区域内展示，设置operations为[]，将覆盖整个头部区域|function(date: moment): ReactNode||
|onYearChange|支持监听年份切换，可以进行切换前阻断|function|-|
|getDateCellAttr|设置自定义日期属性，根据设置条件，为对应节点添加属性、事件等|(current: moment, value: moment) => object|-|
|fillSpace|铺满父元素空白区域|bool|false|
|fieldid|组件内元素标识, 推荐自动化测试使用|string|-|
|quickSelect|mutiple=true生效，设置允许快选（包括横选 竖选），默认的竖选 为当前窗口日期之后到本年末的同列日期，可传入数字类型 修改 竖选的行数|bool/number|false|
|onQuickSelect|mutiple=true生效，快选的回调,在回调中可二次修改规则设置应该选择的日期|func|false|
|defaultScrollIntoValue|mutiple=true生效，初始化时默认呈现在日历区域的起始月份(滚动条位置)|moment|当前时间月份|
|scrollIntoValue|mutiple=true生效，控制在日历区域的起始月份(滚动条位置)|moment|当前时间月份|
|layout|mutiple=true生效，控制布局显示模式, 可选 `left` `right`，为`left`时月份面板在左侧显示，为`right`时月份面板在右侧显示|string|right|
|timeEvents|mutiple=true生效，渲染事件，具体格式参照timeEvent object|EventObject[]||
|onTimeEventsClick|设置日视图中点击事件|function(e: React.MouseEvent<HTMLElement>, value: {start: string, end: string/null, content: ReactNode}, time: moment): void|-|
|showTimeLine|日维度时是否显示当前时间线|bool|true|
|operations|自定义按钮操作，内置选项包含`lastDay`，`lastMonth`，`nextDay`，`nextMonth`，`today`，`headerSwitcher`|string[]||
|markWeekend|区分周末列和工作日，对周末列添加背景色|bool|false|4.4.4|
|hourCellRender|小时显示回调函数，参数item表示一天24小时对应的整点，参数show表示是否显示与showTimeLine时间位置重合的时间|function(item: number, show: bool)|-|4.4.4|
|hourCellContentRender|小时内容渲染回调函数，参数item表示一天24小时对应的整点，参数show表示是否显示与showTimeLine时间位置重合的时间|function(item: number, show: bool)|-|4.4.4|
|weekStartsOn|以周几作为每周的第一天，0代表周日，1代表周一，以此类推|number|0|4.4.5|
|allowLunar|是否显示阴历|bool|false|4.4.5|
|sidebar|多选模式下是否显示侧边栏|bool|true|4.4.5|
|customInterval|日维度面板，自定义单元格时间间隔（注：自定义的时间间隔数必须为可以被24整除的整数）|number|1|4.5.0|
|showSingleMonth|mutiple=true生效，多选模式下，可配置月模式显示是否为单月面板，默认为多月+滚动切换方式 |number|false|4.5.0|
|bodyClassName|日历体部分（wui-calendar-schedule层）支持自定义类名  |string|-|-|
|isDragEvent|tyle为hour时生效，是否开启拖拽创建事件模式（注：下方api都是基于此属性为true时生效,并且月面板是不能同monthCellContentRender同时使用）  |boolean| false |-|
|silderModalBody|tyle为hour、date、month时生效，弹出modal的body部分自定义内容  |ReactNode|-|-|
|silderModalHeader|tyle为hour、date、month时生效，弹出modal的header部分自定义内容  |ReactNode|-|-|
|onModalOk|tyle为hour、date、month时生效，modal点击确认时的回调方法  |（callback）=> {callback()}|-|-|
|onCreateEvent|tyle为hour时生效，拖拽创建时鼠标松开时的回调方法（返回参数有创建的开始结束时间，用此事件回填silderModalBody内自定义的内容）  |（{start: '', end: '', dataFlag: '跨日、月特有参数'}）=> {}|-|-|
|disabledHoverStyle|是否禁用单元格hover时的默认样式  |boolean|false|-|
|strideValue|跨天跨月创建的事件值, 值类型：（[{startTitleValue: '2024-05-07', titleValue: '2024-05-10', dataFlag: 'calendar5', tex: '日程自定义'}，...], startTitleValue事件开始时间，titleValue事件结束时间，dataFlag事件唯一值，tex事件内容）  |Array|-|-|
|onCellClick|点击已创建事件的回调，配合moreRender回调使用，根据onCellClick回调的第二个参数创建出要显示在弹窗内的内容，根据onCellClick回调的第三个参数，将弹窗内容添加到哪一天  |(event, {startTitleValue:'事件开始时间'，titleValue：'事件结束时间'， tex: '时间内容'}， date: '点击的单元格日期') => {}|-|-|
|onMoreEvent|点击剩余事件的回调，配合moreRender回调使用，根据onCellClick回调的第二个参数创建出要显示在弹窗内的内容，根据onCellClick回调的第三个参数，将弹窗内容添加到哪一天  |(event, [{startTitleValue:'事件开始时间'，titleValue：'事件结束时间'， tex: '时间内容'}, ...]， date: '点击的单元格日期') => {}|-|-|
|moreRender|点击事件或者更多时，添加弹窗内容的函数，参数为每天或这每月的moment对象，根据onCellClick或者onMoreEvent返回的date参数确定把内容添加到哪一天、月  |(current) => {}|-|-|
|isEditEvent|是否可拖拽改变已创建事件的起止时间  |boolean|false|-|
|cellAdaptHeight|高度根据父级高度自适应（注：和fillSpace属性一起使用，先保证组件整体撑满父元素在做单元格高度自适应，区别于fillSpace，fillSpace单元格高度固定根据行数填充满父元素，此属性单元格会随父元素高度变化）  |boolean|false|-|
|isShowWeek|是否显示周面板  |boolean|true|-|
|createAdd|日维度全天事件上面添加自定义内容  |ReactNode|-|-|

### Calendar.timeEvent

<!--Calendar.timeEvent-->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|start|事件开始时间, 要求可以被moment识别， 例如：1666778784363（number类型时间戳），'2022/12/12 01:01'（string类型）|string/number||
|end|事件结束时间, 要求可以被moment识别， 例如：1666778784363（number类型时间戳），'2022/12/12 01:01'（string类型）|string/number||
|content|事件描述|ReactNode||

## 以后将废除的api

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|calendarType|支持切换历法，目前内置民国历和公历 roc/gregory  |string|gergory|4.6.5|
|onTypeChange|面板切换的回调函数, 建议使用onPanelChange|function(type)||
|dateCellContentRender|日期内容渲染回调函数, 建议使用dateFullCellRender|function||
|monthCellContentRender|月份内容渲染回调函数, 建议使用monthFullCellRender|function||