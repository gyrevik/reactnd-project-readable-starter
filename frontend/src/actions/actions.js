import * as ReadableAPI from '../ReadableAPI';

export const FETCH_CATS = 'FETCH_CATS';
export const SET_POST_CAT = 'SET_POST_CAT';
export const SET_POST_CURRENT = 'SET_POST_CURRENT';
export const SET_VIEW_CAT = 'SET_VIEW_CAT';
export const CLEAR_POST_CAT = 'CLEAR_POST_CAT';

export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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

  console.log('returning from createPost action creater type: ', CREATE_POST, ' and post: ', post);
  return {
    type: CREATE_POST,
    post: { id:Date.now(), timestamp:Date.now(), title, body, author:'alex', category, voteScore:1, deleted:false },
  }
}

export const createComment = (comment) => {
  console.log('entered createComment with comment: ', comment);
  let { parentId, body, author, voteScore, deleted, parentDeleted } = comment;
  console.log('action.createComment parentId: ', parentId, '\nbody: ', body, '\nauthor: ', author, '\nvoteScore: ', voteScore, '\ndeleted: ', deleted, '\nparentDeleted: ', parentDeleted);
  if (body.length === 0 || parentId.length === 0) {
    console.log('throwing error !body || !parentId in createComment action creater');
    throw new Error('invalid comment: parentId and body required');
  }
  let timestamp = Date.now();
  //comment = { id:timestamp, author:'alex', voteScore:1, deleted:false, parentDelted:false };
  //console.log('comment.body after merge: ', comment.body);
  comment.timestamp = timestamp;
  
  ReadableAPI.postComment(comment).then((data) => {
    console.log('return data from ReadableAPI.postComment: ', data);
    console.log('posted comment: ', comment);
  });

  console.log('returning from createComment action creater type: ', CREATE_COMMENT, ' and comment: ', comment);
  return {
    type: CREATE_COMMENT,
    comment: { id:timestamp, parentId, timestamp, body, author:'alex', voteScore:1, deleted:false, parentDelted:false },
  }
}

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    post,
  }
}

export const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id,
  }
}

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  }
}


