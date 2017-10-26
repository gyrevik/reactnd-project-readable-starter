import { SET_VIEW_CAT } from '../actions/types';

export default function viewCat (state = 'all', action) {
  //console.log('entered viewCat reducer with action.type: ', action.type, ' and action.viewCat: ', action.viewCat)
  switch (action.type) {
    case SET_VIEW_CAT:
      return action.viewCat;
    default:
      return state;
  }
}