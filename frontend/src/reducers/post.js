import { EDIT_POST, SET_POST_CURRENT, DELETE_POST, GET_POST } from '../actions/types';

export default function post (state = {}, action) {
  switch (action.type) {
    case GET_POST:
      return action.post;
    case EDIT_POST:
      return action.post;
    case SET_POST_CURRENT:
      return action.post;
    case DELETE_POST:
      let post = Object.assign({}, state);
      post.deleted = true;
      return post;
    default:
      return state;
  }
}