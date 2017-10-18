import * as apiCalls from '../apiCalls';

export const FETCH_CATS = 'FETCH_CATS';
export const CREATE_CATS = 'CREATE_CATS';
export const ERROR_CATS = 'ERROR_CATS';
export const SET_POST_CAT = 'SET_POST_CAT';
export const SET_VIEW_CAT = 'SET_VIEW_CAT';

export const SET_POST_CURRENT = 'SET_POST_CURRENT';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ERROR_DELETE_POST = 'ERROR_DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const ERROR_VOTE_POST = 'ERROR_VOTE_POST';

export const ERROR_POSTS = 'ERROR_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS';
export const SORT_POSTS_FIELD = 'SORT_POSTS_FIELD';
export const SORT_POSTS_DIRECTION = 'SORT_POSTS_DIRECTION';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const ERROR_VOTE_COMMENT = 'ERROR_VOTE_COMMENT';

export const CREATE_COMMENTS = 'CREATE_COMMENTS';
export const ERROR_COMMENTS = 'ERROR_COMMENTS';

const url = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const setPostCat = (postCat) => {
  console.log(`in setPostCat(${postCat}) action creater`);
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
  console.log('entered setViewCat action creater with viewCat: ', viewCat);
  return {
    type: SET_VIEW_CAT,
    viewCat,
  }
}

export const sortPostsField = (field) => {
  console.log('sortPostsField: ', field);
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

// todo: thunk postAction
export const createPostAction = (post) => {
  console.log('entered createPostAction with post: ', post);
  let { title, body, author, category, voteScore, deleted } = post;
  console.log('action.createPostAction title: ', title, '\nbody: ', body, '\nauthor: ', author, '\ncategory: ', category, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted);
  if (!title || !body || !category || category==='all') {
    console.log('throwing error !title || !body || !category || category===\'all\' in createPostAction action creater');
    throw new Error('invalid post: category, title and body required');
  }

  /*apiCalls.postPost(post).then((data) => {
    console.log('return data from apiCalls.postPost: ', data);
    console.log('posted post: ', post);
  });*/

  console.log('returning from createPostAction action creater type: ', CREATE_POST, ' and post: ', post);
  return {
    type: CREATE_POST,
    post: { id:Date.now(), timestamp:Date.now(), title, body, author:'alex', category, voteScore:1, deleted:false },
  }
}

export const createPostActionErrored = (bool) => {
  return {
    type: ERROR_POSTS,
    error: bool
  }
}

export function createPostActionFetch(post) {
  console.log('entered createPostActionFetch()');
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    console.log(`running fetch with url: ${url}/posts`);
    console.log('and headers: ', headers);
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
      console.log('createPostActionFetch data: ', data);
      dispatch(createPostAction(post));
      console.log('dispatched post to store');
    })
    .catch(() => dispatch(createPostActionErrored(true)));
  };
}
// end thunk post

export const commentsActionErrored = (bool) => {
  return {
    type: ERROR_COMMENTS,
    error: bool
  }
}

export const commentsAction = (comments) => {
  console.log('entered commentsAction with comments: ', comments);
  return {
    type: CREATE_COMMENTS,
    comments
  }
}

export function commentsActionFetch(postId) {
  console.log('entered commentsActionFetch(', postId, ')');
  //const headers = apiCalls.headers;
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    console.log(`running fetch with url: ${url}/posts/${postId}/comments`);
    console.log('and headers: ', headers);
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
        console.log('commentsActionFetch, (', postId, ') fetched comments: ', comments);
        dispatch(commentsAction(comments));
        console.log('dispatched comments to store');
      })
      .catch(() => dispatch(commentsActionErrored(true)));
  };
}

// thunk for getting posts
export const postsActionErrored = (bool) => {
  return {
    type: ERROR_POSTS,
    error: bool
  }
}

export const postsAction = (posts) => {
  console.log('entered postsAction with posts: ', posts);
  return {
    type: CREATE_POSTS,
    posts
  }
}

export function postsActionFetch() {
  console.log('entered postsActionFetch()');
  //const headers = apiCalls.headers;
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    console.log(`running fetch with url: ${url}/posts`);
    console.log('and headers: ', headers);
    fetch(`${url}/posts`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((posts) => {
        console.log('postsActionFetch posts: ', posts);
        dispatch(postsAction(posts));
        console.log('dispatched posts to store');
      })
      .catch(() => dispatch(postsActionErrored(true)));
  };
}
// end thunk for getting posts

// thunk for categories
export const catsActionErrored = (bool) => {
  return {
    type: ERROR_CATS,
    error: bool
  }
}

export const catsAction = (cats) => {
  console.log('entered catsAction with cats: ', cats);
  return {
    type: CREATE_CATS,
    cats
  }
}

export function catsActionFetch() {
  console.log('entered catsActionFetch()');
  //const headers = apiCalls.headers;
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));
    console.log(`running fetch with url: ${url}/categories`);
    console.log('and headers: ', headers);
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
        console.log('catsActionFetch cats.categories: ', cats.categories);
        dispatch(catsAction(cats.categories));
        console.log('dispatched cats.categories to store');
      })
      .catch(() => dispatch(catsActionErrored(true)));
  };
}

/*export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)*/
// end thunk for categories

// implement vote comment thunk actions:
export const voteCommentActionErrored = (bool) => {
  return {
    type: ERROR_VOTE_COMMENT,
    error: bool
  }
}

export const voteCommentAction = (id, option) => {
  console.log('entered voteCommentAction with option: ', option);
  return {
    type: VOTE_COMMENT,
    id,
    option
  }
}

export function voteCommentActionFetch(id, option) {
  console.log('entered voteCommentActionFetch(', id, ', ', option, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/comments/${id}`);
    console.log('and headers: ', headers);
    const params = JSON.stringify({ option: option });
    fetch(`${url}/comments/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: params, })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('voteCommentActionFetch, (', id, ', ', option, ') fetched data: ', data);
        dispatch(voteCommentAction(id, option));
        console.log('dispatched comment vote to store');
      })
      .catch(() => dispatch(voteCommentActionErrored(true)));
  };
}
// end implement vote comment thunk actions

export const createComment = (comment) => {
  console.log('entered createComment with comment: ', comment);
  let { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = comment;
  console.log('action.createComment parentId: ', parentId, '\nbody: ', body, '\nauthor: ', author, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted, '\nparentDeleted: ', parentDeleted);
  if (body.length === 0 || parentId.length === 0) {
    console.log('throwing error !body || !parentId in createComment action creater');
    throw new Error('invalid comment: parentId and body required');
  }
  
  apiCalls.postComment(comment).then((data) => {
    console.log('return data from apiCalls.postComment: ', data);
    console.log('posted comment: ', comment);
  });

  console.log('returning from createComment action creater type: ', CREATE_COMMENT, ' and comment: ', comment);
  return {
    type: CREATE_COMMENT,
    comment: { id, parentId, timestamp, body, author:'alex', voteScore:1, deleted:false, parentDelted:false },
  }
}

export const editPost = (post) => {
  apiCalls.putPost(post).then((data) => {
    console.log('return data from apiCalls.putPost: ', data);
    console.log('put post: ', post);
  });
  return {
    type: EDIT_POST,
    post,
  }
}

export const editComment = (comment) => {
  apiCalls.putComment(comment).then((data) => {
    console.log('API edit comment (', comment, '), data: ', data);
  })
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

// implement deletePost with thunk
export const deletePostActionErrored = (bool) => {
  return {
    type: ERROR_DELETE_POST,
    error: bool
  }
}

export const deletePostAction = (id) => {
  console.log('entered deletePostAction with id: ', id);
  return {
    type: DELETE_POST,
    id
  }
}

export function deletePostActionFetch(id) {
  console.log('entered deletePostActionFetch(', id, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/posts/${id}`);
    console.log('and headers: ', headers);
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
        //dispatch(itemsIsLoading(false));
        return response;
      })
      //.then((response) => response.json())
      .then((data) => {
        console.log('deletePostActionFetch, (', id, ') fetched data: ', data);
        dispatch(deletePostAction(id));
        console.log('dispatched deletePostAction to store');
      })
      .catch(() => dispatch(deletePostActionErrored(true)));
  };
}
// end implement delete post with thunk





/*export const votePost = (id, option) => {
  console.log('in votePost action with id: ', id, ' option: ', option);
  apiCalls.votePost(id, option).then((data) => {
    console.log('API votePost post id (', id, '), option: ', option, ' data: ', data);
  })
  return {
    type: VOTE_POST,
    id,
    option
  }
}*/

// migrate votePost to thunk
export const votePostActionErrored = (bool) => {
  return {
    type: ERROR_VOTE_POST,
    error: bool
  }
}

export const votePostAction = (id, option) => {
  console.log('entered votePostAction with id: ', id, ' and option: ', option);
  return {
    type: VOTE_POST,
    id,
    option
  }
}

export function votePostActionFetch(id, option) {
  console.log('entered votePostActionFetch(', id, ', ', option, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/posts/${id}`);
    console.log('and headers: ', headers);
    const params = JSON.stringify({ option: option });
    fetch(`${url}/posts/${id}`, { 
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: params, })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('votePostActionFetch, (', id, ', ', option, ') fetched data: ', data);
        console.log(`dispatch(votePostAction(${id}, ${option})`);
        dispatch(votePostAction(id, option));
        console.log('dispatched post vote to store');
      })
      .catch(() => dispatch(votePostActionErrored(true)));
  };
}
// end migrate votePost to thunk

export const deleteComment = (id) => {
  deleteCommentFetch(id).then((data) => {
    console.log('API deleteComment id (', id, '), data: ', data);
  })
  return {
    type: DELETE_COMMENT,
    id,
  }
}

// DELETE /comments/:id
const deleteCommentFetch = (id) =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  }).then(res => res.json())