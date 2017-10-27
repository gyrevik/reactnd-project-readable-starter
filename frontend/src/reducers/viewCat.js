import { SET_VIEW_CAT } from '../actions/types';

export default function viewCat (state = 'all', action) {
  switch (action.type) {
    case SET_VIEW_CAT:
      return action.viewCat;
    default:
      return state;
  }
}