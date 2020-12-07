// import { DateTime } from 'luxon';
const dayjs = require('dayjs');
const objectSupport = require('dayjs/plugin/objectSupport');

dayjs.extend(objectSupport);

// Format price from stored öre to krona
export function priceFormat(num, userOptions = {}) {
  const options = {
    includeOre: userOptions.includeOre || false
  };
  let str = (num / 100).toLocaleString(undefined, {
    minimumFractionDigits: options.includeOre ? 2 : 0,
    maximumFractionDigits: options.includeOre ? 2 : 0
  });
  str = str.replace(',', '');
  str += userOptions.includeSymbol === false ? '' : ' SEK';
  return str;
}

function parseDateCode(code) {
  const [year, month, date, start, end] = code.split('-');
  return {
    year,
    month,
    date,
    time: { start, end }
  };
}

// Format date/time range
export function rangeFormat(data, options = {}) {
  const range = options.code === true
    ? parseDateCode(data)
    : data;
  const date = dayjs({
    year: range.year,
    month: range.month - 1,
    day: range.date
  }).format('dddd D MMMM');

  return options.times === false
    ? date
    : `${date} (${range.time.start} - ${range.time.end})`;
}

export function hasDatePassed(dateObj) {
  // DayJS uses 0-indexed month
  return dayjs({ ...dateObj, month: dateObj.month - 1 }).isBefore(dayjs());
}

export function capitaliseFirst(word) {
  return `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;
}
