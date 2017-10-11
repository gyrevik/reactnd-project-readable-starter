import React from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

export default function PostList({ posts, deletePost, sortPostsField, category, setPostCurrent }) {
  console.log('number of posts: ', posts.length);
  if (posts.length === 0) return <span>'no posts'</span>;
  console.log('posts in PostList: ', JSON.stringify(posts));
  
  return (
    <div>
	  { 
        <ul>
          <li key={500}>
            Sort by <a href="javascript:void(0)" onClick={() => sortPostsField('voteScore')}>Vote Score</a>
            {' - '} <a href="javascript:void(0)" onClick={() => sortPostsField('timestamp')}>Time</a>
          </li>
          {posts.map(
            (post, i) =>
              <li key={i.toString()}>
                Category: { post.category } {' - '} 
				        Title: <Link to="/post" onClick={() => setPostCurrent(post)}>{ post.title }</Link> {' - '} 
				        Vote Score: { post.voteScore } {' - '} Time: { utils.niceDate(post.timestamp) } <br/>
                  {'body: '} { post.body } {' - '}
                <a href="javascript:void(0)" onClick={() => deletePost(post.id)}>delete</a><br/><br/>
              </li>
          )}
		</ul>
      }
    </div>
  )
}