import { add, getMonth, isAfter, isBefore, isSameDay, startOfMonth } from 'date-fns';
import { convertPageToDate, DateRange, Page } from '@components/calendar/src/Convert';
import { DateAction, DateType } from './Calendar';

export const getHumanMonth = (date: Date) => getMonth(date) + 1

export const isSameDayInRange = (date: Date, dateRange: DateRange) =>
  dateRange
  && isSameDay(dateRange[0], dateRange[1])
  && isSameDay(dateRange[0], date)


export const shouldChangePage = ({ current, minPage, maxPage, action, num, type } :{ current: Date, minPage?: Page, maxPage?: Page, action: DateAction,
  num: number,
  type: DateType }) => {
  const nextDate = startOfMonth(
    add(current, {
      years: type === 'year' ? action === 'add' ? num : -num : 0,
      months: type === 'month' ? action === 'add' ? num : -num : 0,
    })
  )


  if (minPage) {
    const minDate = convertPageToDate(minPage)
    if (isBefore(nextDate, minDate)) {
      return false

    }
  }
  if (maxPage) {
    const maxDate = convertPageToDate(maxPage)
    if (isAfter(nextDate, maxDate)) {
      return false
    }
  }

  return true
}
