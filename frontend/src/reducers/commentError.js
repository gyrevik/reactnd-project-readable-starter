import { ERROR_CREATE_COMMENT } from '../actions/types';

export default function commentError (state = false, action) {
  switch (action.type) {
    case ERROR_CREATE_COMMENT: {
      return action.error;
    }
    default:
      return state;
  }
}