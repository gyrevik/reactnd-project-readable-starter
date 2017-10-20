import { combineReducers } from 'redux';

import {
  SET_POST_CAT, SET_POST_CURRENT, SET_VIEW_CAT, SET_MODE,
  CREATE_POST, EDIT_POST, DELETE_POST, SORT_POSTS_FIELD,
  CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENTS, 
  ERROR_COMMENTS, VOTE_COMMENT, VOTE_POST, GET_POSTS, GET_CATS
} from '../actions/actions.js'

export function modeReducer (state = 'none', action) {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return state;
  }
}

export function catReducer (state = 'all', action) {
  switch (action.type) {
    case SET_POST_CAT:
      return action.postCat;
    default:
      return state;
  }
}

export function postReducer (state = {}, action) {
  switch (action.type) {
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

export function viewReducer (state = 'all', action) {
  switch (action.type) {
    case SET_VIEW_CAT:
      return action.viewCat;
    default:
      return state;
  }
}

export function sortPostsReducer (state = '', action) {
  switch (action.type) {
    case SORT_POSTS_FIELD: {
      return action.field;
    }
    default:
      return state;
    }
}

function catsReducer (state = [], action) {
  switch (action.type) {
    case GET_CATS:
      return action.cats;
    default:
      return state;
  }
}

export function postsReducer (state = [], action) {
  switch (action.type) {
    case GET_POSTS: {
      return action.posts;
    }
    case CREATE_POST: {
      const { type, post } = action;
      let newPosts;
      if (typeof(state) === 'object')
        newPosts = state.slice();
      else
        newPosts = JSON.parse(state);
      
      newPosts.push(post);
      return newPosts;
    }
    case EDIT_POST: {
      return state.map((oldPost) =>
        action.post.id === oldPost.id ? { ...oldPost, ...action.post } : oldPost
      )
    }
    case DELETE_POST: {
      const newState = state.map((post) => {
        if (action.id === post.id) 
          post.deleted = true;
        return post;
      });
      return newState;
    }
    case VOTE_POST: {
      const newState = state.map((post, index) => {
        if (action.id === post.id) 
          action.option === 'upVote' ? post.voteScore++ : post.voteScore--;
        
        return post;
      });
      return newState;
    }
    default:
      return state;
  }
}

export function commentReducer (state = false, action) {
  switch (action.type) {
    case ERROR_COMMENTS: {
      return action.error;
    }
    default:
      return state;
  }
}

/*export function postIdCommNumReducer (state = {}, action) {
  const numComments = [action.comments].length;
  const postId = action.postId;
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, postId: numComments }
    default:
      return state;
  }
}*/

function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }

  return a;
}

var array1 = ["Vijendra","Singh"];
var array2 = ["Singh", "Shakya"];
  // Merges both arrays and gets unique items
var array3 = arrayUnique(array1.concat(array2));

export function commentsReducer (state = [], action) {
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

export default combineReducers({
  post: postReducer,
  postCat: catReducer,
  posts: postsReducer,
  sortPostsField: sortPostsReducer,
  cats: catsReducer,
  viewCat: viewReducer,
  mode: modeReducer,
  comments: commentsReducer,
  //postIdCommNumIndex: postIdCommNumReducer,
  commentsError: commentReducer
})