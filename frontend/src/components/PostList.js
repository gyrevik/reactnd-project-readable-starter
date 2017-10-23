import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortPostsField, setPostCurrent, votePostFetch, postsFetch, commentsFetch, createPostFetch } from '../actions/actions.js';
import NumComments from '../components/NumComments.js';
import * as utils from '../utils';
import * as jsxStyles from '../jsxStyles';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  render () {
    //console.log('this.props.sortPostsField: ', this.props.sortPostsField);
    return (
      <div>
        <ul>
          <li key={Math.random()}>
            Sort by {' '}
            <a href="javascript:void(0)" onClick={() => this.props.sortField('voteScore')}>
              <span style={this.props.sortPostsField==="voteScore" ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Vote Score
              </span>
            </a>
            {' - '} 
            <a href="javascript:void(0)" onClick={() => this.props.sortField('timestamp')}>
              <span style={this.props.sortPostsField==='timestamp' ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Time
              </span>
            </a>
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
  console.log('PostList mapStateToProps state.posts: ', state.posts);
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

  //console.log('PostList.mapStateToProps state: ', state);

  return { posts, sortPostsField: state.sortPostsField, comments: state.comments };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      fetchPosts: () => dispatch(postsFetch()),
      votePost: (postId, option) => dispatch(votePostFetch(postId, option)),
      setPostCurrent: (postId) => dispatch(setPostCurrent(postId)),
      sortField: (field) => dispatch(sortPostsField(field))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)