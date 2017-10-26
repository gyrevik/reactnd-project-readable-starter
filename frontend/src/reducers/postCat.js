import { SET_POST_CAT } from '../actions/types';

export default function postCat (state = 'all', action) {
  switch (action.type) {
    case SET_POST_CAT:
      return action.postCat;
    default:
      return state;
  }
}