import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortPostsField, setPostCurrent, votePostFetch, postsFetch, createPostFetch } from '../actions/actions.js';
import * as utils from '../utils';

class PostList extends React.Component {
  componentDidMount() {
    console.log(`PostList.js.componentDidMount state: ${JSON.stringify(this.state)}`);
    console.log('about to run fetchPosts in componentDidMount');
    this.props.fetchPosts();
    console.log('ran fetchPosts in componentDidMount');
    console.log(`PostList.js.componentDidMount state: ${JSON.stringify(this.state)}`);
  }
  
  render () {
    return (
      <div>
        <ul>
          <li key={500}>
            Sort by <a href="javascript:void(0)" onClick={() => this.props.sortPostsField('voteScore')}>Vote Score</a>
            {' - '} <a href="javascript:void(0)" onClick={() => this.props.sortPostsField('timestamp')}>Time</a>
          </li>
          {this.props.posts.map((post, i) =>
              <li key={i.toString()}>
                Category: { post.category } {' - '} 
                Title: <Link to="/post" onClick={() => this.props.setPostCurrent(post)}>{ post.title }</Link> {' - '} 
                Vote Score: { post.voteScore } {' - '} 
                  <a href="javascript:void(0)" onClick={() => this.props.votePost(post.id, 'upVote')}>upVote</a>
                  {' - '}
                  <a href="javascript:void(0)" onClick={() => this.props.votePost(post.id, 'downVote')}>downVote</a><br/>
                Time: { utils.niceDate(post.timestamp) } <br/>
                Body: { post.body } {' - '} <br/>
                id: {post.id} <br/>
                deleted: {post.deleted === true ? 'true' : 'false'}
              </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('PostList.mapStateToProps.state.posts: ', state.posts);
  console.log('PostList.mapStateToProps.state.post: ', state.post);
  console.log('typeof(state.posts): ', typeof(state.posts));
  
  let posts = state.posts.slice();
  const sortByKey = key => (a, b) => a[state.sortPostsField] < b[state.sortPostsField];	// desc (number)
  posts.sort(sortByKey(state.sortPostsField));

  posts = posts.filter(post => {
    if (post.category === state.viewCat || state.viewCat === 'all') {
      return true;
    }
    else {
      return false;
    }
  });

  return { posts, sortPostsField: state.sortPostsField };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchPosts: () => dispatch(postsFetch()),
      votePost: (postId, option) => dispatch(votePostFetch(postId, option)),
      setPostCurrent: (postId) => dispatch(setPostCurrent(postId)),
      sortPostsField: (field) => dispatch(sortPostsField(field))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)