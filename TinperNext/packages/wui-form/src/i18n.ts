const languages = {
    zhCN: 'zh-cn',
    en: 'en-us',
    zhTW: 'zh-tw',
    idId: 'id-id',
    viVn: 'vi-vn',
    arSa: 'ar-sa'
}

const typeTemplate = {
    [languages.zhCN]: "'${label}' 不是合法的 ${type}",
    [languages.en]: "'${label}' is not a valid ${type}",
    [languages.zhTW]: "'${label}' 不是合法的 ${type}",
    [languages.idId]: "'${label}' tidak valid ${type}",
    [languages.viVn]: "'${label}' không phải là một ${type}",
    [languages.arSa]: "'${label}' غير صالح ${type}"
};

const defaultValidateMessages = {
    default: "'${label}' 字段校验失败",
    required: "'${label}' 是必填项",
    enum: "'${label}' 必须是一个 [${enum}]",
    whitespace: "'${label}' 不能为空",
    date: {
        format: "'${label}' 是非法的日期格式",
        parse: "'${label}' 无法解析为合法日期",
        invalid: "'${label}' 是非法日期",
    },
    string: {
        len: "'${label}' 必须为 ${len} 个字符",
        min: "'${label}' 必须至少 ${min} 个字符",
        max: "'${label}' 不能超过 ${max} 个字符",
        range: "'${label}' 必须介于 ${min} 到 ${max} 个字符",
    },
    number: {
        len: "'${label}' 必须等于 ${len}",
        min: "'${label}' 不能小于 ${min}",
        max: "'${label}' 不能大于 ${max}",
        range: "'${label}' 必须介于 ${min} 和 ${max}",
    },
    array: {
        len: "'${label}' 的长度必须等于 ${len}",
        min: "'${label}' 的长度必须不小于 ${min}",
        max: "'${label}' 的长度必须不大于 ${max}",
        range: "'${label}' 的长度必须介于 ${min} 和 ${max}",
    },
    pattern: {
        mismatch: "'${label}' 不匹配正则 ${pattern}",
    },
    types: {
        string: typeTemplate[languages.zhCN],
        method: typeTemplate[languages.zhCN],
        array: typeTemplate[languages.zhCN],
        object: typeTemplate[languages.zhCN],
        number: typeTemplate[languages.zhCN],
        date: typeTemplate[languages.zhCN],
        boolean: typeTemplate[languages.zhCN],
        integer: typeTemplate[languages.zhCN],
        float: typeTemplate[languages.zhCN],
        regexp: typeTemplate[languages.zhCN],
        email: typeTemplate[languages.zhCN],
        url: typeTemplate[languages.zhCN],
        hex: typeTemplate[languages.zhCN],
    },
};

const defaultValidateMessagesEn = {
    default: "'${label}' field validation failed",
    required: "'${label}' is required",
    enum: "'${label}' must be one of [${enum}]",
    whitespace: "'${label}' cannot be empty",
    date: {
        format: "'${label}' is invalid date format",
        parse: "'${label}' cannot be parsed to valid date",
        invalid: "'${label}' is invalid date",
    },
    string: {
        len: "'${label}' must be exactly ${len} characters",
        min: "'${label}' must be at least ${min} characters",
        max: "'${label}' cannot be longer than ${max} characters",
        range: "'${label}' must be between ${min} and ${max} characters",
    },
    number: {
        len: "'${label}' must equal ${len}",
        min: "'${label}' cannot be less than ${min}",
        max: "'${label}' cannot be greater than ${max}",
        range: "'${label}' must be between ${min} and ${max}",
    },
    array: {
        len: "'${label}''s length must be ${len}",
        min: "'${label}''s length cannot be less than ${min}",
        max: "'${label}''s length cannot be greater than ${max}",
        range: "'${label}''s length must be between ${min} and ${max}",
    },
    pattern: {
        mismatch: "'${label}' does not match pattern ${pattern}",
    },
    types: {
        string: typeTemplate[languages.en],
        method: typeTemplate[languages.en],
        array: typeTemplate[languages.en],
        object: typeTemplate[languages.en],
        number: typeTemplate[languages.en],
        date: typeTemplate[languages.en],
        boolean: typeTemplate[languages.en],
        integer: typeTemplate[languages.en],
        float: typeTemplate[languages.en],
        regexp: typeTemplate[languages.en],
        email: typeTemplate[languages.en],
        url: typeTemplate[languages.en],
        hex: typeTemplate[languages.en],
    },
}

const defaultValidateMessagesZhTw = {
    default: "'${label}' 字段校驗失敗",
    required: "'${label}' 是必填項",
    enum: "'${label}' 必須是一個 [${enum}]",
    whitespace: "'${label}' 不能為空",
    date: {
        format: "'${label}' 是非法的日期格式",
        parse: "'${label}' 無法解析為合法日期",
        invalid: "'${label}' 是非法日期",
    },
    string: {
        len: "'${label}' 必須為 ${len} 個字符",
        min: "'${label}' 必須至少 ${min} 個字符",
        max: "'${label}' 不能超過 ${max} 個字符",
        range: "'${label}' 必須介於 ${min} 和 ${max} 個字符",
    },
    number: {
        len: "'${label}' 必須等於 ${len}",
        min: "'${label}' 不能小於 ${min}",
        max: "'${label}' 不能大於 ${max}",
        range: "'${label}' 必須介於 ${min} 和 ${max}",
    },
    array: {
        len: "'${label}' 的長度必須為 ${len}",
        min: "'${label}' 的長度不能小於 ${min}",
        max: "'${label}' 的長度不能大於 ${max}",
        range: "'${label}' 的長度必須介於 ${min} 和 ${max}",
    },
    pattern: {
        mismatch: "'${label}' 不匹配正則 ${pattern}",
    },
    types: {
        string: typeTemplate[languages.zhTW],
        method: typeTemplate[languages.zhTW],
        array: typeTemplate[languages.zhTW],
        object: typeTemplate[languages.zhTW],
        number: typeTemplate[languages.zhTW],
        date: typeTemplate[languages.zhTW],
        boolean: typeTemplate[languages.zhTW],
        integer: typeTemplate[languages.zhTW],
        float: typeTemplate[languages.zhTW],
        regexp: typeTemplate[languages.zhTW],
        email: typeTemplate[languages.zhTW],
        url: typeTemplate[languages.zhTW],
        hex: typeTemplate[languages.zhTW],
    }


}

const defaultValidateMessagesIdId = {
    default: "'${label}' Verifikasi lapangan gagal",
    required: "'${label}' diperlukan",
    enum: "'${label}' harus salah satu dari [${enum}]",
    whitespace: "'${label}' tidak boleh kosong",
    date: {
        format: "'${label}' adalah format tanggal yang tidak valid",
        parse: "'${label}' tidak dapat diuraikan ke dalam tanggal yang valid",
        invalid: "'${label}' adalah tanggal yang tidak valid",
    },
    string: {
        len: "'${label}' harus ${len} karakter",
        min: "'${label}' harus setidaknya ${min} karakter",
        max: "'${label}' tidak boleh lebih dari ${max} karakter",
        range: "'${label}' harus antara ${min} dan ${max} karakter",
    },
    number: {
        len: "'${label}' harus sama dengan ${len}",
        min: "'${label}' tidak boleh kurang dari ${min}",
        max: "'${label}' tidak boleh lebih dari ${max}",
        range: "'${label}' harus antara ${min} dan ${max}",
    },
    array: {
        len: "'${label}' panjangnya harus ${len}",
        min: "'${label}' panjangnya tidak boleh kurang dari ${min}",
        max: "'${label}' panjangnya tidak boleh lebih dari ${max}",
        range: "'${label}' panjangnya harus antara ${min} dan ${max}",
    },
    pattern: {
        mismatch: "'${label}' tidak cocok dengan pola ${pattern}",
    },
    types: {
        string: typeTemplate[languages.idId],
        method: typeTemplate[languages.idId],
        array: typeTemplate[languages.idId],
        object: typeTemplate[languages.idId],
        number: typeTemplate[languages.idId],
        date: typeTemplate[languages.idId],
        boolean: typeTemplate[languages.idId],
        integer: typeTemplate[languages.idId],
        float: typeTemplate[languages.idId],
        regexp: typeTemplate[languages.idId],
        email: typeTemplate[languages.idId],
        url: typeTemplate[languages.idId],
        hex: typeTemplate[languages.idId],
    }
}

const defaultValidateMessagesViVn = {
    default: "'${label}' kiểm tra lỗi trường",
    required: "'${label}' là bắt buộc",
    enum: "'${label}' phải là một trong [${enum}]",
    whitespace: "'${label}' không được phép là khoảng trắng",
    date: {
        format: "'${label}' là định dạng ngày không hợp lệ",
        parse: "'${label}' không thể phân tích thành ngày hợp lệ",
        invalid: "'${label}' là ngày không hợp lệ",
    },
    string: {
        len: "'${label}' phải có ${len} ký tự",
        min: "'${label}' phải chứa ít nhất ${min} ký tự",
        max: "'${label}' không được vượt quá ${max} ký tự",
        range: "'${label}' phải có từ ${min} đến ${max} ký tự",
    },
    number: {
        len: "'${label}' phải bằng ${len}",
        min: "'${label}' không thể nhỏ hơn ${min}",
        max: "'${label}' không thể lớn hơn ${max}",
        range: "'${label}' phải từ ${min} đến ${max}",
    },
    array: {
        len: "'${label}' chiều dài phải là ${len}",
        min: "'${label}' chiều dài không thể nhỏ hơn ${min}",
        max: "'${label}' chiều dài không thể lớn hơn ${max}",
        range: "'${label}' chiều dài phải từ ${min} đến ${max}",
    },
    pattern: {
        mismatch: "'${label}' không khớp với pattern ${pattern}",
    },
    types: {
        string: typeTemplate[languages.viVn],
        method: typeTemplate[languages.viVn],
        array: typeTemplate[languages.viVn],
        object: typeTemplate[languages.viVn],
        number: typeTemplate[languages.viVn],
        date: typeTemplate[languages.viVn],
        boolean: typeTemplate[languages.viVn],
        integer: typeTemplate[languages.viVn],
        float: typeTemplate[languages.viVn],
        regexp: typeTemplate[languages.viVn],
        email: typeTemplate[languages.viVn],
        url: typeTemplate[languages.viVn],
        hex: typeTemplate[languages.viVn],
    }
}

const defaultValidateMessagesArSa = {
    default: "'${label}' فشل في فحص الحقل",
    required: "'${label}' مطلوب",
    enum: "'${label}' يجب أن تكون واحد من [${enum}]",
    whitespace: "'${label}' لا يمكن أن تكون فارغة",
    date: {
        format: "'${label}' لست بتنسيق التاريخ الصحيح",
        parse: "'${label}' لا يمكن تحليله إلى تاريخ صالح",
        invalid: "'${label}' لست تاريخ صالح"
    },
    string: {
        len: "'${label}' يجب أن تكون ${len} حرف",
        min: "'${label}' يجب أن يحتوي على الأقل ${min} حرف",
        max: "'${label}' لا يمكن أن تكون أكثر من ${max} حرف",
        range: "'${label}' يجب أن تكون بين ${min} و ${max} حرف"
    },
    number: {
        len: "'${label}' يجب أن تكون ${len}",
        min: "'${label}' لا يمكن أن تكون أقل من ${min}",
        max: "'${label}' لا يمكن أن تكون أكثر من ${max}",
        range: "'${label}' يجب أن تكون بين ${min} و ${max}"
    },
    array: {
        len: "'${label}' طوله يجب أن تكون ${len}",
        min: "'${label}' طوله لا يمكن أن تكون أقل من ${min}",
        max: "'${label}' طوله لا يمكن أن تكون أكثر من ${max}",
        range: "'${label}' طوله يجب أن تكون بين ${min} و ${max}"
    },
    pattern: {
        mismatch: "'${label}' لا يتطابق مع الpattern ${pattern}"
    },
    types: {
        string: typeTemplate[languages.arSa],
        method: typeTemplate[languages.arSa],
        array: typeTemplate[languages.arSa],
        object: typeTemplate[languages.arSa],
        number: typeTemplate[languages.arSa],
        date: typeTemplate[languages.arSa],
        boolean: typeTemplate[languages.arSa],
        integer: typeTemplate[languages.arSa],
        float: typeTemplate[languages.arSa],
        regexp: typeTemplate[languages.arSa],
        email: typeTemplate[languages.arSa],
        url: typeTemplate[languages.arSa],
        hex: typeTemplate[languages.arSa]
    }
}

export default {
    lang: 'zh-cn',
    defaultValidateMessages,
    'zh-cn': {
        defaultValidateMessages
    },
    'en-us': {
        defaultValidateMessages: defaultValidateMessagesEn
    },
    'zh-tw': {
        defaultValidateMessages: defaultValidateMessagesZhTw
    },
    'id-id': {
        defaultValidateMessages: defaultValidateMessagesIdId
    },
    'vi-vn': {
        defaultValidateMessages: defaultValidateMessagesViVn
    },
    'ar-sa': {
        defaultValidateMessages: defaultValidateMessagesArSa
    }
}
