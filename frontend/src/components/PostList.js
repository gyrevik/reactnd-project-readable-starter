import React from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

export default function PostList({ posts, deletePost, sortPostsField, setPostCurrent, votePost }) {
  if (posts.length === 0) return <span>'no posts'</span>;
  
  return (
    <div>
	  { 
      <ul>
        <li key={500}>
          Sort by <a href="javascript:void(0)" onClick={() => sortPostsField('voteScore')}>Vote Score</a>
          {' - '} <a href="javascript:void(0)" onClick={() => sortPostsField('timestamp')}>Time</a>
        </li>
        {posts.map((post, i) =>
            <li key={i.toString()}>
              Category: { post.category } {' - '} 
              Title: <Link to="/post" onClick={() => setPostCurrent(post)}>{ post.title }</Link> {' - '} 
              Vote Score: { post.voteScore } {' - '} 
                <a href="javascript:void(0)" onClick={() => votePost(post.id, 'upVote')}>upVote</a>
                {' - '}
                <a href="javascript:void(0)" onClick={() => votePost(post.id, 'downVote')}>downVote</a><br/>
              Time: { utils.niceDate(post.timestamp) } <br/>
              Body: { post.body } {' - '} <br/>
              id: {post.id} <br/>
              deleted: {post.deleted === true ? 'true' : 'false'}
            </li>
        )}
      </ul>
    }
    </div>
  )
}