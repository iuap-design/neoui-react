import { padStart } from 'lodash';


export function formatWeekNumber(weekNumber: number) {
  return padStart(weekNumber.toString(), 2, '0')

}
