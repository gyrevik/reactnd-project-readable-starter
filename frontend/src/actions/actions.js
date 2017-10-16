import * as apiCalls from '../apiCalls';

export const FETCH_CATS = 'FETCH_CATS';
export const SET_POST_CAT = 'SET_POST_CAT';
export const SET_POST_CURRENT = 'SET_POST_CURRENT';
export const SET_VIEW_CAT = 'SET_VIEW_CAT';
export const CLEAR_POST_CAT = 'CLEAR_POST_CAT';

export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const CREATE_COMMENTS = 'CREATE_COMMENTS';
export const ERROR_COMMENTS = 'ERROR_COMMENTS';

export const SORT_POSTS_FIELD = 'SORT_POSTS_FIELD';
export const SORT_POSTS_DIRECTION = 'SORT_POSTS_DIRECTION';

export const setPostCat = (postCat) => {
  return {
    type: SET_POST_CAT,
    postCat,
  }
}

export const setPostCurrent = (post) => {
  return {
    type: SET_POST_CURRENT,
    post,
  }
}

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

export const clearPostCat = () => {
  return {
    type: CLEAR_POST_CAT,
  }
}

export const createPost = (post) => {
  console.log('entered createPost with post: ', post);
  let { title, body, author, category, voteScore, deleted } = post;
  console.log('action.createPost title: ', title, '\nbody: ', body, '\nauthor: ', author, '\ncategory: ', category, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted);
  if (!title || !body || !category || category==='all') {
    console.log('throwing error !title || !body || !category || category===\'all\' in createPost action creater');
    throw new Error('invalid post: category, title and body required');
  }

  apiCalls.postPost(post).then((data) => {
    console.log('return data from ReadableAPI.postPost: ', data);
    console.log('posted post: ', post);
  });

  console.log('returning from createPost action creater type: ', CREATE_POST, ' and post: ', post);
  return {
    type: CREATE_POST,
    post: { id:Date.now(), timestamp:Date.now(), title, body, author:'alex', category, voteScore:1, deleted:false },
  }
}

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
  const headers = apiCalls.headers;
  return (dispatch) => {
    //dispatch(itemsIsLoading(true));

    fetch(`${apiCalls.api}/posts/${postId}/comments`, { headers })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((comments) => dispatch(commentsAction(comments)))
      .catch(() => dispatch(commentsActionErrored(true)));
  };
}

/*fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.text())
  .then(data => data)*/

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
    /*ReadableAPI.getComments(comment.parentId).then((data) => {
      console.log('comments on server: ', data);
    })*/
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

export const deletePost = (id) => {
  console.log('in deletePost action with id: ', id);
  apiCalls.deletePost(id).then((data) => {
    console.log('API deleting post id (', id, '), data: ', data);
  })
  return {
    type: DELETE_POST,
    id,
  }
}

export const votePost = (id, option) => {
  console.log('in votePost action with id: ', id, ' option: ', option);
  apiCalls.votePost(id, option).then((data) => {
    console.log('API votePost post id (', id, '), option: ', option, ' data: ', data);
  })
  return {
    type: VOTE_POST,
    id,
    option
  }
}

export const voteComment = (id, option) => {
  console.log('alex in voteComment action with id: ', id, ' option: ', option);
  //apiCalls.voteComment(id, option).then((data) => {
  //console.log('API voteComment comment id (', id, '), option: ', option, ' data: ', data);
  //})
  return {
    type: VOTE_COMMENT,
    id,
    option
  }
}

export const deleteComment = (id) => {
  apiCalls.deleteComment(id).then((data) => {
    console.log('API deleteComment id (', id, '), data: ', data);
  })
  return {
    type: DELETE_COMMENT,
    id,
  }
}