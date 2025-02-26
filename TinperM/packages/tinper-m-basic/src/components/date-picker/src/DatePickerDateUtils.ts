import { ReactNode } from 'react'
import type { DatePickerFilter } from './DatePickerUtils'
import { getTinpermLocaleConfig } from '@components/config-provider/src'
import { chunk, last } from 'lodash';
import { PickerColumnItems } from '@components/picker-view/src/iPickerView';
import { format, getDaysInMonth } from 'date-fns';


export type DatePrecision =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'timeGroup'

export type TimePrecision =
  | 'hour'
  | 'minute'
  | 'second'
  | 'timeGroup'

export const precisionRankRecord: Record<DatePrecision, number> = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
  timeGroup: 6
}

export const timePrecisionRankRecord: Record<TimePrecision, number> = {

  hour: 0,
  minute: 1,
  second: 2,
  timeGroup: 3
} as const

const { locale } = getTinpermLocaleConfig()
const timeGroup = {
  AM: locale.DatePicker.AM,
  PM: locale.DatePicker.PM
} as const

type TimeGroup = keyof typeof timeGroup
type Mode = 'time' | 'date'

export function defaultRenderLabel(type: DatePrecision, data: number | TimeGroup) {
  const { locale } = getTinpermLocaleConfig()
  const timeGroup = {
    AM: locale.DatePicker.AM,
    PM: locale.DatePicker.PM
  } as const
  switch (type) {
  case 'minute':
  case 'second':
  case 'hour':
    return ('0' + data.toString()).slice(-2)
  case 'timeGroup':
    return timeGroup[data as TimeGroup]
  default:
    return data.toString()
  }
}

export function generateDatePickerColumns(
  selected: string[],
  min: Date,
  max: Date,
  precision: DatePrecision | TimePrecision,
  renderLabel: (type: DatePrecision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined,
  use12hours = false,
  minuteStep = 1,
  mode: Mode = 'date'
) {
  const ret: PickerColumnItems [] = []

  const minYear = min.getFullYear()
  const minMonth = min.getMonth() + 1
  const minDay = min.getDate()
  const minHour = use12hours ? conver24HourTo12Hour(min) : min.getHours()
  const minMinute = min.getMinutes()
  const minSecond = min.getSeconds()

  const maxYear = max.getFullYear()
  const maxMonth = max.getMonth() + 1
  const maxDay =  max.getDate()

  const maxHour =  use12hours ? conver24HourTo12Hour(max) : max.getHours()
  const maxMinute = max.getMinutes()
  const maxSecond = max.getSeconds()

  const rank = precisionRankRecord[precision]


  const selectedYear = parseInt(selected[0])
  const firstDayInSelectedMonth =
    convertStringArrayToDateTime([selected[0], selected[1], '1'])

  const selectedMonth = parseInt(selected[1])
  const selectedDay = parseInt(selected[2])
  const selectedHour = parseInt(selected[3])
  const selectedMinute = parseInt(selected[4])

  const isInMinYear = selectedYear === minYear
  const isInMaxYear = selectedYear === maxYear
  const isInMinMonth = isInMinYear && selectedMonth === minMonth
  const isInMaxMonth = isInMaxYear && selectedMonth === maxMonth
  const isInMinDay = isInMinMonth && selectedDay === minDay
  const isInMaxDay = isInMaxMonth && selectedDay === maxDay
  const isInMinHour = isInMinDay && selectedHour === minHour
  const isInMaxHour = isInMaxDay && selectedHour === maxHour
  const isInMinMinute = isInMinHour && selectedMinute === minMinute
  const isInMaxMinute = isInMaxHour && selectedMinute === maxMinute

  const generateColumn = (
    from: number,
    to: number,
    precision: DatePrecision | TimePrecision,
    step = 1,

  ) => {
    let column: number[] = []
    for (let i = from; i <= to; i += step) {
      column.push(i)
    }
    const prefix = selected.slice(0, precisionRankRecord[precision])
    const suffix = selected.slice(precisionRankRecord[precision] + 1)
    const currentFilter = filter?.[precision]
    if (currentFilter && typeof currentFilter === 'function') {
      column = column.filter(i =>
        currentFilter(i, {
          get date() {
            const stringArray = [...prefix, i.toString(), ...suffix]
            return convertStringArrayToDate(stringArray, mode, use12hours, precision as (typeof mode extends 'Date' ? DatePrecision : TimePrecision))
          },
        })
      )
    }
    return column
  }


  if (rank >= precisionRankRecord.year && mode === 'date') {
    const lower = minYear
    const upper = maxYear
    const years = generateColumn(lower, upper, 'year')
    ret.push(
      years.map(v => ({
        label: renderLabel('year', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'Select Year'
  }

  if (rank >= precisionRankRecord.month && mode === 'date') {
    const lower = isInMinYear ? minMonth : 1
    const upper = isInMaxYear ? maxMonth : 12
    const months = generateColumn(lower, upper, 'month')
    ret.push(
      months.map(v => ({
        label: renderLabel('month', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'Select Month'
  }
  if (rank >= precisionRankRecord.day && mode === 'date') {
    const lower = isInMinMonth ? minDay : 1
    const upper = isInMaxMonth ? maxDay : getDaysInMonth(firstDayInSelectedMonth)
    const days = generateColumn(lower, upper, 'day')
    ret.push(
      days.map(v => ({
        label: renderLabel('day', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'Select Day'
  }

  let hasTime = false
  if (rank >= precisionRankRecord.hour) {
    hasTime = true
    const lower = isInMinDay ? minHour : 0
    const upper = isInMaxDay ? maxHour : (use12hours ? 11 : 23)
    const hours = generateColumn(lower, upper, 'hour')
    ret.push(
      hours.map(v => ({
        label: renderLabel('hour', v),
        value: v.toString(),
      }))
    )

    if (use12hours && hours[0] === 0) {
      ret[ret.length - 1][0].label = renderLabel('hour', 12)
    }

    ret[ret.length - 1].label = 'Select Hour'
  }
  if (rank >= precisionRankRecord.minute) {
    const lower = isInMinHour ? minMinute : 0
    const upper = isInMaxHour ? maxMinute : 59
    const minutes = generateColumn(lower, upper, 'minute', minuteStep)
    ret.push(
      minutes.map(v => ({
        label: renderLabel('minute', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'Select Minute'
  }
  if (rank >= precisionRankRecord.second) {
    const lower = isInMinMinute ? minSecond : 0
    const upper = isInMaxMinute ? maxSecond : 59
    const seconds = generateColumn(lower, upper, 'second')
    ret.push(
      seconds.map(v => ({
        label: renderLabel('second', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'Select Second'
  }


  if (hasTime && use12hours) {
    const column = Object.keys(timeGroup).map(v => ({
      label: defaultRenderLabel('timeGroup', v as TimeGroup),
      value: v,
    }))
    if (mode === 'date')
      ret.push(column)
    else
      ret.unshift(column)
    // ret[ret.length - 1].role = 'timeGroup'
  }


  return ret
}

export function convertDateToStringArray(
  date: Date | undefined | null,
  type: 'date' | 'time',
  precision: DatePrecision,
  use12hours: boolean
): string[] {
  if (!date) return []

  switch (type) {
  case 'date':
    return use12hours ? convertDateTimeWith12HourToStringArray(date, precision) : convertDateTimeToStringArray(date, precision)
  case 'time':
    return use12hours ? convertTimeWith12HourToStringArray(date, precision) : convertTimeToStringArray(date, precision)
  }


}

function convertDateTimeToStringArray(
  date: Date | undefined | null,
  precision: DatePrecision
): string[] {
  if (!date) return []
  const dateArray = [
    date.getFullYear().toString(),
    (date.getMonth() + 1).toString(),
    date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString(),

  ]

  return dateArray.slice(0, precisionRankRecord[precision] + 1)
}



function convertDateTimeWith12HourToStringArray(
  date: Date | undefined | null,
  precision: DatePrecision
): string[] {
  const dateArray = convertDateTimeToStringArray(date, precision)
  const [hour12, amOrPm] = format(date ?? new Date(), 'h a').split(' ')
  dateArray[3] = hour12

  return [...dateArray, amOrPm]
}

function convertTimeToStringArray(
  date: Date | undefined | null,
  precision: DatePrecision
): string[] {
  const dateArray = convertDateTimeToStringArray(date, precision)
  const [yearMonthDay, ...time] = chunk(dateArray, 3)
  return [...time.flat(), ...yearMonthDay]
}

function convertTimeWith12HourToStringArray(
  date: Date | undefined | null,
  precision: DatePrecision

): string[] {
  const dateArray = convertTimeToStringArray(date, precision)
  const [hour12, amOrPm] =  format(date ?? new Date(), 'h a').split(' ')
  dateArray[0] = hour12
  return [amOrPm, ...dateArray]
}

export function convertStringArrayToDate(
  value: (string | null | undefined)[],
  type: 'date' | 'time',
  use12hours: boolean,
  precision: typeof type extends  'date' ? DatePrecision : TimePrecision
): Date  {
  if (!value) return new Date()
  switch (type) {
  case 'date':
    return use12hours ? convertStringArrayToDateTimeWith12hours(value) : convertStringArrayToDateTime(value)
  case 'time':
    return use12hours ? convertStringArrayToTimeWith12hours(value, precision) : convertStringArrayToTime(value, precision)
  }
}



function convertStringArrayToDateTime(
  value: (string | null | undefined)[]
): Date {
  const yearString = value[0] ?? '1900'
  const monthString = value[1] ?? '1'
  const dateString = value[2] ?? '1'
  const hourString = value[3] ?? '0'
  const minuteString = value[4] ?? '0'
  const secondString = value[5] ?? '0'
  return new Date(
    parseInt(yearString),
    parseInt(monthString) - 1,
    parseInt(dateString),
    parseInt(hourString),
    parseInt(minuteString),
    parseInt(secondString)
  )
}


function convertStringArrayToDateTimeWith12hours(
  value: (string | null | undefined)[],
): Date  {
  if (value.length === 0) {
    return new Date()
  }

  const hour12 = last(value)
  const datetime = value.filter(item => item !== hour12)
  const [date,  ...time] = chunk(datetime, 3)
  const newTime = time.flat()
  if (hour12 === 'PM')
    newTime[0] = (parseInt(newTime[0] ?? '0') + 12).toString()

  return convertStringArrayToDateTime([...date, ...newTime])

}

function convertStringArrayToTime(
  value: (string | null | undefined)[],
  precision: TimePrecision
): Date {
  if (value.length === 0) {
    return new Date()
  }
  const [time, ...date] = chunk(value, timePrecisionRankRecord[precision] + 1)

  return convertStringArrayToDateTime([...date.flat(), ...time])

}

function convertStringArrayToTimeWith12hours(
  value: (string | null | undefined)[],
  precision: TimePrecision
): Date {
  if (value.length === 0) {
    return new Date()
  }
  const [hour12, ...time] = value
  if (hour12 === 'PM')
    time[0] = (parseInt(time[0] ?? '0') + 12).toString()
  return convertStringArrayToTime(time, precision)

}

function conver24HourTo12Hour(date: Date) {
  return parseInt(format(date, 'M'))
}



