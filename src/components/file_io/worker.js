import { getDisplayIndices, parseCsv } from "../../lib/data_processing";
import { getDefaultSelection, intervals } from "../../lib/time";

onmessage = function (event) {
  if (event.data.file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const rawData = e.target.result;
      const timeSeries = parseCsv(rawData).data;

      const selection = getDefaultSelection(timeSeries);
      const interval = intervals[selection.mode];
      const displayIndices = getDisplayIndices(timeSeries, interval);

      postMessage({ timeSeries, displayIndices, selection });
    };
  
    reader.readAsText(event.data.file);
  } else if (event.data.sampleSize) {
    let timeSeries = [];
    let currentTime = 1721395800000000000;
    let incrementTick = 1000;
    let value = 0;

    for (let i = 0; i < event.data.sampleSize; i++) {
      if (Math.random() > 0.01) {
        if (Math.random() > 0.5) {
          incrementTick = 1000;
        } else {
          incrementTick = 10000000;
        }
      }

      currentTime += incrementTick;
      value += Math.floor(Math.random() * 21) - 10;
      timeSeries.push({ timestamp: currentTime, value });
    }

    const selection = getDefaultSelection(timeSeries);
    const interval = intervals[selection.mode];
    const displayIndices = getDisplayIndices(timeSeries, interval);

    postMessage({ timeSeries, displayIndices, selection });
  }
};