import { SET_DISPLAY_INDICES, SET_TIME_SERIES } from '../actions';

const defaultState = [];

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case SET_TIME_SERIES:
    return action.displayIndices;
  case SET_DISPLAY_INDICES:
    return action.displayIndices;
  default:
    return state;
  }
};

export default reducer;