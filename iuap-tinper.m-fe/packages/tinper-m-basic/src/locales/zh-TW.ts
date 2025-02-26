const typeTemplate = '${label}不是一個有效的${type}'

export default {
  locale: 'zh-TW',
  Common: {
    confirm: '確定',
    cancel: '取消',
    loading: '加載中',
    close: '關閉'
  },
  CardBox: {
    label: '標題',
    delete: '刪除',
    fold: '收起',
    more: '查看更多'
  },
  DateTimePicker: {
    popTitle: '日期時間選擇',
    placeholder: '請選擇',
    clearAndReturn: '清空並返回',
    week: '週',
    year: '年',
    month: '月',
    day: '日',
    hour: '時',
    minute: '分',
    second: '秒'
  },
  Empty: {
    noData: '暫無數據',
    noCollect: '暫無收藏',
    noResult: '暫無搜尋結果'
  },
  FormItemWrapper: {
    confirmText: '我知道了',
    errorText: '填寫信息有誤!請重新填寫'
  },
  Input: { label: '文本框' },
  NavBar: { title: '標題' },
  Radio: {
    selected: '已選',
    selectAll: '全選',
    data: '條',
    reset: '重置'
  },
  Search: { placeholder: '輸入進行搜索' },
  TimePicker: {
    popTitle: '時間選擇',
    placeholder: '請選擇',
    clearAndReturn: '清空並返回',
    hour: '時',
    minute: '分',
    second: '秒',
    am: '上午',
    pm: '下午'
  },
  DatePicker: {
    AM: '上午',
    PM: '下午'
  },
  TimeRangePicker: {
    popTitle: '日期時間範圍',
    placeholder: '開始日期-結束日期',
    clearAndReturn: '清空並返回',
    year: '年',
    month: '月',
    day: '日',
    hour: '時',
    minute: '分',
    to: '至'
  },
  Calendar: {
    title: '日期選擇',
    confirm: '確定',
    start: '開始',
    end: '結束',
    today: '今日',
    markItems: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  Modal: {
    ok: '我知道了',
    confirm: '確定',
    cancel: '取消'
  },
  Mask: { name: '背景蒙層' },
  Cascader: { placeholder: '請選擇', },
  Dialog: { ok: '我知道了' },
  Switch: { name: '開關' },
  InfiniteScroll: {
    noMore: '沒有更多了',
    failedToLoad: '加载失败',
    retry: '重新加载'
  },
  PullToRefresh: {
    pulling: '下拉刷新',
    canRelease: '釋放立即刷新',
    complete: '刷新成功'
  },
  ErrorBlock: {
    default: { title: '找不到頁面' },
    disconnected: {
      title: '網路已斷開',
      description: '請檢查網路狀態後重試'
    },
    failed: {
      title: '登錄信息失效',
      description: '請重新登入或聯絡技術人員'
    },
    denied: { title: '暫無權限存取該頁面' },
    error: {
      title: '服務出錯了',
      description: '請稍後再試'
    }
  },
  Form: {
    required: '必填',
    optional: '選填',
    defaultValidateMessages: {
      default: '${label}字段驗證錯誤',
      required: '請輸入${label}',
      enum: '${label}必須是其中一個[${enum}]',
      whitespace: '${label}不能為空字符',
      date: {
        format: '${label}日期格式無效',
        parse: '${label}不能轉換為日期',
        invalid: '${label}是一個無效日期'
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
        len: '${label}須為${len}個字符',
        min: '${label}最少${min}個字符',
        max: '${label}最多${max}個字符',
        range: '${label}須在${min}-${max}字符之間'
      },
      number: {
        len: '${label}必須等於${len}',
        min: '${label}最小值為${min}',
        max: '${label}最大值為${max}',
        range: '${label}須在${min}-${max}之間'
      },
      array: {
        len: '須為${len}個${label}',
        min: '最少${min}個${label}',
        max: '最多${max}個${label}',
        range: '${label}数量須在${min}-${max}之間'
      },
      pattern: { mismatch: '${label}與模式${pattern}不匹配' }
    },
  },
  InputNumber: {
    hundred: '百',
    thousand: '千',
    tenThousand: '萬',
    hundredThousand: '十萬',
    million: '百萬',
    tenMillion: '千萬',
    hundredMillion: '億',
    billion: '十億',
    tenBillion: '百億',
    hundredBillion: '千億',
    trillion: '萬億',
    tenTrillion: '十萬億',
    hundredTrillion: '百萬億',
    quadrillion: '千萬億',
  },
  ImageUploader: { upload: '上傳' },
  Tag: {
    start: '開立',
    info: '審批中',
    success: '已完成',
    warning: '已退回',
    danger: '不通過',
    invalid: '已取消',
  },
  ErrorMessage: {
    exceptionDetails: '异常詳情',
    escalation: '上報',
    close: '關閉',
    replicatingSuccess: '複製成功',
    copy: '複製',
    status: '狀態碼',
    linkID: '連結ID',
  },
  Avatar: {
    maxText: '等${num}人'
  },
}
