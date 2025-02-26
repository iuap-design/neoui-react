import { DateMode } from '@components/date-time-picker/src/iDateTimePicker';
import { format } from 'date-fns';
import { TimeMode } from '@components/time-picker/src/iTimePicker';



export const formatTime = (date: Date, timeMode: TimeMode) => {
  console.log(date, timeMode,  format(
    date,
    timeMode
  ))
  return format(
    date,
    timeMode
  )

}
