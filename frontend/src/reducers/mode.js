import { SET_MODE } from '../actions/types';

export default function mode (state = 'none', action) {
  if (action.type === SET_MODE)
    return action.mode;
  else
    return state;
}