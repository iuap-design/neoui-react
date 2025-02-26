import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';



export function getWeekDays(date: Date, aWeekStartsOn: 'Monday' | 'Sunday'): Date[] {
  const weekStartsOn = aWeekStartsOn === 'Monday' ? 1 : 0;
  const start = startOfWeek(startOfMonth(date), { weekStartsOn });
  return eachDayOfInterval({
    start,
    end: endOfWeek(endOfMonth(date), { weekStartsOn }),
  });
}
