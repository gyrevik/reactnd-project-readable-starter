import { GET_CATS } from '../actions/types';

export default function cats (state = [], action) {
  switch (action.type) {
    case GET_CATS:
      return action.cats;
    default:
      return state;
  }
}