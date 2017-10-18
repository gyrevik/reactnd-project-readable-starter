import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { voteCommentActionFetch, setPostCurrent, setViewCat, clearPostCat, sortPostsField } from './actions/actions.js';
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
      		  <CatViewLinks />
      		</div>
            <div>
              <br />
              <PostCreate />
            </div>
            <div>
              <PostList />
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
              <CatViewLinks />
            </div>
            <div>
              <br />
              <PostCreate />
            </div>
            <div>
              <PostList />
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
        <Route exact path="/postCreateEdit" render={() => (
          <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Readable</h2>
            </div>
            <p className="App-intro">
              Post Create/Edit View
            </p>
          </div>
        )} />
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
  
  //const cats = state.cats;
  
  return { posts, postCat, viewCat }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ setViewCat }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))