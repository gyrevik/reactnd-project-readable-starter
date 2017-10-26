import { GET_COMMENTS, CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actions/types';
import { arrayUnique } from '../helper';

export default function comments (state = [], action) {
  switch (action.type) {
    case GET_COMMENTS: {
      let oldArray = state.slice();
      const newArray = arrayUnique(oldArray.concat(action.comments));

      return newArray;
    }
    case CREATE_COMMENT: {
      const { type, comment } = action;
      let newComments;
      if (typeof(state) === 'object')
        newComments = state.slice();
      else
        newComments = JSON.parse(state);
      
      newComments.push(comment);
      
      return newComments;
    }
    case EDIT_COMMENT: {
      return state.map((oldComment) =>
        action.comment.id === oldComment.id ? { ...oldComment, ...action.comment } : oldComment
      )
    }
    case DELETE_COMMENT: {
      return state.map(c => {
        if (c.id === action.id)
          c.deleted = true;
        return c;
      })
    }
    case VOTE_COMMENT: {
      return state.map(c => {
        if (c.id === action.id) {
          action.option === 'upVote' ? c.voteScore++ : c.voteScore--;
        }
        
        return c;
      })
    }
    default:
      return state;
  }
}