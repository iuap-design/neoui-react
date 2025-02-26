import { DateMode } from '@components/date-time-picker/src/iDateTimePicker';
import { format } from 'date-fns';

const DateFormatMap = {
  year: 'YYYY',
  month: 'YYYY-MM',
  day: 'YYYY-MM-DD',
  minute: 'YYYY-MM-DD HH:mm',
  second: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm',
  hms: 'HH:mm:ss',
  'calendar-day': 'YYYY-MM-DD',
  week: 'YYYY-WW',
};

export const formatDate = (date: Date, mode: DateMode) => format(
  date,
  DateFormatMap[mode]?.replace('YYYY', 'yyyy')?.replace('DD', 'dd')
)
