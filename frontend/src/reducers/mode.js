import { SET_MODE } from '../actions/types';

export default function mode (state = 'none', action) {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return state;
  }
}