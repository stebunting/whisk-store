// Requirements
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(objectSupport);

interface DateCodeObject {
  year: number,
  month: number,
  date: number,
  time: {
    start: string,
    end: string
  }
}
function parseDateCode(code: string): DateCodeObject {
  const [year, month, date, start, end] = code.split('-');
  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    date: parseInt(date, 10),
    time: { start, end }
  };
}

// Format date/time range
interface RangeFormatOptions {
  code?: boolean,
  times?: boolean
}
export function rangeFormat(
  data: DateCodeObject | string, options = {} as RangeFormatOptions
): string {
  let range: DateCodeObject;
  if (typeof data === 'string') {
    range = parseDateCode(data);
  } else {
    range = data;
  }
  const date = dayjs({
    year: range.year,
    month: range.month - 1,
    day: range.date
  }).format('dddd D MMMM');

  return options.times === false
    ? date
    : `${date} (${range.time.start} - ${range.time.end})`;
}

// Function to check if passed in date has passed
interface DateObject {
  year: number,
  month: number,
  date: number
}
export function hasDatePassed(dateObj: DateObject): boolean {
  // DayJS uses 0-indexed month
  return dayjs({ ...dateObj, month: dateObj.month - 1 }).isBefore(dayjs());
}
