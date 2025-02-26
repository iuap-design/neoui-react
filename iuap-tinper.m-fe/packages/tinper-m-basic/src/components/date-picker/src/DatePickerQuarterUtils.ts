import { ReactNode } from 'react'

import type { DatePickerFilter } from './DatePickerUtils'
import { PickerColumn, PickerColumnItem } from '@/components/picker-view/src'
import { getISOWeekYear, getQuarter, setQuarter, setYear } from 'date-fns/fp';
import { compose } from 'lodash/fp';


export type QuarterPrecision = 'year' | 'quarter'

const precisionRankRecord: Record<QuarterPrecision, number> = {
  year: 0,
  quarter: 1,
}

export function defaultRenderLabel(type: QuarterPrecision, data: number) {
  return data.toString()
}

export function generateDatePickerColumns(
  selected: string[],
  min: Date,
  max: Date,
  precision: QuarterPrecision,
  renderLabel: (type: QuarterPrecision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined
) {
  const ret: PickerColumn[] = []

  const minYear = min.getFullYear()
  const maxYear = max.getFullYear()
  const minQuarter = getQuarter(min)
  const maxQuarter = getQuarter(max)

  const rank = precisionRankRecord[precision]



  const selectedYear = parseInt(selected[0])
  const isInMinYear = selectedYear === minYear
  const isInMaxYear = selectedYear === maxYear



  const generateColumn = (
    from: number,
    to: number,
    precision: QuarterPrecision
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

  if (rank >= precisionRankRecord.quarter) {
    const lower = isInMinYear ? minQuarter : 1
    const upper = isInMaxYear ? maxQuarter : 4
    const weeks = generateColumn(lower, upper, 'quarter')
    ret.push(
      weeks.map(v => ({
        label: renderLabel('quarter', v),
        value: v.toString(),
      }))
    )
    ret[ret.length - 1].label = 'quarter'
  }


  return ret
}

export function convertDateToStringArray(
  date: Date | undefined | null
): string[] {
  if (!date) return []

  return [
    getISOWeekYear(date).toString(),
    getQuarter(date).toString(),
  ]
}

export function convertStringArrayToDate(
  value: (string | null | undefined)[]
): Date {
  const yearString = value[0] ?? '1900'
  const quarterString = value[1] ?? '1'

  return compose(
    setQuarter(parseInt(quarterString)),
    setYear(parseInt(yearString))
  )(new Date())
}


