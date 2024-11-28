import { CLEAR_FOCUS, SET_FOCUS } from '../actions';

const reducer = (state = null, action) => {
  switch (action.type) {
  case SET_FOCUS:
    return action.point;
  case CLEAR_FOCUS:
    return null;
  default:
    return state;
  }
};

export default reducer;