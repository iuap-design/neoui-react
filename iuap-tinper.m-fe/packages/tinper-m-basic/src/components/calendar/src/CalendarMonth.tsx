import { withNativeProps } from '@utils/NativeProps'
import { eachMonthOfInterval, endOfMonth, endOfYear, startOfMonth, startOfYear } from 'date-fns'
import CalendarBody from './CalendarBody'
import { useCalendarContext } from './CalendarContext'
import CalendarHeader from './CalendarHeader'
import { Page } from './Convert'

export type DateType = 'month' | 'year';
export type DateAction = 'subtract' | 'add';



export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
}






const CalendarMonth = () => {


  const props = useCalendarContext()
  const { classPrefix, current } = props






  const maxDay = props.max ? endOfMonth(props.max) : null
  const minDay = props.min ? startOfMonth(props.min) : null

  const interval = eachMonthOfInterval({
    start: startOfYear(current),
    end: endOfYear(current)
  })






  return withNativeProps(
    props,
    <div className={classPrefix}>
      <CalendarHeader showMonth={false}  />
      <CalendarBody isRowBeginFn={i => i % 3 == 0} isRowEndFn={i => i % 3 == 2}  minDay={minDay as Date} maxDay={maxDay as Date}   interval={interval}   />
    </div>
  )
}






export default CalendarMonth
