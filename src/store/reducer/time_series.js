import { SET_TIME_SERIES } from '../actions';

const defaultState = [];

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case SET_TIME_SERIES:
    return action.timeSeries;
  default:
    return state;
  }
};

export default reducer;