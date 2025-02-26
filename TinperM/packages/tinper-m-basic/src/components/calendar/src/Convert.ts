import { startOfDay, startOfMonth, startOfQuarter } from 'date-fns';
import { map } from 'lodash/fp';

export type DateRange = [start: Date, end: Date, current?: Date] | null
export type Page = { month: number; year: number }
export function convertValueToRange(
  selectionMode: 'single' | 'range'   | undefined,
  value: Date | [Date, Date] | null,
  precision: 'quarter' | 'month'  | 'day' = 'day'
): DateRange {
  if (selectionMode === undefined || value === null) return null

  const getValue = getValueByPrecision(precision)



  if (Array.isArray(value)) {
    return getValue(value) as [Date, Date]
  }

  return getValue([value, value]) as [Date, Date]
}
export function convertPageToDate(page: Page) {
  return new Date(page.year, page.month - 1)
}

const startFnMap = {
  quarter: startOfQuarter,
  month: startOfMonth,
  day: startOfDay

}

const getValueByPrecision = (precision: 'quarter' | 'month' | 'day' = 'day') => map(startFnMap[precision])

