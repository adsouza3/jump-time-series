import { SET_SELECTION } from '../actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
  case SET_SELECTION:
    return action.selection;
  default:
    return state;
  }
};

export default reducer;