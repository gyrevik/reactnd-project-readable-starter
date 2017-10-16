import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { voteCommentActionFetch, votePost, setPostCat, setPostCurrent, setViewCat, clearPostCat, sortPostsField } from './actions/actions.js';
import CatSet from './components/CatSet.js';
import CatViewLinks from './components/CatViewLinks.js';
import PostList from './components/PostList.js';
import PostCreate from './components/PostCreate.js';
import PostView from './components/PostView.js';
import createHistory from 'history/createBrowserHistory';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {
    console.log(`App.js.componentDidMount state: ${JSON.stringify(this.state)}`);
  }
  
  render() {
    console.log('createHistory().location.pathname: ', createHistory().location.pathname);	// 		/	/category

    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Readable</h2>
            </div>
            <p className="App-intro">
              Let's Read some blog posts! C:\Work\Readable
            </p>
      		<div>
      		  <CatViewLinks
                cats={this.props.cats}
                setViewCat={this.props.setViewCat} 
                clearPostCat={this.props.clearPostCat} 
                selectedCat={this.props.viewCat} />
      		</div>
            <div>
              <br />
              <PostCreate />
            </div>
            <div>
              <PostList 
                posts={this.props.posts}
                sortPostsField={this.props.sortPostsField}
                deletePost={this.props.deletePost}
      			    setPostCurrent={this.props.setPostCurrent} 
                votePost={this.props.votePost} />
            </div>
          </div>
        )}/>
        <Route exact path="/category" render={() =>(
          <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Readable</h2>
            </div>
            <p className="App-intro">
              Category View
            </p>
      		<div>
      		  <CatViewLinks
                cats={this.props.cats}
                setViewCat={this.props.setViewCat} 
                clearPostCat={this.props.clearPostCat} 
                selectedCat={this.props.viewCat} />
      		</div>
            <div>
              <br />
              <PostCreate />
            </div>
            <div>
              <PostList 
                posts={this.props.postsView}
                sortPostsField={this.props.sortPostsField}
                deletePost={this.props.deletePost} 
                setPostCurrent={this.props.setPostCurrent}
                votePost={this.props.votePost} />
            </div>
          </div>
        )}/>
        <Route exact path="/post" render={() => (
          <div>
            <br />
            <div>Post Detail View</div>
            <br />
            <div><PostView /></div>
          </div>
        )}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const postCat = state.postCat;
  let viewCat = state.viewCat;
  if (createHistory().location.pathname === "/") viewCat = "react";
  
  let posts;
  if (typeof(state.posts) === 'object')
  	posts = state.posts.slice();
  else
    posts = JSON.parse(state.posts);
  
  posts = posts.filter(post => post.deleted ? false : true);  // filter out deleted posts

  let postsView = posts.slice();
  postsView = postsView.filter(post => {
    if (post.category === state.viewCat || state.viewCat === 'all') {
      return true;
    }
    else {
      return false;
    }
  });
  
  const cats = state.cats;
  
  const sortByKey = key => (a, b) => a[state.sortPostsField] < b[state.sortPostsField];	// desc (number)
  posts.sort(sortByKey(state.sortPostsField));
  
  return { cats, posts, postsView, postCat, viewCat }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ votePost, setPostCat, setPostCurrent, setViewCat, clearPostCat, sortPostsField }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))