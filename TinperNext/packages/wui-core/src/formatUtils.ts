// 确保toFixed原型四舍五入算法被修正
import {matchAll} from './polyfill'

export function IEVersion() {
    let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp.$1);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;// IE版本<=7
        }
    } else if (isEdge) {
        return 12;// edge
    } else if (isIE11) {
        return 11; // IE11
    } else {
        return -1;// 不是ie浏览器
    }
}

// 截取format中 H/h以后的部分
function getTimeFormat(format: string) {
    let reg = /[Hh]/g
    reg.test(format)
    return format.slice(reg.lastIndex - 1)
}

const formatUtils = {
    // 格式转换为showTime配置
    format2ShowTime: function(format: string) {
        // if (!format || !/[hH]+|(?<![AaPp])m+|[sS]+/g.test(format)) return false  // bug: QDJCJS-10695, IE及iOS、safira不兼容正则组
        if (!format || !(/[hH]+|[^AaPp]m+|[sS]+/g.test(format) || /^m+/g.test(format))) return false
        let showHour = /[hH]+/g.test(format),
            // showMinute = /(?<![AaPp])m+/g.test(format),
            showMinute = /[^AaPp]m+/g.test(format) || /^m+/g.test(format),
            showSecond = /[sS]+/g.test(format)
        return {
            showHour,
            showMinute,
            showSecond
        }
    }
    /**
     * 工作台首选项格式转换为number格式配置
     * @param {String} numberFormat 工作台传入的格式，如：'# ### ### ### ### ###[,]########+'
     */
    , diworkfFormat2Num: function(numberFormat: string) {
        const reg = /(\+)?#([^#]){1}.*\[([^#])\]#{1,}(\+)?/g;
        const matches = matchAll(numberFormat, reg); // bug: QDJCJS-10695, IE及iOS、safira不兼容正则组
        const separators = (Array.from(matches))[0]?.slice(1); // 如：[undefined, '.', ',', '+']或['+', '.', ',', undefined]
        // eslint-disable-next-line no-unused-vars
        const [_, thousandSeparator, decimalSeparator, minusRight] = separators;
        return {
            thousandSeparator,
            decimalSeparator,
            minusRight: !!minusRight
        };
    }
    /**
     * 工作台首选项格式转换为组件配置
     * @param {String} diworkFormat 工作台传入的格式
     * @param {String} type 组件类型，DatePicker、DatePicker.showTime、TimePicker
     */
    , diworkFormat2Picker: function(diworkFormat: string, type: 'date' | 'datetime' | 'time') {
        let config: Record<string, any> = {};
        if (!diworkFormat) return {}
        diworkFormat = diworkFormat.replace(/T+/g, 'A').replace(/t+/g, 'a').replace(/d/g, 'D').replace(/y/g, 'Y') // 此处d/D及y/Y替换是兼容工作台错误
        if (type === 'datetime') {
            config = {
                format: diworkFormat,
                use12Hours: false,
                showTime: {
                    format: getTimeFormat(diworkFormat)
                }
            };
            if (diworkFormat.indexOf('h') > -1) {
                config.use12Hours = true;
                config.showTime.use12Hours = true;
            }
        } else if (type === 'time') {
            config = {
                format: diworkFormat,
                use12Hours: false
            };
            if (diworkFormat.indexOf('h') > -1) {
                config.use12Hours = true;
            }
        } else {
            config = { format: diworkFormat };
        }
        return config;
    }
};

export default formatUtils;
