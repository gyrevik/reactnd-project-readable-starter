import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/actions';
import { posts, viewCat, sortPostsField } from '../reducers/reducers';
import NumComments from '../components/NumComments.js';
import { niceDate } from '../helper';
import * as jsxStyles from '../jsxStyles';

class PostList extends React.Component {
  componentDidMount() {
    this.props.postsFetch();
  }
  
  render () {
    return (
      <div>
        <ul>
          <li key={Math.random()}>
            Sort by {' '}
            <a href="javascript:void(0)" onClick={() => this.props.sortPostsField('voteScore')}>
              <span style={this.props.sortPostsField==="voteScore" ? jsxStyles.spanBold : jsxStyles.spanNormal}>
                Vote Score
              </span>
            </a>
            {' - '} 
            <a href="javascript:void(0)" onClick={() => this.props.sortPostsField('timestamp')}>
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
                <a href="javascript:void(0)" onClick={() => this.props.votePostFetch(post.id, 'upVote')}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => this.props.votePostFetch(post.id, 'downVote')}>downVote</a><br/>
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

const mapStateToProps = ({ posts, viewCat, sortPostsField }) => { 
  posts = posts.filter(post => {
    if (post.category === viewCat || viewCat === 'all') {
      return true;
    }
    else {
      return false;
    }
  });

  const sortByKey = key => (a, b) => b[sortPostsField] - a[sortPostsField];	// desc (number)
  posts.sort(sortByKey(sortPostsField));

  return { posts, sortPostsField };
}

export default connect(mapStateToProps, actions)(PostList)