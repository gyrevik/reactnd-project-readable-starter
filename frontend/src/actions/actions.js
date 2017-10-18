export const FETCH_CATS = 'FETCH_CATS';
export const GET_CATS = 'GET_CATS';
export const ERROR_CATS = 'ERROR_CATS';
export const SET_POST_CAT = 'SET_POST_CAT';
export const SET_VIEW_CAT = 'SET_VIEW_CAT';

export const SET_POST_CURRENT = 'SET_POST_CURRENT';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const ERROR_EDIT_POST = 'ERROR_EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ERROR_DELETE_POST = 'ERROR_DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const ERROR_VOTE_POST = 'ERROR_VOTE_POST';

export const ERROR_POSTS = 'ERROR_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const SORT_POSTS_FIELD = 'SORT_POSTS_FIELD';
export const SORT_POSTS_DIRECTION = 'SORT_POSTS_DIRECTION';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const ERROR_CREATE_COMMENT = 'ERROR_CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ERROR_EDIT_COMMENT = 'ERROR_EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ERROR_DELETE_COMMENT = 'ERROR_DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const ERROR_VOTE_COMMENT = 'ERROR_VOTE_COMMENT';

export const GET_COMMENTS = 'GET_COMMENTS';
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

// thunk createPost
export const createPost = (post) => {
  console.log('entered createPost with post: ', post);
  let { title, body, author, category, voteScore, deleted } = post;
  console.log('action.createPost title: ', title, '\nbody: ', body, '\nauthor: ', author, '\ncategory: ', category, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted);
  if (!title || !body || !category || category==='all') {
    console.log('throwing error !title || !body || !category || category===\'all\' in createPost action creater');
    throw new Error('invalid post: category, title and body required');
  }

  console.log('returning from createPost action creater type: ', CREATE_POST, ' and post: ', post);
  return {
    type: CREATE_POST,
    post: { id:Date.now(), timestamp:Date.now(), title, body, author:'alex', category, voteScore:1, deleted:false },
  }
}

export const createPostErrored = (bool) => {
  return {
    type: ERROR_POSTS,
    error: bool
  }
}

export function createPostFetch(post) {
  console.log('entered createPostFetch()');
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
      console.log('createPostFetch data: ', data);
      dispatch(createPost(post));
      console.log('dispatched post to store');
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

export const getComments = (comments) => {
  console.log('entered comments with comments: ', comments);
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function commentsFetch(postId) {
  console.log('entered commentsFetch(', postId, ')');
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
        console.log('commentsFetch, (', postId, ') fetched comments: ', comments);
        dispatch(getComments(comments));
        console.log('dispatched comments to store');
      })
      .catch(() => dispatch(commentsErrored(true)));
  };
}

// thunk for getting posts
export const postsErrored = (bool) => {
  return {
    type: ERROR_POSTS,
    error: bool
  }
}

export const getPosts = (posts) => {
  console.log('entered getPosts action with posts: ', posts);
  return {
    type: GET_POSTS,
    posts
  }
}

export function postsFetch() {
  console.log('entered postsFetch()');
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
        console.log('postsFetch posts: ', posts);
        dispatch(getPosts(posts));
        console.log('dispatched posts to store');
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
  console.log('entered getCats action with cats: ', cats);
  return {
    type: GET_CATS,
    cats
  }
}

export function catsFetch() {
  console.log('entered catsFetch()');
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
        console.log('catsFetch cats.categories: ', cats.categories);
        dispatch(getCats(cats.categories));
        console.log('dispatched cats.categories to store');
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
  console.log(`entered voteComment(${id}, ${option})`);
  return {
    type: VOTE_COMMENT,
    id,
    option
  }
}

export function voteCommentFetch(id, option) {
  console.log('entered voteCommentFetch(', id, ', ', option, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/comments/${id}`);
    console.log('and headers: ', headers);
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
        console.log('voteCommentFetch, (', id, ', ', option, ') fetched data: ', data);
        dispatch(voteComment(id, option));
        console.log('dispatched comment vote to store');
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
  console.log('entered createComment with comment: ', comment);
  let { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = comment;
  console.log('action.createComment parentId: ', parentId, '\nbody: ', body, '\nauthor: ', author, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted, '\nparentDeleted: ', parentDeleted);
  if (body.length === 0 || parentId.length === 0) {
    console.log('throwing error !body || !parentId in createComment action creater');
    throw new Error('invalid comment: parentId and body required');
  }

  console.log('returning from createComment action creater type: ', CREATE_COMMENT, ' and comment: ', comment);
  return {
    type: CREATE_COMMENT,
    comment: { id, parentId, timestamp, body, author:'alex', voteScore:1, deleted:false, parentDelted:false },
  }
}

export function createCommentFetch(comment) {
  console.log('entered createCommentFetch with comment: ', comment);
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/comments`);
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
        console.log('createCommentFetch fetched data: ', data);
        dispatch(createComment(comment));
        console.log('dispatched comment to store');
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
export const editPost = (post) =>
  fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API editPost error: ', error);
    })

export function editPostFetch(post) {
  console.log('entered editPostFetch with post: ', post);
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/posts/${post.id}`);
    fetch(`${url}/posts/${post.id}`, { 
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: post.title, body: post.body })
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
      console.log('editPostFetch fetched data: ', data);
      dispatch(editPost(post));
      console.log('dispatched post to store');
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
/*export const editComment = (comment) =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: comment.timestamp, body: comment.body })
  }).then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('API putComment error: ', error);
    })*/

export function editCommentFetch(comment) {
  console.log('entered editCommentFetch with comment: ', comment);
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/comments/${comment.id}`);
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
        console.log('editCommentFetch fetched data: ', data);
        dispatch(editComment(comment));
        console.log('dispatched comment to store');
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
  console.log('entered deletePost action with id: ', id);
  return {
    type: DELETE_POST,
    id
  }
}

export function deletePostFetch(id) {
  console.log('entered deletePostFetch(', id, ')');
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
        console.log('deletePostFetch, (', id, ') fetched data: ', data);
        dispatch(deletePost(id));
        console.log('dispatched deletePost action to store');
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

export const votePost = (id, option) => {
  console.log('entered votePost action with id: ', id, ' and option: ', option);
  return {
    type: VOTE_POST,
    id,
    option
  }
}

export function votePostFetch(id, option) {
  console.log('entered votePostFetch(', id, ', ', option, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/posts/${id}`);
    console.log('and headers: ', headers);
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
        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('votePostFetch, (', id, ', ', option, ') fetched data: ', data);
        console.log(`dispatch(votePost(${id}, ${option})`);
        dispatch(votePost(id, option));
        console.log('dispatched post vote to store');
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
  console.log('entered deleteCommentFetch(', id, ')');
  return (dispatch) => {
    console.log(`running fetch with url: ${url}/comments/${id}`);
    console.log('and headers: ', headers);
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
        console.log('deleteCommentFetch, (', id, ') fetched data: ', data);
        dispatch(deleteComment(id));
        console.log('dispatched deleteComment action to store');
      })
      .catch(() => dispatch(deleteComment(true)));
  };
}
// end thunk deleteComment