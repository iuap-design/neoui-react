import { endOfWeek, isWithinInterval, startOfDay, startOfWeek } from 'date-fns';


export  const  isWeekInRange = (day: Date, dateRange: { start: Date, end: Date }, weekStartsOn: 0 | 1 = 0) => {
  const weekInterval = {
    start: startOfWeek(day, { weekStartsOn }),
    end: startOfDay(endOfWeek(day, { weekStartsOn }))
  };

  return isWithinInterval(weekInterval.start, dateRange) && isWithinInterval(weekInterval.end, dateRange)
}
