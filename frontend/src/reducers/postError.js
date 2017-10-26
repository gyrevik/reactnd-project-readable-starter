import { ERROR_CREATE_POST, ERROR_EDIT_POST } from '../actions/types';

export default function postError (state = false, action) {
  switch (action.type) {
    case ERROR_CREATE_POST: {
      return action.error;
    }
    case ERROR_EDIT_POST: {
      return action.error;
    }
    default:
      return state;
  }
}