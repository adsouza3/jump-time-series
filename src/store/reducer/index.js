import { combineReducers } from 'redux';

import displayIndices from './display_indices';
import fileIo from './file_io';
import focus from './focus';
import selection from './selection';
import timeSeries from './time_series';

const reducers = combineReducers({
  displayIndices,
  fileIo,
  focus,
  selection,
  timeSeries,
});

export default reducers;
