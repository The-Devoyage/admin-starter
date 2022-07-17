import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const toLocalDateString = (
  v?: Date,
  options?: { includeTime: boolean },
) => {
  if (v) {
    if (options?.includeTime) {
      return dayjs(v).utc(true).format('MMM DD YYYY h:mm a');
    }
    return dayjs(v).utc(true).format('MMM DD YYYY');
  }
  return null;
};
