const typeTemplate = '${label} is not a valid ${type}'

export default {
  locale: 'en-US',
  Common: {
    confirm: 'OK',
    cancel: 'Cancel',
    loading: 'Loading',
    close: 'Close',
  },
  CardBox: {
    label: 'Title',
    delete: 'Delete',
    fold: 'Hide',
    more: 'View More'
  },
  DateTimePicker: {
    popTitle: 'Date and time selection',
    placeholder: 'Please select',
    clearAndReturn: 'Clear And Return',
    week: 'Week',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second'
  },
  Empty: {
    noData: 'There is no data',
    noCollect: 'No favorites yet',
    noResult: 'No results',
  },
  FormItemWrapper: {
    confirmText: 'OK',
    errorText: 'Wrong Info entered. Please enter again'
  },
  Input: { label: 'Text Box' },
  NavBar: { title: 'Title' },
  Radio: {
    selected: 'Selected',
    selectAll: 'Select All',
    data: 'pieces',
    reset: 'Reset'
  },
  Search: { placeholder: 'Enter to search' },
  TimePicker: {
    popTitle: 'Select Time',
    placeholder: 'Please select',
    clearAndReturn: 'Clear And Return',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    am: 'AM',
    pm: 'PM'
  },
  DatePicker: {
    AM: 'AM',
    PM: 'PM'
  },
  TimeRangePicker: {
    popTitle: 'Date Time Range',
    placeholder: 'Start Date-End Date',
    clearAndReturn: 'Clear And Return',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    to: 'To'
  },
  Calendar: {
    title: 'Select date',
    confirm: 'OK',
    start: 'Start',
    end: 'End',
    today: 'Today',
    markItems: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  Modal: {
    ok: 'OK',
    confirm: 'OK',
    cancel: 'Cancel'
  },
  Mask: { name: 'Background layer' },
  Cascader: { placeholder: 'Please select' },
  Dialog: { ok: 'OK' },
  Switch: { name: 'Switch' },
  InfiniteScroll: {
    noMore: 'No more',
    failedToLoad: 'Failed to load',
    retry: 'Reload'
  },
  PullToRefresh: {
    pulling: 'Pull down to refresh',
    canRelease: 'Release to refresh immediately',
    complete: 'Refresh successfully'
  },
  ErrorBlock: {
    default: { title: 'Page Not Found' },
    disconnected: {
      title: 'The network is disconnected',
      description: 'Please check the network status and try again'
    },
    failed: {
      title: 'Invalid Login Information',
      description: 'Please log in again or contact technicians'
    },
    denied: { title: 'No permission to access this page yet' },
    error: {
      title: 'Service error',
      description: 'Please try again later'
    }
  },
  Form: {
    required: 'Required',
    optional: 'Optional',
    defaultValidateMessages: {
      default: '${label} field validation error',
      required: 'Please enter ${label}',
      enum: '${label} must be either of [${enum}]',
      whitespace: '${label} cannot be empty',
      date: {
        format: 'Invalid date format of ${label}',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date'
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
        len: '${label} must contain ${len} characters',
        min: '${label} must contain ${min} characters at least',
        max: 'Up to ${max} characters allowed for ${label}',
        range: '${label} must contain ${min}-${max} characters'
      },
      number: {
        len: '${label} must be ${len}',
        min: 'The minimum value of ${label} is ${min}',
        max: 'The maximum value of ${label} is ${max}',
        range: '${label} must be between ${min}-${max}'
      },
      array: {
        len: '${len} ${label} required',
        min: 'At least ${min} ${label} required',
        max: 'Up to ${max} ${label} allowed',
        range: 'The number of ${label} must be between ${min}-${max}'
      },
      pattern: { mismatch: '${label} does not comply with pattern ${pattern}' }
    },
  },
  InputNumber: {
    hundred: 'Hundred',
    thousand: 'Thousand',
    tenThousand: 'Ten-thousand',
    hundredThousand: 'Hundred-thousand',
    million: 'Million',
    tenMillion: 'Ten-million',
    hundredMillion: 'Hundred-million',
    billion: 'Billion',
    tenBillion: 'Ten-billion',
    hundredBillion: 'Hundred-billion',
    trillion: 'Trillion',
    tenTrillion: 'Ten-trillion',
    hundredTrillion: 'Hundred-trillion',
    quadrillion: 'Quadrillion',
  },
  ImageUploader: { upload: 'Upload' },
  Tag: {
    start: 'Open',
    info: 'In approval',
    success: 'Completed',
    warning: 'Returned',
    danger: 'No pass',
    invalid: 'Cancelled',
  },
  ErrorMessage: {
    exceptionDetails: 'Exception Details',
    escalation: 'Report',
    close: 'Close',
    replicatingSuccess: 'Copied successfully',
    copy: 'Copy',
    status: 'Status Code',
    linkID: 'Link ID',
  },
  Avatar: {
    maxText: 'and ${num} others'
  },
}
