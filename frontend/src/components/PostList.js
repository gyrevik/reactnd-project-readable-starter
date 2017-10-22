import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortPostsField, setPostCurrent, votePostFetch, postsFetch, commentsFetch, createPostFetch } from '../actions/actions.js';
import NumComments from '../components/NumComments.js';
import * as utils from '../utils';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
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
              Body: { post.body }<br/>
              Number of comments: <NumComments postId={post.id} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => { 
  console.log('state.sortPostsField: ', state.sortPostsField);
  let posts = state.posts.slice();

  posts = posts.filter(post => {
    if (post.category === state.viewCat || state.viewCat === 'all') {
      return true;
    }
    else {
      return false;
    }
  });

  const sortByKey = key => (a, b) => b[state.sortPostsField] - a[state.sortPostsField];	// desc (number)
  posts.sort(sortByKey(state.sortPostsField));

  console.log('PostList.mapStateToProps state: ', state);

  return { posts, sortPostsField: state.sortPostsField, comments: state.comments };
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