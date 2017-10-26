import { SORT_POSTS_FIELD } from '../actions/types';

export default function sortPostsField (state = '', action) {
  switch (action.type) {
    case SORT_POSTS_FIELD: {
      return action.field;
    }
    default:
      return state;
    }
}