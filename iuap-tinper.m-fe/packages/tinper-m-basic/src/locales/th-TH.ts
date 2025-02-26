const typeTemplate = '${label} ไม่ใช่ ${type} ที่ถูกต้อง'

export default {
  locale: 'th-TH',
  Common: {
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก',
    loading: 'กำลังโหลด',
    close: 'ปิด'
  },
  CardBox: {
    label: 'ชื่อเรื่อง',
    delete: 'ลบ',
    fold: 'พับ',
    more: 'ดูเพิ่มเติม'
  },
  DateTimePicker: {
    popTitle: 'เลือกวันที่และเวลา',
    placeholder: 'โปรดเลือก',
    clearAndReturn: 'ล้างและกลับ',
    week: 'สัปดาห์',
    year: 'ปี',
    month: 'เดือน',
    day: 'วัน',
    hour: 'ชั่วโมง',
    minute: 'นาที',
    second: 'วินาที'
  },
  Empty: {
    noData: 'ไม่มีข้อมูล',
    noCollect: 'ไม่มีคอลเลกชัน',
    noResult: 'ขณะนี้ยังไม่มีผลการค้นหา'
  },
  FormItemWrapper: {
    confirmText: 'ฉันเข้าใจ',
    errorText: 'ข้อมูลที่กรอกผิดพลาด! กรุณากรอกใหม่'
  },
  Input: { label: 'ช่องข้อความ' },
  NavBar: { title: 'หัวข้อ' },
  Radio: {
    selected: 'เลือก',
    selectAll: 'เลือกทั้งหมด',
    data: 'รายการ',
    reset: 'รีเซ็ต'
  },
  Search: { placeholder: 'กรอกค้นหา' },
  TimePicker: {
    popTitle: 'เลือกเวลา',
    placeholder: 'โปรดเลือก',
    clearAndReturn: 'ล้างและกลับ',
    hour: 'ชั่วโมง',
    minute: 'นาที',
    second: 'วินาที',
    am: 'AM',
    pm: 'PM'
  },
  DatePicker: {
    AM: 'AM',
    PM: 'PM',
    clearAndReturn: 'ล้างและกลับ'
  },
  TimeRangePicker: {
    popTitle: 'ช่วงวันที่และเวลา',
    placeholder: 'วันที่เริ่ม-วันที่สิ้นสุด',
    clearAndReturn: 'ล้างและกลับ',
    year: 'ปี',
    month: 'เดือน',
    day: 'วัน',
    hour: 'ชั่วโมง',
    minute: 'นาที',
    to: 'ถึง'
  },
  Calendar: {
    title: 'เลือกวันที่',
    confirm: 'ยืนยัน',
    start: 'เริ่ม',
    end: 'สิ้นสุด',
    today: 'วันนี้',
    markItems: ['ว.จ.', 'ว.อ.', 'ว.พ.', 'ว.ภ.', 'ว.ศ.', 'ว.ส.', 'ว.อ.'],
    months: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  },
  Modal: {
    ok: 'ฉันเข้าใจ',
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก'
  },
  Mask: { name: 'ชั้นพื้นหลัง' },
  Cascader: { placeholder: 'โปรดเลือก' },
  Dialog: { ok: 'ฉันเข้าใจ' },
  Switch: { name: 'สวิทช์' },
  InfiniteScroll: {
    noMore: 'ไม่มีข้อมูลเพิ่มเติม',
    failedToLoad: 'โหลดล้มเหลว',
    retry: 'โหลดใหม่'
  },
  PullToRefresh: {
    pulling: 'ดึงลงเพื่อรีเฟรช',
    canRelease: 'ปล่อยเพื่อรีเฟรช',
    complete: 'รีเฟรชสำเร็จ'
  },
  ErrorBlock: {
    default: { title: 'ไม่พบหน้า' },
    disconnected: {
      title: 'เครือข่ายได้ถูกตัด',
      description: 'โปรดตรวจสອບสถานะเครือข่ายแล้วลองอีกครั้ง'
    },
    failed: {
      title: 'ข้อมูลการเข้าสู่ระบบหมดอายุ',
      description: 'โปรดเข้าสู่ระบบอีกครั้งหรือติดต่อฝ่ายเทคนิค'
    },
    denied: { title: 'ไม่มีสิทธิ์เข้าถึงหน้านี้' },
    error: {
      title: 'บริการมีข้อผิดพลาด',
      description: 'โปรดลองอีกครั้งในពេល๊ี๊๋'
    }
  },
  Form: {
    required: 'จำเป็น',
    optional: 'การเลือกเติม',
    defaultValidateMessages: {
      default: '${label} ฟิลด์ตรวจสອບข้อผิดพลาด',
      required: 'โปรดป้อน ${label}',
      enum: '${label} ต้องเป็นฝายหนึ่ง[${enum}]',
      whitespace: '${label} ไม่สามารถเป็นฝากว่าง',
      date: {
        format: '${label} รูปแบบวันที่ไม่ถูกต้อง',
        parse: '${label} ไม่สามารถแปลงเป็นวันที่',
        invalid: '${label} วันที่ไม่ถูกต้อง'
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
        len: '${label} ต้องมี ${len} ตัวอักษร',
        min: '${label} อย่างน้อย ${min} ตัวอັກษร',
        max: '${label} ไม่เกີນ ${max} ตัวอັກษร',
        range: '${label} ต້ອງอยู่ใน ${min}-${max} ตัวอักษร'
      },
      number: {
        len: '${label} ต้องเท่ากับ ${len}',
        min: '${label} ต่ำสุด ${min}',
        max: '${label} สูงสุด ${max}',
        range: '${label} ต້ອງอยู่ใน ${min}-${max}'
      },
      array: {
        len: 'ต้องมี ${len} ${label}',
        min: 'อย่างน้อย ${min} ${label}',
        max: 'ไม่เกີນ ${max} ${label}',
        range: '${label} จำนวนต้องอยู่ใน ${min}-${max}'
      },
      pattern: { mismatch: '${label} ไม่ตรงกับรูปแบบ ${pattern}' }
    },
  },
  InputNumber: {
    hundred: 'ร้อย',
    thousand: 'พัน',
    tenThousand: 'วัน',
    hundredThousand: 'หนึ่งแสน',
    million: 'ล้าน',
    tenMillion: 'สิบล้าน',
    hundredMillion: '100ล้าน',
    billion: 'พันล้าน',
    tenBillion: '10พันล้าน',
    hundredBillion: '100พันล้าน',
    trillion: 'ล้านล้าน',
    tenTrillion: '10ลล้านล้าน',
    hundredTrillion: '100ล้านล้าน',
    quadrillion: 'หนึ่งพันล้านล้าน',
  },
  ImageUploader: { upload: 'อัพโหลด' },
  Tag: {
    start: 'เปิด',
    info: 'อยู่ระหว่างการอนุมัติ',
    success: 'เสร็จสมบูรณ์',
    warning: 'ส่งคืนแล้ว',
    danger: 'ไม่ผ่าน',
    invalid: 'ยกเลิกแล้ว',
  },
  ErrorMessage: {
    exceptionDetails: 'รายละเอียดความผิดปกติ',
    escalation: 'รายงาน',
    close: 'ปิด',
    replicatingSuccess: 'คัดลอกสำเร็จ',
    copy: 'คัดลอก',
    status: 'รหัสสถานะ',
    linkID: 'ลิงค์ ID',
  },
  Avatar: {
    maxText: 'และอีก ${num} คน'
  },
}
