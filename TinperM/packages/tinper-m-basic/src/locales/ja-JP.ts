const typeTemplate = '${label} は有効な ${type} ではありません'

export default {
  locale: 'ja-JP',
  Common: {
    confirm: '確認',
    cancel: 'キャンセル',
    loading: '読み込み中',
    close: '閉じる'
  },
  CardBox: {
    label: 'タイトル',
    delete: '削除',
    fold: '片付け',
    more: 'もっと見る'
  },
  DateTimePicker: {
    popTitle: '日時の選択',
    placeholder: '選択してください',
    clearAndReturn: '空にして戻る',
    week: '週',
    year: '年(ねん)',
    month: '月(つき)',
    day: '日',
    hour: '時',
    minute: '分',
    second: '秒(びょう)'
  },
  Empty: {
    noData: 'データなし',
    noCollect: 'コレクションなし',
    noResult: '検索結果なし',
  },
  FormItemWrapper: {
    confirmText: 'なるほど',
    errorText: '情報の入力が間違っています！再記入してください'
  },
  Input: { label: 'テキストボックス' },
  NavBar: { title: 'タイトル' },
  Radio: {
    selected: '選択済み',
    selectAll: '全選',
    data: 'ストリップ',
    reset: 'リセット'
  },
  Search: { placeholder: '輸入進行搜索' },
  TimePicker: {
    popTitle: '時間選択',
    placeholder: '選択してください',
    clearAndReturn: '空にして戻る',
    hour: '時',
    minute: '分',
    second: '秒(びょう)',
    am: '朝',
    pm: '午後'
  },
  DatePicker: {
    AM: '朝',
    PM: '午後'
  },
  TimeRangePicker: {
    popTitle: '日時範囲',
    placeholder: '開始日-終了日',
    clearAndReturn: '空にして戻る',
    year: '年(ねん)',
    month: '月(つき)',
    day: '日',
    hour: '時',
    minute: '分',
    to: 'まで'
  },
  Calendar: {
    title: '日付の選択',
    confirm: 'なるほど',
    start: '開始',
    end: '結束',
    today: '今日',
    markItems: ['いち', 'に', 'さん', 'し', 'ご', 'ろく', 'にち'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  Modal: {
    ok: 'なるほど',
    confirm: 'なるほど',
    cancel: 'キャンセル'
  },
  Mask: { name: '背景マスク' },
  Cascader: { placeholder: '選択下さい' },
  Dialog: { ok: 'なるほど' },
  Switch: { name: 'スイッチ' },
  InfiniteScroll: {
    noMore: 'これ以上',
    failedToLoad: '読み込みに失敗しました',
    retry: '再試行',
  },
  PullToRefresh: {
    pulling: '下にスクロールして更新',
    canRelease: '解放してすぐに更新',
    complete: 'リフレッシュ成功',
  },
  ErrorBlock: {
    default: { title: 'ページが見つかりません' },
    disconnected: {
      title: 'ネットワークが切断されました',
      description: 'ネットワークの状態を確認して再試行してください',
    },
    failed: {
      title: 'ログイン情報が無効です',
      description: '再度ログインするか、技術者にお問い合わせください。'
    },
    denied: { title: 'このページへのアクセス許可がまだありません' },
    error: {
      title: 'サービスエラー',
      description: '後でもう一度試してください'
    }
  },
  Form: {
    required: '必須',
    optional: 'オプション',
    defaultValidateMessages: {
      default: '${label} のフィールド検証エラー',
      required: '${label} を入力してください',
      enum: '${label} は [${enum}] のいずれかでなければなりません',
      whitespace: '${label} を空白文字にすることはできません',
      date: {
        format: '${label} の日付形式が無効です',
        parse: '${label} は日付に変換できません',
        invalid: '${label} は無効な日付です',
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
        hex: typeTemplate,
      },
      string: {
        len: '${label} の長さは ${len} 文字でなければなりません',
        min: '${label} の長さは少なくとも ${min} 文字でなければなりません',
        max: '${label} の長さは最大 ${max} 文字でなければなりません',
        range: '${label} の長さは ${min}-${max} 文字の間でなければなりません',
      },
      number: {
        len: '${label} は ${len} と等しくなければなりません',
        min: '${label} は最小 ${min} でなければなりません',
        max: '${label} は最大 ${max} でなければなりません',
        range: '${label} は ${min}-${max} の間でなければなりません',
      },
      array: {
        len: '${label} は ${len} 個である必要があります',
        min: '${label} は少なくとも ${min} 個',
        max: '${label} は最大 ${min} 個',
        range: '${label} の数は ${min}-${max} の間でなければなりません',
      },
      pattern: { mismatch: '${label} はパターン ${pattern} と一致しません', },
    },
  },
  InputNumber: {
    hundred: '百',
    thousand: '千',
    tenThousand: '万',
    hundredThousand: '10万',
    million: '百万',
    tenMillion: '千万',
    hundredMillion: '億',
    billion: '10億',
    tenBillion: '百億',
    hundredBillion: '千億',
    trillion: '兆',
    tenTrillion: '10万億',
    hundredTrillion: '100兆',
    quadrillion: '千万億',
  },
  ImageUploader: { upload: 'アップロード' },
  Tag: {
    start: '開設',
    info: '承認中',
    success: '完了',
    warning: '返品済',
    danger: '不合格',
    invalid: 'キャンセル済み',
  },
  ErrorMessage: {
    exceptionDetails: '例外の詳細',
    escalation: 'エスカレーション',
    close: '閉じる',
    replicatingSuccess: 'コピー成功',
    copy: 'レプリケーション',
    status: 'じょうたいコード',
    linkID: 'リンクID',
  },
  Avatar: {
    maxText: 'ら${num}人'
  },
}
