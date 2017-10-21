import { combineReducers } from 'redux';

import {
  SET_POST_CAT, SET_POST_CURRENT, SET_VIEW_CAT, SET_MODE,
  CREATE_POST, ERROR_CREATE_POST, EDIT_POST, DELETE_POST, SORT_POSTS_FIELD,
  CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENTS, 
  ERROR_CREATE_COMMENT, VOTE_COMMENT, VOTE_POST, GET_POSTS, GET_CATS
} from '../actions/actions.js'

import * as utils from '../utils';

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

export function postErrorReducer (state = false, action) {
  switch (action.type) {
    case ERROR_CREATE_POST: {
      return action.error;
    }
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
      console.log('in postsReducer.CREATE_POST with action.post.title: ', action.post.title, ' and action.post.body: ', action.post.body);
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
    case ERROR_CREATE_COMMENT: {
      return action.error;
    }
    default:
      return state;
  }
}

export function commentsReducer (state = [], action) {
  switch (action.type) {
    case GET_COMMENTS: {
      let oldArray = state.slice();
      const newArray = utils.arrayUnique(oldArray.concat(action.comments));

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
  postError: postErrorReducer,
  postCat: catReducer,
  posts: postsReducer,
  sortPostsField: sortPostsReducer,
  cats: catsReducer,
  viewCat: viewReducer,
  mode: modeReducer,
  comments: commentsReducer,
  commentError: commentReducer
})