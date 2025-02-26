/**
 *
 * @title 多语（自定义语种）
 * @description 组件库尚未内置的语言（如：乌尔都语、火星文），可自定义。注意，该示例locale配置仅展示必要的key，对应value需自行翻译
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'

const locale = {
    locale: 'ur',
    today: 'آج',
    now: 'ابھی',
    backToToday: 'آج کی طرف واپس جائیں۔',
    ok: 'ضرور',
    timeSelect: 'انتخاب کی مدت',
    dateSelect: 'تاریخ منتخب کریں۔',
    weekSelect: 'ہفتہ منتخب کریں۔',
    clear: 'صاف',
    month: 'چاند',
    year: 'سال',
    previousMonth: 'پچھلے مہینے',
    nextMonth: 'اگلے ماہ',
    monthSelect: 'مہینہ منتخب کریں۔',
    yearSelect: 'سال کو منتخب کریں',
    decadeSelect: 'دور منتخب کریں۔',
    firstHalfYear: 'پہلا نصف',
    secondHalfYear: 'دوسرا نصف',
    yearFormat: 'YYYYسال',
    quarterFormat: 'Q[سہ ماہی]',
    quarter: 'سہ ماہی',
    dayFormat: 'Dدن',
    dateFormat: 'YYYYYYYYسالMچاندDدن',
    dateTimeFormat: 'YYYYYYYYسالMچاندDدن HHگھنٹہmmنقطہssدوسرا',
    previousYear: 'آخری سال',
    nextYear: 'اگلے سال',
    previousDecade: 'گزشتہ دور',
    nextDecade: 'اگلی نسل',
    previousCentury: 'پچھلی صدی',
    nextCentury: 'اگلی صدی',
    months: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
    monthsShort: ['1چاند', '2چاند', '3چاند', '4چاند', '5چاند', '6چاند', '7چاند', '8چاند', '9چاند', '10چاند', '11چاند', '12چاند'],
    weekdaysMin: ['اتوار', 'پیر کے دن', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
    weekdaysShort: ['اتوار', 'پیر کے دن', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
}

interface DemoState {
    locale: string
}

class Demo12 extends Component<{}, DemoState> {
    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col>
                        <DatePicker
                            locale={locale} // 将需要的语言包传入到日期组件locale属性
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo12
