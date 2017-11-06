import { EDIT_POST, SET_POST_CURRENT, DELETE_POST, GET_POST, VOTE_POST } from '../actions/types';

export default function post (state = {}, action) {
  let post;
  switch (action.type) {
    case VOTE_POST:
      post = Object.assign({}, state);
      action.option === 'upVote' ? post.voteScore++ : post.voteScore--;
      return post;
    case GET_POST:
      return action.post;
    case EDIT_POST:
      return action.post;
    case SET_POST_CURRENT:
      return action.post;
    case DELETE_POST:
      post = Object.assign({}, state);
      post.deleted = true;
      return post;
    default:
      return state;
  }
}