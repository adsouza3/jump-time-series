import moment from 'moment';

export const TIMESTAMP_TO_MS = 1000000;
export const TIMESTAMP_TO_S = TIMESTAMP_TO_MS * 1000;

export const SECONDS_5 = 'SECONDS_5';
export const MINUTES_5 = 'MINUTES_5';
export const HOURS_1 = 'HOURS_1';
export const HOURS_8 = 'HOURS_8';
export const intervals = {
  SECONDS_5: {
    key: SECONDS_5,
    length: 5 * TIMESTAMP_TO_S,
    xAxisSpacing: TIMESTAMP_TO_S,
  },
  MINUTES_5: {
    key: MINUTES_5,
    length: 5 * 60 * TIMESTAMP_TO_S,
    xAxisSpacing: 60 * TIMESTAMP_TO_S,
  },
  HOURS_1: {
    key: HOURS_1,
    length: 60 * 60 * TIMESTAMP_TO_S,
    xAxisSpacing: 10 * 60 * TIMESTAMP_TO_S,
  },
  HOURS_8: {
    key: HOURS_8,
    length: 8 * 60 * 60 * TIMESTAMP_TO_S,
    xAxisSpacing: 60 * 60 * TIMESTAMP_TO_S,
  },
};

const SAMPLE_COUNT = 100;
Object.keys(intervals).forEach(key => intervals[key].delta = intervals[key].length / SAMPLE_COUNT);

const INTERVAL_THRESHOLD = 0.75;

export const getDefaultSelection = (timeSeries) => {
  let interval = intervals.seconds5;
  const latestTimestamp = timeSeries[timeSeries.length - 1].timestamp;
  Object.keys(intervals).forEach((key) => {
    if (latestTimestamp - timeSeries[0].timestamp > intervals[key].length * INTERVAL_THRESHOLD) {
      interval = intervals[key];
    }
  });

  return {
    start: latestTimestamp - interval.length,
    end: latestTimestamp,
    mode: interval.key,
  };
};

export const getTimeString = (timestamp, long = false) => {
  let format = 'HH:mm:ss';
  if (long) {
    format = 'HH:mm:ss.SSS';
  }

  return moment(new Date(timestamp / TIMESTAMP_TO_MS)).format(format);
};