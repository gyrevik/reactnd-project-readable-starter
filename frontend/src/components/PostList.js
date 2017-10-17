import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePostActionFetch, postsActionFetch, createPostActionFetch } from '../actions/actions.js';
import * as utils from '../utils';

class PostList extends React.Component {
  // was passed in when this was a functional component:
  // posts, deletePost, sortPostsField, setPostCurrent 

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
  console.log('getting comments from server in mapStateToProps');

  return { posts: state.posts, sortPostsField: state.sortPostsField };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchPosts: () => dispatch(postsActionFetch()),
      votePost: (postId, option) => dispatch(votePostActionFetch(postId, option))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
