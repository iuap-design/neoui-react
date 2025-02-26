import { ReactNode } from 'react'

import type { DatePickerFilter } from './DatePickerUtils'
import { PickerColumn, PickerColumnItem } from '@/components/picker-view/src'
import { getISODay, getISOWeek, getISOWeeksInYear } from 'date-fns';
import { getISOWeekYear, setHours, setISODay, setISOWeek, setMinutes, setSeconds, setYear, toDate } from 'date-fns/fp';
import { flow } from 'lodash';


export type WeekPrecision = 'year' | 'week' | 'week-day'

const precisionRankRecord: Record<WeekPrecision, number> = {
  year: 0,
  week: 1,
  'week-day': 2,
}

export function defaultRenderLabel(type: WeekPrecision, data: number) {
  return data.toString()
}

export function generateDatePickerColumns(
  selected: string[],
  min: Date,
  max: Date,
  precision: WeekPrecision,
  renderLabel: (type: WeekPrecision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined
) {
  const ret: PickerColumn[] = []

  const minYear = min.getFullYear()
  const maxYear = max.getFullYear()

  const rank = precisionRankRecord[precision]

  if (rank >= precisionRankRecord.year) {
    const years: PickerColumnItem[] = []
    for (let i = minYear; i <= maxYear; i++) {
      const value = i.toString()
      years.push({
        label: renderLabel ? renderLabel('year', i) : value,
        value,
      })
    }
    ret.push(years)
    ret[ret.length - 1].label = 'year'
  }

  const selectedYear = parseInt(selected[0])
  const isInMinYear = selectedYear === minYear
  const isInMaxYear = selectedYear === maxYear

  const minDay = min
  const maxDay = max
  const minWeek = getISOWeek(minDay)
  const maxWeek = getISOWeek(maxDay)
  const minWeekday = getISODay(minDay)
  const maxWeekday = getISODay(maxDay)
  const selectedWeek = parseInt(selected[1])
  const isInMinWeek = isInMinYear && selectedWeek === minWeek
  const isInMaxWeek = isInMaxYear && selectedWeek === maxWeek
  const selectedYearWeeks = getISOWeeksInYear(toDate(`${selectedYear}-01-01`))

  const generateColumn = (
    from: number,
    to: number,
    precision: WeekPrecision
  ) => {
    let column: number[] = []
    for (let i = from; i <= to; i++) {
      column.push(i)
    }
    const prefix = selected.slice(0, precisionRankRecord[precision])
    const currentFilter = filter?.[precision]
    if (currentFilter && typeof currentFilter === 'function') {
      column = column.filter(i =>
        currentFilter(i, {
          get date() {
            const stringArray = [...prefix, i.toString()]
            return convertStringArrayToDate(stringArray)
          },
        })
      )
    }
    return column
  }

  if (rank >= precisionRankRecord.week) {
    const lower = isInMinYear ? minWeek : 1
    const upper = isInMaxYear ? maxWeek : selectedYearWeeks
    const weeks = generateColumn(lower, upper, 'week')
    ret.push(
      weeks.map(v => ({
        label: renderLabel('week', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'week'
  }
  if (rank >= precisionRankRecord['week-day']) {
    const lower = isInMinWeek ? minWeekday : 1
    const upper = isInMaxWeek ? maxWeekday : 7
    const weeks = generateColumn(lower, upper, 'week-day')
    ret.push(
      weeks.map(v => ({
        label: renderLabel('week-day', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'week-day'

  }


  return ret
}

export function convertDateToStringArray(
  date: Date | undefined | null
): string[] {
  if (!date) return []
  return [
    getISOWeekYear(date).toString(),
    getISOWeek(date).toString(),
    getISODay(date).toString(),
  ]
}

export function convertStringArrayToDate(
  value: (string | null | undefined)[]
): Date {
  const yearString = value[0] ?? '1900'
  const weekString = value[1] ?? '1'
  const weekdayString = value[2] ?? '1'
  // const day = dayjs()
  //   .year(parseInt(yearString))
  //   .isoWeek(parseInt(weekString))
  //   .isoWeekday(parseInt(weekdayString))
  //   .hour(0)
  //   .minute(0)
  //   .second(0)

  return flow(
    setYear(parseInt(yearString)),
    setISOWeek(parseInt(weekString)),
    setISODay(parseInt(weekdayString)),
    setHours(0),
    setMinutes(0),
    setSeconds(0)
  )(new Date())
}
