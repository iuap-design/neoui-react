import { ReactNode } from 'react'
import * as dateUtils from './DatePickerDateUtils'
import { DatePrecision, TimePrecision } from './DatePickerDateUtils'
import type { WeekPrecision } from './DatePickerWeekUtils'
import * as weekUtils from './DatePickerWeekUtils'
import * as quarterUtils from './DatePickerQuarterUtils'
import { QuarterPrecision } from './DatePickerQuarterUtils'
import { isNil } from 'lodash';
import { formatDate as formatDateFn, isValid } from 'date-fns'

export type Precision = DatePrecision | WeekPrecision | QuarterPrecision

export type DatePickerFilter = Partial<
  Record<
    Precision,
    (
      val: number,
      extend: {
        date: Date
      }
    ) => boolean
  >
>

export const convertDateToStringArray = (
  date: Date | undefined | null,
  precision: Precision,
  type: 'date' | 'time',
  use12hours: boolean
) => {

  if (!isValid(date)) return  []

  if (precision.includes('week')) {
    return weekUtils.convertDateToStringArray(date)
  } else  if (precision === 'quarter') {
    return quarterUtils.convertDateToStringArray(date)
  } else {
    return dateUtils.convertDateToStringArray(date, type, precision as DatePrecision,  use12hours)
  }
}

export const convertStringArrayToDate = (
  value: (string | null | undefined)[],
  precision: Precision,
  type: 'date' | 'time',
  use12hours: boolean
) => {
  if (precision.includes('week')) {
    return weekUtils.convertStringArrayToDate(value)
  }  else  if (precision.includes('quarter')) {
    return quarterUtils.convertStringArrayToDate(value)
  } else {
    return dateUtils.convertStringArrayToDate(value, type, use12hours, precision as typeof type extends  'date' ? DatePrecision : TimePrecision )
  }
}

export const generateDatePickerColumns = (
  selected: string[],
  min: Date,
  max: Date,
  precision: Precision,
  renderLabel: (type: Precision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined,
  use12hours = false,
  minuteStep = 1,
  mode: 'date' | 'time' = 'date',
) => {
  if (precision.startsWith('week')) {
    return weekUtils.generateDatePickerColumns(
      selected,
      min,
      max,
      precision as WeekPrecision,
      renderLabel,
      filter
    )
  } else if (precision.startsWith('quarter')) {
    return quarterUtils.generateDatePickerColumns(
      selected,
      min,
      max,
      precision as QuarterPrecision,
      renderLabel,
      filter
    )
  } else {
    return dateUtils.generateDatePickerColumns(
      selected,
      min,
      max,
      precision as DatePrecision,
      renderLabel,
      filter,
      use12hours,
      minuteStep,
      mode
    )
  }
}

export const defaultRenderLabel = (precision: Precision, data: number) => {
  if (precision.includes('week')) {
    return weekUtils.defaultRenderLabel(precision as WeekPrecision, data)
  } else if (precision.includes('quarter')) {
    return quarterUtils.defaultRenderLabel(precision as QuarterPrecision, data)
  } else {
    return dateUtils.defaultRenderLabel(precision as DatePrecision, data)
  }
}



export const toDate = (val: string | Date | null | undefined): Date | null => {
  const hmReg = /^(\d{1,2}):(\d{1,2})$/
  const hmsReg = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/
  const dateReg = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/

  let match
  const now = new Date()
  // 兼容时间戳传值
  const s = typeof val === 'number' ?  new Date(val) : val
  if (isNil(s)) return null
  if (s instanceof Date) {
    return new Date(s)
  } else if ((match = hmReg.exec(s)) !== null) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(match[1], 10), parseInt(match[2], 10))
  } else if ((match = hmsReg.exec(s)) !== null) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10))
  } else {
    let r = new Date(s)
    if (!/Z$/i.test(s)) {
      const d = s.match(dateReg)
      if (d) {
        const m = parseInt(d[2]) - 1 || 0
        const ms = (d[7] || '0').substring(0, 3)
        r = new Date(parseInt( d[1]), m, parseInt(d[3])
          || 1, parseInt(d[4]) || 0, parseInt(d[5]) || 0, parseInt(d[6]) || 0, parseInt(ms))
      }
    }
    return new Date(r.valueOf())
  }
}

const DateFormatMap = {
  year: 'yyyy',
  month: 'yyyy-MM',
  day: 'yyyy-MM-dd',
  hour: 'yyyy-MM-dd HH',
  minute: 'yyyy-MM-dd HH:mm',
  second: 'yyyy-MM-dd HH:mm:ss',
  'calendar-day': 'yyyy-MM-dd',
  week: 'yyyy-MM-dd',
}


const TimeFormatMap = {
  minute: 'HH:mm',
  time: 'HH:mm',
  second: 'HH:mm:ss',
  hms: 'HH:mm:ss',
  'HH:mm:ss': 'HH:mm:ss',
  'HH:mm': 'HH:mm',
}

export const formatDate = (
  dateTemp: Date | string | null | undefined,
  mode: Precision | keyof typeof TimeFormatMap |  keyof typeof DateFormatMap  = 'day',
  type: 'date' | 'time' = 'date',
  format?: (date : Date | string | null) => string
) => {

  try {
    let date = typeof dateTemp === 'number' ? new Date(dateTemp) : dateTemp;
    if (isNil(date)) return date;
    if (format) return format(date);
    const d = toDate(date)
    if (d === null) return d
    if (type === 'time') {
      return formatDateFn(d, TimeFormatMap[mode as keyof typeof TimeFormatMap] ?? TimeFormatMap.second);
    } else {
      return formatDateFn(d, DateFormatMap[mode as keyof typeof DateFormatMap] ?? DateFormatMap.day);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    return null
  }

};
