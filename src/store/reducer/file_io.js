import { BEGIN_FILE_READ, SET_TIME_SERIES } from '../actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
  case BEGIN_FILE_READ:
    return {
      ...state,
      loading: true,
    };
  case SET_TIME_SERIES:
    return {
      ...state,
      loading: false,
      loaded: true,
    };
  default:
    return state;
  }
};

export default reducer;