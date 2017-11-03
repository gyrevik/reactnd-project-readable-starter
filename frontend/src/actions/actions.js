import {
  SET_POST_CAT, SET_POST_CURRENT, SET_VIEW_CAT, SET_MODE, ERROR_POSTS, ERROR_CATS, ERROR_VOTE_COMMENT,
  CREATE_POST, ERROR_CREATE_POST, ERROR_EDIT_POST, EDIT_POST, DELETE_POST, SORT_POSTS_FIELD,
  CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, GET_COMMENTS, SORT_POSTS_DIRECTION, ERROR_EDIT_COMMENT,
  ERROR_CREATE_COMMENT, VOTE_COMMENT, VOTE_POST, GET_POSTS, GET_CATS, ERROR_COMMENTS, ERROR_DELETE_POST,
  ERROR_VOTE_POST, ERROR_DELETE_COMMENT, ERROR_GET_POST, GET_POST
} from '../actions/types';

import { url, headers } from '../helper';

export const setMode = (mode) => {
  return {
    type: SET_MODE,
    mode,
  }
}

export const setPostCat = (postCat) => {
  return {
    type: SET_POST_CAT,
    postCat,
  }
}

// no thunk because no server call
export const setPostCurrent = (post) => {
  return {
    type: SET_POST_CURRENT,
    post,
  }
}
// end no thunk because no server call

export const setViewCat = (viewCat) => {
  return {
    type: SET_VIEW_CAT,
    viewCat,
  }
}

export const setSortPostsField = (field) => {
  return {
    type: SORT_POSTS_FIELD,
    field,
  }
}

export const sortPostsDirection = (direction) => {
  return {
    type: SORT_POSTS_DIRECTION,
    direction,
  }
}

// thunk createPost
export const createPost = (post) => {
  let { id, title, body, category } = post;
  return {
    type: CREATE_POST,
    post: { id, timestamp:Date.now(), title, body, author:'alex', category, voteScore:1, deleted:false },
  }
}

export const createPostErrored = (bool = false) => {
  return {
    type: ERROR_CREATE_POST,
    error: bool
  }
}

export function createPostFetch(post) {
  return (dispatch) => {
    // initialize postError to false so that it does not say true after a previous error
    dispatch(createPostErrored(false));
    if (!post.title || !post.body || !post.category || post.category==='all') {
      dispatch(createPostErrored(true));
      return;
    }
  
    fetch(`${url}/posts`, { 
      method: 'POST', 
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(post) 
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      //dispatch(itemsIsLoading(false));
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch(createPost(post));
    })
    .catch(() => dispatch(createPostErrored(true)));
  };
}
// end thunk createPost

export const commentsErrored = (bool) => {
  return {
    type: ERROR_COMMENTS,
    error: bool
  }
}

export const getComments = (postId, comments) => {
  return {
    type: GET_COMMENTS,
    postId,
    comments
  }
}

export function commentsFetch(postId) {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    fetch(`${url}/posts/${postId}/comments`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((comments) => {
        dispatch(getComments(postId, comments));
      })
      .catch(() => dispatch(commentsErrored(true)));
  };
}

// thunk for getting one post
// | `GET /posts/:id` | Get the details of a single post. | |
export const postErrored = (bool) => {
  return {
    type: ERROR_GET_POST,
    error: bool
  }
}

export const getPost = (post) => {
  return {
    type: GET_POST,
    post
  }
}

export function postFetch(id) {
  return (dispatch) => {
    fetch(`${url}/posts/${id}`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((post) => {
        dispatch(getPost(post));
      })
      .catch(() => dispatch(postErrored(true)));
  };
}
// end thunk for getting one post

// thunk for getting posts
export const postsErrored = (bool) => {
  return {
    type: ERROR_POSTS,
    error: bool
  }
}

export const getPosts = (posts, field, viewCat) => {
  return {
    type: GET_POSTS,
    posts,
    field,
    viewCat
  }
}

export function postsFetch(field, viewCat) {
  return (dispatch) => {
    fetch(`${url}/posts`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((posts) => {
        dispatch(getPosts(posts, field, viewCat));
      })
      .catch(() => dispatch(postsErrored(true)));
  };
}
// end thunk for getting posts

// thunk for categories
export const catsErrored = (bool) => {
  return {
    type: ERROR_CATS,
    error: bool
  }
}

export const getCats = (cats) => {
  return {
    type: GET_CATS,
    cats
  }
}

export function catsFetch() {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    fetch(`${url}/categories`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((cats) => {
        dispatch(getCats(cats.categories));
      })
      .catch(() => dispatch(catsErrored(true)));
  };
}

// implement vote comment thunk actions:
export const voteCommentErrored = (bool) => {
  return {
    type: ERROR_VOTE_COMMENT,
    error: bool
  }
}

export const voteComment = (id, option) => {
  return {
    type: VOTE_COMMENT,
    id,
    option
  }
}

export function voteCommentFetch(id, option) {
  return (dispatch) => {
    fetch(`${url}/comments/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option: option }), })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(voteComment(id, option));
      })
      .catch(() => dispatch(voteCommentErrored(true)));
  };
}
// end implement vote comment thunk actions

// thunk createComment
export const createCommentErrored = (bool) => {
  return {
    type: ERROR_CREATE_COMMENT,
    error: bool
  }
}

export const createComment = (comment) => {
  let { id, parentId, timestamp, body } = comment;
  return {
    type: CREATE_COMMENT,
    comment: { id, parentId, timestamp, body, author:'alex', voteScore:1, deleted:false, parentDeleted:false },
  }
}

export function createCommentFetch(comment) {
  return (dispatch) => {
    dispatch(createCommentErrored(false));
    if (comment.body.length === 0 || comment.parentId.length === 0) {
      dispatch(createCommentErrored(true));
      return;
    }
    fetch(`${url}/comments`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(createComment(comment));
      })
      .catch(() => dispatch(createCommentErrored(true)));
  };
}
// end thunk createComment

// thunk editPost
export const editPostErrored = (bool) => {
  return {
    type: ERROR_EDIT_POST,
    error: bool
  }
}

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    post,
  }
}

// PUT /posts/:id	Edit the details of an existing post.	
// params:  title - [String] 
//          body  - [String]
export function editPostFetch(post) {
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    // initialize postError to false so that it does not say true after a previous error
    dispatch(editPostErrored(false));
    if (!post.title || !post.body || !post.category || post.category==='all') {
      //throw new Error('invalid post: category, title and body required');
      dispatch(editPostErrored(true));
      return;
    }

    fetch(`${url}/posts/${post.id}`, { 
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: post.title, body: post.body })
      //body: JSON.stringify({ post })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      //dispatch(itemsIsLoading(false));
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch(editPost(post));
    })
    .catch(() => dispatch(editPostErrored(true)));
  };
}
// end thunk edit post

// thunk editComment
export const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export const editCommentErrored = (bool) => {
  return {
    type: ERROR_EDIT_COMMENT,
    error: bool
  }
}

// PUT /comments/:id	Edit the details of an existing comment.
// params:  timestamp - timestamp. Get this however you want. 
//          body - [String]
export function editCommentFetch(comment) {
  return (dispatch) => {
    fetch(`${url}/comments/${comment.id}`, { 
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timestamp: comment.timestamp, body: comment.body }) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(editComment(comment));
      })
      .catch(() => dispatch(editCommentErrored(true)));
  };
}
// end thunk editComment

// deletePost thunk
export const deletePostErrored = (bool) => {
  return {
    type: ERROR_DELETE_POST,
    error: bool
  }
}

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id
  }
}

export function deletePostFetch(id) {
  return (dispatch) => {
    fetch(`${url}/posts/${id}`, { 
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //else
        //console.log(`deletePostFetch(${id}) response.ok is true`);
        //dispatch(itemsIsLoading(false));
        return response;
      })
      //.then((response) => response.json())
      .then((data) => {
        dispatch(deletePost(id));
      })
      .catch(() => dispatch(deletePost(true)));
  };
}
// end implement delete post with thunk

// migrate votePost to thunk
export const votePostErrored = (bool) => {
  return {
    type: ERROR_VOTE_POST,
    error: bool
  }
}

export const votePost = (id, option, field) => {
  return {
    type: VOTE_POST,
    id,
    option,
    field
  }
}

export function votePostFetch(id, option, field) {
  return (dispatch) => {
    fetch(`${url}/posts/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option: option }), })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        dispatch(votePost(id, option, field));
      })
      .catch(() => dispatch(votePostErrored(true)));
  };
}
// end migrate votePost to thunk

// thunk deleteComment
export const deleteCommentErrored = (bool) => {
  return {
    type: ERROR_DELETE_COMMENT,
    error: bool
  }
}

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  }
}

export function deleteCommentFetch(id) {
  return (dispatch) => {
    fetch(`${url}/comments/${id}`, { 
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id) })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      //.then((response) => response.json())
      .then((data) => {
        dispatch(deleteComment(id));
      })
      .catch(() => dispatch(deleteComment(true)));
  };
}
// end thunk deleteComment