const typeTemplate = '${label}不是一个有效的${type}'

export const base = {
  locale: 'zh-CN',
  Common: {
    confirm: '确定',
    cancel: '取消',
    loading: '加载中',
    close: '关闭'
  },
  CardBox: {
    label: '标题',
    delete: '删除',
    fold: '收起',
    more: '查看更多'
  },
  DateTimePicker: {
    popTitle: '日期时间选择',
    placeholder: '请选择',
    clearAndReturn: '清空并返回',
    week: '周',
    year: '年',
    month: '月',
    day: '日',
    hour: '时',
    minute: '分',
    second: '秒'
  },
  Empty: {
    noData: '暂无数据',
    noCollect: '暂无收藏',
    noResult: '暂无搜索结果'
  },
  FormItemWrapper: {
    confirmText: '我知道了',
    errorText: '填写信息有误!请重新填写'
  },
  Input: { label: '文本框' },
  NavBar: { title: '标题' },
  Radio: {
    selected: '已选',
    selectAll: '全选',
    data: '条',
    reset: '重置'
  },
  Search: { placeholder: '输入进行搜索' },
  TimePicker: {
    popTitle: '时间选择',
    placeholder: '请选择',
    clearAndReturn: '清空并返回',
    hour: '时',
    minute: '分',
    second: '秒',
    am: '上午',
    pm: '下午'
  },
  DatePicker: {
    AM: '上午',
    PM: '下午',
    clearAndReturn: '清空并返回'
  },
  TimeRangePicker: {
    popTitle: '日期时间范围',
    placeholder: '开始日期-结束日期',
    clearAndReturn: '清空并返回',
    year: '年',
    month: '月',
    day: '日',
    hour: '时',
    minute: '分',
    to: '至'

  },
  Calendar: {
    title: '日期选择',
    confirm: '确定',
    start: '开始',
    end: '结束',
    today: '今日',
    markItems: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  Modal: {
    ok: '我知道了',
    confirm: '确定',
    cancel: '取消'
  },
  Mask: { name: '背景蒙层' },
  Cascader: { placeholder: '请选择' },
  Dialog: { ok: '我知道了' },
  Switch: { name: '开关' },
  InfiniteScroll: {
    noMore: '没有更多了',
    failedToLoad: '加载失败',
    retry: '重新加载'
  },
  PullToRefresh: {
    pulling: '下拉刷新',
    canRelease: '释放立即刷新',
    complete: '刷新成功'
  },
  ErrorBlock: {
    default: { title: '找不到页面' },
    disconnected: {
      title: '网络已断开',
      description: '请检查网络状态后重试'
    },
    failed: {
      title: '登录信息失效',
      description: '请重新登录或联系技术人员'
    },
    denied: { title: '暂无权限访问该页面' },
    error: {
      title: '服务出错了',
      description: '请稍后再试'
    }
  },
  Form: {
    required: '必填',
    optional: '选填',
    defaultValidateMessages: {
      default: '${label}字段验证错误',
      required: '请输入${label}',
      enum: '${label}必须是其中一个[${enum}]',
      whitespace: '${label}不能为空字符',
      date: {
        format: '${label}日期格式无效',
        parse: '${label}不能转换为日期',
        invalid: '${label}是一个无效日期'
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: '${label}须为${len}个字符',
        min: '${label}最少${min}个字符',
        max: '${label}最多${max}个字符',
        range: '${label}须在${min}-${max}字符之间'
      },
      number: {
        len: '${label}必须等于${len}',
        min: '${label}最小值为${min}',
        max: '${label}最大值为${max}',
        range: '${label}须在${min}-${max}之间'
      },
      array: {
        len: '须为${len}个${label}',
        min: '最少${min}个${label}',
        max: '最多${max}个${label}',
        range: '${label}数量须在${min}-${max}之间'
      },
      pattern: { mismatch: '${label}与模式${pattern}不匹配' }
    },
  },
  InputNumber: {
    hundred: '百',
    thousand: '千',
    tenThousand: '万',
    hundredThousand: '十万',
    million: '百万',
    tenMillion: '千万',
    hundredMillion: '亿',
    billion: '十亿',
    tenBillion: '百亿',
    hundredBillion: '千亿',
    trillion: '万亿',
    tenTrillion: '十万亿',
    hundredTrillion: '百万亿',
    quadrillion: '千万亿',
  },
  ImageUploader: { upload: '上传' },
  Tag: {
    start: '开立',
    info: '审批中',
    success: '已完成',
    warning: '已退回',
    danger: '不通过',
    invalid: '已取消',
  },
  ErrorMessage: {
    exceptionDetails: '异常详情',
    escalation: '上报',
    close: '关闭',
    replicatingSuccess: '复制成功',
    copy: '复制',
    status: '状态码',
    linkID: '链路ID',
  },
  Avatar: {
    maxText: '等${num}人'
  },
}

export type Locale = typeof base
