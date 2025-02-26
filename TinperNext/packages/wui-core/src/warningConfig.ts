/**
 * 此处维护各组件旧api升级新api的关系
 */
export default {
    DatePicker: {
        dropdownClassName: 'popupClassName', // 额外的弹出日历 className
        // 不提示 presets: 'ranges', // 预设时间范围快捷选择
        showClear: "allowClear",
        showClose: "allowClear",
        getCalendarContainer: "getPopupContainer",
        closeIcon: "clearIcon",
        dateCellRender: "dateRender",
        monthCellContentRender: "monthCellRender",
        renderIcon: "suffixIcon",
        renderFooter: "renderExtraFooter",
        defaultPanelShown: "defaultOpen",
        placement: "dropdownAlign",
        outInputKeydown: "onKeyDown",
        onDateInputBlur: "onBlur",
        outInputFocus: "onFocus",
        keyboardInput: "inputReadOnly"
    },
    TimePicker: {
        inputIcon: 'suffixIcon', // 自定义的选择框后缀图标   补充文档
        showClear: "allowClear",
        onOpen: "onOpenChange",
        onClose: "onOpenChange",
        addon: "renderExtraFooter"
    },
    Input: {
        showClose: 'allowClear', // 是否显示清空按钮
        // showCount: 'showMaxLabel', // textarea 是否显示最大允许输入长度
    },
    InputNumber: {
        formatter: 'format', // 显示内容的格式化
        hideActionButton: 'controls', // 隐藏加减按钮
    },
    Select: {
        onKeyDown: "onInputKeyDown",
        data: "options",
        multiple: "mode",
        tags: "mode",
        supportWrite: "mode",
        combobox: "mode",
        // dropdownClassName: 'popupClassName', // 代码内没实现popupClassName
    },
    Modal: {
        show: "visible",
        tempHide: "destroyOnClose",
        backdrop: "mask",
        onHide: "onCancel",
        onEnter: "onShow",
        onEntering: "onShow",
        onEntered: "onShow",
        onExit: "onHide",
        onExiting: "onHide",
        onExited: "onHide",
        onBackdropClick: "onMaskClick",
        dialogClassName: "className",
        backdropStyle: "maskStyle",
        container: "getPopupContainer",
        getContainer: "getPopupContainer",
        backdropClosable: "maskClosable"
    },
    Tag: {
        colors: "color",
        deleted: "closable",
        tagClick: "onClick",
    },
    Dropdown: {
        delayShow: "mouseEnterDelay",
        delayHide: "mouseLeaveDelay",
        // overlay: 'menu', // 要显示的菜单
        onVisibleChange: 'onOpenChange', // 下拉菜单显示与否的钩子函数
        visible: 'open', // 菜单是否显示
    },
    Collapse: {
        onSelect: "onChange",
        eventKey: 'key', // 当多个panel存在时,每个panel的标记
    },
    Tabs: {
        tabBarPosition: "tabPosition",
        extraContent: 'tabBarExtraContent', // 在导航上添加扩展元素
        onPrevClick: 'onTabScroll', // 当出现滚动时，点击上一个时的回调函数 (onTabScroll tab 滚动时触发,通过参数direction: left | right | top | bottom 区分)
        onNextClick: 'onTabScroll', // 当出现滚动时，点击下一个时的回调函数
    },
    Tooltips: {
        onVisibleChange: 'onOpenChange', // 使用控制弹出层显示时的钩子函数
        defaultVisible: 'defaultOpen', // 默认是否显隐
        onMouseOut: "onMouseLeave",
        rootClose: "maskClosable",
        container: "getPopupContainer",
        show: "visible"
    },
    Popconfirm: {
        onConfirm: 'onClose', // 点击确认的回调
    },
    Spin: {
        show: 'spinning',
        container: 'getPopupContainer'
    },
    Affix: {
        container: 'getPopupContainer'
    },
    Drawer: {
        container: 'getPopupContainer',
        // getPopupContainer: 'getPopupContainer',
        showMask: 'mask', // 是否显示遮罩
        show: 'visible', // 是否显示抽屉组件
        showClose: 'closable', // 是否显示关闭按钮
    },
    Image: {
        container: 'getPopupContainer',
        title: 'alt', // 显示当前图片的alt属性及图片尺寸
        url: 'src', // 图片查看器中图片的地址
    },
    Notification: {
        container: 'getPopupContainer',
        content: 'description', // 通知提醒内容，必选
        title: 'message', // 通知提醒标题，必选
        position: 'placement', // 显示位置
    },
    Table: {
        isShow: 'ifshow',
        haveExpandIcon: 'showExpandIcon'
    },
    AutoComplete: {
        show: 'open',
        onSelectOption: 'onSelect'
    },
    // Progress: {
    //     successPercent: 'success' // 已完成的分段百分比 -- 未兼容
    // },
    Calendar: {
        onTypeChange: 'onPanelChange', // 面板切换的回调函数
        dateCellContentRender: 'dateFullCellRender', // 日期内容渲染回调函数
        monthCellContentRender: 'monthFullCellRender', // 月份内容渲染回调函数
        // defaultType: 'mode', // 默认渲染类型：小时／日期／月份（hour/date/month)
    },
    // Table: {
    //     getPopupContainer: '', // 设置表格内各类浮层的渲染节点，如筛选菜单  -- 未兼容
    //     components: '', // 覆盖默认的 table 元素 -- 未兼容
    //     pagination: '', // 分页器，参考配置项或pagination文档，设为 false 时不展示和进行分页
    //     showSorterTooltip: '', // 表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性
    //     checkStrictly: '', // checkable 状态下节点选择完全受控（父子数据选中状态不再关联）
    //     preserveSelectedRowKeys: '', // 当数据被删除时仍然保留选项的key  -- 未兼容
    //     haveExpandIcon: 'rowExpandable', // 控制是否显示行展开icon.注：该参数只有在和expandedRowRender同时使用才生效
    //     expandIconCellWidth: 'columnWidth', // 自定义展开列宽度
    //     order: 'sortOrder', // 设置排序 -- 未兼容
    // },
    Alert: {
        colors: 'type', // 指定警告提示的样式，有四种选择success、info、warning、error
        onDismiss: 'onClose', // 关闭alert触发的方法
        closeLabel: 'closeText', // 关闭按钮文字
    },
    // Anchor: {
    //     activeKey: 'getCurrentAnchor', // 指定高点锚点项
    // },
    Transfer: {
        // onSearchChange: 'onSearch', // 当搜索域变化的回调函数 参数(direction: 'left')
        // showCheckbox: 'showSelectAll', // 是否显示Checkbox复选框
    },
    // Breadcrumb: {
    //     overlay: 'menu', // 菜单配置项 -- 未兼容
    // },
    Radio: {
        selectedValue: 'value', // 被选中的radio值
    },
    // Tabs: {
    //     // style: 'tabBarStyle', // 添加到tab上的style
    //     // tabBarStyle: 'type', // 页签的基本样式,可选 line、card editable-card 类型
    // },
    Tree: {
        // className: 'rootClassName',
        // style: 'rootStyle',
        // openIcon: 'switcherIcon', // 自定义展开节点图标的名称 (switcherIcon为自定义树节点的展开/折叠图标) -- 暂不兼容
        // closeIcon: 'switcherIcon', // 自定义关闭节点图标的名称 -- 暂不兼容
        // lazyLoad: 'virtual', // 是否使用懒加载（适用于大数据场景）
    },
    TreeSelect: {
        dropdownClassName: 'popupClassName', // 下拉菜单的 className 属性
    },
    Message: {
        getContainer: 'getPopupContainer',
    },
    Pagination: {
        activePage: 'current', // 哪一页是激活状态
        onSelect: 'onChange', // 切换页的方法
        dataNum: 'pageSize', // 每页显示条数在 dataNumSelect 数组中的下标 index。例如每页显示 15 条，那么 dataNum 的值应为 '15' 在 ['5','10','15','20'] 中的下标：2
        dataNumSelect: 'pageSizeOptions', // 每页多少条的下拉选择Option内容
        showJump: 'showQuickJumper', // 是否显示跳页选择
        onDataNumSelect: 'onShowSizeChange', // 选择每页多少条的回调函数
    },
    Divider: {
        dashed: 'lineType'
    },
    // ConfigProvider: {
    //     size: 'componentSize', // 设置组件的尺寸
    // }
}
// 文档 内 需要 增加 对齐 废弃属性
// hideActionButton  补充实现
// tree switcherIcon 需要实现
// archor activeKey 需要确认
// tabBarStyle  确认