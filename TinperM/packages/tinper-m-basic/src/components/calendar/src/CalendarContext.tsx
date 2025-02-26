import { createContext, PropsWithChildren, useContext } from 'react';

import { DateRange, Page } from './Convert';
import { MergedCalendarProps } from '@components/calendar/src/Calendar';

export type DateType = 'month' | 'year';
export type DateAction = 'subtract' | 'add';



export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
}


type ContextProps = MergedCalendarProps & {
  classPrefix: string
  current: Date
  dateRange: DateRange
  setCurrent: (d: Date) => void
  setDateRange: (d: DateRange) => void

}



const calendarContext = createContext<ContextProps | null>(null)

export const CalendarProvider = (props: PropsWithChildren<ContextProps>) => (
  <calendarContext.Provider value={props}>
    {props.children}
  </calendarContext.Provider>
)

export const useCalendarContext = () => {
  const object = useContext(calendarContext)
  if (!object) { throw new Error('useCalendarContext must be used within a Provider') }
  return object;
}


