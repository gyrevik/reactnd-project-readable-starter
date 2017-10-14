import { combineReducers } from 'redux';

import {
  SET_POST_CAT, SET_POST_CURRENT, SET_VIEW_CAT, CLEAR_POST_CAT, 
  CREATE_POST, EDIT_POST, DELETE_POST, SORT_POSTS_FIELD,
  CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT, VOTE_POST
} from '../actions/actions.js'

export function catReducer (state = 'all', action) {
  switch (action.type) {
    case SET_POST_CAT:
      return action.postCat;
    case CLEAR_POST_CAT:
      return 'all';
    default:
      return state;
  }
}

export function postReducer (state = {}, action) {
  console.log('state in postReducer: ', state);
  switch (action.type) {
    case SET_POST_CURRENT:
      return action.post;
    case DELETE_POST:
      let post = Object.assign({}, state);
      post.deleted = true;
      console.log('post after mod in postReducer: ', post);
      return post;
    default:
      return state;
  }
}

export function viewReducer (state = 'all', action) {
  console.log('entered viewReducer with action.type: ', action.type);
  switch (action.type) {
    case SET_VIEW_CAT:
      console.log('in SET_VIEW_CAT case of viewReducer');
      return action.viewCat;
    default:
      return state;
  }
}

export function sortPostsReducer (state = '', action) {
  switch(action.type) {
    case SORT_POSTS_FIELD: {
      console.log('sortPostsReducer.SORT_POSTS_FIELD.action.field: ', action.field);
      return action.field;
    }
    default:
      return state;
    }
}

function catsReducer (state = [], action) {
  return state; 
}

export function postsReducer (state = [], action) {
  console.log('top of postsReducer');
  switch (action.type) {
    case CREATE_POST: {
      const { type, post } = action;
      console.log('in postsReducer CREATE_POST case with post: ', post);
      console.log('state in postsReducer: ', state);
      //console.log('...state in postsReducer: ', ...state);      
      console.log('post in postsReducer: ', post);
      
      console.log('typeof(state): ', typeof(state));	//'string' or 'object'
      let newPosts;
      if (typeof(state) === 'object')
        newPosts = state.slice();
      else
        newPosts = JSON.parse(state);
      
      newPosts.map(p => console.log('post: ', p));
      newPosts.push(post);
      console.log('pushed new post');
      newPosts.map(p => console.log('newPost: ', p));
      
      return newPosts;
    }
    case EDIT_POST: {
      console.log('entered EDIT_POST case in postsReducer');
      return state.map((oldPost) =>
        action.post.id === oldPost.id ? { ...oldPost, ...action.post } : oldPost
      )
    }
    case DELETE_POST: {
      console.log('postsReducer.DELETE_POST case with action.id: ', action.id);
      console.log('state: ', state);
      const newState = state.map((post) => {
        if (action.id === post.id) 
          post.deleted = true;
        return post;
      });
      console.log('newState: ', newState);
      return newState;
    }
    case VOTE_POST: {
      console.log('postsReducer.VOTE_POST case with action.id: ', action.id);
      console.log('state: ', state);
      const newState = state.map((post, index) => {
        if (action.id === post.id) 
          action.option === 'upVote' ? post.voteScore++ : post.voteScore--;
        
        return post;
      });
      console.log('newState: ', newState);
      return newState;
    }
    default:
      return state;
  }
}

export function commentsReducer (state = [], action) {
  console.log('top of commentsReducer');
  switch (action.type) {
    case CREATE_COMMENT: {
      const { type, comment } = action;
      console.log('in commentsReducer CREATE_COMMENT case with comment: ', comment);
      console.log('state in commentsReducer: ', state);    
      console.log('comment in commentsReducer: ', comment);
      
      console.log('typeof(state): ', typeof(state));	//'string' or 'object'
      let newComments;
      if (typeof(state) === 'object')
        newComments = state.slice();
      else
        newComments = JSON.parse(state);
      
      newComments.map(c => console.log('comment: ', c));
      newComments.push(comment);
      console.log('pushed new comment');
      newComments.map(c => console.log('newComment: ', c));
      
      return newComments;
    }
    case EDIT_COMMENT: {
      console.log('entered EDIT_COMMENT case in commentsReducer');
      return state.map((oldComment) =>
        action.comment.id === oldComment.id ? { ...oldComment, ...action.comment } : oldComment
      )
    }
    case DELETE_COMMENT: {
      const { comment } = action;
      return state.map(c => {
        if (c.id === comment.id)
          c.deleted = true;
        
        return c;
      })
    }
    case VOTE_COMMENT: {
      console.log('in VOTE_COMMENT case with action.option: ', action.option);
      return state.map(c => {
        if (c.id === action.id) {
          console.log('found c.id: ', c.id);
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
  postCat: catReducer,
  post: postReducer,
  viewCat: viewReducer,
  cats: catsReducer,
  posts: postsReducer,
  comments: commentsReducer,
  sortPostsField: sortPostsReducer,
})