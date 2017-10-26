import { GET_POSTS, SORT_POSTS_FIELD, CREATE_POST, EDIT_POST, DELETE_POST, VOTE_POST } from '../actions/types';

export default function posts (state = [], action) {
  switch (action.type) {
    case GET_POSTS: {
      // todo: sort them using action.sortPostsField:
      console.log('action.field in reducers.posts.GET_POSTS: ', action.field);
      console.log('state: ', state);
      console.log('action.posts: ', action.posts);
      //let postList = state.slice();
      const sortByKey = key => (a, b) => b[action.field] - a[action.field];	// desc (number)
      return action.posts.sort(sortByKey(action.field));

      return action.posts;
    }
    case SORT_POSTS_FIELD: {
      let postList = state.slice();
      console.log('action.field: ', action.field);
      const sortByKey = key => (a, b) => b[action.field] - a[action.field];	// desc (number)
      return postList.sort(sortByKey(action.field));
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

      // sort:
      console.log('posts reducer VOTE_POST action.field: ', action.field);
      const sortByKey = key => (a, b) => b[action.field] - a[action.field];	// desc (number)
      return newState.sort(sortByKey(action.field));

      //return newState;
    }
    default:
      return state;
  }
}