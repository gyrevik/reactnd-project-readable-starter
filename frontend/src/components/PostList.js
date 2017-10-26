import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/actions';
import NumComments from '../components/NumComments.js';
import { niceDate } from '../helper';
import * as jsxStyles from '../jsxStyles';

class PostList extends React.Component {
  componentDidMount() {
    const { sortPostsField } = this.props;
    console.log('PostList.componentDidMount sortPostsField: ', sortPostsField);
    this.props.postsFetch(sortPostsField);
  }
  
  render () {
    const { posts, sortPostsField, setSortPostsField, setPostCurrent, votePostFetch } = this.props;
    return (
      <div>
        <ul>
          <li key={Math.random()}>
            Sort by {' '}
            <a href="javascript:void(0)" onClick={() => setSortPostsField('voteScore')}>
              <span style={sortPostsField==="voteScore" ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Vote Score
              </span>
            </a>
            {' - '} 
            <a href="javascript:void(0)" onClick={() => setSortPostsField('timestamp')}>
              <span style={sortPostsField==='timestamp' ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Time
              </span>
            </a>
          </li>
          {posts.map((post, i) =>
            <li key={i.toString()}>
              Category: { post.category } {' - '} 
              Title: <Link to="/post" onClick={() => setPostCurrent(post)}>{ post.title }</Link> {' - '} 
              Vote Score: { post.voteScore } {' - '} 
                <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'upVote', sortPostsField)}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => votePostFetch(post.id, 'downVote', sortPostsField)}>downVote</a><br/>
              Time: { niceDate(post.timestamp) } <br/>
              Body: { post.body }<br/>
              Number of comments: <NumComments postId={post.id} />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, sortPostsField }) => {
  return { posts, sortPostsField };
}

export default connect(mapStateToProps, actions)(PostList)