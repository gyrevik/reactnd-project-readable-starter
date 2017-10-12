import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPostCat, setPostCurrent, setViewCat, clearPostCat, sortPostsField } from './actions/actions.js';
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
      			    setPostCurrent={this.props.setPostCurrent} />
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
                setPostCurrent={this.props.setPostCurrent} />
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

const LocationAwareComponent = ({ location, history, match }) => {
  // can use location, history, or match
  console.log('LocationAwareComponent, location: ', location);
}

const mapStateToProps = (state, props) => {
  //console.log(`App.js -> mapStateToProps -> state.posts: ${state.posts}`);
  //console.log(`App.js -> mapStateToProps -> state.postCat: ${state.postCat}`);
  //console.log(`App.js -> mapStateToProps -> state.viewCat: ${state.viewCat}`);
  const postCat = state.postCat;
  let viewCat = state.viewCat;
  if (createHistory().location.pathname === "/") viewCat = "all";
  
  //console.log(`App.js -> mapStateToProps -> typeof(state.postCat): ${typeof(state.postCat)}`);

  //console.log('state.post: ', state.post);
  
  //console.log('state.posts before filter: ', state.posts);
  //console.log('typeof(state.posts): ', typeof(state.posts));
  //console.log("typeof(state.posts) === 'object': ", typeof(state.posts) === 'object');
  
  let posts;
  if (typeof(state.posts) === 'object')
  	posts = state.posts.slice();
  else
    posts = JSON.parse(state.posts);
  
  let postsView = posts.slice();
  //console.log('postsView.length before filter: ', postsView.length, ', filter viewCat: ', state.viewCat);
  postsView = postsView.filter(post => {
    if (post.category === state.viewCat || state.viewCat === 'all') {
      //console.log(post.category, '===', state.viewCat, ' return true');
      return true;
    }
    else {
      //console.log(post.category, '!==', state.viewCat, ' return false, typeof(post.category): ', typeof(post.category), ', typeof(state.viewCat): ', typeof(state.viewCat));
      return false;
    }
  });
  //console.log('postsView.length after filter: ', postsView.length);

  //posts.map((post, i) => console.log('arrow function post category: ', post.category, " type: ", typeof(post.category)));
  
  const cats = state.cats;
  //console.log('typeof(cats): ', typeof(cats));
  //debugger;
  //cats.map((cat, i) => console.log('map arrow function: ', cat.name));

  //console.log('state.sortPostsField: ', state.sortPostsField);
  // todo: order posts by field
  const sortByKey = key => (a, b) => a[state.sortPostsField] < b[state.sortPostsField];	// desc (number)
  posts.sort(sortByKey(state.sortPostsField));
  
  return { cats, posts, postsView, postCat, viewCat }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ setPostCat, setPostCurrent, setViewCat, clearPostCat, sortPostsField }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))