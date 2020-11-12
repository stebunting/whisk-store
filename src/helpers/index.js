import { DateTime } from 'luxon';

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
  const date = DateTime
    .fromObject({
      weekNumber: range.week,
      weekday: range.day
    }).setZone('Europe/Stockholm')
    .toLocaleString(DateTime.DATE_HUGE);

  const startTime = DateTime
    .fromISO(range.time.start)
    .setZone('Europe/Stockholm')
    .toLocaleString(DateTime.TIME_24_SIMPLE);

  const endTime = DateTime
    .fromISO(range.time.end)
    .setZone('Europe/Stockholm')
    .toLocaleString(DateTime.TIME_24_SIMPLE);
  return `${date} (${startTime} - ${endTime})`;
}
