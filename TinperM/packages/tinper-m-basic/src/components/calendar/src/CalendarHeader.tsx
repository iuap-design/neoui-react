

import { useLocaleDate } from '@hooks/UseLocaleDate';
import classNames from 'classnames';
import { add, differenceInMonths, differenceInYears, endOfMonth, isAfter, isBefore, startOfMonth } from 'date-fns';
import { PropsWithChildren } from 'react';
import { useCalendarContext } from './CalendarContext';
import { DateAction, DateType } from './CalendarMonth';
import { convertPageToDate } from './Convert';

type CalendarHeaderProps = {  showMonth?: boolean }
const CalendarHeader = (props: CalendarHeaderProps) => {
  const {  showMonth = true } = props;
  const { current, setCurrent, classPrefix, fieldid, minPage, maxPage, prevYearButton, nextYearButton, prevMonthButton, nextMonthButton,   } = useCalendarContext()

  const localeDate = useLocaleDate(current, showMonth ? 'month' : 'year')



  const minDate = minPage && convertPageToDate(minPage)
  const maxDate = maxPage && endOfMonth(convertPageToDate(maxPage))

  const shouldPrevMonthDisabled = minDate && (differenceInMonths(current, minDate) <= 0)
  const shouldPrevYearDisabled = minDate && (differenceInYears(current, minDate) <= 0)
  const shouldNextMonthDisabled = maxDate && (differenceInMonths(maxDate, current) <= 0)
  const shouldNextYearDisabled = maxDate && (differenceInYears(maxDate, current) <= 0)

  const handlePageChange = (
    action: DateAction,
    num: number,
    type: DateType
  ) => {


    const nextDate = startOfMonth(
      add(current, {
        years: type === 'year' ? action === 'add' ? num : -num : 0,
        months: type === 'month' ? action === 'add' ? num : -num : 0,
      })
    )


    if (minPage) {
      const minDate = convertPageToDate(minPage)
      if (isBefore(nextDate, minDate)) {
        return

      }
    }
    if (maxPage) {
      const maxDate = convertPageToDate(maxPage)
      if (isAfter(nextDate, maxDate)) {
        return
      }
    }

    setCurrent(nextDate)
  }

  const arrowButtonProps = {
    handlePageChange,
    classPrefix,
    fieldid,

  }
  return (
    <div className={`${classPrefix}-header`} fieldid={fieldid}>
      <ArrowButton
        type="year"
        action="subtract"
        disabled={shouldPrevYearDisabled}
        {...arrowButtonProps}
        label="Go to prev year"
        fieldid={fieldid}
      >
        {prevYearButton}
      </ArrowButton>
      {showMonth && <ArrowButton
        type="month"
        action="subtract"
        disabled={shouldPrevMonthDisabled}
        label="Go to prev month"

        {...arrowButtonProps}
      >
        {prevMonthButton}
      </ArrowButton>}
      <div className={`${classPrefix}-title`}>
        {localeDate}
      </div>
      {showMonth && <ArrowButton
        type="month"
        action="add"
        disabled={shouldNextMonthDisabled}
        label="Go to next month"
        {...arrowButtonProps}
      >
        {nextMonthButton}
      </ArrowButton>}
      <ArrowButton
        type="year"
        action="add"
        disabled={shouldNextYearDisabled}
        label="Go to next year"
        {...arrowButtonProps}
      >
        {nextYearButton}
      </ArrowButton>
    </div>
  )
}


type ArrowButtonProps = PropsWithChildren<{
  classPrefix: string,
  fieldid?: string,
  type: DateType,
  action: DateAction,
  disabled?: boolean,
  label?: string,
  handlePageChange: (action: DateAction,
    num: number,
    type: DateType) => void
}>

function ArrowButton({
  classPrefix,
  fieldid,
  handlePageChange,
  children,
  type,
  action,
  label,
  disabled = false
}: ArrowButtonProps) {
  const direction = action === 'subtract' ? 'left' : 'right'
  const baseClassName = `${classPrefix}-arrow-button`
  const actionClassName = action === 'add' ? `${baseClassName}-right` : ''
  const typeActionClassName = `${baseClassName}-${direction}-${type}`
  const disabledClassName = disabled ? `${baseClassName}-disabled` : ''
  const className = classNames(baseClassName, actionClassName, typeActionClassName, disabledClassName)
  const fieldId = `${fieldid}-${type}-${action}-btn`
  return (
    <a
      className={className}
      onClick={() => {
        handlePageChange(action, 1, type)
      }}
      fieldid={fieldId}
      aria-label={label}
      role="button"
    >
      {children}
    </a>
  )
}

export default CalendarHeader;
