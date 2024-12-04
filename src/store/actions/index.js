import { getDisplayIndices } from 'lib/data_processing';
import {  HOURS_8, intervals, SECONDS_5 } from 'lib/time';

export const SET_TIME_SERIES = 'SET_TIME_SERIES';
export const setTimeSeries = ({ timeSeries, displayIndices, selection }) => (dispatch) => {
  dispatch({
    type: SET_TIME_SERIES,
    timeSeries,
    displayIndices,
  });

  dispatch(setSelection(selection));
};

export const SET_DISPLAY_INDICES = 'SET_DISPLAY_INDICES';
export const setDisplayIndices = (displayIndices) => {
  return {
    type: SET_DISPLAY_INDICES,
    displayIndices,
  };
};

export const SET_SELECTION = 'SET_SELECTION';
export const setSelection = (selection) => {
  return {
    type: SET_SELECTION,
    selection,
  };
};

export const ZOOM_IN = 'ZOOM_IN';
export const zoomIn = () => (dispatch, getState) => {
  const { selection, timeSeries } = getState();
  if (selection.mode === SECONDS_5) {
    return;
  }

  const oldInterval = intervals[selection.mode];

  const newIntervalKey = Object.keys(intervals)[Object.keys(intervals).indexOf(selection.mode) - 1];
  const newInterval = intervals[newIntervalKey];

  const displayIndices = getDisplayIndices(timeSeries, newInterval);

  let start, end;
  if (oldInterval.length > timeSeries[timeSeries.length - 1].timestamp - timeSeries[0].timestamp) {
    end = timeSeries[timeSeries.length - 1].timestamp;
    start = end - newInterval.length;
  } else {
    start = selection.start + (oldInterval.length - newInterval.length) / 2;
    end = start + newInterval.length;
  }
  
  dispatch(setDisplayIndices(displayIndices));
  dispatch(setSelection({
    start,
    end,
    mode: newInterval.key, 
  }));
};

export const ZOOM_OUT = 'ZOOM_OUT';
export const zoomOut = () => (dispatch, getState) => {
  const { selection, timeSeries } = getState();
  if (selection.mode === HOURS_8) {
    return;
  }

  const oldInterval = intervals[selection.mode];

  const newIntervalKey = Object.keys(intervals)[Object.keys(intervals).indexOf(selection.mode) + 1];
  const newInterval = intervals[newIntervalKey];

  const displayIndices = getDisplayIndices(timeSeries, newInterval);

  let start = selection.start - (newInterval.length - oldInterval.length) / 2;
  let end = start + newInterval.length;
  if (start < timeSeries[0].timestamp) {
    start = timeSeries[0].timestamp;
    end = start + newInterval.length;
  } else if (end > timeSeries[timeSeries.length - 1].timestamp) {
    end = timeSeries[timeSeries.length - 1].timestamp;
    start = end - newInterval.length;
  }

  dispatch(setDisplayIndices(displayIndices));
  dispatch(setSelection({
    start,
    end,
    mode: newInterval.key, 
  }));
};

export const RECENTER = 'RECENTER';
export const recenter = timestamp => (dispatch, getState) => {
  const { selection, timeSeries } = getState();

  const length = selection.end - selection.start;
  let start = timestamp - length / 2;
  let end = start + length;
  if (start < timeSeries[0].timestamp) {
    start = timeSeries[0].timestamp;
    end = start + length;
  } else if (end > timeSeries[timeSeries.length - 1].timestamp) {
    end = timeSeries[timeSeries.length - 1].timestamp;
    start = end - length;
  }

  dispatch(setSelection({
    start,
    end,
    mode: selection.mode, 
  }));
};

export const SET_FOCUS = 'SET_FOCUS';
export const setFocus = timestamp => (dispatch, getState) => {
  const { timeSeries, displayIndices } = getState();

  let closestPoint = timeSeries[displayIndices[0]];
  displayIndices.forEach((i) => {
    const point = timeSeries[i];
    if (Math.abs(point.timestamp - timestamp) < Math.abs(closestPoint.timestamp - timestamp)) {
      closestPoint = point;
    }
  });

  dispatch({
    point: closestPoint,
    type: SET_FOCUS,
  });
};

export const CLEAR_FOCUS = 'CLEAR_FOCUS';
export const clearFocus = () => {
  return {
    type: CLEAR_FOCUS,
  };
};

export const BEGIN_FILE_READ = 'BEGIN_FILE_READ';
export const beginFileRead = () => {
  return {
    type: BEGIN_FILE_READ,
  };
};