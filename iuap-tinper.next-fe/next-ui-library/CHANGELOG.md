<!-- [ 修复 ][ 新增 ][ 更新 ][ 移除 ][ 重构 ] -->

## v15.2.12
#### 更新时间：2025-01-10

- 全局
  - [新增] 表单输入类组件统一清空图标
  - [新增] 表单输入类组件支持统一主题，新增下划线模式及必填样式，支持ConfigProvider配置bordered='bottom'
  - [新增] 弹出类组件支持zoom缩放

- Table
  - [修复] 修复表头colspan存在值没有拖拽抓手的问题
  - [修复] 修复小计合计精度为0不生效的问题
  - [修复] 修复快速滚动下行绑定监听事件未释放导致的内存泄漏问题
  - [新增] 表格单列定位支持用户自定义匹配条件，适配自定义单元格内容情况
  - [调整] 更改单列过滤判断逻辑，显示和搜索匹配一致
  - [修复] 修复最后一列设置不显示表格列宽显示异常的问题

- Tabs
  - [修复] 页签宽度不足时闪烁问题处理
  - [修复] 更多按钮弹出位置错误
  - [优化] card类型包裹fill-line类型样式优化

- Progress
  - [新增] 分段步骤支持配置每一段提示信息
  - [修复] 进度条百分数被遮挡问题处理

- Drawer
  - [新增] 抽屉不显示遮罩层时底层可操作

- Cascader
  - [修复] 级联分组清空逻辑显示问题修复

- Popover
  - [新增] 支持拖拽面板尺寸

- Calendar
  - [新增] 日历日模式增加滚动事件回调

- Select
  - [优化] 下拉组件字体使用DTS变量
  - [修复] 拖拽热区纵向拖拽区域失效问题

- Rate
  - [新增] 支持评分组件把数值转成系统格式展示
  - [优化] 提示信息支持非字符串格式

- Tree
  - [优化] 父级节点禁用时支持点击节点展开，扩大可点击展开范围
  - [优化] 支持用户自定义loadBuffer范围
  - [修复] 更新treeData未及时渲染问题
  - [修复] 双树模式拖拽状态未隔离问题

- Menu
  - [修复] 修复子菜单SubMenu组件使用装饰器导致实例丢失问题

- TreeSelect
  - [修复] api文档错乱问题
  - [修复] 拖拽热区纵向拖拽区域失效问题

- ErrorMessage
  - [优化] 支持通过provider全局配置多语

- Layout
  - [修复] Spliter组件展开收起提示抖动问题

- Button
  - [优化] 设置maxWidth属性支持显示title

- Dropdown
  - [调整] 下拉最大高度支持根据绑定区域自适应
  - [修复] 用户传入max-height时下拉闪动一次问题
  - [修复] 适配RTL后未接收传入的placement导致位置错误问题
  - [修复] 滚动条背景色透明导致弹框面板后文本可见问题

- Icon
  - [新增] 新增独立的iconfont-rtl文件
  - [新增] 新增5个图标（居中、当前、紧凑、标准、宽松）
  - [更新] 更新2个图标（组展开、组收起）

- Modal
  - [修复] 多语时单词被截断问题
  - [修复] 实例方法调用时footer: null仍显示问题取消、确定问题
  - [修复] 弹框未focus导致点击enter时查询区被误触发问题
  - [修复] RTL时定位没生效问题

- Notification
  - [修复] 传入placement不生效问题

- Form
  - [新增] 支持自定义组件使用FormItem样式

- ConfigProvider
  - [新增] 增加getConfig钩子获取全局config

- Textarea
  - [修复] 初始化只有maxRows时报错问题

- DatePicker
  - [优化] 依赖包rc-picker更新为@tinper/rc-picker，避免用户打patch失败问题
  - [优化] RangePicker的focus状态输入框文字颜色调整
  - [修复] 用户传入open为undefined时，面板open状态丢失导致无法选中日期问题

## v4.6.6
#### 更新时间：2024-11-15

- 全局
  - [新增] 统一主题，新增requiredStyle，线性模式透明背景黄色下划线，面性模式黄色背景
  - [新增] 支持阿拉伯语rtl布局
  - [调整] 打包模式改用soucemap 模式，去除 dev.js 文件
  - [优化] 组件font-family统一来源为DTS

- ConfigProvider
  - [新增] 支持配置dir属性为rtl/ltr

- Tabs
  - [优化] editable包裹fill-line样式背景优化
  - [优化] 在active态时也显示禁用效果
  - [优化] 页签样式圆角统一

- Cascader
  - [修复] 适配label传React.Node类型的数据的适配
  - [修复] 搜索选择项之后组件render，搜索内容不清空问题处理
  - [修复] 选项是第一个页签显示变更问题处理
  - [新增] 级联分组异步显示第二项问题

- Calendar
  - [新增] 日维度事件接受ReactDom类型

- Collapse
  - [修复] 包裹折叠箭头位置错位问题处理
  - [修复] 一二级折叠没有箭头时，标题错位问题处理
  - [修复] 传id导致a标签默认样式显示问题

- Progress
  - [修复] 标准进度条，将宽度设置100%
  - [修复] success状态是外层overflow：hidden遮挡百分数问题处理

- SvgIcon
  - [新增] 支持fontFamily属性加载自定义图标资源

- Locale
  - [修复] provider多层嵌套时，locale解构错误问题

- Form
  - [优化] 报错时，左上角的小三角统一改圆角为0的效果
  - [修复] form校验错误时cascader 无红色边框问题

- Modal
  - [优化] 限制左上角、右上角、上边线的拖拽能力，避免header区域被遮挡无法移动
  - [修复] 用户props更新后窗口最大化状态丢失的问题

- Notification
  - [修复] message挂载的节点刷新后实例仍存在，导致不再显示新消息的问题

- Input
  - [调整] Input.search点search按钮，回调改为仅触发onSearch不触发onBlur回调
  - [修复] 字数超长时中间或结尾删除的bug

- Select
  - [修复] select清除按钮背景问题
  - [新增] 根据容器宽度设置tag 最大宽度 多选时至少显示一个

- Message
  - [优化] 错误提示message增加maxHeight

- InputNumber
  - [修复] 小数点和千分位未接受props更新问题
  - [调整] 不支持用户传入onMouseEnter/onMouseLeave

- TreeSelect
  - [修复] 多选模式下拉箭头消失问题
  - [修复] 多选模式文字颜色与单选保持一致

- Tree
  - [调整] 展开箭头图标增加悬停背景色
  - [调整] 展开箭头默认白色背景色去除
  - [修复] 背景色通栏样式特定场景不起作用问题

- ErrorMessage
  - [调整] 内容高度由原来的屏幕高度60%改为自适应屏幕高度

- Dropdown
  - [调整] 下拉按钮弹层间距去除

- Layout
  - [修复] 分割线Spliter固定按钮多语未翻译问题

## v4.6.5
#### 更新时间：2024-09-27

- 全局
  - [新增] 异常ErrorMessage组件
  - [调整] 移除eot、ttf、woff2字体文件
  - [调整] 移除player组件
  - [调整] moment移除en-au多语包
  - [调整] 移除NCC、营销云、华新丽华的主题文件
  - [调整] 使用source-map打包模式，制品去除dev.js文件

- Calendar
  - [新增] 日维度事件起止时间可拖拽
  - [新增] 自定义日事件类名及全天上方添加自定义dom
  - [新增] 单元格高度自适应
  - [新增] 控制是否显示周面板
  - [优化] 日历左上角标题样式优化
  - [优化] 平铺模式日历，日月年面板头部和body距离一致
  - [调整] 移除calendarType属性和moment-taiwan包，不再支持民国历

- Collapse
  - [新增] 折叠面板增加一二级折叠类型
  - [优化] list与card类型折叠支持ghost属性
  - [优化] 折叠面板内容部分清除浮动

- Drawer
  - [优化] 头部布局方式更改为flex布局

- Cascader
  - [新增] 平铺模式页签默认展示第二项功能底层支持
  - [优化] 级联字体添加变量

- Progress
  - [修复] 不显示进度条文本及状态图标时宽度占位问题

- Tooltip
  - [修复] 防止两个弹层之间状态相互影响

- Upload
  - [修复] 图标数据类型被强制转化问题

- Tabs
  - [修复] 页签头部信息数据全部替换，多页签下拉内容数据没更新问题
  - [新增] 页签增加新类型
  - [修复] line类型包裹fill类型样式兼容
  - [修复] 嵌套页签，子页签右键触发两次下拉内容问题修改

- Dropdown
  - [修复] 下拉按钮disabled状态下不显示tooltips提示问题
  - [调整] 下拉面板选项背景改为通栏，不留左右边距
  - [修复] 下拉按钮配置overlayMaxHeight属性无法自适应弹出位置问题
  - [修复] align属性无法自适应问题

- TreeSelect
  - [修复] 底部footer抖动问题处理

- ConfigProvider
  - [新增] 支持全局配置direction

- Tree
  - [新增] 支持外部传入关键词后，隐藏不相关数据，仅展示搜索数据
  - [新增] 树节点新增dragInitialState属性，用于控制拖拽过程中父级节点是否自动展开收起
  - [优化] 树节点支持背景色全覆盖
  - [优化] 树配置checkKeys外部状态更新卡顿问题优化
  - [调整] key字段支持数字类型
  - [调整] 展开图标ynf变量调整

- Pagination
  - [新增] 支持极简分页模式
  - [修复] 滚动条样式不一致问题
  - [修复] current未更新为用户props的问题
  - [修复] 分页大小调整后，用户回调同样的pageSize，props未更新导致页码错误的问题

- Layout
  - [修复] Spliter组件收起/展开按钮提示支持多语

- Select
  - [修复] options模式原数据被篡改问题
  - [修复] ts支持自定义options类型
  - [修复] 兼容下拉open属性设置undefined的情况

- Tag
  - [新增] 语义色标签支持填充和描边两种方式

- ErrorMessage
  - [新增] 异常提示默认属性支持全局配置
  - [新增] 支持fieldid

- DatePicker
  - [新增] 边框的圆角，增加变量控制，与选中背景的变量一致
  - [优化] 清空图标单独占位，active的输入框加背景色
  - [调整] linkedPanels默认值改为false
  - [优化] 确保左侧间距与其他组件保持一致，均为8px
  - [修复] 季度hover时文字移动问题
  - [修复] RangePicker主动调用onChange时activePresetLabel未更新问题
  - [修复] 一个自动校正后变Invalid date的场景
  - [修复] 自定义header无背景色
  - [修复] 月份区间选择时抖动问题

- Modal
  - [新增] 拖拽功能优化，不允许header区域全部被拖出可视区
  - [修复] close尺寸由zoom改为transform: scale
  - [新增] content支持服务端返回\n换行

- InputNumber
  - [修复] 前置0时mark错误问题
  - [修复] collapse组件下，高度与其他组件不一致导致布局混乱问题
  - [修复] showMark时点击未聚集问题

- Form
  - [修复] cascader多选缺必填样式问题
  - [修复] Form下Cascader的placeholder字体较粗问题
  - [优化] error时border由2px改为1px + box-shadow

- Input
  - [修复] Textarea的value传入null时角标显示错误问题
  - [修复] Textarea的focusSelect为true时，onFocus未回调问题
  - [优化] Textarea.autoSize优化，减少重绘的性能问题
  - [修复] Textarea文本框有角标时多余滚动条问题
  - [修复] 输入框focus状态时点击clear按钮，回调event为空问题

- Message
  - [新增] 提示信息，鼠标hover时暂停计时，不消失，鼠标移出后继续计时
  - [新增] 支持服务端返回\n换行

- Empty
  - [修复] 自定义多语时显示中文问题

- Icon
  - [新增] 图标：高级查询

- Checkbox
  - [新增] 多选框组新增button模式并支持maxcount超出显示下拉框
  - [优化] 优化size的默认尺寸大小、优化样式
  - [修复] 修复改变数据源之后选择项和传入的value不匹配的问题

- Radio
  - [优化] 优化size的默认尺寸大小、优化样式

- Table
  - [新增] 默认树形数据有children就展示展开收起按钮
  - [新增] 内置序号列默认居中对齐
  - [修复] 修复findRowKeys行选中色某些情况下未清除的问题
  - [修复] 修复多列表头下展开图标列占据最大行数，且固定列错位的问题
  - [优化] 过滤列筛选匹配忽略大小写规则
  - [优化] 内置序号列扩展配置，默认不显示锁定图标
  - [修复] 修复多列表头rowspan复制导致高度问题
  - [新增] 表格框选点选支持右键操作
  - [优化] 优化表格框选点选边框和背景色
  - [优化] 优化表格内置分页上下边距大小

## v4.6.4
#### 更新时间：2024-07-12

- Calendar
  - [新增] 日历组件添加周模式
  - [修复] 渲染跨年创建的事件问题已解决

- Tabs
  - [优化] 多页签下拉内容适配实时翻译，dom上添加langid字段

- Tooltip
  - [新增] 添加api控制动态调整弹层高度，不遮挡触发元素

- Clipboard
  - [新增] 剪切板支持异步获取文本复制

- Spin
  - [修复] 加载组件时，不向body上添加类名问题已解决

- Table
  - [修复] 修复偶发情况拖拽列不生效的问题
  - [优化] 无展开行避免不必要的dom渲染，优化性能
  - [新增] 支持增加空白列指定列位置
  - [修复] 修复某些情况指定行高亮不生效问题
  - [修复] 修复表头筛选数据，数据显示不准确的问题
  - [新增] 支持表格单元格框选、点选、复制功能

- Radio
  - [优化] 优化无内容情况样式显示

- Select
  - [优化] 下拉面板高度支持自适应可视区域高度
  - [修复] placeholder 字段过长渲染问题已解决

- Tag
  - [调整] 默认语意色标签样式调整，并增加start/invalid 两种语意色

- TreeSelect
  - [修复] 下拉面板resizable状态数据较少情况footer区域不吸底问题已解决

- Modal
  - [修复] 默认工作台挂载点下个别场景不居中问题已解决

- Input
  - [优化] Textarea避免不必要重绘，优化性能

- Messsage
  - [新增] 支持message实例修改config中的duration配置

- DatePicker
  - [新增] RangePicker开始、结束时间面板支持传入不同的默认值

## v4.6.3
#### 更新时间：2024-06-14

- 公共
  - [修复] Number原型链的toFixed被修改的问题已解决

- Tabs
  - [修复] 页面使用visibility:hidden隐藏时，页签项获取不到标题的问题已修改

- Progress
  - [修复] 当success内percent配置为0时，进度条显示问题已处理

- Steps
  - [修复] 步骤条arrow类型样式问题已修复
  - [修复] 步骤条在可放下宽度内全部展示的问题已解决

- Calendar
  - [新增] 支持跨时间段拖拽创建任务
  - [新增] 自定义右肩内容
  - [新增] 禁用默认hover样式
  - [新增] 支持跨天、跨月拖拽创建任务
  - [新增] 多选模式支持disabled状态，可查看下级信息
  - [优化] 支持自定义行内样式

- Table
  - [新增] 支持配置显示高亮行
  - [新增] 支持配置最后一列添加空白列
  - [优化] 统一表格树形数据展开收起图标
  - [修复] 表头筛选框无法输入值问题已修复
  - [修复] 表头合并列鼠标移入移出文字对齐不一致的问题已解决
  - [优化] 单元格内置功能渲染货币类型样式超出优化
  - [修复] 缓存列属性设置后显示异常的问题已解决

- Tree
  - [调整] 节点由原来点击选中调整为点击展开
  - [新增] 增加expandOnClickNode api用于控制节点点击展开热区，默认为true，设置为false后点击节点只选中
  - [修复] checkbox禁用时悬停出现红框问题已解决

- Layout
  - [修复] 子组件Spliter同时更新primary和direction时，固定面板size未重置问题已解决

- Tooltip
  - [优化] 减小箭头offset，避免箭头指示小图标不准确问题已解决

- InputNumber
  - [新增] 增加数量级单位配置项，以便于提升金额或数量过大时的识别性

- Modal
  - [修复] 自定义footer按钮较多时溢出问题已解决
  - [新增] 增加动画

- Message
  - [新增] 增加动画

- Input
  - [优化] Textarea增加padding

## v4.6.2
#### 更新时间：2024-05-17

- Table
  - [新增] 表格列过滤弹框快速筛选功能
  - [新增] 支持表格列过滤后端过滤交互
  - [新增] 新增表格列过滤已筛选区域展示
  - [修复] 大数据模式对展开属性expandable的兼容情况
  - [修复] 单列定位搜索0搜索异常的问题
  - [修复] 表格处于隐藏的时候重新计算高度宽度等判断滚动条引发滚动条异常的问题
  - [修复] 表格表头多选框样式问题

- Input
  - [修复] 输入框组件的ref暴露统一的dom以便使用

- Modal
  - [修复] 工作台选择数据点击重新生成事项分录，确定后打开的任务进度弹窗最上方显示不全
  - [修复] ConfirmModal自定义footer顶部有一条横线

- InputNumber
  - [修复] focus时value传入不符合精度的数值，显示错误的问题

- ColorPicker
  - [新增] 增加输入框校验，限制输入的内容

- Form
  - [修复] formitem的class末尾多了一个空格

- Icon
  - [新增] （钉住、停用、清除筛选）等图标

- Switch
  - [优化] 组件手柄的尺寸，缩放时以圆心为中心

- Steps
  - [优化] 箭头步骤条样式

- Typography
  - [修复] 内容包含多类型节点导致计算误差问题
  - [修复] 最后节点渲染被转换object字符串出现截取错误问题

- Select
  - [新增] 支持mdf获取搜索过滤后的options
  - [修复] rc-select补丁逻辑赋值运算符兼容问题
  - [修复] 键盘事件阻止冒泡导致其他组件键盘事件失效问题

- Layout
  - [新增] Spliter分割器支持用户级切换挤占/浮层2种模式

- TreeSelect
  - [新增] resizable状态增加footer区域，实现始终吸底的效果
  - [修复] 非虚拟加载状态滚动轮样式未修改问题

- Button
  - [优化] 最大宽度设置代码性能优化

- Tabs
  - [修复] 多页签类型切换时样式问题处理
  - [修复] 页签头部使用标签导致active字体颜色问题错误处理
  - [修复] 内存泄漏问题

- Datepicker
  - [修复] 空值按Enter键时不添加值
  - [修复] 点击清空图标之后失去焦点

- Upload
  - [修复] 拖拽上传 container层添加fieldid

- Breadcrumb
  - [修复] 父级宽度非常小时，所有项收起

- Calendar
  - [优化] 单元格今天改为数字

- Cascader
  - [修复] 暂无数据多语配置

- Timepicker
  - [修复] 大小写错误问题处理

## v4.6.1
#### 更新时间：2024-04-16

- Table
    - [修复] 修复列设置隐藏某些情况下不生效导致表格错位的问题
    - [修复] 修复隐藏列在过滤弹框不显示的问题
    - [修复] 修复某些词条多语翻译问题
    - [修复] 修复翻页序号列未监听变化的问题
    - [修复] 修复某些情况切换单选多选后同时出现单选和多选框的问题
    - [修复] 修复表格全选框的显示状态问题
    - [优化] 优化行销毁时候回调函数onExpandedRowsChange执行次数
    - [修复] 切换页签表格宽度闪烁问题
    - [优化] 优化表格多选选中半选禁用的显示状态
    - [优化] 解决缓存列的顺序问题并优化存储提高性能
    - [优化] 优化表格的部分UI样式
    - [优化] 列锁定超过可视区域会暂时解决锁定状态并提示
    - [新增] 新增列提示Tip图标添加
    - [优化] 优化固定列阴影展示
    - [新增] 新增支持列配置精度
    - [新增] 过滤列icon新增fieldId

- Swicth
    - [修复] switch阴影样式bug

- Modal
    - [修复] confirmModal内存泄漏问题
    - [修复] Modal组件修复嵌套的弹窗最大化时位置偏移

- Form
    - [修复] FormItem使用Cascader字号样式错误问题

- Icon
    - [新增] 卡片、删除 两个图标

- Notification
    - [修复] 设置dark时，文字颜色为黑色看不清的问题。

- Steps
    - [修复] 箭头步骤条数字不居中问题修复。

- Input
    - [优化] 下划线模式，聚焦态不显示投影。

- Select
    - [优化] 虚拟滚动条中加入fieidld
    - [优化] 给底层rc-select输入框增加透传title能力
    - [修复] placehoder样式使用工作台变量，与input 组件统一
    - [修复] 多选复选框禁用后hover边框高亮问题

- Button
    - [修复] 超出最大宽度增加title 提示兼容宽度为字符串情况

- Tree
    - [修复] treeData模式兼容expandedKeys 为null 情况

- Cascader
    - [优化] 无数据时，最小宽度样式显示
    - [优化] api文档去除onClick不存在api
    - [优化] 多选空数据显示样式处理
    - [修复] 平铺模式，清空后回到初始状态

- Calendar
    - [修复] 日历提前一天的处理

- Tabs
    - [优化] 动态添加页签用法左右翻页问题
    - [优化] 左右截断下拉关闭
    - [优化] editable-card包裹card类型页签，放大浏览器分辨率下边线消失处理
    - [修复] 删除更新下拉项
    - [修复] 内容体滚动条样式
    - [修复] editable-card多页签挤占问题修改
    - [修复] card模式页签样式优化

- Upload
    - [修复] 设置disabled属性，不可以删除

- Breadcrumb
    - [修复] QYJX-128005 工作台切换页签，没加载完dom导致组件内获取面包屑项获取的宽度都为0（display:none）计算问题


## v4.6.0
#### 更新时间：2024-03-15
- 全局
    - [新增] Typography排版组件支持多行文本省略展示
    - [修复] Chrome升级至121版本引起的组件滚动条样式错误
    - [优化] 带输入框的组件，聚焦态样式得到改进，placeholder字号现可通过变量控制

- Tree
    - [修复] 解决大数据模式下拖拽出现的卡顿问题
    - [修复] treeData模式下默认展开功能无效的问题

- Select
    - [优化] treeSelect多选框在disabled状态下悬浮时显示禁用图标
    - [修复] 自定义下拉框内按键盘退格键同时清除已选标签项的问题

- Menu
    - [修复] submenu展开箭头被长文本遮挡的问题

- Dropdown
    - [修复] 解决dropdown.button最大宽度问题，确保弹框能够正常渲染

- Table
    - [修复] expand翻页后无法自动展开的问题
    - [修复] 表格滚动事件现在会正确对外暴露参数e
    - [修复] 表格全选框显示状态的问题
    - [修复] syncHover失效的问题
    - [修复] 小计/合计针对第一列自定义渲染的处理问题
    - [修复] modal弹窗层级较高时过滤列弹窗不展示的问题
    - [优化] 多选置灰显示样式

- Tabs
    - [新增] tabs多页签现支持翻页及全部功能并存
    - [优化] 多页签下拉展示时，下拉项fieldid不会重复
    - [优化] 改进嵌套页签的样式兼容性

- Breadcrumb
    - [修复] 切换页签导致面包屑超出项下拉展示导致布局错位的问题（元素display: none变为display: block过程中计算不正确的问题）

- Datepicker
    - [修复] 时间面板面板弹出位置错误的问题
    - [修复] 时间输入年份后再通过鼠标选择月份操作未选上值的问题
    - [修复] focus状态下，内部使用wui-input样式的问题
    - [优化] 日期焦点态样式

- Calendar
    - [新增] 新增下拉选择日期时的回调方法onSelectChange
    - [优化] 日维度面板，在创建15分钟内事件时的高度显示问题

- Upload
    - [修复] 上传时图片路径找不到显示的问题

- Modal
    - [修复] 弹框弹出后切换其他页面再切换回来时弹框整体向右移位的问题
    - [修复] 触屏事件穿透到父级导致弹窗关闭的问题
    - [修复] 多重嵌套弹窗部分场景未居中的bug
    - [修复] confirmModal内存泄漏问题

- Icon
    - [新增] 目录和图片上传失败两个图标

- Input
    - [修复] textarea样式border-radius错误问题
    - [修复] textarea背景色在某些情况下显示错误的问题
    - [修复] 密码框在密码不可见时input不应该显示value属性的问题
    - [修复] 输入框变为圆角时border-radius错误的问题

- Image
    - [优化] 工具栏样式以及常用功能位置
    - [修复] 点击还原后尺寸值未还原的问题
    - [修复] 多语词条未翻译问题以及在ConfigProvider下无法获取多语的问题

- Message
    - [新增] 文字变量和修改图标变量，便于用变量调整组件默认样式

- Form
    - [修复] form表单提示信息tooltip位置错误的问题

## v4.5.5
#### 更新时间：2024-01-19
- 全局
    - [优化] 完成全部组件的designtoken样式变量映射
    - [新增] 输入框相关组件增加title属性

- Button
    - [新增] 默认增加最大宽度限制，以便于国际化场景限制按钮宽度（block模式没有最大宽度）
    - [优化] 文字展示不全显示title

- Cascader
    - [优化] fieldNames增加fieldid属性以便控制options项上的fieldid
    - [新增] 级联平铺显示场景需求
    - [优化] 级联面板自适应内容宽度
    - [修复] 平铺模式支持懒加载
    - [优化] 平铺数据添加NoSelected字段，有此字段选项不可选（特定场景需要）

- Colorpicker
    - [新增] 手动输入颜色后，打开选择器时定位到当前颜色

- Checkbox
    - [优化] 默认样式优化

- DatePicker
    - [修复] 下拉内容年月定位位置问题
    - [优化] 通过直接修改结束时间进行确认
    - [修复] 多语月份解析失败时兼容处理
    - [修复] 年份下拉展示不全处理
    - [修复] 界面缩放90%时，日期组件弹层显示不对问题

- Form
    - [修复] form校验失败时2px边框,导致表单布局异常问题以及高度变化产生的抖动

- Input
    - [修复] 键盘事件冒泡到Menu时，输入框左右键无法移动光标位置
    - [修复] 中文超过限制依然可以输入问题， 以及表情字符长度计算错误问题
    - [修复] 输入中文时,外部设置value,内部显示空字符串的问题
    - [修复] Form中input使用中文输入法会自动收起无法输入的问题

- InputNumber
    - [修复] 输入框在某些场景光标不闪动问题
    - [修复] 设置thousands千分符时，输入光标位置会自动到最后一位
    - [修复] 数值输入0时,toNumber未生效,回调value是字符串0

- Layout
    - [优化] Spliter拖拽分割器，拖拽热区范围调整
    - [优化] Spliter展开收起按钮位置调整
    - [新增] 内置上下折叠的分割线渐变样式,折叠按钮和分割线样式优化

- Popover
    - [修复] 上下左右箭头位置居中

- Modal
    - [修复] 在某些情况下设置draggable，最大化按钮点击不生效
    - [修复] 补充keyboard属性enter按键的处理
    - [修复] 设置了centered，弹窗内容宽高改变时未重新居中的问题
    - [修复] ConfirmModal按Esc关闭时未触发onCancel的回调
    - [修复] 键盘Esc关闭微信多层窗口，会触发关闭Modal

- Pagination
    - [新增] 增加cacheId属性

- Radio
    - [优化] 默认样式优化

- Select
    - [新增] select、treeselect支持仅纵向、横向拖拽
    - [优化] select和treeselect组件的下拉图标引用不一致问题
    - [优化] Select多个组件中均在使用的下拉面板，增加边框 统一阴影参数
    - [修复] rc-select 可选连报错
    - [修复] 改变自定义后缀图标不生效
    - [修复] select多选模式中间区域选择不到的问题
    - [修复] border-width变化select高度问题

- Switch
    - [修复] 不受configProvider控制的问题

- Table
    - [修复] 表格样式对嵌套子表格样式污染问题
    - [修复] 表格过滤列图标对最后一列文字遮挡的问题
    - [修复] defaultExpandAllRows不生效的问题
    - [新增] 过滤列弹窗自适应调整
    - [修复] 多选框存在行点击触发两次的问题
    - [修复] rowKey不传index下标逻辑错误树形数据hover按钮显示多个行的问题
    - [优化] 表格行高、过滤图标、滚动条等样式显示
    - [新增] 表格内置新增合计行
    - [优化] 表格全选/取消性能
    - [修复] 缓存列操作属性的一些问题
    - [修复] 表格多选单选部分api返回值不正确的问题
    - [修复] fillSpace增加对父级dom的size变化的监听

- Tabs
    - [修复] 可拖拽页签多页签时下拉项问题处理

- Tag
    - [修复] demo可删除标签问题

- Transfer
    - [优化] 当前列表没有可以选择的条目时 全选按钮应置灰
    - [新增] 穿梭框operations属性可设置index控制按钮排序

- Tree
    - [修复] 拖拽时线段反复跳跃问题
    - [修复] 树滚动加载最后一屏计算错误
    - [调整] 展开收起图标样式修改

- Treeselect
    - [优化] 滚动条紧贴右侧，扩大内容区域

- Upload
    - [修复] 拖拽上传文件夹统一返回fileList
    - [新增] 只要可拖拽添加回调事件
    - [修复] 频繁显隐upload的时，导致不上传问题处理
    - [修复] 大文件上传进度条显示完成时机问题处理

## v4.5.4
#### 更新时间：2023-11-24
- 全局
    - [新增] 统一designtoken样式变量映射,以便于多主题切换,文字变量以及Select,Cascader,Tree,Radio,Datepicker,Timepicker等组件样式变量开发完成
    - [优化] 滚动条样式统一优化

- Table
    - [新增] 新增拖拽列宽交互类型，以便于列数较少时不出现滚动条
    - [新增] 新增表格行拖拽回调函数
    - [新增] 单选/多选回调函数onchange参数调整，增加参数事件event
    - [优化] 多个高阶组件嵌套的icon显示样式
    - [优化] 表格拖拽线滚动条，表头图标等样式调整前端样式，以便于同步设计规范，保持一致性
    - [优化] 过滤列icon的样式
    - [优化] 替换过滤列的图标及样式调整
    - [优化] 数据大于200自动开启大数据
    - [修复] 点击页面时，popmenu频繁刷新
    - [修复] 大数据模式下行hover回调函数参数错误问题
    - [修复] 多个表格同时存在暂无数据受影响的问题
    - [修复] 单列过滤过滤框全选半选样式问题
    - [修复] 嵌套子表格滚动条闪烁问题
    - [修复] 数据变化引起整个表格重绘的问题
    - [修复] 排序data为undefind报错问题
    - [修复] 某些情况下表格不存在计算fillSpace报错的问题
    - [修复] 外部columns配置width为undefind的问题
    - [修复] 表格单列过滤的一些问题
    - [修复] 解决fillSpace逻辑中父级存在padding的宽度和高度计算

- Tree
    - [新增] 增加onCheck回调中返回所有被勾选的子节点 
    - [优化] tree组件勾选性能
    - [修复] 对于树新增节点逻辑特殊判断处理
    - [修复] pos没有从头开始导致的勾选算法失败
    - [修复] tree拖拽延时出现的问题
    - [修复] fieldid 部分节点失效问题
    - [修复] 当不可放置的节点位于首尾位置 无法插入到其前后的首尾位置处
    - [修复] 在火狐浏览器下的一些体验问题
    - [修复] tree多出滚动条的问题
    - [修复] 火狐浏览器兼容样式问题

- Dynamicview
    - [新增] CreateView支持uiStore新规范（'initState', 'actions', 'effects'）
    - [新增] CreateView支持uiEvent非法格式校验{uiKey:function}

- Drawer
    - [新增] 新增Drawer.Footer子组件
    - [修复] 修复drawer遍历内容导致的问题 

- Tabs
    - [优化] 更改tabs布局方式为flex布局，自适应内容容器高度
    - [修复] tabBarStyle作用区调整为wui-tabs-bar层

- Upload
    - [新增] 作为上传组件，通过maxcount限制上传数量 ，以便于控制上传文件数量
    - [修复] 点击浏览大图点击不生效问题
    - [修复] 拖拽上传文件夹

- Cascader
    - [新增] 平铺模式级联
    - [优化] 增加多选状态极值处理
    - [修复] fieldNames增加fieldid属性以便控制options项上的fieldid

- Datepicker
    - [修复] 下拉内容年月定位位置问题
    - [修复] 修复use12Hours 不设置 panel 头部不会默认24小时机制
    - [修复] 修复IE浏览器的兼容问题

- List
    - [新增] List组件支持自定义空数据展示内容

- Select
    - [修复] 更改自定义后缀图标不生效
    - [修复] 极值模式，删除功能不生效

- Layout.Spliter
    - [新增] 开发能够配置triggerStyle，以便于折叠图标距离顶部的位置
    - [修复] resizerClassName不生效的问题

- TreeSelect
    - [优化] 异步加载搜索
    - [修复] 下拉框可以滚动，但是滚动条未正确显示
    - [修复] 在异步加载节点未触发时，搜索匹配到的节点显示为+

- Steps
    - [修复] 点状步骤条、数字步骤条配置为多步骤时样式错乱

- Image
    - [修复] 图片无法铺满屏幕时，点击播放会先变糊，然后变回原尺寸

- Modal
    - [修复] 现在Modal.Header未传maximize时，会使用Modal的

- Pagination
    - [修复] 设置pageSizeInput，失去焦点时，重复触发onPageSizeChange回调

- Input
    - [优化] textarea换行符计入总计算长度，以便于前后端规则统一
    - [优化] 输入框增加溢出省略
    - [修复] textarea达到限制字符后禁止输入,修复在中间输入，删除末尾内容的问题
    - [修复] 修复输入中文ref找不到和onchange频繁调用的问题
    - [修复] 修复输入中文无法拦截的问题
    - [修复] 修复textarea 场景中文报错问题 

- Form
    - [优化] 必填项，非必填项校验错误时，突出显示
    - [修复] form校验失败时2px边框,导致表单布局异常的问题

- Radio
    - [新增] 新增maxCount=“boolean”限制单行最大数 ，以便于控制单行超过容器宽度时显示下拉展开
    - [新增] 新增spaceSize="small、middle、large 或 number像素值"(参考Space.size)，以便于控制显示间隔
    - [优化] 优化调整样式

- InputNumber
    - [修复] 修复数值为0产生的异常问题

- Message
    - [新增] 新增API(wrapperClass)
    - [修复] 修复message不显示的问题

- Dropdown
    - [新增] 增加dropdown 内传入 verlay 属性
    - [修复] 修复显示不全的问题
    - [修复] 修复传入null 时不显示按钮文本问题

- Checkbox
    - [优化] 样式调整
    - [修复] 修复背景色显示错误问题

- Button
    - [新增] 新增深色背景文字按钮
    - [新增] 修复 新增按钮显示异常的问题
    - [新增] 新增按钮设置最大宽度，文字不允许超出，以便于多语翻译

- Local
    - [修复] 修复外部传入多语为空 本地报错情况

## v4.5.3
#### 更新时间：2023-09-08
- 全局
    - [新增] 内置静态多语单独文件
    - [新增] 默认接入工作台首选项的多语配置
    - [新增] 表单类组件后缀增加禁用态
    - [修复] 修复 全局传入的locale把内置i18n 文件覆盖的bug   
    - [修复] Tinper 在IE浏览器下报错问题

- Tree
    - [优化] 优化fieldnames 设置后 点击勾选速度提升
    - [优化] 优化外部传入全选 全选速度提升   
    - [修复] 修复 大数据模式下 子节点展开 父节点关闭后 仍然计算子节点的bug   
    - [修复] 修复tree ComponentWillReceive 内重复计算的问题   
    - [修复] 修复tree ComponentWillReceive 内重复计算的问题   

- Message
    - [新增] 新增destroyWithKey api，指定了部分key 才能被删除 
    - [新增] 组件新增transition功能   

- Radio
    - [修复] 修复options raido disabled 不生效的bug   
    - [修复] 修复radio colors和inverse 不兼容情况   
    - [修复] 修复Radio Group options时disabled不生效的问题   

- Select
    - [修复] 极值状态下，下拉选项disabled还可以删除
    - [修复] 极值悬浮显示多层结构显示异常问题

- Menu
    - [修复] 全屏模式下展开方向相反的问题

- layout
    - [优化] spliter 容器内的元素宽度超过容器本身后被截断问题
    - [修复] 悬浮支持右侧悬浮

- Modal
    - [修复] 设置maxHeight为百分比，内容过大时最大高度限制未生效问题

- Anchor
    - [修复] 页面初始化第二个页签内容预加载了，anchor项计算的宽度不对问题
    - [修复] href为空不做交互

- Affix
    - [修复] modal包裹affix时，因transform导致affix的fixed定位失效问题

- Cascader
    - [修复] 多选样式更新
    - [修复] onchage返回全路径

- Backtop
    - [修复] 样式效果更新

- Collapse
    - [修复] Collapse组件添加type属性

- Calendar
    - [修复] 多语影响样式问题

- Tabs
    - [修复] 页签存在图标时，下横线位置调整
    - [修复] 使用flex布局适配container自适应高度
    - [修复] type与tabBarStyle作用层级问题

- Upload
    - [修复] 点击浏览大图点击不生效问题

- Dropdown
    - [修复] 滚动条宽度变化导致 偶发下拉框宽度变化

- Table
    - [新增] 列过滤筛选弹框增加还原设置功能
    - [修复] 修复右上角文字遮挡bug   
    - [修复] 修复 火狐浏览器滚动回弹   
    - [新增] 表格单元格新增右键自定义操作功能
    - [修复] 各个高阶组件对children的支持问题修复
    - [修复] 单表格模式问题修复
    - [优化] 表格性能优化
    - [新增] 排序内置number/string/date排序
    - [修复] 部分样式问题修复
    - [优化] 优化单列查找显示
    - [优化] 行点击增加默认背景色

- DatePicker
    - [新增] 支持传入GMT/UTC时区，enableTimezone开启时区功能
    - [修复] 计算机时区调整后时间错误问题
    - [新增] showTime时间面板格式默认同步获取format值
    - [修复] 修改合法日期且无确认时未回调onChange问题

- Input
    - [新增] 新增trim属性，是否删除左右空格

- InputNumber
    - [新增] 支持工作台首选项格式千分位为空格
    - [修复] 无法粘贴带千分位数字问题
    - [修复] min/max配置失效问题
    - [修复] 小数点逗号变点问题
    - [修复] format被传入格式化后value导致结果变NaN问题
    - [修复] form.resetField()重置InputNumberGroup无效问题

- TimePicker
    - [新增] format默认拼接A，并区分大小写
    - [优化] 时间面板样式调整

- Form
    - [修复] label较长时tooltip图标被溢出省略问题
    - [修复] Input校验状态失效问题

- Popconfirm
    - [修复] defaultVisible不生效问题

- ColorPicker
    - [调整] label存在且required为false时，移除FormItem包装层


## v4.5.2
#### 更新时间：2023-07-14
- 全局/ConfigProvider
    - [修复] 低版本浏览器兼容 获取钉耙路径错误问题导致色系样式不能加载的问题
    - [新增] 新增全局配置 表单类组件配置border
    - [优化] form类组件右侧图标对齐
    - [新增] 全局可配置自定义多语语言翻译

- Modal 
    - [修复] 窗口resize（高度拉伸）后，最大化范围不变的问题
    - [修复] 设置resizable后，指定范围最大化错误问题
    - [优化] confirmModal标题与内容未对齐

- Pagination
    - [修复] 分页下拉框展开时没有选中态的问题
    - [优化] 自定义圆角边框时，被子元素盖住四个角的问题

- Icon
    - [新增] load（装载）图标

- Avatar
    - [新增] 头像组支持反向叠加

- Carousel
    - [新增] 走马灯支持显示左右切换箭头

- Divider
    - [新增] 分割线增加线型选择属性

- Steps
    - [优化] 调整步骤条的标题和正文间距

- Image
    - [修复] zoom不为1时，点击大图 图片不居中

- Select
    - [调整] 多选模式选中为Checkbox
    - [新增] 多选极值悬浮显示

- Layout
    - [新增]支持fillSpace=true自填充父容器

- Layout.Spliter
    - [优化] 优化拖拽过程动画效果
    - [新增] mode=on,增加挤占悬浮模式
    - [新增] 是否可以拖拽属性

- Button
    - [新增] 新增文字类按钮类型

- Calendar
    - [新增] 日历组件支持民国历  
    - [修复] 设置周起始第一天不生效的问题
    - [修复] type属性受控
    - [修复] 日面板支持fillSpace配置撑满父级

- TreeSelect
    - [修复]  window 系统treeselect 当弹出框在（上/下）方时 最（下/上）面的选项被滚动条遮挡

- Table
    - [修复] 修复多个大数据表格切换某些行高度计算不到默认为0的情况
    - [修复] 修复内置合计行出现hoverContent的问题
    - [优化] 优化表头icon样式效果
    - [修复] 修复存在合计行和纵向滚动条时hoverContent滚动的样式遮挡问题
    - [新增] 新增onSingleFilterRender，支持自定义渲染
    - [优化] 合计行的文案和样式优化
    - [修复] 表头不折行样式问题修复
    - [优化] hoverContent渲染效率优化
    - [优化] 数据没加载出来之前，noDataDom宽度为0，页面会显示出不全面的没有数据提示

- Anchor
    - [新增] 折叠锚点撑满父容器
    - [修复] 纵向锚点activeKey受控
    - [修复] 纵向折叠锚点添加展开回调函数

- Cascader
    - [新增] rc-cascader升级，并添加多选功能
    - [优化] 级联弹出层z-index提升为1200
    - [优化] 动态加载时，加载过的项不在触发loadData
    - [修复] onChange第二个参数添加
    - [修复] form中级联只读无边框问题

- Tabs
    - [优化] fade类型tabs调整

- Upload
    - [修复] 去掉文件类型校验，以保证传入base64编码可展示位图片

- Datepicker
    - [修复] rangePicker下拉解耦
    - [新增] 周第一天配置，默认获取工作台配置
    - [修复] WeekPicker样式调整导致其他日期组件样式变化问题
    - [修复] RangePicker多语环境下无法选择月问题
    - [调整] 默认时分秒由当前时间调整为0点0分0秒
    - [修复] 修复禁用态下划线样式不生效问题
    - [新增] WeekPicker默认展示增加 ·周·文本 
    - [新增] 支持越南语 
    - [新增] WeekPicker周面板样式调整 
    - [修复] RangPicker半年面板接收字符串报错问题
    - [修复] header的下拉箭头遮挡年月问题
    - [新增] 支持自定义header 
    - [修复] RangePicker解耦模式下value为空报错问题
    - [修复] RangePicker部分场景下下拉面板未解耦问题 
    - [新增] 失去焦点时增加禁用日期有效性校验

- Timepicker
    - [修复] onChange重复触发问题
    - [优化] 用户输入体验
    - [调整] 默认时分秒由当前时间调整为0点0分0秒
    - [新增] 工作台首选项format映射为showTime配置
    - [修复] 清除按钮定位导致输入框可能被遮挡问题

- ColorPicker
    - [优化] 禁用、悬浮态样式调整

- Player
    - [优化] 播放器组件UE样式优化 

- InputNumber
    - [修复] 修复禁用态下划线样式不生效问题
    - [新增] 支持自定义分隔符及工作台首选项格式
    - [修复] iconStyle='double'时数字居中对齐
    - [修复] 禁用、hover态样式问题

- Input
    - [优化] enterButton默认button倒角样式
    - [修复] Textarea enter触发两次问题

- Form
    - [修复] input dom调整后readonly无边框失效问题

## v4.5.1
#### 更新时间：2023-06-02
- 全部组件
    - [新增] 多语属性支持印尼语
    - [新增] 新增css变量于部分组件（form/input/select/treeselect/timepicker/datepicker/cascader/button/table）

- Icon
    - [调整] 图标库更新以及部分图标尺寸调整

- Steps
    - [修复] labelPlacement属性样式修复

- Table
    - [修复] 单列过滤空值的多语配置
    - [修复] 多表头次级表头隐藏不生效的问题
    - [修复] hoverContent存在纵向滚动条情况下会覆盖遮挡表头的问题
    - [修复] 多选onChange参数selectedRows不一致的问题
    - [优化] 表头功能icon图标的显示样式

- DatePicker
    - [新增] 支持时区偏移utcOffset，默认接收工作台首选项配置
    - [新增] 所有年月日时间均增加fieldid
    - [新增] ‘今’快捷按钮多语支持

- InputNumber
    - [修复] onPressEnter回调触发两次问题
    - [优化] safiri/360浏览器下前后缀addonBefore/addonAfter不在同一行问题
    - [新增] 支持无边框模式

- Calendar
    - [新增] 支持时区偏移utcOffset，默认接收工作台首选项配置
    - [修复] 中文繁体下部分翻译缺失问题

- Input
    - [新增] 支持无边框模式
    - [修复] Textarea角标背景色透明，并增加鼠标事件穿透

- ColorPicker
    - [修复] onChange回调的透明度错误问题

- Select
    - [修复] 后缀下拉箭头font-size调整导致出现滚动条问题
    - [修复]  默认css 变量 height   不生效 bug

- Tabs
    - [优化] editable-card类型页签样式变更
    - [修复] editable-card类型页签嵌套line类型页签样式冲突处理

- Collapse
    - [修复] panel组件自动收起问题处理

- Upload
    - [修复] 超长文件名字时，挤占图标位置导致图标位置错位处理

- Anchor
    - [修复] activeKey属性受控

- Modal
    - [优化] confirmModal图标尺寸样式优化
    - [修复] 最新版chrome浏览器文件选择框取消(onCancel)事件冒泡到Modal上
    - [修复] zoom引起的modal未居中问题
    - [修复] 工作台modal宽度大于屏幕时translate计算错误

- Pagination
    - [修复] total和activepage同时改变时,未正确设置当前页的问题

- Empty
    - [修复] 传入错误多语时，空状态图片和文字都显示错误

## v4.5.0
#### 更新时间：2023-05-06
- 全局
    - [新增] 钉耙支持 react 18
    - [新增] 表单类组件size支持xs/sm/md/nm/lg等
    - [新增] 表单类组件支持下划线模式
    - [新增] 日期时间组件适配工作台首选项，默认获取工作台日期时间格式、时区

- Steps
    - [优化] 组件适配more模式下容器尺寸动态改变
    - [优化] 文字过多时显示优化

- Timeline
    - [优化] 自定义图标 mode 切换时显示优化

- ConfigProvider
    - [新增] 新增暗黑主题
    - [新增] disabled属性支持input

- Icon
    - [调整] 图标库更新以及部分图标尺寸调整

- Calendar
    - [优化] 优化切换年月样式
    - [优化] 日维度面案，全天事件样式优化
    - [新增] 日模式默认定位首个事件
    - [新增] 多选模式下增加单月面板展示
    - [新增] 多选面板新增年月日下拉选择日期
    - [新增] 支持日维度面板自定义时间间隔
    - [修复] 公历转农历依赖的插件导致打包错误问题

- Tree
    - [优化] 被禁用树节点中展开收起按钮可点击

- Checkbox
    - [修复] 多个checkbox同级展示时 遇到换行时样式修复 

- Radio
    - [修复] 修复文字内容为空时 radio范围 过大

- Carousel
    - [新增] 增加dots自定义类名 dotClass

- Divider
    - [修复] 修复样式尺寸错误问题

- Treeselect
    - [新增] 新增多语功能

- Dropdown
    - [优化] 分割型按钮中间分割线透明度调整

- Menu.Divider
    - [新增] 支持dashed 类型

- Table
    - [优化] 优化表格全部禁选全选状态显示问题
    - [优化] 优化扩展行图标作为单独做固定列滚动无阴影的样式
    - [优化] 优化已选择行hoverContent背景色
    - [优化] 优化单列过滤没有字段时候的筛选条件显示情况
    - [优化] 优化singlefind查询匹配高亮
    - [修复] 修复筛选列解除筛选清除了固有的右固定列问题
    - [修复] 修复火狐存在横向竖向滚动错位问题
    - [新增] 表格新增cacheId配置，支持浏览器对列部分功能操作后的缓存
    - [修复] 修复单选多选动态传入getCheckboxProps不生效的问题
    - [修复] 修复大数据表格下currentIndex为0不滚动到顶部的问题
    - [修复] 修复表头某些情况设置fixed:true不左固定的问题
    - [修复] 修复某些情况传入分页总数不生效的问题
    - [修复] 修复多表头情况下固定列固定问题
    - [修复] 修复antdTable组件关于分页多语的适配不生效问题
    - [修复] 修复拖拽完等操作重新setState表头图标多语渲染和筛选框多余渲染的问题
    - [修复] 修复合计行hoverContent返回参数错误问题
    - [修复] 修复合计行对树形数据表格渲染的影响

- Datepicker
    - [修复] 修复失去焦点时下拉不能收起的问题 
    - [修复] 修复重复点击选择时值不能更新的问题
    - [修复] HalfYearPicker模式下disabledDate无效问题
    - [新增] showTime时默认依据format判断是否启用12小时模式
    - [新增] RangePicker picker='week'时增加选择起止日期及期间样式
    - [优化] RangePicker增加focused状态及样式

- Tabs
    - [修复] 不添加searctTab.item（children为null、undefined）时兼容处理
    - [修复] searchTabs 使用map方法加载item时，为空数组时问题的兼容处理

- Anchor
    - [新增] 增加横向多锚点，点击下拉项时新增的回调onDropDownChange"
    - [新增] 纵向锚点增加展开收起交互模式

- Upload
    - [优化] progress设置为null，不显示进度条

- Clipboard
    - [修复] 修复剪切板当text和target同时为空时不兼容问题 
    - [新增] 支持添加自定义类名

- Cascader
    - [新增]适配provider配置

- ColorPicker
    - [优化]  DOM结构优化为与FormItem一致
    - [优化] 面板alpha输入框size默认改md
    - [优化] 禁止输入中文
    - [新增] 支持多语

- InputNumber
    - [修复] style无效问题

- TimePicker
    - [修复] input的实例可能为空问题
    - [优化] 增加focus状态类名及样式

- Form
    - [修复] 校验提示tooltip样式问题

- Textarea
    - [优化] 数字角标背景色改为透明

## v4.4.5
#### 更新时间：2023-03-17
- 其他
    - [新增] 组件库适配多语改造专项
    - [新增] 构建后生成es目录 

- Tree
    - [修复] 动态加载 时第一次无法展开，必须点击两次 才能展开 
    - [修复] 大数据快速滚动节流不正确导致底部出现空白问题
    - [新增] api height设置虚拟滚动 容器高度
    - [新增] loadedKeys （受控）已经加载的节点，需要配合 loadData 使用
    - [新增] onLoad   动态 加载 时触发的事件
    - [新增] fieldNames 自定义节点 关联数据
    - [新增] 新增api blockNode 允许节点  占据一行
    - [优化] 大数据下的renderTitle性能问题
    - [优化] 兼容 treeData 中的key为数字 类型
    - [优化] treeData 中children为空数组时 仅动态加载时 会被认为存在 子节点

- TreeSelect
    - [修复] 拖拽面板边角调整宽度时 一二级节点和三级节点的文字极值变化不一致
    - [优化] resizable 拖拽面板边角调整宽度时 节点内容可能显示不全 用...表示
    - [优化] 修改 多选显示默认行为  在输入框内仅显示子节点 ==> 父子节点都显示

- ConfigProvider
    - [新增] 支持修改 组件(datepicker/timepicker)  的所有默认属性
    - [新增] 全局配置disabled 属性

- Modal
    - [新增] 通过 在 某个容器元素内添加tinper-next-role=modal-container  使Modal在 该容器内 居中显示
    - [修复] 因bounds属性传入非法选择器导致modal内部抛错~
    - [修复] Modal.confirm不支持自定义Icon的问题

- Calendar
    - [新增] 日历自适应 浏览器缩放 宽高
    - [新增] allowlunar属性 控制是否显示阴历
    - [新增] sidebar属性 控制多选模式下是否显示月份侧边栏
    - [新增] weekStartsOn属性 以周几作为每周的第一天
    - [优化] 日历样式，快选顶部选择样式
    - [优化] 兼容Antd属性 onPanelChange dateFullCellRender monthFullCellRender mode
    - [优化] 全天事件显示 只显示当前时间所在区间的全天事件

- Alert
    - [优化] 兼容Antd属性 closeText type onClose
    - [新增] 关闭alert后触发的回调函数afterClose

- Message
    - [新增] onClick属性 点击通知时触发的回调函数
    - [新增] maxCount属性 最大显示数，超过限制时，最早的消息会被自动关闭
    - [新增] key属性 当前提示唯一标志
    - [新增] 方法支持promise接口
    - [优化] 兼容特定 容器内 居中 显示
    - [优化] 兼容Antd属性 getContainer

- Input
    - [优化] placeholder溢出显示省略号...
    - [修复] Password密码显示隐藏只能受控切换，组件内置的默认切换无效问题
    - [修复] focusSelect聚集自动选中不生效问题
    - [调整] Textarea默认行为调整为不允许超出maxLength

- InputNumber
    - [新增] align对齐方式
    - [修复] defaultValue不生效问题
    - [优化] 禁用态鼠标样式
    - [修复] 初始化值改变后加减按钮禁用状态未及时更新问题

- TimePicker
    - [新增] bordered是否显示边框
    - [修复] placement位置遮挡输入框问题
    - [调整] 面板z-index调整为1800
    - [优化] 禁用态鼠标样式

- DatePicker
    - [调整] 面板z-index调整为1800
    - [修复] RangePicker面板值未切换到input输入日期问题
    - [修复] 特定场景下，面板显示日期错误问题

- Select
    - [修复] select 在输入框输入字符，placeholder没有实时隐藏
    - [新增] 搜索模式启用下支持键盘操作backspace单个字符删除

- Dropdown
    - [新增] destroyPopupOnHide属性，下拉内容关闭后是否销毁
    - [新增] mode类型dropdown，当mode=dropdown时，使用下拉样式

- Menu
    - [新增] arrowdown属性，mode=horizontal时,arrowdown=true时显示下拉按钮
    - [新增] items属性，用于接收对象转为Memu.Item，Memu.SubItem，Memu.ItemGroup，Menu.Divider

- Form
    - [新增] disabled 属性，设置表单组件禁用

- Steps
    - [新增] percent属性，设置当前步骤条进度情况

- Spin
    - [新增] loadingType为cricle属性，新的spin样式

- Timeline
    - [优化] timeline组件label 宽度自适应

- Notification
    - [新增] key属性 当前通知唯一标志
    - [新增] icon属性 自定义图标
    - [新增] closeIcon属性 自定义关闭图标
    - [新增] btn属性 自定义关闭按钮
    - [新增] onClick属性 点击通知时触发的回调函数
    - [优化] 兼容Antd属性 description message placement

- Image
    - [优化] 兼容Antd属性 alt src

- Avatar
    - [新增] maxPopoverTrigger属性 设置多余头像 Popover 的触发方式
    - [修复] 失效图片替换

- Icon
    - [新增] 组织型部门、组织、部门 三个图标

- Tabs
    - [新增] 添加items属性配置选项卡内容
    - [新增] 标签项居中展示
    - [修复] fieldid重复问题修复

- Upload
    - [新增] 添加isImageUrl属性，缩略图是否使用img标签，此方法为内置方法
    - [新增] 可拖拽列表实现
    - [新增] itemRender自定义列表项
    - [新增] 上传前裁剪图片示例

- Cascader
    - [修复] 适配inputValue值
    - [修复] placeholder多语适配

- Table
    - [新增] 表格全部展开收起
    - [新增] 自定义展开列表头
    - [新增] 表头是否显示下一次排序的 tooltip 提示
    - [修复] 列宽很小时,内容放不下导致折叠图标边框丢失处理
    - [新增] 多选内置数据全选/反选当前页/清空全选功能
    - [优化] 单选/多选可以直接传给Table功能实现
    - [优化] 展开/收起一系列API兼容通过expandable对象传递
    - [修复] 筛选列无法还原设置修复
    - [修复] antdTable组件排序兼容问题
    - [修复] ingleFind组件增加多语
    - [优化] 优化单列搜索搜索无结果的显示界面

- Drawer
    - [新增] 属性extra 抽屉右上角的操作区域

- Pagination
    - [新增] 分页组件增加loading机制

## v4.4.4
#### 更新时间：2023-02-17
- Input
    - [优化] suffix图标边界处鼠标样式
    - [优化] Textarea调整行高
    - [新增] Search增加enterButton，后缀显示为button样式
    - [新增] Search增加loading搜索中
    - [新增] Search增加icon自定义搜索图标

- InputNumber
    - [新增] 支持键盘上下箭头加减操作
    - [修复] 搜狗中文输入法下小数点和句号混淆问题
    - [修复] 部分场景下加减号border被遮挡问题

- DatePicker
    - [修复] 浏览器缩放时产生1px高度误差问题
    - [优化] RangePicker.ranges兼容presets
    - [新增] 支持header下拉选择年月，并默认开启该模式
    - [优化] 增加步长step对时分秒输入的校正
    - [修复] am/pm列多余滚动条问题，并增加时分秒列className
    - [新增] RangePicker左右面板翻页解耦
    - [修复] header的箭头、年月、今天按钮等增加fieldid
    - [优化] UE更新翻页箭头
    - [新增] isHeaderSelect 面板头部支持下拉选择年月

- TimePicker
    - [优化] windows样式兼容
    - [新增] `此刻`及`确定`按钮

- Tooltip
    - [修复] button禁用时tooltip无法弹出问题

- ColorPicker
    - [优化] 禁用态鼠标样式

- PopConfirm
    - [新增] description描述
    - [新增] showCancel是否显示取消按钮

- Carousel
    - [修复] 点击前进/后退白屏现象

- Image
    - [修复] 单个图片缩略图与大图不匹配

- Empty
    - [新增] 增加暂无数据左右排序类型
    - [新增] children属性相关事例
    - [调整] 文字样式及内容调整

- Calendar
    - [新增] 新增markWeekend、hourCellRender、hourCellContentRender属性
    - [新增] 为复选框增加fieldid
    - [优化] 禁用日期demo描述精确到年份
    - [调整] 头部年月切换按钮顺序
    - [新增] 日历单选模式的填充显示

- Icon
    - [新增] 新增new、收藏图标

- Tree 
    - [修复]  异步数据加载 同时展开多个子节点时 树形结构有展开收起再展开往复现象
    - [修复]  滚动 防抖时间 支持 0
    - [新增]  新增api contentCls 

- Drawer
    - [新增]  autofocus 打开 抽屉后焦点到抽屉内

- Message
    - [优化]  状态图标以及显示优化

- Radio
    - [新增] radio  size属性
    - [新增] radioGroup新增 options optionType

- Alert
    - [优化] border边框支持自由配置，默认样式去掉边框
    - [新增] api icon 自定义图标
    - [新增] action 自定义操作项
    - [新增] closeicon api 兼容
    - [优化] 状态图标以及显示优化

- Modal
    - [修复] (modal) 修复modal 概率拖拽重叠问题
    - [新增] comfirmModal增加afterClose、keyboard等属性
    - [新增] autoFocus属性, 内置了三种焦点设置，同时支持元素选择器
    - [修复] 修复某些情况（切换页面）使弹窗不可见时居中导致错位

- Tabs
    - [修复] 三层及以上包裹页签时，line类型下横线位置计算问题
    - [新增] 自定义添加按钮图标
    - [新增] 添加自定义折叠icon属性moreIcon(多页签时触发下拉的图标)
    - [优化] line类型页签需求（下横线最短26px，最长82px，字体色值及圆角样式优化）

- Anchor
    - [优化] 锚点样式优化（横向锚点圆点做成自定义图标形式）
    - [新增] items属性，数据化锚点项

- Upload
    - [新增] showUploadList.removeIcon 自定义列表删除图标
    - [新增] iconRender 自定义显示图标

- Cascader
    - [新增] 触发cascader的按钮和选择的结果分离

- Collapse
    - [新增] 增加箭头图标位置可折叠区域

- Button.Group
    - [修复] Button按钮被tooltip包裹时适配

- Timeline
    - [新增] labelWidth属性，支持label自定义宽度
    - [新增] pendingDot属性，当最后一个幽灵节点存在時，指定其时间图点

- Steps
    - [新增] items属性，配置选项卡内容 
    - [修复] 新版本浏览器箭头与左侧有间隔

- Steps.Step
    - [新增] subTitle属性，设置step的副标题 

- Space
    - [新增] Space.Compact组件

- Badge
    - [新增] Badge.Ribbon组件

- Tag
    - [新增] activeColors属性，设置选中态颜色
    - [新增] onChange属性，同onClick
    - [新增] checked属性，同selected

- Rate
    - [新增] tooltips属性，给评分组件加上文案展示
    - [修复] 设置只读时，鼠标放置在组件上 光标应维持指针形状

- Select
    - [新增] maxTagCount auto 模式下拉弹框标签支持自定义tagRender
    - [修复] 单选多选清除图标样式应统一
    - [修复] 解决下拉自适应宽度显示不全问题

- Pagination
    - [修复] 在调整pageSize后, 清空跳页的输入框中不合法的数字
    - [修复] 分页下拉渲染位置无法自适应问题
    - [新增] hideOnSinglePage属性，只有一页时是否隐藏分页器
    - [新增] itemRender属性，用于自定义页码的结构

- Layout
    - [优化] sider & spliter 默认收起图标更换；spliter分割线样式更改

- Transfer
    - [新增] children 支持 table & tree 场景穿梭框

- Slider
    - [新增] tooltip属性，支持设置 Tooltip 相关属性

- Progress
    - [新增] strokeColor属性， 当有steps 时支持传入一个数组

- AntoComplete
    - [新增] 支持清除
    - [新增] 自动获取焦点
    - [新增] 使用键盘选择选项的时候把选中项回填到输入框中
    - [新增] 自定义输入框
    - [新增] 是否默认高亮第一个选项
    - [新增] 是否默认展开下拉菜单
    - [新增] 展开下拉菜单的回调
    - [新增] 获得焦点时的回调
    - [新增] 搜索补全项的时候调用
    - [新增] 下拉菜单的 className 属性
    - [新增] 下拉菜单和选择器同宽
    - [新增] 是否根据输入项进行筛选
    - [新增] 菜单渲染父节点
    - [新增] 当下拉列表为空时显示的内容
    - [新增] 指定默认选中的条目

- Dropdown
    - [优化] 分割型按钮中间分割线透明度调整

- Menu.Divider
    - [新增] 支持dashed 类型

- Table
    - [新增] 新增表格暂无数据根据表体高度两种不同展现形式
    - [修复] 修复单列筛选自定义onfilter筛选错误的问题
    - [新增] 表格新增pagination配置，支持分页
    - [修复] 修复使用filterColumn组件，fillSpace失效的问题
    - [优化] 单选逻辑优化，支持rowSelection控制选择（同多选）
    - [优化] 优化合计行带来的滚动样式问题
    
## v4.4.3
#### 更新时间：2022-12-23
- DatePicker
    - [新增] 支持受控的showTime配置
    - [修复] 修复open放入defaultProps导致面部开关受控失败问题
    - [修复] 特定异常操作时，无法输入日期问题
    - [新增] picker='halfYear'半年类型
    - [修复] WeekPicker今天数字被背景色覆盖问题
    - [新增] disabledDateValid 输入禁用日期是否有效
    - [优化] 翻页箭头增加title悬浮提示 

- InputNumber
    - [修复] 用户传入超长字符串数字时，类型转换导致精度丢失问题


- TimePicker
    - [修复] 配合modal等组件使用时背景色多余问题
    - [调整] 支持依据format解析出showHour等配置

- Tree
    - [新增]  拖拽节点到其他父级节点时延时展开后者
    - [修复]  修复 节点过长 高亮时阴影 覆盖不全的问题
    - [修复]  修复 tree组件 快捷键向上 无法获取焦点的问题
    - [优化]  fieldid 以用户 传入的fieldid为基础 生成最终tree fieldid

- Modal
    - [修复]  modal内组件会在点击最大化后缩小 重新渲染的问题

- Calendar
    - [修复] 因父元素设置 display   none ==> block 导致日维度渲染计算事件样式错误问题
    - [修复] 快选模式下点击编辑面板位置发生改变
    - [修复] 解决多选下defaultType失效情况
    - [新增] 新增日历多选下焦点态背景色
    - [修复] 使用fillSpace时初始加载月份不对问题

- Message
    - [新增] 支持 getPopupContainer属性
    - [修复] 修复 message color为 error时 没有图标的问题
    - [优化] 内容过多超出屏幕时滚动展示
    - [调整] message出现位置设置为距离顶部40px

- TreeSelect
    - [新增] 下拉框支持拖拽宽高，增加属性resizable

- Empty
    - [新增]  新增多种空状态类型

- Pagination
    - [优化]页码选择框可配置getPopupContainer属性
    - [修复]页码选择框未选收起出现回填异常

- Select
    - [优化]单选输入框增加复制选中功能
    - [优化]maxTagPlaceholder默认设置去除省略号；默认渲染最大数字为99，超出99渲染 99 +
    - [修复]极值下拉框标签关闭支持onchange 回调

- Transfer
    - [优化]基础样式调整，增加全部移动按钮
    - [优化]增加多语功能
    - [优化]operations 功能优化，支持操作按钮文本及显示配置
    - [修复]style属性不起作用

- Menu
    - [修复]submenu选中颜色不一致问题

- ConfigProvider
    - [新增] getThemeContainer属性设置主题渲染父节点，默认渲染到根节点上

- Steps
    - [新增] locale属性支持多语

- Tabs
    - [新增] 页签下拉项显隐回调onPopMenu添加
    - [修复] 动态加载多页签数据展示问题

- Anchor
    - [优化] 调整锚点内Affix组件z-index值为1000
    - [优化] 横向锚点样式优化

- Upload
    - [新增] 请求头添加X-REQUEST-TIME X-XSRF-TOKEN2字段
    - [优化] 上传组件删除下载图标样式优化

- Cascader
    - [新增] 级联可搜索时，添加输入框搜索回调onSearch，反回输入框内容及匹配项

- Table
    - [优化] 单选和扩展icon同时存在调整icon默认所在列的位置
    - [修复] 筛选列左固定情况下筛选框丢失问题修复
    - [新增] 单列筛选支持多语
    - [修复] 解决某些固定列情况下单元格内容显示不全的问题
    - [新增] 单列筛选组件/过滤列组件/单列定位组件/排序组件增加fieldid适配
    - [新增] 支持大数据列功能
    - [新增] sticky版表格合计行吸底并增添背景色
    - [修复] 修复fillSpace和flex布局兼容性问题
    - [修复] 修复部分360浏览器对表格的兼容性问题
    - [修复] 修复部分情况滚动条显示异常的问题
    - [优化] 表格的空数据状态图标替换

- Spin
    - [优化] tip色值显示优化

- Timeline
    - [新增] Timeline.Group组件
    - [新增] mode属性可以改变时间轴和内容的相对位置 
    - [新增] reverse属性反转节点 
    - [新增] Timeline.item label属性设置标签

## v4.4.2
#### 更新时间：2022-11-10
- 其他
    - [新增] 生成 coverage 覆盖率测试报告 到oss 和 package中

- Breadcrumb
    - [优化]fillSpace支持数字类型，可设置面包屑自适应最大宽度

- Dropdown
    - [修复]Dropdown.Button兼容placement属性，可使用字符串类型&align对象

- Anchor
    - [优化] 特殊场景，锚点项不存在时计算宽高问题兼容优化

- Tabs
    - [优化] editable-card类型页签圆角优化
    - [修复] 页签宽高计算兼容处理
    - [修复] 多页签极值情况（可视区首尾项显示不全点击情况），下拉项计算问题修复
    - [优化] 嵌套页签，内部多页签项dom元素不存在时兼容优化

- Upload
    - [调整] 请求头添加X-XSRF-TOKEN字段，去除withCredentials字段校验

- DynamicView
    - [新增] 动态视图组件添加，根据json数据解析成视图

- Table
    - [新增] 新增scrollMode属性，支持选择旧版表格和sticky布局版表格，默认启用sticky布局版表格，浏览器不支持会自动降级处理为旧版表格
    - [优化] sticky表格合计行存在竖向滚动条固定在底部
    - [修复] 旧版表格无数据情况下某些情况遮盖表头一部分问题修复
    - [新增] 新增currentScrollColumn，支持滚动到指定列
    - [新增] 内置序号列表头适配多语
    - [修复] 解决fillSpace某些情况下不生效的问题
    - [修复] 解决表格组件在react18版本下报错的问题
    - [修复] 修复旧版bodystyle设置高度不生效的问题
    - [新增] onRowHover回调函数暴露hover状态
    - [修复] 解决二次传入defaultExpandAllRows为false不生效的问题
    - [优化] 新版表格针对旧版表格的样式优化
    - [修复] 解决树形数据存在多选和合计栏树形数据最底级丢失多选框的问题
    - [修复] 过滤表头timePicker交互方式修改
    - [修复] 旧版表格奇安信及360浏览器兼容问题处理

- Calendar
    - [新增] 日历组件支持日维度视图事件
    - [修复] 修复 日历组件 在切换网页缩放比例 时 产生的bug以及 非100%时 1月份自动跳转到12 月的问题
    - [新增] 新增operation控制 日历头部几个功能工具的显示规则（切换年月、显示日期等）
    - [新增] layout属性 控制 左右侧月份位置
    - [修复] 修复滚动切换年时 onYearChange事件重复触发的问题
    - [优化] 内部补充部分元素key 属性

- Modal
    - [新增] 新增最大化受控属性isMaximize
    - [新增] modal method 支持自定义footer api

- InputNumber
    - [修复] 用户从Excel直接copy单元格数字时自带的尾部空格导致无法粘贴到输入框问题
    - [修复] windows下使用中文输入法时输入异常问题

- Input
    - [修复] Textarea角标和value对换行符不计入长度的处理不一致问题
    - [修复] Textarea的border被滚动条遮挡缺角问题

- Tooltip
    - [修复] modal中弹出tooltip时，挂载点查找优先级错误问题

- DatePicker
    - [新增] 支持季度、季度范围QuarterPicker
    - [优化] RangePicker删除到空视为有效输入。解决手动清除结束日期后，起始日期无法选择被清除的结束日期以后日期的问题
    - [优化] RangePicker支持受控的placeholder
    - [修复] DatePicker自动填充功能，日期第一位为0/1/2/3时只添加分隔符未输入数字问题
    - [修复] DatePicker的open默认值导致面板开关状态受控失败问题
    - [修复] DatePicker在火狐浏览器下，确定按钮禁用态仍可点击关闭问题
    - [优化] DatePicker支持受控的showTime
    - [修复] WeekPicker表单里失焦后自动变第一周问题

- Steps
    - [新增] type为arrow模式支持more属性
    - [新增] more模式下dropdown选中支持onChanges事件
    - [优化] title属性显示优化

- Form
    - [优化] upload、rate组件错误校验显示优化

- Pagination
    - [新增]页码选择框配置属性sizeChangerProps

## v4.4.1
#### 更新时间：2022-09-16
- 全部组件
    - [修复] (typescript) 修复 因typescript 升级后校验更为严格，导致抛出的类型错误
    - [修复] IE浏览器下网站以及部分组件不支持的问题

- Tabs
    - [修复] 多页签翻页按钮、下拉按钮、editable-card关闭按钮fieldid添加
    - [新增] trigger属性添加，触发页签下拉的呼出行为
    - [修复] editable-card类型多页签，下拉项添加关闭功能
    - [优化] 页签下拉框样式优化
    - [修复] 页签下拉框滚动脱离修复
    - [新增] 页签右键或hover下拉项菜单定制
    - [修复] 多页签时，页签项位移之后，下拉框偏差问题处理

- Upload
    - [新增] 新增属性xsrf，添加请求头X-XSRF-TOKEN字段
    - [修复] 兼容360浏览器outline属性不继承问题

- Anchor
    - [优化] 横向锚点选中字体加粗处理
    - [修复] 横向锚点存在于滚动容器中定位问题

- Modal
    - [新增] 支持modal的getPopuContainer 未明确时优先向父组件的元素向上寻找tinper-next-role=container的元素为挂载点
    - [新增] modal footer 新增 onCustomRender api
    - [修复] modal title 类型错误 支持 React.ReactNode

- Calendar
    - [修复]   修复日历fillSpace时 切换到12月会自动跳转到1月的bug; 
    - [修复]   修复特殊情况下 日历header箭头乱码问题
    - [修复]   修复日历组件多选阻断切年模式下 通过右上角切换年时 阻断不生效的bug

- Notification
    - [优化] 点击消息 框主体时 移除关闭效果（仅为点击 关闭按钮关闭）

- ColorPicker
    - [优化] 优化Alpha input输入体验

- Tree
    - [修复] 修复tree 半选图标概率 乱码bug

- Layout
    - [修复]Spliter拖拽组件不支持width=0情况
    - [新增]Spliter拖拽组件收起展开能力
    - [优化]Row/Col组件响应式逻辑优化，布局范围修改，与ue设计要求统一
    - [新增]Row增加size属性，支持响应式布局sm\lg\xl等自定义响应尺寸

- Breadcrumb
    - [新增]新增fillSpace属性，支持面包屑组件自适应父节点宽度，超出部分则收起下拉展示

- Icon
    - [优化]字体图标去除64位格式，采用外链地址加载图标资源


- Button
    - [修复]type='text' 背景色为透明色

- Rate
    - [新增]件交互优化，支持显示到小数点后两位

- Table
    - [修复]空数据状态下横向高度条计算错误问题
    - [新增]过滤表头时间组件选择后自动关闭弹窗
    - [修复]多选表格的样式问题修复
    - [新增]降级适配ie浏览器
    - [新增]filterDropdownOptions的api支持筛选自定义各个所使用筛选组件的属性透传
    - [修复]解决key等于0的时候行背景色异常的问题
    - [修复]表格无数据有竖向滚动条显示异常的问题
    - [新增] 复杂表格行过滤支持timePicker时间过滤
    - [修复]filterDropdownData传值显示异常的问题

- DatePicker
    - [修复] RangePicker箭头显示在面板上层问题
    - [新增] RangePicker的快捷键及今天、确认等按钮添加fieldid，并区分左右面板fielded
    - [修复] RangePicker不在in-view范围内的选中日期有多余背景色问题
    - [修复] RangePicker结束日期面板不随开始日期选中值变动的问题
    - [修复] RangePicker宽度非常小不符合UE标准时不再使用紧凑模式
    - [优化] 兼容IE11下样式bug
    - [修复] 非选中日期的面板显示selected\active等状态
    - [优化] 解决IE多余清除的X符号 
    - [修复] WeekPicker解决1月1号等日期所在周年错误问题，并增加多语支持

- TimePicker
    - [优化] 兼容IE11下input多余清除×问题

- InputNumber
    - [新增] 禁止非法输入
    - [新增] 前后缀增加用户自定义className注入
    - [优化] 兼容IE11下样式bug
    - [优化] 箭头位置没居中问题

- Input
    - [新增] Textarea 新增显示允许录入字符数提示、超长截断等功能
    - [优化] Password在某些机型下显示多余小眼睛问题

- Popover
    - [修复] 上下左右位置箭头距离过大问题

- Tooltip
    - [优化] 兼容IE11下纵向未溢出却出现滚动条问题

- Alert
    - [优化] 兼容IE11下样式bug

## v4.4.0
#### 更新时间：2022-08-05

- 全部组件
    - [新增] 全面支持TypeScript用法
    - [优化] 移除所有组件内多余的css变量默认值

- DatePicker
    - [修复] 增加非自动校验场景的输入有效性控制
    - [修复] RangePicker的active状态小箭头与输入框未对齐问题
    - [优化] 年份部分删除后光标位置异常问题
    - [优化] 禁用日期未修改光标禁用状态cursor:not-allowed问题
    - [修复] defaultValue为非法字符串时报错问题
    - [修复] 传入的format处理错误问题
    - [修复] 部分场景下删除操作被重复执行问题

- Input
    - [新增] Password密码输入框功能，参见API文档
    - [修复] 前缀为纯文本时未对齐问题
    - [优化] Search更换为更明显的图标

- InputNumber
    - [修复] 失焦时末尾0转Number后丢失精度问题

- TimePicker
    - [修复] 多语翻译错误问题

- Tooltip
    - [修复] 箭头top/bottom位置错误

- Popover
    - [优化] 箭头左右弹出时未精确对齐问题

- Badge
    - [修复] 默认圆点不显示 dot属性控制圆点是否显示

- Spin
    - [新增] 支持configProvider多语的适配

- Steps
    - [优化] 面形步骤条-选中的步骤，文字为白色

- ConfigProvider
    - [优化] renderEmpty修改为使用Empty组件

- FormItem
    - [修复] tooltip属性不生效问题

- Switch
    - [修复] 模拟点击事件不生效问题

- Radio
    - [新增] Radio Group onChange 支持 参数event

- Calendar
    - [修复]  修复 多选 每年第一天 被选中后保存 背景被覆盖的问题
    - [新增]  api：scrollIntoValue 外部控制当前的滚动条日期位置
    - [修复]  修复滚动条导致问题
    - [修复]  修复firefox浏览器 多选模式高度失效问题
    - [新增]  支持自定义头部星期渲染

- Tree
    - [修复] 修复tree 内存泄露问题 
    - [修复] 修复 tree 拖拽时个别情况报错问题
    - [修复] 修复 label文字过长溢出的问题
    - [新增]  onExpand 提供第三个参数 event

- Modal
    - [修复] 解决resize可以到屏幕上方窗口外问题

- Table
    - [修复] onHeadCellClick参数失效的问题
    - [优化] 无数据时存在滚动条位置优化移动到表体底部
    - [修复] 修复单列筛选完再筛选其他的选择项缺失的问题
    - [优化] 表格快捷键事件暴露event参数
    - [优化] 表头字体等样式优化
    - [修复] 修复内置序号显示错误的问题
    - [优化] 筛选列弹框样式优化
    - [修复] 修复中间区域左右滚动左固定列和中间区域的一像素边框样式问题
    - [新增] 列配置新增onFilter
    - [新增] 列过滤新增filterCheckboxProps属性支持自定义内置checkbox属性
    - [新增] Column组件形态支持columnType="multiselect"内置多选列定义

- Tabs
    - [修复] card页签包裹line页签样式覆盖
    - [修复] 当其他页签包裹line或trange形式页签时，对下划线及小三角位置从新计算

- Upload
    - [优化] Upload组件，删除不用的css样式，避免影响

- Anchor
    - [新增] 锚点项跟随内容滚动切换触发锚点项，并使触发的锚点项始终在可视区
    - [优化] 横向锚点字体大小调整为14px,间距左右为16px，上下为8px

- Select
    - [优化]下拉单选/多选模式清除按钮样式统一
    - [修复]极值模式设置maxTagCount下拉框内标签点击关闭未调用props.onDeselect问题

- Layout
    - [新增]Layout.Sider 相关api使用的demo示例
    - [新增]Layout.Spliter组件，增加布局可拖拽功能

- Icon
    - [优化]loading/放大镜图标美化

- Skeleton
    - [修复]未支持fieldid 问题

## v4.3.1
#### 更新时间：2022-07-06

- Affix
    - [新增] initCalc属性 页面初始时是否计算DOM需要定位

- Anchor
    - [新增] 横向锚点实现
    [修复] 滚动时极值临界点兼容

- Calendar
    - [优化]  日历优化-首日显示月份，并给一个高亮样式稍作强调
    - [新增]  日历的快选功能（涉及API 包含 quickSelect、onQuickSelect）
    - [修复]   修复 多个日历 情况 使用填充时 找到元素不准确问题（填充失败问题）
    - [新增]   头部支持选择切换年份、月份等面板
    - [修复]   修复在个别电脑上日历面板上出现的 所有日期均为当前日期的bug
    - [修复]   多选日历滚动条存在的bug

- Checkbox
    - [新增] readOnly只读属性
    - [优化] 对号样式使用细对号的字体图标

- DatePicker
    - [修复] 滚动条滚不到顶部问题
    - [修复] readonly时首次点击无法打开问题
    - [新增] RangePicker配置showRangeLabel显示快捷选项选中时的快捷键文本
    - [修复] 日期分隔符后月、日无法输入0问题
    - [修复] bottomRight位置的左侧三角显示错误问题
    - [修复] ‘确认’按钮越南语未翻译问题
    - [修复] 某些场景下RangePicker日期无法选中问题
    - [修复] 非自动校验场景的输入有效性控制

- Drawer
    - [修复] 抽屉关闭时是否销毁属性优化

- Dropdown
    - [修复] 下拉箭头添加fieldid
    - [修复] 下拉菜单Menu.ItemGroup里的Item设置disable不生效问题
    - [修复] 360浏览器下拉菜单选中多出额外边框问题
    - [修复] Dropdown.Button mouseEnterDelay&mouseLeaveDelay不生效问题
    - [优化] Dropdown.Button左对齐渲染逻辑，减少组件回流重绘

- Menu
    - [修复]Item使用父组件Menu的direction值

- Empty
    - [新增] (empty) 增加全局配置多语功能

- Form
    - [修复] 样式及权值相同时不同表单组件样式不一致问题

- Input
    - [新增] Input.Search增加debounceDelay属性
    - [调整] 输入类组件边框透明度由0.5改为0.35
    - [修复] value为0时清除按钮显示错误问题

- InputNumber
    - [修复] 输入空格会占用校验长度问题

- Message
    - [新增]   新增wrapperStyle 和innerStyle api

- Modal
    - [修复]   精细化 拖拽边框 1. 横向拖拽 后不会影响 高度 
    - [修复]   当点击 边框时 (仅触发了onResizeStart/onResizeStop) 不触发resize-box 的宽度变更(如果此时触发变更会产生宽高精度小数点被四舍五入 )
    - [优化]   优化右下角 拖拽样式, 避免拖拽 时选中
    - [修复]   修复 提示框 内body内容过长是产生滚动条 此时footer中的按钮偏上的bug
    - [修复]   修复多层嵌套modal 未使用 draggable 的modal 中因添加了dnd 导致的影响背面modal拖拽
    - [新增]   footerProps的api属性
    - [优化]   优化 showPosition ,增加默认x ,y 不传时为 50%,可以方便的使用这条属性在和centered之间有效的切换
    - [修复]   修复modal resize和draggabble 同时存在时拖动到边角 生成滚动条
    - [修复]   修复 modal弹窗打开时背部能够滚动的问题

- Pagination
    - [修复]simple模式下未设置pageSize导致渲染问题
    - [修复]enter键操作偶现触发两次onChange的情况

- Popover
    - [修复] 滚动条滚不到顶部问题

- Radio
    - [新增] readOnly只读属性
    - [优化] RadioButton文字居中样式优化

- Select
    - [新增] 新增输入框，多选项，多选项删除图标fieldid
    - [新增] 新增maxTagCount="auto"，点击+n按钮弹出其它被选中值的列表
    - [优化] 多选时，右侧清除图标覆盖下拉图标
    - [修复] children传入不是子组件的immutable数据会报错的问题
    - [修复] defaultValue设置0时不生效

- Table
    - [修复] 表格高阶组件的多语适配
    - [修复] 部分情况拖拽换行拖拽功能失效的问题修复
    - [修复] 修复自定义表格样式导致出现滚动条样式计算错误的问题
    - [新增] 单列过滤支持filterDropdownAuto\filterDropdownData传入自定义过滤数据
    - [新增] column属性新增columnType和拖拽配置
    - [新增] 表格支持自定义传入Column, ColumnGroup标签自定义生成列
    - [修复] 修复useDragHandle这个api的逻辑支持只针对抓手列开启拖拽
    - [修复] 大数据模式下表格滚动回调不生效的问题
    - [修复] 修复滚动条产生的相关样式问题
    - [新增] 增加树形数据拖拽能力
    - [调整] border不再对表头样式产生影响
    - [新增] 新增api(showExpandIcon)修复替代旧有api(haveExpandIcon)逻辑功能
    - [新增] 过滤列新增api(lockable)和表头锁定时的回调函数(afterFilter)
    - [优化] 列配置兼容isShow和ifshow
    - [修复] 修复单选框样式不居中的问题含单选固定和非固定的情况
    - [优化] filedid生成的相关补充优化
    - [新增] 表格中间区域新增class类名wui-table-container-inner


- Tabs
    - [优化] 多页签时嵌套样式兼容
    - [优化] line形式的页签，页签头部文字部分背景色透明
    - [优化] editable-card包裹line形式时，样式兼容
    - [优化] tabs组件去掉tabpanel层z-index
    - [新增] 新增页签可拖拽

- TimePicker
    - [调整] 移除面板的min-width
    - [修复] clear\suffix图标位置不居中问题
    - [修复] line-height错误问题
    - [修复] clear图标仅hover态显示
    - [修复] 滚动条滚不到顶部问题
    - [修复] blur事件取值错误导致时间无效
    - [修复] 多语未翻译

- Tooltip
    - [修复] 兼容IE11未超出宽度却出现滚动条问题
    - [修复] 滚动条滚不到顶部问题

- Tree
    - [修复] 快捷键操作时，展示快捷键选中节点的背景色
    - [新增] onDragEnter回调函数增加dropPosition属性，帮助判断是否拖动到了间隙位置
    - [优化] 快捷键相关样式和交互逻辑重新整理
    - [优化] 树中的checkbox同步Checkbox组件的样式
    - [修复] lazyload下选中父节点叶子结点checkbox无法自动选中问题
    - [优化] 禁用态UI效果调整
    - [修复] TreeNode的展开收起按钮fieldid重复问题
    - [新增] 新增reverse属性
    - [新增] 增加快捷键选中悬停色
    - [修复] 传treeData时，向上快捷键定位有误
    - [修复] 树拥有唯一根节点时，tab选不中第一个子节点问题
    - [优化] 连接线增加wui-tree-line结构，减少componentDidUpdate周期的计算，提高性能

- Upload
    - [优化] 上传组件新增自定义类名uploadClassName属性
    - [优化] 上传组件内层span添加wui-upload-inner类名
    - [优化] 照片墙形式上传去掉内层wui-upload类名之后样式选择器的修改

- Cascader
    - [修复] 级联组件下拉展开icon增加fieldid

## v4.3.0
#### 更新时间：2022-05-19
- 全局
    - [新增]全组件支持自动化测试fieldid属性
    - [新增]全组件支持主题色css变量

- Modal
    - [新增]  属性showPosition 支持自定义位置 
    - [新增]  属性centered为once 情况 初始化居中
    - [新增]  弹窗可拖拽调整大小时右下角显示可拖拽小图标标识
    - [修复]  修复edge 特殊版本浏览器内 点击右上角关闭button 出现问题
    - [修复]  修复外部全屏后通过修改show 属性导致modal关闭后，再打开modal，modal会保持全屏显示，当再次点击还原窗口时出现左右位置不准确的的问题
    - [修复]  修复 modal中 draggable和resizable 同时使用时 拖拽modal 会导致modal移动出屏幕区域 
    - [优化] 优化modal中因浏览器尺寸发生变化的情况 1. centered=true时 浏览器尺寸变化时 时刻保持居中 2.浏览器尺寸缩小时,modal窗体 即将超出屏幕时 重置modal 位置为初始化位置
    - [修复] body组件内部固定宽高, 滚动导致 header的文字和body 的滚动文字重叠
    - [修复] 修复modal 拖动出范围导致的bug
    - [新增] modal右上角的最大化最小化关闭按钮自定义渲染
    - [优化] modal 键盘事件 支持自选内部事件拓展
    - [调整] 调整xlg 弹窗尺寸 高度： 640 ==>560
    - [修复]  修复 modal——xlg类型弹窗，小分辨率下横向滚动条无法点击
    - [修复] 修复modal中向左上小拖拽 存在的拖拽方向不准确问题
    - [优化] 优化 修改modal组件中 关闭按钮和全屏按钮显示
    - [修复] 在IE中 的位置偏移 问题
    - [修复] 多个modal 中dom第一个modal 未被销毁时 后面 打开的 modal bounds获取到dom没有宽高问题
    - [修复] 修复最小弹窗中样式对 弹窗全屏的影响
    - [优化] resizeable时生成的多余内容产生滚动现象
    - [优化] 多选模式下合计文字显示不全的样式

- Calendar
    - [修复]  所有日期显示成 当前日期的问题（外链引入方式有效）
    - [优化] 微调计算滚动距离 使切换月份后显示区域更准确
    - [修复] moment ('2022-010-01') 此种情况在火狐浏览器内不兼容的情况
    - [优化] 支持自定义多选模式下的禁用日期
    - [新增] getDateCellAttr支持自定义属性
    - [新增] disabledate 支持string，可设置内部预制的日期（当前支持传入beforeCurrentDate）
    - [新增] fillSpace支持自动填充/满父级或指定容器区域

- Tree
    - [修复]根节点去掉draggable属性
    - [修复]除根节点之外，不再将其它节点的展开状态记录到缓存数据中
    - [新增]新增syncCheckedAndSelectedStates属性，设置为true，树节点的checked和selected状态将同步变化
    - [修复]TreeNode如果没有传递icon属性，不应生成空的占位dom结构
    - [优化]树的hover态样式优化
    - [优化]树的连接线样式优化
    - [优化]树的禁用态样式优化
    - [优化]树节点的title上下居中样式修改，height改为min-height
    - [新增]新增disabled属性，优先级低于TreeNode的disabled
    - [新增]TreeNode新增visibkeCheckbox属性，控制checkbox的显示和隐藏
    - [新增]新增icon属性，优先级低于TreeNode的icon
    - [修复]懒加载状态下数据改变，内部数据状态修复
    - [修复]恢复被删掉的快捷键路过每一个树节点的选中样式
    - [修复]titleClass应该传递到span标签上，不应该传到li标签上

- Collapse
    - [修复]header点击的时候如果没有传onSelect需要放开默认事件

- Select
    - [修复]兼容Select.Option的value上数组的用法
    - [修复]处理children数组包含数组的情况
    - [修复]业务代码和测试用例都在Option中传递id属性，回调函数中的id使用业务代码传递进来的id，屏蔽测试用例传进来的id
    - [优化]箭头居中样式优化
    - [修复]兼容Select.Option不传递value的用法，用key替代value
    - [修复]Select被Modal包裹使用时，快捷键事件不应传递到Modal上
    - [修复]过滤掉children或者options中的空数据
    - [修复]defaultValue为0不生效的问题
    - [修复]optionLabelProp属性只有combobox模式下设置默认值

- Autocomplete
    - [优化]去掉下拉框中条目的选中态样式，只有悬停态

- Checkbox
    - [优化]调整line-height，文字和图标更加居中
    - [优化]hover文字显示title

- Pagination
    - [优化]样式代码精简优化
    - [优化]pageSize输入框兼容enter键选中操作
    - [优化]pageSize下拉框展示高度自适应
    - [优化]pageSize输入框focus情况下值清空，以palcehoder展示
    - [修复]pageSize输入框非法字符无法输入
    - [修复]宽度大于最小宽度导致渲染布局错乱问题

- Dropdown
    - [修复]下拉菜单多选模式下未失焦收起问题
    - [优化]Dropdown.Button分割线颜色调整
    - [优化]下拉菜单submenu添加选中样式
    - [优化] IE浏览器边框兼容问题

- Tag
    - [修复]visible属性props传入不生效问题
    - [新增]selected（boolean）属性，支持是否选中，仅select=true时生效

- ConfigProvider
    - [新增]registerTheme支持动态注册自定义主题
    - [新增]theme设置主题

- Spin
    - [优化]默认是样式dom结构
    - [新增]backDropClassName属性

- Input
    - [修复] 禁用时hover状态不应显示清空图标

- Timepicker
    - [优化] disabled状态显示优化
    - [修复] 时分秒某列不显示时min-width错误

- DatePicker
    - [修复] 手动输入年份后再弹出面板选择1月1号时不触发onChange问题 
    - [修复] showTime为ture时，value修改没有触发onChange事件
    - [修复] 清空时存在残影问题
    - [新增] 支持个性化格式分隔符及其自动填充；如支持 'YYYY年MM月DD日' 的不同汉字分割；
    - [新增] 支持时分秒越界校正
    - [新增] RangePicker在紧凑模式下的placeholder间距、activeBar位置适配
    - [修复] 选择非快捷键日期时快捷按钮未更新active状态问题
    - [修复] 日期无法翻页问题 
    - [修复] 拖蓝多删除一位问题
    - [修复] 周总是选中第一天问题
    - [修复] 快捷按钮颜色、居中等样式问题
- Tooltip
    - [修复] 边界情况下弹窗箭头未指向触发元素问题

- Popover
    - [修复] dark模式下箭头位置错误问题
    - [优化] 箭头样式优化

- Table
    - [修复] 火狐浏览器滚动条异常显示修复
    - [修复] 行hover效果异常和hovercontent异常修复
    - [修复] 全局设置表格height不生效的问题
    - [修复] 多语适配
    - [修复] 多表格个别情况滚动条生成异常修复
    - [修复] Table表格滚动条样式修改
    - [修复] hoverContent内容添加状态背景色
    - [优化] 优化表头icon图标显示效果
    - [优化] 优化过滤列气泡弹框样式
    - [优化] 优化拖拽列鼠标光标的样式
    - [优化] filterColumn滚动区域固定在中心区域
    - [优化] 扩展行图标和tree的扩展行图标保持一致
    - [优化] 多选兼容旧版getSelectedDataFunc第一个参数不带_checked属性问题更正
    - [修复] 修复无表头时左侧固定列样式错位的问题
    - [修复] 复antdTable高阶组件丢失tinper底层sort中sortFun回调函数的问题
    - [修复] 修复存在title情况下hoverDom 错位的bug
    - [修复] table排序如果后端排序触发内部排序机制的问题
    - [修复] 清空滚动时缓存的hover的key，避免出现多个hover状态
    - [修复] 修复多选样式框样式错位问题
    - [新增] 表格自动填充fillSpace
    - [优化] 依据css变量获取表格默认行高
    - [修复] 大数据滚动场景下数据改变固定列和非固定列生成dom行数量不一致的问题
    - [修复] 表格合计文字显示不全问题修复
    - [修复] 多选全选矿异常失效问题修复
    - [修复] 空数据时无边框的问题
    - [修复] 无数据时合计行不应该显示的问题

- InputNumber
    - [修复] InputNumber组件禁止向input组件传showClose属性
    - [修复] 禁止用户输入空格等

- Input
    - [修复] 当type为search和showClose同时存在时，hover时清空按钮不切换显隐修改
    - [新增] Input.Search增加debounceDelay属性

- Collapse
    - [修改] 组件body层增加自定义类名属性

- Tabs
    - [修改] 当editCard包裹card再包裹line类型的tabs时样式兼容处理
    - [修改] tabs组件wui-tabs-tab层id属性可自定义
    - [优化] resize时从新计算下拉内容
    - [优化] line形式的页签背景色由白色改为透明
    - [修复] line形式的页签，页签头部文字部分背景色透明

- Clipboard
    - [修复]locale多语默认值

- Steps
    - [优化]active状态的样式

- Radio
    - [优化]按钮居中的样式
## v4.2.1
#### 更新时间：2022-04-12
- Modal
  - [新增] 取消/确定 按钮 增加 快捷键功能  （alt + n  / alt + y）
  - [修复] resizable 下 默认width/height / size  不生效的问题
  - [修复] modal 弹窗宽度大于屏幕宽度时位置错误问题
  - [修复] modal.confirm api destroy 不生效的问题
  - [新增] bodyClassName的api
  - [新增] size支持超大弹窗样式
  - [调整] autofocus 默认到body上
  - [新增] onshow参数中增加dom
  - [优化] 兼容标准类和非标准类情况的children
  - [优化]edge特殊版本浏览器内出现outline边框样式
  - [新增] resizeable时右下角显示小图标样式
  - [修复]全屏被还原时显示位置不精准问题

- Calendar
  - [新增] 多选模式
  - [修复] locale多语
  - [优化] 清理冗余css样式

- ConfigProvider
  - [新增] table api支持全局设置 Table 组件属性默认值

- Switch
  - [优化] switch的dom结构
  - [优化] switch的loading状态icon图标优化
  - [优化] 有文本时，长度显示优化

- Affix
  - [修复] onTargetChange事件触发参数延迟问题
  - [修复] onChange返回的affixed状态不准确问题

- Rate
  - [优化] 默认样式优化

- Steps
  - [新增] type api增加设置number和arrow样式步骤条
  - [优化] 默认图标用Icon组件显示
  - [优化] more模式支持不同尺寸
  - [优化] 删除冗余css代码

- Layout
  - [修复] Row重复生成用户自定义className

- Form
  - [修复] InputNumber校验边框重复
  - [新增] Form在required时row添加类名

- Input
  - [修复] 禁用样式错误
  - [优化] input 清除图标和search按钮增加默认line-height

- InputNumber
  - [修复] InputNumber的min或max为0时，加减按钮被禁用

- DatePicker
  - [修复] decade十年面板禁用`此刻`按钮
  - [修复] 日期范围RangePicker传入MM.YYYY等moment默认非法格式时无法选中
  - [优化] 后缀的日历图标与清除图标size保持一致
  - [修复] 无法传入与原值相同值的问题
  - [修复] DatePicker全部拖蓝选中后按BackSpace键无法删除问题
  - [修复] 传入null无法清空
  - [新增] showTime时依据showHour等配置调整默认格式
  - [新增] RangePicker增加picker=time格式兼容
  - [优化] RangePicker样式调整为紧凑型
  - [修复] 传入值与传入格式不一致时转化为该传入格式的值
  - [修复] 年份为3位时00替换错误

- TimePicker
  - [优化] 增强空值健壮性，区分undefined与null、空字符串

- Popconfirm
  - [修复] dark模式的样式

- Checkbox
  - [优化] 结构优化，文字部分支持链接的点击
  - [调整] Checkbox内部label宽度设置成100%

- Radio
  - [优化] 结构优化，文字部分支持链接的点击

- Select
  - [新增] 支持getSelectAttrs属性，传递自定义dom属性到下拉框的wui-select层
  - [新增] 支持fieldNames属性，自定义节点label、key、options的字段
  - [新增] 支持placement属性，设置选择框弹出的位置
  - [修复] wui-select-selector的边框样式放到wui-select上

- Tree
  - [新增] 支持getCheckboxAttrs属性，传递自定义dom属性到勾选框

- TreeSelect
  - [新增] 支持fieldNames属性，自定义节点label、key、children的字段
  - [新增] 支持placement属性，设置选择框弹出的位置
  - [新增] 支持tagRender属性，自定义tag内容，多选时生效

- Tabs
  - [修复] editable-card类型包裹line类型样式适配
  - [优化] tabs多页签箭头交互优化
  - [新增] 增加content、bar层自定义className

- Collapse
  - [修复] 统一collapse头部鼠标手势
  - [新增] bodyClassName api支持自定义类名

- Popconfirm
  - [修复] 气泡弹窗定制确认、取消按钮快捷键

- Cascader
  - [修复] 级联组件动态加载显示优化

- Anchor
  - [修复] 锚点导航随页面滚动激活

- Form
  - [修复] form内部存在upload非空校验样式添加

- Table
  - [修复] 滚动条hover色值调整、展开子表hover背景色去掉
  - [修复] 表格添加footer自定义类名属性footerClassName
  - [修复] 表格body层增加自定义类名属性bodyClassName
  - [修复] 修复table高阶组件AntdTable的onExpandedRowsChange回调参数错误问题
  - [优化] table高阶组件AntdTable数据字段兼容支持data
  - [修复] 修复bigData默认行高不正确的问题
  - [新增] table多选支持传递rowSelection对象传递方式传参
  - [优化] 单列筛选singleFilter大数据情况下的加载速度和滑动卡顿
  - [新增] 单列定位singleFind支持自动滚动定位和自动上下滚动查找
  - [修复] 高阶组件AntdTable单选选择失效和翻页选择失效修复
  - [新增] table单选支持选择取消
  - [优化] 单选多选列样式优化
  - [修复] 修复table扩展回调函数onExpand参数错误的问题
  - [新增] 新增支持斑马线api
  - [修复] 自定义高度下空数据显示问题
  - [修复] defaultExpandAllRows不生效问题

- Pagination
  - [新增] 新增pageSizeInput属性，支持pageSize下拉框手动输入页码功能
  - [修复] total 与pageSize 同时变化导致渲染页码错误
  - [修复] 分页下拉框size显示不全
  - [修复] 全局设置多语显示错误

- Icon
  - [新增] bip系列字体图标(100多个)

- Dropdown
  - [优化]兼容初次获取不到节点宽度问题
  - [调整]组合menu下的多选样式

- Tooltip
  - [修复]边界情况下弹窗箭头未指向触发元素

## v4.2.0

#### 更新时间：2022-02-22

- DatePicker
    - [重构][UE交互变化] 移除弹出面板的input,交互由弹出面板输入变为直接输入框输入
    - [重构][UE交互变化] DatePicker支持自动补全分隔符，并自动校正错误日期
    - [重构][UE交互变化] DatePicker的showTime由单独弹出TimePanel面板改为与日历面板同时展开
    - [重构][UE交互变化] 时间面板增加hourStep、minuteStep、secondStep、hideDisabledOptions支持步长、时分秒显示、隐藏禁用项等
    - [重构][UE交互变化] RangePicker由一个输入框变为startDate、endDate两个输入框，并可单独禁用其中一个
    - [重构][UE交互变化] RangePicker增加支持预设范围快捷键"
    - [重构][新增API] popupStyle 自定义弹窗样式
    - [重构][新增API] transitionName 自定义弹窗动画
    - [重构][新增API] prevIcon、nextIcon、superPrevIcon、superNextIcon 自定义翻页图标
    - [重构][新增API] direction 组件布局方向
    - [重构][新增API] allowClear 是否允许clearIcon清除
    - [重构][新增API] use12Hours 支持采用12小时制
    - [重构][新增API] getPopupContainer 自定义弹窗挂载点
    - [重构][新增API] separator 自定义RangePicker分隔符
    - [重构][新增API] allowEmpty 是否允许开始或结束日期为空
    - [重构][新增API] ranges 预置的日期范围快捷选项
    - [重构][新增API] onPresetChange 点击预置的日期范围按钮的回调
    - [重构][新增API] onCalendarChange 开始或结束日期变化时的回调
    - [重构][新增API] order 是否启用自动调整顺序(仅适用于 TimeRangePicker )
    - [重构][新增API] id支持自动化测试绑定id"
    - [重构][变化API] placement，建议使用dropdownAlign
    - [重构][变化API] showClose，建议使用allowClear
    - [重构][变化API] closeIcon，建议使用clearIcon
    - [重构][变化API] getCalendarContainer，建议使用getPopupContainer
    - [重构][变化API] outInputFocus，建议使用onFocus
    - [重构][变化API] onDateInputBlur，建议使用onBlur
    - [重构][变化API] outInputKeydown，建议使用onKeyDown
    - [重构][变化API] dateCellRender，建议使用dateRender
    - [重构][变化API] monthCellContentRender，建议使用monthCellRender
    - [重构][变化API] renderFooter，建议使用renderExtraFooter
    - [重构][变化API] dateInputPlaceholder，建议使用placeholder"
    - [重构][移除API] inputTabKeyOpen、showDateInput、showWeekNumber、showOk，默认为true
    - [重构][移除API] keyboardInput、dateInputPlaceholder、inputShowValue、autoTriggerChange，事件相关DOM已不存在
    - [重构][移除API] 废弃renderError、renderSidebar"
    - [重构][官网示例] 重写了官网Demo，示例更丰富友好
    - [重构][官网示例] 重写了API文档，参数介绍更详细"

- Dropdown
    - [优化]兼容Menu场景下的最大宽度限制

- Dropdown.Button
    - [新增]triggerType='icon'时，支持disabled=[]分开控制左右按钮禁用行为
    - [调整]去除button的min-width
    - [新增]分割按钮下拉框自动左对齐功能
    - [优化]重绘渲染的性能问题
    - [调整]分割线高度22px调整为26px

- Modal
    - [修复] 弹窗下的Tooltip、Popover中无法正常响应事件
    - [修复] 解决设置max-width 不能生效问题
    - [修复] modal因内部组件撑开高度导致不能滚动的问题
    - [修复] maskStyle不生效的问题
    - [修复] modal位置错误问题（不居中问题）
    - [新增] maximize、onMaximize属性，支持全屏显示
    - [修复] 解决按esc关闭窗口的问题
    - [修复] enforceFocus 属性不生效问题以及由其引发的 modal 嵌套出现的bug
    - [修复] 多个模态窗 嵌套 互相遮挡的问题
    - [修复] Modal.confirm的底部按钮被Modal遮挡的问题
    - [修复] 弹窗嵌套出现残影问题

- Pagination
    - [新增]支持id属性
    - [修复]分页遮罩层高度未自适应问题
    - [修复]旧dataNum api 使用问题

- Layout
    - [新增]layout 语意标签支持ref 属性

- Cascader
    - [修复]级联组件自适应宽度

- Drawer
    - [修复]抽屉的宽度（width）适配字符串、百分比及数字类型
    - [修复]点击遮罩层关闭抽屉组件内部逻辑实现

- Collapse
    - [修复]折叠组件.collapse类名修改为.wui-collapse-content

- Upload
    - [修复]upload组件，多语方法更新

- Checkbox
    - [修复]传递antd属性时点击事件冒泡放开
    - [修复]放开Checkbox内部的点击默认事件

- Tree
    - [修复]组件更新阶段同步更新禁用的叶子节点
    - [修复]树节点selectable为false，checkable为true的情况下，点击行文本支持勾选

- Select
    - [新增]支持传递id属性
    - [修复]combobox模式下监听value属性的变化，同步更新到组件
    - [修复]火狐浏览器下选中值的字和右边框距离调整
    - [优化]重新组织Demo，覆盖更多的API

- TreeSelect
    - [优化]选中值的样式优化


- AutoComplete
    - [修复]输入字符串时处理需要转义的字符

- Radio
    - [修复]Radio.Button没传字符串时不显示no children
    - [修复]Radio.Group利用数组循环生成Radio时报错问题

- Button
    - [新增]支持id属性
    - [优化]兼容firfox、chrome的样式

- Button.Group
    - [新增]对分割按钮的样式支持

- Table
    - [修复]合计功能负数千分制展示格式错误
    - [修复]解决多选传入rowKey函数第二个参数不生效的问题
    - [修复]修复表格排序中排序列唯一字段为key或者dataIndex
    - [优化]高阶组件AntdTable兼容列拖拽功能
    - [优化]兼容columns为null或者undefind情况

- TimePicker
    - [新增]hourStep、minuteStep、secondStep时间步长API
    - [修复]删除场景下时间显示错误
    - [修复]defaultOpenValue参数无效问题
    - [新增]增加width:100%;
    - [修正]className不生效问题

- Input
    - [新增]onSearch回调增加第二个参数event
    - [修复]Input部分场景无法输入汉字
    - [优化]兼容firfox、chrome的样式

- InputNumber
    - [修复]props的value更新无效
    - [新增]增加接收动态精度变化
    - [新增]增加width:100%;

- Form
    - [新增]增加labelWrap属性，支持label标签换行
    - [新增]input、textarea等的success、validating、warning校验样式
    - [优化]表单内部存在upload时，非空校验样式优化
    - [修复]TimePicker/DatePicker校验样式

- Popover
    - [优化]UE样式弹窗与挂载点距离调整

- Tooltip
    - [修复]弹窗自动计算zIndex错误

- 其它
    - [新增]CDN地址中增加JS调试版本文件tinper-next.dev.js

## v4.1.9

#### 更新时间：2022-01-10

- Table
    - [新增]onRow（record, index）设置行属性
    - [新增]onHeaderRow（record, rowIndex）设置头部行属性
    - [新增]expandIcon（props）自定义展开图标（优先级高于expandedIcon和collapsedIcon）
    - [新增]expandIconCellWidth 自定义展开列宽度
    - [新增]sortDirections 支持的排序方式
    - [新增]onCell（record, RowIndex）设置单元格属性
    - [新增]onHeaderCell（column）设置头部单元格属性
    - [新增]rowSelection 多选单选的配置功能
    - [新增]Table.singleFilter 高价组件，支持多单列过滤功能
    - [新增]Table.singleFind 高阶组件，支持单列定位功能
    - [新增]Table.filterColumn 高阶组件，支持列锁定功能
    - [优化]Table.sort 排序样式调整优化
    - [修复]拖拽换行data异步渲染无法拖拽的问题
    - [修复]ipad端触屏点击引发换行的问题
    - [优化]筛选输入框和icon位置错位的问题
    - [新增]AntdTable高阶组件（Table.AntdTable）
    - [修复]合计负数千位符显示问题
    - [调整]样式类名.table-nodata规范为.wui-table-nodata
    - [调整]Column.props.dragborder="disable"调整为boolean类型false
    - [优化]兼容data为null时报错的问题
    - [修复]rowKey值为0不生效的问题

- Pagination
    - [优化]分页pageSizeOptions兼容数字数组
    - [修复]分页simple格式渲染问题修复
    - [修复]支持分页style 属性

- Tag
    - [修复]disabled 状态标签可以关闭问题

- Menu
    - [优化]子菜单subMenu的dom独立渲染
- Dropdown
    - [优化]左右独立按钮样式bip风格更改
- Select
    - [新增]支持多语locale属性
    - [新增]增加loading样式
- Transfer
    - [修复]补充targetKeys默认值
- Tree
    - [修复]懒加载滚动操作时已选项丢失问题
    - [修复]父节点半选状态点击之后不能变成全选问题
    - [优化]修改可拖拽树的onDrop方法示例代码
    - [修复]树节点禁用状态下选中对号由红色改成灰色
- Drawer
    - [修复]是否显示遮罩层mask兼容处理
- Tabs
    - [修复]页签fade形式时切换阴影处理
    - [新增]支持右键关闭页签
    - [修复]动态添加页签，当页签过多下拉显示页签时更新下拉内容
- Form
    - [修复]表单校验状态变化时active表单项失焦
    - [优化]Form.Item中Upload的必填校验样式

- DatePicker
    - [优化]输入框移除min-width,优化suffix图标显示
    - [修复]未选择日期时禁用`选择时间`按钮
    - [新增]增加locale多语的多种入参兼容(如zhCN，zhCn，zh-cn，zh_CN，zh-CN等)
    - [修复]修复子表中选择日期后未带入值问题
    - [修复]增加日期输入非法值兼容
    - [修复]表格内日期面板无法打开
    - [修复]日期禁用时选择时间按钮未禁用问题
    - [优化]RangePicker面板结束月份与开始月份可以相同
    - [修复]DatePicker选择年月会触发onChange问题
    - [修复]RangePicker\MonthPicker增加自定义额外页脚不生效问题
    - [修复]YearPicker默认值非moment类型报错问题

- TimePicker
    - [修复]时间面板无法正确获取值问题
    - [新增]支持多语locale属性(clear清除支持多语显示)
    - [修复]时间面板展开渲染异常

- InputNumber
    - [修复]max/min作为受控值变化时未更新加减按钮禁用状态
    - [优化]input背景色透明调整为白色

- Input
    - [修复]表格内Input输入框clear无效问题
    - [修复]Input.Password的autocomplete失效问题
    - [新增]Input.Search的onSearch回调增加第二个参数event

- Tooltip
    - [优化]自动计算Tooltip的zIndex，避免被其他图层遮挡

- Modal
    - [新增] modal onCancel 延时关闭功能
    - [优化] modal content 距离顶部位置默认值 30px --》100px
    - [优化] title支持显示空文本
    - [修复] title取值为null情况
    - [修复] 内容超过屏幕不能滚动的问题
    - [修复] 点击mask 不能触发关闭问题
    - [修复] 按esc后 onHide 调用两次
    - [修复] 设置minWidth 和minHeight 不能在modal content上生效的问题
    - [修复] modal confirm 被modal 覆盖的问题
    - [修复] 弹窗嵌套出现残影问题
    - [优化] 设置centered之后的 modal强制居中显示
- Spin
    - [优化] getPopupContainer 当值为函数时默认添加当前节点dom的参数

- Button
    - [优化] link与多个属性作用时，样式优化
    - [修复]特殊场景下同Modal的zIndex冲突导致错位问题

- Rate
    - [优化]默认图标样式更新

- Icon
    - [调整]新bip图标:before样式优先级权重提高

- 其它
    - [优化]TinperNext内置"prop-types": "15.7.2"版本包

## v4.1.8

#### 更新时间：2021-12-06

- Tabs
    - [优化]Tabs组件type="line"类型的样式调整

- Collapse
    - [修复]Collapse组件，包含panel时同时设置activeKey及defaultExpanded时优先级处理
    - [修复]Collapse组件，头部超出一行显示样式处理

- Cascader
    - [修复]Cascader组件，标题和图标重叠调整


- Tooltip
    - [新增]增加overlayMaxHeight弹窗边界溢出自动调整
- Popover
    - [新增]增加overlayMaxHeight弹窗边界溢出自动调整
- DatePicker
    - [修复]选择禁用时间无效
    - [优化]选择时间时面板频繁关闭
    - [修复]WeekPicker面板与输入框周显示不一致
    - [优化]clear的图标样式颜色优化规范
    - [修复]DatePicker、RangePicker点击自动滚动到第一个DatePicker问题

- Form
    - [修复]错误校验提示不生效

- InputNumber.Group
    - [修复]change\blur\focus事件失效

- Pagination
    - [新增]dropdownAlign属性，支持控制页码下拉框方向
    - [修复]分页total=0 页码不展示问题

- Tag
    - [新增]size属性，支持修改tag组件的大小
    - [新增]color属性增加预设色标签，支持BIP风格其他业务场景
    - [修复]onClose事件disabled不生效问题

- Button
    - [优化]按钮(primary、secondary、dark)样式优化,hover态、press态更加明显
- Select、DataPicker、TimePicker
    - [优化]清除按钮hover态更加明显

- Input
    - [新增]type=search的搜索图标i标签支持id

- Modal
    - [修复]children为null时，渲染异常修复
    - [修复]content的div设置style的minHeight、minWidth不生效的问题
    - [优化]content的div内容高度超过可视区域时自动显示滚动条
    - [修复]width/height设置为字符串不生效的问题(例如"80%"及"1200px"的情况)
    - [修复]confirm确认框传入重构后的wrapClassName属性
    - [修复]centered情况下transformY计算出负数时改为0,防止顶部超出屏幕
    - [新增]maskClassName代替backdropClassName
    - [新增]wrapClassName用于外层class定义，className用于兼容代替dialogClassName
    - [修复]enforceFocus 属性不生效问题 以及由其引发的递归错误问题
    - [修复]按esc后 关闭modal 抛错的问题
    - [修复]按esc 不能关闭modal问题
    - [修复]初始化时destroyOnClose 为false 不显示 modal dom;同时解决了 多个模态窗 嵌套 互相遮挡的问题(指定情况)
    - [修复]destroyOnClose 为false ，弹窗嵌套表单控件，隐藏时表单内容 延时消失问题
    - [修复]modal.confirm 使用时被覆盖的bug
    - [修复]设置centered后窗体大小通过交互变化时 不能强制居中的问题
    - [修复]仅设置minWidth 和minHeight 在modal content上不生效的问题(不通过contentStyle设置 minHeight/minWidth)

- Checkbox
    - [优化]选中对号图标ue规范优化(缩小)
    - [新增]props.onChange（checked,event）增加event对象参数

- Tree
    - [修复]禁用状态的treeNode的checked值不受onCheck事件影响
- Table
    - [修复]rowKey为function时，多选失效的问题
    - [修复]外部其它拖拽会导致拖拽行蓝色线条显示的问题
    - [修复]multiSelect(bigData(Table), Checkbox)的情况下勾选状态不正确的问题
    - [新增]大数据层次树表格下的多选支持
    - [优化]footer的div生成结构位置优化

## v4.1.7

#### 更新时间：2021-11-16

- Modal
    - [重构]modal重构优化、性能提升及规避chrome花屏问题
    - [移除]部分历史api移除，详见api文档
    - [修复]width\height设置为string类型无效问题

- Table
    - [优化]兼容node:server编译时navigator对象找不到的报错问题
    - [优化]useFixedHeader默认false->true
    - [修复]复杂表格中行过滤表头行对不齐的问题
    - [优化]清理th多余的datasource属性
    - [重构]大数据bigData重构优化，快速滚动性能提升10倍+及闪屏问题修复
    - [重构]行拖拽rowDraggAble重构优化，性能提升及拖拽高亮线条样式优化
    - [新增]bigData下支持行拖拽
    - [修复]拖拽行TR样式丢失问题
    - [修复]相同行展开子表时expandedRowRender内容高度发生变化不更新的问题
    - [修复]chrome、firefox、edge各浏览器兼容的滚动条计算及显示问题
    - [修复]部分场景下表头与列数据错落不齐问题
    - [修复]部分场景下设置百分比列宽总和100%，y滚动条出现时多出横向滚动条问题
    - [修复]ie下头部行高自增长导致循环渲染的问题
    - [修复]固定列取消固定后table的div渲染不更新问题
    - [修复]筛选和checkbox连用时样式错位问题

- Message
    - [优化]动画animate的span更换为div

- Form
    - [修复]colon冒号API无效问题；
    - [修复]移除label的min-width默认值

- Form.Item
    - [修复]Scheme class未编译问题，依赖async-validator包4.0.5->4.0.7

- Button
    - [优化]ue规范带文字按钮min-width:60px,只有图标的按钮min-width:auto

- Icon
    - [优化]字体文件内容base64打包到css
    - [新增]rotate属性, 支持图标角度旋转
    - [修复]style属性不生效问题

- Input
    - [优化]input的sm下prefix\sudffix行高规范为28px
    - [优化]InputGroup.Button和InputGroup.Addon整合
    - [优化]autoComplete增加默认值'off'
    - [修复]textarea显示文本行数与maxRows不一致问题


- InputNumber
    - [新增]autoFix属性，支持设置min或max属性时，用户输入onChange时越界自动校正为min或max
    - [修复]修复禁用状态下加减按钮的事件仍可被触发问题
    - [新增]addonBefore，addonAfter属性，支持在inputNumber前后增加额外的文字描述或select组件
    - [优化]增减按钮UE图标

- Pagination
    - [修复]Pagination的dataNum属性会在onChange后被重置的问题
    - [修复]disabled属性无效的问题
    - [修复]页码已被选中时再次点击异常的问题

- DatePicker
    - [修复]RangePicker的结束日期为空时先选结束年月，再选开始日期时结束日期被联动更新问题
    - [修复]日历面板PrevIcon、nextIcon等按钮点击时触发日期onChange问题
    - [优化]同Input高度不一致，日期图标导致超过28px规范的问题

- Menu
    - [修复]键盘操作失效问题

- Tag
    - [优化]UE规范颜色透明度调整

- Checkbox
    - [修复]defaultChecked设置不生效问题
    - [优化]选中状态的样式优化
    - [修复]Checkbox.Group的value和default均不存在时默认值为 []

- Radio
    - [修复]Radio 组件 initChecked 设置不生效问题
    - [修复]RadioGroup 组件 initValue 设置不生效问题
    - [优化]选中状态的样式优化

- Collapse
    - [修复]expandIcon属性兼容函数类型
    - [修复]collapsible属性值为header时多添加出一层dom从而导致的样式调整
    - [修复]头部标题超出一行时样式调整
    - [修复]activeKey属性接收值类型兼容数组、字符串、数字

- Cascader
    - [修复]如果级联组件在modal或dradwer中，则挂载到modal或drawer上
    - [修复]当选项文字过多时显示样式调整

- Upload
    - [修复]上传列表文字过长时样式调整
    - [修复]上传进度条百分比保留两位小数

- Tree
    - [修复]懒加载时节点状态问题
    - [修复]懒加载时多选框不可去掉的问题

- AutoComplete
    - [修复]value变更时同步option信息
    - [修复]回车按键时，(偶现)显示选中值错误的问题

- List
    - [新增]List列表组件

- Skeleton
    - [新增]Skeleton骨架屏组件

- ConfigProvider
    - [新增]ConfigProvider全局化配置组件

- Slider
    - [优化]tipFormatter属性tip显示优化

- Affix
    - [修复]getPopupContainer属性有时会溢出容器问题修复

## v4.1.6

#### 更新时间：2021-10-18

- Steps
    - [新增]more属性，支持更多的切换交互
    - [优化]Step兼容支持onClick事件属性

- DatePicker
    - [修复]clearIcon遮挡suffixIcon的问题
    - [修复]locale多语显示问题(rc底层彻底修复)

- DatePicker.RangePicker
    - [修复]图标不居中的样式问题

- DatePicker.YearPicker
    - [修复]最外层div重复触发'onChange','onSelect'的问题

- TimePicker
    - [优化]支持自动补全及一些必要的输入自动校正
    - [优化]火狐浏览器下滚动条宽度样式

- WeekPicker
    - [修复]后缀图标不显示问题

- Input
    - [修复]placeholder样式偶尔不居中的样式问题

- Input.Search
    - [修复]点击清空按钮调用onSearch方法参数值
    - [优化]点击清空按钮阻止冒泡

- Tooptip
    - [优化]mouseEnterDelay默认延时0->0.5，解决鼠标快速移动时显示遮挡的问题

- TreeSelect
    - [修复]bordered不生效的问题
    - [优化]多选时高度UE规范为28px

- Select
    - [优化]多选时高度UE规范为28px

- Tree
    - [优化]onSelect方法提供event对象
    - [修复]checkStrictly情况下不能选择的问题

- Dropdown.Button
    - [新增]id属性，左边按钮支持id

- Table
    - [修复]在鼠标离开行时没有清空currentHoverRecord记录的问题
    - [修复]折叠展开图标不对齐的样式问题
    - [修复]多选列下的排序图标的样式问题
    - [修复]内容行边线偶尔显示过粗的样式问题
    - [优化]默认列头高度UE规范为30px
    - [优化]默认内容行高UE规范为35px
    - [优化]列宽度拖拽线条颜色样式
    - [优化]bordered默认为true->false，仅头部默认显示边线样式
    - [优化]expandIconAsCell实现，如果存在左侧固定列，则显示到左侧固定列
    - [优化]bigData.props.isTree 为boolean才生效，默认为false->null

- Popconfirm
    - [优化]兼容onClose和onConfirm
    - [新增]locale支持多语

- Menu
    - [修复]box-shadow的样式

- Checkbox.Group
    - [修复]初始化value/defaultValue为[]的问题

- Modal
    - [新增]confirm增加按钮属性okButtonProps、cancelButtonProps
    - [新增]locale支持多语

- Icon
    - [优化]字体文件base64打包到css

- Breadcrumb
    - [修复]chilren数组部分存在null报错问题

- Collapse
    - [新增]expandIcon自定义图标属性支持function类型

- Form.Item
    - [优化]label间距UE规范为12px->8px
    - [优化]依赖包async-validator:4.0.5->4.0.7解决Scheme class未编译问题

- getPopupContainer
    - [优化]affix、spin、drawer、popconfirm、notification、modal、image规范getPopupContainer属性
    - [优化]modal及drawer情况下datepicker、dropdown、select、timepicker、tooltip、treeselect的getPopupContainer属性默认挂载行为

