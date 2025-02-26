const typeTemplate = '${label} bukan ${type} yang valid'

export default {
  locale: 'id-ID',
  Common: {
    confirm: 'Oke',
    cancel: 'Membatalkan',
    loading: 'Memuat',
    close: 'Penutupan'
  },
  CardBox: {
    label: 'Judul',
    delete: 'Menghapus',
    fold: 'Bersembunyi',
    more: 'Lihat Lebih Banyak'
  },
  DateTimePicker: {
    popTitle: 'Pemilihan tanggal waktu',
    placeholder: 'Tolong Pilih',
    clearAndReturn: 'Jelas Dan Kembali',
    week: 'Pekan',
    year: 'Tahun',
    month: 'Bulan',
    day: 'Hari',
    hour: 'Waktu',
    minute: 'Menit',
    second: 'Kedua'
  },
  Empty: {
    noData: 'Tidak ada data',
    noCollect: 'Tidak ada koleksi',
    noResult: 'Belum ada hasil pencarian'
  },
  FormItemWrapper: {
    confirmText: 'Saya Mengerti',
    errorText: 'Informasinya salah! Silakan isi lagi'
  },
  Input: { label: 'Kotak Teks' },
  NavBar: { title: 'Judul' },
  Radio: {
    selected: 'Terpilih',
    selectAll: 'Pilih semua',
    data: 'Mengupas',
    reset: 'Mengatur ulang'
  },
  Search: { placeholder: 'Masuk untuk mencari' },
  TimePicker: {
    popTitle: 'Pemilihan Waktu',
    placeholder: 'Tolong Pilih',
    clearAndReturn: 'Jelas Dan Kembali',
    hour: 'Waktu',
    minute: 'Menit',
    second: 'Kedua',
    am: 'Pagi',
    pm: 'Sore'
  },
  DatePicker: {
    AM: 'Pagi',
    PM: 'Sore',
    clearAndReturn: 'Jelas Dan Kembali'
  },
  TimeRangePicker: {
    popTitle: 'Rentang Waktu Tanggal',
    placeholder: 'Mulailah-Akhir',
    clearAndReturn: 'Jelas Dan Kembali',
    year: 'Tahun',
    month: 'Bulan',
    day: 'Hari',
    hour: 'Waktu',
    minute: 'Menit',
    to: 'Ke'

  },
  Calendar: {
    title: 'Pemilihan Tanggal',
    confirm: 'Oke',
    start: 'Mulailah',
    end: 'Akhir',
    today: 'Hari Ini',
    arkItems: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
  },
  Modal: {
    ok: 'Saya Mengerti',
    confirm: 'Oke',
    cancel: 'Membatalkan'
  },
  Mask: { name: 'topeng latar belakang' },
  Cascader: { placeholder: 'Tolong Pilih' },
  Dialog: { ok: 'Saya Mengerti' },
  Switch: { name: 'Mengalihkan' },
  InfiniteScroll: {
    noMore: 'Tidak Lagi',
    failedToLoad: 'Gagal untuk memuat',
    retry: 'Muat ulang'
  },
  PullToRefresh: {
    pulling: 'Tarik ke bawah untuk menyegarkan',
    canRelease: 'Rilis Segarkan Segera',
    complete: 'Berhasil menyegarkan'
  },
  ErrorBlock: {
    default: { title: 'Halaman tidak ditemukan' },
    disconnected: {
      title: 'Jaringan terputus',
      description: 'Harap periksa status jaringan dan coba lagi'
    },
    failed: {
      title: 'Informasi login kadaluarsa',
      description: 'Silakan login kembali atau hubungi personil teknis'
    },
    denied: { title: 'Tidak ada izin untuk mengakses halaman ini' },
    error: {
      title: 'Layanan bermasalah',
      description: 'Coba Lagi Nanti'
    }
  },
  Form: {
    required: 'Diperlukan',
    optional: 'Opsional',
    defaultValidateMessages: {
      default: 'Validasi bidang ${label} salah',
      required: 'Mohon masukkan ${label}',
      enum: '${label} harus salah satu dari [${enum}]',
      whitespace: '${label} tidak boleh kosong',
      date: {
        format: 'Format tanggal ${label} tidak valid',
        parse: '${label} tidak dapat dikonversi menjadi tanggal',
        invalid: '${label} adalah tanggal yang tidak valid'
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
        len: '${label} harus terdiri dari ${len} karakter',
        min: 'Minimal ${min} karakter untuk ${label}',
        max: 'Maksimum ${max} karakter untuk ${label}',
        range: '${label} harus ada diantara ${min}-${max} karakter'
      },
      number: {
        len: '${label} harus sama dengan ${len}',
        min: 'Nilai minimum untuk ${label} adalah ${min}',
        max: 'Nilai maksimum untuk ${label} adalah ${max}',
        range: '${label} harus ada diantara ${min}-${max}'
      },
      array: {
        len: '${len} ${label} harus ada',
        min: 'Minimal ${min} ${label}',
        max: 'Maksimum ${max} ${label}',
        range: 'Jumlah ${label} harus antara ${min} dan ${max}'
      },
      pattern: { mismatch: '${label} tidak cocok dengan pola ${pattern}' }
    },
  },
  InputNumber: {
    hundred: 'Ratus',
    thousand: 'Ribu',
    tenThousand: 'Sepuluh ribu',
    hundredThousand: 'Seratus Ribu',
    million: 'Juta',
    tenMillion: 'Sepuluh Juta',
    hundredMillion: '100 juta',
    billion: 'Satu miliar',
    tenBillion: 'Miliaran',
    hundredBillion: 'Miliaran',
    trillion: 'Triliun',
    tenTrillion: 'Sepuluh triliun',
    hundredTrillion: 'Ratusan miliar',
    quadrillion: 'triliunan',
  },
  ImageUploader: { upload: 'diunggah' },
  Tag: {
    start: 'buka',
    info: 'Di bawah persetujuan',
    success: 'Selesai',
    warning: 'Kembali',
    danger: 'Tidak disetujui',
    invalid: 'Dibatalkan',
  },
  ErrorMessage: {
    exceptionDetails: 'Detail Pengecualian',
    escalation: 'Laporan',
    close: 'Penutupan',
    replicatingSuccess: 'Berhasil Menyalin',
    copy: 'Salinan',
    status: 'Kode status',
    linkID: 'Id Tautan',
  },
  Avatar: {
    maxText: 'dan ${num} lainnya'
  },
}
