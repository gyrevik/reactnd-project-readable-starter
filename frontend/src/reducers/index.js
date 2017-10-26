import { combineReducers } from 'redux';

import post from './post';
import postError from './postError';
import postCat from './postCat';
import posts from './posts';
import sortPostsField from './sortPostsField';
import cats from './cats';
import viewCat from './viewCat';
import mode from './mode';
import comments from './comments';
import commentError from './commentError';

export default combineReducers({
  post,
  postError,
  postCat,
  posts,
  sortPostsField,
  cats,
  viewCat,
  mode,
  comments,
  commentError
})