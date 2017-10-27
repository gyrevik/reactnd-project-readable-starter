import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CatSet from './components/CatSet.js';
import CatViewLinks from './components/CatViewLinks.js';
import Header from './components/Header.js';
import PostList from './components/PostList.js';
import PostCreateEdit from './components/PostCreateEdit.js';
import PostView from './components/PostView.js';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }
  
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <div>
            <MuiThemeProvider><Header appIntro="Home" /></MuiThemeProvider>
      		<div>
      		  <CatViewLinks />
      		</div>
            <div>
              <br />
              <PostCreateEdit />
            </div>
            <div>
              <PostList />
            </div>
          </div>
        )}/>
        <Route exact path="/category" render={() =>(
          <div>
            <Header appIntro="Category View" />
            <div>
              <CatViewLinks />
            </div>
            <div>
              <br />
              <PostCreateEdit />
            </div>
            <div>
              <PostList />
            </div>
          </div>
        )}/>
        <Route exact path="/post" render={() => (
          <div>
            <Header appIntro="Post Detail View" />
            <div><PostView /></div>
          </div>
        )}/>
        <Route exact path="/postCreateEdit" render={() => (
          <div>
            <Header appIntro="Post Create/Edit View" />
            <PostCreateEdit />
          </div>
        )} />
      </div>
    );
  }
}

//const mapStateToProps = (state, props) => { return {} }

//export default withRouter(connect(mapStateToProps)(App))
export default withRouter(App)