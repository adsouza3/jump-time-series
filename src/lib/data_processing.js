import parser from 'papaparse';

export const parseCsv = (rawData) => {
  return parser.parse(rawData, {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      return header.toLowerCase();
    },
  });
};

export const getDisplayIndices = (timeSeries, interval) => {
  let displayIndices = [];
  timeSeries.forEach(({ timestamp }, i) => {
    if (
      i === 0 ||
      Math.floor(timestamp / interval.delta) !== Math.floor(timeSeries[i - 1].timestamp / interval.delta)
    ) {
      displayIndices.push(i);
    }
  });

  return displayIndices;
};