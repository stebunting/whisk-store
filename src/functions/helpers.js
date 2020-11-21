// import { DateTime } from 'luxon';
const dayjs = require('dayjs');
const objectSupport = require('dayjs/plugin/objectSupport');
const weekOfYear = require('dayjs/plugin/weekOfYear');
const weekday = require('dayjs/plugin/weekday');

dayjs.extend(objectSupport);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

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

// Format date/time range
export function rangeFormat(range) {
  const date = dayjs({})
    .year(range.year)
    .week(range.week)
    .day(range.day)
<<<<<<< HEAD
    .format('gdddd D MMMM');
=======
    .format('dddd D MMMM');
>>>>>>> ee2dffc27f86affd117e638032b127d89b6bfd58

  return `${date} (${range.time.start} - ${range.time.end})`;
}
